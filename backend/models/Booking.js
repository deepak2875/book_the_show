// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  seatNumber: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
