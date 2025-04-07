import pytest
import os
import shutil
from pathlib import Path
from fastapi.testclient import TestClient
from playwright.sync_api import sync_playwright
from app.main import app
from app.database import get_db
from app.models import Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Test database URL
TEST_DATABASE_URL = "sqlite:///./test.db"

# Create test database engine
engine = create_engine(TEST_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create test database tables
Base.metadata.create_all(bind=engine)

@pytest.fixture(scope="session")
def db():
    """Create a test database session."""
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

@pytest.fixture(scope="session")
def client(db):
    """Create a test client with the test database."""
    def override_get_db():
        try:
            yield db
        finally:
            pass
    
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()

@pytest.fixture(scope="session")
def test_output_dir():
    """Create a test output directory for generated documents."""
    test_dir = Path("test_output")
    test_dir.mkdir(exist_ok=True)
    yield test_dir
    # Clean up after tests
    shutil.rmtree(test_dir)

@pytest.fixture(scope="session")
def test_templates_dir():
    """Create a test templates directory."""
    test_dir = Path("test_templates")
    test_dir.mkdir(exist_ok=True)
    
    # Copy template files to test directory
    templates = ["auto_quote_template.docx", "home_quote_template.docx", "specialty_quote_template.docx"]
    for template in templates:
        src = Path(f"templates/{template}")
        if src.exists():
            shutil.copy(src, test_dir / template)
    
    yield test_dir
    # Clean up after tests
    shutil.rmtree(test_dir)

@pytest.fixture(scope="session")
def browser():
    """Create a browser instance for frontend tests."""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        yield browser
        browser.close()

@pytest.fixture
def page(browser):
    """Create a new page for each frontend test."""
    page = browser.new_page()
    yield page
    page.close()

@pytest.fixture(autouse=True)
def cleanup_test_data(db):
    """Clean up test data after each test."""
    yield
    # Delete all test data
    for table in reversed(Base.metadata.sorted_tables):
        db.execute(table.delete())
    db.commit()

@pytest.fixture
def auth_token(client):
    """Create a test agent and return an auth token."""
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

@pytest.fixture
def sample_quote_data():
    """Provide sample quote data for testing."""
    return {
        "quote_types": ["AUTO", "HOME"],
        "personal_info": {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "phone": "555-123-4567",
            "address": "123 Main St",
            "city": "Minneapolis",
            "state": "MN",
            "zip_code": "55401"
        },
        "vehicles": [
            {
                "year": "2020",
                "make": "Toyota",
                "model": "Camry",
                "vin": "1HGCM82633A123456",
                "usage": "Personal",
                "miles_driven": "12000",
                "primary_driver": "John Doe"
            }
        ],
        "home_details": {
            "year_built": "1990",
            "square_footage": "2000",
            "construction_type": "Frame",
            "roof_type": "Asphalt Shingle",
            "number_of_stories": "2",
            "garage_type": "Attached",
            "basement_type": "Finished"
        }
    }

@pytest.fixture
def sample_agent_data():
    """Provide sample agent data for testing."""
    return {
        "email": "test@example.com",
        "full_name": "Test Agent",
        "password": "testpassword123",
        "is_active": True,
        "permissions": ["quote:read", "quote:write"]
    } 