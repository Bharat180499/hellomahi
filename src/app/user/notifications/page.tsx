"use client"

import Link from 'next/link'

import Image from 'next/image'
import { CardHeader, CardTitle } from '@/components/ui/card'

import { Download, RefreshCw, Search, Star, Heart, Calendar, DollarSign, CheckCircle, AlertCircle, MessageCircle, Settings, Bell, ArrowRight, MoreVertical, Trash2 } from 'lucide-react'
import UserNavigation from '@/components/UserNavigation'

interface Notification {
  id: string
  type: 'booking' | 'payment' | 'message' | 'review' | 'favorite' | 'system' | 'promotion'
  title: string
  message: string
  timestamp: string
  isRead: boolean
  isImportant: boolean
  escortName?: string
  escortImage?: string
  escortSlug?: string
  bookingId?: string
  amount?: number
  actionUrl?: string
}

export default function UserNotificationsPage() {
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'unread' | 'read'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showSettings, setShowSettings] = useState(false)

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your booking with Priya Sharma for Dinner Date has been confirmed for tomorrow at 8:00 PM.',
      timestamp: '2 minutes ago',
      isRead: false,
      isImportant: true,
      escortName: 'Priya Sharma',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      escortSlug: 'priya-sharma',
      bookingId: 'BK001',
      amount: 30000,
      actionUrl: '/user/bookings'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Successful',
      message: 'Payment of ₹45,000 for booking with Zara Khan has been processed successfully.',
      timestamp: '1 hour ago',
      isRead: false,
      isImportant: false,
      escortName: 'Zara Khan',
      escortImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      escortSlug: 'zara-khan',
      amount: 45000,
      actionUrl: '/user/payments'
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message',
      message: 'You have a new message from Sofia Rodriguez.',
      timestamp: '3 hours ago',
      isRead: true,
      isImportant: false,
      escortName: 'Sofia Rodriguez',
      escortImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      escortSlug: 'sofia-rodriguez',
      actionUrl: '/user/messages'
    },
    {
      id: '4',
      type: 'review',
      title: 'Review Response',
      message: 'Priya Sharma responded to your review: "Thank you so much for your kind words!"',
      timestamp: '1 day ago',
      isRead: true,
      isImportant: false,
      escortName: 'Priya Sharma',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      escortSlug: 'priya-sharma',
      actionUrl: '/user/reviews'
    },
    {
      id: '5',
      type: 'favorite',
      title: 'Escort Available',
      message: 'Aisha Patel, one of your favorite escorts, is now available for booking.',
      timestamp: '2 days ago',
      isRead: true,
      isImportant: false,
      escortName: 'Aisha Patel',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      escortSlug: 'aisha-patel',
      actionUrl: '/escorts/aisha-patel'
    },
    {
      id: '6',
      type: 'system',
      title: 'Account Verification',
      message: 'Your account verification has been completed successfully. You now have access to all features.',
      timestamp: '3 days ago',
      isRead: true,
      isImportant: true,
      actionUrl: '/user/settings'
    },
    {
      id: '7',
      type: 'promotion',
      title: 'Special Offer',
      message: 'Get 20% off on your next booking with any premium escort. Use code PREMIUM20.',
      timestamp: '1 week ago',
      isRead: true,
      isImportant: false,
      actionUrl: '/escorts'
    },
    {
      id: '8',
      type: 'booking',
      title: 'Booking Reminder',
      message: 'Reminder: You have a booking with Meera Nair tomorrow at 7:00 PM.',
      timestamp: '1 week ago',
      isRead: true,
      isImportant: false,
      escortName: 'Meera Nair',
      escortImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      escortSlug: 'meera-nair',
      actionUrl: '/user/bookings'
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'booking': return Calendar
      case 'payment': return DollarSign
      case 'message': return MessageCircle
      case 'review': return Star
      case 'favorite': return Heart
      case 'system': return AlertCircle
      case 'promotion': return Bell
      default: return Bell
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'booking': return 'text-blue-600 bg-blue-100'
      case 'payment': return 'text-green-600 bg-green-100'
      case 'message': return 'text-purple-600 bg-purple-100'
      case 'review': return 'text-yellow-600 bg-yellow-100'
      case 'favorite': return 'text-red-600 bg-red-100'
      case 'system': return 'text-gray-600 bg-gray-100'
      case 'promotion': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const filteredNotifications = notifications.filter(notification => {
    const matchesType = selectedType === 'all' || notification.type === selectedType
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'unread' && !notification.isRead) ||
      (selectedStatus === 'read' && notification.isRead)
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesType && matchesStatus && matchesSearch
  })

  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.isRead).length,
    important: notifications.filter(n => n.isImportant).length,
    today: notifications.filter(n => n.timestamp.includes('hour') || n.timestamp.includes('minute')).length
  }

  const markAsRead = (id: string) => {
    // In a real app, you'd update the notification status
    alert(`Marked notification ${id} as read`)
  }

  const markAllAsRead = () => {
    // In a real app, you'd mark all notifications as read
    alert('All notifications marked as read')
  }

  const deleteNotification = (id: string) => {
    // In a real app, you'd delete the notification
    if (confirm('Are you sure you want to delete this notification?')) {
      alert(`Notification ${id} deleted`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <UserNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Stay updated with your account activities
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => setShowSettings(!showSettings)}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" onClick={() => alert('Exporting notifications data...')}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            {stats.unread > 0 && (
              <Button onClick={markAllAsRead}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Bell className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-lg font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <AlertCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="text-lg font-bold">{stats.unread}</p>
              <p className="text-xs text-muted-foreground">Unread</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-lg font-bold">{stats.important}</p>
              <p className="text-xs text-muted-foreground">Important</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-lg font-bold">{stats.today}</p>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
              >
                <option value="all">All Types</option>
                <option value="booking">Booking</option>
                <option value="payment">Payment</option>
                <option value="message">Message</option>
                <option value="review">Review</option>
                <option value="favorite">Favorite</option>
                <option value="system">System</option>
                <option value="promotion">Promotion</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        {showSettings && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Email Notifications</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Booking updates</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Payment confirmations</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Promotional offers</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Push Notifications</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">New messages</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Booking reminders</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Escort availability</span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => {
            const Icon = getTypeIcon(notification.type)
            return (
              <Card 
                key={notification.id} 
                className={`hover:shadow-lg transition-shadow ${
                  !notification.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/50' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Notification Icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(notification.type)}`}>
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Notification Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold">{notification.title}</h3>
                            {notification.isImportant && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                                Important
                              </span>
                            )}
                            {!notification.isRead && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{notification.timestamp}</span>
                            {notification.escortName && (
                              <>
                                <span>•</span>
                                <span>with {notification.escortName}</span>
                              </>
                            )}
                            {notification.amount && (
                              <>
                                <span>•</span>
                                <span>₹{notification.amount.toLocaleString()}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        {notification.actionUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <Link href={notification.actionUrl}>
                              <ArrowRight className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No notifications found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedType !== 'all' || selectedStatus !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'You\'re all caught up! No new notifications.'
                }
              </p>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
} 