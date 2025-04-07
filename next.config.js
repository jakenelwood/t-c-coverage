/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  distDir: 'out',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['localhost', 'images.unsplash.com']
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    esmExternals: true
  }
};

module.exports = nextConfig;
