"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { User, Phone, Clock, MapPin, Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CardHeader, CardTitle } from '@/components/ui/card'

import { Download, ArrowLeft, Share2, Shield, MessageCircle, Calendar, DollarSign, FileText, AlertCircle, XCircle, Trash2, Star, CreditCard, ClockIcon } from 'lucide-react'
import UserNavigation from '@/components/UserNavigation'

interface BookingDetail {
  id: string
  escortName: string
  escortImage: string
  escortId: string
  escortPhone: string
  escortEmail: string
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
  paymentStatus: 'pending' | 'paid' | 'refunded'
  paymentMethod: string
  bookingDate: string
  cancellationPolicy: string
  specialRequests?: string
  isUrgent: boolean
  isOvernight: boolean
  agencyName?: string
  agencyContact?: string
}

export default function UserBookingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [booking, setBooking] = useState<BookingDetail>({
    id: params.id,
    escortName: 'Priya Sharma',
    escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    escortId: 'priya-sharma',
    escortPhone: '+91 98765 43210',
    escortEmail: 'priya@example.com',
    date: '2024-01-25',
    time: '8:00 PM',
    duration: '3 hours',
    amount: 30000,
    status: 'confirmed',
    service: 'Dinner Date',
    location: 'Taj Hotel, Mumbai',
    notes: 'Please arrive 15 minutes early. Client prefers upscale restaurant.',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    bookingDate: '2024-01-20',
    cancellationPolicy: 'Free cancellation up to 24 hours before booking',
    specialRequests: 'Vegetarian dinner options preferred',
    isUrgent: false,
    isOvernight: false,
    agencyName: 'Elite Companions',
    agencyContact: '+91 98765 43211'
  })

  const handleEditBooking = () => {
    alert('Edit booking functionality will be implemented')
  }

  const handleCancelBooking = () => {
    if (confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      alert('Booking cancelled successfully')
      router.push('/user/bookings')
    }
  }

  const handleDeleteBooking = () => {
    if (confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      alert('Booking deleted successfully')
      router.push('/user/bookings')
    }
  }

  const handleMessageEscort = () => {
    alert('Opening chat with escort')
  }

  const handleCallEscort = () => {
    window.open(`tel:${booking.escortPhone}`, '_self')
  }

  const handleDownloadReceipt = () => {
    alert('Downloading receipt...')
  }

  const handleShareBooking = () => {
    alert('Sharing booking details...')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'refunded': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bookings
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Booking Details</h1>
            <p className="text-muted-foreground">Booking #{booking.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleShareBooking}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" onClick={handleDownloadReceipt}>
            <Download className="h-4 w-4 mr-2" />
            Receipt
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Booking Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    {booking.status === 'confirmed' && 'Your booking is confirmed and ready'}
                    {booking.status === 'pending' && 'Waiting for escort confirmation'}
                    {booking.status === 'completed' && 'Booking completed successfully'}
                    {booking.status === 'cancelled' && 'Booking has been cancelled'}
                  </p>
                </div>
                <div className="text-right">
                  <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                    {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Escort Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Escort Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Image
                  src={booking.escortImage}
                  alt={booking.escortName}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{booking.escortName}</h3>
                  <p className="text-muted-foreground">{booking.service}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Button variant="outline" size="sm" onClick={handleMessageEscort}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleCallEscort}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">{booking.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-sm text-muted-foreground">{booking.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ClockIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">{booking.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Amount</p>
                    <p className="text-sm text-muted-foreground">₹{booking.amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{booking.location}</p>
                </div>
              </div>
              {booking.notes && (
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="font-medium">Notes</p>
                    <p className="text-sm text-muted-foreground">{booking.notes}</p>
                  </div>
                </div>
              )}
              {booking.specialRequests && (
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="font-medium">Special Requests</p>
                    <p className="text-sm text-muted-foreground">{booking.specialRequests}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Payment Method</p>
                  <p className="text-sm text-muted-foreground">{booking.paymentMethod}</p>
                </div>
                <div>
                  <p className="font-medium">Booking Date</p>
                  <p className="text-sm text-muted-foreground">{booking.bookingDate}</p>
                </div>
              </div>
              <div>
                <p className="font-medium">Cancellation Policy</p>
                <p className="text-sm text-muted-foreground">{booking.cancellationPolicy}</p>
              </div>
            </CardContent>
          </Card>

          {/* Review Section */}
          {booking.status === 'completed' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Your Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                {booking.rating ? (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < booking.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{booking.rating}/5</span>
                    </div>
                    {booking.review && (
                      <p className="text-sm text-muted-foreground">{booking.review}</p>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-2">No review yet</p>
                    <Button variant="outline" size="sm">
                      Write a Review
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {booking.status === 'pending' && (
                <>
                  <Button variant="outline" className="w-full justify-start" onClick={handleEditBooking}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Booking
                  </Button>
                  <Button variant="destructive" className="w-full justify-start" onClick={handleCancelBooking}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancel Booking
                  </Button>
                </>
              )}
              {booking.status === 'confirmed' && (
                <Button variant="destructive" className="w-full justify-start" onClick={handleCancelBooking}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel Booking
                </Button>
              )}
              <Button variant="outline" className="w-full justify-start" onClick={handleDeleteBooking}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Booking
              </Button>
            </CardContent>
          </Card>

          {/* Agency Information */}
          {booking.agencyName && (
            <Card>
              <CardHeader>
                <CardTitle>Agency Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium">{booking.agencyName}</p>
                    <p className="text-sm text-muted-foreground">Agency</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Agency
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Booking Flags */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {booking.isUrgent && (
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Urgent Booking</span>
                </div>
              )}
              {booking.isOvernight && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Overnight Service</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
