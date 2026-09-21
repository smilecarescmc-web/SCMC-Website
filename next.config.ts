import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    formats: ["image/webp"],
    qualities: [58, 62, 75],
    minimumCacheTTL: 604800,
    deviceSizes: [390, 430, 620, 768, 1024, 1280, 1536],
  },
};

export default nextConfig;
