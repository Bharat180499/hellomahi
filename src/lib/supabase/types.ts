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
      users: {
        Row: {
          id: string
          email: string
          password_hash: string | null
          role: 'client' | 'escort' | 'agency' | 'admin'
          status: 'pending' | 'active' | 'suspended' | 'verified'
          created_at: string
          updated_at: string
          phone: string | null
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          date_of_birth: string | null
          gender: 'male' | 'female' | 'other' | null
          location: string | null
          timezone: string | null
          preferences: Json | null
          last_login: string | null
          email_verified: boolean
          phone_verified: boolean
        }
        Insert: {
          id?: string
          email: string
          password_hash?: string | null
          role?: 'client' | 'escort' | 'agency' | 'admin'
          status?: 'pending' | 'active' | 'suspended' | 'verified'
          created_at?: string
          updated_at?: string
          phone?: string | null
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          date_of_birth?: string | null
          gender?: 'male' | 'female' | 'other' | null
          location?: string | null
          timezone?: string | null
          preferences?: Json | null
          last_login?: string | null
          email_verified?: boolean
          phone_verified?: boolean
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string | null
          role?: 'client' | 'escort' | 'agency' | 'admin'
          status?: 'pending' | 'active' | 'suspended' | 'verified'
          created_at?: string
          updated_at?: string
          phone?: string | null
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          date_of_birth?: string | null
          gender?: 'male' | 'female' | 'other' | null
          location?: string | null
          timezone?: string | null
          preferences?: Json | null
          last_login?: string | null
          email_verified?: boolean
          phone_verified?: boolean
        }
      }
      escorts: {
        Row: {
          id: string
          user_id: string
          name: string
          age: number
          bio: string | null
          verification_status: 'pending' | 'verified' | 'rejected'
          status: 'active' | 'inactive' | 'suspended'
          created_at: string
          updated_at: string
          height: number | null
          weight: number | null
          measurements: string | null
          languages: string[]
          services: string[]
          hourly_rate: number
          location: string
          availability: Json | null
          photos: string[]
          featured_photo: string | null
          rating: number
          total_reviews: number
          is_featured: boolean
          is_verified: boolean
          agency_id: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          age: number
          bio?: string | null
          verification_status?: 'pending' | 'verified' | 'rejected'
          status?: 'active' | 'inactive' | 'suspended'
          created_at?: string
          updated_at?: string
          height?: number | null
          weight?: number | null
          measurements?: string | null
          languages?: string[]
          services?: string[]
          hourly_rate: number
          location: string
          availability?: Json | null
          photos?: string[]
          featured_photo?: string | null
          rating?: number
          total_reviews?: number
          is_featured?: boolean
          is_verified?: boolean
          agency_id?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          age?: number
          bio?: string | null
          verification_status?: 'pending' | 'verified' | 'rejected'
          status?: 'active' | 'inactive' | 'suspended'
          created_at?: string
          updated_at?: string
          height?: number | null
          weight?: number | null
          measurements?: string | null
          languages?: string[]
          services?: string[]
          hourly_rate?: number
          location?: string
          availability?: Json | null
          photos?: string[]
          featured_photo?: string | null
          rating?: number
          total_reviews?: number
          is_featured?: boolean
          is_verified?: boolean
          agency_id?: string | null
        }
      }
      agencies: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          verification_status: 'pending' | 'verified' | 'rejected'
          status: 'active' | 'inactive' | 'suspended'
          created_at: string
          updated_at: string
          business_license: string | null
          tax_id: string | null
          address: string | null
          phone: string | null
          website: string | null
          logo_url: string | null
          commission_rate: number
          total_escorts: number
          total_bookings: number
          rating: number
          is_verified: boolean
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          verification_status?: 'pending' | 'verified' | 'rejected'
          status?: 'active' | 'inactive' | 'suspended'
          created_at?: string
          updated_at?: string
          business_license?: string | null
          tax_id?: string | null
          address?: string | null
          phone?: string | null
          website?: string | null
          logo_url?: string | null
          commission_rate?: number
          total_escorts?: number
          total_bookings?: number
          rating?: number
          is_verified?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          verification_status?: 'pending' | 'verified' | 'rejected'
          status?: 'active' | 'inactive' | 'suspended'
          created_at?: string
          updated_at?: string
          business_license?: string | null
          tax_id?: string | null
          address?: string | null
          phone?: string | null
          website?: string | null
          logo_url?: string | null
          commission_rate?: number
          total_escorts?: number
          total_bookings?: number
          rating?: number
          is_verified?: boolean
        }
      }
      bookings: {
        Row: {
          id: string
          escort_id: string
          client_id: string
          date: string
          time: string
          duration: number
          amount: number
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunded'
          created_at: string
          updated_at: string
          location: string | null
          special_requests: string | null
          escort_notes: string | null
          client_notes: string | null
          payment_status: 'pending' | 'paid' | 'refunded'
          payment_method: string | null
          cancellation_reason: string | null
          cancellation_fee: number | null
          rating: number | null
          review: string | null
          review_date: string | null
        }
        Insert: {
          id?: string
          escort_id: string
          client_id: string
          date: string
          time: string
          duration: number
          amount: number
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunded'
          created_at?: string
          updated_at?: string
          location?: string | null
          special_requests?: string | null
          escort_notes?: string | null
          client_notes?: string | null
          payment_status?: 'pending' | 'paid' | 'refunded'
          payment_method?: string | null
          cancellation_reason?: string | null
          cancellation_fee?: number | null
          rating?: number | null
          review?: string | null
          review_date?: string | null
        }
        Update: {
          id?: string
          escort_id?: string
          client_id?: string
          date?: string
          time?: string
          duration?: number
          amount?: number
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunded'
          created_at?: string
          updated_at?: string
          location?: string | null
          special_requests?: string | null
          escort_notes?: string | null
          client_notes?: string | null
          payment_status?: 'pending' | 'paid' | 'refunded'
          payment_method?: string | null
          cancellation_reason?: string | null
          cancellation_fee?: number | null
          rating?: number | null
          review?: string | null
          review_date?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          content: string
          message_type: 'text' | 'image' | 'file'
          created_at: string
          read_at: string | null
          booking_id: string | null
          attachment_url: string | null
          is_system_message: boolean
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          content: string
          message_type?: 'text' | 'image' | 'file'
          created_at?: string
          read_at?: string | null
          booking_id?: string | null
          attachment_url?: string | null
          is_system_message?: boolean
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          message_type?: 'text' | 'image' | 'file'
          created_at?: string
          read_at?: string | null
          booking_id?: string | null
          attachment_url?: string | null
          is_system_message?: boolean
        }
      }
      payments: {
        Row: {
          id: string
          booking_id: string
          amount: number
          currency: string
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_method: string
          created_at: string
          updated_at: string
          stripe_payment_intent_id: string | null
          stripe_charge_id: string | null
          refund_amount: number | null
          refund_reason: string | null
          processing_fee: number | null
          platform_fee: number | null
          escrow_release_date: string | null
        }
        Insert: {
          id?: string
          booking_id: string
          amount: number
          currency?: string
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_method: string
          created_at?: string
          updated_at?: string
          stripe_payment_intent_id?: string | null
          stripe_charge_id?: string | null
          refund_amount?: number | null
          refund_reason?: string | null
          processing_fee?: number | null
          platform_fee?: number | null
          escrow_release_date?: string | null
        }
        Update: {
          id?: string
          booking_id?: string
          amount?: number
          currency?: string
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_method?: string
          created_at?: string
          updated_at?: string
          stripe_payment_intent_id?: string | null
          stripe_charge_id?: string | null
          refund_amount?: number | null
          refund_reason?: string | null
          processing_fee?: number | null
          platform_fee?: number | null
          escrow_release_date?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          booking_id: string
          reviewer_id: string
          escort_id: string
          rating: number
          review: string | null
          created_at: string
          updated_at: string
          is_verified: boolean
          helpful_count: number
          report_count: number
          is_hidden: boolean
        }
        Insert: {
          id?: string
          booking_id: string
          reviewer_id: string
          escort_id: string
          rating: number
          review?: string | null
          created_at?: string
          updated_at?: string
          is_verified?: boolean
          helpful_count?: number
          report_count?: number
          is_hidden?: boolean
        }
        Update: {
          id?: string
          booking_id?: string
          reviewer_id?: string
          escort_id?: string
          rating?: number
          review?: string | null
          created_at?: string
          updated_at?: string
          is_verified?: boolean
          helpful_count?: number
          report_count?: number
          is_hidden?: boolean
        }
      }
      verification_documents: {
        Row: {
          id: string
          user_id: string
          document_type: 'id_card' | 'passport' | 'drivers_license' | 'business_license' | 'other'
          document_url: string
          status: 'pending' | 'approved' | 'rejected'
          created_at: string
          updated_at: string
          verified_at: string | null
          verified_by: string | null
          rejection_reason: string | null
          document_number: string | null
          expiry_date: string | null
        }
        Insert: {
          id?: string
          user_id: string
          document_type: 'id_card' | 'passport' | 'drivers_license' | 'business_license' | 'other'
          document_url: string
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
          rejection_reason?: string | null
          document_number?: string | null
          expiry_date?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          document_type?: 'id_card' | 'passport' | 'drivers_license' | 'business_license' | 'other'
          document_url?: string
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
          rejection_reason?: string | null
          document_number?: string | null
          expiry_date?: string | null
        }
      }
      support_tickets: {
        Row: {
          id: string
          user_id: string
          subject: string
          description: string
          status: 'open' | 'in_progress' | 'resolved' | 'closed'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          category: 'payment' | 'verification' | 'technical' | 'account' | 'booking' | 'other'
          assigned_to: string | null
          created_at: string
          updated_at: string
          resolved_at: string | null
          resolution_notes: string | null
          user_type: 'client' | 'escort' | 'agency' | 'admin'
        }
        Insert: {
          id?: string
          user_id: string
          subject: string
          description: string
          status?: 'open' | 'in_progress' | 'resolved' | 'closed'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          category?: 'payment' | 'verification' | 'technical' | 'account' | 'booking' | 'other'
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
          resolved_at?: string | null
          resolution_notes?: string | null
          user_type?: 'client' | 'escort' | 'agency' | 'admin'
        }
        Update: {
          id?: string
          user_id?: string
          subject?: string
          description?: string
          status?: 'open' | 'in_progress' | 'resolved' | 'closed'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          category?: 'payment' | 'verification' | 'technical' | 'account' | 'booking' | 'other'
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
          resolved_at?: string | null
          resolution_notes?: string | null
          user_type?: 'client' | 'escort' | 'agency' | 'admin'
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
