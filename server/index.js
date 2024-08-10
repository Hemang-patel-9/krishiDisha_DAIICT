const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { instrument } = require("@socket.io/admin-ui");
const http = require("http").Server(app);
dotenv.config({ path: "./config.env" });
const io = require("socket.io")(http, {
	cors: {
		origin: "*",
	},
});

// Admin UI from Socket.io
instrument(io, {
	auth: {
		type: "basic",
		username: "admin",
		password: "$2a$09$1qGCLF/QleZCfx8A5KAgaeT8PVeLTlwxZ.SiHOmhPae1gcLcYb6ni" // Ensure the hashed password is correct
	},
	mode: "development",
});

let users = [];
let videos = [];

io.on("connection", (socket) => {
	const pageSource = socket.handshake.headers['source'];

	if (pageSource === "chat") {
		users.push(socket);
		console.log("Connected to socket - chat");

		if (users.length >= 2) {
			const room = generateRoomId();

			users[0].join(room);
			users[1].join(room);

			io.to(room).emit('connect2person', room);
			users.splice(0, 2);
		}
	} else if (pageSource === "video") {
		console.log("Connected to socket - video");
		videos.push(socket);

		if (videos.length >= 2) {
			const room = generateRoomId();

			videos[0].join(room);
			videos[1].join(room);

			io.to(room).emit("connect2videos", room);
			videos.splice(0, 2);
		}
	} else {
		console.log("Connected random");
	}

	socket.on("join-video", async (roomId, userId) => {
		await socket.join(roomId);
		socket.to(roomId).emit("user-connect-video", userId);
	});

	socket.on("send-message", (data) => {
		socket.to(data.room).emit("receive", data.message);
	});

	socket.on("stranger-disconnected", (data) => {
		socket.to(data.room).emit("load-new-stranger");
		socket.leave(data.room);
	});

	socket.on("closeTab", (data) => {
		console.log("closeTab event received: " + data);
	});

	socket.on("disconnect", () => {
		console.log("User disconnected");
	});
});

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./node_modules/@socket.io/admin-ui/ui/dist"));

app.get('/', (req, res) => {
	res.send("<h1>Hello World!</h1>");
});

function generateRoomId() {
	return Math.random().toString(36).substr(2, 6);
}

// Listening server
const PORT = process.env.PORT || 3030;
http.listen(PORT, () => {
	console.log(`Server started on PORT ${PORT}`);
});