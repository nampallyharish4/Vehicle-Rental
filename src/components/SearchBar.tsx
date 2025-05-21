import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Car, Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    
    if (location) queryParams.append('location', location);
    if (pickupDate) queryParams.append('pickup', pickupDate);
    if (returnDate) queryParams.append('return', returnDate);
    if (vehicleType) queryParams.append('type', vehicleType);
    
    navigate(`/vehicles?${queryParams.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Pickup location"
            className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>
      
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar size={18} className="text-gray-400" />
          </div>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>
      
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar size={18} className="text-gray-400" />
          </div>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>
      
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Car size={18} className="text-gray-400" />
          </div>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="pl-10 w-full py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">All Types</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="luxury">Luxury</option>
            <option value="electric">Electric</option>
          </select>
        </div>
      </div>
      
      <div className="relative">
        <label className="invisible block text-sm font-medium text-gray-700 mb-1">Search</label>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium rounded-md hover:from-red-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors flex items-center justify-center"
        >
          <Search size={18} className="mr-2" />
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;