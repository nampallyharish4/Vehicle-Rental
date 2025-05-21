const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    const {
      vehicleId,
      startDate,
      endDate,
      totalPrice,
      paymentMethod
    } = req.body;
    
    // Check if the vehicle exists
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    
    // Check if the vehicle is available
    if (!vehicle.available) {
      return res.status(400).json({ message: 'Vehicle is not available for booking' });
    }
    
    // Check if there are overlapping bookings
    const overlappingBookings = await Booking.find({
      vehicle: vehicleId,
      status: { $in: ['confirmed', 'active'] },
      $or: [
        { startDate: { $lte: new Date(endDate) }, endDate: { $gte: new Date(startDate) } }
      ]
    });
    
    if (overlappingBookings.length > 0) {
      return res.status(400).json({ 
        message: 'Vehicle is already booked for the selected dates' 
      });
    }
    
    // Create new booking
    const booking = new Booking({
      user: req.user._id,
      vehicle: vehicleId,
      startDate,
      endDate,
      totalPrice,
      paymentMethod,
      status: 'confirmed'
    });
    
    const createdBooking = await booking.save();
    
    // Update vehicle availability
    vehicle.available = false;
    await vehicle.save();
    
    res.status(201).json(createdBooking);
  } catch (error) {
    console.error('Error in createBooking: ', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('vehicle')
      .sort('-createdAt');
    
    res.json(bookings);
  } catch (error) {
    console.error('Error in getMyBookings: ', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email')
      .populate('vehicle');
    
    // Check if booking exists
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if the booking belongs to the logged in user or admin
    if (booking.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    res.json(booking);
  } catch (error) {
    console.error('Error in getBookingById: ', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    // Check if booking exists
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if the booking belongs to the logged in user or admin
    if (booking.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Check if booking can be cancelled (not active or completed)
    if (booking.status === 'active' || booking.status === 'completed') {
      return res.status(400).json({ 
        message: 'Cannot cancel an active or completed booking' 
      });
    }
    
    booking.status = 'cancelled';
    const updatedBooking = await booking.save();
    
    // Make the vehicle available again
    await Vehicle.findByIdAndUpdate(booking.vehicle, { available: true });
    
    res.json(updatedBooking);
  } catch (error) {
    console.error('Error in cancelBooking: ', error);
    res.status(500).json({ message: 'Server error' });
  }
};