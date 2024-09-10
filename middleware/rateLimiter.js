const rateLimit = require("express-rate-limit");

// Create a rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  // Optionally, you can add a keyGenerator to use a custom key for rate limiting
  // keyGenerator: (req) => req.ip,
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
 * - Requests are counted within a defined time window (15 minutes).
 * - If the number of requests exceeds the limit (100 requests per 15 minutes), further
 *   requests are blocked until the window resets.
 *
 * **Configuration**:
 * - `windowMs`: Time window in milliseconds (15 minutes).
 * - `max`: Maximum number of requests allowed per window.
 * - `message`: Error message returned when rate limit is exceeded.
 */
