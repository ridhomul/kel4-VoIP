"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";
import { FaPhone, FaUser, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";

const Navigation = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user && pathname === "/login") {
    return null;
  }

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link
            href={user ? "/dashboard" : "/"}
            className="text-xl font-bold flex items-center"
          >
            <FaPhone className="mr-2" />
            <span>VoIP App</span>
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className={`flex items-center hover:text-blue-200 ${
                  pathname === "/dashboard" ? "text-blue-200 font-bold" : ""
                }`}
              >
                <FaPhone className="mr-1" />
                <span>Dial</span>
              </Link>
              <Link
                href="/about"
                className={`flex items-center hover:text-blue-200 ${
                  pathname === "/about" ? "text-blue-200 font-bold" : ""
                }`}
              >
                <FaInfoCircle className="mr-1" />
                <span>About</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center hover:text-blue-200 ml-4"
              >
                <FaSignOutAlt className="mr-1" />
                <span>Logout</span>
              </button>
              <div className="ml-4 flex items-center">
                <FaUser className="mr-2" />
                <span className="font-medium">{user.phoneNumber}</span>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-100 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
