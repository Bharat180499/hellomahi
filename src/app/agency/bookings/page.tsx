"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Search, Star, Eye, User, Users, MapPin, Clock, Calendar, TrendingUp, ClockIcon, CalendarIcon, Star, Calendar } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Calendar, Clock, MapPin, DollarSign, CheckCircle, XCircle, AlertCircle, Phone, Mail, Eye, Star, Plus, TrendingUp, CalendarIcon, ClockIcon, Users } from 'lucide-react'
import AgencyNavigation from '@/components/AgencyNavigation'

interface Booking {
  id: string
  escortId: string
  escortName: string
  escortImage: string
  clientId: string
  clientName: string
  clientImage: string
  clientPhone: string
  clientEmail: string
  date: string
  time: string
  duration: number
  services: string[]
  location: string
  amount: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  createdAt: Date
  notes?: string
  clientRating?: number
  clientReview?: string
}

export default function AgencyBookingsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all')
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'escort'>('date')

  const bookings: Booking[] = [
    {
      id: '1',
      escortId: 'escort1',
      escortName: 'Priya Sharma',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      clientId: 'client1',
      clientName: 'Rahul Verma',
      clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      clientPhone: '+91 98765 43210',
      clientEmail: 'rahul@example.com',
      date: '2024-01-25',
      time: '20:00',
      duration: 2,
      services: ['Companionship', 'Dinner Date'],
      location: 'Taj Hotel, Mumbai',
      amount: 30000,
      status: 'confirmed',
      paymentStatus: 'paid',
      createdAt: new Date('2024-01-20'),
      notes: 'Business dinner at Taj Hotel'
    },
    {
      id: '2',
      escortId: 'escort2',
      escortName: 'Zara Khan',
      escortImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      clientId: 'client2',
      clientName: 'Amit Patel',
      clientImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      clientPhone: '+91 98765 43211',
      clientEmail: 'amit@example.com',
      date: '2024-01-24',
      time: '21:00',
      duration: 3,
      services: ['Massage', 'Companionship'],
      location: 'Client Residence, Bandra West',
      amount: 45000,
      status: 'completed',
      paymentStatus: 'paid',
      createdAt: new Date('2024-01-18'),
      notes: 'Weekend relaxation session',
      clientRating: 5,
      clientReview: 'Excellent service, very professional'
    },
    {
      id: '3',
      escortId: 'escort1',
      escortName: 'Priya Sharma',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      clientId: 'client3',
      clientName: 'Vikram Singh',
      clientImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      clientPhone: '+91 98765 43212',
      clientEmail: 'vikram@example.com',
      date: '2024-01-26',
      time: '19:00',
      duration: 2,
      services: ['Companionship', 'VIP Service'],
      location: 'Marriott Hotel, Mumbai',
      amount: 35000,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date('2024-01-22'),
      notes: 'VIP client, special attention required'
    },
    {
      id: '4',
      escortId: 'escort3',
      escortName: 'Sofia Rodriguez',
      escortImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      clientId: 'client4',
      clientName: 'Rajesh Kumar',
      clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      clientPhone: '+91 98765 43213',
      clientEmail: 'rajesh@example.com',
      date: '2024-01-23',
      time: '22:00',
      duration: 1,
      services: ['Companionship'],
      location: 'Client Office, Andheri',
      amount: 15000,
      status: 'cancelled',
      paymentStatus: 'refunded',
      createdAt: new Date('2024-01-19'),
      notes: 'Client cancelled due to emergency'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100'
      case 'completed': return 'text-blue-600 bg-blue-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      case 'no-show': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'refunded': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const filteredBookings = bookings
    .filter(booking => {
      const matchesSearch = 
        booking.escortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.location.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
      
      const matchesDate = (() => {
        const bookingDate = new Date(booking.date)
        const today = new Date()
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
        
        switch (dateFilter) {
          case 'today':
            return bookingDate.toDateString() === today.toDateString()
          case 'week':
            return bookingDate >= weekAgo
          case 'month':
            return bookingDate >= monthAgo
          default:
            return true
        }
      })()
      
      return matchesSearch && matchesStatus && matchesDate
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'amount':
          return b.amount - a.amount
        case 'escort':
          return a.escortName.localeCompare(b.escortName)
        case 'date':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })

  const thisMonthBookings = bookings
    .filter(booking => {
      const bookingDate = new Date(booking.date)
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      return bookingDate >= monthAgo
    }).length

  return (
    <div className="min-h-screen bg-background">
      <AgencyNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Bookings Management</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage all bookings and track performance
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => alert('Exporting bookings data...')}>
              <Calendar className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <p className="text-xl sm:text-2xl font-bold">{bookings.length}</p>
                </div>
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Bookings</p>
                                      <p className="text-xl sm:text-2xl font-bold">{bookings.length}</p>
                </div>
                                  <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">This Month</p>
                  <p className="text-xl sm:text-2xl font-bold">{thisMonthBookings}</p>
                </div>
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-xl sm:text-2xl font-bold">{bookings.filter(b => b.status === 'pending').length}</p>
                </div>
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by escort, client, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm text-gray-900 bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as any)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm text-gray-900 bg-white"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm text-gray-900 bg-white"
              >
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
                <option value="escort">Sort by Escort</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        <div className="space-y-3 sm:space-y-4">
          {filteredBookings.map(booking => (
            <Card key={booking.id}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={booking.escortImage}
                        alt={booking.escortName}
                        width={50}
                        height={50}
                        className="rounded-full flex-shrink-0"
                      />
                      <div>
                        <h3 className="font-medium text-sm sm:text-base">{booking.escortName}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">Escort</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Image
                        src={booking.clientImage}
                        alt={booking.clientName}
                        width={50}
                        height={50}
                        className="rounded-full flex-shrink-0"
                      />
                      <div>
                        <h3 className="font-medium text-sm sm:text-base">{booking.clientName}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">Client</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="font-bold text-lg sm:text-xl">₹{booking.amount.toLocaleString()}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      Total Amount
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">{booking.date}</p>
                      <p className="text-xs text-muted-foreground">{booking.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm font-medium">{booking.duration} hours</p>
                      <p className="text-xs text-muted-foreground">Duration</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">{booking.location}</p>
                      <p className="text-xs text-muted-foreground">Location</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">{booking.services.join(', ')}</p>
                      <p className="text-xs text-muted-foreground">Services</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-4 border-t">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                    </span>
                    {booking.clientRating && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-xs sm:text-sm">{booking.clientRating}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/agency/bookings/${booking.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {booking.notes && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-xs sm:text-sm">
                      <strong>Notes:</strong> {booking.notes}
                    </p>
                  </div>
                )}

                {booking.clientReview && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-xs sm:text-sm">
                      <strong>Client Review:</strong> {booking.clientReview}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No bookings found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'No bookings have been made yet'
                }
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Booking
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
} 
