require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/db');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: { origin: '*' }
});

// connect DB
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/crossbridge');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// attach io to req so routes can emit
app.use((req, res, next) => { req.io = io; next(); });

// routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/bridges', require('./src/routes/bridges'));
app.use('/api/messages', require('./src/routes/messages'));

// webhooks
app.use('/webhook/telegram', require('./src/webhooks/telegram'));
app.use('/webhook/whatsapp', require('./src/webhooks/whatsapp'));

// simple socket auth (for dev)
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on('join', (room) => {
    socket.join(room);
  });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
