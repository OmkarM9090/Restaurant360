const demoRepo = require('../repositories/demoRepository');

// In future, this service will decide to use MongoRepository or ML APIs instead of demoRepo if DB_REQUIRED is true.
class ApiService {
  getMeta() {
    return { source: 'demo', is_fallback: true };
  }

  getDashboard() {
    return { data: demoRepo.getDashboard(), meta: this.getMeta() };
  }
  getForecast(days) {
    return { data: demoRepo.getForecast(days), meta: this.getMeta() };
  }
  simulate(occupancy) {
    return { data: demoRepo.simulate(occupancy), meta: this.getMeta() };
  }
  safeEnvelope() {
    return { data: demoRepo.safeEnvelope(), meta: this.getMeta() };
  }
  parseReview() {
    return { data: demoRepo.parseReview(), meta: this.getMeta() };
  }
  decisionCouncil() {
    return { data: demoRepo.decisionCouncil(), meta: this.getMeta() };
  }
  generatePlan() {
    return { data: demoRepo.generatePlan(), meta: this.getMeta() };
  }
  approvePlan(decision) {
    return { data: demoRepo.approvePlan(decision), meta: this.getMeta() };
  }
  schedule() {
    return { data: demoRepo.schedule(), meta: this.getMeta() };
  }
  tasks(status) {
    return { data: demoRepo.tasks(status), meta: this.getMeta() };
  }
  getNotifications() {
    return { data: demoRepo.getNotifications(), meta: this.getMeta() };
  }
}

module.exports = new ApiService();
