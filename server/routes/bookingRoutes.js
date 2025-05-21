const express = require('express');
const router = express.Router();
const { 
  createBooking, 
  getMyBookings, 
  getBookingById, 
  cancelBooking 
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// Protected routes
router.route('/')
  .post(protect, createBooking);

router.route('/mybookings')
  .get(protect, getMyBookings);

router.route('/:id')
  .get(protect, getBookingById);

router.route('/:id/cancel')
  .put(protect, cancelBooking);

module.exports = router;