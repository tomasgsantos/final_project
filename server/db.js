const {Pool} = require('pg');


// Replace the placeholders with your PostgreSQL database information
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'copd_app',
  password: 'opli2746',
  port: 5432 // default port for PostgreSQL is 5432
});

module.exports = pool;

