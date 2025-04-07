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