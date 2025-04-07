// This file intentionally left minimal for static export compatibility
// All API routes are handled by Cloudflare routing, not Next.js middleware
import { NextResponse } from "next/server";

export function middleware(request) {
  // For all routes, just continue - API routing is handled by Cloudflare
  return NextResponse.next();
}

// No matchers needed - let Cloudflare handle API routing
export const config = {
  matcher: [],
}; 