const path = require('path');
const fs = require('fs');

// Check if nested middleware exists and delete it
const nestedMiddlewarePath = path.join(__dirname, 'pages', 'api', '_middleware.js');
if (fs.existsSync(nestedMiddlewarePath)) {
  console.log('Removing nested middleware file...');
  fs.unlinkSync(nestedMiddlewarePath);
}

module.exports = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost', 'images.unsplash.com'],
    unoptimized: true, // Required for static export
  },
  // Simplified webpack config
  webpack: (config, { isServer }) => {
    // Load the middleware suppression if it exists
    if (isServer && fs.existsSync('./lib/suppress-middleware-error.js')) {
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        if (entries['pages/_app']) {
          entries['pages/_app'] = ['./lib/suppress-middleware-error.js', ...entries['pages/_app']];
        }
        return entries;
      };
    }

    // Add the module resolution paths
    config.resolve.modules.push(path.resolve("./"));

    return config;
  }
};
