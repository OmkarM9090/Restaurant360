const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');
const { sendError } = require('../utils/response');

router.use('/api/v1', apiRoutes);

router.use('*', (req, res) => {
  sendError(res, 404, 'NOT_FOUND', 'Route not found');
});

module.exports = router;
