'use client'
import Link from "next/link"
import { useState } from 'react'

const Signin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:3001/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            })
            const data = await res.json()
            if (data.message) {
                alert(data.message)
            } else {
                alert("Logged in successfully")
            }
        } catch (err) {
            console.error('Error signing in:', err)
            alert('An error occurred during sign-in. Please try again.')
        }
    }
<<<<<<< HEAD
=======
    return(
        <div className="w-screen h-screen">
            <div className="pb-4 w-screen h-screen screen_s">
                <div className="">
                    <div className="">
                        <div className="bg-color3 flex justify-center items-center sm:p-6 p-2">
                            <p className="sm:text-2xl text-xl text-gray-400 first-letter:text-gray-200 sm:first-letter:text-6xl first-letter:text-4xl uppercase font-bold">
                                Sign In{" "}
                            </p>
                        </div>
                        <div className="flex justify-center items-center flex-col">
                            <div className="shadow-2xl shadow-gray-400 rounded-3xl backdrop-opacity-10 backdrop-invert bg-gray-100 sm:w-fit pt-5 pb-5 pl-10 pr-10">
                                <div className="w-fit sm:p-4 rounded-tr-full rounded-bl-full bg-black shadow-2xl shadow-gray-400">
                                    <form onSubmit={(e) => handleLogin(e)} className="w-fit sm:p-8 rounded-tl-full bg-gray-500 rounded-br-full shadow-2xl shadow-gray-600 p-4">
                                        <div className="grid grid-rows-2 sm:gap-y-3 gap-y-1">
                                            <input
                                                className="outline-none placeholder:text-cyan-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 bg-gray-200 border-b-2 border-b-cyan-800 text-black rounded-full hover:bg-cyan-100"
                                                placeholder="username"
                                                onChange={(e) => setUsername(e.target.value)}
                                                type="text"
                                            />
                                            <input
                                                className="outline-none placeholder:text-cyan-500 mx-4 sm:mx-auto p-1 sm:p-2 mt-1 rounded-full bg-gray-200 border-b-2 text-black border-b-cyan-800 hover:bg-cyan-100"
                                                type={showPassword ? "text" : "password"}
                                                onChange={(e) => setPassword(e.target.value)}
>>>>>>> b09383fb6bc42b9a79b61ca7d004fe8e0de0a927

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-2xl rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        required
                    />
                    <div className="relative">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            required
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors"
                    >
                        Log In
                    </button>
                </form>
                <p className="text-center mt-4">
                    Don't have an account?{' '}
                    <Link href="/signup">
                        <a className="text-cyan-500 hover:underline">Sign Up</a>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signin
