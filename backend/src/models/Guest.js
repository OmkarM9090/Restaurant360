const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  guestCode: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  roomNumber: { type: String },
  checkIn: { type: Date },
  checkOut: { type: Date },
  preferences: { type: mongoose.Schema.Types.Mixed, default: {} },
  serviceRequestCount: { type: Number, default: 0 },
  feedbackCount: { type: Number, default: 0 },
  segment: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Guest', guestSchema);
