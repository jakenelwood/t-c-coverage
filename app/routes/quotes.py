from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime, timezone
import os
from pathlib import Path
import uuid
import json
import logging
from enum import Enum

from app.utils.lancedb_utils import insert_quote_request, get_quote_requests, update_quote_status, get_quote_by_id
from app.utils.auth import get_current_agent
from app.routes.auth import get_current_user
from app.database import get_db, get_table, generate_id
from app.utils.document_generator import generate_quote_documents, DocumentGenerator
import lancedb
from app.models.auth import Agent

router = APIRouter()

logger = logging.getLogger(__name__)

class QuoteType(str, Enum):
    AUTO = "AUTO"
    HOME = "HOME"
    SPECIALTY = "SPECIALTY"

class QuoteStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELED = "canceled"

class QuoteStatusUpdate(BaseModel):
    status: QuoteStatus

class PersonalInfo(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    address: str
    city: str
    state: str
    zip_code: str
    date_of_birth: str
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
    email: Optional[str] = None

class Vehicle(BaseModel):
    year: str
    make: str
    model: str
    vin: str
    usage: str
    miles_driven: str
    primary_driver: str
    comp_deductible: Optional[str] = None
    coll_deductible: Optional[str] = None
    finance_info: Optional[str] = None
    gap_insurance: Optional[bool] = False

class HomeDetails(BaseModel):
    year_built: str
    square_footage: str
    construction_type: str
    roof_type: str
    number_of_stories: str
    garage_type: str
    basement_type: str
    security_system: Optional[bool] = False
    swimming_pool: Optional[bool] = False

class SpecialtyItem(BaseModel):
    type: str
    year: str
    make: str
    model: str
    vin: Optional[str] = None
    horsepower: Optional[str] = None
    top_speed: Optional[str] = None
    market_value: str
    storage_location: str
    comp_deductible: Optional[str] = None
    coll_deductible: Optional[str] = None

class QuoteRequest(BaseModel):
    quote_types: List[str]
    personal_info: PersonalInfo
    additional_insureds: Optional[List[AdditionalInsured]] = []
    vehicles: Optional[List[Vehicle]] = []
    home_details: Optional[HomeDetails] = None
    specialty_items: Optional[List[SpecialtyItem]] = []
    notes: Optional[str] = None
    current_carrier: Optional[str] = None
    years_with_carrier: Optional[int] = None
    expiration_date: Optional[str] = None
    current_limits: Optional[str] = None
    quoting_limits: Optional[str] = None

@router.post("/submit", response_model=dict)
def submit_quote_request(
    quote_data: QuoteRequest,
    current_agent: Dict[str, Any] = Depends(get_current_agent)
):
    """Submit a new quote request."""
    try:
        # Create quote record for LanceDB
        quote_id = generate_id()
        client_name = f"{quote_data.personal_info.first_name} {quote_data.personal_info.last_name}"
        
        quote_record = {
            "id": quote_id,
            "agent_id": current_agent["id"],
            "agent_email": current_agent["email"],
            "client_name": client_name,
            "client_email": quote_data.personal_info.email,
            "client_phone": quote_data.personal_info.phone,
            "address": quote_data.personal_info.address,
            "mailing_address": None,  # Can add if needed
            "quote_types": quote_data.quote_types,
            "status": "pending",
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
            "personal_info": quote_data.personal_info.dict(),
            "vehicles": [v.dict() for v in quote_data.vehicles] if quote_data.vehicles else [],
            "home_details": quote_data.home_details.dict() if quote_data.home_details else {},
            "specialty_items": [s.dict() for s in quote_data.specialty_items] if quote_data.specialty_items else [],
            "docx_path": None,
            "pdf_path": None
        }
        
        # If AUTO is in quote_types, add auto-specific data
        if "AUTO" in quote_data.quote_types and quote_data.vehicles:
            quote_record["auto_data"] = {
                "current_carrier": quote_data.current_carrier,
                "years_with_carrier": quote_data.years_with_carrier,
                "expiration_date": quote_data.expiration_date,
                "current_limits": quote_data.current_limits,
                "quoting_limits": quote_data.quoting_limits,
                "vehicles_data": [v.dict() for v in quote_data.vehicles]
            }
        
        # Store in LanceDB
        quotes_table = get_table("quotes")
        quotes_table.add([quote_record])
        
        # Generate documents
        try:
            generator = DocumentGenerator()
            documents = generator.generate_quote_documents(quote_record)
            
            # Update quote with document paths
            quotes_table = get_table("quotes")
            updated_record = quote_record.copy()
            updated_record.update({
                "docx_path": documents.get("docx_path"),
                "pdf_path": documents.get("pdf_path")
            })
            
            # Update the record
            quotes_table.delete(f"id = '{quote_id}'")
            quotes_table.add([updated_record])
            
            return {
                "id": quote_id,
                "message": "Quote request created successfully",
                "documents": documents
            }
        except Exception as e:
            logger.error(f"Error generating documents: {str(e)}")
            # Return success even if document generation fails
            return {
                "id": quote_id,
                "message": "Quote request created successfully, but document generation failed",
                "error": str(e)
            }
        
    except Exception as e:
        logger.error(f"Error creating quote: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating quote: {str(e)}"
        )

@router.get("/list", response_model=List[Dict])
def list_quote_requests(
    status: Optional[str] = None,
    quote_type: Optional[str] = None,
    current_agent: Dict[str, Any] = Depends(get_current_agent)
):
    """List quote requests with optional filters."""
    try:
        quotes_table = get_table("quotes")
        query = f"agent_id = '{current_agent['id']}'"
        
        if status:
            query += f" AND status = '{status}'"
        
        if quote_type:
            # This is a simplified approach - LanceDB's filtering on arrays is more complex
            query += f" AND quote_types LIKE '%{quote_type}%'"
        
        quotes = quotes_table.search().where(query).to_list()
        return quotes
    except Exception as e:
        logger.error(f"Error listing quotes: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error listing quotes: {str(e)}"
        )

@router.get("/{quote_id}", response_model=Dict)
def get_quote_request(
    quote_id: str,
    current_agent: Dict[str, Any] = Depends(get_current_agent)
):
    """Get a specific quote request."""
    try:
        quotes_table = get_table("quotes")
        quotes = quotes_table.search().where(f"id = '{quote_id}' AND agent_id = '{current_agent['id']}'").to_list()
        
        if not quotes:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Quote request not found"
            )
        
        return quotes[0]
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving quote {quote_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving quote: {str(e)}"
        )

