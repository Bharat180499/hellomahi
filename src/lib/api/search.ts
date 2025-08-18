import { Search } from 'lucide-react'
import { apiClient } from './client'
import type { SearchRequest, SearchResponse, SearchSuggestion, SearchHistory, SearchAnalytics, LocationSearch, ServiceSearch, SearchPreferences, SearchNotification, SearchAlert, SearchRecommendation, SearchFilter, SearchCategory, SearchLocation, SearchTrend, SearchInsight } from '@/types/search'

// Search Operations
export const search = {
  // Search escorts and agencies
  search: async (searchRequest: SearchRequest): Promise<SearchResponse> => {
    return apiClient.post('/search', searchRequest)
  },

  // Get search suggestions
  getSuggestions: async (query: string, limit = 10): Promise<{ success: boolean; suggestions: SearchSuggestion[] }> => {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString()
    })
    return apiClient.get(`/search/suggestions?${params}`)
  },

  // Get search history
  getHistory: async (page = 1, limit = 20): Promise<{ success: boolean; history: SearchHistory[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return apiClient.get(`/search/history?${params}`)
  },

  // Clear search history
  clearHistory: async (): Promise<{ success: boolean }> => {
    return apiClient.delete('/search/history')
  },

  // Save search to history
  saveToHistory: async (searchData: Omit<SearchHistory, 'id' | 'timestamp'>): Promise<{ success: boolean }> => {
    return apiClient.post('/search/history', searchData)
  }
}

// Location Search
export const locationSearch = {
  // Search locations
  search: async (query: string, limit = 20): Promise<{ success: boolean; locations: LocationSearch[] }> => {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString()
    })
    return apiClient.get(`/search/locations?${params}`)
  },

  // Get popular locations
  getPopular: async (limit = 10): Promise<{ success: boolean; locations: LocationSearch[] }> => {
    const params = new URLSearchParams({
      limit: limit.toString()
    })
    return apiClient.get(`/search/locations/popular?${params}`)
  },

  // Get location details
  getDetails: async (locationId: string): Promise<{ success: boolean; location: LocationSearch }> => {
    return apiClient.get(`/search/locations/${locationId}`)
  },

  // Get nearby locations
  getNearby: async (latitude: number, longitude: number, radius = 10): Promise<{ success: boolean; locations: LocationSearch[] }> => {
    const params = new URLSearchParams({
      lat: latitude.toString(),
      lng: longitude.toString(),
      radius: radius.toString()
    })
    return apiClient.get(`/search/locations/nearby?${params}`)
  }
}

// Service Search
export const serviceSearch = {
  // Search services
  search: async (query: string, limit = 20): Promise<{ success: boolean; services: ServiceSearch[] }> => {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString()
    })
    return apiClient.get(`/search/services?${params}`)
  },

  // Get popular services
  getPopular: async (limit = 10): Promise<{ success: boolean; services: ServiceSearch[] }> => {
    const params = new URLSearchParams({
      limit: limit.toString()
    })
    return apiClient.get(`/search/services/popular?${params}`)
  },

  // Get service details
  getDetails: async (serviceId: string): Promise<{ success: boolean; service: ServiceSearch }> => {
    return apiClient.get(`/search/services/${serviceId}`)
  },

  // Get services by category
  getByCategory: async (category: string, limit = 20): Promise<{ success: boolean; services: ServiceSearch[] }> => {
    const params = new URLSearchParams({
      category,
      limit: limit.toString()
    })
    return apiClient.get(`/search/services/category?${params}`)
  }
}

// Search Preferences
export const searchPreferences = {
  // Get user search preferences
  get: async (): Promise<{ success: boolean; preferences: SearchPreferences }> => {
    return apiClient.get('/search/preferences')
  },

  // Update search preferences
  update: async (preferences: Partial<SearchPreferences>): Promise<{ success: boolean; preferences: SearchPreferences }> => {
    return apiClient.patch('/search/preferences', preferences)
  },

  // Reset search preferences
  reset: async (): Promise<{ success: boolean }> => {
    return apiClient.post('/search/preferences/reset')
  }
}

