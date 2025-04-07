const fs = require('fs');
const path = require('path');

console.log('Running API directory cleanup...');

// Path to the API directory
const apiDir = path.join(__dirname, 'pages', 'api');

// Check if the API directory exists
if (fs.existsSync(apiDir)) {
  console.log(`API directory found at ${apiDir}`);
  
  // Read all files in the directory
  const files = fs.readdirSync(apiDir);
  console.log(`Found ${files.length} files/directories in API directory`);
  
  // Delete all files in the directory
  files.forEach(file => {
    const filePath = path.join(apiDir, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      console.log(`Removing directory: ${filePath}`);
      fs.rmdirSync(filePath, { recursive: true });
    } else {
      console.log(`Removing file: ${filePath}`);
      fs.unlinkSync(filePath);
    }
  });
  
  console.log('All files and directories removed from the API directory');
} else {
  console.log('API directory does not exist, creating it');
  fs.mkdirSync(apiDir, { recursive: true });
}

// Create a placeholder file to ensure the directory exists but has no middleware
const placeholderPath = path.join(apiDir, 'placeholder.js');
fs.writeFileSync(placeholderPath, `
// This is a placeholder file to ensure the API directory exists but has no middleware
export default function handler(req, res) {
  res.status(200).json({
    message: 'This is a placeholder API route. For static exports, API functionality is handled by external services.'
  });
}
`);

console.log(`Created placeholder file at ${placeholderPath}`);
console.log('API directory cleanup completed successfully!'); 