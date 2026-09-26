const { sendError } = require('../utils/response');

const validateSimulate = (req, res, next) => {
  const { occupancy } = req.body;
  if (occupancy === undefined) return sendError(res, 400, 'BAD_REQUEST', 'occupancy is required');
  if (typeof occupancy !== 'number' || occupancy < 0.60 || occupancy > 1.00) {
    return sendError(res, 400, 'BAD_REQUEST', 'occupancy must be between 0.60 and 1.00');
  }
  next();
};

const validateForecast = (req, res, next) => {
  const days = parseInt(req.query.days, 10);
  if (isNaN(days) || days < 1 || days > 30) {
    return sendError(res, 400, 'BAD_REQUEST', 'days must be between 1 and 30');
  }
  next();
};

const validateApprovePlan = (req, res, next) => {
  const { decision } = req.body;
  const allowed = ['approved', 'rejected', 'modified'];
  if (!allowed.includes(decision)) {
    return sendError(res, 400, 'BAD_REQUEST', 'decision must be one of: ' + allowed.join(', '));
  }
  next();
};

const validateTasks = (req, res, next) => {
  const { status } = req.body;
  const allowed = ['todo', 'in_progress', 'completed', 'cancelled'];
  if (!allowed.includes(status)) {
    return sendError(res, 400, 'BAD_REQUEST', 'status must be one of: ' + allowed.join(', '));
  }
  next();
};

module.exports = { validateSimulate, validateForecast, validateApprovePlan, validateTasks };
