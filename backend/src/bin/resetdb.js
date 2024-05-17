// load .env data into process.env
require('dotenv').config({ path: '../.env'});

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
    'motivational_quotes.sql',
    'calendar_events.sql',
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
    'users.sql',
    'badges.sql',
    'motivational_quotes.sql',
    'tasks.sql',
    'user_badges.sql',
    'calendar_events.sql'
  ];

  // const schemaFilenames = fs.readdirSync('./src/db/seeds');

  for (const fn of seedFiles) {
    const sql = fs.readFileSync(`./src/db/seeds/${fn}`, 'utf8');
    console.log(`\t-> Running ${fn}`);
    await db.query(sql);
  }
};
const runTriggerFiles = async () => {
  console.log(`-> Loading Trigger Files ...`);

  // List files in the order they should be executed
  const triggerFiles = [
    'badgeTriggers.sql'
    // Add more trigger files here if needed
  ];

  for (const fn of triggerFiles) {
    const sql = fs.readFileSync(`./src/db/triggers/${fn}`, 'utf8');
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
    await runTriggerFiles();
    process.exit();
  } catch (err) {
    console.error(`Failed due to error: ${err}`);
    process.exit();
  }
};

runResetDB();