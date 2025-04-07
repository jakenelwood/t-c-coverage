from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.lead import Lead, LeadCreate, LeadResponse, LeadStatus, LeadStatusUpdate

router = APIRouter()

@router.post("/submit", response_model=LeadResponse)
def submit_lead(lead_data: LeadCreate, db: Session = Depends(get_db)):
    """Submit a new lead."""
    # Check if email already exists
    if db.query(Lead).filter(Lead.email == lead_data.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists"
        )
    
    # Create new lead
    db_lead = Lead(
        first_name=lead_data.first_name,
        last_name=lead_data.last_name,
        email=lead_data.email,
        phone=lead_data.phone,
        address=lead_data.address,
        city=lead_data.city,
        state=lead_data.state,
        zip_code=lead_data.zip_code,
        interested_in=lead_data.interested_in,
        notes=lead_data.notes
    )
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return db_lead

@router.get("/list", response_model=List[LeadResponse])
def list_leads(
    status: Optional[LeadStatus] = None,
    db: Session = Depends(get_db)
):
    """List leads with optional status filter."""
    query = db.query(Lead)
    
    if status:
        query = query.filter(Lead.status == status)
    
    return query.all()

@router.get("/{lead_id}", response_model=LeadResponse)
def get_lead(lead_id: int, db: Session = Depends(get_db)):
    """Get a specific lead."""
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lead not found"
        )
    return lead

@router.put("/{lead_id}/status", response_model=LeadResponse)
def update_lead_status(
    lead_id: int,
    status_update: LeadStatusUpdate,
    db: Session = Depends(get_db)
):
    """Update the status of a lead."""
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lead not found"
        )
    
    lead.status = status_update.status
    lead.notes = status_update.notes if status_update.notes else lead.notes
    lead.updated_at = datetime.now(timezone.UTC)
    
    if status_update.status != LeadStatus.NEW:
        lead.last_contact = datetime.now(timezone.UTC)
    
    db.commit()
    db.refresh(lead)
    return lead

@router.delete("/{lead_id}")
def delete_lead(lead_id: int, db: Session = Depends(get_db)):
    """Delete a lead."""
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lead not found"
        )
    
    db.delete(lead)
    db.commit()
    return {"message": "Lead deleted successfully"} 