export interface Agency {
  id: string
  user_id: string
  name: string
  slug: string
  description: string
  logo_url?: string
  banner_url?: string
  website_url?: string
  phone?: string
  email: string
  address: {
    street: string
    city: string
    state: string
    country: string
    postal_code: string
    coordinates?: {
      latitude: number
      longitude: number
    }
  }
  contact_person: {
    name: string
    email: string
    phone: string
    role: string
  }
  business_hours: BusinessHours[]
  services_offered: string[]
  specializations: string[]
  languages_supported: string[]
  payment_methods: string[]
  verification_status: 'pending' | 'verified' | 'rejected'
  status: 'active' | 'inactive' | 'suspended'
  featured: boolean
  rating: number
  review_count: number
  total_escorts: number
  total_bookings: number
  subscription_plan: SubscriptionPlan
  created_at: string
  updated_at: string
}

export interface BusinessHours {
  id: string
  day_of_week: number // 0 = Sunday, 1 = Monday, etc.
  open_time: string
  close_time: string
  is_open: boolean
}

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  currency: string
  billing_cycle: 'monthly' | 'yearly'
  features: string[]
  max_escorts: number
  max_bookings_per_month: number
  is_active: boolean
}

export interface AgencyStaff {
  id: string
  agency_id: string
  user_id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'manager' | 'support' | 'accountant'
  permissions: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface AgencyEscort {
  id: string
  agency_id: string
  escort_id: string
  is_featured: boolean
  status: 'active' | 'inactive' | 'pending'
  joined_at: string
  updated_at: string
}

export interface AgencyAnalytics {
  period: string
  total_bookings: number
  total_escorts: number
  average_rating: number
  conversion_rate: number
  top_performing_escorts: TopPerformingEscort[]
  bookings_by_location: BookingsByLocation[]
}

export interface TopPerformingEscort {
  escort_id: string
  escort_name: string
  escort_image: string
  bookings: number
  rating: number
}



export interface BookingsByLocation {
  location: string
  bookings: number
  percentage: number
}

export interface AgencySearchParams {
  location?: string
  services?: string[]
  rating_min?: number
  rating_max?: number
  price_min?: number
  price_max?: number
  verified_only?: boolean
  featured_only?: boolean
  sort_by?: 'rating' | 'name' | 'bookings'
  sort_order?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface AgencyCreateData {
  name: string
  description: string
  email: string
  phone?: string
  address: {
    street: string
    city: string
    state: string
    country: string
    postal_code: string
  }
  contact_person: {
    name: string
    email: string
    phone: string
    role: string
  }
  services_offered: string[]
  specializations: string[]
  languages_supported: string[]
  payment_methods: string[]
}

export interface AgencyUpdateData {
  name?: string
  description?: string
  logo_url?: string
  banner_url?: string
  website_url?: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    country: string
    postal_code: string
  }
  contact_person?: {
    name: string
    email: string
    phone: string
    role: string
  }
  business_hours?: BusinessHours[]
  services_offered?: string[]
  specializations?: string[]
  languages_supported?: string[]
  payment_methods?: string[]
}

export interface AgencyDashboardStats {
  total_escorts: number
  active_escorts: number
  total_bookings: number
  pending_bookings: number
  total_revenue: number
  monthly_revenue: number
  average_rating: number
  total_reviews: number
  conversion_rate: number
  response_time: number
}

export interface AgencyNotification {
  id: string
  agency_id: string
  type: 'booking' | 'payment' | 'escort' | 'system' | 'review'
  title: string
  message: string
  data?: any
  is_read: boolean
  created_at: string
}

export interface AgencyReport {
  id: string
  agency_id: string
  type: 'financial' | 'performance' | 'escort' | 'custom'
  title: string
  description: string
  data: any
  generated_at: string
  period_start: string
  period_end: string
} 