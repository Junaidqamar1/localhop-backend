const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET ; // Store this securely!

exports.generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" }); // Valid for 7 days
};

exports.verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

