import os
import lancedb
from typing import Optional

def get_db():
    """Get a LanceDB connection."""
    db_path = os.getenv("DB_PATH", "data/lancedb")
    return lancedb.connect(db_path)

def get_table(table_name: str, schema: Optional[dict] = None):
    """Get or create a table in LanceDB."""
    db = get_db()
    try:
        return db[table_name]
    except KeyError:
        if schema:
            return db.create_table(table_name, schema=schema)
        return db.create_table(table_name) 