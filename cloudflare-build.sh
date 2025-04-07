#!/bin/bash
set -e

echo "Installing required dependencies..."
npm install postcss@8.4.31 cssnano@6.0.3 autoprefixer@10.4.16

echo "Running validation script..."
node validate-config.js

echo "Running middleware disabler script..."
node no-middleware.js

echo "Manually ensuring no middleware files exist..."
mkdir -p pages/api
rm -f pages/api/_middleware.js
rm -f pages/api/_middleware.ts
rm -f ./pages/api/_middleware.js
rm -f ./pages/api/_middleware.ts

echo "Running Next.js build with static export..."
NODE_ENV=production SKIP_MIDDLEWARE_CHECK=1 npm run build

echo "Build completed successfully!" 