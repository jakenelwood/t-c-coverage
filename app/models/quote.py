from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Quote(Base):
    """SQLAlchemy model for insurance quotes."""
    __tablename__ = "quotes"

    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String(255), nullable=False)
    client_email = Column(String(255), nullable=True)
    client_phone = Column(String(50), nullable=True)
    address = Column(String(255), nullable=True)
    mailing_address = Column(String(255), nullable=True)
    quote_types = Column(JSON, nullable=True)  # JSON array of quote types
    effective_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    docx_path = Column(String(255), nullable=True)
    pdf_path = Column(String(255), nullable=True)

    # Relationships
    auto_quote = relationship("AutoQuote", back_populates="quote", uselist=False) 