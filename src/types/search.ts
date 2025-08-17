export interface SearchFilters {
  location: string
  city: string
  state: string
  priceRange: [number, number]
  rating: number
  ageRange: [number, number]
  services: string[]
  availability: string[]
  verificationStatus: string[]
  planType: string[]
  sortBy: 'relevance' | 'rating' | 'price_low' | 'price_high' | 'newest' | 'popular'
  viewMode: 'grid' | 'list'
  isUrgent?: boolean
  isOvernight?: boolean
  isOutcall?: boolean
  isIncall?: boolean
  languages?: string[]
  bodyType?: string[]
  hairColor?: string[]
  eyeColor?: string[]
  height?: string[]
  education?: string[]
  interests?: string[]
}

export interface SearchRequest {
  query: string
  filters: SearchFilters
  page: number
  limit: number
  userType: 'client' | 'escort' | 'agency'
  location?: {
    latitude: number
    longitude: number
    radius: number
  }
}

export interface SearchResult {
  id: string
  type: 'escort' | 'agency'
  name: string
  image: string
  rating: number
  reviewCount: number
  price: number
  location: string
  city: string
  state: string
  services: string[]
  isVerified: boolean
  isPremium: boolean
  isAvailable: boolean
  availability: string[]
  languages: string[]
  age: number
  height?: string
  bodyType?: string
  hairColor?: string
  eyeColor?: string
  education?: string
  interests?: string[]
  description: string
  gallery: string[]
  featured: boolean
  responseTime: number
  completionRate: number
  cancellationRate: number
  totalBookings: number
  lastActive: string
  joinDate: string
  metadata?: {
    specializations?: string[]
    certifications?: string[]
    awards?: string[]
    media?: {
      videos?: string[]
      socialMedia?: string[]
    }
  }
}

export interface SearchResponse {
  success: boolean
  results: SearchResult[]
  total: number
  page: number
  limit: number
  hasMore: boolean
  suggestions: string[]
  filters: {
    availableServices: Array<{
      service: string
      count: number
    }>
    availableLocations: Array<{
      location: string
      count: number
    }>
    priceRanges: Array<{
      range: string
      count: number
    }>
    ratings: Array<{
      rating: number
      count: number
    }>
  }
  stats: {
    totalResults: number
    averagePrice: number
    averageRating: number
    verifiedCount: number
    premiumCount: number
    availableCount: number
  }
}

export interface SearchSuggestion {
  id: string
  type: 'escort' | 'agency' | 'service' | 'location'
  name: string
  description?: string
  image?: string
  relevance: number
}

export interface SearchHistory {
  id: string
  userId: string
  query: string
  filters: SearchFilters
  resultsCount: number
  timestamp: string
  clickedResults: string[]
}

export interface SearchAnalytics {
  totalSearches: number
  averageResultsPerSearch: number
  mostSearchedTerms: Array<{
    term: string
    count: number
  }>
  popularFilters: Array<{
    filter: string
    value: string
    count: number
  }>
  searchTrends: Array<{
    date: string
    searches: number
    results: number
  }>
  topSearchedLocations: Array<{
    location: string
    searches: number
  }>
  topSearchedServices: Array<{
    service: string
    searches: number
  }>
}

export interface LocationSearch {
  id: string
  name: string
  type: 'city' | 'area' | 'landmark'
  city: string
  state: string
  country: string
  coordinates?: {
    latitude: number
    longitude: number
  }
  escortCount: number
  agencyCount: number
  averagePrice: number
  averageRating: number
  isPopular: boolean
  isSafe: boolean
  safetyRating?: number
  description?: string
  images?: string[]
}

export interface ServiceSearch {
  id: string
  name: string
  category: string
  description: string
  price: number
  duration: number
  isPopular: boolean
  escortCount: number
  averageRating: number
  requiresVerification?: boolean
  maxDuration?: number
  minDuration?: number
  metadata?: {
    includes?: string[]
    excludes?: string[]
    requirements?: string[]
    restrictions?: string[]
  }
}

