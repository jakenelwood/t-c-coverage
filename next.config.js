/** @type {import('next').NextConfig} */

// Next.js config for static export with Next.js 12.3.4
const nextConfig = {
  reactStrictMode: true,
  // For static export
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['localhost', 'images.unsplash.com']
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
