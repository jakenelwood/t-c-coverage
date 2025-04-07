import os
import logging
from pathlib import Path
from docx2pdf import convert
from datetime import datetime, timedelta
from typing import Optional, Dict, List
import shutil

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PDFGenerator:
    def __init__(self, templates_dir: str, output_dir: str):
        """
        Initialize PDF generator.
        
        Args:
            templates_dir: Directory containing DOCX templates
            output_dir: Directory for generated PDFs
        """
        self.templates_dir = Path(templates_dir)
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
    def generate_pdf(self, docx_path: str, output_filename: Optional[str] = None) -> str:
        """
        Convert a DOCX file to PDF.
        
        Args:
            docx_path: Path to the DOCX file
            output_filename: Optional name for the PDF file
            
        Returns:
            Path to the generated PDF
        """
        try:
            docx_path = Path(docx_path)
            
            if not output_filename:
                # Generate filename with timestamp
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                output_filename = f"{docx_path.stem}_{timestamp}.pdf"
            
            # Create output directory if it doesn't exist
            pdf_dir = self.output_dir / docx_path.parent.name
            pdf_dir.mkdir(parents=True, exist_ok=True)
            
            # Generate PDF
            pdf_path = pdf_dir / output_filename
            convert(docx_path, pdf_path)
            
            logger.info(f"PDF generated successfully: {pdf_path}")
            return str(pdf_path)
            
        except Exception as e:
            logger.error(f"Error generating PDF: {str(e)}")
            raise
    
    def generate_pdfs_for_quote(self, quote_data: Dict, docx_paths: List[str]) -> Dict[str, str]:
        """
        Generate PDFs for all quote types in a request.
        
        Args:
            quote_data: Quote request data
            docx_paths: List of paths to generated DOCX files
            
        Returns:
            Dictionary mapping quote types to PDF paths
        """
        try:
            pdf_paths = {}
            
            for docx_path in docx_paths:
                # Extract quote type from path
                quote_type = Path(docx_path).parent.name
                
                # Generate PDF
                pdf_path = self.generate_pdf(docx_path)
                pdf_paths[quote_type] = pdf_path
            
            return pdf_paths
            
        except Exception as e:
            logger.error(f"Error generating PDFs for quote: {str(e)}")
            raise
    
    def cleanup_old_files(self, retention_days: int = 7):
        """
        Remove old generated files.
        
        Args:
            retention_days: Number of days to keep files
        """
        try:
            cutoff_date = datetime.now() - timedelta(days=retention_days)
            
            for quote_type_dir in self.output_dir.iterdir():
                if not quote_type_dir.is_dir():
                    continue
                    
                for file_path in quote_type_dir.iterdir():
                    if not file_path.is_file():
                        continue
                        
                    # Get file creation time
                    file_time = datetime.fromtimestamp(file_path.stat().st_mtime)
                    
                    if file_time < cutoff_date:
                        file_path.unlink()
                        logger.info(f"Deleted old file: {file_path}")
                        
        except Exception as e:
            logger.error(f"Error cleaning up old files: {str(e)}")
            raise
    
    def get_file_url(self, file_path: str) -> str:
        """
        Generate a URL for file download.
        
        Args:
            file_path: Path to the file
            
        Returns:
            URL for file download
        """
        try:
            # In production, this would generate a signed URL or use a CDN
            # For now, return a relative path
            return f"/api/documents/download/{Path(file_path).parent.name}/{Path(file_path).name}"
            
        except Exception as e:
            logger.error(f"Error generating file URL: {str(e)}")
            raise

# Example usage:
"""
# Initialize PDF generator
pdf_gen = PDFGenerator("templates", "output")

# Generate PDF from DOCX
pdf_path = pdf_gen.generate_pdf("output/auto/quote_20240101.docx")

# Generate PDFs for multiple quote types
pdf_paths = pdf_gen.generate_pdfs_for_quote(
    quote_data,
    ["output/auto/quote_20240101.docx", "output/home/quote_20240101.docx"]
)

# Clean up old files
pdf_gen.cleanup_old_files(retention_days=7)

# Get file URL
file_url = pdf_gen.get_file_url("output/auto/quote_20240101.pdf")
""" 