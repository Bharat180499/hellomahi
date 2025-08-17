"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
  Filter,
  Search,
  Eye,
  MessageCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'

export default function EscortBookingsPage() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showFilterModal, setShowFilterModal] = useState(false)

  const bookings = [
    {
      id: '1',
      clientName: 'Rahul Verma',
      clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      date: '2024-01-25',
      time: '8:00 PM',
      duration: '2 hours',
      amount: 30000,
      status: 'confirmed',
      service: 'Dinner Date',
      location: 'Taj Lands End, Mumbai',
      clientPhone: '+91 98765 43210',
      clientEmail: 'rahul.verma@example.com',
      notes: 'Client prefers upscale restaurant. Will arrive at 7:45 PM.',
      rating: 4.8,
      reviews: 12
    },
    {
      id: '2',
      clientName: 'Amit Patel',
      clientImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      date: '2024-01-24',
      time: '9:00 PM',
      duration: 'Overnight',
      amount: 45000,
      status: 'completed',
      service: 'Overnight',
      location: 'Client Residence, Bandra West',
      clientPhone: '+91 98765 43211',
      clientEmail: 'amit.patel@example.com',
      notes: 'Completed successfully. Client was very satisfied.',
      rating: 4.9,
      reviews: 8
    },
    {
      id: '3',
      clientName: 'Vikram Singh',
      clientImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      date: '2024-01-23',
      time: '7:00 PM',
      duration: '3 hours',
      amount: 35000,
      status: 'pending',
      service: 'Social Event',
      location: 'Marriott Hotel, Mumbai',
      clientPhone: '+91 98765 43212',
      clientEmail: 'vikram.singh@example.com',
      notes: 'Awaiting client confirmation for final details.',
      rating: 4.7,
      reviews: 15
    },
    {
      id: '4',
      clientName: 'Rajesh Kumar',
      clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      date: '2024-01-22',
      time: '6:00 PM',
      duration: '1 hour',
      amount: 15000,
      status: 'cancelled',
      service: 'Private Time',
      location: 'Client Office, Andheri',
      clientPhone: '+91 98765 43213',
      clientEmail: 'rajesh.kumar@example.com',
      notes: 'Cancelled due to client emergency.',
      rating: 4.6,
      reviews: 6
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
      case 'confirmed': return CheckCircle
      case 'completed': return CheckCircle
      case 'pending': return AlertCircle
      case 'cancelled': return XCircle
      default: return Clock
    }
  }

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'upcoming') {
      return ['confirmed', 'pending'].includes(booking.status)
    } else if (activeTab === 'completed') {
      return booking.status === 'completed'
    } else if (activeTab === 'cancelled') {
      return booking.status === 'cancelled'
    }
    return true
  }).filter(booking => {
    if (selectedStatus === 'all') return true
    return booking.status === selectedStatus
  })

  const upcomingBookings = bookings.filter(b => ['confirmed', 'pending'].includes(b.status))
  const completedBookings = bookings.filter(b => b.status === 'completed')
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled')

  const handleFilter = () => {
    setShowFilterModal(true)
  }

  const handleViewDetails = (bookingId: string) => {
    alert(`Viewing details for booking: ${bookingId}`)
  }

  const handleMessage = (bookingId: string) => {
    alert(`Opening chat for booking: ${bookingId}`)
  }

  const handleAcceptBooking = (bookingId: string) => {
    if (confirm('Are you sure you want to accept this booking?')) {
      alert(`Booking ${bookingId} accepted successfully!`)
    }
  }

  const handleDeclineBooking = (bookingId: string) => {
    if (confirm('Are you sure you want to decline this booking?')) {
      alert(`Booking ${bookingId} declined.`)
    }
  }

  const handleMoreOptions = (bookingId: string) => {
    alert(`More options for booking: ${bookingId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Bookings Management</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage your appointments and client interactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleFilter}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold">{upcomingBookings.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedBookings.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>



        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cancelled</p>
                <p className="text-2xl font-bold">{cancelledBookings.length}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({completedBookings.length})</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled ({cancelledBookings.length})</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm text-gray-900 bg-white"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => {
                const StatusIcon = getStatusIcon(booking.status)
                return (
                  <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Client Info */}
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{booking.clientName}</h3>
                          <p className="text-sm text-muted-foreground">{booking.service}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3 inline mr-1" />
                              {booking.date}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              <Clock className="h-3 w-3 inline mr-1" />
                              {booking.time}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 inline mr-1" />
                              {booking.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Booking Details */}
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(booking.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {booking.status}
                          </Badge>
                          <Button variant="ghost" size="sm" onClick={() => handleMoreOptions(booking.id)}>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">₹{booking.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{booking.duration}</p>
                        </div>
                      </div>
                    </div>

                    {/* Client Contact & Actions */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>
                            <Phone className="h-3 w-3 inline mr-1" />
                            {booking.clientPhone}
                          </span>
                          <span>
                            <Mail className="h-3 w-3 inline mr-1" />
                            {booking.clientEmail}
                          </span>
                          {booking.rating && (
                            <span>
                              <Star className="h-3 w-3 inline mr-1" />
                              {booking.rating} ({booking.reviews} reviews)
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                                                <Button variant="outline" size="sm" asChild>
                        <Link href={`/escort/bookings/${booking.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                          <Button variant="outline" size="sm" onClick={() => handleMessage(booking.id)}>
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          {booking.status === 'pending' && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleAcceptBooking(booking.id)}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Accept
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDeclineBooking(booking.id)}>
                                <XCircle className="h-4 w-4 mr-2" />
                                Decline
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                      {booking.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            <strong>Notes:</strong> {booking.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-500 mb-4">
                  {activeTab === 'upcoming' 
                    ? 'You have no upcoming bookings at the moment.'
                    : activeTab === 'completed'
                    ? 'No completed bookings to show.'
                    : 'No cancelled bookings to show.'
                  }
                </p>

              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Calendar View (Placeholder) */}
      <Card>
        <CardHeader>
          <CardTitle>Calendar View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Calendar view coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 