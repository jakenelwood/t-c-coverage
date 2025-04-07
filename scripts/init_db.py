import lancedb
import bcrypt
from datetime import datetime
import os

# Initialize database
db = lancedb.connect("data")

# Create agents table
agents_table = db.create_table("agents", mode="overwrite")

# Create quotes table
quotes_table = db.create_table("quotes", mode="overwrite")

# Sample agent data
sample_agents = [
    {
        "id": "1",
        "email": "admin@twincitiescoverage.com",
        "name": "Admin User",
        "hashed_password": bcrypt.hashpw("admin123".encode(), bcrypt.gensalt()).decode(),
        "role": "admin",
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": "2",
        "email": "agent@twincitiescoverage.com",
        "name": "Test Agent",
        "hashed_password": bcrypt.hashpw("agent123".encode(), bcrypt.gensalt()).decode(),
        "role": "agent",
        "created_at": datetime.utcnow().isoformat()
    }
]

# Add sample agents
agents_table.add(sample_agents)

# Sample quote data
sample_quotes = [
    {
        "id": "1",
        "agent_id": "2",
        "quote_type": "auto",
        "data": {
            "primary_insured_name": "John Doe",
            "primary_insured_address": "123 Main St, Minneapolis, MN 55401",
            "primary_insured_phone": "612-555-1234",
            "primary_insured_email": "john.doe@example.com",
            "vehicles": [
                {
                    "year": "2020",
                    "make": "Toyota",
                    "model": "Camry",
                    "vin": "1HGCM82633A123456",
                    "usage": "Personal",
                    "annual_miles": "12000"
                }
            ]
        },
        "created_at": datetime.utcnow().isoformat()
    }
]

# Add sample quotes
quotes_table.add(sample_quotes)

print("Database initialized with sample data.") 