/*
  # Create vehicles table for user listings

  1. New Tables
    - `vehicles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
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
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on vehicles table
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL,
  image text NOT NULL,
  available boolean DEFAULT true,
  seats integer NOT NULL,
  transmission text NOT NULL,
  fuel_type text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  features text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Policy for users to read any vehicle
CREATE POLICY "Anyone can view vehicles"
  ON vehicles
  FOR SELECT
  TO public
  USING (true);

-- Policy for authenticated users to create vehicles
CREATE POLICY "Users can create vehicles"
  ON vehicles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own vehicles
CREATE POLICY "Users can update own vehicles"
  ON vehicles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to delete their own vehicles
CREATE POLICY "Users can delete own vehicles"
  ON vehicles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);