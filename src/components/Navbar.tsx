import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, UserCircle, Menu, X, LogOut, PlusCircle } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Car size={28} className="text-red-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              VehicleRent
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/vehicles" className="text-gray-700 hover:text-orange-500 transition-colors">
              Vehicles
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/list-vehicle"
                  className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors"
                >
                  <PlusCircle size={20} />
                  <span>List Vehicle</span>
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 focus:outline-none">
                    <span>{user?.user_metadata?.name}</span>
                    <UserCircle size={20} />
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/my-vehicles"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                    >
                      My Vehicles
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" /> Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-orange-500 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-md hover:from-red-700 hover:to-orange-600 transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2 border-t border-gray-200">
            <Link
              to="/vehicles"
              className="block py-2 text-gray-700 hover:text-orange-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Vehicles
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/list-vehicle"
                  className="block py-2 text-gray-700 hover:text-orange-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  List Vehicle
                </Link>
                <Link
                  to="/my-vehicles"
                  className="block py-2 text-gray-700 hover:text-orange-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Vehicles
                </Link>
                <Link
                  to="/dashboard"
                  className="block py-2 text-gray-700 hover:text-orange-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-gray-700 hover:text-orange-500 flex items-center"
                >
                  <LogOut size={16} className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 text-gray-700 hover:text-orange-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 text-gray-700 hover:text-orange-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar