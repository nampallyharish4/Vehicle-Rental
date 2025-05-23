/*
  # Create vehicles table and security policies

  1. New Tables
    - `vehicles`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `user_id` (uuid, references users)
      - `make` (text)
      - `model` (text)
      - `year` (integer)
      - `color` (text, nullable)
      - `vin` (text, nullable)
      - `license_plate` (text, nullable)
      - `mileage` (integer, default 0)

  2. Security
    - Enable RLS on vehicles table
    - Add policies for authenticated users to:
      - Create their own vehicles
      - Read their own vehicles
      - Update their own vehicles
      - Delete their own vehicles
*/

-- Create vehicles table if it doesn't exist
CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  color text,
  vin text,
  license_plate text,
  mileage integer DEFAULT 0,
  CONSTRAINT year_range CHECK (
    year >= 1900 AND 
    year::float <= date_part('year', CURRENT_TIMESTAMP) + 1
  )
);

-- Enable Row Level Security
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can create vehicles" ON vehicles;
  DROP POLICY IF EXISTS "Users can view their own vehicles" ON vehicles;
  DROP POLICY IF EXISTS "Users can update their own vehicles" ON vehicles;
  DROP POLICY IF EXISTS "Users can delete their own vehicles" ON vehicles;
END $$;

-- Create policies
CREATE POLICY "Users can create vehicles"
  ON vehicles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own vehicles"
  ON vehicles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

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