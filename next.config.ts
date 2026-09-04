import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 520, 768, 1024, 1280, 1536, 1920],
  },
};

export default nextConfig;
