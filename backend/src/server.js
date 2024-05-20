// Environment variables
require('dotenv').config({ path: '../.env'});
// Modules
const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express(); // Initialize Express
console.log('Express initialized...');
const initWebSocketServer = require('./db/websockets/websockets');
// Require/import Feature Routes
const tasksRoutes = require('./routes/tasks');
const timerRoutes = require('./routes/timer');
const calendarRoutes = require('./routes/calendar');
const badgesRoutes = require('./routes/badges');
const userRoutes = require('./routes/user');

// Create an HTTP server from the Express application
const server = http.createServer(app);
console.log('HTTP server mounted and intialized...');
// Import and initialize WebSocket server with the HTTP server
initWebSocketServer(server);
console.log('WebSocket server mounted...');
// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add all methods used by your frontend
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));  // Enable CORS for all routes


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
server.listen(port, () => { //was app in place of server
    console.log(`Server running on port ${port}`);
});
