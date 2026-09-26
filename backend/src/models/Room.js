const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true, index: true },
  roomType: { type: String, required: true },
  floor: { type: Number, required: true },
  status: { type: String, required: true, enum: ['available', 'occupied', 'cleaning', 'maintenance', 'out_of_order'], index: true },
  currentGuestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest', default: null },
  housekeepingStatus: { type: String, required: true, enum: ['ready', 'dirty', 'cleaning', 'inspection', 'ready_for_checkin'] },
  maintenanceStatus: { type: String, default: 'ok' },
  baseRate: { type: Number, required: true },
  currentRate: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
