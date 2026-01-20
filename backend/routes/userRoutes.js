// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();

const { registerUser,
     loginUser,
     getFavorites,
     getUserProfile,
     addToFavorites,
    removeFromFavorites,
      } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// ============ Public Routes ============
router.post('/register', registerUser);
router.post('/login', loginUser);

// ============ Protected Route ============
router.get('/profile',authMiddleware, getUserProfile);


// Add to favorites
router.post('/favorites/:roomId',authMiddleware, addToFavorites);
// Remove from favorites
router.delete('/favorites/:roomId',authMiddleware, removeFromFavorites);
// Get all favorites
router.get('/favorites',authMiddleware, getFavorites);


module.exports = router;
