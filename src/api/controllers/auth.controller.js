// Will use the Supabase client for authentication
const { createClient } = require('@supabase/supabase-js');
const config = require('../../config/config');

// Initialize Supabase client
let supabase;

// Only create Supabase client if credentials are provided
if (config.supabase.url && config.supabase.key) {
  supabase = createClient(config.supabase.url, config.supabase.key);
} else {
  console.warn('Supabase credentials not provided. Auth functionality will not work.');
}

// Register a new user
exports.register = async (req, res) => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      return res.status(503).json({ 
        message: 'Authentication service is not configured',
        details: 'Please set up Supabase credentials in the .env file' 
      });
    }

    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Register user in Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(201).json({ 
      message: 'User registered successfully',
      user: data.user
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      return res.status(503).json({ 
        message: 'Authentication service is not configured',
        details: 'Please set up Supabase credentials in the .env file' 
      });
    }

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json({ 
      message: 'Login successful',
      user: data.user,
      session: data.session
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user profile - Using middleware for auth now
exports.getProfile = async (req, res) => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      return res.status(503).json({ 
        message: 'Authentication service is not configured',
        details: 'Please set up Supabase credentials in the .env file' 
      });
    }
    
    // req.user is set by the verifyToken middleware
    const user = req.user;
    
    return res.status(200).json({ 
      message: 'Profile retrieved successfully',
      user 
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 