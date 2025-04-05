const axios = require('axios');
require('dotenv').config();

// Configuration
const API_URL = `http://localhost:${process.env.PORT || 3000}/api/auth`;
const TEST_USER = {
  email: `test_${Date.now()}@example.com`,
  password: 'Password123!',
  name: 'Test User'
};

let authToken = null;

// Helper to log responses
const logResponse = (title, data) => {
  console.log(`\n===== ${title} =====`);
  console.log(JSON.stringify(data, null, 2));
};

// Test registration
async function testRegister() {
  try {
    console.log(`\nRegistering user: ${TEST_USER.email}`);
    const response = await axios.post(`${API_URL}/register`, TEST_USER);
    logResponse('REGISTER RESPONSE', response.data);
    return true;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    return false;
  }
}

// Test login
async function testLogin() {
  try {
    console.log(`\nLogging in as: ${TEST_USER.email}`);
    const response = await axios.post(`${API_URL}/login`, {
      email: TEST_USER.email,
      password: TEST_USER.password
    });
    
    // Save the token for later requests
    authToken = response.data.session.access_token;
    
    logResponse('LOGIN RESPONSE', response.data);
    return true;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    return false;
  }
}

// Test getting profile
async function testGetProfile() {
  try {
    if (!authToken) {
      console.error('No auth token available. Login first.');
      return false;
    }
    
    console.log('\nGetting user profile');
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    
    logResponse('PROFILE RESPONSE', response.data);
    return true;
  } catch (error) {
    console.error('Get profile error:', error.response?.data || error.message);
    return false;
  }
}

// Test updating profile
async function testUpdateProfile() {
  try {
    if (!authToken) {
      console.error('No auth token available. Login first.');
      return false;
    }
    
    const updates = {
      name: `Updated ${TEST_USER.name}`,
      preferences: {
        theme: 'dark',
        notifications: true
      }
    };
    
    console.log('\nUpdating user profile');
    const response = await axios.put(`${API_URL}/profile`, updates, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    
    logResponse('UPDATE PROFILE RESPONSE', response.data);
    return true;
  } catch (error) {
    console.error('Update profile error:', error.response?.data || error.message);
    return false;
  }
}

// Test logout
async function testLogout() {
  try {
    if (!authToken) {
      console.error('No auth token available. Login first.');
      return false;
    }
    
    console.log('\nLogging out');
    const response = await axios.post(`${API_URL}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    
    logResponse('LOGOUT RESPONSE', response.data);
    
    // Test that token is no longer valid
    try {
      console.log('\nTesting invalidated token (should fail)');
      await axios.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      console.error('ERROR: Token still valid after logout!');
      return false;
    } catch (error) {
      console.log('SUCCESS: Token correctly invalidated after logout');
      return true;
    }
  } catch (error) {
    console.error('Logout error:', error.response?.data || error.message);
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('Starting Authentication API Tests');
  console.log('=================================');
  
  const registerSuccess = await testRegister();
  if (!registerSuccess) {
    console.error('Registration failed, stopping tests.');
    return;
  }
  
  const loginSuccess = await testLogin();
  if (!loginSuccess) {
    console.error('Login failed, stopping tests.');
    return;
  }
  
  await testGetProfile();
  await testUpdateProfile();
  await testLogout();
  
  console.log('\nTests completed!');
}

// Make sure the server is running before testing
runTests(); 