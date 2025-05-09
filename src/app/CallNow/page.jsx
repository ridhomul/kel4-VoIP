"use client";

import { useState, useEffect, useCallback } from "react";
import DialPad from "../../components/DialPad";
import CallButton from "../../components/CallButton";
import CallHistory from "../../components/CallHistory";
import { useCall } from "../../context/CallContext";
import { toast } from "react-toastify";

const DIAL_KEYS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "#"];

export default function CallNowPage() {
  const [dialNumber, setDialNumber] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { makeCall } = useCall();

  // Keyboard input handler
  const handleKeyDown = useCallback((e) => {
    if (showModal) return; // Prevent double modal
    if (DIAL_KEYS.includes(e.key)) {
      setDialNumber((prev) => prev + e.key);
    } else if (e.key === "Backspace") {
      setDialNumber((prev) => prev.slice(0, -1));
    } else if (e.key === "Enter") {
      if (!dialNumber || dialNumber.trim() === "") {
        toast.warning("Masukkan nomor tujuan terlebih dahulu");
        return;
      }
      setShowModal(true);
    }
  }, [dialNumber, showModal]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Handler for CallButton click
  const handleCallButton = () => {
    if (!dialNumber || dialNumber.trim() === "") {
      toast.warning("Masukkan nomor tujuan terlebih dahulu");
      return;
    }
    setShowModal(true);
  };

  // Handler for modal choice
  const handleCallType = (isVideo) => {
    setShowModal(false);
    makeCall(dialNumber, isVideo);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-purple-50 py-10 px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* DialPad Card */}
        <div className="bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
          <h2 className="text-2xl font-extrabold text-blue-900 mb-6">Dial a Number</h2>
          <DialPad value={dialNumber} onChange={setDialNumber} />
          <div className="mt-8 w-full flex justify-center">
            <button
              onClick={handleCallButton}
              className="flex items-center justify-center px-8 py-3 rounded-full font-bold text-lg shadow-lg transition duration-300 bg-purple-600 hover:bg-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Call
            </button>
          </div>
        </div>
        {/* Call History Card */}
        <div className="bg-white/90 rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-extrabold text-blue-900 mb-6">Call History</h2>
          <CallHistory />
        </div>
      </div>
      {/* Modal for call type selection */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xs w-full text-center animate-fade-in">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Choose Call Type</h3>
            <p className="mb-6 text-gray-600">Would you like to make a voice or video call?</p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleCallType(false)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-lg bg-purple-600 hover:bg-purple-700 text-white shadow transition"
              >
                Voice Call
              </button>
              <button
                onClick={() => handleCallType(true)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-lg bg-blue-600 hover:bg-blue-700 text-white shadow transition"
              >
                Video Call
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full mt-2 text-gray-500 hover:text-gray-700 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
