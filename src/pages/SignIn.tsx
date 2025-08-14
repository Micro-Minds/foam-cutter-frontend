import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase.ts";


export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful");
            navigate("/app/home");
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Image */}
            <div className="w-1/2 hidden md:flex items-center justify-center bg-blue-100">
                <img
                    src={logo}
                    alt="MicroMinds_Logo"
                    className="w-4/5 rounded-xl shadow-lg"
                />
            </div>

            {/* Sign-In Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Sign In</h2>

                    <form className="space-y-5" onSubmit={handleSignIn}>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-500 mt-4">
                        Don’t have an account?{" "}
                        <a href="/signup" className="text-blue-700 font-medium hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
