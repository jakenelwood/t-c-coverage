#!/bin/bash
set -e

# Stop and remove existing containers
echo "Stopping and removing existing containers..."
docker stop quotes_api quotes_db || true
docker rm quotes_api quotes_db || true

# Build new API image with LanceDB
echo "Building new API image..."
docker build -t quotes_api:latest .

# Run the API container with LanceDB
echo "Starting API container..."
docker run -d \
  --name quotes_api \
  -p 8001:8001 \
  -v $(pwd)/templates:/app/templates \
  -v $(pwd)/output:/app/output \
  -v $(pwd)/data:/app/data \
  -e SECRET_KEY="your-secret-key-here" \
  -e ADMIN_EMAIL="admin@twincitiescoverage.com" \
  -e ADMIN_PASSWORD="admin" \
  quotes_api:latest

echo "API is now running at http://localhost:8001"
echo "You can access it via nginx at https://api.twincitiescoverage.com" 