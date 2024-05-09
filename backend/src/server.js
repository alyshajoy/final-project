// Environment variables
require('dotenv').config({ path: '../../.env'});


// Modules
const express = require('express');
const app = express(); // Initialize Express
const db = require('./db/connection');
const cors = require('cors');
// const WebSocket = require('ws');
// const http = require('http');

// // Import WebSocket server integration
// const WebSocketServer = require('./websockets/websocket');

// Require/import Feature Routes
const tasksRoutes = require('./routes/tasks');
const timerRoutes = require('./routes/timer');
const calendarRoutes = require('./routes/calendar');
const badgesRoutes = require('./routes/badges');
const userRoutes = require('./routes/user');

// Create an HTTP server from the Express application
// const server = http.createServer(app);

// WebSocket server setup (mount onto HTTP server)
// WebSocketServer(server);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors());  // Enable CORS for all routes


// Define endpoints
app.use('/api/tasks', tasksRoutes);
app.use('/api/timer', timerRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/badges', badgesRoutes);
app.use('/user', userRoutes);

// Index Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

