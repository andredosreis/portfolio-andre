import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true, // ✅ não está mais em experimental
  images: {
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }]
  }
};

export default nextConfig;
