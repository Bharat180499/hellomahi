"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  MessageCircle,
  Archive,
  Trash2,
  Settings,
  Plus
} from 'lucide-react'
import type { Conversation, Message } from '@/types/messaging'
import { messaging } from '@/lib/api/messaging'
import ChatInterface from '@/components/messaging/ChatInterface'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all')

  // Load conversations
  const loadConversations = async () => {
    setIsLoading(true)
    try {
      const response = await messaging.conversations.list(
        { status: filter === 'archived' ? 'archived' : 'all' },
        { field: 'lastMessage', order: 'desc' }
      )
      if (response.success) {
        setConversations(response.conversations)
      }
    } catch (error) {
      console.error('Failed to load conversations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle conversation selection
  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation)
  }

  // Handle message sent
  const handleMessageSent = (message: Message) => {
    // Update conversation with new message
    setConversations(prev => prev.map(conv => 
      conv.id === message.conversationId 
        ? { ...conv, lastMessage: message, unreadCount: 0 }
        : conv
    ))
  }

  // Handle conversation update
  const handleConversationUpdate = (conversation: Conversation) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversation.id ? conversation : conv
    ))
    setSelectedConversation(prev => 
      prev?.id === conversation.id ? conversation : prev
    )
  }

  // Filter conversations
  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.participants.some(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && conv.unreadCount > 0) ||
      (filter === 'archived' && !conv.isActive)
    return matchesSearch && matchesFilter
  })

  // Load conversations on mount and filter change
  useEffect(() => {
    loadConversations()
  }, [filter])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex h-[calc(100vh-200px)] gap-4">
          {/* Conversations Sidebar */}
          <div className="w-80 flex flex-col border rounded-lg bg-card">
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Messages</h2>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-1">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={filter === 'unread' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('unread')}
                >
                  Unread
                </Button>
                <Button
                  variant={filter === 'archived' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('archived')}
                >
                  Archived
                </Button>
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">No conversations</h3>
                  <p className="text-sm text-muted-foreground">
                    Start a conversation to begin messaging
                  </p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {filteredConversations.map((conversation) => {
                    const primaryParticipant = conversation.participants.find(p => p.type !== 'user') || conversation.participants[0]
                    const isSelected = selectedConversation?.id === conversation.id

                    return (
                      <div
                        key={conversation.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          isSelected 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleConversationSelect(conversation)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={primaryParticipant.avatar} alt={primaryParticipant.name} />
                              <AvatarFallback>
                                {primaryParticipant.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            {primaryParticipant.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium truncate">
                                {primaryParticipant.name}
                              </h4>
                              {conversation.lastMessage && (
                                <span className="text-xs text-muted-foreground">
                                  {new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-muted-foreground truncate">
                                {conversation.lastMessage?.content || 'No messages yet'}
                              </p>
                              {conversation.unreadCount > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="flex-1 border rounded-lg bg-card">
            {selectedConversation ? (
              <ChatInterface
                conversation={selectedConversation}
                onMessageSent={handleMessageSent}
                onConversationUpdate={handleConversationUpdate}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageCircle className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 