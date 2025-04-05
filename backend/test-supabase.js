const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test the connection by getting the current user (will be null if not authenticated)
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error connecting to Supabase:', error.message);
      return;
    }
    
    console.log('Supabase connection successful!');
    console.log('Session data:', data);
    
    // Test a simple query to check database permissions
    console.log('\nTesting database access...');
    
    // Try to get list of profiles (if table exists)
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
      
    if (profilesError) {
      console.log('Profiles table error:', profilesError.message);
    } else {
      console.log('Successfully accessed profiles table:', profilesData);
    }
    
    // Try to get list of categories (if table exists)
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(1);
      
    if (categoriesError) {
      console.log('Categories table error:', categoriesError.message);
    } else {
      console.log('Successfully accessed categories table:', categoriesData);
    }
    
  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
}

testConnection(); 