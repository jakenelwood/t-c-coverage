#!/bin/bash

# Diagnostic information
echo "=== CLOUDFLARE BUILD SCRIPT ==="
echo "Current directory: $(pwd)"
echo "Listing directory structure:"
ls -la

# Remove any nested middleware files
echo "Checking for and removing nested middleware files..."
find . -name "pages/api/_middleware*" -type f -delete

# Create the middleware file
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

# Add custom next.config.js adjustments if needed
echo "Running Next.js build with Cloudflare adapter..."
npx @cloudflare/next-on-pages@1

echo "Build completed" 