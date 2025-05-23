export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      vehicles: {
        Row: {
          id: string
          user_id: string
          name: string
          category: string
          price: number
          image: string
          available: boolean
          seats: number
          transmission: string
          fuel_type: string
          location: string
          description: string
          features: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          category: string
          price: number
          image: string
          available?: boolean
          seats: number
          transmission: string
          fuel_type: string
          location: string
          description: string
          features?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          category?: string
          price?: number
          image?: string
          available?: boolean
          seats?: number
          transmission?: string
          fuel_type?: string
          location?: string
          description?: string
          features?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}