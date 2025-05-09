 "use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { FaPhone, FaSignInAlt } from "react-icons/fa";
import Image from "next/image";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(phoneNumber);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-purple-100">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl px-4 py-12 md:py-20">
        {/* Left: Illustration */}
        <div className="hidden md:flex w-1/2 justify-center items-center pr-8">
          <Image
            src="/globe.svg"
            alt="Login Illustration"
            width={320}
            height={320}
            className="drop-shadow-xl"
            priority
          />
        </div>
        {/* Right: Login Card */}
        <div className="w-full md:w-1/2 bg-white/90 p-8 rounded-3xl shadow-2xl backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-600 text-white p-3 rounded-full shadow-lg">
                <FaPhone size={28} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-2">Welcome Back!</h1>
            <p className="text-gray-600 text-base md:text-lg">
              Login to your VoIP account and stay connected everywhere.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="phoneNumber" className="block text-gray-700 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
                placeholder="e.g. 628123456789"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Format: Country code + number (no plus sign)
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center shadow-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-spin mr-2">⏳</span>
              ) : (
                <FaSignInAlt className="mr-2" />
              )}
              {isLoading ? "Processing..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
