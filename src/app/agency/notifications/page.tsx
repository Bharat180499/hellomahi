"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Bell, 
  CheckCircle, 
  Calendar,
  DollarSign,
  Shield,
  Star,
  MessageCircle,
  Info,
  AlertCircle,
  Users,
  Settings,
  Search,
  MoreVertical
} from 'lucide-react'
import AgencyNavigation from '@/components/AgencyNavigation'

export default function AgencyNotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking',
      title: 'New booking request',
      message: 'Rahul Verma has requested a booking with Priya Sharma for tonight at 8:00 PM',
      timestamp: '2 minutes ago',
      isRead: false,
      priority: 'high',
      icon: Calendar,
      action: 'View Booking'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment received',
      message: 'Payment of ₹15,000 received for booking #BK-2024-001',
      timestamp: '15 minutes ago',
      isRead: false,
      priority: 'medium',
      icon: DollarSign,
      action: 'View Details'
    },
    {
      id: 3,
      type: 'escort',
      title: 'Escort verification completed',
      message: 'Anjali Patel\'s verification has been completed successfully',
      timestamp: '1 hour ago',
      isRead: true,
      priority: 'low',
      icon: Shield,
      action: 'View Profile'
    }
  ])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })))
  }

  const handleAction = (action: string, notification: any) => {
    alert(`Action: ${action} for ${notification.title}`)
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div className="min-h-screen bg-background">
      <AgencyNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated with your agency activities
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => alert('Opening notification settings...')}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" onClick={markAllAsRead}>
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Notifications</p>
                  <p className="text-2xl font-bold">{notifications.length}</p>
                </div>
                <Bell className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unread</p>
                  <p className="text-2xl font-bold">{unreadCount}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold">{notifications.filter(n => n.priority === 'high').length}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map(notification => {
            const Icon = notification.icon
            return (
              <Card key={notification.id} className={`${!notification.isRead ? 'border-primary bg-primary/5' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium">{notification.title}</h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex items-center space-x-4">
                            <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                            <Button variant="outline" size="sm">
                              {notification.action}
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => markAsRead(notification.id)}
                            title="Mark as read"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleAction('view', notification)}
                            title="More options"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
} 
