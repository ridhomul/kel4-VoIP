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
    <nav className="bg-white shadow-sm w-full sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          {/* Replace with your logo image if available */}
          <span className="inline-block">
            <FaPhone className="text-purple-600 text-2xl" />
          </span>
          <span className="text-2xl font-extrabold text-purple-700 tracking-tight">VoIPone</span>
        </Link>
        {/* Centered Nav Links */}
        <div className="hidden md:flex gap-8 mx-auto text-base font-medium">
          <Link href="/dashboard" className={`hover:text-purple-600 transition ${pathname === "/dashboard" ? "text-purple-600 font-bold" : "text-gray-700"}`}>Home</Link>
          <Link href="#" className="text-gray-700 hover:text-purple-600 transition">VOIP</Link>
          <Link href="#" className="text-gray-700 hover:text-purple-600 transition">Pages</Link>
          <Link href="#" className="text-gray-700 hover:text-purple-600 transition">Plugins</Link>
          <Link href="#" className="text-gray-700 hover:text-purple-600 transition">Blog</Link>
          <Link href="#" className="text-gray-700 hover:text-purple-600 transition">Shop</Link>
          <Link href="#" className="text-gray-700 hover:text-purple-600 transition">Contact</Link>
        </div>
        {/* Right Side: User/Account/Cart */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden md:inline-flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold text-sm">
                <FaUser className="mr-2" />
                {user.phoneNumber}
              </span>
              <button
                onClick={logout}
                className="ml-2 px-4 py-2 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-6 py-2 bg-purple-600 text-white font-bold rounded-full shadow hover:bg-purple-700 transition duration-300"
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
