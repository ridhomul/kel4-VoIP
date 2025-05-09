"use client";

import { FaPhone } from "react-icons/fa";

const SIP_DOMAIN = "your-kamailio-domain-or-ip"; // <-- Change to your SIP domain

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-500 text-white py-6 mt-8 shadow-inner rounded-t-3xl">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center mb-2 md:mb-0">
          <span className="bg-white text-purple-600 rounded-full p-2 shadow mr-2">
            <FaPhone size={20} />
          </span>
          <span className="font-bold text-lg tracking-tight">VoIP Integration Project</span>
        </div>
        <div className="text-sm opacity-90">
          &copy; {new Date().getFullYear()} - Kamailio VoIP Integration
        </div>
      </div>
    </footer>
  );
};

export default Footer;
