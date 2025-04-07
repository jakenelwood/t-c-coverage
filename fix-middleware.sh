#!/bin/bash

echo "Running Node.js cleanup script to empty API directory..."
node empty-middleware-api-dir.js

echo "Checking directory structure..."
ls -la pages/
ls -la pages/api/ || echo "API directory doesn't exist yet"

echo "Looking for middleware files (any pattern)..."
find . -path "*/pages/api/*middleware*"
find . -path "*/pages/*middleware*"

echo "Forcibly removing nested middleware files (any pattern)..."
find ./pages -name "*middleware*" -type f -delete

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
echo "Root middleware.js content:"
cat middleware.js

echo "Middleware check and fix completed!" 