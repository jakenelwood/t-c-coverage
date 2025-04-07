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
  // API configuration - only apply in development
  async rewrites() {
    // Only apply rewrites in development environment
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8000/api/:path*' // FastAPI server in development
        }
      ];
    }
    return []; // No rewrites in production, let Cloudflare handle it
  },
  // Optional export configuration for static exports
  exportPathMap: async function() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/about-us': { page: '/about-us' },
      '/privacy': { page: '/privacy' },
      '/privacy-policy': { page: '/privacy-policy' },
      '/login': { page: '/login' },
      '/agent-portal': { page: '/agent-portal' },
      '/agent-portal/quote-request': { page: '/agent-portal/quote-request' },
      // Add other routes as needed
    };
  },
  // Merge with the middleware patch if it exists
  ...middlewarePatch
};

module.exports = nextConfig;
