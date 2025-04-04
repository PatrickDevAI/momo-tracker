const { createClient } = require('@supabase/supabase-js');
const config = require('../../config/config');

// Initialize Supabase client
const supabase = createClient(config.supabase.url, config.supabase.key);

/**
 * Middleware to verify the authentication token
 */
const verifyToken = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Add the user to the request object
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  verifyToken
}; 