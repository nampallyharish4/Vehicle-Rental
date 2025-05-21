const Vehicle = require('../models/Vehicle');

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Public
exports.getVehicles = async (req, res) => {
  try {
    const { location, category, price_min, price_max } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    
    if (price_min || price_max) {
      filter.price = {};
      if (price_min) filter.price.$gte = Number(price_min);
      if (price_max) filter.price.$lte = Number(price_max);
    }
    
    const vehicles = await Vehicle.find(filter);
    res.json(vehicles);
  } catch (error) {
    console.error('Error in getVehicles: ', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get vehicle by ID
// @route   GET /api/vehicles/:id
// @access  Public
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (vehicle) {
      res.json(vehicle);
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    console.error('Error in getVehicleById: ', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a vehicle
// @route   POST /api/vehicles
// @access  Private/Admin
exports.createVehicle = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      image,
      available,
      seats,
      transmission,
      fuelType,
      location,
      description,
      features
    } = req.body;
    
    const vehicle = new Vehicle({
      name,
      category,
      price,
      image,
      available,
      seats,
      transmission,
      fuelType,
      location,
      description,
      features
    });
    
    const createdVehicle = await vehicle.save();
    res.status(201).json(createdVehicle);
  } catch (error) {
    console.error('Error in createVehicle: ', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a vehicle
// @route   PUT /api/vehicles/:id
// @access  Private/Admin
exports.updateVehicle = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      image,
      available,
      seats,
      transmission,
      fuelType,
      location,
      description,
      features
    } = req.body;
    
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (vehicle) {
      vehicle.name = name || vehicle.name;
      vehicle.category = category || vehicle.category;
      vehicle.price = price || vehicle.price;
      vehicle.image = image || vehicle.image;
      vehicle.available = available !== undefined ? available : vehicle.available;
      vehicle.seats = seats || vehicle.seats;
      vehicle.transmission = transmission || vehicle.transmission;
      vehicle.fuelType = fuelType || vehicle.fuelType;
      vehicle.location = location || vehicle.location;
      vehicle.description = description || vehicle.description;
      vehicle.features = features || vehicle.features;
      
      const updatedVehicle = await vehicle.save();
      res.json(updatedVehicle);
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    console.error('Error in updateVehicle: ', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private/Admin
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (vehicle) {
      await vehicle.remove();
      res.json({ message: 'Vehicle removed' });
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    console.error('Error in deleteVehicle: ', error);
    res.status(500).json({ message: 'Server error' });
  }
};