export interface SearchPreferences {
  userId: string
  defaultLocation: string
  defaultServices: string[]
  priceRange: [number, number]
  preferredRating: number
  showVerifiedOnly: boolean
  showPremiumOnly: boolean
  sortBy: 'relevance' | 'rating' | 'price_low' | 'price_high' | 'newest' | 'popular'
  viewMode: 'grid' | 'list'
  notifications: {
    newEscorts: boolean
    priceChanges: boolean
    availabilityUpdates: boolean
  }
  privacy: {
    saveSearchHistory: boolean
    shareSearchData: boolean
    showOnlineStatus: boolean
  }
  createdAt: string
  updatedAt: string
}

export interface SearchNotification {
  id: string
  userId: string
  type: 'new_escort' | 'price_change' | 'availability_update' | 'search_alert'
  title: string
  message: string
  data?: {
    escortId?: string
    serviceId?: string
    locationId?: string
    oldPrice?: number
    newPrice?: number
    searchQuery?: string
  }
  read: boolean
  createdAt: string
}

export interface SearchAlert {
  id: string
  userId: string
  name: string
  query: string
  filters: SearchFilters
  frequency: 'daily' | 'weekly' | 'monthly'
  isActive: boolean
  lastTriggered?: string
  nextTrigger?: string
  resultsCount: number
  createdAt: string
  updatedAt: string
}

export interface SearchRecommendation {
  id: string
  userId: string
  type: 'based_on_history' | 'based_on_preferences' | 'trending' | 'similar_users'
  escortId: string
  escortName: string
  escortImage: string
  reason: string
  confidence: number
  isViewed: boolean
  isClicked: boolean
  createdAt: string
}

export interface SearchFilter {
  id: string
  name: string
  type: 'text' | 'select' | 'multiselect' | 'range' | 'checkbox' | 'radio'
  options?: Array<{
    value: string
    label: string
    count?: number
  }>
  defaultValue?: any
  isRequired: boolean
  isAdvanced: boolean
  order: number
  category: string
  metadata?: {
    min?: number
    max?: number
    step?: number
    unit?: string
    placeholder?: string
  }
}

export interface SearchCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  escortCount: number
  averagePrice: number
  averageRating: number
  isPopular: boolean
  isActive: boolean
  order: number
  metadata?: {
    featured?: boolean
    specialOffer?: boolean
    discount?: number
  }
}

export interface SearchLocation {
  id: string
  name: string
  type: 'city' | 'area' | 'landmark' | 'hotel' | 'residence'
  city: string
  state: string
  country: string
  coordinates?: {
    latitude: number
    longitude: number
  }
  escortCount: number
  averagePrice: number
  averageRating: number
  isPopular: boolean
  isSafe: boolean
  safetyRating?: number
  description?: string
  images?: string[]
  amenities?: string[]
  accessibility?: {
    parking: boolean
    publicTransport: boolean
    wheelchair: boolean
  }
  createdAt: string
  updatedAt: string
}

export interface SearchTrend {
  id: string
  term: string
  type: 'search' | 'click' | 'booking'
  count: number
  period: 'day' | 'week' | 'month'
  date: string
  growth: number
  category?: string
  location?: string
  metadata?: {
    relatedTerms?: string[]
    topResults?: string[]
    averagePrice?: number
    averageRating?: number
  }
}

export interface SearchInsight {
  totalSearches: number
  uniqueSearchers: number
  averageSessionDuration: number
  bounceRate: number
  conversionRate: number
  topSearchTerms: Array<{
    term: string
    count: number
    conversionRate: number
  }>
  searchTrends: Array<{
    date: string
    searches: number
    conversions: number
  }>
  filterUsage: Array<{
    filter: string
    usageCount: number
    effectiveness: number
  }>
  locationInsights: Array<{
    location: string
    searches: number
    averagePrice: number
    conversionRate: number
  }>
  serviceInsights: Array<{
    service: string
    searches: number
    averagePrice: number
    conversionRate: number
  }>
} 