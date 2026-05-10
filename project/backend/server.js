require("dotenv").config();
const express = require("express");
const cors = require("cors");
const donationsRoute = require("./routes/donations");
const contactsRoute = require("./routes/contacts");
const pool = require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get("/api/health", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 as connected");
    return res.json({ 
      status: "ok", 
      message: "Backend is healthy",
      database: rows[0].connected === 1 ? "connected" : "error"
    });
  } catch (error) {
    console.error("Health check failed:", error.message);
    return res.status(500).json({ 
      status: "error", 
      message: "Database connection failed",
      error: error.message 
    });
  }
});

// API Routes
app.use("/api/donations", donationsRoute);
app.use("/api/contacts", contactsRoute);

// Error handling for unknown routes
app.use((req, res) => {
  console.warn(`[404] Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("[Global Error]", err);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\x1b[32m✔ Server running at http://localhost:${PORT}\x1b[0m`);
    console.log(`\x1b[36mℹ Health check: http://localhost:${PORT}/api/health\x1b[0m`);
  });
}

module.exports = app;
