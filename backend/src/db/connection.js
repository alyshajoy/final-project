const { Pool } = require('pg');

// Database connection parameters
const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const db = new Pool(dbParams);

db.connect(err => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log(`Connected to database on ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
  }
});

module.exports = db;