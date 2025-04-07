#!/bin/bash
set -e

echo "Installing required dependencies..."
npm install postcss@8.4.31 cssnano@6.0.3 autoprefixer@10.4.16

echo "Checking for and removing nested middleware files..."
rm -f pages/api/_middleware.js
rm -f pages/api/_middleware.ts
rm -f ./pages/api/_middleware.js
rm -f ./pages/api/_middleware.ts

echo "Creating empty middleware file..."
mkdir -p pages
cat > pages/middleware.js << 'EOL'
// Empty middleware file for static export
export function middleware() {
  return;
}

export const config = {
  matcher: []
};
EOL

echo "Running Next.js build with static export..."
npm run build

echo "Build completed successfully!" 