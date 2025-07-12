const express = require('express');
const bookingController = require('../controllers/booking.controller');
const validateInput = require('../middleware/validateInput');
const { bookingValidation } = require('../validation/booking.validation');

const router = express.Router();

// Get all bookings
router.get('/', bookingController.getAllBookings);

// Get booking by ID
router.get('/:id', bookingController.getBookingById);

// Create new booking
router.post('/', validateInput(bookingValidation.createBooking), bookingController.createBooking);

// Update booking
router.put('/:id', validateInput(bookingValidation.updateBooking), bookingController.updateBooking);

// Delete booking
router.delete('/:id', bookingController.deleteBooking);

// Get bookings by user
router.get('/user/:userId', bookingController.getBookingsByUser);

// Get bookings by hotel
router.get('/hotel/:hotelId', bookingController.getBookingsByHotel);

// Cancel booking
router.post('/:id/cancel', bookingController.cancelBooking);

module.exports = router; 