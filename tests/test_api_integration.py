import unittest
import requests
from pathlib import Path
import json
import time

class TestAPIIntegration(unittest.TestCase):
    def setUp(self):
        self.base_url = "http://localhost:8000/api"
        self.test_data = {
            "quote_types": ["auto"],
            "personal_info": {
                "name": "Test User",
                "email": "test@example.com",
                "phone": "123-456-7890",
                "address": "123 Test St",
                "dob": "1990-01-01",
                "ssn": "123-45-6789",
                "marital_status": "Single",
                "occupation": "Engineer"
            },
            "vehicles": [{
                "year": "2020",
                "make": "Toyota",
                "model": "Camry",
                "vin": "1HGCM82633A123456",
                "usage": "Personal",
                "miles_driven": "12000",
                "primary_driver": "Test User",
                "comp_deductible": "500",
                "coll_deductible": "500",
                "glass_coverage": "Yes",
                "towing": "Yes",
                "rental": "Yes",
                "financed": "No",
                "gap": "No"
            }]
        }

    def test_submit_quote(self):
        """Test submitting a quote request."""
        response = requests.post(f"{self.base_url}/quotes", json=self.test_data)
        self.assertEqual(response.status_code, 201)
        quote_id = response.json()["id"]
        self.assertIsNotNone(quote_id)
        return quote_id

    def test_generate_documents(self):
        """Test document generation endpoint."""
        quote_id = self.test_submit_quote()
        response = requests.post(f"{self.base_url}/quotes/{quote_id}/documents")
        self.assertEqual(response.status_code, 202)
        
        # Wait for document generation
        time.sleep(5)
        
        # Check document status
        status_response = requests.get(f"{self.base_url}/quotes/{quote_id}/documents/status")
        self.assertEqual(status_response.status_code, 200)
        self.assertTrue(status_response.json()["ready"])

    def test_download_documents(self):
        """Test document download endpoint."""
        quote_id = self.test_submit_quote()
        self.test_generate_documents()
        
        response = requests.get(f"{self.base_url}/quotes/{quote_id}/documents")
        self.assertEqual(response.status_code, 200)
        
        documents = response.json()
        self.assertIn("docx_url", documents)
        self.assertIn("pdf_url", documents)
        
        # Download and verify files
        for doc_type, url in documents.items():
            doc_response = requests.get(url)
            self.assertEqual(doc_response.status_code, 200)
            self.assertTrue(len(doc_response.content) > 0)

    def test_invalid_quote_data(self):
        """Test submitting invalid quote data."""
        invalid_data = {
            "quote_types": ["invalid_type"],
            "personal_info": {}
        }
        response = requests.post(f"{self.base_url}/quotes", json=invalid_data)
        self.assertEqual(response.status_code, 400)

    def test_missing_required_fields(self):
        """Test submitting quote with missing required fields."""
        incomplete_data = {
            "quote_types": ["auto"],
            "personal_info": {
                "name": "Test User"
            }
        }
        response = requests.post(f"{self.base_url}/quotes", json=incomplete_data)
        self.assertEqual(response.status_code, 400)

    def test_concurrent_requests(self):
        """Test handling of concurrent quote requests."""
        import threading
        
        def submit_quote():
            response = requests.post(f"{self.base_url}/quotes", json=self.test_data)
            self.assertEqual(response.status_code, 201)
        
        threads = []
        for _ in range(5):
            thread = threading.Thread(target=submit_quote)
            threads.append(thread)
            thread.start()
        
        for thread in threads:
            thread.join()

if __name__ == '__main__':
    unittest.main()