export interface Favorite {
  id: string
  userId: string
  targetId: string
  targetType: 'escort' | 'agency'
  targetName: string
  targetImage: string
  targetLocation: string
  targetRating: number
  targetPrice: number
  targetServices: string[]
  isAvailable: boolean
  isVerified: boolean
  isPremium: boolean
  notes?: string
  tags: string[]
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  updatedAt: string
  lastViewed?: string
  viewCount: number
  contactCount: number
  bookingCount: number
}

export interface FavoriteList {
  id: string
  userId: string
  name: string
  description?: string
  isPublic: boolean
  isDefault: boolean
  color?: string
  icon?: string
  favorites: Favorite[]
  createdAt: string
  updatedAt: string
  viewCount: number
  shareCount: number
  metadata?: {
    totalFavorites: number
    averageRating: number
    averagePrice: number
    topServices: string[]
    topLocations: string[]
  }
}

export interface FavoriteRequest {
  targetId: string
  targetType: 'escort' | 'agency'
  listId?: string
  notes?: string
  tags?: string[]
  priority?: 'low' | 'medium' | 'high'
}

export interface FavoriteUpdate {
  notes?: string
  tags?: string[]
  priority?: 'low' | 'medium' | 'high'
  listId?: string
}

export interface FavoriteStats {
  totalFavorites: number
  totalLists: number
  publicLists: number
  privateLists: number
  mostViewedFavorites: Array<{
    favoriteId: string
    targetName: string
    viewCount: number
  }>
  mostContactedFavorites: Array<{
    favoriteId: string
    targetName: string
    contactCount: number
  }>
  mostBookedFavorites: Array<{
    favoriteId: string
    targetName: string
    bookingCount: number
  }>
  topServices: Array<{
    service: string
    count: number
  }>
  topLocations: Array<{
    location: string
    count: number
  }>
  averageRating: number
  averagePrice: number
  monthlyStats: Array<{
    month: string
    favoritesAdded: number
    favoritesRemoved: number
    views: number
    contacts: number
    bookings: number
  }>
}

export interface FavoriteSearch {
  query: string
  listId?: string
  tags?: string[]
  priority?: 'low' | 'medium' | 'high'
  isAvailable?: boolean
  isVerified?: boolean
  isPremium?: boolean
  priceRange?: {
    min: number
    max: number
  }
  rating?: number
  services?: string[]
  location?: string
  sortBy: 'name' | 'rating' | 'price' | 'date_added' | 'last_viewed' | 'view_count'
  sortOrder: 'asc' | 'desc'
  page: number
  limit: number
}

export interface FavoriteSearchResult {
  favorites: Favorite[]
  total: number
  page: number
  limit: number
  hasMore: boolean
  stats: {
    total: number
    available: number
    verified: number
    premium: number
  }
}

export interface FavoriteNotification {
  id: string
  userId: string
  favoriteId: string
  type: 'availability_update' | 'price_change' | 'new_review' | 'new_photo' | 'status_change'
  title: string
  message: string
  data?: {
    oldPrice?: number
    newPrice?: number
    oldStatus?: string
    newStatus?: string
    reviewRating?: number
    photoCount?: number
  }
  read: boolean
  createdAt: string
}

export interface FavoriteAlert {
  id: string
  userId: string
  favoriteId: string
  type: 'price_drop' | 'availability' | 'new_review' | 'new_photo'
  condition: {
    priceThreshold?: number
    availabilityStatus?: boolean
    reviewThreshold?: number
  }
  isActive: boolean
  lastTriggered?: string
  triggerCount: number
  createdAt: string
  updatedAt: string
}

export interface FavoriteShare {
  id: string
  userId: string
  listId: string
  shareType: 'public' | 'private' | 'temporary'
  shareCode?: string
  expiresAt?: string
  viewCount: number
  createdAt: string
  updatedAt: string
}

