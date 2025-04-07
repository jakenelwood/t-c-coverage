#!/bin/bash
set -e

echo "Installing required dependencies..."
npm install postcss@8.4.31 cssnano@6.0.3 autoprefixer@10.4.16

echo "Running Next.js build with static export..."
npm run build

echo "Build completed successfully!" 