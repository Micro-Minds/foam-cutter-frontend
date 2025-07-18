import React from "react";
import gearImage from "../assets/gear.png"; 

export function HistoryPage() {
  return (
    <div className="bg-[#e5dfd5] min-h-screen pt-8">
      <h1 className="text-3xl font-bold text-center mb-6">My Saved Designs</h1>

      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search here ..."
            className="w-full pl-4 pr-10 py-2 rounded-full border focus:outline-none shadow-sm"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            🔍
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <table className="w-11/12 md:w-3/4 bg-white border border-gray-300 shadow-md text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 border">Name</th>
              <th className="py-3 px-4 border">Date</th>
              <th className="py-3 px-4 border">Image</th>
              <th className="py-3 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="py-3 px-4 border">flower.jpg</td>
              <td className="py-3 px-4 border">10.01.2025</td>
              <td className="py-3 px-4 border">
                <img
                  src={gearImage}
                  alt="Design"
                  className="w-16 h-16 mx-auto"
                />
              </td>
              <td className="py-3 px-4 border">
                <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                  Reprint
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
