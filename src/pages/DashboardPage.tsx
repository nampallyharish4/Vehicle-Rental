import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Car, User, Settings, CreditCard, LogOut, ChevronRight, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Dummy data for bookings
  const bookings = [
    {
      id: 'BK127834',
      vehicle: 'Tesla Model 3',
      image: 'https://images.pexels.com/photos/7553640/pexels-photo-7553640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      status: 'active',
      startDate: '2025-04-15',
      endDate: '2025-04-20',
      location: 'San Francisco'
    },
    {
      id: 'BK982341',
      vehicle: 'BMW 5 Series',
      image: 'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      status: 'completed',
      startDate: '2025-03-10',
      endDate: '2025-03-15',
      location: 'New York'
    }
  ];
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white flex items-center justify-center text-2xl font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">{user?.name || 'User'}</h2>
                  <p className="text-gray-500 text-sm">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center px-4 py-3 rounded-md ${
                    activeTab === 'bookings' 
                      ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Calendar size={20} className="mr-3" />
                  <span>My Bookings</span>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-4 py-3 rounded-md ${
                    activeTab === 'profile' 
                      ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User size={20} className="mr-3" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`w-full flex items-center px-4 py-3 rounded-md ${
                    activeTab === 'payment' 
                      ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <CreditCard size={20} className="mr-3" />
                  <span>Payment Methods</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-3 rounded-md ${
                    activeTab === 'settings' 
                      ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings size={20} className="mr-3" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <LogOut size={20} className="mr-3" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">My Bookings</h1>
                  <Link
                    to="/vehicles"
                    className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-md hover:from-red-700 hover:to-orange-600 transition-colors"
                  >
                    Book a Vehicle
                  </Link>
                </div>
                
                {bookings.length > 0 ? (
                  <div className="space-y-6">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 mb-4 md:mb-0">
                              <img 
                                src={booking.image} 
                                alt={booking.vehicle} 
                                className="w-full h-32 object-cover rounded-md"
                              />
                            </div>
                            <div className="md:w-2/4 md:px-6">
                              <div className="flex justify-between items-start">
                                <h3 className="text-xl font-semibold">{booking.vehicle}</h3>
                                <span className={`text-sm px-3 py-1 rounded-full ${
                                  booking.status === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {booking.status === 'active' ? 'Active' : 'Completed'}
                                </span>
                              </div>
                              <div className="mt-4 space-y-2">
                                <div className="flex items-center text-gray-600">
                                  <Calendar size={16} className="mr-2" />
                                  <span>
                                    {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <MapPin size={16} className="mr-2" />
                                  <span>{booking.location}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Clock size={16} className="mr-2" />
                                  <span>
                                    {booking.status === 'active' 
                                      ? `${Math.ceil((new Date(booking.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining` 
                                      : 'Completed'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="md:w-1/4 flex md:flex-col justify-between items-end mt-4 md:mt-0">
                              <span className="text-xl font-bold">
                                #{booking.id}
                              </span>
                              {booking.status === 'active' && (
                                <button className="bg-white border border-red-600 text-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition-colors">
                                  Cancel
                                </button>
                              )}
                              <button className="inline-flex items-center text-orange-500 hover:text-orange-700">
                                Details
                                <ChevronRight size={16} className="ml-1" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <Car size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No bookings yet</h3>
                    <p className="text-gray-600 mb-6">
                      You haven't made any bookings yet. Start by browsing our available vehicles.
                    </p>
                    <Link
                      to="/vehicles"
                      className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 rounded-md hover:from-red-700 hover:to-orange-600 transition-colors"
                    >
                      Browse Vehicles
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">My Profile</h1>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue={user?.email || 'john.doe@example.com'}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          defaultValue="123 Main St, Apt 4B"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          defaultValue="New York"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          defaultValue="10001"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-4 pt-4 border-t border-gray-200">Driver's License Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          License Number
                        </label>
                        <input
                          type="text"
                          defaultValue="DL12345678"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiration Date
                        </label>
                        <input
                          type="date"
                          defaultValue="2028-05-20"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 rounded-md hover:from-red-700 hover:to-orange-600 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {/* Payment Tab */}
            {activeTab === 'payment' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Payment Methods</h1>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Saved Cards</h2>
                    <button className="text-orange-500 hover:text-orange-700">+ Add New Card</button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-md p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-10 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md mr-4"></div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-500">Expires 12/25</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-3">Default</span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-md p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-10 w-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-md mr-4"></div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 8456</p>
                          <p className="text-sm text-gray-500">Expires 08/26</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">Billing Address</h2>
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          defaultValue="123 Main St, Apt 4B"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          defaultValue="New York"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          defaultValue="10001"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 rounded-md hover:from-red-700 hover:to-orange-600 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive booking confirmations and updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Receive booking reminders via text message</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Updates</p>
                        <p className="text-sm text-gray-500">Receive special offers and promotions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Password</h2>
                  <form>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 rounded-md hover:from-red-700 hover:to-orange-600 transition-colors"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">Delete Account</h2>
                  <p className="text-gray-600 mb-4">
                    Permanently delete your account and all data associated with it. This action cannot be undone.
                  </p>
                  <button className="px-6 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;