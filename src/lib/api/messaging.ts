import { apiClient } from './client'
import type { Message, Conversation, MessageRequest, ConversationRequest, MessageResponse, ConversationResponse, ConversationsListResponse, MessageSearchRequest, MessageSearchResponse, ChatNotification, ChatStats, MessageTemplate, ChatFilters, ChatSortOptions } from '@/types/messaging'

// Conversations
export const conversations = {
  // Get all conversations for the current user
  list: async (filters?: ChatFilters, sort?: ChatSortOptions, page = 1, limit = 20): Promise<ConversationsListResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.participantType && { participantType: filters.participantType }),
      ...(filters?.dateRange && { 
        fromDate: filters.dateRange.from,
        toDate: filters.dateRange.to 
      }),
      ...(filters?.hasAttachments && { hasAttachments: filters.hasAttachments.toString() }),
      ...(filters?.messageType && { messageType: filters.messageType }),
      ...(sort && { 
        sortField: sort.field,
        sortOrder: sort.order 
      })
    })

    return apiClient.get(`/conversations?${params}`)
  },

  // Get a specific conversation with messages
  get: async (conversationId: string, page = 1, limit = 50): Promise<ConversationResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    return apiClient.get(`/conversations/${conversationId}?${params}`)
  },

  // Create a new conversation
  create: async (data: ConversationRequest): Promise<ConversationResponse> => {
    return apiClient.post('/conversations', data)
  },

  // Update conversation settings
  update: async (conversationId: string, updates: Partial<Conversation>): Promise<ConversationResponse> => {
    return apiClient.patch(`/conversations/${conversationId}`, updates)
  },

  // Archive a conversation
  archive: async (conversationId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/conversations/${conversationId}/archive`)
  },

  // Unarchive a conversation
  unarchive: async (conversationId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/conversations/${conversationId}/unarchive`)
  },

  // Block a conversation
  block: async (conversationId: string, reason?: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/conversations/${conversationId}/block`, { reason })
  },

  // Unblock a conversation
  unblock: async (conversationId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/conversations/${conversationId}/unblock`)
  },

  // Delete a conversation
  delete: async (conversationId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/conversations/${conversationId}`)
  },

  // Mark conversation as read
  markAsRead: async (conversationId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/conversations/${conversationId}/read`)
  },

  // Get conversation stats
  getStats: async (conversationId: string): Promise<{ success: boolean; stats: any }> => {
    return apiClient.get(`/conversations/${conversationId}/stats`)
  }
}

