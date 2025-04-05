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

    // Create an entry in the profiles table for the new user
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          email: data.user.email,
          name: name || data.user.email.split('@')[0],
          created_at: new Date(),
          updated_at: new Date()
        });

      if (profileError) {
        console.error('Error creating profile:', profileError);
        // We don't return here because signup technically worked
      }
    }

    return res.status(201).json({ 
      message: 'User registered successfully',
      user: data.user
    });
  } catch (error) {
    console.error('Register error:', error);
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

    // Update last login time in the profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          last_login: new Date(),
          updated_at: new Date()
        })
        .eq('id', data.user.id);

      if (profileError) {
        console.error('Error updating login time:', profileError);
        // Non-critical error, don't stop the login process
      }
    }

    return res.status(200).json({ 
      message: 'Login successful',
      user: data.user,
      session: data.session
    });
  } catch (error) {
    console.error('Login error:', error);
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
    const userId = req.user.id;
    
    // Get the full profile data from the profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (profileError) {
      return res.status(404).json({ 
        message: 'Profile not found', 
        details: profileError.message 
      });
    }
    
    return res.status(200).json({ 
      message: 'Profile retrieved successfully',
      profile
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Log out a user
exports.logout = async (req, res) => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      return res.status(503).json({ 
        message: 'Authentication service is not configured',
        details: 'Please set up Supabase credentials in the .env file' 
      });
    }

    // We need a token to log out
    if (!req.token) {
      return res.status(400).json({ message: 'No session token provided' });
    }

    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      return res.status(503).json({ 
        message: 'Authentication service is not configured',
        details: 'Please set up Supabase credentials in the .env file' 
      });
    }
    
    // req.user is set by the verifyToken middleware
    const userId = req.user.id;
    
    // Get updatable fields from request body
    const { name, avatar_url, preferences } = req.body;
    
    // Build update object with only provided fields
    const updates = {
      updated_at: new Date()
    };
    
    if (name !== undefined) updates.name = name;
    if (avatar_url !== undefined) updates.avatar_url = avatar_url;
    if (preferences !== undefined) updates.preferences = preferences;
    
    // Update the profile
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
      
    if (error) {
      return res.status(400).json({ 
        message: 'Failed to update profile', 
        details: error.message 
      });
    }
    
    return res.status(200).json({ 
      message: 'Profile updated successfully',
      profile: data
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 