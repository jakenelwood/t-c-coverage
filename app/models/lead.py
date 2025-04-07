from datetime import datetime, timezone
from typing import List, Optional
from enum import Enum
from pydantic import BaseModel, EmailStr
from sqlalchemy import Column, Integer, String, DateTime, JSON, Enum as SQLEnum
from app.database import Base

class LeadStatus(str, Enum):
    """Enum for lead status."""
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    CONVERTED = "converted"
    LOST = "lost"

class Lead(Base):
    """SQLAlchemy model for leads."""
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    address = Column(String)
    city = Column(String)
    state = Column(String)
    zip_code = Column(String)
    interested_in = Column(JSON)  # List of insurance types
    status = Column(SQLEnum(LeadStatus), default=LeadStatus.NEW)
    notes = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.UTC))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.UTC), onupdate=lambda: datetime.now(timezone.UTC))
    last_contact = Column(DateTime, nullable=True)

class LeadCreate(BaseModel):
    """Pydantic model for lead creation."""
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    address: str
    city: str
    state: str
    zip_code: str
    interested_in: List[str]
    notes: Optional[str] = None

class LeadResponse(BaseModel):
    """Pydantic model for lead response."""
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    address: str
    city: str
    state: str
    zip_code: str
    interested_in: List[str]
    status: LeadStatus
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    last_contact: Optional[datetime] = None

    class Config:
        from_attributes = True

class LeadStatusUpdate(BaseModel):
    """Pydantic model for lead status update."""
    status: LeadStatus
    notes: Optional[str] = None 