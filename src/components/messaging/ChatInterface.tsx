"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Phone, 
  Video, 
  Search,
  Image as ImageIcon,
  File,
  MapPin,
  Calendar,
  X,
  Edit,
  Trash2,
  Reply,
  Forward
} from 'lucide-react'
import type { 
  Message, 
  Conversation, 
  MessageRequest,
  TypingStatus 
} from '@/types/messaging'
import { messaging } from '@/lib/api/messaging'
import MessageBubble from './MessageBubble'
import MessageInput from './MessageInput'
import ChatHeader from './ChatHeader'
import TypingIndicator from './TypingIndicator'

interface ChatInterfaceProps {
  conversation: Conversation
  onMessageSent?: (message: Message) => void
  onConversationUpdate?: (conversation: Conversation) => void
}

export default function ChatInterface({ 
  conversation, 
  onMessageSent, 
  onConversationUpdate 
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [typingUsers, setTypingUsers] = useState<TypingStatus[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [replyTo, setReplyTo] = useState<Message | null>(null)
  const [editingMessage, setEditingMessage] = useState<Message | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  // Load messages
  const loadMessages = useCallback(async (page = 1, append = false) => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const response = await messaging.messages.list(conversation.id, page, 50)
      if (response.success) {
        if (append) {
          setMessages(prev => [...response.messages, ...prev])
        } else {
          setMessages(response.messages)
        }
        setHasMore(response.hasMore)
        setCurrentPage(page)
      }
    } catch (error) {
      console.error('Failed to load messages:', error)
    } finally {
      setIsLoading(false)
    }
  }, [conversation.id, isLoading])

  // Send message
  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const messageData: MessageRequest = {
      conversationId: conversation.id,
      content: content.trim(),
      messageType: 'text',
      metadata: replyTo ? { replyToMessageId: replyTo.id } : undefined
    }

    try {
      const response = await messaging.messages.send(messageData)
      if (response.success) {
        setMessages(prev => [...prev, response.message])
        setReplyTo(null)
        setEditingMessage(null)
        onMessageSent?.(response.message)
        scrollToBottom()
      }
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  // Handle typing
  const handleTyping = useCallback(async (isTyping: boolean) => {
    if (isTyping === isTyping) return

    setIsTyping(isTyping)
    try {
      await messaging.realtime.sendTyping(conversation.id, isTyping)
    } catch (error) {
      console.error('Failed to send typing status:', error)
    }

    // Clear typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set timeout to stop typing indicator
    if (isTyping) {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false)
        messaging.realtime.sendTyping(conversation.id, false)
      }, 3000)
    }
  }, [conversation.id, isTyping])

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Load more messages (infinite scroll)
  const loadMoreMessages = () => {
    if (hasMore && !isLoading) {
      loadMessages(currentPage + 1, true)
    }
  }

  // Handle message actions
  const handleMessageAction = async (message: Message, action: 'edit' | 'delete' | 'reply') => {
    switch (action) {
      case 'edit':
        setEditingMessage(message)
        break
      case 'delete':
        try {
          await messaging.messages.delete(message.id)
          setMessages(prev => prev.filter(m => m.id !== message.id))
        } catch (error) {
          console.error('Failed to delete message:', error)
        }
        break
      case 'reply':
        setReplyTo(message)
        break
    }
  }

  // Mark messages as read
  const markMessagesAsRead = useCallback(async () => {
    try {
      await messaging.conversations.markAsRead(conversation.id)
      onConversationUpdate?.(conversation)
    } catch (error) {
      console.error('Failed to mark messages as read:', error)
    }
  }, [conversation, onConversationUpdate])

  // Load initial messages
  useEffect(() => {
    loadMessages(1, false)
  }, [conversation.id])

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Mark messages as read when conversation is active
  useEffect(() => {
    if (messages.length > 0) {
      markMessagesAsRead()
    }
  }, [messages, markMessagesAsRead])

  // Cleanup typing timeout
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Header */}
      <ChatHeader 
        conversation={conversation}
        onCall={() => {/* Handle call */}}
        onVideoCall={() => {/* Handle video call */}}
        onSearch={() => {/* Handle search */}}
      />

      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        onScroll={(e) => {
          const target = e.target as HTMLDivElement
          if (target.scrollTop === 0 && hasMore && !isLoading) {
            loadMoreMessages()
          }
        }}
      >
        {/* Loading indicator */}
        {isLoading && currentPage === 1 && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Messages */}
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwnMessage={message.senderId === 'current-user-id'} // Replace with actual user ID
            onAction={handleMessageAction}
            replyTo={replyTo}
            editingMessage={editingMessage}
            onEdit={(content) => {
              messaging.messages.edit(message.id, content)
                .then(response => {
                  if (response.success) {
                    setMessages(prev => prev.map(m => 
                      m.id === message.id ? response.message : m
                    ))
                    setEditingMessage(null)
                  }
                })
                .catch(error => console.error('Failed to edit message:', error))
            }}
          />
        ))}

        {/* Typing indicator */}
        {typingUsers.length > 0 && (
          <TypingIndicator users={typingUsers} />
        )}

        {/* End of messages marker */}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply to message */}
      {replyTo && (
        <div className="px-4 py-2 bg-muted/50 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Reply className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Replying to {replyTo.senderName}</span>
              <span className="text-sm text-muted-foreground truncate max-w-48">
                {replyTo.content}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReplyTo(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="border-t p-4">
        <MessageInput
          onSend={sendMessage}
          onTyping={handleTyping}
          placeholder="Type a message..."
          disabled={isLoading}
          replyTo={replyTo}
          editingMessage={editingMessage}
        />
      </div>
    </div>
  )
} 