// import type { NextConfig } from "next";

// const commonHost = {
//   protocol: 'http' as const,
//   hostname: 'localhost',
//   port: '4000',
// };

// const paths = [
//   '/public/storage/avatar/**',
//   '/public/storage/blog-banner/**',
//   '/public/storage/blog-author-picture/**',
//   '/public/storage/clinic-banner/**',
//   '/public/storage/clinic-preview-image/**',
// ];

// const nextConfig: NextConfig = {
//   poweredByHeader: false,
//   eslint: {
//     ignoreDuringBuilds: true, 
//   },
//   typescript: {
//     ignoreBuildErrors: true, 
//   },
//   images: {
//     remotePatterns: paths.map(pathname => ({
//       ...commonHost,
//       pathname,
//     })),
//   },
// };

// export default nextConfig;



import type { NextConfig } from "next";

const commonHost = {
  protocol: 'https' as const,
  hostname: 'backend.seoulclinicguide.com',
  port: '',
};

const paths = [
  '/public/storage/avatar/**',
  '/public/storage/blog-banner/**',
  '/public/storage/blog-author-picture/**',
  '/public/storage/clinic-banner/**',
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: paths.map(pathname => ({
      ...commonHost,
      pathname,
    })),
  },
};

export default nextConfig;

