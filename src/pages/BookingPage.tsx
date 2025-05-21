import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { CreditCard, Calendar, Check, X } from 'lucide-react';
import { tempVehicleData } from '../utils/tempData';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    agreeToTerms: false
  });
  
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Get dates from URL params
  const pickupDate = searchParams.get('pickup') || '';
  const returnDate = searchParams.get('return') || '';
  
  useEffect(() => {
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
    
    return days * vehicle?.price;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, we would send the booking data to the server
    // For now, we'll just simulate a booking success after a delay
    
    setLoading(true);
    
    setTimeout(() => {
      setBookingSuccess(true);
      setLoading(false);
    }, 1500);
  };
  
  if (loading && !bookingSuccess) {
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
  
  if (bookingSuccess) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full">
                <Check size={32} className="text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600">
                Your booking for the {vehicle.name} has been confirmed. An email with the details has been sent to your email address.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Vehicle</p>
                  <p className="font-medium">{vehicle.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Booking Reference</p>
                  <p className="font-medium">BK{Math.floor(100000 + Math.random() * 900000)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pickup Date</p>
                  <p className="font-medium">{new Date(pickupDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Return Date</p>
                  <p className="font-medium">{new Date(returnDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pickup Location</p>
                  <p className="font-medium">{vehicle.location} Rental Center</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Cost</p>
                  <p className="font-bold">${calculateTotalPrice() + 60}</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 rounded-md font-medium hover:from-red-700 hover:to-orange-600 transition-colors"
              >
                Go to My Bookings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Booking</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-6 pt-4 border-t border-gray-200">Payment Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="md:col-span-2">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CreditCard size={16} className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      required
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                      I agree to the{' '}
                      <a href="#" className="text-orange-600 hover:text-orange-500">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-orange-600 hover:text-orange-500">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 px-4 rounded-md font-medium hover:from-red-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                  >
                    Complete Booking
                  </button>
                </form>
              </div>
            </div>
            
            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                
                <div className="flex items-center mb-6">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    className="w-24 h-24 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{vehicle.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{vehicle.category}</p>
                  </div>
                </div>
                
                <div className="border-t border-b border-gray-200 py-4 mb-4">
                  <div className="flex items-center mb-2">
                    <Calendar size={18} className="text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Pickup Date</p>
                      <p className="font-medium">{new Date(pickupDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={18} className="text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Return Date</p>
                      <p className="font-medium">{new Date(returnDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Base rate:</span>
                    <span>${vehicle.price}/day</span>
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
                
                <div className="bg-orange-50 border border-orange-200 rounded-md p-4 text-sm text-orange-800">
                  <p className="font-medium mb-1">Important Information:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Please bring a valid driver's license</li>
                    <li>A security deposit of $500 will be required</li>
                    <li>Free cancellation up to 24 hours before pickup</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;