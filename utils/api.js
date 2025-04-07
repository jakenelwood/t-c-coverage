/**
 * API utility functions to communicate with FastAPI backend
 */

// Get the base API URL from environment variable or default to localhost
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Make an authenticated API request to the FastAPI backend
 * @param {string} endpoint - API endpoint path (without /api prefix)
 * @param {Object} options - Fetch options (method, body, etc.)
 * @returns {Promise<Object>} - JSON response from API
 */
export async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  // Add Authorization header if token exists
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}/api/${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    // Handle 401 Unauthorized (redirect to login)
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    
    // Try to get error details from response
    let errorMessage;
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || 'API request failed';
    } catch (e) {
      errorMessage = `API request failed with status: ${response.status}`;
    }
    
    throw new Error(errorMessage);
  }
  
  return response.json();
}

/**
 * Login user and get JWT token
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - Token response
 */
export async function login(email, password) {
  const response = await fetch(`${API_URL}/api/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      username: email, // OAuth2 spec uses 'username' field
      password,
    }),
  });
  
  if (!response.ok) {
    throw new Error('Invalid credentials');
  }
  
  const data = await response.json();
  
  // Store token in localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', data.access_token);
  }
  
  return data;
}

/**
 * Check if user is authenticated
 * @returns {boolean} - True if authenticated
 */
export function isAuthenticated() {
  if (typeof window === 'undefined') {
    return false;
  }
  
  return !!localStorage.getItem('token');
}

/**
 * Logout user (remove token)
 */
export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
} 