const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const config = require('./config/config');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./api/routes/auth.routes');

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to MoMo Tracker API',
    environment: config.nodeEnv 
  });
});

// Set port and start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${config.nodeEnv} mode`);
}); 