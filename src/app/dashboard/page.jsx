'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useCall } from '../../context/CallContext';
import Image from 'next/image';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { callStatus } = useCall();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] flex items-center justify-center px-6">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left - Text */}
        <div className="space-y-6 md:pr-8 text-center md:text-left">
          <span className="uppercase text-sm text-purple-600 font-semibold tracking-wide">VOIP Provider</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 leading-tight">
            The Voice Over <br /> Internet Protocol
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto md:mx-0">
            Welcome back, <span className="font-bold text-purple-700">{user.phoneNumber || user.email}</span>. Start a call or explore the dashboard.
          </p>
          <a
            href="#"
            className="inline-block bg-purple-700 text-white text-base font-bold px-8 py-3 rounded-full shadow-lg hover:bg-purple-800 transition"
          >
            Explore Now
          </a>
        </div>
        {/* Right - Illustration */}
        <div className="flex justify-center">
          <Image
            src="/globe.svg"
            alt="VOIP Illustration"
            width={350}
            height={350}
            className="drop-shadow-xl"
            priority
          />
        </div>
      </div>
    </div>
  );
}
