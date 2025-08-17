import type { Message, Conversation } from '@/types/messaging'

/**
 * Format message timestamp
 */
export function formatMessageTime(timestamp: string | Date): string {
  const messageDate = new Date(timestamp)
  const now = new Date()
  const diffInMs = now.getTime() - messageDate.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 1) {
    return 'Just now'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`
  } else {
    return messageDate.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: messageDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }
}

/**
 * Format message time for chat display
 */
export function formatChatTime(timestamp: string | Date): string {
  const messageDate = new Date(timestamp)
  const now = new Date()
  const isToday = messageDate.toDateString() === now.toDateString()
  const isYesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toDateString() === messageDate.toDateString()

  if (isToday) {
    return messageDate.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  } else if (isYesterday) {
    return 'Yesterday'
  } else {
    return messageDate.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric'
    })
  }
}

/**
 * Validate message content
 */
export function validateMessage(content: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!content.trim()) {
    errors.push('Message cannot be empty')
  }

  if (content.length > 1000) {
    errors.push('Message cannot exceed 1000 characters')
  }

  // Check for spam patterns
  const spamPatterns = [
    /\b(spam|scam|free|money|lottery|winner)\b/i,
    /(https?:\/\/[^\s]+)/g,
    /(\d{10,})/g // Long numbers
  ]

  spamPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      errors.push('Message contains potentially spam content')
    }
  })

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Sanitize message content
 */
export function sanitizeMessage(content: string): string {
  // Remove HTML tags
  let sanitized = content.replace(/<[^>]*>/g, '')
  
  // Remove excessive whitespace
  sanitized = sanitized.replace(/\s+/g, ' ').trim()
  
  // Limit length
  if (sanitized.length > 1000) {
    sanitized = sanitized.substring(0, 1000)
  }
  
  return sanitized
}

/**
 * Check if message contains sensitive content
 */
export function containsSensitiveContent(content: string): boolean {
  const sensitivePatterns = [
    /\b(phone|mobile|number|call|contact)\b/i,
    /\b(email|mail|gmail|yahoo|hotmail)\b/i,
    /\b(address|location|where|meet)\b/i,
    /\b(price|rate|cost|money|payment)\b/i,
    /\b(booking|appointment|schedule)\b/i
  ]

  return sensitivePatterns.some(pattern => pattern.test(content))
}

/**
 * Get conversation preview text
 */
export function getConversationPreview(messages: Message[], maxLength: number = 50): string {
  if (messages.length === 0) return 'No messages yet'

  const lastMessage = messages[messages.length - 1]
  let preview = lastMessage.content

  // Remove markdown formatting
  preview = preview.replace(/\*\*(.*?)\*\*/g, '$1') // Bold
  preview = preview.replace(/\*(.*?)\*/g, '$1') // Italic
  preview = preview.replace(/`(.*?)`/g, '$1') // Code
  preview = preview.replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links

  // Truncate if too long
  if (preview.length > maxLength) {
    preview = preview.substring(0, maxLength) + '...'
  }

  return preview
}

/**
 * Group messages by date
 */
export function groupMessagesByDate(messages: Message[]): Array<{
  date: string
  messages: Message[]
}> {
  const groups: Record<string, Message[]> = {}

  messages.forEach(message => {
    const date = new Date(message.timestamp).toDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(message)
  })

  return Object.entries(groups)
    .map(([date, messages]) => ({ date, messages }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

/**
 * Check if user is typing
 */
export function isUserTyping(typingUsers: string[], userId: string): boolean {
  return typingUsers.includes(userId)
}

/**
 * Get typing indicator text
 */
export function getTypingIndicator(typingUsers: string[], currentUserId: string): string {
  const otherTypingUsers = typingUsers.filter(id => id !== currentUserId)
  
  if (otherTypingUsers.length === 0) return ''
  if (otherTypingUsers.length === 1) return 'is typing...'
  if (otherTypingUsers.length === 2) return 'are typing...'
  return 'are typing...'
}

/**
 * Sort conversations by last message time
 */
export function sortConversations(conversations: Conversation[]): Conversation[] {
  return [...conversations].sort((a, b) => {
    const aLastMessage = a.messages[a.messages.length - 1]
    const bLastMessage = b.messages[b.messages.length - 1]
    
    if (!aLastMessage && !bLastMessage) return 0
    if (!aLastMessage) return 1
    if (!bLastMessage) return -1
    
    return new Date(bLastMessage.timestamp).getTime() - new Date(aLastMessage.timestamp).getTime()
  })
}

/**
 * Filter conversations by search term
 */
export function filterConversations(conversations: Conversation[], searchTerm: string): Conversation[] {
  if (!searchTerm.trim()) return conversations

  const term = searchTerm.toLowerCase()
  
  return conversations.filter(conversation => {
    // Search in participant names
    if (conversation.participants.some(participant => 
      participant.name.toLowerCase().includes(term)
    )) {
      return true
    }

    // Search in last message content
    if (conversation.messages.length > 0) {
      const lastMessage = conversation.messages[conversation.messages.length - 1]
      if (lastMessage.content.toLowerCase().includes(term)) {
        return true
      }
    }

    return false
  })
}

/**
 * Get unread message count for a conversation
 */
export function getUnreadCount(conversation: Conversation, currentUserId: string): number {
  return conversation.messages.filter(message => 
    message.senderId !== currentUserId && !message.isRead
  ).length
}

/**
 * Get total unread count across all conversations
 */
export function getTotalUnreadCount(conversations: Conversation[], currentUserId: string): number {
  return conversations.reduce((total, conversation) => {
    return total + getUnreadCount(conversation, currentUserId)
  }, 0)
}

/**
 * Mark conversation as read
 */
export function markConversationAsRead(conversation: Conversation, currentUserId: string): Conversation {
  return {
    ...conversation,
    messages: conversation.messages.map(message => 
      message.senderId !== currentUserId && !message.isRead
        ? { ...message, isRead: true }
        : message
    )
  }
}

/**
 * Check if message should be flagged for moderation
 */
export function shouldFlagForModeration(message: Message): boolean {
  const flagPatterns = [
    /\b(spam|scam|fraud|fake)\b/i,
    /(https?:\/\/[^\s]+)/g,
    /(\d{10,})/g,
    /\b(phone|mobile|call|contact)\b/i,
    /\b(email|mail|gmail)\b/i,
    /\b(address|location|where)\b/i,
    /\b(price|rate|cost|money)\b/i
  ]

  return flagPatterns.some(pattern => pattern.test(message.content))
}

/**
 * Get message status icon
 */
export function getMessageStatusIcon(message: Message): string {
  if (message.isRead) return '✓✓' // Double check for read
  if (message.isDelivered) return '✓' // Single check for delivered
  return '⏳' // Clock for sent
}

/**
 * Format file size for attachments
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Check if file type is allowed
 */
export function isAllowedFileType(file: File, allowedTypes: string[] = ['image/*', 'application/pdf']): boolean {
  return allowedTypes.some(type => {
    if (type.endsWith('/*')) {
      const baseType = type.replace('/*', '')
      return file.type.startsWith(baseType)
    }
    return file.type === type
  })
}

/**
 * Validate file upload
 */
export function validateFileUpload(file: File, maxSize: number = 10 * 1024 * 1024): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (file.size > maxSize) {
    errors.push(`File size must be less than ${formatFileSize(maxSize)}`)
  }

  if (!isAllowedFileType(file)) {
    errors.push('File type not allowed')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Debounce function for typing indicator
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function for message sending
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Generate conversation ID
 */
export function generateConversationId(participantIds: string[]): string {
  const sortedIds = [...participantIds].sort()
  return `conv_${sortedIds.join('_')}_${Date.now()}`
}

/**
 * Check if conversation is active (has recent messages)
 */
export function isConversationActive(conversation: Conversation, hoursThreshold: number = 24): boolean {
  if (conversation.messages.length === 0) return false
  
  const lastMessage = conversation.messages[conversation.messages.length - 1]
  const lastMessageTime = new Date(lastMessage.timestamp)
  const thresholdTime = new Date(Date.now() - hoursThreshold * 60 * 60 * 1000)
  
  return lastMessageTime > thresholdTime
}

/**
 * Get conversation participants excluding current user
 */
export function getOtherParticipants(conversation: Conversation, currentUserId: string) {
  return conversation.participants.filter(participant => participant.id !== currentUserId)
}

/**
 * Get conversation title (for group chats or 1-on-1)
 */
export function getConversationTitle(conversation: Conversation, currentUserId: string): string {
  const otherParticipants = getOtherParticipants(conversation, currentUserId)
  
  if (conversation.name) {
    return conversation.name
  }
  
  if (otherParticipants.length === 1) {
    return otherParticipants[0].name
  }
  
  if (otherParticipants.length === 2) {
    return `${otherParticipants[0].name} & ${otherParticipants[1].name}`
  }
  
  return `${otherParticipants[0].name} +${otherParticipants.length - 1} others`
} 