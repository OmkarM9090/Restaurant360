const mongoose = require('mongoose');

const operationalTicketSchema = new mongoose.Schema({
  ticketCode: { type: String, required: true, unique: true, index: true },
  source: { type: String, required: true, enum: ['review', 'manual', 'system_alert'] },
  roomNumber: { type: String },
  guestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest' },
  department: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, required: true, enum: ['low', 'medium', 'high', 'critical'] },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, required: true, enum: ['todo', 'in_progress', 'completed', 'cancelled'], index: true },
  sentiment: { type: String },
  aspect: { type: String },
  slaMinutes: { type: Number, required: true },
  startedAt: { type: Date },
  completedAt: { type: Date },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'StaffRoster' }
}, { timestamps: true });

module.exports = mongoose.model('OperationalTicket', operationalTicketSchema);
