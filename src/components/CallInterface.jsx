import React, { useState } from "react";
import { useSip } from "../context/SipContext";
import {
  FaPhone,
  FaPhoneSlash,
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa";

const CallInterface = () => {
  const {
    isRegistered,
    isCallActive,
    callStatus,
    isMuted,
    makeCall,
    endCall,
    answerCall,
    rejectCall,
    toggleMute,
  } = useSip();

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCall = async () => {
    if (phoneNumber) {
      await makeCall(phoneNumber);
    }
  };

  const handleEndCall = async () => {
    await endCall();
  };

  const handleAnswerCall = async () => {
    await answerCall();
  };

  const handleRejectCall = async () => {
    await rejectCall();
  };

  const handleToggleMute = async () => {
    await toggleMute();
  };

  if (!isRegistered) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">SIP Not Registered</h2>
          <p className="text-gray-600">
            Please wait while we connect to the SIP server...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center mb-4">SIP Phone</h2>
          <div className="flex items-center justify-center mb-4">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isCallActive}
            />
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          {!isCallActive ? (
            <button
              onClick={handleCall}
              disabled={!phoneNumber}
              className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <FaPhone />
            </button>
          ) : (
            <>
              <button
                onClick={handleEndCall}
                className="flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <FaPhoneSlash />
              </button>
              <button
                onClick={handleToggleMute}
                className={`flex items-center justify-center w-12 h-12 ${
                  isMuted ? "bg-gray-500" : "bg-blue-500"
                } text-white rounded-full hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
            </>
          )}
        </div>

        {callStatus && (
          <div className="mt-4 text-center">
            <p className="text-gray-600">{callStatus}</p>
          </div>
        )}

        {callStatus === "incoming" && (
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={handleAnswerCall}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Answer
            </button>
            <button
              onClick={handleRejectCall}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallInterface;
