/*
  # Create vehicles table with availability management

  1. New Tables
    - `vehicles`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `category` (text)
      - `price` (numeric)
      - `image` (text)
      - `available` (boolean)
      - `seats` (integer)
      - `transmission` (text)
      - `fuel_type` (text)
      - `location` (text)
      - `description` (text)
      - `features` (text[])

  2. Security
    - Enable RLS
    - Public can view all vehicles
    - Authenticated users can manage their own vehicles
*/

CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  image text NOT NULL,
  available boolean DEFAULT true,
  seats integer NOT NULL CHECK (seats > 0),
  transmission text NOT NULL CHECK (transmission IN ('automatic', 'manual')),
  fuel_type text NOT NULL CHECK (fuel_type IN ('petrol', 'diesel', 'electric', 'hybrid')),
  location text NOT NULL,
  description text NOT NULL,
  features text[] DEFAULT '{}'::text[]
);

-- Enable Row Level Security
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Allow public to view all vehicles
CREATE POLICY "Anyone can view vehicles"
  ON vehicles
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to manage their vehicles
CREATE POLICY "Users can insert their own vehicles"
  ON vehicles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own vehicles"
  ON vehicles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own vehicles"
  ON vehicles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);