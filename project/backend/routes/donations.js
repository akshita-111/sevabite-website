const express = require("express");
const pool = require("../models/db");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, amount, message } = req.body;

  if (!name || name.length < 2) {
    return res.status(400).json({ message: "Name must be at least 2 characters." });
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: "Please provide a valid email." });
  }

  const donationAmount = Number(amount);
  if (!donationAmount || donationAmount <= 0) {
    return res.status(400).json({ message: "Amount must be greater than zero." });
  }

  try {
    const sql = "INSERT INTO donations (name, email, amount, message) VALUES (?, ?, ?, ?)";
    const [result] = await pool.execute(sql, [
      name.trim(),
      email.trim(),
      donationAmount,
      (message || "").trim()
    ]);
    return res.status(201).json({
      message: "Donation submitted successfully. Thank you for your support!",
      donationId: result.insertId
    });
  } catch (error) {
    console.error("Donation insert error:", error.message);
    return res.status(500).json({ message: "Server error while submitting donation." });
  }
});

module.exports = router;
