// routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// CREATE - Add a new booking
router.post('/', async (req, res) => {
  try {
    const { userName, seatNumber } = req.body;
    const newBooking = new Booking({ userName, seatNumber });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ - Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Find a specific booking by seat number
router.get('/:seatNumber', async (req, res) => {
  try {
    const booking = await Booking.findOne({ seatNumber: req.params.seatNumber });
    if (!booking) return res.status(404).json({ message: 'Seat not booked' });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Edit a booking
router.put('/:seatNumber', async (req, res) => {
  try {
    const updatedBooking = await Booking.findOneAndUpdate(
      { seatNumber: req.params.seatNumber },
      { userName: req.body.userName },
      { new: true }
    );
    if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Remove a booking
router.delete('/:seatNumber', async (req, res) => {
  try {
    const deletedBooking = await Booking.findOneAndDelete({ seatNumber: req.params.seatNumber });
    if (!deletedBooking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
