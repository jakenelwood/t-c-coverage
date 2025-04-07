#!/bin/bash

echo "Checking directory structure..."
ls -la

echo "Looking for middleware files..."
find . -name "_middleware.js" -o -name "_middleware.ts"

echo "Forcibly removing nested middleware files..."
find ./pages -name "_middleware.js" -o -name "_middleware.ts" -delete

echo "Creating a root middleware.js file..."
cat > middleware.js << 'EOL'
// Empty middleware file for static export
export function middleware() {
  return;
}

export const config = {
  matcher: [],
};
EOL

# Make sure the file exists
cat middleware.js

echo "Middleware check and fix completed!" 