"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Building, 
  Users, 
  DollarSign, 
  Calendar, 
  Star, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Eye,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Award,
  Shield,
  Crown,
  BarChart3,
  Activity,
  Target,
  ArrowRight,
  MoreVertical,
  Filter,
  Search
} from 'lucide-react'
import AgencyNavigation from '@/components/AgencyNavigation'

export default function AgencyDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d')

  const agencyStats = {
    totalEscorts: 25,
    activeEscorts: 18,
    totalBookings: 156,
    thisMonthBookings: 45,
    totalRevenue: 2850000,
    thisMonthRevenue: 450000,
    averageRating: 4.7,
    responseRate: 92,
    completionRate: 96
  }

  const recentBookings = [
    {
      id: '1',
      escortName: 'Priya Sharma',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      clientName: 'Rahul Verma',
      date: '2024-01-25',
      time: '8:00 PM',
      amount: 30000,
      status: 'confirmed'
    },
    {
      id: '2',
      escortName: 'Zara Khan',
      escortImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      clientName: 'Amit Patel',
      date: '2024-01-24',
      time: '9:00 PM',
      amount: 45000,
      status: 'completed'
    },
    {
      id: '3',
      escortName: 'Sofia Rodriguez',
      escortImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      clientName: 'Vikram Singh',
      date: '2024-01-23',
      time: '7:00 PM',
      amount: 35000,
      status: 'pending'
    }
  ]

  const topEscorts = [
    {
      id: '1',
      name: 'Priya Sharma',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      rating: 4.8,
      bookings: 32,
      revenue: 480000,
      status: 'active'
    },
    {
      id: '2',
      name: 'Zara Khan',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      rating: 4.7,
      bookings: 28,
      revenue: 420000,
      status: 'active'
    },
    {
      id: '3',
      name: 'Sofia Rodriguez',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      rating: 4.6,
      bookings: 25,
      revenue: 375000,
      status: 'active'
    }
  ]

  const recentActivity = [
    { type: 'booking', message: 'New booking for Priya Sharma', time: '2 min ago' },
    { type: 'escort', message: 'Sofia Rodriguez joined the agency', time: '1 hour ago' },
    { type: 'payment', message: 'Payment received from Rahul V.', time: '2 hours ago' },
    { type: 'review', message: '5-star review for Zara Khan', time: '3 hours ago' },
    { type: 'verification', message: 'Priya Sharma verification completed', time: '1 day ago' }
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

  return (
    <div className="min-h-screen bg-background">
      <AgencyNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Agency Dashboard</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Welcome back, Elite Escorts Mumbai
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
              <Link href="/agency/escorts/add">
                <Plus className="h-4 w-4 mr-2" />
                Add Escort
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Escorts</p>
                  <p className="text-2xl font-bold">{agencyStats.totalEscorts}</p>
                  <p className="text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +3 this month
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>



          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{agencyStats.totalBookings}</p>
                  <p className="text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +8% this month
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
                  <p className="text-2xl font-bold">{agencyStats.averageRating}</p>
                  <p className="text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +0.2 this month
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
                    <Link href="/agency/bookings">
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
                        <Image
                          src={booking.escortImage}
                          alt={booking.escortName}
                          width={40}
                          height={40}
                          className="rounded-full flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-sm sm:text-base truncate">{booking.escortName}</h4>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mt-1">
                            <span>{booking.clientName}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{booking.date}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{booking.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="font-medium text-sm sm:text-base">₹{booking.amount.toLocaleString()}</div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Performing Escorts */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Escorts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topEscorts.map((escort, index) => (
                    <div key={escort.id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <Image
                        src={escort.image}
                        alt={escort.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{escort.name}</h4>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span>{escort.rating}</span>
                          <span>•</span>
                          <span>{escort.bookings} bookings</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">₹{(escort.revenue / 1000).toFixed(0)}K</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'booking' ? 'bg-green-500' :
                        activity.type === 'escort' ? 'bg-blue-500' :
                        activity.type === 'payment' ? 'bg-purple-500' :
                        activity.type === 'review' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/agency/escorts/add">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Escort
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/agency/bookings">
                    <Calendar className="h-4 w-4 mr-2" />
                    Manage Bookings
                  </Link>
                </Button>

                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/agency/analytics">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 
