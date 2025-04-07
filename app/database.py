import lancedb
import os
import logging
from typing import Generator, Dict, Any
import uuid

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database path
DB_PATH = os.getenv("DB_PATH", "data/lancedb")

# Initialize connection
db = lancedb.connect(DB_PATH)

def get_table(table_name: str, schema=None):
    """Get or create a table in LanceDB."""
    try:
        return db[table_name]
    except KeyError:
        if schema:
            return db.create_table(table_name, schema=schema)
        # Create table without schema (schema will be inferred from data)
        return db.create_table(table_name, data=[])

def init_db():
    """Initialize the database and ensure all tables exist."""
    try:
        logger.info("Ensuring LanceDB tables exist")
        # Ensure core tables exist - schema will be defined when data is added
        get_table("quotes")
        get_table("agents")
        get_table("documents")
        logger.info("LanceDB setup complete")
    except Exception as e:
        logger.error(f"Error initializing LanceDB: {str(e)}")
        raise

def get_db():
    """Get database connection."""
    # This is a stub to maintain API compatibility
    # with code that expects a SQLAlchemy session
    return db

def generate_id() -> str:
    """Generate a unique ID for database records."""
    return str(uuid.uuid4()) 