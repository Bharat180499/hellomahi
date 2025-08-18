"use client"

import { CardHeader, CardTitle } from '@/components/ui/card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Trash2, Mail, Calendar, DollarSign, MessageCircle, Settings, Bell, Shield, Crown, Archive, Smartphone, Check, Volume2, BellOff, Check, Smartphone, Star, Calendar, DollarSign, Shield, Crown, MessageCircle, Settings, Trash2, Archive, Volume2, Bell } from 'lucide-react'

import { BellOff, Check, Smartphone, Star, Calendar, DollarSign, Shield, Crown, MessageCircle, Settings, Trash2, Archive, Volume2, Bell } from 'lucide-react'
import Image from 'next/image'

interface Notification {
  id: string
  type: 'booking' | 'message' | 'payment' | 'review' | 'system' | 'promotion'
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  isImportant: boolean
  actionUrl?: string
  icon?: string
  data?: any
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'New Booking Request',
      message: 'Rahul V. has requested a booking for tonight at 8 PM',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      isRead: false,
      isImportant: true,
      actionUrl: '/bookings',
      data: { bookingId: 'booking123', amount: 30000 }
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      message: 'Amit P. sent you a message about weekend availability',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      isRead: false,
      isImportant: false,
      actionUrl: '/messages'
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of ₹45,000 received from Vikram M.',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isRead: true,
      isImportant: false,
      actionUrl: '/earnings',
      data: { amount: 45000, transactionId: 'txn123' }
    },
    {
      id: '4',
      type: 'review',
      title: 'New 5-Star Review',
      message: 'Priya S. left you a 5-star review',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      isRead: true,
      isImportant: false,
      actionUrl: '/reviews',
      data: { rating: 5, reviewId: 'review123' }
    },
    {
      id: '5',
      type: 'system',
      title: 'Profile Verification Complete',
      message: 'Your profile verification has been completed successfully',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      isRead: true,
      isImportant: false,
      actionUrl: '/profile'
    },
    {
      id: '6',
      type: 'promotion',
      title: 'Premium Plan Discount',
      message: 'Get 20% off on Premium plans this week only!',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      isRead: true,
      isImportant: false,
      actionUrl: '/plans'
    }
  ])

  const [showSettings, setShowSettings] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)

  const [preferences, setPreferences] = useState({
    booking: { email: true, push: true, sound: true },
    message: { email: false, push: true, sound: true },
    payment: { email: true, push: true, sound: false },
    review: { email: true, push: true, sound: true },
    system: { email: true, push: false, sound: false },
    promotion: { email: false, push: false, sound: false }
  })

  const unreadCount = notifications.filter(n => !n.isRead).length
  const importantCount = notifications.filter(n => n.isImportant && !n.isRead).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="h-5 w-5 text-blue-600" />
      case 'message':
        return <MessageCircle className="h-5 w-5 text-green-600" />
      case 'payment':
        return <DollarSign className="h-5 w-5 text-green-600" />
      case 'review':
        return <Star className="h-5 w-5 text-yellow-600" />
      case 'system':
        return <Shield className="h-5 w-5 text-purple-600" />
      case 'promotion':
        return <Crown className="h-5 w-5 text-orange-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'booking':
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20'
      case 'message':
        return 'border-l-green-500 bg-green-50 dark:bg-green-900/20'
      case 'payment':
        return 'border-l-green-500 bg-green-50 dark:bg-green-900/20'
      case 'review':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
      case 'system':
        return 'border-l-purple-500 bg-purple-50 dark:bg-purple-900/20'
      case 'promotion':
        return 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/20'
      default:
        return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/20'
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const archiveNotification = (id: string) => {
    // In a real app, this would move to archived notifications
    deleteNotification(id)
  }

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead
    if (filter === 'important') return notification.isImportant
    return true
  })

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bell className="h-6 w-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount} unread, {importantCount} important
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
            >
              Mark all read
            </Button>
          )}
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Global Settings */}
            <div className="space-y-4">
              <h3 className="font-medium">Global Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5" />
                    <div>
                      <div className="font-medium">All Notifications</div>
                      <div className="text-sm text-muted-foreground">Enable/disable all notifications</div>
                    </div>
                  </div>
                  <Button
                    variant={notificationsEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  >
                    {notificationsEnabled ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Volume2 className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Sound Alerts</div>
                      <div className="text-sm text-muted-foreground">Play sound for notifications</div>
                    </div>
                  </div>
                  <Button
                    variant={soundEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                  >
                    {soundEnabled ? "On" : "Off"}
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive notifications via email</div>
                    </div>
                  </div>
                  <Button
                    variant={emailNotifications ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEmailNotifications(!emailNotifications)}
                  >
                    {emailNotifications ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Push Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive push notifications</div>
                    </div>
                  </div>
                  <Button
                    variant={pushNotifications ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPushNotifications(!pushNotifications)}
                  >
                    {pushNotifications ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Type-specific Settings */}
            <div className="space-y-4">
              <h3 className="font-medium">Notification Types</h3>
              <div className="space-y-3">
                {Object.entries(preferences).map(([type, settings]) => (
                  <div key={type} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getNotificationIcon(type)}
                      <div>
                        <div className="font-medium capitalize">{type} Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          {settings.email && settings.push ? 'Email & Push' :
                           settings.email ? 'Email only' :
                           settings.push ? 'Push only' : 'Disabled'}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filter === 'unread'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('important')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filter === 'important'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Important ({importantCount})
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <BellOff className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                {filter === 'all' ? 'You\'re all caught up!' :
                 filter === 'unread' ? 'No unread notifications' :
                 'No important notifications'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map(notification => (
            <Card
              key={notification.id}
              className={`transition-all duration-200 hover:shadow-md ${
                !notification.isRead ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className={`flex items-start space-x-3 p-3 border-l-4 rounded-r-lg ${getNotificationColor(notification.type)}`}>
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">
                          {notification.title}
                          {notification.isImportant && (
                            <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                              Important
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                          {notification.data?.amount && (
                            <span className="text-xs font-medium text-green-600">
                              ₹{notification.data.amount.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 hover:bg-muted rounded"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => archiveNotification(notification.id)}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <Archive className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
} 