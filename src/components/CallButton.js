"use client";

import { FaPhone, FaVideo } from "react-icons/fa";
import { useCall } from "../context/CallContext";
import { toast } from "react-toastify";

const CallButton = ({ number, type = "audio" }) => {
  const { makeCall } = useCall();

  const handleCall = () => {
    if (!number || number.trim() === "") {
      toast.warning("Masukkan nomor tujuan terlebih dahulu");
      return;
    }

    const isVideo = type === "video";
    makeCall(number, isVideo);
  };

  return (
    <button
      onClick={handleCall}
      className={`
        flex items-center justify-center px-8 py-3 rounded-full font-bold text-lg shadow-lg transition duration-300
        ${
          type === "audio"
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }
        focus:outline-none focus:ring-2 focus:ring-purple-400
      `}
      aria-label={type === "audio" ? "Voice Call" : "Video Call"}
    >
      {type === "audio" ? (
        <>
          <FaPhone className="mr-2" />
          <span>Call</span>
        </>
      ) : (
        <>
          <FaVideo className="mr-2" />
          <span>Video</span>
        </>
      )}
    </button>
  );
};

export default CallButton;
