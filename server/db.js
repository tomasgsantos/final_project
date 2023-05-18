const { Pool } = require("pg");

// Replace the placeholders with your PostgreSQL database information
const pool = new Pool({
  user: "postgres",
  host: "copd-db-instance.cr6kvihylkhm.eu-north-1.rds.amazonaws.com",
  database: "copd_db",
  password: "copdproject",
  port: 5432, // default port for PostgreSQL is 5432
});

module.exports = pool;
