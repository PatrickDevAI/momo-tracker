const { createClient } = require('@supabase/supabase-js');
const config = require('../../config/config');

// Initialize Supabase client
const supabase = createClient(config.supabase.url, config.supabase.key);

/**
 * Middleware to verify the authentication token
 * This handles tokens from both direct Supabase auth and Lovable frontend
 */
const verifyToken = async (req, res, next) => {
  try {
    // Get the token from the Authorization header or from cookies
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN format
    
    // No token provided
    if (!token) {
      return res.status(401).json({ 
        message: 'Authentication required',
        details: 'No authentication token provided'
      });
    }

    // Verify the token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error('Token validation error:', error.message);
      return res.status(401).json({ 
        message: 'Invalid or expired token',
        details: error.message
      });
    }

    // Add the user to the request object
    req.user = data.user;
    
    // Add the active token to the request for potential future use
    req.token = token;

    // Continue with the request
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ 
      message: 'Authentication error',
      details: error.message
    });
  }
};

/**
 * Middleware to check if user is admin
 * Use after verifyToken middleware
 */
const requireAdmin = async (req, res, next) => {
  try {
    // Must be used after verifyToken
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Get user profile to check admin status
    const { data, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', req.user.id)
      .single();
    
    if (error || !data) {
      return res.status(401).json({ message: 'Unable to verify user permissions' });
    }
    
    // Check if user is admin
    if (!data.is_admin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    // Continue with the request
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  verifyToken,
  requireAdmin
}; 