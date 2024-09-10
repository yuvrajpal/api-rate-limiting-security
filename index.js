const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const apiRoutes = require("./routes/apiRoutes");
const apiLimiter = require("./middleware/rateLimiter");

app.use(express.json());
app.use("/api", apiLimiter); // Apply rate limiting to all /api routes
app.use("/api", apiRoutes); // Prefix all routes with /api

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
