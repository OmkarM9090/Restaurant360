const express = require('express');
const router = express.Router();
const controller = require('../controllers/apiController');
const roleGate = require('../middleware/roleGate');
const { validateSimulate, validateForecast, validateApprovePlan, validateTasks } = require('../validators');

// Endpoints mapping
router.get('/dashboard', roleGate(['gm', 'revenue_manager', 'facilities_lead']), controller.getDashboard);
router.get('/forecast', roleGate(['gm', 'revenue_manager']), validateForecast, controller.getForecast);
router.post('/simulate', validateSimulate, controller.simulate);
router.post('/safe-envelope', controller.safeEnvelope);
router.post('/parse-review', controller.parseReview);
router.post('/decision-council', controller.decisionCouncil);
router.post('/generate-plan', controller.generatePlan);
router.post('/approve-plan', roleGate(['gm', 'facilities_lead']), validateApprovePlan, controller.approvePlan);
router.post('/schedule', roleGate(['gm', 'facilities_lead', 'revenue_manager']), controller.schedule);
router.post('/tasks', roleGate(['gm', 'facilities_lead', 'staff']), validateTasks, controller.tasks);
router.get('/notifications', roleGate(['gm']), controller.getNotifications);

module.exports = router;
