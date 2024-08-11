'use client'
import Link from "next/link"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import "../../css/signup.css";
export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [mobileno, setMobileno] = useState("");
    const [active, setActive] = useState<string>("");
    const [loader, setLoader] = useState(false);
    const router = useRouter();
    const [formError, setFormError] = useState({
        title: "",
        message: ""
    });

    useEffect(() => {
        const firstElement = document.getElementById("first");
        const secondElement = document.getElementById("second");
        const thirdElement = document.getElementById("third");

        if (!firstElement || !secondElement || !thirdElement) return;

        const removeClasses = () => {
            firstElement.classList.remove('animated-card', 'rotate-normal');
            secondElement.classList.remove('animated-card', 'rotate-normal');
            thirdElement.classList.remove('animated-card', 'rotate-normal');
        };

        if (active === "first") {
            secondElement.classList.add("animated-card");
            firstElement.classList.add("rotate-normal");
            setTimeout(() => {
                secondElement.style.zIndex = "30";
                secondElement.style.transform = "rotate(7deg)";
                firstElement.style.transform = "rotate(0deg)";
                thirdElement.style.zIndex = "20";
                thirdElement.style.transform = "rotate(-7deg)";
                firstElement.style.zIndex = "50";
                setTimeout(removeClasses, 1400);
            }, 1600);
        } else if (active === "second") {
            firstElement.classList.add('animated-card');
            secondElement.classList.add('rotate-normal');
            setTimeout(() => {
                firstElement.style.zIndex = "30";
                secondElement.style.transform = "rotate(0deg)";
                firstElement.style.transform = "rotate(7deg)";
                thirdElement.style.zIndex = "20";
                thirdElement.style.transform = "rotate(-7deg)";
                secondElement.style.zIndex = "50";
                setTimeout(removeClasses, 1400);
            }, 1600);
        } else if (active === "third") {
            firstElement.style.zIndex = "20";
            secondElement.classList.add("animated-card");
            thirdElement.classList.add("rotate-normal");
            setTimeout(() => {
                thirdElement.style.zIndex = "50";
                secondElement.style.zIndex = "30";
                firstElement.style.transform = "rotate(7deg)";
                thirdElement.style.transform = "rotate(0deg)";
                secondElement.style.transform = "rotate(-7deg)";
                setTimeout(removeClasses, 1400);
            }, 1600);
        } else if (active === "fourth") {
            secondElement.style.zIndex = "20";
            firstElement.style.zIndex = "30";
            thirdElement.classList.add("animated-card");
            firstElement.classList.add("rotate-normal");
            setTimeout(() => {
                firstElement.style.zIndex = "50";
                thirdElement.style.zIndex = "30";
                firstElement.style.transform = "rotate(0deg)";
                thirdElement.style.transform = "rotate(7deg)";
                secondElement.style.transform = "rotate(-7deg)";
                setTimeout(removeClasses, 1400);
            }, 1600);
        } else if (active === "fifth") {
            firstElement.style.zIndex = "20";
            thirdElement.classList.add("animated-card");
            secondElement.classList.add("rotate-normal");
            setTimeout(() => {
                secondElement.style.zIndex = "50";
                thirdElement.style.zIndex = "30";
                secondElement.style.transform = "rotate(0deg)";
                thirdElement.style.transform = "rotate(-7deg)";
                firstElement.style.transform = "rotate(7deg)";
                setTimeout(removeClasses, 1400);
            }, 1600);
        } else {
            firstElement.style.transform = "rotate(0deg)";
            firstElement.style.zIndex = "50";
            secondElement.style.transform = "rotate(7deg)";
            secondElement.style.zIndex = "30";
            thirdElement.style.zIndex = "20";
            thirdElement.style.transform = "rotate(-7deg)";
        }
    }, [active]);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const res = await fetch("api/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password, firstname, lastname, mobileno }),
            });
            const data = await res.json();
            console.log(data);
            if (data.message) {
                alert(data.message);
            } else {
                alert("signined in successfully");
            }
        } catch (err) {
            console.error('Error signing in:', err);
        }
    }

    const checkUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!email) {
                setFormError({ ...formError, title: "lemail", message: "Enter Email" });
                return null;
            }
            else if (!password) {
                setFormError({ ...formError, title: "lpassword", message: "Enter Password" });
                return null;
            }

            const response = await fetch("/api/user/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email, password: password
                })
            });
            const data = await response.json();

            if (data.success) {
                console.log("User logged in successfully");
                setLoader(false);
                router.push('/');

            } else {
                setLoader(false);
                alert("User couldn't log in.")
                setFormError({ ...formError, title: "lpassword", message: "Credentials are incorrect." });
            }
        } catch (err) {
            console.log(err);
        }
    };

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // if (!firstname) {
            //     setFormError({ ...formError, title: "lfirstname", message: "Enter firstname" });
            //     setLoader(false);
            //     return;
            // }
            // else if (!lastname) {
            //     setFormError({ ...formError, title: "llastname", message: "Enter lastname" });
            //     setLoader(false);
            //     return;
            // }
            // else if (!username) {
            //     setFormError({ ...formError, title: "lusername", message: "Enter username" });
            //     setLoader(false);
            //     return;
            // }
            // else if (!email) {
            //     setFormError({ ...formError, title: "lemail", message: "Enter email" });
            //     setLoader(false);
            //     return;
            // }
            // else if (!password) {
            //     setFormError({ ...formError, title: "leail", message: "Enter email" });
            //     setLoader(false);
            //     return;
            // }
            // else if (!mobileno) {
            //     setFormError({ ...formError, title: "leail", message: "Enter email" });
            //     setLoader(false);
            //     return;
            // }

            const response = await fetch("/api/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstname: firstname, lastname: lastname, username: username, email: email, password: password, mobile_number: mobileno
                })
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                console.log("User registered successfully");
                setLoader(false);
                router.push('/');
            } else {
                alert("user could not be registered");
                setLoader(false);
            }
        } catch (error) {
            console.log(error);
            setLoader(false);
        }
    };

    return (
        <div className="bg-color3 h-screen w-screen fixed flex justify-center items-center">
            <div id="first" className="absolute">

                <div className="flex justify-center items-center flex-col">
                    <div className="shadow-2xl shadow-gray-400 rounded-3xl backdrop-opacity-10 backdrop-invert bg-color6 sm:w-fit pt-5 pb-5 pl-10 pr-10">
                        <div className=" flex justify-center items-center sm:p-6 p-2">
                            <p className="sm:text-2xl text-xl text-color2 first-letter:text-color1 sm:first-letter:text-6xl first-letter:text-4xl uppercase font-bold">
                                Sign In
                            </p>
                        </div>
                        <div className="w-fit sm:p-4 rounded-tr-full rounded-bl-full bg-color1 shadow-2xl shadow-gray-400">
                            <form onSubmit={(e) => checkUser(e)} className="w-fit sm:p-8 rounded-tl-full bg-color2 rounded-br-full shadow-2xl shadow-gray-600 p-4">
                                <div className="grid grid-rows-2 sm:gap-y-3 gap-y-1">
                                    <input
                                        className="outline-none placeholder:text-gray-600 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 bg-gray-200 border-b-2 border-b-gray-800 text-black rounded-full hover:bg-cyan-100"
                                        placeholder="Email address"
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="text"
                                    />
                                    <input
                                        className="outline-none placeholder:text-gray-600 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 rounded-full bg-gray-200 border-b-2 text-black border-b-gray-800 hover:bg-cyan-100"
                                        type={showPassword ? "text" : "password"}
                                        onChange={(e) => setPassword(e.target.value)}

                                        placeholder="password"
                                    />
                                    {/* <input
                        className="outline-none placeholder:text-cyan-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 rounded-full bg-cyan-200 border-b-2 border-b-cyan-800  hover:bg-cyan-100"
                        type="password"
                        placeholder="password" /> */}
                                    <div className="flex">
                                        <input
                                            type="checkbox"
                                            className=" accent-black w-4"
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                        <p className="text-black pl-2">show password</p>
                                    </div>
                                    <button type="submit" className="bg-gray-800 text-white p-2 rounded-full border-b-4 border-b-white-300 hover:font-bold">
                                        login
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="flex">
                            <p className="text-gray-800 leading-10">dont have account??</p>
                            {/* <Link href={'/signup'} className="text-black leading-10 ps-3">sign up</Link> */}
                            <p className="text-gray-700 leading-10 underline" onClick={() => setActive("second")}>signup</p>
                        </div>
                        {/* Uncomment the following section if you intend to use it */}

                    </div>

                </div>
            </div>
            <div id="second" className="absolute">

                <div className="flex justify-center items-center flex-col">

                    <div className="shadow-2xl shadow-color2 rounded-3xl backdrop-opacity-10 backdrop-invert bg-color6 sm:w-fit pt-5 pb-5 pl-10 pr-10">
                        <div className="flex justify-center items-center sm:p-6 p-2">
                            <p className="sm:text-2xl text-xl text-color2 first-letter:text-color1 sm:first-letter:text-6xl first-letter:text-4xl uppercase font-bold">
                                Sign up
                            </p>
                        </div>
                        <div className="w-fit sm:p-4 rounded-tr-full rounded-bl-full bg-color1 shadow-2xl shadow-color2">
                            <form onSubmit={(e) => e.preventDefault()} className="w-fit sm:p-8 rounded-tl-full bg-color3 rounded-br-full shadow-2xl shadow-gray-600 p-4">
                                <div className="grid grid-rows-2 sm:gap-y-3 gap-y-1">
                                    <input
                                        className="outline-none placeholder:text-gray-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 bg-color6 border-b-2 border-b-gray-800 text-black rounded-full hover:bg-gray-100"
                                        placeholder="firstname"
                                        onChange={(e) => setfirstname(e.target.value)}
                                        type="text"
                                    />
                                    <input
                                        className="outline-none placeholder:text-gray-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 bg-color6 border-b-2 border-b-gray-800 text-black rounded-full hover:bg-gray-100"
                                        placeholder="lastname"
                                        onChange={(e) => setlastname(e.target.value)}
                                        type="text"
                                    />
                                    <input
                                        className="outline-none placeholder:text-gray-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 bg-color6 border-b-2 border-b-gray-800 text-black rounded-full hover:bg-gray-100"
                                        placeholder="username"
                                        onChange={(e) => setUsername(e.target.value)}
                                        type="text"
                                    />
                                    <input
                                        className="outline-none placeholder:text-gray-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 bg-color6 border-b-2 border-b-gray-800 text-black rounded-full hover:bg-gray-100"
                                        placeholder="mobile number"
                                        onChange={(e) => setMobileno(e.target.value)}
                                        type="number"
                                    />

                                    {/* <input
                        className="outline-none placeholder:text-gray-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 rounded-full bg-color6 border-b-2 border-b-gray-800  hover:bg-gray-100"
                        type="password"
                        placeholder="password" /> */}

                                    <button className="bg-color1 text-gray-200 p-2 rounded-full border-b-4 border-b-gray-300 hover:font-bold" onClick={() => setActive("third")}>
                                        Next
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="flex">
                            <p className="text-gray-800 leading-10">have an account??</p>
                            {/* <Link href={'/signin'} className="text-gray-500 leading-10 ps-3">sign in</Link> */}
                            <p className="text-gray-700 leading-10 underline" onClick={() => { setActive("first") }}>signin</p>
                        </div>
                        {/* Uncomment the following section if you intend to use it */}

                    </div>

                </div>
            </div>
            <div id="third" className="absolute">

                <div className="flex justify-center items-center flex-col">
                    <div className="shadow-2xl shadow-color2 rounded-3xl backdrop-opacity-10 backdrop-invert bg-color6 sm:w-fit pt-5 pb-5 pl-10 pr-10">
                        <div className="flex justify-center items-center sm:p-6 p-2">
                            <p className="sm:text-2xl text-xl text-color2 first-letter:text-color1 sm:first-letter:text-6xl first-letter:text-4xl uppercase font-bold">
                                Sign up
                            </p>
                        </div>
                        <div className="w-fit sm:p-4 rounded-tr-full rounded-bl-full bg-color1 shadow-2xl shadow-color2">
                            <form onSubmit={(e) => registerUser(e)} className="w-fit sm:p-8 rounded-tl-full bg-color3 rounded-br-full shadow-2xl shadow-gray-600 p-4">
                                <div className="grid grid-rows-2 sm:gap-y-3 gap-y-1">

                                    <input
                                        className="outline-none placeholder:text-gray-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 bg-color6 border-b-2 border-b-gray-800 text-black rounded-full hover:bg-gray-100"
                                        placeholder="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email" />
                                    <input
                                        className="outline-none placeholder:text-gray-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 rounded-full bg-color6 border-b-2 text-black border-b-gray-800 hover:bg-gray-100"
                                        type={showPassword ? "text" : "password"}
                                        onChange={(e) => setPassword(e.target.value)}

                                        placeholder="password"
                                    />
                                    {/* <input
                        className="outline-none placeholder:text-gray-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 rounded-full bg-color6 border-b-2 border-b-gray-800  hover:bg-gray-100"
                        type="password"
                        placeholder="password" /> */}
                                    <div className="flex">
                                        <input
                                            type="checkbox"
                                            className=" accent-gray-500 w-4"
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                        <p className="text-gray-300 pl-2">show password</p>
                                    </div>
                                    <button type="submit" className="bg-color1 text-gray-200 p-2 rounded-full border-b-4 border-b-gray-300 hover:font-bold">
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="flex">
                            <p className="text-gray-800 leading-10">have an account??</p>
                            <p className="text-gray-700 leading-10 underline" onClick={() => { setActive("fourth") }}>signin</p>
                        </div>
                        {/* Uncomment the following section if you intend to use it */}

                    </div>

                </div>
            </div>
        </div>
    )
}