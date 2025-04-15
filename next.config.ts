import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.5.8',
        port: '4000',
        pathname: '/public/storage/avatar/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.5.8',
        port: '4000',
        pathname: '/public/storage/blog-banner/**',
      },
    ],
  },
};

export default nextConfig;
