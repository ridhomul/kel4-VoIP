"use client";

import { FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <FaPhone className="mr-2" />
            <span className="font-bold">VoIP Integration Project</span>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} - Kamailio VoIP Integration
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
