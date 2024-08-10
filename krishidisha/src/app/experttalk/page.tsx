"use client";
import React, { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import Peer from 'peerjs';
import "../../css/stranger.css";

const VideoCall = () => {
	interface msg {
		position: string;
		content: string
	}
	const [mobile, setMobile] = useState(false);
	const [socket, setSocket] = useState<Socket | null>(null);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState<msg>();
	const [messages, setMessages] = useState<[msg]>([{ position: "", content: "" }]);
	const [room, setRoom] = useState("");
	const peerInstance = useRef<Peer | null>(null);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const strangerRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		const newSocket: Socket = io('http://localhost:3030', {
			transportOptions: {
				polling: {
					extraHeaders: {
						'source': 'video',
					},
				},
			},
		});
		setSocket(newSocket);

		newSocket.on('connect', () => {
			console.log('Connected to server');
		});
		newSocket.on("receive", handleReceive);
		newSocket.on("connect2videos", (data: any) => {
			console.log(data);
			setRoom(data);
			setLoading(false);
		});

		newSocket.on('disconnect', () => {
			console.log('Disconnected from server');
			setSocket(null);
			setRoom("");
		});

		if (window.screen.width <= 630) {
			setMobile(true);
		}

		return () => {
			if (newSocket) {
				newSocket.disconnect();
				setSocket(null);
			}
		};
	}, []);

	useEffect(() => {
		if (room) {
			peerInstance.current = new Peer();
			peerInstance.current.on("open", (id) => {
				console.log("my id is =>" + id);
				if (socket) {
					socket.emit("join-video", room, id);
				}
			});
		}
	}, [room, socket]);

	useEffect(() => {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ video: true, audio: true })
				.then(stream => {
					if (videoRef.current) {
						videoRef.current.srcObject = stream;
					}
					if (socket) {
						socket.on("user-connect-video", (userId: any) => {
							console.log("Stranger Connected =>" + userId);
							if (peerInstance.current) {
								const call = peerInstance.current.call(userId, stream);
								call.on('stream', (strangerStream: any) => {
									if (strangerRef.current) {
										strangerRef.current.srcObject = strangerStream;
									}
								});
							}
						});
					}
					if (peerInstance.current) {
						peerInstance.current.on('call', (call) => {
							call.answer(stream);
							call.on('stream', (strangerStream) => {
								if (strangerRef.current) {
									strangerRef.current.srcObject = strangerStream;
								}
							});
						});
					}
				})
				.catch(err => console.error(err));
		}
	}, [socket]);

	const sendMessage = async () => {
		console.log("this is my " + room);
		if (room && message !== "") {
			socket?.emit("send-message", { room: room, message: message.trim() });
			addMessage("right", message);
			setMessage("");
		}
	}

	const handleReceive = (data: string) => {
		setMessages(prevMessages => [
			...prevMessages,
			{ position: "left", content: data },
		]);
	};

	const addMessage = (pos: string, message: string) => {
		setMessages([...messages, { position: pos, content: message }]);
	};

	return (
		<div className="h-screen w-screen overflow-hidden">
			<div className="w-full h-[10%] ">
				<div className="bg-color2 h-full flex justify-center items-center">
					<div className="container text-center">
						<h1 className="text-white font-bold text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl">Agri Expert</h1>
					</div>
				</div>
			</div>
			{mobile ? (
				<div className="w-full h-[90%] bg-color2">
					<div className="w-full h-[49%] bg-blue-300"></div>
					<div className="w-full h-[49%] bg-blue-800"></div>
				</div>
			) : (
				<div className="w-full h-[90%] bg-color2">
					<div className="h-full w-[35%] float-left">
						<div className="w-full h-1/2 p-2" id="otherVideo">
							{loading ?
								<div className="flex items-center justify-center h-[90%] bg-color2">
									<div className="loader rounded-full border-8 border-gray-200 h-24 w-24 border-t-red-400"></div>
								</div> :
								<video ref={strangerRef} className="w-full h-full" playsInline autoPlay />
							}
						</div>
						<div className="w-full h-1/2 p-2" id="selfVideo">
							<video ref={videoRef} className="w-full h-full" playsInline muted autoPlay />
						</div>
					</div>
					<div className="h-full w-[65%] float-left">
						<div className="w-full h-full">
							<div className="w-full h-[87%] bg-color3  mt-1">
								<div className="p-3 h-full w-full overflow-y-auto overflow-x-hidden mx-10">
									{messages.map((message, index) => (
										<p key={index} className={message.position}>{message.content}</p>
									))}
								</div>
							</div>
							<div className="w-full h-[13%] bg-color2 flex justify-center items-start flex-row ">
								<div className="h-full w-[10%] p-1 flex justify-center items-center">
									<button className="outline-0 overflow-hidden w-full sm:w-full md:w-[90%] lg:w-[84%] xl:w-[80%] h-[40%] sm:h-[40%] md:h-[50%] lg:h-[57%] xl:h-[65%] rounded-xl bg-color3 text-white text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl">Esc</button>
								</div>
								<div className="h-full w-[80%] p-2 flex justify-center items-center flex-row">
									<input
										type="text"
										className="px-3 outline-0 overflow-hidden w-full h-[42%] sm:h-[40%] md:h-[50%] lg:h-[57%] xl:h-[65%] rounded-md text-xl text-color1"
										autoComplete="off"
										autoFocus
										value={message}
										onChange={(event) => setMessage(event.target.value)}
										onKeyUp={(event) => {
											if (event.key === "Enter") {
												console.log("Enter key pressed!");
												sendMessage();
											}
										}}
									/>
								</div>
								<div className="h-full w-[10%] p-1 flex justify-center items-center">
									<button className="outline-0 overflow-hidden w-full sm:w-full md:w-[90%] lg:w-[84%] xl:w-[80%] h-[40%] sm:h-[40%] md:h-[50%] lg:h-[57%] xl:h-[65%] rounded-xl bg-color3 text-white text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl" onClick={sendMessage}>Send</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default VideoCall;
