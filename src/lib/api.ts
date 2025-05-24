import { supabase } from './supabase';
import { Database } from './database.types';

export type Vehicle = Database['public']['Tables']['vehicles']['Row'];

// Vehicles API
export const getVehicles = async (filters?: {
  category?: string;
  location?: string;
  price_min?: number;
  price_max?: number;
}): Promise<{ data: Vehicle[] | null; error: any }> => {
  let query = supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }
  if (filters?.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }
  if (filters?.price_min) {
    query = query.gte('price', filters.price_min);
  }
  if (filters?.price_max) {
    query = query.lte('price', filters.price_max);
  }

  const { data, error } = await query;
  return { data, error };
};

export const getVehicleById = async (id: string): Promise<{ data: Vehicle | null; error: any }> => {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', id)
    .single();
  
  return { data, error };
};

export const getUserVehicles = async (userId: string): Promise<{ data: Vehicle[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const createVehicle = async (vehicle: Omit<Vehicle, 'id' | 'created_at'>): Promise<{ data: Vehicle | null; error: any }> => {
  const { data, error } = await supabase
    .from('vehicles')
    .insert(vehicle)
    .select()
    .single();
  
  return { data, error };
};

export const updateVehicle = async (id: string, updates: Partial<Vehicle>): Promise<{ data: Vehicle | null; error: any }> => {
  const { data, error } = await supabase
    .from('vehicles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};

export const deleteVehicle = async (id: string): Promise<{ error: any }> => {
  const { error } = await supabase
    .from('vehicles')
    .delete()
    .eq('id', id);
  
  return { error };
};

export const toggleVehicleAvailability = async (id: string, available: boolean): Promise<{ data: Vehicle | null; error: any }> => {
  const { data, error } = await supabase
    .from('vehicles')
    .update({ available })
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};