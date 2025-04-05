const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Public routes
// Register a new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Protected routes (require authentication)
// Get user profile
router.get('/profile', verifyToken, authController.getProfile);

// Update user profile
router.put('/profile', verifyToken, authController.updateProfile);

// Logout user
router.post('/logout', verifyToken, authController.logout);

module.exports = router; 