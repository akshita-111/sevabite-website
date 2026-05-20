const express = require("express");
const pool = require("../models/db");

const router = express.Router();

// GET test route
router.get("/", (req, res) => {
  res.json({ message: "Contacts API is ready for POST requests" });
});

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || name.length < 2) {
    return res.status(400).json({ message: "Name must be at least 2 characters." });
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: "Please provide a valid email." });
  }
  if (!message || message.trim().length < 8) {
    return res.status(400).json({ message: "Message must be at least 8 characters." });
  }

  try {
    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    const [result] = await pool.execute(sql, [name.trim(), email.trim(), message.trim()]);
    return res.status(201).json({
      message: "Message sent successfully. Our team will contact you soon!",
      contactId: result.insertId
    });
  } catch (error) {
    console.error("Contact insert error:", error.message);
    return res.status(500).json({ message: "Server error while submitting message." });
  }
});

module.exports = router;
