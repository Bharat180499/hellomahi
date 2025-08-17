import { apiClient } from './client'
import type {
  Review,
  Rating,
  ReviewRequest,
  ReviewResponseRequest,
  ReviewSearchRequest,
  ReviewSearchResponse,
  ReviewStats,
  ReviewReport,
  ReviewReportRequest,
  ReviewHelpfulVoteRequest,
  EscortReviewSummary,
  AgencyReviewSummary,
  ReviewTemplate,
  ReviewAnalytics
} from '@/types/reviews'

// Reviews
export const reviews = {
  // Get reviews with search and filters
  search: async (data: ReviewSearchRequest): Promise<ReviewSearchResponse> => {
    const params = new URLSearchParams({
      page: (data.page || 1).toString(),
      limit: (data.limit || 20).toString(),
      ...(data.escortId && { escortId: data.escortId }),
      ...(data.query && { query: data.query }),
      ...(data.filters?.rating && { rating: data.filters.rating.toString() }),
      ...(data.filters?.serviceType && { serviceType: data.filters.serviceType }),
      ...(data.filters?.dateRange && { 
        fromDate: data.filters.dateRange.from,
        toDate: data.filters.dateRange.to 
      }),
      ...(data.filters?.isVerified !== undefined && { isVerified: data.filters.isVerified.toString() }),
      ...(data.filters?.hasResponse !== undefined && { hasResponse: data.filters.hasResponse.toString() }),
      ...(data.filters?.status && { status: data.filters.status }),
      ...(data.filters?.sortBy && { sortBy: data.filters.sortBy }),
      ...(data.filters?.sortOrder && { sortOrder: data.filters.sortOrder })
    })

    return apiClient.get(`/reviews/search?${params}`)
  },

  // Get a specific review
  get: async (reviewId: string): Promise<{ success: boolean; review: Review }> => {
    return apiClient.get(`/reviews/${reviewId}`)
  },

  // Create a new review
  create: async (data: ReviewRequest): Promise<{ success: boolean; review: Review }> => {
    const formData = new FormData()
    formData.append('escortId', data.escortId)
    formData.append('rating', data.rating.toString())
    formData.append('title', data.title)
    formData.append('content', data.content)
    formData.append('serviceType', data.serviceType)
    
    if (data.bookingId) {
      formData.append('bookingId', data.bookingId)
    }
    if (data.location) {
      formData.append('location', data.location)
    }
    if (data.isAnonymous !== undefined) {
      formData.append('isAnonymous', data.isAnonymous.toString())
    }
    if (data.metadata) {
      formData.append('metadata', JSON.stringify(data.metadata))
    }
    if (data.attachments) {
      data.attachments.forEach((file, index) => {
        formData.append(`attachments`, file)
      })
    }

    return apiClient.post('/reviews', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  // Update a review
  update: async (reviewId: string, updates: Partial<ReviewRequest>): Promise<{ success: boolean; review: Review }> => {
    return apiClient.patch(`/reviews/${reviewId}`, updates)
  },

  // Delete a review
  delete: async (reviewId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/reviews/${reviewId}`)
  },

  // Get reviews for a specific escort
  getForEscort: async (escortId: string, page = 1, limit = 20): Promise<ReviewSearchResponse> => {
    const params = new URLSearchParams({
      escortId,
      page: page.toString(),
      limit: limit.toString()
    })

    return apiClient.get(`/reviews/escort/${escortId}?${params}`)
  },

  // Get reviews for a specific agency
  getForAgency: async (agencyId: string, page = 1, limit = 20): Promise<ReviewSearchResponse> => {
    const params = new URLSearchParams({
      agencyId,
      page: page.toString(),
      limit: limit.toString()
    })

    return apiClient.get(`/reviews/agency/${agencyId}?${params}`)
  },

  // Get user's reviews
  getMyReviews: async (page = 1, limit = 20): Promise<ReviewSearchResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    return apiClient.get(`/reviews/my-reviews?${params}`)
  }
}

// Ratings
export const ratings = {
  // Get rating for a specific escort
  getForEscort: async (escortId: string): Promise<{ success: boolean; rating: Rating }> => {
    return apiClient.get(`/ratings/escort/${escortId}`)
  },

  // Get rating for a specific agency
  getForAgency: async (agencyId: string): Promise<{ success: boolean; rating: Rating }> => {
    return apiClient.get(`/ratings/agency/${agencyId}`)
  },

  // Get escort review summary
  getEscortSummary: async (escortId: string): Promise<{ success: boolean; summary: EscortReviewSummary }> => {
    return apiClient.get(`/ratings/escort/${escortId}/summary`)
  },

  // Get agency review summary
  getAgencySummary: async (agencyId: string): Promise<{ success: boolean; summary: AgencyReviewSummary }> => {
    return apiClient.get(`/ratings/agency/${agencyId}/summary`)
  },

  // Get top rated escorts
  getTopRatedEscorts: async (limit = 10): Promise<{ success: boolean; escorts: EscortReviewSummary[] }> => {
    return apiClient.get(`/ratings/top-escorts?limit=${limit}`)
  },

  // Get top rated agencies
  getTopRatedAgencies: async (limit = 10): Promise<{ success: boolean; agencies: AgencyReviewSummary[] }> => {
    return apiClient.get(`/ratings/top-agencies?limit=${limit}`)
  }
}

// Review Responses
export const responses = {
  // Add response to a review
  create: async (data: ReviewResponseRequest): Promise<{ success: boolean; response: any }> => {
    return apiClient.post('/reviews/responses', data)
  },

  // Update a response
  update: async (responseId: string, content: string): Promise<{ success: boolean; response: any }> => {
    return apiClient.patch(`/reviews/responses/${responseId}`, { content })
  },

  // Delete a response
  delete: async (responseId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/reviews/responses/${responseId}`)
  },

  // Get responses for a review
  getForReview: async (reviewId: string): Promise<{ success: boolean; responses: any[] }> => {
    return apiClient.get(`/reviews/${reviewId}/responses`)
  }
}

// Review Reports
export const reports = {
  // Report a review
  create: async (data: ReviewReportRequest): Promise<{ success: boolean; report: ReviewReport }> => {
    const formData = new FormData()
    formData.append('reviewId', data.reviewId)
    formData.append('reason', data.reason)
    formData.append('description', data.description)
    
    if (data.evidence) {
      data.evidence.forEach((file, index) => {
        formData.append(`evidence`, file)
      })
    }

    return apiClient.post('/reviews/reports', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  // Get reports for a review
  getForReview: async (reviewId: string): Promise<{ success: boolean; reports: ReviewReport[] }> => {
    return apiClient.get(`/reviews/${reviewId}/reports`)
  },

  // Get user's reports
  getMyReports: async (page = 1, limit = 20): Promise<{ success: boolean; reports: ReviewReport[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    return apiClient.get(`/reviews/reports/my-reports?${params}`)
  }
}

// Helpful Votes
export const helpfulVotes = {
  // Vote on a review
  vote: async (data: ReviewHelpfulVoteRequest): Promise<{ success: boolean }> => {
    return apiClient.post('/reviews/helpful-votes', data)
  },

  // Remove vote
  removeVote: async (reviewId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/reviews/helpful-votes/${reviewId}`)
  },

  // Get helpful votes for a review
  getForReview: async (reviewId: string): Promise<{ success: boolean; votes: any[] }> => {
    return apiClient.get(`/reviews/${reviewId}/helpful-votes`)
  }
}

// Review Templates
export const templates = {
  // Get review templates
  list: async (category?: string): Promise<{ success: boolean; templates: ReviewTemplate[] }> => {
    const params = category ? `?category=${category}` : ''
    return apiClient.get(`/reviews/templates${params}`)
  },

  // Create a template
  create: async (data: Omit<ReviewTemplate, 'id' | 'usageCount' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; template: ReviewTemplate }> => {
    return apiClient.post('/reviews/templates', data)
  },

  // Update a template
  update: async (templateId: string, updates: Partial<ReviewTemplate>): Promise<{ success: boolean; template: ReviewTemplate }> => {
    return apiClient.patch(`/reviews/templates/${templateId}`, updates)
  },

  // Delete a template
  delete: async (templateId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/reviews/templates/${templateId}`)
  }
}

// Review Analytics (Admin)
export const analytics = {
  // Get review statistics
  getStats: async (): Promise<{ success: boolean; stats: ReviewStats }> => {
    return apiClient.get('/reviews/analytics/stats')
  },

  // Get review analytics
  getAnalytics: async (period: 'day' | 'week' | 'month' | 'year' = 'month'): Promise<{ success: boolean; analytics: ReviewAnalytics }> => {
    return apiClient.get(`/reviews/analytics?period=${period}`)
  },

  // Get flagged reviews
  getFlaggedReviews: async (page = 1, limit = 20): Promise<{ success: boolean; reviews: Review[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    return apiClient.get(`/reviews/analytics/flagged?${params}`)
  },

  // Get pending reports
  getPendingReports: async (page = 1, limit = 20): Promise<{ success: boolean; reports: ReviewReport[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    return apiClient.get(`/reviews/analytics/pending-reports?${params}`)
  },

  // Approve a review
  approveReview: async (reviewId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/reviews/analytics/${reviewId}/approve`)
  },

  // Reject a review
  rejectReview: async (reviewId: string, reason: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/reviews/analytics/${reviewId}/reject`, { reason })
  },

  // Flag a review
  flagReview: async (reviewId: string, reason: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/reviews/analytics/${reviewId}/flag`, { reason })
  }
}

// Export all review functions
export const reviewSystem = {
  reviews,
  ratings,
  responses,
  reports,
  helpfulVotes,
  templates,
  analytics
} 