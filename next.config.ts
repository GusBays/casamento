import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wedy-next.s3.sa-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "s3.sa-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.wedy.com",
      },
    ],
  },
};

export default nextConfig;
