"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { FaMicrophone, FaHeadphones, FaVideo, FaShieldAlt, FaChartLine, FaCog } from "react-icons/fa";

export default function PluginsPage() {
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

  const plugins = [
    {
      name: "Voice Enhancement",
      description: "Advanced audio processing for crystal clear calls",
      icon: <FaMicrophone className="w-8 h-8" />,
      features: ["Noise reduction", "Echo cancellation", "Voice clarity"],
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Audio Effects",
      description: "Professional audio effects for your calls",
      icon: <FaHeadphones className="w-8 h-8" />,
      features: ["Equalizer", "Spatial audio", "Voice effects"],
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Video Enhancement",
      description: "HD video calling with advanced features",
      icon: <FaVideo className="w-8 h-8" />,
      features: ["HD streaming", "Background blur", "Auto-focus"],
      color: "from-green-500 to-green-600"
    },
    {
      name: "Security Suite",
      description: "Enterprise-grade security for your calls",
      icon: <FaShieldAlt className="w-8 h-8" />,
      features: ["End-to-end encryption", "Call authentication", "Fraud detection"],
      color: "from-red-500 to-red-600"
    },
    {
      name: "Analytics Dashboard",
      description: "Detailed insights into your call quality",
      icon: <FaChartLine className="w-8 h-8" />,
      features: ["Call metrics", "Quality reports", "Usage statistics"],
      color: "from-yellow-500 to-yellow-600"
    },
    {
      name: "Custom Integrations",
      description: "Connect with your favorite tools",
      icon: <FaCog className="w-8 h-8" />,
      features: ["CRM integration", "Calendar sync", "Custom workflows"],
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">VoIP Plugins</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enhance your calling experience with our premium plugins
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plugins.map((plugin, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className={`h-2 bg-gradient-to-r ${plugin.color}`}></div>
              <div className="p-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${plugin.color} flex items-center justify-center text-white mb-4`}>
                  {plugin.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plugin.name}</h3>
                <p className="text-gray-600 mb-4">{plugin.description}</p>
                <ul className="space-y-2">
                  {plugin.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                  Install Plugin
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
            Need Custom Solutions?
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            We can develop custom plugins tailored to your specific needs. Contact our team to discuss your requirements.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/contact")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 