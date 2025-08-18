"use client"

import { useRef, useState } from 'react'

import { CardHeader, CardTitle } from '@/components/ui/card'

import { Check, CheckCheck, Search, Shield, Crown, MoreVertical } from 'lucide-react'
import Image from 'next/image'

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  type: 'text' | 'image' | 'file' | 'voice'
  timestamp: Date
  isRead: boolean
  isDelivered: boolean
}

interface Conversation {
  id: string
  participant: {
    id: string
    name: string
    image: string
    isOnline: boolean
    isVerified: boolean
    isPremium: boolean
  }
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
}

export default function RealTimeChat() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      participant: {
        id: 'user1',
        name: 'Priya Sharma',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
        isOnline: true,
        isVerified: true,
        isPremium: true
      },
      lastMessage: 'Hi, are you available tonight?',
      lastMessageTime: new Date(),
      unreadCount: 2
    },
    {
      id: '2',
      participant: {
        id: 'user2',
        name: 'Zara Khan',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        isOnline: false,
        isVerified: true,
        isPremium: false
      },
      lastMessage: 'Thank you for the wonderful time!',
      lastMessageTime: new Date(Date.now() - 3600000),
      unreadCount: 0
    }
  ])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'user1',
      receiverId: 'currentUser',
      content: 'Hi, are you available tonight?',
      type: 'text',
      timestamp: new Date(Date.now() - 300000),
      isRead: true,
      isDelivered: true
    },
    {
      id: '2',
      senderId: 'currentUser',
      receiverId: 'user1',
      content: 'Yes, I am available. What time would you like to meet?',
      type: 'text',
      timestamp: new Date(Date.now() - 240000),
      isRead: true,
      isDelivered: true
    },
    {
      id: '3',
      senderId: 'user1',
      receiverId: 'currentUser',
      content: 'Around 8 PM. Is that okay?',
      type: 'text',
      timestamp: new Date(Date.now() - 180000),
      isRead: false,
      isDelivered: true
    }
  ])

  const [selectedConversation, setSelectedConversation] = useState<string>('1')
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'currentUser',
      receiverId: 'user1',
      content: newMessage,
      type: 'text',
      timestamp: new Date(),
      isRead: false,
      isDelivered: false
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')

    // Simulate message delivery and read status
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id 
            ? { ...msg, isDelivered: true }
            : msg
        )
      )
    }, 1000)

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id 
            ? { ...msg, isRead: true }
            : msg
        )
      )
    }, 3000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentConversation = conversations.find(conv => conv.id === selectedConversation)
  const currentMessages = messages.filter(msg => 
    (msg.senderId === 'currentUser' && msg.receiverId === currentConversation?.participant.id) ||
    (msg.senderId === currentConversation?.participant.id && msg.receiverId === 'currentUser')
  )

  return (
    <div className="h-[600px] bg-background border rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
        {/* Conversations List */}
        <div className="border-r bg-muted/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Messages</CardTitle>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
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
          <div className="overflow-y-auto h-[calc(100%-120px)]">
            {filteredConversations.map(conversation => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b cursor-pointer transition-colors ${
                  selectedConversation === conversation.id
                    ? 'bg-primary/10 border-primary/20'
                    : 'hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                      src={conversation.participant.image}
                      alt={conversation.participant.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                      conversation.participant.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm truncate">
                        {conversation.participant.name}
                      </h4>
                      {conversation.participant.isVerified && (
                        <Shield className="h-3 w-3 text-blue-500" />
                      )}
                      {conversation.participant.isPremium && (
                        <Crown className="h-3 w-3 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">
                        {conversation.lastMessageTime.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 flex flex-col">
          {/* Chat Header */}
          {currentConversation && (
            <CardHeader className="border-b pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                      src={currentConversation.participant.image}
                      alt={currentConversation.participant.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                      currentConversation.participant.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center space-x-2">
                      <span>{currentConversation.participant.name}</span>
                      {currentConversation.participant.isVerified && (
                        <Shield className="h-4 w-4 text-blue-500" />
                      )}
                      {currentConversation.participant.isPremium && (
                        <Crown className="h-4 w-4 text-yellow-500" />
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {currentConversation.participant.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <VideoCall className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentMessages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.senderId === 'currentUser' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${message.senderId === 'currentUser' ? 'order-2' : 'order-1'}`}>
                  <div className={`rounded-lg px-4 py-2 ${
                    message.senderId === 'currentUser'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <div className={`flex items-center space-x-1 mt-1 ${
                    message.senderId === 'currentUser' ? 'justify-end' : 'justify-start'
                  }`}>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    {message.senderId === 'currentUser' && (
                      <div className="flex items-center space-x-1">
                        {message.isDelivered ? (
                          message.isRead ? (
                            <CheckCheck className="h-3 w-3 text-blue-500" />
                          ) : (
                            <Check className="h-3 w-3 text-muted-foreground" />
                          )
                        ) : (
                          <Clock className="h-3 w-3 text-muted-foreground" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Image className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <File className="h-4 w-4" />
              </Button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 