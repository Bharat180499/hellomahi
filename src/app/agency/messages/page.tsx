"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  MessageCircle, 
  Search, 
  Send, 
  MoreVertical,

  Image,
  Paperclip,
  Smile,
  Check,
  Clock,
  User,
  Users,
  Star,
  Filter,
  Archive,
  Trash2,
  Reply,
  Forward
} from 'lucide-react'
import AgencyNavigation from '@/components/AgencyNavigation'

export default function AgencyMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState('conv-1')
  const [searchQuery, setSearchQuery] = useState('')
  const [messageText, setMessageText] = useState('')

  const conversations = [
    {
      id: 'conv-1',
      name: 'Priya Sharma',
      type: 'escort',
      lastMessage: 'I&apos;ll be available for the booking tonight',
      timestamp: '2 minutes ago',
      unreadCount: 2,
      avatar: 'PS',
      status: 'online',
      lastSeen: null
    },
    {
      id: 'conv-2',
      name: 'Rahul Verma',
      type: 'client',
      lastMessage: 'Can you confirm the booking for tomorrow?',
      timestamp: '15 minutes ago',
      unreadCount: 0,
      avatar: 'RV',
      status: 'offline',
      lastSeen: '2 hours ago'
    },
    {
      id: 'conv-3',
      name: 'Anjali Patel',
      type: 'escort',
      lastMessage: 'Payment received, thank you!',
      timestamp: '1 hour ago',
      unreadCount: 0,
      avatar: 'AP',
      status: 'online',
      lastSeen: null
    },
    {
      id: 'conv-4',
      name: 'Amit Kumar',
      type: 'client',
      lastMessage: 'The service was excellent',
      timestamp: '2 hours ago',
      unreadCount: 0,
      avatar: 'AK',
      status: 'offline',
      lastSeen: '1 day ago'
    },
    {
      id: 'conv-5',
      name: 'Riya Singh',
      type: 'escort',
      lastMessage: 'I need to update my availability',
      timestamp: '1 day ago',
      unreadCount: 1,
      avatar: 'RS',
      status: 'offline',
      lastSeen: '3 hours ago'
    }
  ]

  const messages = {
    'conv-1': [
      {
        id: 1,
        sender: 'Priya Sharma',
        senderType: 'escort',
        content: 'Hi, I wanted to confirm my availability for tonight\'s booking',
        timestamp: '10:30 AM',
        isRead: true,
        type: 'text'
      },
      {
        id: 2,
        sender: 'Agency',
        senderType: 'agency',
        content: 'Yes, you\'re confirmed for 8:00 PM with Rahul Verma',
        timestamp: '10:32 AM',
        isRead: true,
        type: 'text'
      },
      {
        id: 3,
        sender: 'Priya Sharma',
        senderType: 'escort',
        content: 'Perfect! I\'ll be ready. Any special requirements?',
        timestamp: '10:35 AM',
        isRead: true,
        type: 'text'
      },
      {
        id: 4,
        sender: 'Agency',
        senderType: 'agency',
        content: 'Standard dinner date service. Client prefers discreet meeting',
        timestamp: '10:37 AM',
        isRead: true,
        type: 'text'
      },
      {
        id: 5,
        sender: 'Priya Sharma',
        senderType: 'escort',
        content: 'I\'ll be available for the booking tonight',
        timestamp: '2 minutes ago',
        isRead: false,
        type: 'text'
      }
    ],
    'conv-2': [
      {
        id: 1,
        sender: 'Rahul Verma',
        senderType: 'client',
        content: 'Hi, I\'d like to book Priya for tomorrow evening',
        timestamp: '9:15 AM',
        isRead: true,
        type: 'text'
      },
      {
        id: 2,
        sender: 'Agency',
        senderType: 'agency',
        content: 'Hello Rahul! Priya is available tomorrow at 8:00 PM. Rate is ₹15,000 for 2 hours',
        timestamp: '9:20 AM',
        isRead: true,
        type: 'text'
      },
      {
        id: 3,
        sender: 'Rahul Verma',
        senderType: 'client',
        content: 'That works for me. Can you confirm the booking?',
        timestamp: '15 minutes ago',
        isRead: true,
        type: 'text'
      }
    ]
  }

  const selectedConv = conversations.find(c => c.id === selectedConversation)
  const currentMessages = messages[selectedConversation as keyof typeof messages] || []

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText)
      setMessageText('')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600'
      case 'offline': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AgencyNavigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-muted-foreground">
              Communicate with your escorts and clients
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Conversations List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Conversations</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-[500px] overflow-y-auto">
                  {conversations.map(conversation => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedConversation === conversation.id ? 'bg-muted' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                            {conversation.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusDot(conversation.status)}`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm truncate">{conversation.name}</h4>
                            <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                            {conversation.unreadCount > 0 && (
                              <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                {conversation.unreadCount}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`text-xs ${getStatusColor(conversation.status)}`}>
                              {conversation.status}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {conversation.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className="lg:col-span-2 flex flex-col">
              {selectedConv ? (
                <>
                  {/* Chat Header */}
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                            {selectedConv.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusDot(selectedConv.status)}`}></div>
                        </div>
                        <div>
                          <h3 className="font-medium">{selectedConv.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs ${getStatusColor(selectedConv.status)}`}>
                              {selectedConv.status}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {selectedConv.type}
                            </span>
                            {selectedConv.lastSeen && (
                              <span className="text-xs text-muted-foreground">
                                Last seen {selectedConv.lastSeen}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => alert(`More options for ${selectedConv.name}`)}>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      {currentMessages.map(message => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderType === 'agency' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] ${message.senderType === 'agency' ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-xs font-medium">{message.sender}</span>
                              <span className="text-xs opacity-70">{message.timestamp}</span>
                            </div>
                            <p className="text-sm">{message.content}</p>
                            <div className="flex items-center justify-end space-x-1 mt-2">
                              {message.isRead ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <Clock className="h-3 w-3" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Image className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          placeholder="Type your message..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                          <Smile className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 
