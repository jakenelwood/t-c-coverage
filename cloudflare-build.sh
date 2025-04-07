#!/bin/bash
set -e

echo "Installing required dependencies..."
npm install postcss@8.4.31 cssnano@6.0.3 autoprefixer@10.4.16

echo "Running middleware disabler script..."
node no-middleware.js

echo "Checking for nested middleware files (backup)..."
rm -f pages/api/_middleware.js
rm -f pages/api/_middleware.ts
rm -f ./pages/api/_middleware.js
rm -f ./pages/api/_middleware.ts

echo "Running Next.js build with static export..."
NODE_ENV=production npm run build

echo "Build completed successfully!" 