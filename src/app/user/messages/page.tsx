"use client"


import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Send, Paperclip, Smile, Ban, Search, Clock, CheckCircle, XCircle, AlertCircle, MessageCircle, X, ArrowLeft, MoreVertical, User } from 'lucide-react'
import UserNavigation from '@/components/UserNavigation'

interface Message {
  id: string
  escortId: string
  escortName: string
  escortImage: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
  status: 'online' | 'offline' | 'busy'
  lastSeen?: string
}

interface ChatMessage {
  id: string
  sender: 'user' | 'escort'
  message: string
  timestamp: string
  isRead: boolean
  type: 'text' | 'image' | 'file'
}

export default function UserMessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const conversations: Message[] = [
    {
      id: '1',
      escortId: 'priya-sharma',
      escortName: 'Priya Sharma',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      lastMessage: 'Looking forward to our meeting tomorrow!',
      lastMessageTime: '2 min ago',
      unreadCount: 2,
      isOnline: true,
      status: 'online'
    },
    {
      id: '2',
      escortId: 'zara-khan',
      escortName: 'Zara Khan',
      escortImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      lastMessage: 'Thank you for the wonderful evening',
      lastMessageTime: '1 hour ago',
      unreadCount: 0,
      isOnline: false,
      status: 'offline',
      lastSeen: '2 hours ago'
    },
    {
      id: '3',
      escortId: 'sofia-rodriguez',
      escortName: 'Sofia Rodriguez',
      escortImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      lastMessage: 'I\'m available this weekend',
      lastMessageTime: '3 hours ago',
      unreadCount: 1,
      isOnline: true,
      status: 'busy'
    },
    {
      id: '4',
      escortId: 'aisha-patel',
      escortName: 'Aisha Patel',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      lastMessage: 'What time works best for you?',
      lastMessageTime: '1 day ago',
      unreadCount: 0,
      isOnline: false,
      status: 'offline',
      lastSeen: '1 day ago'
    }
  ]

  const chatMessages: ChatMessage[] = [
    {
      id: '1',
      sender: 'escort',
      message: 'Hi Rahul! How are you doing today?',
      timestamp: '10:30 AM',
      isRead: true,
      type: 'text'
    },
    {
      id: '2',
      sender: 'user',
      message: 'Hi Priya! I\'m doing great, thanks for asking. Are you available this evening?',
      timestamp: '10:32 AM',
      isRead: true,
      type: 'text'
    },
    {
      id: '3',
      sender: 'escort',
      message: 'Yes, I have a slot available at 8 PM. Would that work for you?',
      timestamp: '10:35 AM',
      isRead: true,
      type: 'text'
    },
    {
      id: '4',
      sender: 'user',
      message: 'Perfect! 8 PM works great. Should I book through the platform?',
      timestamp: '10:37 AM',
      isRead: true,
      type: 'text'
    },
    {
      id: '5',
      sender: 'escort',
      message: 'Yes, please book through the platform. Looking forward to our meeting tomorrow!',
      timestamp: '2 min ago',
      isRead: false,
      type: 'text'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'busy': return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case 'offline': return <XCircle className="h-4 w-4 text-gray-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredConversations = conversations.filter(conversation =>
    conversation.escortName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedConversation = conversations.find(c => c.id === selectedChat)

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      setNewMessage('')
    }
  }

  const handleBlockUser = () => {
    if (selectedConversation) {
      // Handle blocking the user
      console.log(`Blocking escort: ${selectedConversation.escortName}`)
      setIsDropdownOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <UserNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Messages</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Chat with your favorite escorts
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Conversations</CardTitle>
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-[500px] overflow-y-auto">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedChat(conversation.id)}
                      className={`p-4 cursor-pointer hover:bg-muted transition-colors ${
                        selectedChat === conversation.id ? 'bg-muted' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Image
                            src={conversation.escortImage}
                            alt={conversation.escortName}
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                          <div className="absolute -bottom-1 -right-1">
                            {getStatusIcon(conversation.status)}
                          </div>
                          {conversation.isOnline && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm truncate">{conversation.escortName}</h4>
                            <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                          {conversation.unreadCount > 0 && (
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-muted-foreground">
                                {conversation.status === 'online' ? 'Online' : conversation.lastSeen}
                              </span>
                              <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1">
                                {conversation.unreadCount}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedChat(null)}
                          className="lg:hidden"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="relative">
                          <Image
                            src={selectedConversation!.escortImage}
                            alt={selectedConversation!.escortName}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="absolute -bottom-1 -right-1">
                            {getStatusIcon(selectedConversation!.status)}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold">{selectedConversation!.escortName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {selectedConversation!.status === 'online' ? 'Online' : selectedConversation!.lastSeen}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleBlockUser}>
                              <Ban className="h-4 w-4 mr-2" />
                              Block User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <div className={`flex items-center justify-between mt-1 text-xs ${
                              message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              <span>{message.timestamp}</span>
                              {message.sender === 'user' && (
                                <span>{message.isRead ? '✓✓' : '✓'}</span>
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
                        <Smile className="h-4 w-4" />
                      </Button>
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <CardContent className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">
                      Choose a conversation from the list to start chatting
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 