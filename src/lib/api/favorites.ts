import { apiClient } from './client'
import type { Favorite, FavoriteList, FavoriteRequest, FavoriteUpdate, FavoriteStats, FavoriteSearch, FavoriteSearchResult, FavoriteNotification, FavoriteAlert, FavoriteShare, FavoriteAnalytics, FavoriteTemplate, FavoriteImport, FavoriteExport, FavoriteSync, FavoriteBackup, FavoriteRestore, FavoritePrivacy, FavoriteSettings } from '@/types/favorites'

// Favorites Management
export const favorites = {
  // Get user's favorites
  list: async (page = 1, limit = 20): Promise<{ success: boolean; favorites: Favorite[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return apiClient.get(`/favorites?${params}`)
  },

  // Get a specific favorite
  get: async (favoriteId: string): Promise<{ success: boolean; favorite: Favorite }> => {
    return apiClient.get(`/favorites/${favoriteId}`)
  },

  // Add to favorites
  add: async (data: FavoriteRequest): Promise<{ success: boolean; favorite: Favorite }> => {
    return apiClient.post('/favorites', data)
  },

  // Update favorite
  update: async (favoriteId: string, updates: FavoriteUpdate): Promise<{ success: boolean; favorite: Favorite }> => {
    return apiClient.patch(`/favorites/${favoriteId}`, updates)
  },

  // Remove from favorites
  remove: async (favoriteId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/favorites/${favoriteId}`)
  },

  // Check if item is favorited
  isFavorited: async (targetId: string, targetType: 'escort' | 'agency'): Promise<{ success: boolean; isFavorited: boolean; favoriteId?: string }> => {
    const params = new URLSearchParams({
      targetId,
      targetType
    })
    return apiClient.get(`/favorites/check?${params}`)
  },

  // Toggle favorite status
  toggle: async (targetId: string, targetType: 'escort' | 'agency'): Promise<{ success: boolean; isFavorited: boolean; favorite?: Favorite }> => {
    return apiClient.post('/favorites/toggle', { targetId, targetType })
  }
}

// Favorite Lists
export const favoriteLists = {
  // Get user's favorite lists
  list: async (): Promise<{ success: boolean; lists: FavoriteList[] }> => {
    return apiClient.get('/favorites/lists')
  },

  // Get a specific list
  get: async (listId: string): Promise<{ success: boolean; list: FavoriteList }> => {
    return apiClient.get(`/favorites/lists/${listId}`)
  },

  // Create a new list
  create: async (data: Omit<FavoriteList, 'id' | 'favorites' | 'createdAt' | 'updatedAt' | 'viewCount' | 'shareCount'>): Promise<{ success: boolean; list: FavoriteList }> => {
    return apiClient.post('/favorites/lists', data)
  },

  // Update a list
  update: async (listId: string, updates: Partial<FavoriteList>): Promise<{ success: boolean; list: FavoriteList }> => {
    return apiClient.patch(`/favorites/lists/${listId}`, updates)
  },

  // Delete a list
  delete: async (listId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/favorites/lists/${listId}`)
  },

  // Add favorite to list
  addFavorite: async (listId: string, favoriteId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/favorites/lists/${listId}/favorites`, { favoriteId })
  },

  // Remove favorite from list
  removeFavorite: async (listId: string, favoriteId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/favorites/lists/${listId}/favorites/${favoriteId}`)
  },

  // Move favorite between lists
  moveFavorite: async (favoriteId: string, fromListId: string, toListId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/favorites/lists/move`, { favoriteId, fromListId, toListId })
  }
}

// Favorite Search
export const favoriteSearch = {
  // Search favorites
  search: async (searchParams: FavoriteSearch): Promise<FavoriteSearchResult> => {
    return apiClient.post('/favorites/search', searchParams)
  },

  // Get favorite suggestions
  getSuggestions: async (query: string): Promise<{ success: boolean; suggestions: string[] }> => {
    const params = new URLSearchParams({
      q: query
    })
    return apiClient.get(`/favorites/suggestions?${params}`)
  }
}

// Favorite Statistics
export const favoriteStats = {
  // Get favorite statistics
  getStats: async (): Promise<{ success: boolean; stats: FavoriteStats }> => {
    return apiClient.get('/favorites/stats')
  },

  // Get favorite analytics
  getAnalytics: async (period: 'week' | 'month' | 'year' = 'month'): Promise<{ success: boolean; analytics: FavoriteAnalytics }> => {
    return apiClient.get(`/favorites/analytics?period=${period}`)
  }
}

// Favorite Notifications
export const favoriteNotifications = {
  // Get favorite notifications
  list: async (page = 1, limit = 20): Promise<{ success: boolean; notifications: FavoriteNotification[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return apiClient.get(`/favorites/notifications?${params}`)
  },

  // Mark notification as read
  markAsRead: async (notificationId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/favorites/notifications/${notificationId}/read`)
  },

  // Mark all notifications as read
  markAllAsRead: async (): Promise<{ success: boolean }> => {
    return apiClient.post('/favorites/notifications/read-all')
  },

  // Get unread count
  getUnreadCount: async (): Promise<{ success: boolean; count: number }> => {
    return apiClient.get('/favorites/notifications/unread-count')
  }
}

