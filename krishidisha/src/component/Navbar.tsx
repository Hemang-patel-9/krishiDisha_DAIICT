import React, { useEffect, useState } from 'react';
import logo from '../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';


export default function Navbar() {
    const [email, setEmail] = useState("");

    useEffect(() => {
        checkUser();
    }, [])

    const checkUser = async () => {
        const data = await fetch('/api/user/checkuser');
        const res = await data.json();

        if (res.success) {
            setEmail(res.data.email);
        }
    }

    const logOutUser = async () => {
        const data = await fetch('/api/user/logout');
        const res = await data.json();

        if (res.success) {
            console.log("User logout successfully");
            setEmail("");
        }
    }

    return (
        <nav className="bg-gray-200 bg-opacity-10 px-4 flex justify-between items-center">
            <div className="text-color2 font-bold text-xl">
                <Image src={logo} alt='logo here' width={50} height={50} />
            </div>

            <div className="flex ml-auto">
                <Link href="/" className="text-color2 font-semibold  me-4 px-4 py-2">Home</Link>
                <Link href="/leavedetector" className="text-color2 font-semibold me-4 px-4 py-2">Leaf Description</Link>
                <Link href="/experttalk" className="text-color2 font-semibold me-4 px-4 py-2">Expert Contact</Link>
                <Link href="/schemes" className="text-color2 font-semibold me-4 px-4 py-2">Government Schemes</Link>
                <Link href="/booking" className="text-color2 font-semibold me-4 px-4 py-2">Crop Booking</Link>
                <Link href="/signup" className="bg-color3 font-semibold text-color1 px-4 py-2 rounded hover:bg-blue-600">{email ? "LogOut" : "Login"}</Link>
            </div>
        </nav>

    );
}
