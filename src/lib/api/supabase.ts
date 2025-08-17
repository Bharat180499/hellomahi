import { supabase } from '@/lib/supabase/client'
import { Tables, Inserts, Updates } from '@/lib/supabase/types'

// Generic API response type
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// User API
export class UserAPI {
  static async getCurrentUser(): Promise<ApiResponse<Tables<'users'>>> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      if (!user) return { success: false, error: 'No authenticated user' }

      const { data, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) throw profileError
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  static async updateProfile(userId: string, updates: Updates<'users'>): Promise<ApiResponse<Tables<'users'>>> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  static async signUp(email: string, password: string, userData: Partial<Inserts<'users'>>): Promise<ApiResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  static async signIn(email: string, password: string): Promise<ApiResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  static async signOut(): Promise<ApiResponse> {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}

// Escort API
export class EscortAPI {
  static async getEscorts(filters?: {
    location?: string
    minRate?: number
    maxRate?: number
    services?: string[]
    languages?: string[]
    status?: 'active' | 'inactive' | 'suspended'
    limit?: number
    offset?: number
  }): Promise<ApiResponse<Tables<'escorts'>[]>> {
    try {
      let query = supabase
        .from('escorts')
        .select(`
          *,
          users!inner(
            id,
            first_name,
            last_name,
            avatar_url,
            location,
            status
          )
        `)

      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`)
      }
      if (filters?.minRate) {
        query = query.gte('hourly_rate', filters.minRate)
      }
      if (filters?.maxRate) {
        query = query.lte('hourly_rate', filters.maxRate)
      }
      if (filters?.services?.length) {
        query = query.overlaps('services', filters.services)
      }
      if (filters?.languages?.length) {
        query = query.overlaps('languages', filters.languages)
      }
      if (filters?.status) {
        query = query.eq('status', filters.status)
      } else {
        query = query.eq('status', 'active')
      }

      query = query.order('is_featured', { ascending: false })
      query = query.order('rating', { ascending: false })

      if (filters?.limit) {
        query = query.limit(filters.limit)
      }
      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
      }

      const { data, error } = await query

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  static async getEscortById(id: string): Promise<ApiResponse<Tables<'escorts'>>> {
    try {
      const { data, error } = await supabase
        .from('escorts')
        .select(`
          *,
          users!inner(
            id,
            first_name,
            last_name,
            avatar_url,
            location,
            status
          ),
          reviews(
            id,
            rating,
            review,
            created_at,
            users!inner(
              id,
              first_name,
              last_name,
              avatar_url
            )
          )
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  static async createEscortProfile(escortData: Inserts<'escorts'>): Promise<ApiResponse<Tables<'escorts'>>> {
    try {
      const { data, error } = await supabase
        .from('escorts')
        .insert(escortData)
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  static async updateEscortProfile(id: string, updates: Updates<'escorts'>): Promise<ApiResponse<Tables<'escorts'>>> {
    try {
      const { data, error } = await supabase
        .from('escorts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}

// Booking API
export class BookingAPI {
  static async createBooking(bookingData: Inserts<'bookings'>): Promise<ApiResponse<Tables<'bookings'>>> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  static async getBookings(userId: string, role: 'client' | 'escort'): Promise<ApiResponse<Tables<'bookings'>[]>> {
    try {
      let query = supabase
        .from('bookings')
        .select(`
          *,
          escorts!inner(
            id,
            name,
            hourly_rate,
            location,
            users!inner(
              id,
              first_name,
              last_name,
              avatar_url
            )
          ),
          users!inner(
            id,
            first_name,
            last_name,
            avatar_url
          )
        `)

      if (role === 'client') {
        query = query.eq('client_id', userId)
      } else {
        query = query.eq('escorts.user_id', userId)
      }

      query = query.order('created_at', { ascending: false })

      const { data, error } = await query

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  static async updateBookingStatus(id: string, status: Tables<'bookings'>['status']): Promise<ApiResponse<Tables<'bookings'>>> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}

// Message API
export class MessageAPI {
  static async getMessages(userId1: string, userId2: string): Promise<ApiResponse<Tables<'messages'>[]>> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          users!sender_id(
            id,
            first_name,
            last_name,
            avatar_url
          )
        `)
        .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
        .order('created_at', { ascending: true })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  static async sendMessage(messageData: Inserts<'messages'>): Promise<ApiResponse<Tables<'messages'>>> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert(messageData)
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  static async markAsRead(messageId: string): Promise<ApiResponse> {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('id', messageId)

      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}

// Review API
export class ReviewAPI {
  static async createReview(reviewData: Inserts<'reviews'>): Promise<ApiResponse<Tables<'reviews'>>> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert(reviewData)
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  static async getEscortReviews(escortId: string): Promise<ApiResponse<Tables<'reviews'>[]>> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          users!inner(
            id,
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq('escort_id', escortId)
        .eq('is_hidden', false)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}

// Support Ticket API
export class SupportTicketAPI {
  static async createTicket(ticketData: Inserts<'support_tickets'>): Promise<ApiResponse<Tables<'support_tickets'>>> {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .insert(ticketData)
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  static async getTickets(userId: string): Promise<ApiResponse<Tables<'support_tickets'>[]>> {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  static async updateTicket(id: string, updates: Updates<'support_tickets'>): Promise<ApiResponse<Tables<'support_tickets'>>> {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}

// File Upload API
export class FileUploadAPI {
  static async uploadFile(file: File, bucket: string, path: string): Promise<ApiResponse<{ url: string }>> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(path)

      return { success: true, data: { url: publicUrl } }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  static async deleteFile(bucket: string, path: string): Promise<ApiResponse> {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path])

      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}
