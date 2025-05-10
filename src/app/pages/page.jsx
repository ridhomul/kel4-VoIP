"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { FaFileAlt, FaBook, FaNewspaper, FaShoppingBag, FaEnvelope, FaPhone } from "react-icons/fa";
import Image from "next/image";

export default function PagesPage() {
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

  const pages = [
    {
      title: "Plugins",
      description: "Explore our VoIP plugins and extensions",
      icon: <FaFileAlt className="w-8 h-8" />,
      href: "/plugins",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Blog",
      description: "Latest news and updates about VoIP technology",
      icon: <FaNewspaper className="w-8 h-8" />,
      href: "/blog",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Shop",
      description: "Browse our VoIP products and services",
      icon: <FaShoppingBag className="w-8 h-8" />,
      href: "/shop",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Contact",
      description: "Get in touch with our support team",
      icon: <FaEnvelope className="w-8 h-8" />,
      href: "/contact",
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Pages</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive collection of VoIP resources, tools, and services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pages.map((page, index) => (
            <a
              key={index}
              href={page.href}
              className="group block bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className={`h-2 bg-gradient-to-r ${page.color}`}></div>
              <div className="p-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${page.color} flex items-center justify-center text-white mb-4`}>
                  {page.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {page.title}
                </h3>
                <p className="text-gray-600">{page.description}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-blue-600 text-white p-4 rounded-full">
              <FaPhone size={30} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Explore our pages to find the perfect VoIP solution for your needs. From plugins to support, we've got you covered.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 