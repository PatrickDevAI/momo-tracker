const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  // Server configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Supabase configuration
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },

  // File upload configuration
  upload: {
    tempDir: process.env.TEMP_UPLOAD_DIR || './temp',
    maxSize: process.env.MAX_FILE_SIZE || 10 * 1024 * 1024, // 10MB
    allowedTypes: ['text/csv'],
  }
}; 