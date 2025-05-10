"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import sipService from "../services/sipService";

const SipContext = createContext();

export const useSip = () => {
  const context = useContext(SipContext);
  if (!context) {
    throw new Error("useSip must be used within a SipProvider");
  }
  return context;
};

export const SipProvider = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState("");
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  const initializeSip = async (config) => {
    const success = await sipService.initialize(config);
    setIsRegistered(success);
    return success;
  };

  const makeCall = async (targetNumber) => {
    const success = await sipService.makeCall(targetNumber);
    if (success) {
      setIsCallActive(true);
      setCallStatus("calling");
    }
    return success;
  };

  const endCall = async () => {
    await sipService.endCall();
    setIsCallActive(false);
    setCallStatus("");
    setLocalStream(null);
    setRemoteStream(null);
  };

  const answerCall = async () => {
    await sipService.answerCall();
    setIsCallActive(true);
    setCallStatus("connected");
  };

  const rejectCall = async () => {
    await sipService.rejectCall();
    setIsCallActive(false);
    setCallStatus("");
  };

  const toggleMute = async () => {
    const newMuteState = await sipService.toggleMute();
    setIsMuted(newMuteState);
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (isRegistered) {
        sipService.userAgent?.stop();
      }
    };
  }, [isRegistered]);

  const value = {
    isRegistered,
    isCallActive,
    callStatus,
    localStream,
    remoteStream,
    isMuted,
    initializeSip,
    makeCall,
    endCall,
    answerCall,
    rejectCall,
    toggleMute,
  };

  return <SipContext.Provider value={value}>{children}</SipContext.Provider>;
};
