const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register user => /api/register
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password
    });

    sendToken(user, 201, res);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Login user => /api/login
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Checks if email and password are submitted by user
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter email & password' });
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid Email or Password' });
    }

    // Checks if password is correct
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({ success: false, message: 'Invalid Email or Password' });
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create and send token and save in cookie
const sendToken = (user, statusCode, res) => {
  // Create Jwt token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME
  });

  res.status(statusCode).json({
    success: true,
    token,
    user
  });
};
