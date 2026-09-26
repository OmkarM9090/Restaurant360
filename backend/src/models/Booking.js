const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingCode: { type: String, required: true, unique: true, index: true },
  roomNumber: { type: String, required: true },
  guestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  status: { type: String, required: true, enum: ['confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show'] },
  adults: { type: Number, required: true },
  children: { type: Number, default: 0 },
  bookingSource: { type: String },
  roomRate: { type: Number, required: true },
  leadTimeDays: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
