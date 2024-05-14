const WebSocket = require('ws');
const { Client } = require('pg');
const db = require('../connection'); // Assuming this is your PostgreSQL database connection module
// Create a WebSocket server
module.exports = (server) => {
  const wss = new WebSocket.Server({ server});

  // PostgreSQL client for listening to notifications
  const pgClient = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

  pgClient.connect()
    .then(() => {
      console.log('Connected to database');
      pgClient.query('LISTEN badge');
    })
    .catch(err => console.error('Error connecting to pgClient', err));

  // Listen for database changes
  const listenForDatabaseChanges = () => {
    console.log("listening for database changes")
    pgClient.on('notification', async (msg) => {
      console.log("db msg", msg)
      console.log("notification received 1 prior to if statement")
      if (msg.channel === 'badge') {
        console.log("notification received 2")
        try {
          const badgeId = parseInt(msg.payload);
          const result = await pgClient.query('SELECT * FROM badges WHERE id = $1', [badgeId]);
          const badge = result.rows[0];
          console.log("badge",badge)
          if (badge) {
            const payload = {
              type: 'badge-earned',
              badge: {
                imageUrl: badge.image_url,
                title: badge.name,
                description: badge.description
              }
            };
            // Send badge data to frontend
            wss.clients.forEach(client => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(payload));
              }
            });
          }
        } catch (error) {
          console.error('Error fetching badge:', error);
        }
      }
    });
  };
  listenForDatabaseChanges();
  // WebSocket server connection event
  wss.on('connection', ws => {
    console.log('Client connected');
    // Handle WebSocket messages
  });

  return wss;
}; // Export the WebSocket server for use in other modules if needed
