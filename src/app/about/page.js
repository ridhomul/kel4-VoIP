"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { FaPhone, FaServer, FaUserAlt } from "react-icons/fa";

export default function AboutPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Tentang Aplikasi
          </h1>

          <div className="flex items-center justify-center mb-8">
            <div className="bg-blue-600 text-white p-4 rounded-full">
              <FaPhone size={30} />
            </div>
          </div>

          <p className="text-gray-700 mb-6">
            Aplikasi VoIP Integration adalah aplikasi web yang terintegrasi
            dengan server VoIP Kamailio. Aplikasi ini memungkinkan pengguna
            untuk melakukan panggilan suara dan video melalui jaringan internet
            menggunakan protokol UDP.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 flex items-center text-blue-700">
                <FaServer className="mr-2" /> Server VoIP
              </h3>
              <p className="text-gray-700">
                Aplikasi ini menggunakan Kamailio sebagai server SIP untuk
                mengatur otentikasi dan rute panggilan melalui protokol UDP.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 flex items-center text-blue-700">
                <FaUserAlt className="mr-2" /> Profil Anda
              </h3>
              <p className="text-gray-700">
                <strong>Nomor Telepon:</strong> {user.phoneNumber}
              </p>
              <p className="text-gray-700">
                <strong>SIP Username:</strong> {user.sipUsername}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 text-center">
              Fitur Utama
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Panggilan suara (audio)</li>
              <li>Panggilan video</li>
              <li>Dial pad untuk memasukkan nomor tujuan</li>
              <li>Riwayat panggilan</li>
              <li>Status panggilan real-time</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Tim Pengembang
          </h2>
          <p className="text-gray-700 mb-4">
            Aplikasi ini dikembangkan sebagai bagian dari proyek rekruitasi CPS VoIP
            Integration.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Anggota Tim:</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Syalza Sylvia Nurallifa </li>
              <li>Dafa Aulia Putera </li>
              <li>Ridho Anugrah Mulyadi</li>
              <li>Sayyid Faqih</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
