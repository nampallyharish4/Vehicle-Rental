/*
  # Create vehicles table

  1. New Tables
    - `vehicles`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with timezone)
      - `user_id` (uuid, foreign key to auth.users)
      - `make` (text)
      - `model` (text)
      - `year` (integer)
      - `color` (text)
      - `vin` (text)
      - `license_plate` (text)
      - `mileage` (integer)

  2. Security
    - Enable RLS on `vehicles` table
    - Add policies for authenticated users to:
      - Read their own vehicles
      - Create new vehicles
      - Update their own vehicles
      - Delete their own vehicles
*/

CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  color text,
  vin text,
  license_plate text,
  mileage integer DEFAULT 0,
  CONSTRAINT year_range CHECK (year >= 1900 AND year <= date_part('year', now()) + 1)
);

-- Enable Row Level Security
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own vehicles"
  ON vehicles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create vehicles"
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