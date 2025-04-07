import pytest
from datetime import datetime, UTC
from fastapi.testclient import TestClient
from app.main import app
from app.models.lead import LeadStatus

client = TestClient(app)

def test_submit_lead():
    """Test submitting a new lead."""
    lead_data = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "phone": "123-456-7890",
        "address": "123 Main St",
        "city": "Minneapolis",
        "state": "MN",
        "zip_code": "55401",
        "interested_in": ["auto", "home"]
    }
    
    response = client.post("/leads/submit", json=lead_data)
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    assert data["status"] == LeadStatus.NEW
    assert data["first_name"] == lead_data["first_name"]
    assert data["last_name"] == lead_data["last_name"]
    assert data["email"] == lead_data["email"]
    assert "interested_in" in data
    assert len(data["interested_in"]) == 2

def test_list_leads():
    """Test listing leads."""
    # Submit a test lead first
    lead_data = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "phone": "123-456-7890",
        "address": "123 Main St",
        "city": "Minneapolis",
        "state": "MN",
        "zip_code": "55401",
        "interested_in": ["auto"]
    }
    client.post("/leads/submit", json=lead_data)
    
    # Test listing leads
    response = client.get("/leads/list")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "id" in data[0]
    assert "status" in data[0]
    assert "first_name" in data[0]
    assert "last_name" in data[0]

def test_list_leads_filtered():
    """Test listing leads with status filter."""
    # Submit leads with different statuses
    lead_data = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "phone": "123-456-7890",
        "address": "123 Main St",
        "city": "Minneapolis",
        "state": "MN",
        "zip_code": "55401",
        "interested_in": ["auto"]
    }
    response = client.post("/leads/submit", json=lead_data)
    lead_id = response.json()["id"]
    
    # Update status
    client.put(f"/leads/{lead_id}/status", json={"status": LeadStatus.CONTACTED})
    
    # Test filtering
    response = client.get("/leads/list?status=contacted")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert all(l["status"] == LeadStatus.CONTACTED for l in data)

def test_update_lead_status():
    """Test updating lead status."""
    # Submit a test lead
    lead_data = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "phone": "123-456-7890",
        "address": "123 Main St",
        "city": "Minneapolis",
        "state": "MN",
        "zip_code": "55401",
        "interested_in": ["auto"]
    }
    response = client.post("/leads/submit", json=lead_data)
    lead_id = response.json()["id"]
    
    # Update status
    response = client.put(
        f"/leads/{lead_id}/status",
        json={"status": LeadStatus.CONTACTED}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == LeadStatus.CONTACTED

def test_lead_validation():
    """Test lead data validation."""
    # Test missing required fields
    lead_data = {
        "first_name": "John",
        "last_name": "Doe"
    }
    response = client.post("/leads/submit", json=lead_data)
    assert response.status_code == 422
    assert "email" in response.json()["detail"][0]["loc"]
    
    # Test invalid email format
    lead_data = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "invalid-email",
        "phone": "123-456-7890",
        "address": "123 Main St",
        "city": "Minneapolis",
        "state": "MN",
        "zip_code": "55401"
    }
    response = client.post("/leads/submit", json=lead_data)
    assert response.status_code == 422
    assert "email" in response.json()["detail"][0]["loc"]
    
    # Test invalid phone format
    lead_data = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "phone": "invalid-phone",
        "address": "123 Main St",
        "city": "Minneapolis",
        "state": "MN",
        "zip_code": "55401"
    }
    response = client.post("/leads/submit", json=lead_data)
    assert response.status_code == 422
    assert "phone" in response.json()["detail"][0]["loc"]

def test_duplicate_lead():
    """Test submitting duplicate lead."""
    lead_data = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "phone": "123-456-7890",
        "address": "123 Main St",
        "city": "Minneapolis",
        "state": "MN",
        "zip_code": "55401",
        "interested_in": ["auto"]
    }
    
    # First submission
    client.post("/leads/submit", json=lead_data)
    
    # Second submission with same email
    response = client.post("/leads/submit", json=lead_data)
    assert response.status_code == 400
    assert "email already exists" in response.json()["detail"].lower() 