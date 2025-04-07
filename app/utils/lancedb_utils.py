import lancedb
import os
from datetime import datetime
from typing import Dict, List, Optional
from app.database import get_table, generate_id

# Initialize LanceDB connection
DB_PATH = os.getenv("DB_PATH", "data/lancedb")
db = lancedb.connect(DB_PATH)

def get_table(table_name: str):
    """Get or create a table in LanceDB."""
    try:
        return db[table_name]
    except KeyError:
        return db.create_table(table_name)

def insert_lead(lead_data: Dict):
    """Insert a new lead into the leads table."""
    table = get_table("leads")
    lead_data["created_at"] = datetime.utcnow().isoformat()
    table.add([lead_data])
    return lead_data

def get_leads(filters: Optional[Dict] = None) -> List[Dict]:
    """Get leads with optional filters."""
    table = get_table("leads")
    query = table.search()
    
    if filters:
        for key, value in filters.items():
            query = query.where(f"{key} = '{value}'")
    
    return query.to_list()

def insert_quote_request(quote_data: Dict) -> Dict:
    """Insert a new quote request into the quotes table."""
    table = get_table("quotes")
    
    # Add metadata
    quote_data["id"] = generate_id()
    quote_data["created_at"] = datetime.utcnow().isoformat()
    quote_data["updated_at"] = datetime.utcnow().isoformat()
    quote_data["status"] = quote_data.get("status", "pending")
    
    # Store in LanceDB
    table.add([quote_data])
    
    return quote_data

def get_quote_requests(filters: Optional[Dict] = None) -> List[Dict]:
    """Get quote requests with optional filters."""
    table = get_table("quotes")
    query = table.search()
    
    if filters:
        for key, value in filters.items():
            query = query.where(f"{key} = '{value}'")
    
    return query.to_list()

def update_quote_status(quote_id: str, status: str) -> Dict:
    """Update the status of a quote request."""
    table = get_table("quotes")
    quotes = table.search().where(f"id = '{quote_id}'").to_list()
    
    if not quotes:
        raise ValueError(f"Quote with ID {quote_id} not found")
    
    quote = quotes[0]
    quote["status"] = status
    quote["updated_at"] = datetime.utcnow().isoformat()
    
    # Delete and re-add the record (LanceDB doesn't support updates directly)
    table.delete(f"id = '{quote_id}'")
    table.add([quote])
    
    return quote

def get_quote_by_id(quote_id: str) -> Optional[Dict]:
    """Get a quote request by its ID."""
    table = get_table("quotes")
    quotes = table.search().where(f"id = '{quote_id}'").to_list()
    return quotes[0] if quotes else None 