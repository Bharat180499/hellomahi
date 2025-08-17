export interface Review {
  id: string
  escortId: string
  escortName: string
  escortAvatar?: string
  userId: string
  userName: string
  userAvatar?: string
  bookingId?: string
  rating: number // 1-5 stars
  title: string
  content: string
  serviceType: string
  location?: string
  date: string
  isVerified: boolean
  isAnonymous: boolean
  isEdited: boolean
  editedAt?: string
  isDeleted: boolean
  deletedAt?: string
  helpfulCount: number
  reportCount: number
  status: 'pending' | 'approved' | 'rejected' | 'flagged'
  adminNotes?: string
  metadata?: {
    serviceQuality: number
    communication: number
    punctuality: number
    valueForMoney: number
    overallExperience: number
    bookingDate?: string
    serviceDate?: string
    duration?: number // minutes
    price?: number
  }
  attachments?: ReviewAttachment[]
  responses?: ReviewResponse[]
  createdAt: string
  updatedAt: string
}

export interface ReviewAttachment {
  id: string
  type: 'image' | 'video'
  url: string
  thumbnailUrl?: string
  name: string
  size: number
  mimeType: string
  width?: number
  height?: number
  duration?: number // for videos
}

export interface ReviewResponse {
  id: string
  reviewId: string
  responderId: string
  responderType: 'escort' | 'agency' | 'admin'
  responderName: string
  responderAvatar?: string
  content: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export interface Rating {
  escortId: string
  averageRating: number
  totalReviews: number
  ratingBreakdown: {
    fiveStar: number
    fourStar: number
    threeStar: number
    twoStar: number
    oneStar: number
  }
  serviceRatings: {
    serviceQuality: number
    communication: number
    punctuality: number
    valueForMoney: number
    overallExperience: number
  }
  recentReviews: Review[]
  lastUpdated: string
}

export interface ReviewRequest {
  escortId: string
  bookingId?: string
  rating: number
  title: string
  content: string
  serviceType: string
  location?: string
  isAnonymous?: boolean
  metadata?: {
    serviceQuality: number
    communication: number
    punctuality: number
    valueForMoney: number
    overallExperience: number
    bookingDate?: string
    serviceDate?: string
    duration?: number
    price?: number
  }
  attachments?: File[]
}

export interface ReviewResponseRequest {
  reviewId: string
  content: string
  isPublic?: boolean
}

export interface ReviewFilters {
  rating?: number
  serviceType?: string
  dateRange?: {
    from: string
    to: string
  }
  isVerified?: boolean
  hasResponse?: boolean
  status?: 'pending' | 'approved' | 'rejected' | 'flagged'
  sortBy?: 'date' | 'rating' | 'helpful' | 'relevance'
  sortOrder?: 'asc' | 'desc'
}

export interface ReviewSearchRequest {
  escortId?: string
  query?: string
  filters?: ReviewFilters
  page?: number
  limit?: number
}

export interface ReviewSearchResponse {
  success: boolean
  reviews: Review[]
  totalCount: number
  hasMore: boolean
  averageRating: number
  ratingBreakdown: {
    fiveStar: number
    fourStar: number
    threeStar: number
    twoStar: number
    oneStar: number
  }
  error?: string
}

export interface ReviewStats {
  totalReviews: number
  averageRating: number
  verifiedReviews: number
  pendingReviews: number
  flaggedReviews: number
  responseRate: number
  recentActivity: {
    reviewsToday: number
    reviewsThisWeek: number
    reviewsThisMonth: number
  }
  topRatedServices: Array<{
    serviceType: string
    averageRating: number
    reviewCount: number
  }>
  ratingTrends: Array<{
    month: string
    averageRating: number
    reviewCount: number
  }>
}

export interface ReviewReport {
  id: string
  reviewId: string
  reporterId: string
  reporterType: 'user' | 'escort' | 'agency'
  reason: 'inappropriate' | 'fake' | 'spam' | 'harassment' | 'other'
  description: string
  evidence?: string[]
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed'
  adminNotes?: string
  createdAt: string
  updatedAt: string
}

export interface ReviewReportRequest {
  reviewId: string
  reason: 'inappropriate' | 'fake' | 'spam' | 'harassment' | 'other'
  description: string
  evidence?: File[]
}

export interface ReviewHelpfulVote {
  id: string
  reviewId: string
  userId: string
  isHelpful: boolean
  createdAt: string
}

export interface ReviewHelpfulVoteRequest {
  reviewId: string
  isHelpful: boolean
}

export interface EscortReviewSummary {
  escortId: string
  escortName: string
  escortAvatar?: string
  averageRating: number
  totalReviews: number
  verifiedReviews: number
  recentReviews: Review[]
  ratingBreakdown: {
    fiveStar: number
    fourStar: number
    threeStar: number
    twoStar: number
    oneStar: number
  }
  serviceRatings: {
    serviceQuality: number
    communication: number
    punctuality: number
    valueForMoney: number
    overallExperience: number
  }
  responseRate: number
  lastReviewDate?: string
}

export interface AgencyReviewSummary {
  agencyId: string
  agencyName: string
  agencyAvatar?: string
  averageRating: number
  totalReviews: number
  verifiedReviews: number
  escortReviews: EscortReviewSummary[]
  ratingBreakdown: {
    fiveStar: number
    fourStar: number
    threeStar: number
    twoStar: number
    oneStar: number
  }
  responseRate: number
  lastReviewDate?: string
}

export interface ReviewTemplate {
  id: string
  name: string
  category: 'positive' | 'negative' | 'neutral' | 'service_specific'
  content: string
  tags: string[]
  isDefault: boolean
  usageCount: number
  createdAt: string
  updatedAt: string
}

export interface ReviewAnalytics {
  overallStats: {
    totalReviews: number
    averageRating: number
    responseRate: number
    verifiedRate: number
  }
  trends: {
    monthlyReviews: Array<{
      month: string
      count: number
      averageRating: number
    }>
    ratingDistribution: {
      fiveStar: number
      fourStar: number
      threeStar: number
      twoStar: number
      oneStar: number
    }
  }
  topPerformers: {
    escorts: EscortReviewSummary[]
    agencies: AgencyReviewSummary[]
  }
  issues: {
    flaggedReviews: number
    pendingReports: number
    lowRatedServices: Array<{
      serviceType: string
      averageRating: number
      reviewCount: number
    }>
  }
} 