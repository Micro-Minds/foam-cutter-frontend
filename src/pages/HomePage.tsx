import { useState } from "react";
import machineImage from "../assets/machine.jpg";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { sendGcodeToESP } from "../service/sendGCodeToEsp.ts";
import {generateGCodeForCircle, generateRectangleGCode } from "../generateGCodes/genarateShapeGCode.ts";

export const HomePage = () => {
  const [showShapeForm, setShowShapeForm] = useState(false);
  const [shape, setShape] = useState("circle");
  const [circleRadius, setCircleRadius] = useState("");
  const [rectangleLength, setRectangleLength] = useState("");
  const [rectangleBreadth, setRectangleBreadth] = useState("");
  const [feedRate, setFeedRate] = useState("200");
  const [stepSize, setStepSize] = useState("1");

  const handleSubmit = async () => {
    const feedRateNum = Number(feedRate);
    const stepSizeNum = Number(stepSize);
    if (isNaN(feedRateNum) || isNaN(stepSizeNum)) {
      alert("❌ Invalid feed rate or step size");
      return;
    }

    let gcode: string[] = [];

    if (shape === "circle") {
      const radiusNum = Number(circleRadius);
      if (isNaN(radiusNum)) return alert("❌ Invalid radius");                                             // user may keep this empty
      gcode = generateGCodeForCircle(radiusNum, feedRateNum, stepSizeNum);
    }

    if (shape === "rectangle") {
      const l = Number(rectangleLength);
      const b = Number(rectangleBreadth);
      if (isNaN(l) || isNaN(b)) return alert("❌ Invalid length or breadth");
      gcode = generateRectangleGCode(l, b, feedRateNum);
    }

    // Save job to Firestore
    const jobData: any = {                                                                                //creating a new object jobData that represents a G-code job
      shape,          
      feedRate: feedRateNum,
      stepSize: stepSizeNum,
      gcode,
      status: "pending",
      createdAt: Timestamp.now(),
    };
    if (shape === "circle") jobData.radius = Number(circleRadius);
    if (shape === "rectangle") {
      jobData.length = Number(rectangleLength);
      jobData.breadth = Number(rectangleBreadth);
    }

    try {
      await addDoc(collection(db, "gcodes"), jobData);                                                   //addDoc() to upload the jobData object to your Firestore
      alert("✅ G-code uploaded to Firestore. Now sending to ESP32...");
      await sendGcodeToESP(gcode);
      alert("✅ G-code sent to ESP32 via WebSocket.");
    } catch (err) {
      console.error("Error submitting or sending:", err);
      alert("❌ Failed to send G-code to ESP32.");
    }

    // Reset form
    setCircleRadius("");
    setRectangleLength("");
    setRectangleBreadth("");
    setFeedRate("200");
    setStepSize("1");
    setShowShapeForm(false);
  };

  return (
      <div className="flex flex-col min-h-screen bg-[#f0ede7] text-gray-800">
        <main className="flex-grow flex flex-col items-center justify-center px-2 py-6 text-center">
          <img src={machineImage} alt="Design preview" className="w-full max-w-xl h-64 mx-auto" />
          <br /><br /><br />
          <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4">Your Design Portal</h1>
          <p className="max-w-2xl text-base sm:text-lg text-gray-700 mb-8">
            Welcome to your personal design space! Upload your creations or choose from our saved designs to bring your ideas to life.
          </p>
          
          <div className="text-left mt-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-3 text-green-700">📌 Machine Usage Instructions</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm sm:text-base">
              <li>Ensure the machine is powered on and connected to Wi-Fi.</li>
              <li>Place and secure the rigifoam sheet on the platform.</li>
              <li>Always check the feed rate and step size before sending the G-code.</li>
              <li>Do not touch the wire while the machine is operating.</li>
              <li>Click “Send G-Code” only when everything is set and safe.</li>
              <li>Use the Review tab to double-check previous jobs.</li>
            </ul>
          </div>
          <br /><br />

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
                      <label className="block font-semibold mb-1">Radius (mm):</label>
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
                        <label className="block font-semibold mb-1">Length (mm):</label>
                        <input
                            type="number"
                            value={rectangleLength}
                            onChange={(e) => setRectangleLength(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Breadth (mm):</label>
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
                  <label className="block font-semibold mb-1">Feed Rate (mm/min):</label>
                  <input
                      type="number"
                      value={feedRate}
                      onChange={(e) => setFeedRate(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Step Size (°):</label>
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
                  📤 Generate & Send G-Code
                </button>
              </div>
          )}
        </main>
      </div>
  );
};
