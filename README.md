# Twin Cities Coverage

This is the repository for the Twin Cities Coverage website, a Next.js-based insurance quote lead generation site.

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

## API Integration

The front-end communicates with a separate FastAPI backend hosted on Cloudflare Workers. API requests from the static export are directed to the API server defined by the `NEXT_PUBLIC_API_URL` environment variable.

## Local API Development

For local development with the API, you'll need to set up the Python environment:

```bash
# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the API server locally
cd api
uvicorn main:app --reload
```

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
