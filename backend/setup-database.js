const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Script to setup necessary database tables and RLS policies
 * This script should be idempotent (safe to run multiple times)
 */
async function setupDatabase() {
  try {
    console.log('Starting database setup...');
    
    // Step 1: Check if tables exist
    console.log('\n1. Checking existing tables...');
    const tables = [
      { name: 'profiles', exists: false },
      { name: 'categories', exists: false },
      { name: 'category_rules', exists: false },
      { name: 'transactions', exists: false },
      { name: 'files', exists: false }
    ];
    
    // Check each table
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table.name)
          .select('*')
          .limit(1);
          
        if (!error) {
          table.exists = true;
          console.log(`  ✓ Table '${table.name}' exists`);
        } else {
          console.log(`  ✗ Table '${table.name}' does not exist: ${error.message}`);
        }
      } catch (error) {
        console.log(`  ✗ Error checking table '${table.name}': ${error.message}`);
      }
    }
    
    // Execute SQL to create and configure missing tables using the REST API
    // Note: Full table creation would be better done in migrations or SQL files
    // This is a simplified approach for demonstration
    
    console.log('\n2. Setting up missing tables...');
    
    // A basic check for each table we need
    const missingTables = tables.filter(t => !t.exists);
    
    if (missingTables.length === 0) {
      console.log('  ✓ All required tables exist');
    } else {
      console.log(`  ✗ Missing ${missingTables.length} tables: ${missingTables.map(t => t.name).join(', ')}`);
      console.log('    Please create these tables through the Supabase console');
      console.log('    or run appropriate SQL migration scripts');
    }
    
    // Step 2: Check/Setup RLS policies
    console.log('\n3. Checking RLS policies...');
    console.log('  This check requires admin rights. Please ensure RLS is properly configured');
    console.log('  in the Supabase dashboard for all tables to protect user data.');
    
    // Print instructions for setting up RLS
    console.log('\n4. RLS Setup Instructions:');
    console.log('  For each table, ensure these RLS policies are in place:');
    console.log('  - profiles: Users can only read/write their own profile');
    console.log('  - categories: Users can read all categories but only modify their own');
    console.log('  - category_rules: Users can only access their own rules');
    console.log('  - transactions: Users can only access their own transactions');
    console.log('  - files: Users can only access their own files');
    
    console.log('\nDatabase setup check complete.');
    
  } catch (error) {
    console.error('Error during database setup:', error.message);
  }
}

setupDatabase(); 