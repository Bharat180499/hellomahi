"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Activity } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { CardHeader, CardTitle } from '@/components/ui/card'

import { CheckCircle, XCircle, AlertCircle, Plus, TrendingUp, Calendar, DollarSign, Star, Heart, ArrowRight, Search, MessageCircle, Settings } from 'lucide-react'

import UserNavigation from '@/components/UserNavigation'

export default function UserDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d')

  const userStats = {
    totalBookings: 12,
    thisMonthBookings: 3,
    totalSpent: 180000,
    thisMonthSpent: 45000,
    averageRating: 4.8,
    favoriteEscorts: 8,
    completedBookings: 10,
    pendingBookings: 2
  }

  const recentBookings = [
    {
      id: '1',
      escortName: 'Priya Sharma',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      date: '2024-01-25',
      time: '8:00 PM',
      amount: 30000,
      status: 'confirmed',
      service: 'Dinner Date'
    },
    {
      id: '2',
      escortName: 'Zara Khan',
      escortImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      date: '2024-01-24',
      time: '9:00 PM',
      amount: 45000,
      status: 'completed',
      service: 'Overnight'
    },
    {
      id: '3',
      escortName: 'Sofia Rodriguez',
      escortImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      date: '2024-01-23',
      time: '7:00 PM',
      amount: 35000,
      status: 'pending',
      service: 'Social Event'
    }
  ]

  const favoriteEscorts = [
    {
      id: '1',
      name: 'Priya Sharma',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      rating: 4.8,
      location: 'Mumbai',
      price: '₹30,000',
      status: 'available',
      lastBooked: '2 days ago'
    },
    {
      id: '2',
      name: 'Zara Khan',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      rating: 4.7,
      location: 'Delhi',
      price: '₹45,000',
      status: 'available',
      lastBooked: '1 week ago'
    },
    {
      id: '3',
      name: 'Sofia Rodriguez',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      rating: 4.6,
      location: 'Bangalore',
      price: '₹35,000',
      status: 'busy',
      lastBooked: '3 days ago'
    }
  ]

  const recentActivity = [
    { type: 'booking', message: 'New booking confirmed with Priya Sharma', time: '2 min ago' },
    { type: 'review', message: 'You left a 5-star review for Zara Khan', time: '1 hour ago' },
    { type: 'payment', message: 'Payment completed for Sofia Rodriguez', time: '2 hours ago' },
    { type: 'favorite', message: 'Added Aisha Patel to favorites', time: '3 hours ago' },
    { type: 'message', message: 'New message from Priya Sharma', time: '1 day ago' }
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
      case 'favorite': return Heart
      case 'message': return MessageCircle
      default: return Activity
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'busy': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'unavailable': return <XCircle className="h-4 w-4 text-red-600" />
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <UserNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">User Dashboard</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Welcome back, Rahul Verma
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
              <Link href="/escorts">
                <Plus className="h-4 w-4 mr-2" />
                Book Escort
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{userStats.totalBookings}</p>
                  <p className="text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +3 this month
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">₹{(userStats.totalSpent / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +₹45K this month
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold">{userStats.averageRating}</p>
                  <p className="text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +0.2 this month
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Favorites</p>
                  <p className="text-2xl font-bold">{userStats.favoriteEscorts}</p>
                  <p className="text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +2 this month
                  </p>
                </div>
                <Heart className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Recent Bookings
                  </CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/user/bookings">
                      View All
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Image
                            src={booking.escortImage}
                            alt={booking.escortName}
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{booking.escortName}</h4>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{booking.date}</span>
                            <Clock className="h-3 w-3" />
                            <span>{booking.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{booking.service}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">₹{booking.amount.toLocaleString()}</div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
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
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const Icon = getActivityIcon(activity.type)
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
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

        {/* Favorite Escorts */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Favorite Escorts
              </CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/user/favorites">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteEscorts.map((escort) => (
                <div key={escort.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                  <div className="relative">
                    <Image
                      src={escort.image}
                      alt={escort.name}
                      width={56}
                      height={56}
                      className="rounded-full"
                    />
                    <div className="absolute -bottom-1 -right-1">
                      {getStatusIcon(escort.status)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{escort.name}</h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{escort.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span>{escort.rating}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="font-medium">{escort.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Last booked: {escort.lastBooked}</p>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/escorts/${escort.id}`}>
                      Book
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Find Escorts</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Browse and discover new escorts
              </p>
              <Button asChild className="w-full">
                <Link href="/escorts">
                  Browse Now
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Messages</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Chat with your favorite escorts
              </p>
              <Button asChild className="w-full">
                <Link href="/user/messages">
                  Open Chat
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Write Reviews</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Share your experiences
              </p>
              <Button asChild className="w-full">
                <Link href="/user/reviews">
                  Review Now
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Settings</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Manage your preferences
              </p>
              <Button asChild className="w-full">
                <Link href="/user/settings">
                  Configure
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 