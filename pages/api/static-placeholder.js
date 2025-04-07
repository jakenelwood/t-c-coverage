// This file exists to ensure the api directory exists but doesn't use middleware
// For static export, all API calls should be directed to an external API server

export default function handler(req, res) {
  // This won't actually be called in static export
  res.status(200).json({ 
    message: 'This API route is not active in static export mode. Please use the external API server.' 
  });
} 