// Messages
export const messages = {
  // Send a new message
  send: async (data: MessageRequest): Promise<MessageResponse> => {
    const formData = new FormData()
    formData.append('conversationId', data.conversationId)
    formData.append('content', data.content)
    formData.append('messageType', data.messageType)
    
    if (data.attachments) {
      data.attachments.forEach((file, index) => {
        formData.append(`attachments`, file)
      })
    }
    
    if (data.metadata) {
      formData.append('metadata', JSON.stringify(data.metadata))
    }

    return apiClient.post('/messages', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  // Get messages for a conversation
  list: async (conversationId: string, page = 1, limit = 50): Promise<{ success: boolean; messages: Message[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    return apiClient.get(`/conversations/${conversationId}/messages?${params}`)
  },

  // Get a specific message
  get: async (messageId: string): Promise<{ success: boolean; message: Message }> => {
    return apiClient.get(`/messages/${messageId}`)
  },

  // Edit a message
  edit: async (messageId: string, content: string): Promise<MessageResponse> => {
    return apiClient.patch(`/messages/${messageId}`, { content })
  },

  // Delete a message
  delete: async (messageId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/messages/${messageId}`)
  },

  // Mark message as read
  markAsRead: async (messageId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/messages/${messageId}/read`)
  },

  // Search messages
  search: async (data: MessageSearchRequest): Promise<MessageSearchResponse> => {
    const params = new URLSearchParams({
      query: data.query,
      ...(data.conversationId && { conversationId: data.conversationId }),
      ...(data.fromDate && { fromDate: data.fromDate }),
      ...(data.toDate && { toDate: data.toDate }),
      ...(data.messageType && { messageType: data.messageType }),
      ...(data.limit && { limit: data.limit.toString() }),
      ...(data.offset && { offset: data.offset.toString() })
    })

    return apiClient.get(`/messages/search?${params}`)
  },

}

// Real-time features
export const realtime = {
  // Send typing status
  sendTyping: async (conversationId: string, isTyping: boolean): Promise<{ success: boolean }> => {
    return apiClient.post(`/realtime/typing`, {
      conversationId,
      isTyping
    })
  },

  // Send read receipt
  sendReadReceipt: async (messageId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/realtime/read-receipt`, {
      messageId
    })
  },

  // Get online status
  getOnlineStatus: async (userId: string): Promise<{ success: boolean; isOnline: boolean; lastSeen?: string }> => {
    return apiClient.get(`/realtime/status/${userId}`)
  },

  // Subscribe to conversation updates
  subscribe: async (conversationId: string): Promise<{ success: boolean; subscriptionId: string }> => {
    return apiClient.post(`/realtime/subscribe`, {
      conversationId
    })
  },

  // Unsubscribe from conversation updates
  unsubscribe: async (subscriptionId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/realtime/unsubscribe`, {
      subscriptionId
    })
  }
}

// Notifications
export const notifications = {
  // Get chat notifications
  list: async (page = 1, limit = 20): Promise<{ success: boolean; notifications: ChatNotification[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    return apiClient.get(`/notifications/chat?${params}`)
  },

  // Mark notification as read
  markAsRead: async (notificationId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/notifications/${notificationId}/read`)
  },

  // Mark all notifications as read
  markAllAsRead: async (): Promise<{ success: boolean }> => {
    return apiClient.post('/notifications/mark-all-read')
  },

  // Get unread count
  getUnreadCount: async (): Promise<{ success: boolean; count: number }> => {
    return apiClient.get('/notifications/unread-count')
  },

  // Update notification settings
  updateSettings: async (settings: {
    email: boolean
    push: boolean
    sms: boolean
    sound: boolean
  }): Promise<{ success: boolean }> => {
    return apiClient.patch('/notifications/settings', settings)
  }
}

// Message templates
export const templates = {
  // Get message templates
  list: async (category?: string): Promise<{ success: boolean; templates: MessageTemplate[] }> => {
    const params = category ? `?category=${category}` : ''
    return apiClient.get(`/templates${params}`)
  },

  // Create a new template
  create: async (data: Omit<MessageTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; template: MessageTemplate }> => {
    return apiClient.post('/templates', data)
  },

  // Update a template
  update: async (templateId: string, updates: Partial<MessageTemplate>): Promise<{ success: boolean; template: MessageTemplate }> => {
    return apiClient.patch(`/templates/${templateId}`, updates)
  },

  // Delete a template
  delete: async (templateId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/templates/${templateId}`)
  }
}

// Chat analytics and stats
export const analytics = {
  // Get chat statistics
  getStats: async (): Promise<{ success: boolean; stats: ChatStats }> => {
    return apiClient.get('/analytics/chat-stats')
  },

  // Get conversation analytics
  getConversationStats: async (conversationId: string, period: 'day' | 'week' | 'month' = 'week'): Promise<{ success: boolean; stats: any }> => {
    return apiClient.get(`/analytics/conversations/${conversationId}?period=${period}`)
  },

  // Get response time analytics
  getResponseTimeStats: async (period: 'day' | 'week' | 'month' = 'week'): Promise<{ success: boolean; stats: any }> => {
    return apiClient.get(`/analytics/response-time?period=${period}`)
  },

  // Get message volume analytics
  getMessageVolumeStats: async (period: 'day' | 'week' | 'month' = 'week'): Promise<{ success: boolean; stats: any }> => {
    return apiClient.get(`/analytics/message-volume?period=${period}`)
  }
}

// Export all messaging functions
export const messaging = {
  conversations,
  messages,
  realtime,
  notifications,
  templates,
  analytics
} 