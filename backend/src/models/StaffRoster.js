const mongoose = require('mongoose');

const staffRosterSchema = new mongoose.Schema({
  staffCode: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  department: { type: String, required: true, enum: ['Housekeeping', 'Front Office', 'F&B', 'Engineering', 'Spa'], index: true },
  role: { type: String, required: true },
  skills: { type: [String], default: [] },
  crossTraining: { type: Map, of: Number, default: {} },
  shiftDate: { type: Date, required: true, index: true },
  shiftStart: { type: Date, required: true },
  shiftEnd: { type: Date, required: true },
  status: { type: String, default: 'scheduled' },
  overtimeHours: { type: Number, default: 0 },
  fatigueScore: { type: Number, default: 0 },
  hourlyCost: { type: Number, required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('StaffRoster', staffRosterSchema);
