const express = require("express");
const router = express.Router();

// Example route
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Authenticate user (this is just a placeholder)
  if (username === "user" && password === "password") {
    res.json({ token: "dummy-jwt-token" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

router.get("/data", (req, res) => {
  res.json({ message: "This is a protected route" });
});

module.exports = router;
