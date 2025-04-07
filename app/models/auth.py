from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

class Agent(BaseModel):
    """Simple model to represent an agent."""
    id: str
    email: str
    full_name: Optional[str] = None
    is_active: bool = True
    permissions: List[str] = []

class AgentCreate(BaseModel):
    """Model for creating a new agent."""
    email: str
    password: str
    full_name: str
    is_active: bool = True
    permissions: List[str] = ["basic"]

class AgentResponse(BaseModel):
    """Response model for agent data."""
    id: str
    email: str
    full_name: Optional[str] = None
    is_active: bool = True
    permissions: List[str] = []
    created_at: datetime
    last_login: Optional[datetime] = None

class Token(BaseModel):
    """Token response model."""
    access_token: str
    token_type: str

class TokenData(BaseModel):
    """Token data model."""
    email: Optional[str] = None 