import React from 'react';
import logo from '../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';


export default function Navbar() {


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
                <Link href="#" className="text-color2 font-semibold me-4 px-4 py-2">Weather Forecasting</Link>
                <Link href="/signup" className="bg-color3 font-semibold text-color1 px-4 py-2 rounded hover:bg-blue-600">Sign Up</Link>
            </div>
        </nav>

    );
}