export interface FavoriteAnalytics {
  overallStats: {
    totalFavorites: number
    totalLists: number
    averageFavoritesPerList: number
    mostPopularList: string
    averageRating: number
    averagePrice: number
  }
  trends: {
    dailyFavorites: Array<{
      date: string
      added: number
      removed: number
      views: number
    }>
    monthlyFavorites: Array<{
      month: string
      added: number
      removed: number
      views: number
    }>
    serviceTrends: Array<{
      service: string
      favorites: number
      growth: number
    }>
  }
  performance: {
    topFavorites: Array<{
      favoriteId: string
      targetName: string
      views: number
      contacts: number
      bookings: number
    }>
    topLists: Array<{
      listId: string
      listName: string
      favorites: number
      views: number
      shares: number
    }>
    topServices: Array<{
      service: string
      favorites: number
      averageRating: number
    }>
    topLocations: Array<{
      location: string
      favorites: number
      averagePrice: number
    }>
  }
  engagement: {
    totalViews: number
    totalContacts: number
    totalBookings: number
    averageViewsPerFavorite: number
    conversionRate: number
    mostEngagedFavorites: Array<{
      favoriteId: string
      targetName: string
      engagementScore: number
    }>
  }
}

export interface FavoriteTemplate {
  id: string
  name: string
  description: string
  category: string
  isPublic: boolean
  createdBy: string
  favorites: Array<{
    targetId: string
    targetType: 'escort' | 'agency'
    notes?: string
    tags?: string[]
    priority?: 'low' | 'medium' | 'high'
  }>
  usageCount: number
  rating: number
  createdAt: string
  updatedAt: string
}

export interface FavoriteImport {
  id: string
  userId: string
  source: 'file' | 'url' | 'api'
  filename?: string
  url?: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  totalItems: number
  importedItems: number
  failedItems: number
  errors: string[]
  createdAt: string
  completedAt?: string
}

export interface FavoriteExport {
  id: string
  userId: string
  format: 'json' | 'csv' | 'pdf'
  filters?: {
    listId?: string
    tags?: string[]
    dateRange?: {
      start: string
      end: string
    }
  }
  status: 'pending' | 'processing' | 'completed' | 'failed'
  downloadUrl?: string
  expiresAt?: string
  createdAt: string
  completedAt?: string
}

export interface FavoriteSync {
  id: string
  userId: string
  deviceId: string
  deviceName: string
  lastSync: string
  syncStatus: 'synced' | 'pending' | 'conflict'
  changes: {
    added: number
    updated: number
    deleted: number
  }
  createdAt: string
  updatedAt: string
}

export interface FavoriteBackup {
  id: string
  userId: string
  backupType: 'auto' | 'manual'
  filename: string
  size: number
  favoritesCount: number
  listsCount: number
  downloadUrl?: string
  expiresAt?: string
  createdAt: string
}

export interface FavoriteRestore {
  id: string
  userId: string
  backupId: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  conflicts: Array<{
    favoriteId: string
    conflictType: 'duplicate' | 'modified' | 'deleted'
    resolution: 'keep_existing' | 'use_backup' | 'merge'
  }>
  restoredItems: number
  errors: string[]
  createdAt: string
  completedAt?: string
}

export interface FavoritePrivacy {
  userId: string
  showFavorites: 'public' | 'friends' | 'private'
  showLists: 'public' | 'friends' | 'private'
  allowSharing: boolean
  allowAnalytics: boolean
  showOnlineStatus: boolean
  showLastViewed: boolean
  showViewCount: boolean
  showContactCount: boolean
  showBookingCount: boolean
  createdAt: string
  updatedAt: string
}

export interface FavoriteSettings {
  userId: string
  defaultListId?: string
  autoAddToList: boolean
  defaultPriority: 'low' | 'medium' | 'high'
  defaultTags: string[]
  notifications: {
    availabilityUpdates: boolean
    priceChanges: boolean
    newReviews: boolean
    newPhotos: boolean
    listShares: boolean
  }
  display: {
    viewMode: 'grid' | 'list' | 'compact'
    sortBy: 'name' | 'rating' | 'price' | 'date_added' | 'last_viewed'
    sortOrder: 'asc' | 'desc'
    itemsPerPage: number
  }
  sync: {
    autoSync: boolean
    syncInterval: number
    syncOnChange: boolean
  }
  backup: {
    autoBackup: boolean
    backupInterval: number
    keepBackups: number
  }
  createdAt: string
  updatedAt: string
} 