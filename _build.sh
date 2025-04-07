#!/bin/bash

# Force specific build settings for Cloudflare Pages
echo "Running custom build script..."

# Install dependencies
npm install

# Temporarily move API directories to avoid errors during build
echo "Temporarily moving API directories..."
mkdir -p .api-backup
mv pages/api .api-backup/
mkdir -p pages/api
touch pages/api/.gitkeep

# Run Next.js build
echo "Running Next.js build..."
npm run build

# Restore API directories
echo "Restoring API directories..."
rm -rf pages/api
mv .api-backup/api pages/

# Print output directory contents to confirm
echo "Build output in .next directory:"
ls -la .next

echo "Custom build completed" 