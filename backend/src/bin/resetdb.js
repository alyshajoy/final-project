// load .env data into process.env
require('dotenv').config();

// other dependencies
const fs = require('fs');
const db = require('../db/connection');

// PG connection setup
// const connectionString = process.env.DATABASE_URL ||
//   `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
// const client = new Client();

// Loads the schema files from db/schema
const runSchemaFiles = async () => {
  console.log(`-> Loading Schema Files ...`);

  // List files in the order they should be executed
  const schemaFiles = [
    'users.sql',       // Ensure 'users' table is created first
    'tasks.sql',       // Then 'tasks' can reference 'users'
    'badges.sql',
    'user_badges.sql',
    'motivational_quotes.sql'
  ];

  // const schemaFilenames = fs.readdirSync('./src/db/schema');

  for (const fn of schemaFiles) {
    const sql = fs.readFileSync(`./src/db/schema/${fn}`, 'utf8');
    console.log(`\t-> Running ${fn}`);
    await db.query(sql);
  }
};

const runSeedFiles = async () => {

  console.log(`-> Loading Seeds ...`);

  const seedFiles = [
    'users.sql',       // Ensure 'users' seeds are executed first
    'badges.sql',      // Then 'badges'
    'motivational_quotes.sql', // Then 'motivational_quotes'
    'tasks.sql',       // Then 'tasks', which depends on 'users'
    'user_badges.sql'  // Lastly 'user_badges', if it depends on 'users' and 'badges'
  ];

  // const schemaFilenames = fs.readdirSync('./src/db/seeds');

  for (const fn of seedFiles) {
    const sql = fs.readFileSync(`./src/db/seeds/${fn}`, 'utf8');
    console.log(`\t-> Running ${fn}`);
    await db.query(sql);
  }
};

const runResetDB = async () => {

  try {
    process.env.DB_HOST &&
      console.log(`-> Connecting to PG on ${process.env.DB_HOST} as ${process.env.DB_USER}...`);

    await runSchemaFiles();
    await runSeedFiles();
    process.exit();
  } catch (err) {
    console.error(`Failed due to error: ${err}`);
    process.exit();
  }
};

runResetDB();