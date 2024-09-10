const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const logger = require("../logger");

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
      res.json({ token: "dummy-jwt-token" });
    } else {
      logger.warn("Invalid credentials attempt");
      res.status(401).json({ message: "Invalid credentials" });
    }
  }
);

router.get("/data", (req, res) => {
  logger.info("Data route accessed");
  res.json({ message: "This is a protected route" });
});

module.exports = router;