@router.put("/{quote_id}/status")
def update_quote_request_status(
    quote_id: str,
    status_update: QuoteStatusUpdate,
    current_agent: Dict[str, Any] = Depends(get_current_agent)
):
    """Update the status of a quote request."""
    try:
        quotes_table = get_table("quotes")
        quotes = quotes_table.search().where(f"id = '{quote_id}' AND agent_id = '{current_agent['id']}'").to_list()
        
        if not quotes:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Quote request not found"
            )
        
        # Update the quote record
        quote = quotes[0]
        quote["status"] = status_update.status
        quote["updated_at"] = datetime.utcnow().isoformat()
        
        # Delete and re-add the record (LanceDB doesn't support updates directly)
        quotes_table.delete(f"id = '{quote_id}'")
        quotes_table.add([quote])
        
        return {"message": "Status updated successfully", "quote": quote}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating quote status: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating quote status: {str(e)}"
        )

@router.post("/{quote_id}/upload")
async def upload_documents(
    quote_id: str,
    file: UploadFile = File(...),
    current_agent: Dict[str, Any] = Depends(get_current_agent),
    db: lancedb.DBConnection = Depends(get_db)
):
    """Upload additional documents for a quote request."""
    # Get quote from LanceDB
    quotes_table = get_table("quotes")
    quotes = quotes_table.search().where(f"id = '{quote_id}' AND agent_id = '{current_agent['id']}'").to_list()
    
    if not quotes:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Quote request not found"
        )
    
    try:
        # Save file to appropriate location
        quote_dir = Path(f"output/quotes/{quote_id}")
        quote_dir.mkdir(parents=True, exist_ok=True)
        file_location = quote_dir / file.filename
        
        with open(file_location, "wb+") as file_object:
            file_object.write(file.file.read())
        
        # Update quote with new document
        quote = quotes[0]
        documents = quote.get("documents", [])
        documents.append(str(file_location))
        
        # Update the quote
        updated_quote = quote.copy()
        updated_quote["documents"] = documents
        updated_quote["updated_at"] = datetime.utcnow().isoformat()
        
        # Delete and re-add the record
        quotes_table.delete(f"id = '{quote_id}'")
        quotes_table.add([updated_quote])
        
        return {"message": "File successfully uploaded"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/")
async def create_quote(
    quote_data: Dict[str, Any], 
    current_user: Dict[str, Any] = Depends(get_current_user),
    db: lancedb.DBConnection = Depends(get_db)
):
    try:
        # Create quote record with LanceDB
        quote_id = generate_id()
        
        quote_record = {
            "id": quote_id,
            "agent_id": current_user["id"],
            "agent_email": current_user["email"],
            "quote_types": quote_data.get("quote_types", []),
            "personal_info": quote_data.get("personal_info", {}),
            "vehicles": quote_data.get("vehicles", []),
            "home_details": quote_data.get("home_details", {}),
            "specialty_items": quote_data.get("specialty_items", []),
            "status": "pending",
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        
        # Store in LanceDB
        quotes_table = get_table("quotes")
        quotes_table.add([quote_record])

        return {
            "message": "Quote request created successfully",
            "quote_id": quote_id
        }
    except Exception as e:
        logger.error(f"Error creating quote: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating quote: {str(e)}"
        )

@router.get("/")
async def get_quotes(current_user: dict = Depends(get_current_user)):
    try:
        # Get quotes from LanceDB
        quotes = get_quote_requests({"agent_email": current_user.email})
        return quotes
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving quotes: {str(e)}"
        )

@router.post("/submit")
async def submit_quote_request(
    quote_request: QuoteRequest,
    current_agent: dict = Depends(get_current_agent),
    db: lancedb.DBConnection = Depends(get_db)
):
    """Submit a new quote request."""
    try:
        # Add metadata
        quote_data = quote_request.model_dump()
        quote_data["agent_email"] = current_agent["email"]
        quote_data["submitted_at"] = datetime.utcnow().isoformat()
        quote_data["status"] = "pending"
        
        # Store in database
        table = db.open_table("quotes")
        table.add([quote_data])
        
        # Generate documents
        template_dir = Path(os.getenv("TEMPLATE_DIR", "templates"))
        output_dir = Path(os.getenv("OUTPUT_DIR", "output"))
        
        document_paths = generate_quote_documents(
            quote_data=quote_data,
            template_dir=template_dir,
            output_dir=output_dir
        )
        
        return {
            "message": "Quote request submitted successfully",
            "quote_id": quote_data["id"],
            "documents": document_paths
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/list")
async def list_quotes(
    current_agent: dict = Depends(get_current_agent),
    db: lancedb.DBConnection = Depends(get_db),
    status: Optional[QuoteType] = None,
    quote_type: Optional[QuoteType] = None
):
    """List quote requests with optional filtering."""
    try:
        table = db.open_table("quotes")
        query = f"agent_email = '{current_agent['email']}'"
        
        if status:
            query += f" AND status = '{status}'"
        if quote_type:
            query += f" AND quote_types = '{quote_type}'"
            
        quotes = table.search().where(query).to_list()
        return quotes
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        ) 