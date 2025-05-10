'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { FaPhone, FaChartLine, FaUsers, FaHeadset, FaShieldAlt, FaCog, FaTimes } from 'react-icons/fa';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    // Trigger fade-in animation
    setIsVisible(true);
    // Show modal after a short delay
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000);
    return () => clearTimeout(timer);
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

  const stats = [
    {
      title: "Active Calls",
      value: "12",
      change: "+2.5%",
      icon: <FaPhone className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      icon: <FaUsers className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Support Tickets",
      value: "8",
      change: "-3.2%",
      icon: <FaHeadset className="w-6 h-6" />,
      color: "from-green-500 to-green-600"
    },
    {
      title: "System Health",
      value: "98%",
      change: "+0.5%",
      icon: <FaShieldAlt className="w-6 h-6" />,
      color: "from-red-500 to-red-600"
    }
  ];

  const features = [
    {
      title: "HD Voice Quality",
      description: "Experience crystal clear calls with our advanced audio processing",
      icon: <FaPhone className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Real-time Analytics",
      description: "Monitor your call quality and system performance in real-time",
      icon: <FaChartLine className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Advanced Security",
      description: "Enterprise-grade security to protect your communications",
      icon: <FaShieldAlt className="w-8 h-8" />,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Easy Configuration",
      description: "Simple setup and customization for your business needs",
      icon: <FaCog className="w-8 h-8" />,
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className={`relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Background Elements */}
        <div className="absolute inset-0 w-screen">
          {/* Main gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/50 to-blue-50/50"></div>
          
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 -right-40 w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-40 left-20 w-80 h-80 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          {/* Gradient mesh */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/5 via-transparent to-blue-600/5"></div>
        </div>

        <div className="relative w-screen max-w-[100vw] mx-auto px-4 py-20 sm:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="text-left space-y-8">
                <div className="inline-block px-4 py-2 bg-purple-100 rounded-full">
                  <span className="text-purple-700 font-semibold">Welcome to VoIPone</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                  Experience the Future of{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    Voice Communication
                  </span>
                </h1>

                <p className="text-xl text-gray-600 max-w-2xl">
                  Welcome back, <span className="font-bold text-purple-700">{user.phoneNumber}</span>. 
                  Experience crystal clear calls, enterprise-grade security, and powerful features at your fingertips.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => router.push("/CallNow")}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <FaPhone className="w-5 h-5" />
                    Start Calling Now
                  </button>
                  <button
                    onClick={() => router.push("/plugins")}
                    className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full shadow-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <FaCog className="w-5 h-5" />
                    Explore Features
                  </button>
                </div>

                {/* Stats Preview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-purple-600">98%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-blue-600">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-purple-600">HD</div>
                    <div className="text-sm text-gray-600">Voice Quality</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-blue-600">100+</div>
                    <div className="text-sm text-gray-600">Features</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Visual Element */}
              <div className="relative hidden lg:block">
                <div className="relative w-full h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-3xl transform rotate-3"></div>
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 transform -rotate-3">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                          <FaPhone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Active Call</h3>
                          <p className="text-sm text-gray-600">Crystal clear connection</p>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 w-3/4"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-purple-50 rounded-xl p-4">
                          <div className="text-sm text-purple-600 font-semibold">Call Quality</div>
                          <div className="text-2xl font-bold text-gray-900">Excellent</div>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-4">
                          <div className="text-sm text-blue-600 font-semibold">Latency</div>
                          <div className="text-2xl font-bold text-gray-900">12ms</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className={`max-w-7xl mx-auto px-4 py-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-white mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 mb-2">{stat.title}</p>
              <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className={`max-w-7xl mx-auto px-4 py-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the tools and capabilities that make VoIPone the perfect choice for your communication needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className={`max-w-7xl mx-auto px-4 py-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied users who have transformed their communication with VoIPone
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.push("/shop")}
              className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full shadow-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
            >
              View Plans
            </button>
            <button
              onClick={() => router.push("/contact")}
              className="px-8 py-4 bg-purple-700 text-white font-bold rounded-full shadow-lg hover:bg-purple-800 transition-all duration-300 transform hover:scale-105"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Welcome Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-500 ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Welcome to VoIPone!</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                We're excited to have you here! Your account is now fully set up and ready to use.
              </p>
              <div className="bg-purple-50 rounded-xl p-4">
                <p className="text-purple-700 font-semibold">
                  Your phone number: <span className="font-bold">{user.phoneNumber}</span>
                </p>
              </div>
              <p className="text-gray-600">
                Start making calls, explore our features, and discover how VoIPone can enhance your communication experience.
              </p>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
