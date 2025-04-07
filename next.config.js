/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['api.twincitiescoverage.com'],
    unoptimized: true, // For Cloudflare Pages compatibility
  },
  env: {
    NEXT_PUBLIC_API_URL: 'https://api.twincitiescoverage.com',
  },
  async redirects() {
    return [
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true,
      }
    ];
  },
  // Cloudflare specific optimizations
  swcMinify: true,
  experimental: {
    optimizeCss: true,
  }
};

module.exports = nextConfig;
