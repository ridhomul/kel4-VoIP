/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true,
  // Enable SIP.js and WebRTC in Next.js environment
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'dgram': false,
        'fs': false,
        'net': false,
        'tls': false,
      };
    }
    return config;
  },
};

export default nextConfig;
