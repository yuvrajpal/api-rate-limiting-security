const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const jwt = require("jsonwebtoken");
const logger = require("../logger");

// Secret key for JWT (should be stored in environment variables in real apps)
const JWT_SECRET = "your_jwt_secret";

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
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Apply authentication middleware to protected routes
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route" });
});

module.exports = router;
