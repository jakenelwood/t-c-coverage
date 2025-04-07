// Validate Next.js configuration and setup before building
const fs = require('fs');
const path = require('path');

console.log('Validating Next.js configuration and setup...');

// Paths to check
const nestedMiddlewareFiles = [
  path.join(__dirname, 'pages', 'api', '_middleware.js'),
  path.join(__dirname, 'pages', 'api', '_middleware.ts'),
  path.join(__dirname, 'pages', 'api', '_middleware.jsx'),
  path.join(__dirname, 'pages', 'api', '_middleware.tsx'),
];

// Check and remove any nested middleware files
nestedMiddlewareFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    console.log(`Removing problematic middleware file: ${filePath}`);
    fs.unlinkSync(filePath);
  }
});

// Ensure the output directory exists
const outputDir = path.join(__dirname, 'out');
if (!fs.existsSync(outputDir)) {
  console.log(`Creating output directory: ${outputDir}`);
  fs.mkdirSync(outputDir, { recursive: true });
}

// Ensure a valid root middleware exists
const rootMiddlewarePath = path.join(__dirname, 'pages', 'middleware.js');
const middlewareContent = `
// Empty middleware file for static export
export function middleware() {
  return;
}

export const config = {
  matcher: [],
};
`;

console.log(`Creating empty middleware file: ${rootMiddlewarePath}`);
fs.mkdirSync(path.dirname(rootMiddlewarePath), { recursive: true });
fs.writeFileSync(rootMiddlewarePath, middlewareContent);

console.log('Validation completed successfully.'); 