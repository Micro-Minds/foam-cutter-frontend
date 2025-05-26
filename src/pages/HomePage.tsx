import React from "react";

export const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#f0ede7] text-gray-800">
            <main className="flex-grow flex flex-col items-center justify-center px-6 py-20 text-center">
                {/* Image */}
                <div className="mb-8">
                    <img
                        src="/chess.png" // Place your image in `public/chess.png`
                        alt="Design preview"
                        className="w-48 h-48 mx-auto rounded-lg object-contain shadow-md"
                    />
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4">Your Design Portal</h1>

                {/* Paragraph */}
                <p className="max-w-2xl text-base sm:text-lg text-gray-700 mb-8">
                    Welcome to your personal design space!<br />
                    Upload your creations or choose from our saved designs to bring your ideas to life.
                    With easy-to-use tools and seamless integration, your creative journey starts here.
                    Let’s make something extraordinary today!
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-green-300 hover:bg-green-400 text-black font-medium py-2 px-6 rounded-lg shadow">
                        Upload Image
                    </button>
                    <button className="bg-green-300 hover:bg-green-400 text-black font-medium py-2 px-6 rounded-lg shadow">
                        Select Shape <span className="ml-2">▼</span>
                    </button>
                </div>
            </main>
        </div>
    );
};