// Favorite Alerts
export const favoriteAlerts = {
  // Get favorite alerts
  list: async (page = 1, limit = 20): Promise<{ success: boolean; alerts: FavoriteAlert[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return apiClient.get(`/favorites/alerts?${params}`)
  },

  // Create alert
  create: async (alert: Omit<FavoriteAlert, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; alert: FavoriteAlert }> => {
    return apiClient.post('/favorites/alerts', alert)
  },

  // Update alert
  update: async (alertId: string, updates: Partial<FavoriteAlert>): Promise<{ success: boolean; alert: FavoriteAlert }> => {
    return apiClient.patch(`/favorites/alerts/${alertId}`, updates)
  },

  // Delete alert
  delete: async (alertId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/favorites/alerts/${alertId}`)
  },

  // Toggle alert status
  toggleStatus: async (alertId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/favorites/alerts/${alertId}/toggle`)
  }
}

// Favorite Sharing
export const favoriteSharing = {
  // Share a list
  share: async (listId: string, shareType: 'public' | 'private' | 'temporary'): Promise<{ success: boolean; share: FavoriteShare }> => {
    return apiClient.post(`/favorites/lists/${listId}/share`, { shareType })
  },

  // Get shared list
  getShared: async (shareCode: string): Promise<{ success: boolean; list: FavoriteList }> => {
    return apiClient.get(`/favorites/shared/${shareCode}`)
  },

  // Update share settings
  updateShare: async (shareId: string, updates: Partial<FavoriteShare>): Promise<{ success: boolean; share: FavoriteShare }> => {
    return apiClient.patch(`/favorites/shares/${shareId}`, updates)
  },

  // Delete share
  deleteShare: async (shareId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/favorites/shares/${shareId}`)
  }
}

// Favorite Templates
export const favoriteTemplates = {
  // Get favorite templates
  list: async (): Promise<{ success: boolean; templates: FavoriteTemplate[] }> => {
    return apiClient.get('/favorites/templates')
  },

  // Get template details
  get: async (templateId: string): Promise<{ success: boolean; template: FavoriteTemplate }> => {
    return apiClient.get(`/favorites/templates/${templateId}`)
  },

  // Create template from favorites
  createFromFavorites: async (data: Omit<FavoriteTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; template: FavoriteTemplate }> => {
    return apiClient.post('/favorites/templates', data)
  },

  // Apply template
  apply: async (templateId: string, listId?: string): Promise<{ success: boolean; addedCount: number }> => {
    return apiClient.post(`/favorites/templates/${templateId}/apply`, { listId })
  }
}

// Favorite Import/Export
export const favoriteImportExport = {
  // Import favorites
  import: async (file: File, format: 'json' | 'csv'): Promise<{ success: boolean; import: FavoriteImport }> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('format', format)
    return apiClient.post('/favorites/import', formData)
  },

  // Export favorites
  export: async (format: 'json' | 'csv' | 'pdf', filters?: any): Promise<{ success: boolean; export: FavoriteExport }> => {
    return apiClient.post('/favorites/export', { format, filters })
  },

  // Get import status
  getImportStatus: async (importId: string): Promise<{ success: boolean; import: FavoriteImport }> => {
    return apiClient.get(`/favorites/import/${importId}`)
  },

  // Get export status
  getExportStatus: async (exportId: string): Promise<{ success: boolean; export: FavoriteExport }> => {
    return apiClient.get(`/favorites/export/${exportId}`)
  }
}

// Favorite Sync
export const favoriteSync = {
  // Get sync status
  getStatus: async (): Promise<{ success: boolean; sync: FavoriteSync }> => {
    return apiClient.get('/favorites/sync/status')
  },

  // Sync favorites
  sync: async (): Promise<{ success: boolean; changes: FavoriteSync['changes'] }> => {
    return apiClient.post('/favorites/sync')
  },

  // Resolve sync conflicts
  resolveConflicts: async (resolutions: Array<{ favoriteId: string; resolution: string }>): Promise<{ success: boolean }> => {
    return apiClient.post('/favorites/sync/resolve', { resolutions })
  }
}

// Favorite Backup/Restore
export const favoriteBackupRestore = {
  // Create backup
  createBackup: async (backupType: 'auto' | 'manual' = 'manual'): Promise<{ success: boolean; backup: FavoriteBackup }> => {
    return apiClient.post('/favorites/backup', { backupType })
  },

  // Get backups
  listBackups: async (): Promise<{ success: boolean; backups: FavoriteBackup[] }> => {
    return apiClient.get('/favorites/backup')
  },

  // Restore from backup
  restore: async (backupId: string): Promise<{ success: boolean; restore: FavoriteRestore }> => {
    return apiClient.post('/favorites/restore', { backupId })
  },

  // Get restore status
  getRestoreStatus: async (restoreId: string): Promise<{ success: boolean; restore: FavoriteRestore }> => {
    return apiClient.get(`/favorites/restore/${restoreId}`)
  },

  // Delete backup
  deleteBackup: async (backupId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/favorites/backup/${backupId}`)
  }
}

