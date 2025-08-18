"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Star, Eye, User, Calendar, MessageCircle, Settings, TrendingUp, ArrowRight, MoreVertical, Star, Calendar, MessageCircle, Settings } from 'lucide-react'
import Link from 'next/link'
import { CardHeader, CardTitle } from '@/components/ui/card'

import { Plus, TrendingUp, Eye, Calendar, Star, ArrowRight, DollarSign, MessageCircle, MoreVertical, Settings } from 'lucide-react'

export default function EscortDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d')

  const escortStats = {
    profileViews: 1247,
    totalBookings: 45,
    thisMonthBookings: 12,
    averageRating: 4.8,
    responseRate: 95,
    completionRate: 98,
    activeClients: 23
  }

  const recentBookings = [
    {
      id: '1',
      clientName: 'Rahul Verma',
      clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      date: '2024-01-25',
      time: '8:00 PM',
      amount: 30000,
      status: 'confirmed',
      service: 'Dinner Date'
    },
    {
      id: '2',
      clientName: 'Amit Patel',
      clientImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      date: '2024-01-24',
      time: '9:00 PM',
      amount: 45000,
      status: 'completed',
      service: 'Overnight'
    },
    {
      id: '3',
      clientName: 'Vikram Singh',
      clientImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      date: '2024-01-23',
      time: '7:00 PM',
      amount: 35000,
      status: 'pending',
      service: 'Social Event'
    }
  ]

  const recentActivity = [
    { type: 'booking', message: 'New booking request from Rahul V.', time: '2 min ago' },
    { type: 'review', message: '5-star review received', time: '1 hour ago' },
    { type: 'payment', message: 'Payment received from Amit P.', time: '2 hours ago' },
    { type: 'profile', message: 'Profile viewed 15 times today', time: '3 hours ago' },
    { type: 'message', message: 'New message from Vikram S.', time: '1 day ago' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100'
      case 'completed': return 'text-blue-600 bg-blue-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking': return Calendar
      case 'review': return Star
      case 'payment': return DollarSign
      case 'profile': return Eye
      case 'message': return MessageCircle
      default: return Activity
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Escort Dashboard</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Welcome back, Priya Sharma
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 w-full sm:w-auto">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm text-gray-900 bg-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/escort/profile">
              <Plus className="h-4 w-4 mr-2" />
              Update Profile
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
                <p className="text-2xl font-bold">{escortStats.profileViews.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +15% this month
                </p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold">{escortStats.totalBookings}</p>
                <p className="text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +3 this month
                </p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold">{escortStats.averageRating}</p>
                <p className="text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +0.1 this month
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Recent Bookings */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <CardTitle className="text-lg sm:text-xl">Recent Bookings</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/escort/bookings">
                    View All
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {recentBookings.map(booking => (
                  <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg gap-3">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">{booking.clientName}</p>
                        <p className="text-sm text-muted-foreground">{booking.service}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.date} at {booking.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="font-semibold">₹{booking.amount.toLocaleString()}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const IconComponent = getActivityIcon(activity.type)
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Manage Bookings</h3>
            <p className="text-sm text-muted-foreground mb-4">View and manage your appointments</p>
            <Button asChild size="sm" className="w-full">
              <Link href="/escort/bookings">View Bookings</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Messages</h3>
            <p className="text-sm text-muted-foreground mb-4">Chat with your clients</p>
            <Button asChild size="sm" className="w-full">
              <Link href="/escort/messages">Open Messages</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Settings className="h-8 w-8 text-gray-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Settings</h3>
            <p className="text-sm text-muted-foreground mb-4">Manage your account preferences</p>
            <Button asChild size="sm" className="w-full">
              <Link href="/escort/settings">Open Settings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 