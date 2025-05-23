/*
  # Create vehicles table

  1. New Tables
    - `vehicles`
      - `id` (uuid, primary key, default: gen_random_uuid())
      - `created_at` (timestamptz, default: now())
      - `user_id` (uuid, foreign key to users.id)
      - `make` (text, required)
      - `model` (text, required)
      - `year` (integer, required)
      - `color` (text, optional)
      - `vin` (text, optional)
      - `license_plate` (text, optional)
      - `mileage` (integer, default: 0)

  2. Constraints
    - Primary key on id
    - Foreign key on user_id referencing users table
    - Year range check (1900 to current year + 1)

  3. Security
    - Enable RLS
    - Policies for CRUD operations based on user authentication
*/

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