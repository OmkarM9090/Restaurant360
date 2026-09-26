// Deterministic fallback repository matching PRD contracts
class DemoRepository {
  getDashboard() {
    return {
      occupancy: 0.85,
      goppar: 120,
      burnout: 0.4,
      service_score: 4.5,
      alerts: []
    };
  }
  getForecast(days) {
    return [{ date: new Date().toISOString(), occupancy: 0.9, labor_hours: 300 }];
  }
  simulate(occupancy) {
    return { goppar: 95, hk_delay_hours: 2, burnout_risk: 0.7, wait_time: 15 };
  }
  safeEnvelope() {
    return { max_safe_occupancy: 0.88, bottleneck_dept: "Housekeeping", resource_gap: 2 };
  }
  parseReview() {
    return { aspect: "Comfort", polarity: "negative", confidence: 0.8, shap_words: ["rattling", "leaking"], ticket_id: null };
  }
  decisionCouncil() {
    return {
      agents: [
        { name: "Revenue", summary: "Looks good" },
        { name: "Operations", summary: "Need staff" }
      ],
      chief_plan: {
        situation: "High occupancy", evidence: [], options: [], recommended_action: "Call in temp staff", confidence: 0.9, requires_approval: true
      }
    };
  }
  generatePlan() {
    return { actions: [] };
  }
  approvePlan(decision) {
    return { status: decision, updated_roster_count: 1 };
  }
  schedule() {
    return { roster: [], labor_cost_cut_pct: 5 };
  }
  tasks(status) {
    return { status: status, resolution_time_mins: 30 };
  }
  getNotifications() {
    return [];
  }
}

module.exports = new DemoRepository();
