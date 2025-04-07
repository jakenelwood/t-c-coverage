/** @type {import('next').NextConfig} */

// Basic Next.js 12.3.4 config for static HTML export
const nextConfig = {
  reactStrictMode: true,
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
