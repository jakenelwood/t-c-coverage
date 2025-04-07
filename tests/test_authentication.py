import unittest
import requests
import jwt
from datetime import datetime, timedelta
import os

class TestAuthentication(unittest.TestCase):
    def setUp(self):
        self.base_url = "http://localhost:8000/api"
        self.test_agent = {
            "email": "test@example.com",
            "password": "testpassword123"
        }
        self.invalid_agent = {
            "email": "invalid@example.com",
            "password": "wrongpassword"
        }

    def test_agent_login(self):
        """Test successful agent login."""
        response = requests.post(f"{self.base_url}/auth/login", json=self.test_agent)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("access_token", data)
        self.assertIn("token_type", data)
        self.assertEqual(data["token_type"], "bearer")
        return data["access_token"]

    def test_invalid_login(self):
        """Test login with invalid credentials."""
        response = requests.post(f"{self.base_url}/auth/login", json=self.invalid_agent)
        self.assertEqual(response.status_code, 401)

    def test_protected_route_access(self):
        """Test access to protected routes with valid token."""
        token = self.test_agent_login()
        headers = {"Authorization": f"Bearer {token}"}
        
        response = requests.get(f"{self.base_url}/quotes", headers=headers)
        self.assertEqual(response.status_code, 200)

    def test_protected_route_without_token(self):
        """Test access to protected routes without token."""
        response = requests.get(f"{self.base_url}/quotes")
        self.assertEqual(response.status_code, 401)

    def test_protected_route_with_invalid_token(self):
        """Test access to protected routes with invalid token."""
        headers = {"Authorization": "Bearer invalid_token"}
        response = requests.get(f"{self.base_url}/quotes", headers=headers)
        self.assertEqual(response.status_code, 401)

    def test_token_expiration(self):
        """Test token expiration handling."""
        # Create an expired token
        expired_token = jwt.encode(
            {
                "sub": self.test_agent["email"],
                "exp": datetime.utcnow() - timedelta(minutes=1)
            },
            os.getenv("JWT_SECRET_KEY", "test_secret_key"),
            algorithm="HS256"
        )
        
        headers = {"Authorization": f"Bearer {expired_token}"}
        response = requests.get(f"{self.base_url}/quotes", headers=headers)
        self.assertEqual(response.status_code, 401)

    def test_token_refresh(self):
        """Test token refresh functionality."""
        # First login to get refresh token
        response = requests.post(f"{self.base_url}/auth/login", json=self.test_agent)
        refresh_token = response.json().get("refresh_token")
        
        # Use refresh token to get new access token
        response = requests.post(
            f"{self.base_url}/auth/refresh",
            json={"refresh_token": refresh_token}
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("access_token", response.json())

    def test_agent_registration(self):
        """Test new agent registration."""
        new_agent = {
            "email": "newagent@example.com",
            "password": "newpassword123",
            "name": "New Agent",
            "agency": "Test Agency"
        }
        
        response = requests.post(f"{self.base_url}/auth/register", json=new_agent)
        self.assertEqual(response.status_code, 201)
        data = response.json()
        self.assertIn("id", data)
        self.assertEqual(data["email"], new_agent["email"])

    def test_duplicate_agent_registration(self):
        """Test registration with existing email."""
        response = requests.post(f"{self.base_url}/auth/register", json=self.test_agent)
        self.assertEqual(response.status_code, 400)

    def test_password_reset_request(self):
        """Test password reset request."""
        response = requests.post(
            f"{self.base_url}/auth/password-reset-request",
            json={"email": self.test_agent["email"]}
        )
        self.assertEqual(response.status_code, 200)

    def test_password_reset(self):
        """Test password reset with token."""
        # First request reset token
        response = requests.post(
            f"{self.base_url}/auth/password-reset-request",
            json={"email": self.test_agent["email"]}
        )
        reset_token = response.json().get("reset_token")
        
        # Reset password
        new_password = "newpassword123"
        response = requests.post(
            f"{self.base_url}/auth/password-reset",
            json={
                "token": reset_token,
                "new_password": new_password
            }
        )
        self.assertEqual(response.status_code, 200)
        
        # Verify new password works
        response = requests.post(
            f"{self.base_url}/auth/login",
            json={
                "email": self.test_agent["email"],
                "password": new_password
            }
        )
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main() 