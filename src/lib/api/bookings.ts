import { apiClient } from './client'
import type { Booking, BookingRequest, BookingResponse, BookingUpdate, BookingCancellation, BookingStats, EscortBookingStats, AgencyBookingStats, BookingSearch, BookingSearchResult, BookingNotification, BookingReminder, BookingDispute, BookingVerification, BookingService, BookingLocation, BookingAvailability, BookingCalendar, BookingTemplate, BookingAnalytics } from '@/types/bookings'

// Booking Management
export const bookings = {
  // Get user's bookings
  list: async (page = 1, limit = 20): Promise<{ success: boolean; bookings: Booking[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return apiClient.get(`/bookings?${params}`)
  },

  // Get a specific booking
  get: async (bookingId: string): Promise<{ success: boolean; booking: Booking }> => {
    return apiClient.get(`/bookings/${bookingId}`)
  },

  // Create a new booking
  create: async (data: BookingRequest): Promise<BookingResponse> => {
    return apiClient.post('/bookings', data)
  },

  // Update a booking
  update: async (bookingId: string, updates: BookingUpdate): Promise<{ success: boolean; booking: Booking }> => {
    return apiClient.patch(`/bookings/${bookingId}`, updates)
  },

  // Cancel a booking
  cancel: async (bookingId: string, cancellation: BookingCancellation): Promise<{ success: boolean }> => {
    return apiClient.post(`/bookings/${bookingId}/cancel`, cancellation)
  },

  // Confirm a booking
  confirm: async (bookingId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/bookings/${bookingId}/confirm`)
  },

  // Complete a booking
  complete: async (bookingId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/bookings/${bookingId}/complete`)
  },

  // Reschedule a booking
  reschedule: async (bookingId: string, newDate: string, newTime: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/bookings/${bookingId}/reschedule`, { newDate, newTime })
  },

  // Get booking receipt
  getReceipt: async (bookingId: string): Promise<{ success: boolean; receipt: any }> => {
    return apiClient.get(`/bookings/${bookingId}/receipt`)
  },

  // Download booking invoice
  downloadInvoice: async (bookingId: string): Promise<{ success: boolean; invoice: any }> => {
    return apiClient.get(`/bookings/${bookingId}/invoice`)
  }
}

// Booking Search
export const bookingSearch = {
  // Search bookings with filters
  search: async (searchParams: BookingSearch): Promise<BookingSearchResult> => {
    return apiClient.post('/bookings/search', searchParams)
  },

  // Get booking suggestions
  getSuggestions: async (query: string): Promise<{ success: boolean; suggestions: string[] }> => {
    return apiClient.get(`/bookings/suggestions?q=${encodeURIComponent(query)}`)
  }
}

// Booking Statistics
export const bookingStats = {
  // Get overall booking statistics
  getStats: async (): Promise<{ success: boolean; stats: BookingStats }> => {
    return apiClient.get('/bookings/stats')
  },

  // Get escort booking statistics
  getEscortStats: async (escortId?: string): Promise<{ success: boolean; stats: EscortBookingStats }> => {
    const params = escortId ? `?escortId=${escortId}` : ''
    return apiClient.get(`/bookings/stats/escort${params}`)
  },

  // Get agency booking statistics
  getAgencyStats: async (agencyId?: string): Promise<{ success: boolean; stats: AgencyBookingStats }> => {
    const params = agencyId ? `?agencyId=${agencyId}` : ''
    return apiClient.get(`/bookings/stats/agency${params}`)
  },

  // Get booking analytics
  getAnalytics: async (period: 'week' | 'month' | 'year' = 'month'): Promise<{ success: boolean; analytics: BookingAnalytics }> => {
    return apiClient.get(`/bookings/analytics?period=${period}`)
  }
}

// Booking Notifications
export const bookingNotifications = {
  // Get booking notifications
  list: async (page = 1, limit = 20): Promise<{ success: boolean; notifications: BookingNotification[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return apiClient.get(`/bookings/notifications?${params}`)
  },

  // Mark notification as read
  markAsRead: async (notificationId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/bookings/notifications/${notificationId}/read`)
  },

  // Mark all notifications as read
  markAllAsRead: async (): Promise<{ success: boolean }> => {
    return apiClient.post('/bookings/notifications/read-all')
  },

  // Get unread count
  getUnreadCount: async (): Promise<{ success: boolean; count: number }> => {
    return apiClient.get('/bookings/notifications/unread-count')
  }
}

