const axios = require('axios');
require('dotenv').config();

// Configuration
const PORT = process.env.PORT || 3000;
const API_URL = `http://localhost:${PORT}/api/auth/login`;

// Use the previously registered user
// You would need to update these values with a user that exists in your Supabase
const user = {
  email: 'test.user.1743857307350@gmail.com', // Update with the email from the registration test
  password: 'Password123!'
};

async function testLogin() {
  try {
    console.log(`Testing login at: ${API_URL}`);
    console.log('Login credentials:', user);
    
    const response = await axios.post(API_URL, user);
    
    console.log('\nAPI Response:');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('\nLogin test successful!');
    
    // Store the token for further testing
    const token = response.data.session.access_token;
    console.log('\nToken for testing protected routes:');
    console.log(token);
  } catch (error) {
    console.error('\nError during login:');
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

testLogin(); 