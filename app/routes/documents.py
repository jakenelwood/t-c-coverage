from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.responses import FileResponse
from typing import List, Dict, Optional
import os
from pathlib import Path
from app.utils.document_generator import generate_quote_documents
from app.utils.pdf_generator import PDFGenerator
from app.routes.auth import get_current_user
from app.utils.auth import get_current_agent
from app.utils.lancedb_utils import get_quote_by_id

router = APIRouter()

@router.post("/generate")
async def generate_documents(quote_data: dict, current_user: dict = Depends(get_current_user)):
    try:
        # Get template and output directories from environment variables
        templates_dir = os.getenv("TEMPLATES_DIR", "templates")
        output_dir = os.getenv("OUTPUT_DIR", "output")
        
        # Generate DOCX documents
        docx_paths = await generate_quote_documents(
            quote_data=quote_data,
            templates_dir=templates_dir,
            output_dir=output_dir
        )
        
        if not docx_paths:
            raise HTTPException(
                status_code=400,
                detail="No documents were generated"
            )
        
        # Generate PDFs
        pdf_gen = PDFGenerator(templates_dir, output_dir)
        pdf_paths = pdf_gen.generate_pdfs_for_quote(quote_data, docx_paths)
        
        # Generate download URLs
        docx_urls = {k: f"/api/documents/download/{k}/{Path(v).name}" for k, v in docx_paths.items()}
        pdf_urls = {k: f"/api/documents/download/{k}/{Path(v).name}" for k, v in pdf_paths.items()}
        
        return {
            "message": "Documents generated successfully",
            "docx_files": docx_urls,
            "pdf_files": pdf_urls
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating documents: {str(e)}"
        )

@router.get("/download/{quote_type}/{filename}")
async def download_document(
    quote_type: str,
    filename: str,
    current_user: dict = Depends(get_current_user)
):
    try:
        # Get output directory from environment variable
        output_dir = os.getenv("OUTPUT_DIR", "output")
        
        # Construct file path
        file_path = os.path.join(output_dir, quote_type, filename)
        
        # Check if file exists
        if not os.path.exists(file_path):
            raise HTTPException(
                status_code=404,
                detail="Document not found"
            )
        
        # Return file
        return FileResponse(
            file_path,
            media_type="application/octet-stream",
            filename=filename
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error downloading document: {str(e)}"
        )

@router.get("/documents/{quote_id}/{filename}")
async def get_document(
    quote_id: str,
    filename: str,
    current_agent=Depends(get_current_agent)
):
    """Get a document by quote ID and filename."""
    try:
        # Verify quote exists and belongs to agent
        quote = get_quote_by_id(quote_id)
        if not quote:
            raise HTTPException(status_code=404, detail="Quote not found")
        if quote["agent_email"] != current_agent["email"]:
            raise HTTPException(status_code=403, detail="Not authorized to access this document")
        
        # Check if file exists
        file_path = Path(os.path.join("output", quote_id, filename))
        if not file_path.exists():
            raise HTTPException(status_code=404, detail="Document not found")
        
        # Read file content
        content = file_path.read_bytes()
        
        # Determine content type
        content_type = "application/pdf" if filename.endswith(".pdf") else "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        
        return Response(
            content=content,
            media_type=content_type,
            headers={
                "Content-Disposition": f"attachment; filename={filename}"
            }
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/documents/{quote_id}")
async def list_documents(
    quote_id: str,
    current_agent=Depends(get_current_agent)
):
    """List all documents for a quote."""
    try:
        # Verify quote exists and belongs to agent
        quote = get_quote_by_id(quote_id)
        if not quote:
            raise HTTPException(status_code=404, detail="Quote not found")
        if quote["agent_email"] != current_agent["email"]:
            raise HTTPException(status_code=403, detail="Not authorized to access these documents")
        
        # Get all files in quote directory
        quote_dir = Path(os.path.join("output", quote_id))
        if not quote_dir.exists():
            return {"documents": []}
        
        documents = []
        for file_path in quote_dir.glob("**/*"):
            if file_path.is_file():
                documents.append({
                    "filename": file_path.name,
                    "path": str(file_path.relative_to(quote_dir)),
                    "size": file_path.stat().st_size,
                    "created_at": file_path.stat().st_ctime
                })
        
        return {"documents": documents}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/documents/{quote_id}/{filename}")
async def delete_document(
    quote_id: str,
    filename: str,
    current_agent=Depends(get_current_agent)
):
    """Delete a document."""
    try:
        # Verify quote exists and belongs to agent
        quote = get_quote_by_id(quote_id)
        if not quote:
            raise HTTPException(status_code=404, detail="Quote not found")
        if quote["agent_email"] != current_agent["email"]:
            raise HTTPException(status_code=403, detail="Not authorized to delete this document")
        
        # Check if file exists
        file_path = Path(os.path.join("output", quote_id, filename))
        if not file_path.exists():
            raise HTTPException(status_code=404, detail="Document not found")
        
        # Delete file
        file_path.unlink()
        
        return {"message": "Document deleted successfully"}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 