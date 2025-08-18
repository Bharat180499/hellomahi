"use client"


import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, User, MessageCircle, ArrowLeft, MoreVertical, Send, Paperclip, Smile, Ban, Archive, Check, CheckCheck, Check, MessageCircle, Archive } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Send, Paperclip, Smile, Check, CheckCheck, Ban, Search, Filter, MessageCircle, ArrowLeft, MoreVertical, Archive, User, Image } from 'lucide-react'

export default function EscortMessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>('1')
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const chats = [
    {
      id: '1',
      clientName: 'Rahul Verma',
      clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      lastMessage: 'Hi Priya, I would like to book you for dinner tonight.',
      lastMessageTime: '2 min ago',
      unreadCount: 2,
      isOnline: true,
      bookingId: 'BK001'
    },
    {
      id: '2',
      clientName: 'Amit Patel',
      clientImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      lastMessage: 'Thank you for the wonderful time last night.',
      lastMessageTime: '1 hour ago',
      unreadCount: 0,
      isOnline: false,
      bookingId: 'BK002'
    },
    {
      id: '3',
      clientName: 'Vikram Singh',
      clientImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      lastMessage: 'Can you confirm the details for tomorrow?',
      lastMessageTime: '3 hours ago',
      unreadCount: 1,
      isOnline: true,
      bookingId: 'BK003'
    },
    {
      id: '4',
      clientName: 'Rajesh Kumar',
      clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      lastMessage: 'I will be there at 8 PM sharp.',
      lastMessageTime: '1 day ago',
      unreadCount: 0,
      isOnline: false,
      bookingId: 'BK004'
    }
  ]

  const messages = {
    '1': [
      {
        id: '1',
        sender: 'client',
        message: 'Hi Priya, I would like to book you for dinner tonight.',
        time: '2:30 PM',
        status: 'read'
      },
      {
        id: '2',
        sender: 'escort',
        message: 'Hi Rahul! I would be happy to join you for dinner. What time and location did you have in mind?',
        time: '2:32 PM',
        status: 'read'
      },
      {
        id: '3',
        sender: 'client',
        message: 'I was thinking 8 PM at Taj Lands End. Is that convenient for you?',
        time: '2:35 PM',
        status: 'read'
      },
      {
        id: '4',
        sender: 'escort',
        message: 'That sounds perfect! I love Taj Lands End. I will be there at 7:45 PM to ensure we have a great evening.',
        time: '2:37 PM',
        status: 'sent'
      },
      {
        id: '5',
        sender: 'client',
        message: 'Excellent! I will make the reservation. Looking forward to meeting you.',
        time: '2:40 PM',
        status: 'sent'
      }
    ],
    '2': [
      {
        id: '1',
        sender: 'client',
        message: 'Thank you for the wonderful time last night.',
        time: '1 hour ago',
        status: 'read'
      },
      {
        id: '2',
        sender: 'escort',
        message: 'You are very welcome, Amit! I had a great time too. Thank you for being such a wonderful companion.',
        time: '1 hour ago',
        status: 'read'
      }
    ]
  }

  const currentChat = chats.find(chat => chat.id === selectedChat)
  const currentMessages = messages[selectedChat as keyof typeof messages] || []

  const filteredChats = chats.filter(chat =>
    chat.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sendMessage = () => {
    if (message.trim() && selectedChat) {
      // Handle sending message
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleBlockUser = () => {
    if (currentChat) {
      // Handle blocking the user
      console.log(`Blocking user: ${currentChat.clientName}`)
      setIsDropdownOpen(false)
    }
  }

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground text-sm">Chat with your clients</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat List */}
        <div className="w-80 border-r flex flex-col">
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search chats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat === chat.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                    {chat.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm truncate">{chat.clientName}</h3>
                      <span className="text-xs text-muted-foreground">{chat.lastMessageTime}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant="outline" className="text-xs">
                        {chat.bookingId}
                      </Badge>
                      {chat.unreadCount > 0 && (
                        <Badge className="bg-blue-600 text-white text-xs">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedChat(null)}
                    className="md:hidden"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    {currentChat?.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{currentChat?.clientName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {currentChat?.isOnline ? 'Online' : 'Offline'} • {currentChat?.bookingId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
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

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'escort' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === 'escort'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <div className={`flex items-center justify-between mt-1 text-xs ${
                        msg.sender === 'escort' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <span>{msg.time}</span>
                        {msg.sender === 'escort' && (
                          <div className="flex items-center">
                            {msg.status === 'sent' && <Check className="h-3 w-3" />}
                            {msg.status === 'delivered' && <CheckCheck className="h-3 w-3" />}
                            {msg.status === 'read' && <CheckCheck className="h-3 w-3 text-blue-300" />}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Image className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      type="text"
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-20"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={sendMessage} disabled={!message.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a chat</h3>
                <p className="text-gray-500">Choose a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 