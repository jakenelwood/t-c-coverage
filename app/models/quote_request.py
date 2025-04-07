from datetime import datetime, timezone
from typing import List, Optional, Dict, Any
from enum import Enum
from pydantic import BaseModel, EmailStr
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, JSON, Enum as SQLEnum
from sqlalchemy.orm import relationship
from app.database import Base

class QuoteType(str, Enum):
    """Enum for quote types."""
    AUTO = "AUTO"
    HOME = "HOME"
    SPECIALTY = "SPECIALTY"

class QuoteStatus(str, Enum):
    """Enum for quote statuses."""
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELED = "canceled"

class PersonalInfo(BaseModel):
    """Pydantic model for personal information."""
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    address: str
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    date_of_birth: Optional[str] = None
    ssn: Optional[str] = None
    marital_status: Optional[str] = None
    occupation: Optional[str] = None

class AdditionalInsured(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: str
    ssn: Optional[str] = None
    relationship: str
    phone: Optional[str] = None
    email: Optional[EmailStr] = None

class Vehicle(BaseModel):
    """Pydantic model for vehicle information."""
    year: str
    make: str
    model: str
    vin: Optional[str] = None
    usage: Optional[str] = None
    miles_driven: Optional[str] = None
    primary_driver: Optional[str] = None
    comp_deductible: Optional[str] = None
    coll_deductible: Optional[str] = None
    finance_info: Optional[str] = None
    gap_insurance: Optional[bool] = None

class HomeDetails(BaseModel):
    """Pydantic model for home information."""
    year_built: str
    square_footage: str
    construction_type: str
    roof_type: str
    number_of_stories: Optional[str] = None
    garage_type: Optional[str] = None
    security_system: Optional[bool] = None
    fire_protection: Optional[bool] = None
    market_value: Optional[str] = None
    coverage_amount: Optional[str] = None

class SpecialtyItem(BaseModel):
    """Pydantic model for specialty item information."""
    type: str  # boat, motorcycle, ATV, etc.
    year: str
    make: str
    model: str
    market_value: str
    storage_location: str
    horsepower: Optional[str] = None
    top_speed: Optional[str] = None
    comp_deductible: Optional[str] = None
    coll_deductible: Optional[str] = None

class QuoteRequest(Base):
    """SQLAlchemy model for quote requests."""
    __tablename__ = "quote_requests"

    id = Column(Integer, primary_key=True, index=True)
    agent_id = Column(Integer, ForeignKey("agents.id"))
    quote_types = Column(JSON)  # List of QuoteType
    status = Column(SQLEnum(QuoteStatus), default=QuoteStatus.PENDING)
    personal_info = Column(JSON)
    vehicles = Column(JSON, nullable=True)  # List of Vehicle
    home_details = Column(JSON, nullable=True)  # HomeDetails
    specialty_items = Column(JSON, nullable=True)  # List of SpecialtyItem
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.UTC))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.UTC), onupdate=lambda: datetime.now(timezone.UTC))

    agent = relationship("Agent", back_populates="quote_requests")

class QuoteRequestCreate(BaseModel):
    """Model for creating a quote request."""
    quote_types: List[QuoteType]
    personal_info: Dict[str, Any]
    vehicles: Optional[List[Dict[str, Any]]] = None
    home_details: Optional[Dict[str, Any]] = None
    specialty_items: Optional[List[Dict[str, Any]]] = None
    notes: Optional[str] = None

class QuoteRequestResponse(BaseModel):
    """Model for quote request response."""
    id: str
    agent_id: str
    quote_types: List[QuoteType]
    status: QuoteStatus
    personal_info: Dict[str, Any]
    vehicles: Optional[List[Dict[str, Any]]] = None
    home_details: Optional[Dict[str, Any]] = None
    specialty_items: Optional[List[Dict[str, Any]]] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    documents: Optional[Dict[str, Any]] = None

class QuoteStatusUpdate(BaseModel):
    """Model for updating quote status."""
    status: QuoteStatus 