// Search Notifications
export const searchNotifications = {
  // Get search notifications
  list: async (page = 1, limit = 20): Promise<{ success: boolean; notifications: SearchNotification[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return apiClient.get(`/search/notifications?${params}`)
  },

  // Mark notification as read
  markAsRead: async (notificationId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/search/notifications/${notificationId}/read`)
  },

  // Mark all notifications as read
  markAllAsRead: async (): Promise<{ success: boolean }> => {
    return apiClient.post('/search/notifications/read-all')
  },

  // Get unread count
  getUnreadCount: async (): Promise<{ success: boolean; count: number }> => {
    return apiClient.get('/search/notifications/unread-count')
  }
}

// Search Alerts
export const searchAlerts = {
  // Get search alerts
  list: async (page = 1, limit = 20): Promise<{ success: boolean; alerts: SearchAlert[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return apiClient.get(`/search/alerts?${params}`)
  },

  // Create search alert
  create: async (alert: Omit<SearchAlert, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; alert: SearchAlert }> => {
    return apiClient.post('/search/alerts', alert)
  },

  // Update search alert
  update: async (alertId: string, updates: Partial<SearchAlert>): Promise<{ success: boolean; alert: SearchAlert }> => {
    return apiClient.patch(`/search/alerts/${alertId}`, updates)
  },

  // Delete search alert
  delete: async (alertId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/search/alerts/${alertId}`)
  },

  // Toggle alert status
  toggleStatus: async (alertId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/search/alerts/${alertId}/toggle`)
  }
}

// Search Recommendations
export const searchRecommendations = {
  // Get personalized recommendations
  getPersonalized: async (limit = 10): Promise<{ success: boolean; recommendations: SearchRecommendation[] }> => {
    const params = new URLSearchParams({
      limit: limit.toString()
    })
    return apiClient.get(`/search/recommendations/personalized?${params}`)
  },

  // Get trending recommendations
  getTrending: async (limit = 10): Promise<{ success: boolean; recommendations: SearchRecommendation[] }> => {
    const params = new URLSearchParams({
      limit: limit.toString()
    })
    return apiClient.get(`/search/recommendations/trending?${params}`)
  },

  // Mark recommendation as viewed
  markAsViewed: async (recommendationId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/search/recommendations/${recommendationId}/viewed`)
  },

  // Mark recommendation as clicked
  markAsClicked: async (recommendationId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/search/recommendations/${recommendationId}/clicked`)
  }
}

// Search Filters
export const searchFilters = {
  // Get available search filters
  getAvailable: async (): Promise<{ success: boolean; filters: SearchFilter[] }> => {
    return apiClient.get('/search/filters')
  },

  // Get filter options
  getOptions: async (filterId: string): Promise<{ success: boolean; options: any[] }> => {
    return apiClient.get(`/search/filters/${filterId}/options`)
  },

  // Get filter suggestions
  getSuggestions: async (filterId: string, query: string): Promise<{ success: boolean; suggestions: string[] }> => {
    const params = new URLSearchParams({
      q: query
    })
    return apiClient.get(`/search/filters/${filterId}/suggestions?${params}`)
  }
}

// Search Categories
export const searchCategories = {
  // Get all categories
  list: async (): Promise<{ success: boolean; categories: SearchCategory[] }> => {
    return apiClient.get('/search/categories')
  },

  // Get category details
  get: async (categoryId: string): Promise<{ success: boolean; category: SearchCategory }> => {
    return apiClient.get(`/search/categories/${categoryId}`)
  },

  // Get popular categories
  getPopular: async (limit = 10): Promise<{ success: boolean; categories: SearchCategory[] }> => {
    const params = new URLSearchParams({
      limit: limit.toString()
    })
    return apiClient.get(`/search/categories/popular?${params}`)
  }
}

// Search Analytics
export const searchAnalytics = {
  // Get search analytics
  getAnalytics: async (period: 'day' | 'week' | 'month' = 'month'): Promise<{ success: boolean; analytics: SearchAnalytics }> => {
    return apiClient.get(`/search/analytics?period=${period}`)
  },

  // Get search trends
  getTrends: async (period: 'day' | 'week' | 'month' = 'month'): Promise<{ success: boolean; trends: SearchTrend[] }> => {
    return apiClient.get(`/search/analytics/trends?period=${period}`)
  },

  // Get search insights
  getInsights: async (): Promise<{ success: boolean; insights: SearchInsight }> => {
    return apiClient.get('/search/analytics/insights')
  }
}

// Search Locations Management
export const searchLocations = {
  // Get all search locations
  list: async (page = 1, limit = 20): Promise<{ success: boolean; locations: SearchLocation[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return apiClient.get(`/search/locations?${params}`)
  },

  // Get location details
  get: async (locationId: string): Promise<{ success: boolean; location: SearchLocation }> => {
    return apiClient.get(`/search/locations/${locationId}`)
  },

  // Create location
  create: async (location: Omit<SearchLocation, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; location: SearchLocation }> => {
    return apiClient.post('/search/locations', location)
  },

  // Update location
  update: async (locationId: string, updates: Partial<SearchLocation>): Promise<{ success: boolean; location: SearchLocation }> => {
    return apiClient.patch(`/search/locations/${locationId}`, updates)
  },

  // Delete location
  delete: async (locationId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/search/locations/${locationId}`)
  }
}

// Export all search functions
export const searchSystem = {
  search,
  locationSearch,
  serviceSearch,
  searchPreferences,
  searchNotifications,
  searchAlerts,
  searchRecommendations,
  searchFilters,
  searchCategories,
  searchAnalytics,
  searchLocations
} 