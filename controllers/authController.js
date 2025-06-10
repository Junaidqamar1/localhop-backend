const bcrypt = require("bcryptjs");
const User = require("../model/user.model");
const { generateToken } = require("../utils/jwt");

// Register
exports.register = async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;

    // Check if username or email already exists
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) return res.status(409).json({ message: "User already exists." });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = new User({ username, fullname, email, password: hashedPassword });
    await newUser.save();

    // Return JWT token
    const token = generateToken({ id: newUser._id, role: newUser.role });
    res.status(201).json({ message: "Registered successfully", token });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};
// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = generateToken({ id: user._id, role: user.role });

    
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "lax", // Prevent CSRF
      secure: process.env.NODE_ENV === "production", // Send over HTTPS only in production
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

const jwt = require('jsonwebtoken');

exports.checkAuth = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

