"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { FaPhone, FaSignInAlt } from "react-icons/fa";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if already logged in
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 text-white p-3 rounded-full">
              <FaPhone size={24} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Login VoIP App</h1>
          <p className="text-gray-600 mt-2">
            Masuk dengan nomor telepon yang terdaftar di server Kamailio
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700 mb-2">
              Nomor Telepon
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: 628123456789"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Format: Kode negara + nomor (tanpa tanda +)
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin mr-2">⏳</span>
            ) : (
              <FaSignInAlt className="mr-2" />
            )}
            {isLoading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
