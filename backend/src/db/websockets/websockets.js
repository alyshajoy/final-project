const WebSocket = require('ws');
const db = require('../connection'); // Assuming this is your PostgreSQL database connection module
// Create a WebSocket server
module.exports = (server) => {
  const wss = new WebSocket.Server({ server});

  // WebSocket server connection event
  wss.on('connection', ws => {
    console.log('Client connected');
    // Handle WebSocket messages
    ws.on('message', message => {
      console.log('Received:', message);
    });
  });

  // Listen for database changes
  const listenForDatabaseChanges = () => {
    // implement mechanism to listen for database changes
    // using PostgreSQL's LISTEN/NOTIFY mechanism or database triggers

    // When a database change event occurs, broadcast the change to WebSocket clients
    db.on('notification', (msg) => {
      if (msg.channel === 'badge_count_exceeded') {
          try {
              (async () => {
                const result = await db.query('SELECT * FROM badges WHERE id = $1', [msg.payload]);
              })();
              const badge = result.rows[0];
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
          } catch (error) {
              console.error('Error fetching badge:', error);
          }
      }
   });
  };

  // Start listening for database changes
  listenForDatabaseChanges();

  return wss;
}; // Export the WebSocket server for use in other modules if needed
