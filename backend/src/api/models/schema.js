/**
 * MoMo Tracker Supabase Schema Design
 * 
 * This file contains the schema design for our Supabase database.
 * It serves as a reference for the tables and relationships.
 * 
 * Note: This is not used directly in code, but serves as documentation
 * for database structure.
 */

const schema = {
  // Users table - managed by Supabase Auth
  users: {
    id: 'uuid', // automatically managed by Supabase Auth
    email: 'string', // managed by Supabase Auth
    created_at: 'timestamp', // managed by Supabase Auth
    // Additional user metadata can be stored in user_profiles
  },

  // User profiles for additional user data
  user_profiles: {
    id: 'uuid',
    user_id: 'uuid', // foreign key to users.id
    name: 'string',
    phone: 'string', // optional
    created_at: 'timestamp',
    updated_at: 'timestamp',
  },

  // Transactions table for storing MoMo transactions
  transactions: {
    id: 'uuid',
    user_id: 'uuid', // foreign key to users.id
    transaction_date: 'timestamp', // Date and time of the transaction
    amount: 'numeric', // Amount of the transaction
    description: 'text', // Raw transaction description from MoMo
    transaction_type: 'string', // e.g., 'deposit', 'withdrawal', 'transfer'
    category_id: 'uuid', // foreign key to categories.id
    is_expense: 'boolean', // Whether the transaction is an expense
    is_income: 'boolean', // Whether the transaction is income
    created_at: 'timestamp',
    updated_at: 'timestamp',
  },

  // Categories for transaction classification
  categories: {
    id: 'uuid',
    name: 'string', // e.g., 'Food', 'Transport', 'Entertainment'
    icon: 'string', // Optional icon identifier
    is_default: 'boolean', // Whether this is a default category
    user_id: 'uuid', // null for default categories, user_id for custom categories
    created_at: 'timestamp',
  },
  
  // Keywords for rule-based categorization
  categorization_rules: {
    id: 'uuid',
    keyword: 'string', // e.g., 'UBER', 'MTN', 'RESTAURANT'
    category_id: 'uuid', // foreign key to categories.id
    user_id: 'uuid', // null for default rules, user_id for custom rules
    is_default: 'boolean', // Whether this is a default rule
    created_at: 'timestamp',
  }
};

/**
 * SQL for creating tables in Supabase
 * Run these in the Supabase SQL Editor
 */
const createTablesSql = `
-- Create user_profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for user_profiles
CREATE POLICY "Users can only access their own profiles"
  ON user_profiles
  FOR ALL
  USING (auth.uid() = user_id);

-- Create categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  icon TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policy for categories
CREATE POLICY "Users can access default categories and their own categories"
  ON categories
  FOR ALL
  USING (is_default OR auth.uid() = user_id);

-- Create transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  transaction_date TIMESTAMP WITH TIME ZONE NOT NULL,
  amount NUMERIC NOT NULL,
  description TEXT,
  transaction_type TEXT,
  category_id UUID REFERENCES categories(id),
  is_expense BOOLEAN,
  is_income BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policy for transactions
CREATE POLICY "Users can only access their own transactions"
  ON transactions
  FOR ALL
  USING (auth.uid() = user_id);

-- Create categorization_rules table
CREATE TABLE categorization_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keyword TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE categorization_rules ENABLE ROW LEVEL SECURITY;

-- Create policy for categorization_rules
CREATE POLICY "Users can access default rules and their own rules"
  ON categorization_rules
  FOR ALL
  USING (is_default OR auth.uid() = user_id);
`;

module.exports = {
  schema,
  createTablesSql
}; 