import unittest
import requests
import time
import threading
import statistics
from concurrent.futures import ThreadPoolExecutor
import psutil
import os

class TestPerformance(unittest.TestCase):
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

    def test_single_request_latency(self):
        """Test latency of a single quote submission."""
        start_time = time.time()
        response = requests.post(f"{self.base_url}/quotes", json=self.test_data)
        end_time = time.time()
        
        self.assertEqual(response.status_code, 201)
        latency = end_time - start_time
        self.assertLess(latency, 2.0, "Single request latency exceeds 2 seconds")

    def test_concurrent_requests(self):
        """Test system performance under concurrent load."""
        num_requests = 10
        latencies = []
        
        def submit_quote():
            start_time = time.time()
            response = requests.post(f"{self.base_url}/quotes", json=self.test_data)
            end_time = time.time()
            self.assertEqual(response.status_code, 201)
            return end_time - start_time
        
        with ThreadPoolExecutor(max_workers=num_requests) as executor:
            futures = [executor.submit(submit_quote) for _ in range(num_requests)]
            latencies = [future.result() for future in futures]
        
        avg_latency = statistics.mean(latencies)
        max_latency = max(latencies)
        
        self.assertLess(avg_latency, 3.0, "Average latency exceeds 3 seconds")
        self.assertLess(max_latency, 5.0, "Maximum latency exceeds 5 seconds")

    def test_sustained_load(self):
        """Test system performance under sustained load."""
        duration = 30  # seconds
        request_interval = 0.5  # seconds
        latencies = []
        
        def submit_quote():
            start_time = time.time()
            response = requests.post(f"{self.base_url}/quotes", json=self.test_data)
            end_time = time.time()
            self.assertEqual(response.status_code, 201)
            latencies.append(end_time - start_time)
        
        start_time = time.time()
        while time.time() - start_time < duration:
            threading.Thread(target=submit_quote).start()
            time.sleep(request_interval)
        
        avg_latency = statistics.mean(latencies)
        p95_latency = statistics.quantiles(latencies, n=20)[18]  # 95th percentile
        
        self.assertLess(avg_latency, 2.5, "Average latency exceeds 2.5 seconds")
        self.assertLess(p95_latency, 4.0, "95th percentile latency exceeds 4 seconds")

    def test_resource_usage(self):
        """Test system resource usage during load."""
        process = psutil.Process(os.getpid())
        
        # Measure baseline resource usage
        baseline_cpu = process.cpu_percent(interval=1)
        baseline_memory = process.memory_info().rss / 1024 / 1024  # MB
        
        # Generate load
        num_requests = 20
        with ThreadPoolExecutor(max_workers=num_requests) as executor:
            futures = [executor.submit(
                lambda: requests.post(f"{self.base_url}/quotes", json=self.test_data)
            ) for _ in range(num_requests)]
            [future.result() for future in futures]
        
        # Measure resource usage under load
        load_cpu = process.cpu_percent(interval=1)
        load_memory = process.memory_info().rss / 1024 / 1024  # MB
        
        # Check CPU usage
        self.assertLess(load_cpu, 80, "CPU usage exceeds 80%")
        
        # Check memory usage
        memory_increase = load_memory - baseline_memory
        self.assertLess(memory_increase, 100, 
                       f"Memory usage increased by {memory_increase}MB")

    def test_document_generation_performance(self):
        """Test performance of document generation."""
        # Submit quote
        response = requests.post(f"{self.base_url}/quotes", json=self.test_data)
        quote_id = response.json()["id"]
        
        # Measure document generation time
        start_time = time.time()
        response = requests.post(f"{self.base_url}/quotes/{quote_id}/documents")
        self.assertEqual(response.status_code, 202)
        
        # Wait for document generation
        while True:
            status_response = requests.get(
                f"{self.base_url}/quotes/{quote_id}/documents/status"
            )
            if status_response.json()["ready"]:
                break
            time.sleep(1)
        
        end_time = time.time()
        generation_time = end_time - start_time
        
        self.assertLess(generation_time, 10.0, 
                       "Document generation time exceeds 10 seconds")

    def test_file_size_optimization(self):
        """Test that generated files are optimized for size."""
        # Submit quote and generate documents
        response = requests.post(f"{self.base_url}/quotes", json=self.test_data)
        quote_id = response.json()["id"]
        requests.post(f"{self.base_url}/quotes/{quote_id}/documents")
        
        # Wait for document generation
        while True:
            status_response = requests.get(
                f"{self.base_url}/quotes/{quote_id}/documents/status"
            )
            if status_response.json()["ready"]:
                break
            time.sleep(1)
        
        # Get document URLs
        response = requests.get(f"{self.base_url}/quotes/{quote_id}/documents")
        documents = response.json()
        
        # Check file sizes
        for doc_type, url in documents.items():
            response = requests.get(url, stream=True)
            file_size = int(response.headers.get('content-length', 0)) / 1024  # KB
            self.assertLess(file_size, 500, 
                          f"{doc_type} file size exceeds 500KB")

    def test_cache_performance(self):
        """Test the effectiveness of caching."""
        # First request (cold cache)
        start_time = time.time()
        response = requests.get(f"{self.base_url}/quotes")
        cold_cache_time = time.time() - start_time
        
        # Second request (warm cache)
        start_time = time.time()
        response = requests.get(f"{self.base_url}/quotes")
        warm_cache_time = time.time() - start_time
        
        # Cache should improve performance
        self.assertLess(warm_cache_time, cold_cache_time,
                       "Caching is not improving performance")

    def test_error_recovery(self):
        """Test system recovery from errors."""
        # Generate load to cause potential errors
        num_requests = 50
        with ThreadPoolExecutor(max_workers=num_requests) as executor:
            futures = [executor.submit(
                lambda: requests.post(f"{self.base_url}/quotes", json=self.test_data)
            ) for _ in range(num_requests)]
            results = [future.result() for future in futures]
        
        # Count successful responses
        success_count = sum(1 for r in results if r.status_code == 201)
        self.assertGreater(success_count, num_requests * 0.9,
                         "Success rate below 90% under load")

if __name__ == '__main__':
    unittest.main() 