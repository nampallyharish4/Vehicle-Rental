import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Filter, Car as CarIcon, Calendar, ChevronDown, Star, X } from 'lucide-react';
import { tempVehicleData } from '../utils/tempData';

interface Vehicle {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  available: boolean;
  seats: number;
  transmission: string;
  fuelType: string;
  rating: number;
  location: string;
}

const VehicleListingPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [vehicles, setVehicles] = useState<Vehicle[]>(tempVehicleData);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(tempVehicleData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filterLocation, setFilterLocation] = useState(queryParams.get('location') || '');
  const [showFilters, setShowFilters] = useState(false);
  
  // Sorting
  const [sortBy, setSortBy] = useState('price-low');
  
  useEffect(() => {
    // In a real app, we would fetch vehicles from the API
    // For now, we'll use the temporary data from tempData.ts
    setLoading(true);
    
    try {
      // Filter based on URL parameters
      let filtered = [...tempVehicleData];
      
      const locationParam = queryParams.get('location');
      const typeParam = queryParams.get('type');
      
      if (locationParam) {
        setFilterLocation(locationParam);
        filtered = filtered.filter(v => 
          v.location.toLowerCase().includes(locationParam.toLowerCase())
        );
      }
      
      if (typeParam) {
        setSelectedCategories([typeParam]);
        filtered = filtered.filter(v => 
          v.category.toLowerCase() === typeParam.toLowerCase()
        );
      }
      
      setVehicles(tempVehicleData);
      setFilteredVehicles(filtered);
    } catch (err) {
      setError('Failed to load vehicles. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [location.search]);
  
  // Apply filters whenever filter states change
  useEffect(() => {
    applyFilters();
  }, [priceRange, selectedCategories, filterLocation, sortBy]);
  
  const applyFilters = () => {
    let filtered = [...vehicles];
    
    // Apply price filter
    filtered = filtered.filter(
      vehicle => vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1]
    );
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(
        vehicle => selectedCategories.includes(vehicle.category.toLowerCase())
      );
    }
    
    // Apply location filter
    if (filterLocation) {
      filtered = filtered.filter(
        vehicle => vehicle.location.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.price - b.price;
      }
    });
    
    setFilteredVehicles(filtered);
  };
  
  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const clearFilters = () => {
    setPriceRange([50, 500]);
    setSelectedCategories([]);
    setFilterLocation('');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Vehicles</h1>
            <p className="text-gray-600">
              {filteredVehicles.length} {filteredVehicles.length === 1 ? 'vehicle' : 'vehicles'} found
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 md:hidden"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
            
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white pl-4 pr-10 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`md:w-1/4 bg-white p-6 rounded-lg shadow-md ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button 
                onClick={clearFilters}
                className="text-sm text-orange-600 hover:text-orange-800"
              >
                Clear all
              </button>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="text-md font-medium mb-3">Price Range</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full accent-orange-500"
                />
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-orange-500"
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-md font-medium mb-3">Vehicle Type</h3>
              <div className="space-y-2">
                {['sedan', 'suv', 'luxury', 'electric'].map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="h-4 w-4 text-orange-600 rounded focus:ring-orange-500"
                    />
                    <label htmlFor={category} className="ml-2 text-gray-700 capitalize">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Location Filter */}
            <div className="mb-6">
              <h3 className="text-md font-medium mb-3">Location</h3>
              <input
                type="text"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                placeholder="Enter location"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            {/* Additional Filters */}
            <div>
              <h3 className="text-md font-medium mb-3">Availability</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="available"
                    className="h-4 w-4 text-orange-600 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="available" className="ml-2 text-gray-700">
                    Show only available
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Vehicle Listings */}
          <div className="md:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-500">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <X className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            ) : filteredVehicles.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <CarIcon size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No vehicles found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search criteria to find available vehicles.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 rounded-md hover:from-red-700 hover:to-orange-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-60 object-cover"
                      />
                      <div
                        className={`absolute top-4 right-4 ${
                          vehicle.available ? 'bg-green-500' : 'bg-red-500'
                        } text-white text-sm px-3 py-1 rounded-full`}
                      >
                        {vehicle.available ? 'Available' : 'Booked'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-medium text-gray-800">
                        {vehicle.location}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{vehicle.name}</h3>
                        <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded capitalize">
                          {vehicle.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < vehicle.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <span className="text-gray-600 text-sm ml-2">
                          ({Math.floor(Math.random() * 100) + 20} reviews)
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-gray-50 p-2 rounded text-center">
                          <p className="text-xs text-gray-500">Seats</p>
                          <p className="font-medium">{vehicle.seats}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded text-center">
                          <p className="text-xs text-gray-500">Transmission</p>
                          <p className="font-medium capitalize">{vehicle.transmission}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded text-center">
                          <p className="text-xs text-gray-500">Fuel</p>
                          <p className="font-medium capitalize">{vehicle.fuelType}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-2xl text-gray-900">
                          ${vehicle.price}
                          <span className="text-sm text-gray-500 font-normal">/day</span>
                        </p>
                        <Link
                          to={`/vehicles/${vehicle.id}`}
                          className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded hover:from-red-700 hover:to-orange-600 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleListingPage;