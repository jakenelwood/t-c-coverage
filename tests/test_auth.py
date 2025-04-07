import pytest
from datetime import datetime, UTC, timedelta
from fastapi.testclient import TestClient
from app.main import app
from app.models.auth import AgentCreate, Token
from app.utils.auth import verify_password, get_password_hash

client = TestClient(app)

def test_agent_registration():
    """Test successful agent registration."""
    agent_data = {
        "email": "test@example.com",
        "password": "Test123!",
        "first_name": "Test",
        "last_name": "User"
    }
    
    response = client.post("/auth/register", json=agent_data)
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    assert data["email"] == agent_data["email"]
    assert data["first_name"] == agent_data["first_name"]
    assert data["last_name"] == agent_data["last_name"]
    assert "password" not in data

def test_duplicate_email_registration():
    """Test registration with duplicate email fails."""
    agent_data = {
        "email": "test@example.com",
        "password": "Test123!",
        "first_name": "Test",
        "last_name": "User"
    }
    
    # First registration
    client.post("/auth/register", json=agent_data)
    
    # Second registration with same email
    response = client.post("/auth/register", json=agent_data)
    assert response.status_code == 400
    assert "email already registered" in response.json()["detail"].lower()

def test_login_success():
    """Test successful login and token generation."""
    login_data = {
        "username": "test@example.com",
        "password": "Test123!"
    }
    
    response = client.post("/auth/token", data=login_data)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "token_type" in data
    assert data["token_type"] == "bearer"

def test_login_invalid_credentials():
    """Test login with invalid credentials fails."""
    login_data = {
        "username": "test@example.com",
        "password": "WrongPassword123!"
    }
    
    response = client.post("/auth/token", data=login_data)
    assert response.status_code == 401
    assert "incorrect email or password" in response.json()["detail"].lower()

def test_token_validation():
    """Test token validation and current user endpoint."""
    # First login to get token
    login_data = {
        "username": "test@example.com",
        "password": "Test123!"
    }
    token_response = client.post("/auth/token", data=login_data)
    token = token_response.json()["access_token"]
    
    # Test current user endpoint
    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == login_data["username"]

def test_invalid_token():
    """Test access with invalid token fails."""
    response = client.get("/auth/me", headers={"Authorization": "Bearer invalid_token"})
    assert response.status_code == 401
    assert "invalid token" in response.json()["detail"].lower()

def test_token_expiration():
    """Test token expiration."""
    # Create a token with 1 second expiration
    from app.utils.auth import create_access_token
    token = create_access_token({"sub": "test@example.com"}, timedelta(seconds=1))
    
    # Wait for token to expire
    import time
    time.sleep(2)
    
    # Try to use expired token
    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 401
    assert "token has expired" in response.json()["detail"].lower()

def test_password_hashing():
    """Test password hashing and verification."""
    password = "Test123!"
    hashed = get_password_hash(password)
    
    assert verify_password(password, hashed)
    assert not verify_password("WrongPassword123!", hashed) 