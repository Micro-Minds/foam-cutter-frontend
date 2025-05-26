import React, { useState } from "react";
import chessImage from "../assets/chess.jpg";

export const HomePage = () => {
  const [showShapeForm, setShowShapeForm] = useState(false);
  const [shape, setShape] = useState("circle");
  const [circleRadius, setCircleRadius] = useState("");
  const [rectangleLength, setRectangleLength] = useState("");
  const [rectangleBreadth, setRectangleBreadth] = useState("");
  const [feedRate, setFeedRate] = useState("200");
  const [stepSize, setStepSize] = useState("1");

  const handleSubmit = async () => {
    let payload = {
      feedRate: Number(feedRate),
      stepSize: Number(stepSize),
    };

    if (shape === "circle") {
      payload.radius = Number(circleRadius);
    } else if (shape === "rectangle") {
      payload.length = Number(rectangleLength);
      payload.breadth = Number(rectangleBreadth);
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/gcode/${shape}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);
      alert("Shape submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f0ede7] text-gray-800">
      <main className="flex-grow flex flex-col items-center justify-center px-2 py-6 text-center">
        {/* Image */}
        <div className="mb-8">
          <img
            src={chessImage}
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
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button className="bg-green-300 hover:bg-green-400 text-black font-medium py-2 px-6 rounded-lg shadow">
            Upload Image
          </button>
          <button
            onClick={() => setShowShapeForm(!showShapeForm)}
            className="bg-green-300 hover:bg-green-400 text-black font-medium py-2 px-6 rounded-lg shadow"
          >
            Select Shape <span className="ml-2">▼</span>
          </button>
        </div>

        {/* Shape Selection Form */}
        {showShapeForm && (
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-left space-y-4">
            <div>
              <label className="block font-semibold mb-1">Shape:</label>
              <select
                value={shape}
                onChange={(e) => setShape(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="circle">Circle</option>
                <option value="rectangle">Rectangle</option>
              </select>
            </div>

            {shape === "circle" && (
              <div>
                <label className="block font-semibold mb-1">Radius:</label>
                <input
                  type="number"
                  value={circleRadius}
                  onChange={(e) => setCircleRadius(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            )}

            {shape === "rectangle" && (
              <>
                <div>
                  <label className="block font-semibold mb-1">Length:</label>
                  <input
                    type="number"
                    value={rectangleLength}
                    onChange={(e) => setRectangleLength(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Breadth:</label>
                  <input
                    type="number"
                    value={rectangleBreadth}
                    onChange={(e) => setRectangleBreadth(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block font-semibold mb-1">Feed Rate:</label>
              <input
                type="number"
                value={feedRate}
                onChange={(e) => setFeedRate(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Step Size:</label>
              <input
                type="number"
                value={stepSize}
                onChange={(e) => setStepSize(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Generate G-Code
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
