import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    contentDispositionType: "inline",

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;