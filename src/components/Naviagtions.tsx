import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";

export function Navigation() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    function handleLogout() {
        console.log("Logging out...");
        window.location.href = "/";
    }

    return (
        <>
            {/* Navigation Bar */}
            <header className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white flex justify-between items-center px-4 py-3 sm:px-8 fixed top-0 left-0 w-full z-40 shadow-md">
                <div className="flex items-center">
                    {/* Mobile Menu Toggle */}
                    <button
                        className="sm:hidden p-2 focus:outline-none"
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineBars size={24} />}
                    </button>
                    <h1 className="ml-4 text-2xl font-bold tracking-wide text-sky-200">Foam Cutting</h1>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden sm:flex space-x-8 text-lg">
                    <Link to="/app/home" className="hover:text-sky-300 transition-colors">Home</Link>
                    <Link to="/app/history" className="hover:text-sky-300 transition-colors">History</Link>
                    <Link to="/app/review" className="hover:text-sky-300 transition-colors">Review</Link>
                    <Link to="/app/account" className="hover:text-sky-300 transition-colors">My Account</Link>
                </nav>
            </header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="sm:hidden bg-blue-800 text-white mt-16 fixed top-0 left-0 w-full z-30 shadow-lg">
                    <ul className="space-y-2 px-6 py-4 text-lg">
                        <li><Link to="/app/home" className="block hover:text-sky-300">Home</Link></li>
                        <li><Link to="/app/review" className="block hover:text-sky-300">Review</Link></li>
                        <li><Link to="/app/history" className="block hover:text-sky-300">History</Link></li>
                        <li><Link to="/app/account" className="block hover:text-sky-300">My Account</Link></li>
                        <li><button onClick={handleLogout} className="block text-left w-full hover:text-sky-300">Logout</button></li>
                    </ul>
                </div>
            )}
        </>
    );
}
