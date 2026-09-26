const { sendError } = require('../utils/response');

const roleGate = (allowedRoles) => {
  return (req, res, next) => {
    const role = req.query.role || req.headers['x-user-role'];
    if (!role) {
      return sendError(res, 403, 'UNAUTHORIZED', 'Role is required');
    }
    if (!allowedRoles.includes(role)) {
      return sendError(res, 403, 'FORBIDDEN', `Role ${role} is not permitted to access this resource.`);
    }
    next();
  };
};

module.exports = roleGate;
