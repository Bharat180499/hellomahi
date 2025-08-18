"use client"

import { CardHeader, CardTitle } from '@/components/ui/card'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit } from 'lucide-react'

import { Download, Eye, Star, Calendar, DollarSign, CheckCircle, XCircle, AlertCircle, MessageCircle, MoreVertical, Clock, CalendarIcon, MapPin, Phone, Mail, Share2 } from 'lucide-react'
import Image from 'next/image'
import type { Booking } from '@/types/bookings'

interface BookingCardProps {
  booking: Booking
  userType: 'client' | 'escort' | 'agency'
  onView?: (booking: Booking) => void
  onEdit?: (booking: Booking) => void
  onCancel?: (booking: Booking) => void
  onConfirm?: (booking: Booking) => void
  onComplete?: (booking: Booking) => void
  onMessage?: (booking: Booking) => void
  onDownload?: (booking: Booking) => void
  showActions?: boolean
  compact?: boolean
}

export default function BookingCard({
  booking,
  userType,
  onView,
  onEdit,
  onCancel,
  onConfirm,
  onComplete,
  onMessage,
  onDownload,
  showActions = true,
  compact = false
}: BookingCardProps) {
  const [showActionsMenu, setShowActionsMenu] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100'
      case 'completed':
        return 'text-blue-600 bg-blue-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'cancelled':
        return 'text-red-600 bg-red-100'
      case 'no-show':
        return 'text-red-600 bg-red-100'
      case 'rescheduled':
        return 'text-purple-600 bg-purple-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'refunded':
        return 'text-red-600 bg-red-100'
      case 'partial':
        return 'text-orange-600 bg-orange-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'pending':
        return <AlertCircle className="h-4 w-4" />
      case 'cancelled':
        return <XCircle className="h-4 w-4" />
      case 'no-show':
        return <XCircle className="h-4 w-4" />
      case 'rescheduled':
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const canConfirm = userType === 'escort' && booking.status === 'pending'
  const canComplete = userType === 'escort' && booking.status === 'confirmed'
  const canCancel = ['pending', 'confirmed'].includes(booking.status)
  const canEdit = booking.status === 'pending'

  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <div className="font-medium text-sm">
              {userType === 'client' ? booking.escortName : booking.clientName}
            </div>
            <div className="text-xs text-muted-foreground">
              {new Date(booking.date).toLocaleDateString()} at {booking.time}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge 
            variant="secondary" 
            className={`text-xs ${getStatusColor(booking.status)}`}
          >
            {booking.status}
          </Badge>
          <div className="font-medium text-sm">₹{booking.amount.toLocaleString()}</div>
        </div>
      </div>
    )
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <CardTitle className="text-lg">
                {userType === 'client' ? booking.escortName : booking.clientName}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {booking.services.join(', ')}
              </p>
            </div>
          </div>
          
          {showActions && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowActionsMenu(!showActionsMenu)}
                className="h-8 w-8 p-0"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>

              {showActionsMenu && (
                <div className="absolute top-full right-0 mt-1 bg-background border rounded-lg shadow-lg py-1 z-10 min-w-[160px]">
                  {onView && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        onView(booking)
                        setShowActionsMenu(false)
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  )}
                  
                  {onMessage && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        onMessage(booking)
                        setShowActionsMenu(false)
                      }}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  )}
                  
                  {canEdit && onEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        onEdit(booking)
                        setShowActionsMenu(false)
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                  
                  {canConfirm && onConfirm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        onConfirm(booking)
                        setShowActionsMenu(false)
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Confirm
                    </Button>
                  )}
                  
                  {canComplete && onComplete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        onComplete(booking)
                        setShowActionsMenu(false)
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete
                    </Button>
                  )}
                  
                  {onDownload && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        onDownload(booking)
                        setShowActionsMenu(false)
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                  
                  {canCancel && onCancel && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-red-600 hover:text-red-700"
                      onClick={() => {
                        onCancel(booking)
                        setShowActionsMenu(false)
                      }}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status and Payment */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge 
              variant="secondary" 
              className={`text-xs ${getStatusColor(booking.status)}`}
            >
              <div className="flex items-center gap-1">
                {getStatusIcon(booking.status)}
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </div>
            </Badge>
            <Badge 
              variant="secondary" 
              className={`text-xs ${getPaymentStatusColor(booking.paymentStatus)}`}
            >
              {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">₹{booking.amount.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              {booking.duration} hour{booking.duration > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                <p className="text-xs text-muted-foreground">{booking.time}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{booking.location}</p>
                <p className="text-xs text-muted-foreground">Location</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{booking.duration} hour{booking.duration > 1 ? 's' : ''}</p>
                <p className="text-xs text-muted-foreground">Duration</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">₹{booking.amount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Amount</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {userType === 'client' && booking.escortPhone && (
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </Button>
              )}
              {userType === 'escort' && booking.clientPhone && (
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </Button>
              )}
              
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <Mail className="h-3 w-3 mr-1" />
                Email
              </Button>
              
              {onMessage && (
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Message
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {booking.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium">{booking.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Notes */}
        {booking.notes && (
          <div className="border-t pt-3">
            <p className="text-sm text-muted-foreground">
              <strong>Notes:</strong> {booking.notes}
            </p>
          </div>
        )}

        {/* Special Requests */}
        {booking.specialRequests && (
          <div className="border-t pt-3">
            <p className="text-sm text-muted-foreground">
              <strong>Special Requests:</strong> {booking.specialRequests}
            </p>
          </div>
        )}

        {/* Quick Actions */}
        {showActions && (
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {canConfirm && onConfirm && (
                  <Button size="sm" onClick={() => onConfirm(booking)}>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Confirm
                  </Button>
                )}
                
                {canComplete && onComplete && (
                  <Button size="sm" onClick={() => onComplete(booking)}>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Complete
                  </Button>
                )}
                
                {canCancel && onCancel && (
                  <Button variant="outline" size="sm" onClick={() => onCancel(booking)}>
                    <XCircle className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {onDownload && (
                  <Button variant="outline" size="sm" onClick={() => onDownload(booking)}>
                    <Download className="h-4 w-4 mr-1" />
                    Receipt
                  </Button>
                )}
                
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 