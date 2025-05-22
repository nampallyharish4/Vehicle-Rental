import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Key, MapPin, Car as CarIcon, Shield, Star } from 'lucide-react';
import SearchBar from '../components/SearchBar';

const HomePage: React.FC = () => {
  const featuredVehicles = [
    {
      id: '1',
      name: 'Tesla Model 3',
      category: 'Electric',
      price: 12000,
      image: 'https://images.pexels.com/photos/5667323/pexels-photo-5667323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      available: true
    },
    {
      id: '2',
      name: 'Range Rover Sport',
      category: 'SUV',
      price: 220,
      image: 'https://images.pexels.com/photos/116639/pexels-photo-116639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      available: true
    },
    {
      id: '3',
      name: 'BMW 5 Series',
      category: 'Sedan',
      price: 180,
      image: 'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      available: false
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70 z-10"></div>
        <div 
          className="h-[600px] bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
        ></div>
        <div className="absolute inset-0 flex items-center z-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Premium Vehicles at Your Fingertips
              </h1>
              <p className="text-xl text-white mb-8">
                Rent the perfect vehicle for your journey with our extensive fleet of premium cars.
              </p>
              <Link
                to="/vehicles"
                className="inline-block bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 py-3 rounded-md font-medium hover:from-red-700 hover:to-orange-600 transition-all transform hover:scale-105"
              >
                Explore Vehicles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4 md:px-6 -mt-16 relative z-30">
          <div className="bg-white rounded-xl shadow-xl p-6">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Vehicles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our selection of premium vehicles available for rent. From luxury sedans to spacious SUVs, we have the perfect vehicle for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVehicles.map((vehicle) => (
              <div 
                key={vehicle.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className={`absolute top-4 right-4 ${
                      vehicle.available ? 'bg-green-500' : 'bg-red-500'
                    } text-white text-sm px-3 py-1 rounded-full`}
                  >
                    {vehicle.available ? 'Available' : 'Booked'}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">{vehicle.name}</h3>
                    <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">
                      {vehicle.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-bold text-2xl text-gray-900">
                      ₹{vehicle.price}
                      <span className="text-sm text-gray-500 font-normal">/day</span>
                    </p>
                  </div>
                  <Link
                    to={`/vehicles/${vehicle.id}`}
                    className="block w-full text-center bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 rounded hover:from-red-700 hover:to-orange-600 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/vehicles"
              className="inline-block border-2 border-orange-500 text-orange-500 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors"
            >
              View All Vehicles
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Renting a vehicle with us is quick and easy. Follow these simple steps to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-full">
                <CarIcon size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose Your Vehicle</h3>
              <p className="text-gray-600">
                Browse our extensive fleet and select the perfect vehicle for your journey.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-full">
                <Calendar size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Make a Reservation</h3>
              <p className="text-gray-600">
                Select your pickup and return dates and complete the booking process.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-full">
                <Key size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enjoy Your Ride</h3>
              <p className="text-gray-600">
                Pick up your vehicle at the designated location and enjoy your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer premium rental services with a focus on quality and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="text-orange-500 mb-4">
                <Shield size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Insurance Included</h3>
              <p className="text-gray-600">
                All our rentals come with comprehensive insurance coverage for your peace of mind.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="text-orange-500 mb-4">
                <Star size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                Our vehicles are regularly maintained and inspected to ensure top performance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="text-orange-500 mb-4">
                <MapPin size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Convenient Locations</h3>
              <p className="text-gray-600">
                Multiple pickup and drop-off locations for your convenience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="text-orange-500 mb-4">
                <Calendar size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Flexible Booking</h3>
              <p className="text-gray-600">
                Easily modify or cancel your booking with our flexible policies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-500 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Hit the Road?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the freedom of the open road with our premium vehicle rental service.
          </p>
          <Link
            to="/vehicles"
            className="inline-block bg-white text-red-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors transform hover:scale-105"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;