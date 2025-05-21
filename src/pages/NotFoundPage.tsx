import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ChevronRight } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <Car size={80} className="mx-auto text-orange-500 mb-6" />
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 rounded-md font-medium hover:from-red-700 hover:to-orange-600 transition-colors flex items-center"
          >
            Go to Homepage
          </Link>
          <Link
            to="/vehicles"
            className="text-orange-600 hover:text-orange-800 px-6 py-3 rounded-md font-medium flex items-center"
          >
            Browse Vehicles <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;