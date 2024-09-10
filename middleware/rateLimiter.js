const rateLimit = require("express-rate-limit");
const logger = require("../logger");

// Configure rate limiter to use in-memory store
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 10, // Limit each IP to 10 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  handler: (req, res, next) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).send("Too many requests, please try again later.");
  },
});

// Middleware to apply rate limiting
module.exports = apiLimiter;

/**
 * Rate Limiting Middleware
 *
 * This middleware uses the `express-rate-limit` package to implement rate limiting
 * for the API endpoints. The rate limiting is based on the Sliding Window algorithm.
 *
 * **Algorithm**: Sliding Window
 * - Requests are counted within a defined time window (1 minute).
 * - If the number of requests exceeds the limit (10 requests per 1 minute), further
 *   requests are blocked until the window resets.
 *
 * **Configuration**:
 * - `windowMs`: Time window in milliseconds (1 minute).
 * - `max`: Maximum number of requests allowed per window.
 * - `message`: Error message returned when rate limit is exceeded.
 */
