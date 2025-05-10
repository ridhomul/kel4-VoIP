"use client";

import { useEffect } from "react";
import { SipProvider } from "../context/SipContext";
import CallInterface from "../components/CallInterface";
import "../styles/globals.css";

export default function Home() {
  return (
    <SipProvider>
      <main className="min-h-screen">
        <CallInterface />
      </main>
    </SipProvider>
  );
}
