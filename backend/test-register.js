const axios = require('axios');
require('dotenv').config();

// Configuration
const PORT = process.env.PORT || 3000;
const API_URL = `http://localhost:${PORT}/api/auth/register`;

// Test user with a more realistic email format
const user = {
  email: `test.user.${Date.now()}@gmail.com`,
  password: 'Password123!',
  name: 'Test User'
};

async function testRegister() {
  try {
    console.log(`Testing registration at: ${API_URL}`);
    console.log('Test user:', user);
    
    const response = await axios.post(API_URL, user);
    
    console.log('\nAPI Response:');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('\nRegistration test successful!');
  } catch (error) {
    console.error('\nError during registration:');
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received. Is the server running?');
    } else {
      console.error('Error message:', error.message);
    }
  }
}

testRegister(); 