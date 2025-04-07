from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
import lancedb
import os
import logging
import pyarrow as pa
import json
from pathlib import Path

from app.database import init_db, get_db, get_table, generate_id

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Security
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Models for token handling
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str

# FastAPI app
app = FastAPI(
    title="Twin Cities Coverage API",
    description="API for Twin Cities Coverage quote request generation system",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

# Helper functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    
    # Get user from LanceDB
    agents_table = get_table("agents")
    agents = agents_table.search().where(f"email = '{token_data.email}'").to_list()
    
    if not agents:
        raise credentials_exception
    
    return agents[0]

# Routes
@app.post("/api/auth/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    # Find the user in the database
    agents_table = get_table("agents")
    agents = agents_table.search().where(f"email = '{form_data.username}'").to_list()
    
    if not agents or not verify_password(form_data.password, agents[0]["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": form_data.username}, expires_delta=access_token_expires
    )
    
    # Update last login time
    agent = agents[0]
    agent["last_login"] = datetime.utcnow().isoformat()
    agents_table.delete(f"email = '{agent['email']}'")
    agents_table.add([agent])
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/auth/register")
async def register_user(user: UserCreate):
    # Check if user already exists
    agents_table = get_table("agents")
    existing_agents = agents_table.search().where(f"email = '{user.email}'").to_list()
    
    if existing_agents:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new agent
    new_agent = {
        "id": generate_id(),
        "email": user.email,
        "full_name": user.full_name,
        "hashed_password": get_password_hash(user.password),
        "is_active": True,
        "permissions": ["basic"],
        "created_at": datetime.utcnow().isoformat(),
        "last_login": None
    }
    
    agents_table.add([new_agent])
    
    return {"message": "User registered successfully"}

@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "database": "lancedb", "version": "1.0.0"}

@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Welcome to Twin Cities Coverage API",
        "version": "1.0.0",
        "status": "ok",
        "database": "lancedb"
    }

# Import route modules here to avoid circular imports
from app.routes import quotes

# Include routers
app.include_router(quotes.router, prefix="/api/quotes", tags=["quotes"])

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    """Initialize database on startup."""
    try:
        # Initialize database
        init_db()
        
        # Create an admin user if none exists
        agents_table = get_table("agents")
        admin_email = os.getenv("ADMIN_EMAIL", "admin@twincitiescoverage.com")
        admin_password = os.getenv("ADMIN_PASSWORD", "admin")
        
        existing_admin = agents_table.search().where(f"email = '{admin_email}'").to_list()
        
        if not existing_admin:
            logger.info(f"Creating admin user: {admin_email}")
            admin_user = {
                "id": generate_id(),
                "email": admin_email,
                "full_name": "Admin User",
                "hashed_password": get_password_hash(admin_password),
                "is_active": True,
                "permissions": ["admin"],
                "created_at": datetime.utcnow().isoformat(),
                "last_login": None
            }
            agents_table.add([admin_user])
    except Exception as e:
        logger.error(f"Error initializing application: {str(e)}")

@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log all requests."""
    start_time = datetime.utcnow()
    try:
        response = await call_next(request)
        process_time = (datetime.utcnow() - start_time).total_seconds() * 1000
        logger.info(f"Request: {request.method} {request.url.path} - Status: {response.status_code} - Time: {process_time:.2f}ms")
        return response
    except Exception as e:
        logger.error(f"Global exception: {str(e)}")
        raise

# Run the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001) 