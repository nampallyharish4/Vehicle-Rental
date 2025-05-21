const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Sedan', 'SUV', 'Luxury', 'Electric']
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  seats: {
    type: Number,
    required: true
  },
  transmission: {
    type: String,
    required: true,
    enum: ['automatic', 'manual']
  },
  fuelType: {
    type: String,
    required: true,
    enum: ['petrol', 'diesel', 'electric', 'hybrid']
  },
  rating: {
    type: Number,
    default: 0
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }]
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;