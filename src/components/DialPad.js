"use client";

import { useState } from "react";
import { FaBackspace } from "react-icons/fa";

const DialPad = ({ value, onChange }) => {
  const handleKeyPress = (key) => {
    onChange(value + key);
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1));
  };

  const handleClear = () => {
    onChange("");
  };

  // Dial pad keys
  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["*", "0", "#"],
  ];

  return (
    <div className="w-full max-w-xs mx-auto bg-white/90 rounded-2xl shadow-lg p-6">
      {/* Number display */}
      <div className="mb-6 relative">
        <input
          type="tel"
          className="w-full px-5 py-4 text-2xl text-center font-bold border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white shadow-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter number"
          readOnly
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 bg-gray-100 rounded-full p-2 shadow"
            aria-label="Clear"
          >
            <FaBackspace size={22} />
          </button>
        )}
      </div>

      {/* Dial pad grid */}
      <div className="grid grid-cols-3 gap-5">
        {keys.map((row, rowIndex) =>
          row.map((key, keyIndex) => (
            <button
              key={`${rowIndex}-${keyIndex}`}
              onClick={() => handleKeyPress(key)}
              className="bg-gradient-to-br from-purple-100 via-blue-100 to-white hover:from-purple-200 hover:via-blue-200 text-purple-700 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-extrabold shadow transition duration-200 mx-auto focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {key}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default DialPad;
