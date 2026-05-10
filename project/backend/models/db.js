const mysql = require("mysql2/promise");

console.log(`\x1b[33mℹ Connecting to database: ${process.env.DB_NAME} on ${process.env.DB_HOST}:${process.env.DB_PORT || 3306}\x1b[0m`);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

module.exports = pool;