// Favorite Privacy
export const favoritePrivacy = {
  // Get privacy settings
  getSettings: async (): Promise<{ success: boolean; privacy: FavoritePrivacy }> => {
    return apiClient.get('/favorites/privacy')
  },

  // Update privacy settings
  updateSettings: async (settings: Partial<FavoritePrivacy>): Promise<{ success: boolean; privacy: FavoritePrivacy }> => {
    return apiClient.patch('/favorites/privacy', settings)
  }
}

// Favorite Settings
export const favoriteSettings = {
  // Get settings
  get: async (): Promise<{ success: boolean; settings: FavoriteSettings }> => {
    return apiClient.get('/favorites/settings')
  },

  // Update settings
  update: async (settings: Partial<FavoriteSettings>): Promise<{ success: boolean; settings: FavoriteSettings }> => {
    return apiClient.patch('/favorites/settings', settings)
  },

  // Reset settings
  reset: async (): Promise<{ success: boolean }> => {
    return apiClient.post('/favorites/settings/reset')
  }
}

// Export all favorite functions
export const favoriteSystem = {
  favorites,
  favoriteLists,
  favoriteSearch,
  favoriteStats,
  favoriteNotifications,
  favoriteAlerts,
  favoriteSharing,
  favoriteTemplates,
  favoriteImportExport,
  favoriteSync,
  favoriteBackupRestore,
  favoritePrivacy,
  favoriteSettings
} 