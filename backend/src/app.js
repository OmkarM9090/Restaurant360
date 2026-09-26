const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const { sendError } = require('./utils/response');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    success: true,
    service: "smart-resort-backend",
    status: "healthy"
  });
});

app.get('/health/db', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  if (isConnected) {
    res.json({
      success: true,
      database: "connected"
    });
  } else {
    res.status(500).json({
      success: false,
      database: "disconnected"
    });
  }
});

// Mount APIs
app.use(routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  sendError(res, 500, 'INTERNAL_ERROR', 'Internal server error');
});

module.exports = app;
