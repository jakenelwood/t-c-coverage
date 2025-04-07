#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Diagnostic information
console.log('=== MIDDLEWARE FIX SCRIPT ===');
console.log(`Current directory: ${process.cwd()}`);

// Define the middleware file path
const nestedMiddlewarePath = path.join(process.cwd(), 'pages', 'api', '_middleware.js');
const nestedMiddlewareDir = path.join(process.cwd(), 'pages', 'api');

// Check if the middleware file exists
console.log(`Checking for nested middleware at ${nestedMiddlewarePath}`);

try {
  // Create directories if they don't exist
  if (!fs.existsSync(path.join(process.cwd(), 'pages'))) {
    console.log('Creating pages directory');
    fs.mkdirSync(path.join(process.cwd(), 'pages'));
  }

  if (!fs.existsSync(nestedMiddlewareDir)) {
    console.log('Creating pages/api directory');
    fs.mkdirSync(nestedMiddlewareDir);
  }

  // Check if the file exists and remove it
  if (fs.existsSync(nestedMiddlewarePath)) {
    console.log('Removing nested middleware file...');
    fs.unlinkSync(nestedMiddlewarePath);
    console.log('Nested middleware file removed.');
  } else {
    console.log('No nested middleware file found.');
  }

  // Create root middleware
  const rootMiddlewarePath = path.join(process.cwd(), 'middleware.js');
  console.log(`Creating root middleware at ${rootMiddlewarePath}`);
  
  const middlewareContent = `import { NextResponse } from 'next/server';

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
};`;

  fs.writeFileSync(rootMiddlewarePath, middlewareContent);
  console.log('Root middleware file created.');
  
  // Create a marker file to ensure the nested middleware doesn't get re-created
  fs.writeFileSync(path.join(nestedMiddlewareDir, '.no-middleware'), 'This file ensures that no nested middleware is created in this directory.');
  
  console.log('Middleware fix completed successfully.');
} catch (error) {
  console.error('Error fixing middleware:', error);
  process.exit(1);
} 