# Twin Cities Coverage Insurance Quote Generator

A Next.js application for generating insurance quotes and managing agent workflows, deployed on Cloudflare Pages with Cloudflare Workers handling API endpoints.

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

## Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/jakenelwood/t-c-coverage.git
cd t-c-coverage
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000

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
