import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Zap, Gauge, RotateCw, Star, ChevronRight, Shield, Clock, X } from 'lucide-react';
import { tempVehicleData } from '../utils/tempData';
import { useAuth } from '../context/AuthContext';

const VehicleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  useEffect(() => {
    // In a real app, we would fetch the vehicle from the API
    setLoading(true);
    
    try {
      // Find the vehicle in our temporary data
      const foundVehicle = tempVehicleData.find(v => v.id === id);
      
      if (foundVehicle) {
        setVehicle(foundVehicle);
      } else {
        setError('Vehicle not found');
        navigate('/404');
      }
    } catch (err) {
      setError('Failed to load vehicle details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);
  
  const calculateTotalPrice = () => {
    if (!pickupDate || !returnDate || !vehicle) return 0;
    
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    return days * vehicle.price;
  };
  
  const handleBook = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    if (!pickupDate || !returnDate) {
      alert('Please select pickup and return dates');
      return;
    }
    
    navigate(`/booking/${id}?pickup=${pickupDate}&return=${returnDate}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-500">
          <div className="flex">
            <div className="flex-shrink-0">
              <X className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error || 'Vehicle not found'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Vehicle Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Link to="/vehicles" className="hover:text-orange-500">Vehicles</Link>
                <ChevronRight size={16} className="mx-1" />
                <span className="capitalize">{vehicle.category}</span>
                <ChevronRight size={16} className="mx-1" />
                <span>{vehicle.name}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{vehicle.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center mr-4">
                  <MapPin size={16} className="text-gray-500 mr-1" />
                  <span className="text-sm text-gray-600">{vehicle.location}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < vehicle.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-1">
                    ({Math.floor(Math.random() * 100) + 20} reviews)
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-gray-900">₹{vehicle.price}</span>
              <span className="text-gray-500 ml-1">/day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content - Vehicle Details */}
          <div className="lg:col-span-2">
            {/* Vehicle Image */}
            <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={vehicle.image} 
                alt={vehicle.name} 
                className="w-full h-96 object-cover"
              />
            </div>
            
            {/* Vehicle Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Vehicle Information</h2>
              <p className="text-gray-700 mb-6">{vehicle.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <Users size={24} className="mx-auto text-orange-500 mb-2" />
                  <p className="text-sm text-gray-500">Seats</p>
                  <p className="font-semibold">{vehicle.seats}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <RotateCw size={24} className="mx-auto text-orange-500 mb-2" />
                  <p className="text-sm text-gray-500">Transmission</p>
                  <p className="font-semibold capitalize">{vehicle.transmission}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <Zap size={24} className="mx-auto text-orange-500 mb-2" />
                  <p className="text-sm text-gray-500">Fuel Type</p>
                  <p className="font-semibold capitalize">{vehicle.fuelType}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <Gauge size={24} className="mx-auto text-orange-500 mb-2" />
                  <p className="text-sm text-gray-500">Fuel Economy</p>
                  <p className="font-semibold">
                    {vehicle.fuelType === 'electric' ? '120 MPGe' : '28 MPG'}
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {vehicle.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className="h-2 w-2 bg-orange-500 rounded-full mr-2"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Reviews</h2>
                <span className="text-sm text-gray-500">
                  {Math.floor(Math.random() * 100) + 20} reviews
                </span>
              </div>
              
              <div className="space-y-6">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                          <img 
                            src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 1}.jpg`} 
                            alt="User" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {index === 0 ? 'Michael Johnson' : index === 1 ? 'Sarah Peterson' : 'David Wilson'}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {index === 0 ? 'March 15, 2023' : index === 1 ? 'February 22, 2023' : 'January 10, 2023'}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < (5 - index % 2) ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">
                      {index === 0 
                        ? `Excellent vehicle! Clean, well-maintained, and drove perfectly. The pickup and drop-off process was smooth and convenient. I would definitely rent this ${vehicle.name} again.` 
                        : index === 1 
                        ? `Very good experience overall. The ${vehicle.name} was in great condition and fun to drive. The only minor issue was that the GPS needed an update.`
                        : `Good rental experience. The ${vehicle.name} was clean and performed well. Fuel efficiency was great, which saved me money on my trip.`}
                    </p>
                  </div>
                ))}
              </div>
              
              <button className="mt-6 w-full py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-50 transition-colors">
                View All Reviews
              </button>
            </div>
          </div>
          
          {/* Right Content - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Book this vehicle</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={pickupDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={returnDate}
                    min={pickupDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>
              
              {pickupDate && returnDate && (
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Base rate:</span>
                    <span>₹{vehicle.price}/day</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Number of days:</span>
                    <span>{Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24))}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Cleaning fee:</span>
                    <span>$25</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Service fee:</span>
                    <span>$35</span>
                  </div>
                  <div className="border-t border-gray-300 my-2 pt-2 flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${calculateTotalPrice() + 60}</span>
                  </div>
                </div>
              )}
              
              <button
                onClick={handleBook}
                disabled={!vehicle.available}
                className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                  vehicle.available 
                    ? 'bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600' 
                    : 'bg-gray-400 cursor-not-allowed'
                } transition-colors`}
              >
                {vehicle.available ? 'Book Now' : 'Currently Unavailable'}
              </button>
              
              {!vehicle.available && (
                <p className="text-sm text-red-500 mt-2 text-center">
                  This vehicle is currently booked. Please check back later or choose another vehicle.
                </p>
              )}
              
              <div className="mt-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Clock size={16} className="mr-2 text-orange-500" />
                  <span>Instant confirmation</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Shield size={16} className="mr-2 text-orange-500" />
                  <span>Insurance included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Login Required
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-4">
                        Please login or create an account to book this vehicle.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          to="/login"
                          className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:text-sm"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-base font-medium text-white hover:from-red-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:text-sm"
                        >
                          Sign Up
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleDetailPage;