# Twin Cities Coverage Insurance Quote Generator

A Next.js and FastAPI application for generating insurance quotes and managing agent workflows.

## Features

- Public-facing landing page for lead generation
- Agent portal with authentication
- Quote request generation for Auto, Home, and Specialty insurance
- Document generation (DOCX and PDF)
- Secure data storage with LanceDB

## Prerequisites

- Node.js 16.x or later
- Python 3.9 or later
- Docker and Docker Compose
- Git

## Setup

1. Clone the repository:
```bash
git clone https://github.com/your-org/twincitiescoverage.git
cd twincitiescoverage
```

2. Install frontend dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development servers:
```bash
# Start the backend
docker-compose up -d

# Start the frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Project Structure

```
.
├── app/                    # Backend FastAPI application
│   ├── main.py            # Main FastAPI application
│   ├── generators/        # Document generation modules
│   └── ...
├── pages/                 # Next.js pages
│   ├── agent-portal.js    # Agent portal page
│   ├── login.js          # Login page
│   └── ...
├── templates/             # Word document templates
├── output/               # Generated documents
└── ...
```

## Usage

### Agent Portal

1. Navigate to http://localhost:3000/login
2. Log in with your agent credentials
3. Access the quote request generator
4. Fill out the form with client information
5. Generate and download quote documents

### API Endpoints

- POST /token - Get authentication token
- POST /quotes/ - Create a new quote request
- GET /quotes/ - Get quote history

## Security

- JWT-based authentication
- Secure password hashing with bcrypt
- Environment variable configuration
- CORS protection
- Input validation

## Development

### Backend Development

```bash
# Start the backend in development mode
docker-compose up -d
```

### Frontend Development

```bash
# Start the frontend in development mode
npm run dev
```

## Deployment

1. Build the Docker images:
```bash
docker-compose build
```

2. Start the services:
```bash
docker-compose up -d
```

## License

MIT License
