const axios = require('axios');
require('dotenv').config();

// Configuration
const PORT = process.env.PORT || 3000;
const API_URL = `http://localhost:${PORT}/api/auth/register`;

// Test user with a more realistic email format
const user = {
  email: `test.admin.${Date.now()}@gmail.com`,
  password: 'Password123!',
  name: 'Test Admin'
};

// For demo purposes this shows the flow, but in a real app you would:
// 1. Use Supabase admin APIs to confirm the email directly
// 2. Or set up email confirmation properly
// 3. Or disable email confirmation in Supabase Auth settings
async function testRegisterForAdmin() {
  try {
    console.log(`Testing registration at: ${API_URL}`);
    console.log('Test user:', user);
    
    const response = await axios.post(API_URL, user);
    
    console.log('\nAPI Response:');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('\nRegistration test successful!');
    
    console.log('\nIMPORTANT: For testing purposes, confirm the email in Supabase dashboard:');
    console.log('1. Go to your Supabase dashboard: https://supabase.com/dashboard');
    console.log('2. Navigate to Authentication > Users');
    console.log(`3. Find the user with email: ${user.email}`);
    console.log('4. Confirm their email manually or set email_verified to true');
    console.log('\nAlternatively, in a production app:');
    console.log('- Configure proper email verification');
    console.log('- Disable email confirmation in Auth settings for development');
    console.log('- Use Admin API to programmatically confirm emails for testing');
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

testRegisterForAdmin(); 