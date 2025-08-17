export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderType: 'user' | 'escort' | 'agency'
  senderName: string
  senderAvatar?: string
  content: string
  messageType: 'text' | 'image' | 'file' | 'location' | 'booking_request'
  attachments?: MessageAttachment[]
  timestamp: string
  readAt?: string
  deliveredAt?: string
  isEdited: boolean
  editedAt?: string
  isDeleted: boolean
  deletedAt?: string
  metadata?: {
    bookingId?: string
    location?: {
      lat: number
      lng: number
      address: string
    }
    fileInfo?: {
      name: string
      size: number
      type: string
      url: string
    }
  }
}

export interface MessageAttachment {
  id: string
  type: 'image' | 'file' | 'audio' | 'video'
  url: string
  name: string
  size: number
  mimeType: string
  thumbnailUrl?: string
  duration?: number // for audio/video
  width?: number // for images/videos
  height?: number // for images/videos
}

export interface Conversation {
  id: string
  participants: ConversationParticipant[]
  lastMessage?: Message
  unreadCount: number
  createdAt: string
  updatedAt: string
  isActive: boolean
  isBlocked: boolean
  blockedBy?: string
  blockedAt?: string
  metadata?: {
    bookingId?: string
    serviceType?: string
    location?: string
    totalMessages: number
    lastActivity: string
  }
}

export interface ConversationParticipant {
  id: string
  type: 'user' | 'escort' | 'agency'
  name: string
  avatar?: string
  isOnline: boolean
  lastSeen?: string
  isTyping: boolean
  typingStartedAt?: string
}

export interface ChatRoom {
  id: string
  conversationId: string
  participants: ConversationParticipant[]
  messages: Message[]
  unreadCount: number
  isActive: boolean
  lastActivity: string
  settings: ChatSettings
}

export interface ChatSettings {
  notifications: boolean
  soundEnabled: boolean
  readReceipts: boolean
  typingIndicators: boolean
  messageRetention: number // days
  autoArchive: boolean
  theme: 'light' | 'dark' | 'auto'
}

export interface MessageRequest {
  conversationId: string
  content: string
  messageType: 'text' | 'image' | 'file' | 'location' | 'booking_request'
  attachments?: File[]
  metadata?: {
    bookingId?: string
    location?: {
      lat: number
      lng: number
      address: string
    }
  }
}

export interface ConversationRequest {
  participantIds: string[]
  participantTypes: ('user' | 'escort' | 'agency')[]
  initialMessage?: string
  metadata?: {
    bookingId?: string
    serviceType?: string
    location?: string
  }
}

export interface MessageResponse {
  success: boolean
  message: Message
  conversation?: Conversation
  error?: string
}

export interface ConversationResponse {
  success: boolean
  conversation: Conversation
  messages: Message[]
  error?: string
}

export interface ConversationsListResponse {
  success: boolean
  conversations: Conversation[]
  totalCount: number
  hasMore: boolean
  error?: string
}

export interface TypingStatus {
  conversationId: string
  userId: string
  isTyping: boolean
  timestamp: string
}

export interface ReadReceipt {
  messageId: string
  conversationId: string
  readBy: string
  readAt: string
}

export interface MessageSearchRequest {
  conversationId?: string
  query: string
  fromDate?: string
  toDate?: string
  messageType?: 'text' | 'image' | 'file' | 'location' | 'booking_request'
  limit?: number
  offset?: number
}

export interface MessageSearchResponse {
  success: boolean
  messages: Message[]
  totalCount: number
  hasMore: boolean
  error?: string
}

export interface ChatNotification {
  id: string
  type: 'new_message' | 'typing' | 'read_receipt' | 'conversation_update'
  conversationId: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  isRead: boolean
  metadata?: {
    messageId?: string
    unreadCount?: number
  }
}

export interface ChatStats {
  totalConversations: number
  totalMessages: number
  unreadMessages: number
  activeConversations: number
  averageResponseTime: number // minutes
  messagesToday: number
  messagesThisWeek: number
  messagesThisMonth: number
}

// Real-time events
export interface ChatEvent {
  type: 'message_sent' | 'message_received' | 'typing_started' | 'typing_stopped' | 'read_receipt' | 'user_online' | 'user_offline'
  data: any
  timestamp: string
}

// Message templates for quick responses
export interface MessageTemplate {
  id: string
  name: string
  content: string
  category: 'greeting' | 'booking' | 'pricing' | 'availability' | 'custom'
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

// Chat filters and sorting
export interface ChatFilters {
  status?: 'all' | 'unread' | 'archived' | 'blocked'
  participantType?: 'user' | 'escort' | 'agency'
  dateRange?: {
    from: string
    to: string
  }
  hasAttachments?: boolean
  messageType?: 'text' | 'image' | 'file' | 'location' | 'booking_request'
}

export interface ChatSortOptions {
  field: 'lastMessage' | 'unreadCount' | 'createdAt' | 'participantName'
  order: 'asc' | 'desc'
} 