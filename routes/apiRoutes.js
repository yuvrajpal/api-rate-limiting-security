require("dotenv").config();
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const jwt = require("jsonwebtoken");
const logger = require("../logger");

// Secret key for JWT (now stored in environment variables)
const JWT_SECRET = process.env.JWT_SECRET;

// Login route with validation and logging
router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Validation errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    // Authenticate user (this is just a placeholder)
    if (username === "user" && password === "password") {
      logger.info("User authenticated successfully");
      // Generate a JWT token
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
    } else {
      logger.warn("Invalid credentials attempt");
      res.status(401).json({ message: "Invalid credentials" });
    }
  }
);

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });
    req.user = user;
    next();
  });
};

// Apply authentication middleware to protected routes
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route" });
});

module.exports = router;
