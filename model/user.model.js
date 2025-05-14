const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // typo fixed (was: "require")
    unique: true,
    trim: true
  },
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "store"],
    default: "user"
  }
}, {
  timestamps: true // adds createdAt and updatedAt automatically
});

const User = mongoose.model("User", userSchema);
module.exports = User;
