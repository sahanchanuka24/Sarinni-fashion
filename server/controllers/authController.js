const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register user => /api/register
exports.registerUser = async (req, res) => {
  console.log('Register request received:', req.body);
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ email });
    console.log('Existing user check completed:', existingUser);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    console.log('Creating new user...');
    const user = await User.create({ name, email, password });
    console.log('User created:', user._id);
    sendToken(user, 201, res);
  } catch (error) {
    console.log('Error in register:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Login user => /api/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter email & password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid Email or Password' });
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({ success: false, message: 'Invalid Email or Password' });
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get current user profile => /api/me
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update user profile => /api/me/update
exports.updateProfile = async (req, res) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create and send JWT token
const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME || '7d'
  });

  // Return user without password
  const userObj = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  };

  res.status(statusCode).json({ success: true, token, user: userObj });
};
