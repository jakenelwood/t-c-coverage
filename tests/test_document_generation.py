import unittest
from pathlib import Path
from datetime import datetime
from app.utils.document_generator import DocumentGenerator
from app.models.quote_request import QuoteType

class TestDocumentGeneration(unittest.TestCase):
    def setUp(self):
        self.generator = DocumentGenerator()
        self.test_data = {
            "quote_types": [QuoteType.AUTO],
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

    def test_auto_quote_generation(self):
        """Test auto quote document generation."""
        result = self.generator._generate_auto_quote(self.test_data)
        self.assertIsInstance(result, str)
        self.assertTrue(Path(result).exists())
        self.assertTrue(result.endswith('.docx'))

    def test_home_quote_generation(self):
        """Test home quote document generation."""
        home_data = {
            **self.test_data,
            "quote_types": [QuoteType.HOME],
            "home_details": {
                "year_built": "2000",
                "square_footage": "2000",
                "construction_type": "Frame",
                "roof_type": "Asphalt",
                "stories": "2",
                "garage_type": "Attached",
                "security_system": True,
                "fire_protection": True,
                "market_value": "300000",
                "deductible": "1000"
            }
        }
        result = self.generator._generate_home_quote(home_data)
        self.assertIsInstance(result, str)
        self.assertTrue(Path(result).exists())
        self.assertTrue(result.endswith('.docx'))

    def test_specialty_quote_generation(self):
        """Test specialty quote document generation."""
        specialty_data = {
            **self.test_data,
            "quote_types": [QuoteType.SPECIALTY],
            "specialty_items": [{
                "type": "Boat",
                "year": "2019",
                "make": "Sea Ray",
                "model": "Sundancer",
                "vin": "SR123456789",
                "market_value": "50000",
                "storage_location": "Marina",
                "horsepower": "300",
                "top_speed": "45",
                "comp_deductible": "500",
                "coll_deductible": "500"
            }]
        }
        result = self.generator._generate_specialty_quote(specialty_data)
        self.assertIsInstance(result, str)
        self.assertTrue(Path(result).exists())
        self.assertTrue(result.endswith('.docx'))

    def test_multi_quote_generation(self):
        """Test generation of multiple quote types."""
        multi_data = {
            **self.test_data,
            "quote_types": [QuoteType.AUTO, QuoteType.HOME, QuoteType.SPECIALTY],
            "home_details": {
                "year_built": "2000",
                "square_footage": "2000",
                "construction_type": "Frame",
                "roof_type": "Asphalt",
                "stories": "2",
                "garage_type": "Attached",
                "security_system": True,
                "fire_protection": True,
                "market_value": "300000",
                "deductible": "1000"
            },
            "specialty_items": [{
                "type": "Boat",
                "year": "2019",
                "make": "Sea Ray",
                "model": "Sundancer",
                "vin": "SR123456789",
                "market_value": "50000",
                "storage_location": "Marina",
                "horsepower": "300",
                "top_speed": "45",
                "comp_deductible": "500",
                "coll_deductible": "500"
            }]
        }
        results = self.generator.generate_quote_documents(multi_data)
        self.assertEqual(len(results), 3)
        for doc_type, path in results.items():
            self.assertTrue(Path(path).exists())
            self.assertTrue(path.endswith('.docx'))

    def test_placeholder_replacement(self):
        """Test placeholder replacement in documents."""
        doc = self.generator._generate_auto_quote(self.test_data)
        with open(doc, 'rb') as f:
            content = f.read()
            self.assertNotIn(b'{{', content)
            self.assertNotIn(b'}}', content)

    def test_missing_data_handling(self):
        """Test handling of missing data fields."""
        incomplete_data = {
            **self.test_data,
            "personal_info": {
                "name": "Test User",
                "email": "test@example.com"
            }
        }
        result = self.generator._generate_auto_quote(incomplete_data)
        self.assertIsInstance(result, str)
        self.assertTrue(Path(result).exists())

if __name__ == '__main__':
    unittest.main() 