from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base

class AutoQuote(Base):
    """SQLAlchemy model for auto insurance quotes."""
    __tablename__ = "auto_quotes"

    id = Column(Integer, primary_key=True, index=True)
    quote_id = Column(Integer, ForeignKey("quotes.id"), nullable=False)
    current_carrier = Column(String(255), nullable=True)
    years_with_carrier = Column(Integer, nullable=True)
    expiration_date = Column(DateTime, nullable=True)
    current_limits = Column(String(255), nullable=True)
    quoting_limits = Column(String(255), nullable=True)
    drivers_data = Column(Text, nullable=True)  # JSON string
    vehicles_data = Column(Text, nullable=True)  # JSON string

    # Relationship with parent quote
    quote = relationship("Quote", back_populates="auto_quote") 