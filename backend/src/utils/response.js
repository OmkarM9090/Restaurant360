const sendSuccess = (res, data, meta = {}) => {
  res.json({
    success: true,
    data,
    meta: { ...meta, timestamp: new Date().toISOString() }
  });
};

const sendError = (res, statusCode, code, message) => {
  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message
    },
    meta: { timestamp: new Date().toISOString() }
  });
};

module.exports = { sendSuccess, sendError };
