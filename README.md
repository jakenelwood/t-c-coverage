# Twin Cities Coverage

Insurance quote lead generation website for TwinCitiesCoverage.com.

## Architecture

The application is split into two main components:

1. **Frontend**: Next.js application (this repository) - provides the user interface
2. **Backend**: FastAPI application (in `/app` directory) - provides the API

## Setup

### Prerequisites

- Node.js 14+
- Python 3.8+
- Docker (optional, for containerization)

### Frontend (Next.js)

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. Run the development server:
   ```
   npm run dev
   ```

### Backend (FastAPI)

1. Install Python dependencies:
   ```
   pip install -r app/requirements.txt
   ```

2. Run the FastAPI server:
   ```
   cd app
   uvicorn main:app --reload --port 8000
   ```

## API Integration

The frontend communicates with the FastAPI backend for all data operations. The API can be accessed through:

- Direct API calls to `http://localhost:8000/api/...`
- Through the Next.js API proxy at `/api/...` (configured with rewrites)

## Authentication

JWT token-based authentication is used:

1. User logs in via `/login` page
2. API returns a JWT token
3. Token is stored in localStorage
4. Token is included in Authorization header for all subsequent API requests

## API Routes

The main API endpoints are:

- `/api/auth/token` - Authentication
- `/api/quotes/submit` - Submit quote requests
- `/api/quotes/list` - List quotes
- `/api/documents/{id}/generate` - Generate quote documents

## Development Notes

- All API functionality has been moved from Next.js to FastAPI
- `utils/api.js` provides utility functions for API communication
- The Next.js app is configured for static export with API proxying

## Local Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

The site will be available at http://localhost:3000.

## Deployment to Cloudflare Pages

This project is configured for deployment on Cloudflare Pages using static HTML export.

### Deployment Settings in Cloudflare Dashboard

1. **Framework preset**: Select "Next.js (Static HTML Export)"
2. **Build command**: `npm run build`
3. **Build output directory**: `out`
4. **Node.js version**: 18.x

### Environment Variables

Add the following environment variables in Cloudflare Pages settings:

```
NODE_VERSION=18.12.0
NEXT_PUBLIC_API_URL=https://api.twincitiescoverage.com
```

## Project Structure

- `/pages` - Next.js pages
- `/components` - Reusable React components
- `/public` - Static assets
- `/styles` - CSS and SCSS files
- `/lib` - Utility functions

## Features

- Public-facing landing page for lead generation
- Agent portal with authentication
- Quote request generation for Auto, Home, and Specialty insurance
- Document generation (DOCX and PDF)
- Secure data storage with LanceDB

## Architecture

- **Frontend**: Next.js deployed on Cloudflare Pages
- **API Layer**: Cloudflare Workers
- **Backend Services**: Node.js services running on Hetzner AX52 server
- **Database**: LanceDB for document storage

## Prerequisites

- Node.js 16.x or later
- Wrangler CLI (`npm install -g wrangler`)
- Cloudflare account
- Git

## Project Structure

```
.
├── .cloudflare/           # Cloudflare Pages configuration
├── worker/                # Cloudflare Worker for API endpoints
├── pages/                 # Next.js pages
│   ├── agent-portal.js    # Agent portal page
│   ├── login.js           # Login page
│   └── ...
├── lib/                   # Shared libraries
├── components/            # React components
└── ...
```

## Deployment

### Deploy to Cloudflare Pages

1. Log in to Cloudflare:
```bash
wrangler login
```

2. Build the application:
```bash
npm run build
```

3. Deploy to Cloudflare Pages:
```bash
npm run deploy
```

### Deploy the API Worker

1. Deploy the worker:
```bash
npm run deploy:worker
```

## Configuration

### Cloudflare Pages

The Cloudflare Pages project is configured using the `.cloudflare/pages.json` file and `wrangler.toml`.

### Environment Variables

The following environment variables should be set in the Cloudflare Pages dashboard:

- `NEXT_PUBLIC_API_URL`: URL of the API (e.g., https://api.twincitiescoverage.com)
- `NEXTAUTH_URL`: URL of the authentication callback (your site URL)
- `NEXTAUTH_SECRET`: Secret key for NextAuth

## Security

- JWT-based authentication
- CORS protection
- Input validation

## License

MIT License