// Booking Reminders
export const bookingReminders = {
  // Get booking reminders
  list: async (page = 1, limit = 20): Promise<{ success: boolean; reminders: BookingReminder[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return apiClient.get(`/bookings/reminders?${params}`)
  },

  // Create a reminder
  create: async (bookingId: string, reminderTime: string, message: string): Promise<{ success: boolean; reminder: BookingReminder }> => {
    return apiClient.post('/bookings/reminders', { bookingId, reminderTime, message })
  },

  // Update a reminder
  update: async (reminderId: string, updates: Partial<BookingReminder>): Promise<{ success: boolean; reminder: BookingReminder }> => {
    return apiClient.patch(`/bookings/reminders/${reminderId}`, updates)
  },

  // Delete a reminder
  delete: async (reminderId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/bookings/reminders/${reminderId}`)
  }
}

// Booking Disputes
export const bookingDisputes = {
  // Get booking disputes
  list: async (page = 1, limit = 20): Promise<{ success: boolean; disputes: BookingDispute[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return apiClient.get(`/bookings/disputes?${params}`)
  },

  // Get specific dispute
  get: async (disputeId: string): Promise<{ success: boolean; dispute: BookingDispute }> => {
    return apiClient.get(`/bookings/disputes/${disputeId}`)
  },

  // Create a dispute
  create: async (bookingId: string, data: Omit<BookingDispute, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; dispute: BookingDispute }> => {
    return apiClient.post('/bookings/disputes', { ...data, bookingId })
  },

  // Update dispute status
  updateStatus: async (disputeId: string, status: BookingDispute['status'], resolution?: string): Promise<{ success: boolean }> => {
    return apiClient.patch(`/bookings/disputes/${disputeId}/status`, { status, resolution })
  },

  // Add evidence to dispute
  addEvidence: async (disputeId: string, evidence: string[]): Promise<{ success: boolean }> => {
    return apiClient.post(`/bookings/disputes/${disputeId}/evidence`, { evidence })
  }
}

// Booking Verification
export const bookingVerification = {
  // Get booking verifications
  list: async (page = 1, limit = 20): Promise<{ success: boolean; verifications: BookingVerification[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return apiClient.get(`/bookings/verifications?${params}`)
  },

  // Get specific verification
  get: async (verificationId: string): Promise<{ success: boolean; verification: BookingVerification }> => {
    return apiClient.get(`/bookings/verifications/${verificationId}`)
  },

  // Create verification request
  create: async (bookingId: string, type: BookingVerification['type'], documents?: string[]): Promise<{ success: boolean; verification: BookingVerification }> => {
    return apiClient.post('/bookings/verifications', { bookingId, type, documents })
  },

  // Approve verification
  approve: async (verificationId: string, notes?: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/bookings/verifications/${verificationId}/approve`, { notes })
  },

  // Reject verification
  reject: async (verificationId: string, notes?: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/bookings/verifications/${verificationId}/reject`, { notes })
  }
}

// Booking Services
export const bookingServices = {
  // Get booking services
  list: async (): Promise<{ success: boolean; services: BookingService[] }> => {
    return apiClient.get('/bookings/services')
  },

  // Get specific service
  get: async (serviceId: string): Promise<{ success: boolean; service: BookingService }> => {
    return apiClient.get(`/bookings/services/${serviceId}`)
  },

  // Create service
  create: async (data: Omit<BookingService, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; service: BookingService }> => {
    return apiClient.post('/bookings/services', data)
  },

  // Update service
  update: async (serviceId: string, updates: Partial<BookingService>): Promise<{ success: boolean; service: BookingService }> => {
    return apiClient.patch(`/bookings/services/${serviceId}`, updates)
  },

  // Delete service
  delete: async (serviceId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/bookings/services/${serviceId}`)
  }
}

