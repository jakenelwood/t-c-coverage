import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time

class TestFrontend(unittest.TestCase):
    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        self.driver = webdriver.Chrome(options=chrome_options)
        self.base_url = "http://localhost:3000"
        self.wait = WebDriverWait(self.driver, 10)

    def tearDown(self):
        self.driver.quit()

    def test_landing_page_load(self):
        """Test that the landing page loads correctly."""
        self.driver.get(self.base_url)
        self.assertEqual(self.driver.title, "Twin Cities Coverage")
        
        # Check for main sections
        self.assertTrue(self.driver.find_element(By.CLASS_NAME, "hero-section"))
        self.assertTrue(self.driver.find_element(By.CLASS_NAME, "product-section"))
        self.assertTrue(self.driver.find_element(By.CLASS_NAME, "carrier-logos"))

    def test_quote_form_submission(self):
        """Test the quote request form submission."""
        self.driver.get(self.base_url)
        
        # Fill out the form
        self.driver.find_element(By.NAME, "firstName").send_keys("Test")
        self.driver.find_element(By.NAME, "address").send_keys("123 Test St")
        self.driver.find_element(By.NAME, "phone").send_keys("123-456-7890")
        self.driver.find_element(By.NAME, "email").send_keys("test@example.com")
        
        # Submit the form
        self.driver.find_element(By.CLASS_NAME, "submit-button").click()
        
        # Check for success message
        success_message = self.wait.until(
            EC.presence_of_element_located((By.CLASS_NAME, "success-message"))
        )
        self.assertIn("Thank you", success_message.text)

    def test_agent_login(self):
        """Test the agent login functionality."""
        self.driver.get(f"{self.base_url}/login")
        
        # Fill out login form
        self.driver.find_element(By.NAME, "email").send_keys("test@example.com")
        self.driver.find_element(By.NAME, "password").send_keys("testpassword123")
        
        # Submit login
        self.driver.find_element(By.CLASS_NAME, "login-button").click()
        
        # Check for successful login redirect
        self.wait.until(EC.url_contains("/agent-portal"))
        self.assertIn("Agent Portal", self.driver.title)

    def test_quote_request_generator(self):
        """Test the quote request generator form."""
        # First login
        self.test_agent_login()
        
        # Navigate to quote generator
        self.driver.get(f"{self.base_url}/agent-portal/quote-generator")
        
        # Select quote types
        self.driver.find_element(By.ID, "auto-checkbox").click()
        self.driver.find_element(By.ID, "home-checkbox").click()
        
        # Fill out personal information
        self.driver.find_element(By.NAME, "name").send_keys("Test User")
        self.driver.find_element(By.NAME, "email").send_keys("test@example.com")
        self.driver.find_element(By.NAME, "phone").send_keys("123-456-7890")
        self.driver.find_element(By.NAME, "address").send_keys("123 Test St")
        
        # Fill out auto information
        self.driver.find_element(By.NAME, "vehicle_year").send_keys("2020")
        self.driver.find_element(By.NAME, "vehicle_make").send_keys("Toyota")
        self.driver.find_element(By.NAME, "vehicle_model").send_keys("Camry")
        
        # Fill out home information
        self.driver.find_element(By.NAME, "year_built").send_keys("1990")
        self.driver.find_element(By.NAME, "square_footage").send_keys("2000")
        
        # Submit the form
        self.driver.find_element(By.CLASS_NAME, "submit-button").click()
        
        # Check for document generation
        download_links = self.wait.until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "download-link"))
        )
        self.assertEqual(len(download_links), 2)  # Auto and Home documents

    def test_mobile_responsiveness(self):
        """Test the mobile responsiveness of the site."""
        self.driver.set_window_size(375, 812)  # iPhone X dimensions
        
        # Test landing page
        self.driver.get(self.base_url)
        self.assertTrue(self.driver.find_element(By.CLASS_NAME, "mobile-menu"))
        
        # Test quote form
        self.driver.get(f"{self.base_url}/quote")
        form_elements = self.driver.find_elements(By.CLASS_NAME, "form-control")
        for element in form_elements:
            self.assertTrue(element.is_displayed())
            self.assertTrue(element.is_enabled())

    def test_navigation(self):
        """Test site navigation."""
        self.driver.get(self.base_url)
        
        # Test main navigation links
        nav_links = ["About", "Privacy Policy", "Agent Login"]
        for link_text in nav_links:
            link = self.driver.find_element(By.LINK_TEXT, link_text)
            link.click()
            self.wait.until(EC.url_contains(link_text.lower().replace(" ", "-")))
            self.assertIn(link_text, self.driver.title)

    def test_error_handling(self):
        """Test error handling and validation."""
        self.driver.get(f"{self.base_url}/quote")
        
        # Submit empty form
        self.driver.find_element(By.CLASS_NAME, "submit-button").click()
        
        # Check for validation errors
        error_messages = self.wait.until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "error-message"))
        )
        self.assertTrue(len(error_messages) > 0)

    def test_accessibility(self):
        """Test basic accessibility features."""
        self.driver.get(self.base_url)
        
        # Check for alt text on images
        images = self.driver.find_elements(By.TAG_NAME, "img")
        for image in images:
            self.assertTrue(image.get_attribute("alt"), 
                          f"Missing alt text for image: {image.get_attribute('src')}")
        
        # Check for proper heading hierarchy
        headings = self.driver.find_elements(By.TAG_NAME, "h1, h2, h3, h4, h5, h6")
        heading_levels = [int(h.tag_name[1]) for h in headings]
        self.assertEqual(heading_levels, sorted(heading_levels),
                        "Heading hierarchy is not properly ordered")

    def test_performance(self):
        """Test basic performance metrics."""
        self.driver.get(self.base_url)
        
        # Check page load time
        load_time = self.driver.execute_script(
            "return performance.timing.loadEventEnd - performance.timing.navigationStart"
        )
        self.assertLess(load_time, 3000, "Page load time exceeds 3 seconds")
        
        # Check resource sizes
        resources = self.driver.execute_script(
            "return performance.getEntriesByType('resource')"
        )
        for resource in resources:
            if resource["initiatorType"] in ["img", "script", "css"]:
                self.assertLess(resource["transferSize"], 500000,
                              f"Large resource: {resource['name']}")

if __name__ == '__main__':
    unittest.main() 