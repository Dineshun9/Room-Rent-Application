// backend/controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// =============================
// Register User
// =============================
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("❌ Register Error:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// =============================
// Login User
// =============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
   
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// =============================
// Get User Profile
// =============================
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error("❌ Get Profile Error:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// =============================
// Favorites Handlers
// =============================
const addToFavorites = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    if (!roomId) return res.status(400).json({ message: 'Room ID is required' });

    if (req.user.favorites.includes(roomId)) {
      return res.status(400).json({ message: 'Room already in favorites' });
    }

    req.user.favorites.push(roomId);
    await req.user.save();

    res.json({ message: 'Room added to favorites', favorites: req.user.favorites });
  } catch (error) {
    console.error("❌ Add Favorites Error:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    req.user.favorites = req.user.favorites.filter(id => id.toString() !== roomId);
    await req.user.save();
    res.json({ message: 'Room removed from favorites', favorites: req.user.favorites });
  } catch (error) {
    console.error("❌ Remove Favorites Error:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const user = await req.user.populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    console.error("❌ Get Favorites Error:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Export correctly as a single object
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
};
