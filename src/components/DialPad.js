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
    <div className="w-full max-w-xs mx-auto">
      {/* Number display */}
      <div className="mb-4 relative">
        <input
          type="tel"
          className="w-full px-4 py-3 text-2xl text-center font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter number"
          readOnly
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
            aria-label="Clear"
          >
            <FaBackspace size={20} />
          </button>
        )}
      </div>

      {/* Dial pad grid */}
      <div className="grid grid-cols-3 gap-4">
        {keys.map((row, rowIndex) =>
          row.map((key, keyIndex) => (
            <button
              key={`${rowIndex}-${keyIndex}`}
              onClick={() => handleKeyPress(key)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-medium transition duration-200 mx-auto"
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
