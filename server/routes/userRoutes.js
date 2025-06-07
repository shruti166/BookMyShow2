const express = require("express");
const User = require("../models/UserModel");
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMiddleware = require("../middlewares/authMiddleware");

// Input validation middleware
const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({
      success: false,
      message: "Invalid input types"
    });
  }

  next();
};

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword
    });

    await newUser.save();
    
    return res.status(201).json({
      success: true,
      message: "User Registered Successfully"
    });
   
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: err.message
    });
  }
});

router.post("/login", validateLoginInput, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        role: user.role
      },
      'your-secret-key', // TODO: Move to environment variable
      { expiresIn: '24h' }
    );

    // Send response
    return res.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: err.message
    });
  }
});


router.get("/get-valid-user", authMiddleware, async (req, res) => {
  try {
    console.log('Get valid user - Request user object:', req.user);
    
    if (!req.user || !req.user.userId) {
      console.error('Get valid user - No user ID in request');
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const validUser = await User.findById(req.user.userId).select("-password");
    console.log('Get valid user - Found user:', validUser);

    if (!validUser) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    return res.json({
      success: true,
      message: "User validated successfully",
      data: validUser
    });
  } catch (err) {
    console.error('Get valid user error:', err);
    return res.status(500).json({ 
      success: false, 
      message: "Server Error", 
      error: err.message 
    });
  }
});

router.put("/update-role", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.user;
    const { role } = req.body;

    if (!role || !['admin', 'user', 'partner'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be one of: admin, user, partner"
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.json({
      success: true,
      message: "Role updated successfully",
      data: updatedUser
    });

  } catch (err) {
    console.error('Update role error:', err);
    return res.status(500).json({
      success: false,
      message: "Failed to update role",
      error: err.message
    });
  }
});

module.exports = router;
