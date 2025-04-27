// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   poweredByHeader: false,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: '103.161.8.131',
//         port: '4000',
//         pathname: '/public/storage/avatar/**',
//       },
//       {
//         protocol: 'http',
//         hostname: '103.161.8.131',
//         port: '4000',
//         pathname: '/public/storage/blog-banner/**',
//       },
//       {
//         protocol: 'http',
//         hostname: '103.161.8.131',
//         port: '4000',
//         pathname: '/public/storage/blog-author-picture/**',
//       },
//       {
//         protocol: 'http',
//         hostname: '103.161.8.131',
//         port: '4000',
//         pathname: '/public/storage/clinic-banner/**',
//       },
//     ],
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const commonHost = {
  protocol: 'http' as const,
  hostname: '103.161.8.131',
  port: '4000',
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
    ignoreDuringBuilds: true, // disables linting errors during `next build`
  },
  typescript: {
    ignoreBuildErrors: true, // disables type checking at build time
  },
  images: {
    remotePatterns: paths.map(pathname => ({
      ...commonHost,
      pathname,
    })),
  },
};

export default nextConfig;