// Booking Locations
export const bookingLocations = {
  // Get booking locations
  list: async (): Promise<{ success: boolean; locations: BookingLocation[] }> => {
    return apiClient.get('/bookings/locations')
  },

  // Get specific location
  get: async (locationId: string): Promise<{ success: boolean; location: BookingLocation }> => {
    return apiClient.get(`/bookings/locations/${locationId}`)
  },

  // Create location
  create: async (data: Omit<BookingLocation, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; location: BookingLocation }> => {
    return apiClient.post('/bookings/locations', data)
  },

  // Update location
  update: async (locationId: string, updates: Partial<BookingLocation>): Promise<{ success: boolean; location: BookingLocation }> => {
    return apiClient.patch(`/bookings/locations/${locationId}`, updates)
  },

  // Delete location
  delete: async (locationId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/bookings/locations/${locationId}`)
  },

  // Verify location safety
  verifySafety: async (locationId: string, safetyRating: number, notes?: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/bookings/locations/${locationId}/verify-safety`, { safetyRating, notes })
  }
}

// Booking Availability
export const bookingAvailability = {
  // Get escort availability
  getEscortAvailability: async (escortId: string, date: string): Promise<{ success: boolean; availability: BookingAvailability }> => {
    return apiClient.get(`/bookings/availability/escort/${escortId}?date=${date}`)
  },

  // Set escort availability
  setEscortAvailability: async (escortId: string, date: string, availability: BookingAvailability['availableSlots']): Promise<{ success: boolean }> => {
    return apiClient.post(`/bookings/availability/escort/${escortId}`, { date, availableSlots: availability })
  },

  // Get escort calendar
  getEscortCalendar: async (escortId: string, month: string, year: string): Promise<{ success: boolean; calendar: BookingCalendar }> => {
    return apiClient.get(`/bookings/availability/calendar/${escortId}?month=${month}&year=${year}`)
  },

  // Block dates
  blockDates: async (escortId: string, dates: string[]): Promise<{ success: boolean }> => {
    return apiClient.post(`/bookings/availability/block-dates/${escortId}`, { dates })
  },

  // Unblock dates
  unblockDates: async (escortId: string, dates: string[]): Promise<{ success: boolean }> => {
    return apiClient.post(`/bookings/availability/unblock-dates/${escortId}`, { dates })
  }
}

// Booking Templates
export const bookingTemplates = {
  // Get booking templates
  list: async (): Promise<{ success: boolean; templates: BookingTemplate[] }> => {
    return apiClient.get('/bookings/templates')
  },

  // Get specific template
  get: async (templateId: string): Promise<{ success: boolean; template: BookingTemplate }> => {
    return apiClient.get(`/bookings/templates/${templateId}`)
  },

  // Create template
  create: async (data: Omit<BookingTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; template: BookingTemplate }> => {
    return apiClient.post('/bookings/templates', data)
  },

  // Update template
  update: async (templateId: string, updates: Partial<BookingTemplate>): Promise<{ success: boolean; template: BookingTemplate }> => {
    return apiClient.patch(`/bookings/templates/${templateId}`, updates)
  },

  // Delete template
  delete: async (templateId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/bookings/templates/${templateId}`)
  },

  // Apply template to booking
  applyTemplate: async (bookingId: string, templateId: string): Promise<{ success: boolean; booking: Booking }> => {
    return apiClient.post(`/bookings/${bookingId}/apply-template`, { templateId })
  }
}

// Export all booking functions
export const bookingSystem = {
  bookings,
  bookingSearch,
  bookingStats,
  bookingNotifications,
  bookingReminders,
  bookingDisputes,
  bookingVerification,
  bookingServices,
  bookingLocations,
  bookingAvailability,
  bookingTemplates
} 