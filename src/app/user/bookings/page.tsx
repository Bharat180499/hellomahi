"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Star, Eye, X, User, MapPin, Clock, Calendar, DollarSign, CheckCircle, XCircle, AlertCircle, MessageCircle, Download, MoreVertical, RefreshCw, Check } from 'lucide-react'
import { useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import UserNavigation from '@/components/UserNavigation'

interface Booking {
  id: string
  escortName: string
  escortImage: string
  escortId: string
  date: string
  time: string
  duration: string
  amount: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  service: string
  location: string
  notes?: string
  rating?: number
  review?: string
}

export default function UserBookingsPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | 'all'>('all')

  const bookings: Booking[] = [
    {
      id: '1',
      escortName: 'Priya Sharma',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      escortId: 'priya-sharma',
      date: '2024-01-25',
      time: '8:00 PM',
      duration: '3 hours',
      amount: 30000,
      status: 'confirmed',
      service: 'Dinner Date',
      location: 'Mumbai',
      notes: 'Please arrive 15 minutes early'
    },
    {
      id: '2',
      escortName: 'Zara Khan',
      escortImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      escortId: 'zara-khan',
      date: '2024-01-24',
      time: '9:00 PM',
      duration: 'Overnight',
      amount: 45000,
      status: 'completed',
      service: 'Overnight',
      location: 'Delhi',
      rating: 5,
      review: 'Excellent service, very professional'
    },
    {
      id: '3',
      escortName: 'Sofia Rodriguez',
      escortImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      escortId: 'sofia-rodriguez',
      date: '2024-01-23',
      time: '7:00 PM',
      duration: '2 hours',
      amount: 35000,
      status: 'pending',
      service: 'Social Event',
      location: 'Bangalore'
    },
    {
      id: '4',
      escortName: 'Aisha Patel',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      escortId: 'aisha-patel',
      date: '2024-01-20',
      time: '6:00 PM',
      duration: '4 hours',
      amount: 40000,
      status: 'completed',
      service: 'Party Companion',
      location: 'Mumbai',
      rating: 4,
      review: 'Great company for the event'
    },
    {
      id: '5',
      escortName: 'Meera Nair',
      escortImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      escortId: 'meera-nair',
      date: '2024-01-18',
      time: '10:00 PM',
      duration: '2 hours',
      amount: 25000,
      status: 'cancelled',
      service: 'Massage',
      location: 'Chennai'
    }
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'completed': return <CheckCircle className="h-4 w-4 text-blue-600" />
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-600" />
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const handleSearch = () => {
    setIsSearching(true)
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false)
    }, 500)
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus
    const matchesSearch = searchTerm === '' || 
      booking.escortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length
  }

  return (
    <div className="min-h-screen bg-background">
      <UserNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">My Bookings</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage and track all your bookings
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => alert('Exporting bookings data...')}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button asChild>
              <Link href="/escorts">
                <Calendar className="h-4 w-4 mr-2" />
                New Booking
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
              <p className="text-xs text-muted-foreground">Confirmed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
              <p className="text-xs text-muted-foreground">Cancelled</p>
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
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch()
                      }
                    }}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
              <Button variant="outline" onClick={handleSearch} disabled={isSearching}>
                <Search className="h-4 w-4 mr-2" />
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
              >
                <option value="all">All Time</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Booking Info */}
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Image
                        src={booking.escortImage}
                        alt={booking.escortName}
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                      <div className="absolute -bottom-1 -right-1">
                        {getStatusIcon(booking.status)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{booking.escortName}</h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.date} at {booking.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">₹{booking.amount.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm text-muted-foreground">Service: </span>
                        <span className="text-sm font-medium">{booking.service}</span>
                        {booking.notes && (
                          <div className="mt-1">
                            <span className="text-sm text-muted-foreground">Notes: </span>
                            <span className="text-sm">{booking.notes}</span>
                          </div>
                        )}
                      </div>
                      {booking.rating && (
                        <div className="mt-2 flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < booking.rating! ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">({booking.rating}/5)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/user/bookings/${booking.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/escorts/${booking.escortId}`}>
                        <User className="h-4 w-4 mr-2" />
                        View Profile
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    {booking.status === 'completed' && !booking.rating && (
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                    )}
                    {booking.status === 'pending' && (
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <XCircle className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start by booking your first escort'
                }
              </p>
              <Button asChild>
                <Link href="/escorts">
                  Browse Escorts
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
} 