import React, { useEffect, useState } from 'react';
import { Car as CarIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Vehicle {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  available: boolean;
  seats: number;
  transmission: string;
  fuel_type: string;
  location: string;
  description: string;
  features: string[];
}

const VehiclesPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('vehicles')
        .select('*')
        .eq('available', true)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setVehicles(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Vehicles</h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {vehicles.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <CarIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No vehicles available</h3>
            <p className="text-gray-600">There are no vehicles available for rent at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                    Available
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{vehicle.name}</h3>
                    <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">
                      {vehicle.category}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{vehicle.location}</p>

                  <div className="flex justify-between items-center">
                    <p className="font-bold text-2xl text-gray-900">
                      ${vehicle.price}
                      <span className="text-sm text-gray-500 font-normal">/day</span>
                    </p>
                    <button className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 rounded-md hover:from-red-700 hover:to-orange-600 transition-colors">
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiclesPage;