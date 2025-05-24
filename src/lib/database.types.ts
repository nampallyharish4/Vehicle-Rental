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
      vehicles: {
        Row: {
          id: string
          created_at: string
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
          features: string[]
        }
        Insert: {
          id?: string
          created_at?: string
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
          features?: string[]
        }
        Update: {
          id?: string
          created_at?: string
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
          features?: string[]
        }
      }
    }
  }
}