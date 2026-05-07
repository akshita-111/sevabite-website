const oracledb = require("oracledb");

// Create a pool once; handlers will reuse it.
// Uses Oracle "thin" driver (no Oracle client libraries required in most setups).
const poolPromise = oracledb.createPool({
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: process.env.ORACLE_DSN,
  poolMin: 0,
  poolMax: 10,
  poolIncrement: 1
});

module.exports = poolPromise;
