"use client";

import { createContext, useState, useEffect, useContext, useRef } from "react";
import { useAuth } from "./AuthContext";
import * as JsSIP from "jssip";
import { toast } from "react-toastify";

const CallContext = createContext();

export const CALL_STATUS = {
  IDLE: "idle",
  CALLING: "calling",
  RINGING: "ringing",
  IN_CALL: "in_call",
  ENDED: "ended",
};

export const CallProvider = ({ children }) => {
  const { user } = useAuth();
  const [callStatus, setCallStatus] = useState(CALL_STATUS.IDLE);
  const [currentCall, setCurrentCall] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [remoteStream, setRemoteStream] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [callHistory, setCallHistory] = useState([]);
  const [callDuration, setCallDuration] = useState(0);
  const [callStartTime, setCallStartTime] = useState(null);

  const userAgentRef = useRef(null);
  const durationTimerRef = useRef(null);

  useEffect(() => {
    if (user) {
      initializeUserAgent();
    }

    return () => {
      if (userAgentRef.current) {
        userAgentRef.current.stop();
      }
      if (durationTimerRef.current) {
        clearInterval(durationTimerRef.current);
      }
    };
  }, [user]);

  const initializeUserAgent = () => {
    try {
      const socket = new JsSIP.WebSocketInterface(
        "wss://your-kamailio-domain-or-ip:5061"
      );

      const SIP_DOMAIN = "your-kamailio-domain-or-ip";

      const iceServers = [{ urls: "stun:stun.l.google.com:19302" }];

      const configuration = {
        sockets: [socket],
        uri: `sip:${user.sipUsername}@${SIP_DOMAIN}`,
        password: user.sipPassword,
        display_name: user.phoneNumber,
        register: true,
        register_expires: 300,
        iceServers,
      };

      const userAgent = new JsSIP.UA(configuration);

      userAgent.on("registered", () => {
        console.log("Registered with SIP server");
      });

      userAgent.on("unregistered", () => {
        console.log("Unregistered from SIP server");
      });

      userAgent.on("registrationFailed", (e) => {
        console.error("Registration failed", e);
        toast.error("Koneksi ke server VoIP gagal");
      });

      userAgent.on("newRTCSession", (data) => {
        const session = data.session;

        if (session.direction === "incoming") {
          handleIncomingCall(session);
        }
      });

      userAgent.start();
      userAgentRef.current = userAgent;
    } catch (error) {
      console.error("Error initializing user agent:", error);
      toast.error("Gagal menginisialisasi koneksi VoIP");
    }
  };

  const handleIncomingCall = (session) => {
    setCurrentCall(session);
    setCallStatus(CALL_STATUS.RINGING);
    setIsVideo(session.request.getHeader("Content-Type").includes("video"));

    const newCallRecord = {
      id: Date.now(),
      number: session.remote_identity.uri.user,
      type: session.request.getHeader("Content-Type").includes("video")
        ? "video"
        : "audio",
      status: "received",
      startTime: new Date(),
      endTime: null,
      duration: 0,
    };

    setCallHistory((prev) => [newCallRecord, ...prev]);

    setupCallEventHandlers(session);
  };

  const makeCall = async (number, withVideo = false) => {
    try {
      if (!userAgentRef.current) {
        throw new Error("VoIP client tidak terkoneksi");
      }

      if (!number) {
        throw new Error("Nomor tujuan tidak valid");
      }

      const constraints = {
        audio: true,
        video: withVideo,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);
      setIsVideo(withVideo);

      const SIP_DOMAIN = "your-kamailio-domain-or-ip";
      const destination = `sip:${number}@${SIP_DOMAIN}`;
      const options = {
        mediaConstraints: constraints,
        rtcOfferConstraints: {
          offerToReceiveAudio: true,
          offerToReceiveVideo: withVideo,
        },
      };

      const session = userAgentRef.current.call(destination, options);
      setCurrentCall(session);
      setCallStatus(CALL_STATUS.CALLING);

      const newCallRecord = {
        id: Date.now(),
        number,
        type: withVideo ? "video" : "audio",
        status: "outgoing",
        startTime: new Date(),
        endTime: null,
        duration: 0,
      };

      setCallHistory((prev) => [newCallRecord, ...prev]);

      setupCallEventHandlers(session);
    } catch (error) {
      console.error("Error making call:", error);
      toast.error(error.message || "Gagal melakukan panggilan");
      endCall();
    }
  };

  const setupCallEventHandlers = (session) => {
    session.on("progress", () => {
      if (session.direction === "outgoing") {
        setCallStatus(CALL_STATUS.RINGING);
      }
    });

    session.on("accepted", () => {
      setCallStatus(CALL_STATUS.IN_CALL);
      const startTime = new Date();
      setCallStartTime(startTime);

      durationTimerRef.current = setInterval(() => {
        const currentDuration = Math.floor((new Date() - startTime) / 1000);
        setCallDuration(currentDuration);
      }, 1000);

      setCallHistory((prev) =>
        prev.map((call) => {
          if (call.id === Date.now()) {
            return { ...call, status: "connected" };
          }
          return call;
        })
      );
    });

    session.on("ended", () => {
      endCall();
    });

    session.on("failed", () => {
      setCallStatus(CALL_STATUS.ENDED);

      setCallHistory((prev) =>
        prev.map((call) => {
          if (call.id === Date.now()) {
            return {
              ...call,
              status: "missed",
              endTime: new Date(),
              duration: callDuration,
            };
          }
          return call;
        })
      );

      resetCall();
      toast.info("Panggilan gagal");
    });

    session.on("peerconnection", (e) => {
      const peerconnection = e.peerconnection;

      peerconnection.ontrack = (trackEvent) => {
        const [remoteTrack] = trackEvent.streams;
        setRemoteStream(remoteTrack);
      };
    });
  };

  const endCall = () => {
    if (currentCall) {
      try {
        if (currentCall.isEstablished()) {
          currentCall.terminate();
        } else if (!currentCall.isEnded()) {
          currentCall.terminate();
        }
      } catch (error) {
        console.error("Error ending call:", error);
      }
    }

    setCallStatus(CALL_STATUS.ENDED);

    setCallHistory((prev) =>
      prev.map((call) => {
        if (call.id === Date.now()) {
          return {
            ...call,
            status: "ended",
            endTime: new Date(),
            duration: callDuration,
          };
        }
        return call;
      })
    );

    resetCall();
  };

  const answerCall = async (withVideo = false) => {
    try {
      if (!currentCall) {
        throw new Error("Tidak ada panggilan masuk");
      }

      const constraints = {
        audio: true,
        video: withVideo && isVideo,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);

      const options = {
        mediaConstraints: constraints,
        rtcAnswerConstraints: {
          offerToReceiveAudio: true,
          offerToReceiveVideo: withVideo && isVideo,
        },
      };

      currentCall.answer(options);
      setCallStatus(CALL_STATUS.IN_CALL);
    } catch (error) {
      console.error("Error answering call:", error);
      toast.error(error.message || "Gagal menjawab panggilan");
      endCall();
    }
  };

  const resetCall = () => {
    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current);
    }

    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }

    setCurrentCall(null);
    setRemoteStream(null);
    setLocalStream(null);
    setCallDuration(0);
    setCallStartTime(null);
    setCallStatus(CALL_STATUS.IDLE);
  };

  const getFormattedDuration = () => {
    const minutes = Math.floor(callDuration / 60);
    const seconds = callDuration % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const value = {
    callStatus,
    isVideo,
    makeCall,
    answerCall,
    endCall,
    callHistory,
    callDuration,
    getFormattedDuration,
    remoteStream,
    localStream,
  };

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>;
};

export const useCall = () => useContext(CallContext);

export default CallContext;
