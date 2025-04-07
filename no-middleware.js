// This file is used to monkey-patch Next.js's middleware validation
const fs = require('fs');
const path = require('path');

console.log('Running middleware disabler...');

// Check if the middleware file exists and delete it
const middlewarePath = path.join(__dirname, 'pages', 'api', '_middleware.js');
if (fs.existsSync(middlewarePath)) {
  console.log(`Deleting nested middleware file: ${middlewarePath}`);
  fs.unlinkSync(middlewarePath);
}

// Create an empty middleware file at the root level
const rootMiddlewarePath = path.join(__dirname, 'pages', 'middleware.js');
const middlewareContent = `
// This is an empty middleware file for static export
export function middleware() {
  return;
}

export const config = {
  matcher: [],
};
`;

fs.writeFileSync(rootMiddlewarePath, middlewareContent);
console.log(`Created root middleware file: ${rootMiddlewarePath}`);

console.log('Middleware disabler completed.'); 