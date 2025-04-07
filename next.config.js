/** @type {import('next').NextConfig} */

// Import the middleware patch if it exists
let middlewarePatch = {};
try {
  middlewarePatch = require('./middleware-config-patch');
  console.log('Loaded middleware configuration patch');
} catch (error) {
  console.log('No middleware patch found, using default config');
}

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
  },
  // Optional export configuration for static exports
  exportPathMap: async function() {
    return {
      '/': { page: '/' },
      // Add other routes as needed
    };
  },
  // Merge with the middleware patch if it exists
  ...middlewarePatch
};

module.exports = nextConfig;
