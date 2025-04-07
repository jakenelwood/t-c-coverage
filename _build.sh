#!/bin/bash

# Force specific build settings for Cloudflare Pages
echo "Running custom build script..."

# Install dependencies
npm install

# Run Next.js build
npm run build

# Print output directory contents to confirm
echo "Build output in .next directory:"
ls -la .next

echo "Custom build completed" 