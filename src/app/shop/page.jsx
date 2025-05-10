"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { FaShoppingCart, FaStar, FaFilter, FaSearch } from "react-icons/fa";

export default function ShopPage() {
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

  const products = [
    {
      name: "VoIP Business Plan",
      description: "Complete VoIP solution for businesses",
      price: "$99/month",
      features: ["Unlimited calls", "HD voice quality", "24/7 support"],
      rating: 4.8,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    },
    {
      name: "VoIP Enterprise Suite",
      description: "Advanced features for large organizations",
      price: "$299/month",
      features: ["Advanced analytics", "Custom integrations", "Dedicated support"],
      rating: 4.9,
      reviews: 85,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    },
    {
      name: "VoIP Starter Pack",
      description: "Perfect for small businesses",
      price: "$49/month",
      features: ["Basic features", "Email support", "Easy setup"],
      rating: 4.5,
      reviews: 256,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    }
  ];

  const categories = [
    "All Products",
    "Business Plans",
    "Enterprise Solutions",
    "Add-ons",
    "Support Plans"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">VoIP Shop</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect VoIP solution for your business
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 pl-12"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-white px-6 py-3 rounded-full text-gray-700 hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-md">
              <FaFilter />
              Filter
            </button>
            <button className="flex items-center gap-2 bg-white px-6 py-3 rounded-full text-gray-700 hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-md">
              Sort
            </button>
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-blue-600">
                  {product.price}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                  <FaShoppingCart />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Special Offer */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold text-center mb-4">
            Special Offer: 30% Off Enterprise Plan
          </h2>
          <p className="text-center max-w-2xl mx-auto mb-8">
            Get access to all premium features at a discounted price. Limited time offer!
          </p>
          <div className="flex justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300">
              Claim Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 