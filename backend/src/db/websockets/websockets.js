// const WebSocket = require('ws');
// const db = require('./db/connection'); // Assuming this is your PostgreSQL database connection module

// // Create a WebSocket server
// const wss = new WebSocket.Server({ port: 8080 });

// // WebSocket server connection event
// wss.on('connection', ws => {
//   console.log('Client connected');

//   // Handle WebSocket messages
//   ws.on('message', message => {
//     console.log('Received:', message);
//   });
// });

// // Listen for database changes
// const listenForDatabaseChanges = () => {
//   // Assuming you have implemented a mechanism to listen for database changes
//   // For example, using PostgreSQL's LISTEN/NOTIFY mechanism or database triggers

//   // When a database change event occurs, broadcast the change to WebSocket clients
//   db.on('notification', (msg) => {
//     wss.clients.forEach(client => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify(msg));
//       }
//     });
//   });
// };

// // Start listening for database changes
// listenForDatabaseChanges();

// module.exports = wss; // Export the WebSocket server for use in other modules if needed
