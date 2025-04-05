const axios = require('axios');
require('dotenv').config();

// Configuration
const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

async function testApiConnection() {
  try {
    console.log(`Testing connection to: ${BASE_URL}`);
    const response = await axios.get(BASE_URL);
    console.log('\nAPI Response:');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('\nConnection test successful!');
  } catch (error) {
    console.error('\nError connecting to API:');
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

testApiConnection(); 