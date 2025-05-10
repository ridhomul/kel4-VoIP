"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { FaCalendarAlt, FaUser, FaTag, FaArrowRight } from "react-icons/fa";

export default function BlogPage() {
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

  const featuredPost = {
    title: "The Future of VoIP Technology in 2024",
    excerpt: "Discover how artificial intelligence and machine learning are revolutionizing voice communication...",
    author: "John Doe",
    date: "March 15, 2024",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
  };

  const posts = [
    {
      title: "5 Ways to Improve Call Quality",
      excerpt: "Learn the best practices for achieving crystal clear voice calls...",
      author: "Jane Smith",
      date: "March 10, 2024",
      category: "Tips & Tricks"
    },
    {
      title: "VoIP Security Best Practices",
      excerpt: "Essential security measures to protect your voice communications...",
      author: "Mike Johnson",
      date: "March 8, 2024",
      category: "Security"
    },
    {
      title: "Integrating VoIP with CRM Systems",
      excerpt: "How to seamlessly connect your phone system with customer management...",
      author: "Sarah Wilson",
      date: "March 5, 2024",
      category: "Integration"
    }
  ];

  const categories = [
    "Technology",
    "Security",
    "Tips & Tricks",
    "Integration",
    "News",
    "Case Studies"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">VoIP Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, tips, and insights about VoIP technology
          </p>
        </div>

        {/* Featured Post */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="relative h-96">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm mb-4">
                {featuredPost.category}
              </span>
              <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
              <p className="text-lg mb-4">{featuredPost.excerpt}</p>
              <div className="flex items-center text-sm">
                <span className="flex items-center mr-4">
                  <FaUser className="mr-2" />
                  {featuredPost.author}
                </span>
                <span className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  {featuredPost.date}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className="bg-white px-6 py-2 rounded-full text-gray-700 hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-md"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Recent Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="p-6">
                <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm mb-4">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <FaUser className="mr-2" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    {post.date}
                  </div>
                </div>
                <button className="mt-4 w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                  Read More
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Get the latest VoIP news and updates delivered straight to your inbox
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 