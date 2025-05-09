'use client';

import { useEffect, useRef } from 'react';
import { useCall, CALL_STATUS } from '../context/CallContext';
import { FaPhone, FaPhoneSlash, FaVideo, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const CallInterface = () => {
  const { 
    callStatus, 
    isVideo, 
    endCall, 
    answerCall, 
    getFormattedDuration,
    remoteStream,
    localStream
  } = useCall();
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  
  // Set up media streams
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
    
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [localStream, remoteStream]);
  
  // Get status text
  const getStatusText = () => {
    switch (callStatus) {
      case CALL_STATUS.CALLING:
        return 'Memanggil...';
      case CALL_STATUS.RINGING:
        return 'Berdering...';
      case CALL_STATUS.IN_CALL:
        return `Dalam Panggilan: ${getFormattedDuration()}`;
      case CALL_STATUS.ENDED:
        return 'Panggilan Berakhir';
      default:
        return '';
    }
  };
  
  return (
    <div className="bg-gray-900 rounded-lg shadow-xl p-6 max-w-2xl mx-auto text-white">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">{getStatusText()}</h2>
        <p>
          {isVideo ? <FaVideo className="inline mr-2" /> : <FaPhone className="inline mr-2" />}
          {isVideo ? 'Video Call' : 'Voice Call'}
        </p>
      </div>
      
      {/* Call content area */}
      <div className="mb-8">
        {isVideo && (
          <div className="relative">
            {/* Remote video (main) */}
            <div className="bg-gray-800 rounded-lg overflow-hidden aspect-video mb-4">
              {remoteStream ? (
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-gray-500 text-center">
                    <FaVideo size={40} className="mx-auto mb-2" />
                    <p>Menunggu video...</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Local video (small) */}
            <div className="absolute bottom-8 right-4 w-1/4 rounded-lg overflow-hidden border-2 border-white shadow-lg">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        
        {!isVideo && (
          <div className="bg-gray-800 rounded-lg p-10 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhone size={30} />
              </div>
              <p className="text-xl font-medium mb-2">Audio Call</p>
              <p className="text-gray-400">{getFormattedDuration()}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Call controls */}
      <div className="flex justify-center space-x-6">
        {callStatus === CALL_STATUS.RINGING && (
          <>
            <button
              onClick={() => answerCall(isVideo)}
              className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full transition duration-300"
              aria-label="Answer Call"
            >
              <FaPhone size={24} />
            </button>
            <button
              onClick={endCall}
              className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full transition duration-300"
              aria-label="Decline Call"
            >
              <FaPhoneSlash size={24} />
            </button>
          </>
        )}
        
        {(callStatus === CALL_STATUS.CALLING || callStatus === CALL_STATUS.IN_CALL) && (
          <>
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-full transition duration-300"
              aria-label="Mute"
            >
              <FaMicrophone size={24} />
            </button>
            <button
              onClick={endCall}
              className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full transition duration-300"
              aria-label="End Call"
            >
              <FaPhoneSlash size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CallInterface;