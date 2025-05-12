"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";
import { FaPhone, FaUser, FaInfoCircle, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const Navigation = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  if (!user && pathname === "/login") {
    return null;
  }

  const navLinks = [
    { href: "/dashboard", label: "Home" },
    { href: "/pages", label: "Pages" },
    { href: "/plugins", label: "Plugins" },
    { href: "/blog", label: "Blog" },
    { href: "/shop", label: "Shop" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Logo */}
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
            <span className="inline-block">
              <FaPhone className="text-purple-600 text-2xl" />
            </span>
            <span className="text-2xl font-extrabold text-purple-700 tracking-tight">VoIPone</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 mx-auto text-base font-medium">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`hover:text-purple-600 transition ${
                  pathname === link.href ? "text-purple-600 font-bold" : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/CallNow"
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-extrabold rounded-full shadow-lg text-lg hover:scale-105 hover:from-purple-700 hover:to-blue-700 transition duration-200 border-2 border-purple-200"
            >
              <FaPhone className="text-xl" />
              Call Now
            </Link>
            {user ? (
              <>
                <span className="hidden md:inline-flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold text-sm">
                  <FaUser className="mr-2" />
                  {user.phoneNumber}
                </span>
                <button
                  onClick={logout}
                  className="hidden md:block ml-2 px-4 py-2 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="hidden md:block px-6 py-2 bg-purple-600 text-white font-bold rounded-full shadow hover:bg-purple-700 transition duration-300"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-3' : 'top-1'
                }`}></span>
                <span className={`absolute h-0.5 w-6 bg-current top-3 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 top-3' : 'top-5'
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <FaPhone className="text-purple-600 text-xl" />
              <span className="text-xl font-bold text-purple-700">VoIPone</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-6 py-3 text-lg transition-colors ${
                  pathname === link.href 
                    ? 'text-purple-600 font-bold bg-purple-50' 
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="p-4 border-t">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg">
                  <FaUser className="text-purple-600" />
                  <span className="text-purple-700 font-medium">{user.phoneNumber}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block w-full px-4 py-2 bg-purple-600 text-white text-center rounded-lg font-bold hover:bg-purple-700 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
