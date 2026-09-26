const apiService = require('../services/apiService');
const { sendSuccess } = require('../utils/response');

exports.getDashboard = (req, res) => {
  const result = apiService.getDashboard();
  sendSuccess(res, result.data, result.meta);
};

exports.getForecast = (req, res) => {
  const days = req.query.days || 7;
  const result = apiService.getForecast(days);
  sendSuccess(res, result.data, result.meta);
};

exports.simulate = (req, res) => {
  const result = apiService.simulate(req.body.occupancy);
  sendSuccess(res, result.data, result.meta);
};

exports.safeEnvelope = (req, res) => {
  const result = apiService.safeEnvelope();
  sendSuccess(res, result.data, result.meta);
};

exports.parseReview = (req, res) => {
  const result = apiService.parseReview();
  sendSuccess(res, result.data, result.meta);
};

exports.decisionCouncil = (req, res) => {
  const result = apiService.decisionCouncil();
  sendSuccess(res, result.data, result.meta);
};

exports.generatePlan = (req, res) => {
  const result = apiService.generatePlan();
  sendSuccess(res, result.data, result.meta);
};

exports.approvePlan = (req, res) => {
  const result = apiService.approvePlan(req.body.decision);
  sendSuccess(res, result.data, result.meta);
};

exports.schedule = (req, res) => {
  const result = apiService.schedule();
  sendSuccess(res, result.data, result.meta);
};

exports.tasks = (req, res) => {
  const result = apiService.tasks(req.body.status);
  sendSuccess(res, result.data, result.meta);
};

exports.getNotifications = (req, res) => {
  const result = apiService.getNotifications();
  sendSuccess(res, result.data, result.meta);
};
