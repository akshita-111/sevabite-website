require("dotenv").config();
const pool = require("./models/db");

async function initDB() {
  try {
    console.log("Starting database initialization...");

    // Create donations table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS donations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(190) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        message TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✔ Donations table checked/created");

    // Create contacts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(190) NOT NULL,
        message TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✔ Contacts table checked/created");

    console.log("Database initialization completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Database initialization failed:", error.message);
    process.exit(1);
  }
}

initDB();
