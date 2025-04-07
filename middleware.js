// This file intentionally left minimal for static export compatibility
// All API routes are handled by FastAPI, not Next.js middleware
import { NextResponse } from "next/server";

export function middleware(request) {
  // If requesting API routes, pass through to FastAPI server
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // For static export, API routes should be rewritten to FastAPI
    // This is handled in next.config.js with rewrites
    return NextResponse.next();
  }
  
  // For all other routes, just continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match API routes for FastAPI redirection
    '/api/:path*',
  ],
}; 