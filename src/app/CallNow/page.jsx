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
  const { makeCall } = useCall();

  // Keyboard input handler
  const handleKeyDown = useCallback((e) => {
    if (DIAL_KEYS.includes(e.key)) {
      setDialNumber((prev) => prev + e.key);
    } else if (e.key === "Backspace") {
      setDialNumber((prev) => prev.slice(0, -1));
    } else if (e.key === "Enter") {
      if (!dialNumber || dialNumber.trim() === "") {
        toast.warning("Masukkan nomor tujuan terlebih dahulu");
        return;
      }
      makeCall(dialNumber, false); // false = audio call
    }
  }, [dialNumber, makeCall]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-purple-50 py-10 px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* DialPad Card */}
        <div className="bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
          <h2 className="text-2xl font-extrabold text-blue-900 mb-6">Dial a Number</h2>
          <DialPad value={dialNumber} onChange={setDialNumber} />
          <div className="mt-8 w-full flex justify-center">
            <CallButton number={dialNumber} type="audio" />
          </div>
        </div>
        {/* Call History Card */}
        <div className="bg-white/90 rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-extrabold text-blue-900 mb-6">Call History</h2>
          <CallHistory />
        </div>
      </div>
    </div>
  );
}
