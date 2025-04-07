#!/bin/bash

# Diagnostic information
echo "Running prebuild cleanup script"
echo "Current directory: $(pwd)"
echo "Listing files in pages/api folder:"
ls -la pages/api || echo "No pages/api directory found"

# Remove any nested middleware files
echo "Removing any nested middleware files..."
find pages -name "_middleware*" -type f -delete

# Create the root middleware file if it doesn't exist
if [ ! -f "middleware.js" ]; then
  echo "Creating middleware.js file..."
  cat > middleware.js << 'EOF'
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = new URL(request.url);
  
  // Handle API routes - redirect to external API server
  if (url.pathname.startsWith('/api/')) {
    const apiUrl = new URL(url.pathname, process.env.NEXT_PUBLIC_API_URL || 'https://api.twincitiescoverage.com');
    return NextResponse.redirect(apiUrl);
  }
  
  // Protect agent portal routes - must be authenticated
  if (url.pathname.startsWith('/agent-portal')) {
    // Check for auth token
    const token = request.cookies.get('auth-token');
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/agent-portal/:path*'
  ],
};
EOF
fi

echo "Prebuild cleanup completed" 