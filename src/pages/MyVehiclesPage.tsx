import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Car as CarIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

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
  created_at: string;
}

const MyVehiclesPage: React.FC = () => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVehicles();
  }, [user]);

  const fetchVehicles = async () => {
    try {
      if (!user) return;

      const { data, error: fetchError } = await supabase
        .from('vehicles')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setVehicles(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;

    try {
      const { error: deleteError } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      setVehicles(vehicles.filter(v => v.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      const { error: updateError } = await supabase
        .from('vehicles')
        .update({ available: !currentStatus })
        .eq('id', id);

      if (updateError) throw updateError;
      setVehicles(vehicles.map(v => 
        v.id === id ? { ...v, available: !currentStatus } : v
      ));
    } catch (err: any) {
      setError(err.message);
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Vehicles</h1>
          <Link
            to="/list-vehicle"
            className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 rounded-md hover:from-red-700 hover:to-orange-600 transition-colors"
          >
            List New Vehicle
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {vehicles.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <CarIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No vehicles listed</h3>
            <p className="text-gray-600 mb-6">
              You haven't listed any vehicles yet. Start by listing your first vehicle.
            </p>
            <Link
              to="/list-vehicle"
              className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 rounded-md hover:from-red-700 hover:to-orange-600 transition-colors inline-block"
            >
              List a Vehicle
            </Link>
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
                  <div
                    className={`absolute top-4 right-4 ${
                      vehicle.available ? 'bg-green-500' : 'bg-red-500'
                    } text-white text-sm px-3 py-1 rounded-full`}
                  >
                    {vehicle.available ? 'Available' : 'Not Available'}
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

                  <div className="flex justify-between items-center mb-4">
                    <p className="font-bold text-2xl text-gray-900">
                      ${vehicle.price}
                      <span className="text-sm text-gray-500 font-normal">/day</span>
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="space-x-2">
                      <Link
                        to={`/edit-vehicle/${vehicle.id}`}
                        className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-orange-500 transition-colors"
                      >
                        <Edit size={20} />
                      </Link>
                      <button
                        onClick={() => handleDelete(vehicle.id)}
                        className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <button
                      onClick={() => toggleAvailability(vehicle.id, vehicle.available)}
                      className={`px-4 py-2 rounded-md ${
                        vehicle.available
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      } transition-colors`}
                    >
                      {vehicle.available ? 'Mark Unavailable' : 'Mark Available'}
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

export default MyVehiclesPage