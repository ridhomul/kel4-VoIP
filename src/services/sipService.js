import JsSIP from "jssip";

class SipService {
  constructor() {
    this.userAgent = null;
    this.session = null;
    this.remoteStream = null;
    this.localStream = null;
  }

  async initialize(config) {
    try {
      const socket = new JsSIP.WebSocketInterface(config.wsUri);
      const sipConfig = {
        sockets: [socket],
        uri: config.sipUri,
        password: config.password,
        register: true,
        register_expires: 300,
        session_timers: false,
      };

      this.userAgent = new JsSIP.UA(sipConfig);

      // Event handlers
      this.userAgent.on("registered", () => {
        console.log("SIP registered successfully");
      });

      this.userAgent.on("unregistered", () => {
        console.log("SIP unregistered");
      });

      this.userAgent.on("registrationFailed", (ev) => {
        console.error("SIP registration failed:", ev.cause);
      });

      await this.userAgent.start();
      return true;
    } catch (error) {
      console.error("Failed to initialize SIP:", error);
      return false;
    }
  }

  async makeCall(targetNumber) {
    try {
      const options = {
        mediaConstraints: {
          audio: true,
          video: false,
        },
        pcConfig: {
          iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
        },
      };

      this.session = this.userAgent.call(targetNumber, options);

      this.session.on("progress", () => {
        console.log("Call in progress");
      });

      this.session.on("accepted", () => {
        console.log("Call accepted");
      });

      this.session.on("confirmed", () => {
        console.log("Call confirmed");
      });

      this.session.on("ended", () => {
        console.log("Call ended");
        this.session = null;
      });

      this.session.on("failed", (ev) => {
        console.error("Call failed:", ev.cause);
        this.session = null;
      });

      return true;
    } catch (error) {
      console.error("Failed to make call:", error);
      return false;
    }
  }

  async endCall() {
    if (this.session) {
      this.session.terminate();
      this.session = null;
    }
  }

  async answerCall() {
    if (this.session) {
      const options = {
        mediaConstraints: {
          audio: true,
          video: false,
        },
      };
      this.session.answer(options);
    }
  }

  async rejectCall() {
    if (this.session) {
      this.session.terminate();
      this.session = null;
    }
  }

  async toggleMute() {
    if (this.session) {
      const audioTracks = this.session.connection
        .getSenders()
        .filter((sender) => sender.track.kind === "audio");
      audioTracks.forEach((sender) => {
        sender.track.enabled = !sender.track.enabled;
      });
      return !audioTracks[0]?.track.enabled;
    }
    return false;
  }
}

export default new SipService();
