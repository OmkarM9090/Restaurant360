const mongoose = require('mongoose');

const actionCardSchema = new mongoose.Schema({
  actionCode: { type: String, required: true, unique: true, index: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  situation: { type: String, required: true },
  evidence: { type: [String], default: [] },
  predictedImpacts: { type: [String], default: [] },
  options: [{
    description: String,
    pros: [String],
    cons: [String]
  }],
  tradeOffs: { type: String },
  recommendedAction: { type: String, required: true },
  expectedImpact: { type: String },
  confidence: { type: Number },
  requiresApproval: { type: Boolean, default: false },
  riskLevel: { type: String, required: true, enum: ['low', 'medium', 'high'] },
  status: { type: String, required: true, enum: ['pending', 'approved', 'rejected', 'modified', 'executed'], index: true },
  rollbackPlan: { type: String },
  approvedAt: { type: Date },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('ActionCard', actionCardSchema);
