import { supabase } from './supabase';
import { Database } from './database.types';

export type Vehicle = Database['public']['Tables']['vehicles']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];

// Vehicles API
export const getVehicles = async (): Promise<{ data: Vehicle[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false });
  
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

export const createVehicle = async (vehicle: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Vehicle | null; error: any }> => {
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

// Profile API
export const getProfile = async (): Promise<{ data: Profile | null; error: any }> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { data: null, error: 'User not authenticated' };
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  return { data, error };
};

export const updateProfile = async (updates: Partial<Profile>): Promise<{ data: Profile | null; error: any }> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { data: null, error: 'User not authenticated' };
  
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
    .select()
    .single();
  
  return { data, error };
};