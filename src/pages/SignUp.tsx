import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            // Create user in Firebase Auth
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("User signed up successfully");
            navigate("/");
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
                    alt="Business"
                    className="w-4/5 rounded-xl shadow-lg"
                />
            </div>

            {/* Sign-Up Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Sign Up</h2>

                    <form className="space-y-5" onSubmit={handleSignUp}>
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

                        <div>
                            <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Confirm your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-500 mt-4">
                        Already have an account?{" "}
                        <a href="/signin" className="text-blue-700 font-medium hover:underline">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
