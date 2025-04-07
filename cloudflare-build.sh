#!/bin/bash

# Diagnostic information
echo "=== CLOUDFLARE BUILD SCRIPT ==="
echo "Current directory: $(pwd)"
echo "Listing directory structure:"
ls -la

# Run the middleware fix script
echo "Running middleware fix script..."
node ./fix-middleware.js

# Force remove any nested middleware files just to be sure
echo "Force removing any nested middleware files..."
rm -f pages/api/_middleware.js
rm -f pages/api/_middleware.ts
rm -f pages/api/_middleware.jsx
rm -f pages/api/_middleware.tsx

# Run directory creation check just to be safe
echo "Ensuring API directory exists..."
mkdir -p pages/api

# Create .no-middleware marker file
echo "Creating .no-middleware marker file..."
echo "This file prevents nested middleware from being used in this directory" > pages/api/.no-middleware

# Patch Next.js to ignore nested middleware errors
echo "Patching Next.js to ignore nested middleware errors..."
node ./next-middleware-patch.js

# Add custom next.config.js adjustments if needed
echo "Running Next.js build with Cloudflare adapter..."
npx @cloudflare/next-on-pages@1

echo "Build completed" 