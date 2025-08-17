import { apiClient } from './client'
import type {
  Agency,
  AgencySearchParams,
  AgencyCreateData,
  AgencyUpdateData,
  AgencyAnalytics,
  AgencyDashboardStats,
  AgencyStaff,
  AgencyEscort,
  AgencyNotification,
  AgencyReport
} from '@/types/agency'

export const agencies = {
  // Search and list agencies
  async search(params: AgencySearchParams = {}) {
    const response = await apiClient.get('/api/v1/agencies', { params })
    return response.data
  },

  async getAll(page = 1, limit = 12) {
    const response = await apiClient.get('/api/v1/agencies', {
      params: { page, limit }
    })
    return response.data
  },

  async getFeatured() {
    const response = await apiClient.get('/api/v1/agencies/featured')
    return response.data
  },

  // Get agency by ID or slug
  async getById(id: string) {
    const response = await apiClient.get(`/api/v1/agencies/${id}`)
    return response.data
  },

  async getBySlug(slug: string) {
    const response = await apiClient.get(`/api/v1/agencies/slug/${slug}`)
    return response.data
  },

  // Agency management (requires authentication)
  async create(data: AgencyCreateData) {
    const response = await apiClient.post('/api/v1/agencies', data)
    return response.data
  },

  async update(id: string, data: AgencyUpdateData) {
    const response = await apiClient.put(`/api/v1/agencies/${id}`, data)
    return response.data
  },

  async delete(id: string) {
    const response = await apiClient.delete(`/api/v1/agencies/${id}`)
    return response.data
  },

  // Agency dashboard and analytics
  async getDashboardStats(agencyId: string) {
    const response = await apiClient.get(`/api/v1/agencies/${agencyId}/dashboard/stats`)
    return response.data as AgencyDashboardStats
  },

  async getAnalytics(agencyId: string, period: string = '30d') {
    const response = await apiClient.get(`/api/v1/agencies/${agencyId}/analytics`, {
      params: { period }
    })
    return response.data as AgencyAnalytics
  },

  async getRevenueReport(agencyId: string, startDate: string, endDate: string) {
    const response = await apiClient.get(`/api/v1/agencies/${agencyId}/reports/revenue`, {
      params: { start_date: startDate, end_date: endDate }
    })
    return response.data
  },

  async getPerformanceReport(agencyId: string, period: string = 'month') {
    const response = await apiClient.get(`/api/v1/agencies/${agencyId}/reports/performance`, {
      params: { period }
    })
    return response.data
  },

  // Staff management
  async getStaff(agencyId: string) {
    const response = await apiClient.get(`/api/v1/agencies/${agencyId}/staff`)
    return response.data as AgencyStaff[]
  },

  async addStaff(agencyId: string, staffData: {
    name: string
    email: string
    phone: string
    role: string
    permissions: string[]
  }) {
    const response = await apiClient.post(`/api/v1/agencies/${agencyId}/staff`, staffData)
    return response.data
  },

  async updateStaff(agencyId: string, staffId: string, staffData: Partial<AgencyStaff>) {
    const response = await apiClient.put(`/api/v1/agencies/${agencyId}/staff/${staffId}`, staffData)
    return response.data
  },

  async removeStaff(agencyId: string, staffId: string) {
    const response = await apiClient.delete(`/api/v1/agencies/${agencyId}/staff/${staffId}`)
    return response.data
  },

  // Escort management
  async getEscorts(agencyId: string, page = 1, limit = 20) {
    const response = await apiClient.get(`/api/v1/agencies/${agencyId}/escorts`, {
      params: { page, limit }
    })
    return response.data
  },

  async addEscort(agencyId: string, escortData: {
    escort_id: string
    is_featured?: boolean
  }) {
    const response = await apiClient.post(`/api/v1/agencies/${agencyId}/escorts`, escortData)
    return response.data
  },

  async updateEscort(agencyId: string, escortId: string, escortData: Partial<AgencyEscort>) {
    const response = await apiClient.put(`/api/v1/agencies/${agencyId}/escorts/${escortId}`, escortData)
    return response.data
  },

  async removeEscort(agencyId: string, escortId: string) {
    const response = await apiClient.delete(`/api/v1/agencies/${agencyId}/escorts/${escortId}`)
    return response.data
  },

  async getEscortPerformance(agencyId: string, escortId: string, period: string = '30d') {
    const response = await apiClient.get(`/api/v1/agencies/${agencyId}/escorts/${escortId}/performance`, {
      params: { period }
    })
    return response.data
  },

  // Notifications
  async getNotifications(agencyId: string, page = 1, limit = 20) {
    const response = await apiClient.get(`/api/v1/agencies/${agencyId}/notifications`, {
      params: { page, limit }
    })
    return response.data as AgencyNotification[]
  },

  async markNotificationRead(agencyId: string, notificationId: string) {
    const response = await apiClient.put(`/api/v1/agencies/${agencyId}/notifications/${notificationId}/read`)
    return response.data
  },

  async markAllNotificationsRead(agencyId: string) {
    const response = await apiClient.put(`/api/v1/agencies/${agencyId}/notifications/read-all`)
    return response.data
  },

  async getUnreadCount(agencyId: string) {
    const response = await apiClient.get(`/api/v1/agencies/${agencyId}/notifications/unread-count`)
    return response.data
  },

  // Reports
  async getReports(agencyId: string, type?: string, page = 1, limit = 20) {
    const response = await apiClient.get(`/api/v1/agencies/${agencyId}/reports`, {
      params: { type, page, limit }
    })
    return response.data as AgencyReport[]
  },

  async generateReport(agencyId: string, reportData: {
    type: string
    title: string
    description: string
    period_start: string
    period_end: string
  }) {
    const response = await apiClient.post(`/api/v1/agencies/${agencyId}/reports`, reportData)
    return response.data
  },

  async downloadReport(agencyId: string, reportId: string, format: 'pdf' | 'csv' | 'excel' = 'pdf') {
    const response = await apiClient.get(`/api/v1/agencies/${agencyId}/reports/${reportId}/download`, {
      params: { format },
      responseType: 'blob'
    })
    return response.data
  },

  // Settings and configuration
  async getSettings(agencyId: string) {
    const response = await apiClient.get(`/api/v1/agencies/${agencyId}/settings`)
    return response.data
  },

  async updateSettings(agencyId: string, settings: any) {
    const response = await apiClient.put(`/api/v1/agencies/${agencyId}/settings`, settings)
    return response.data
  },

  async updateBusinessHours(agencyId: string, businessHours: any[]) {
    const response = await apiClient.put(`/api/v1/agencies/${agencyId}/business-hours`, businessHours)
    return response.data
  },

  // Verification and status
  async requestVerification(agencyId: string, verificationData: {
    documents: string[]
    additional_info?: string
  }) {
    const response = await apiClient.post(`/api/v1/agencies/${agencyId}/verification`, verificationData)
    return response.data
  },

  async getVerificationStatus(agencyId: string) {
    const response = await apiClient.get(`/api/v1/agencies/${agencyId}/verification`)
    return response.data
  },

  // Subscription and billing
  async getSubscription(agencyId: string) {
    const response = await apiClient.get(`/api/v1/agencies/${agencyId}/subscription`)
    return response.data
  },

  async updateSubscription(agencyId: string, planId: string) {
    const response = await apiClient.put(`/api/v1/agencies/${agencyId}/subscription`, { plan_id: planId })
    return response.data
  },

  async getBillingHistory(agencyId: string, page = 1, limit = 20) {
    const response = await apiClient.get(`/api/v1/agencies/${agencyId}/billing/history`, {
      params: { page, limit }
    })
    return response.data
  },

  // Media uploads
  async uploadLogo(agencyId: string, file: File) {
    const formData = new FormData()
    formData.append('logo', file)
    
    const response = await apiClient.post(`/api/v1/agencies/${agencyId}/logo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  async uploadBanner(agencyId: string, file: File) {
    const formData = new FormData()
    formData.append('banner', file)
    
    const response = await apiClient.post(`/api/v1/agencies/${agencyId}/banner`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  // Public agency information
  async getPublicProfile(slug: string) {
    const response = await apiClient.get(`/api/v1/agencies/public/${slug}`)
    return response.data
  },

  async getPublicEscorts(slug: string, page = 1, limit = 12) {
    const response = await apiClient.get(`/api/v1/agencies/public/${slug}/escorts`, {
      params: { page, limit }
    })
    return response.data
  },

  async getPublicReviews(slug: string, page = 1, limit = 10) {
    const response = await apiClient.get(`/api/v1/agencies/public/${slug}/reviews`, {
      params: { page, limit }
    })
    return response.data
  },

  // Agency statistics
  async getStats(agencyId: string) {
    const response = await apiClient.get(`/api/v1/agencies/${agencyId}/stats`)
    return response.data
  },

  async incrementViews(agencyId: string) {
    const response = await apiClient.post(`/api/v1/agencies/${agencyId}/views`)
    return response.data
  },

  // Mock data for development
  getMockAgencies() {
    return [
      {
        id: '1',
        user_id: 'user1',
        name: 'Elite Companions Agency',
        slug: 'elite-companions',
        description: 'Premium escort agency providing high-quality companionship services across major cities in India.',
        logo_url: '/images/agencies/elite-logo.png',
        banner_url: '/images/agencies/elite-banner.jpg',
        website_url: 'https://elitecompanions.com',
        phone: '+91-9876543210',
        email: 'info@elitecompanions.com',
        address: {
          street: '123 Luxury Lane',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          postal_code: '400001'
        },
        contact_person: {
          name: 'Priya Sharma',
          email: 'priya@elitecompanions.com',
          phone: '+91-9876543210',
          role: 'Director'
        },
        business_hours: [],
        services_offered: ['Companionship', 'Dinner Dates', 'Travel Companion', 'VIP Services'],
        specializations: ['Luxury', 'Corporate', 'International'],
        languages_supported: ['English', 'Hindi', 'Marathi', 'Gujarati'],
        payment_methods: ['Credit Card', 'Bank Transfer', 'Cash'],
        verification_status: 'verified' as const,
        status: 'active' as const,
        featured: true,
        rating: 4.8,
        review_count: 156,
        total_escorts: 25,
        total_bookings: 1247,
        total_revenue: 18750000,
                 subscription_plan: {
           id: 'premium',
           name: 'Premium Plan',
           price: 50000,
           currency: 'INR',
           billing_cycle: 'monthly' as const,
           features: ['Unlimited Escorts', 'Priority Support', 'Advanced Analytics'],
           max_escorts: 50,
           max_bookings_per_month: 1000,
           is_active: true
         },
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        user_id: 'user2',
        name: 'Royal Escorts International',
        slug: 'royal-escorts',
        description: 'International escort agency specializing in luxury companionship and travel services.',
        logo_url: '/images/agencies/royal-logo.png',
        banner_url: '/images/agencies/royal-banner.jpg',
        website_url: 'https://royalescorts.com',
        phone: '+91-9876543211',
        email: 'contact@royalescorts.com',
        address: {
          street: '456 Royal Plaza',
          city: 'Delhi',
          state: 'Delhi',
          country: 'India',
          postal_code: '110001'
        },
        contact_person: {
          name: 'Rajesh Kumar',
          email: 'rajesh@royalescorts.com',
          phone: '+91-9876543211',
          role: 'CEO'
        },
        business_hours: [],
        services_offered: ['Luxury Companionship', 'International Travel', 'VIP Events', 'Corporate Functions'],
        specializations: ['International', 'Luxury', 'Corporate Events'],
        languages_supported: ['English', 'Hindi', 'French', 'German', 'Spanish'],
        payment_methods: ['Credit Card', 'International Transfer', 'Cash'],
        verification_status: 'verified' as const,
        status: 'active' as const,
        featured: true,
        rating: 4.9,
        review_count: 89,
        total_escorts: 18,
        total_bookings: 892,
        total_revenue: 15680000,
                 subscription_plan: {
           id: 'luxury',
           name: 'Luxury Plan',
           price: 75000,
           currency: 'INR',
           billing_cycle: 'monthly' as const,
           features: ['International Support', 'Luxury Branding', 'Dedicated Manager'],
           max_escorts: 30,
           max_bookings_per_month: 500,
           is_active: true
         },
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      }
    ]
  }
} 