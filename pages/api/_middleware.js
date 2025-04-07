// Middleware to redirect API requests to our external backend server
export function middleware(req) {
  const url = new URL(req.url);
  
  // If this is an API route, redirect to external API server
  if (url.pathname.startsWith('/api/')) {
    const apiUrl = new URL(url.pathname, process.env.NEXT_PUBLIC_API_URL || 'https://api.twincitiescoverage.com');
    
    // Forward the request to our backend API
    return Response.redirect(apiUrl.toString(), 307);
  }
}

export const config = {
  matcher: '/api/:path*',
}; 