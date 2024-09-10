// logger.js
const winston = require("winston");

// Create a logger instance
const logger = winston.createLogger({
  level: "info", // Set the default logging level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

module.exports = logger;
