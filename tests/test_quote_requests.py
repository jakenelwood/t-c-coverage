import pytest
from datetime import datetime, UTC
from fastapi.testclient import TestClient
from app.main import app
from app.models.quote_request import QuoteType, QuoteRequest, QuoteStatus

client = TestClient(app)

@pytest.fixture
def auth_token():
    """Fixture to get authentication token for tests."""
    # Register test agent
    agent_data = {
        "email": "test@example.com",
        "password": "Test123!",
        "first_name": "Test",
        "last_name": "User"
    }
    client.post("/auth/register", json=agent_data)
    
    # Login to get token
    login_data = {
        "username": "test@example.com",
        "password": "Test123!"
    }
    response = client.post("/auth/token", data=login_data)
    return response.json()["access_token"]

def test_submit_quote_request(auth_token):
    """Test submitting a new quote request."""
    quote_data = {
        "quote_types": [QuoteType.AUTO, QuoteType.HOME],
        "personal_info": {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "phone": "123-456-7890",
            "address": "123 Main St"
        },
        "vehicles": [{
            "year": "2020",
            "make": "Toyota",
            "model": "Camry",
            "vin": "1HGCM82633A123456",
            "usage": "Personal",
            "miles_driven": "12000",
            "primary_driver": "John Doe"
        }],
        "home_details": {
            "year_built": "1990",
            "square_footage": "2000",
            "construction_type": "Wood Frame",
            "roof_type": "Asphalt Shingle"
        }
    }
    
    response = client.post(
        "/quotes/submit",
        json=quote_data,
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    assert data["status"] == QuoteStatus.PENDING
    assert len(data["quote_types"]) == 2
    assert QuoteType.AUTO in data["quote_types"]
    assert QuoteType.HOME in data["quote_types"]

def test_list_quotes(auth_token):
    """Test listing quote requests."""
    # Submit a test quote first
    quote_data = {
        "quote_types": [QuoteType.AUTO],
        "personal_info": {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "phone": "123-456-7890",
            "address": "123 Main St"
        }
    }
    client.post(
        "/quotes/submit",
        json=quote_data,
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    
    # Test listing quotes
    response = client.get(
        "/quotes/list",
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "id" in data[0]
    assert "status" in data[0]
    assert "quote_types" in data[0]

def test_list_quotes_filtered(auth_token):
    """Test listing quotes with status and type filters."""
    # Submit quotes with different statuses
    quote_data = {
        "quote_types": [QuoteType.AUTO],
        "personal_info": {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "phone": "123-456-7890",
            "address": "123 Main St"
        }
    }
    response = client.post(
        "/quotes/submit",
        json=quote_data,
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    quote_id = response.json()["id"]
    
    # Update status
    client.put(
        f"/quotes/{quote_id}/status",
        json={"status": QuoteStatus.COMPLETED},
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    
    # Test filtering
    response = client.get(
        "/quotes/list?status=completed&quote_type=auto",
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert all(q["status"] == QuoteStatus.COMPLETED for q in data)
    assert all(QuoteType.AUTO in q["quote_types"] for q in data)

def test_update_quote_status(auth_token):
    """Test updating quote request status."""
    # Submit a test quote
    quote_data = {
        "quote_types": [QuoteType.AUTO],
        "personal_info": {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "phone": "123-456-7890",
            "address": "123 Main St"
        }
    }
    response = client.post(
        "/quotes/submit",
        json=quote_data,
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    quote_id = response.json()["id"]
    
    # Update status
    response = client.put(
        f"/quotes/{quote_id}/status",
        json={"status": QuoteStatus.COMPLETED},
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == QuoteStatus.COMPLETED

def test_upload_documents(auth_token):
    """Test uploading documents for a quote request."""
    # Submit a test quote
    quote_data = {
        "quote_types": [QuoteType.AUTO],
        "personal_info": {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "phone": "123-456-7890",
            "address": "123 Main St"
        }
    }
    response = client.post(
        "/quotes/submit",
        json=quote_data,
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    quote_id = response.json()["id"]
    
    # Upload test document
    files = {
        "file": ("test.pdf", b"test content", "application/pdf")
    }
    response = client.post(
        f"/quotes/{quote_id}/upload",
        files=files,
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "successfully uploaded" in data["message"].lower()

def test_unauthorized_access():
    """Test unauthorized access to quote endpoints."""
    # Try to submit quote without token
    quote_data = {
        "quote_types": [QuoteType.AUTO],
        "personal_info": {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "phone": "123-456-7890",
            "address": "123 Main St"
        }
    }
    response = client.post("/quotes/submit", json=quote_data)
    assert response.status_code == 401
    
    # Try to list quotes without token
    response = client.get("/quotes/list")
    assert response.status_code == 401 