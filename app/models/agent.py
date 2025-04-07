from typing import List, Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime

class AgentCreate(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    is_active: bool = True
    permissions: List[str] = ["quote:read", "quote:write"]

class Agent(BaseModel):
    email: EmailStr
    full_name: str
    is_active: bool
    permissions: List[str]
    created_at: datetime
    last_login: Optional[datetime] = None

    class Config:
        from_attributes = True 