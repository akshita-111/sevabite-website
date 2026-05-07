require("dotenv").config();
const express = require("express");
const cors = require("cors");
const donationsRoute = require("./routes/donations");
const contactsRoute = require("./routes/contacts");
const pool = require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    return res.json({ status: "ok", db: "connected" });
  } catch (_error) {
    return res.status(500).json({ status: "error", db: "disconnected" });
  }
});

app.use("/api/donations", donationsRoute);
app.use("/api/contacts", contactsRoute);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
