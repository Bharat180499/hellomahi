export interface Booking {
  id: string
  escortId: string
  escortName: string
  escortImage: string
  escortPhone?: string
  escortEmail?: string
  clientId: string
  clientName: string
  clientImage?: string
  clientPhone: string
  clientEmail: string
  agencyId?: string
  agencyName?: string
  date: string
  time: string
  duration: number
  services: string[]
  location: string
  amount: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show' | 'rescheduled'
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'partial'
  createdAt: string
  updatedAt: string
  notes?: string
  specialRequests?: string
  cancellationReason?: string
  cancellationFee?: number
  refundAmount?: number
  rating?: number
  review?: string
  reviewDate?: string
  isUrgent?: boolean
  isOvernight?: boolean
  isOutcall?: boolean
  isIncall?: boolean
  metadata?: {
    serviceType: string
    locationType: 'hotel' | 'residence' | 'office' | 'outdoor' | 'other'
    clientPreferences?: string[]
    escortNotes?: string
    clientNotes?: string
    verificationRequired?: boolean
    depositPaid?: boolean
    depositAmount?: number
  }
}

export interface BookingRequest {
  escortId: string
  date: string
  time: string
  duration: number
  services: string[]
  location: string
  amount: number
  notes?: string
  specialRequests?: string
  isUrgent?: boolean
  isOvernight?: boolean
  isOutcall?: boolean
  isIncall?: boolean
  metadata?: {
    serviceType: string
    locationType: 'hotel' | 'residence' | 'office' | 'outdoor' | 'other'
    clientPreferences?: string[]
    verificationRequired?: boolean
  }
}

export interface BookingResponse {
  success: boolean
  bookingId?: string
  message?: string
  error?: string
  requiresPayment?: boolean
  paymentIntent?: any
  estimatedArrival?: string
}

export interface BookingUpdate {
  date?: string
  time?: string
  duration?: number
  services?: string[]
  location?: string
  amount?: number
  notes?: string
  specialRequests?: string
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show' | 'rescheduled'
  metadata?: Partial<Booking['metadata']>
}

export interface BookingCancellation {
  reason: string
  refundAmount?: number
  cancellationFee?: number
  notes?: string
}

export interface BookingStats {
  totalBookings: number
  pendingBookings: number
  confirmedBookings: number
  completedBookings: number
  cancelledBookings: number
  totalRevenue: number
  averageRating: number
  completionRate: number
  cancellationRate: number
  monthlyStats: Array<{
    month: string
    bookings: number
    revenue: number
    completed: number
    cancelled: number
  }>
  topServices: Array<{
    service: string
    bookings: number
    revenue: number
  }>
  topLocations: Array<{
    location: string
    bookings: number
    revenue: number
  }>
}

export interface EscortBookingStats {
  escortId: string
  totalBookings: number
  completedBookings: number
  cancelledBookings: number
  totalRevenue: number
  averageRating: number
  completionRate: number
  cancellationRate: number
  monthlyEarnings: Array<{
    month: string
    earnings: number
    bookings: number
  }>
  topClients: Array<{
    clientId: string
    clientName: string
    bookings: number
    totalSpent: number
  }>
  serviceBreakdown: Array<{
    service: string
    bookings: number
    revenue: number
  }>
}

export interface AgencyBookingStats {
  agencyId: string
  totalBookings: number
  completedBookings: number
  cancelledBookings: number
  totalRevenue: number
  averageRating: number
  completionRate: number
  cancellationRate: number
  escortStats: Array<{
    escortId: string
    escortName: string
    bookings: number
    revenue: number
  }>
  monthlyStats: Array<{
    month: string
    bookings: number
    revenue: number
  }>
  topClients: Array<{
    clientId: string
    clientName: string
    bookings: number
    totalSpent: number
  }>
}

export interface BookingFilter {
  status?: string[]
  dateRange?: {
    start: string
    end: string
  }
  amountRange?: {
    min: number
    max: number
  }
  services?: string[]
  location?: string
  escortId?: string
  clientId?: string
  agencyId?: string
  isUrgent?: boolean
  isOvernight?: boolean
  paymentStatus?: string[]
}

export interface BookingSearch {
  query: string
  filters: BookingFilter
  sortBy: 'date' | 'amount' | 'status' | 'escort' | 'client'
  sortOrder: 'asc' | 'desc'
  page: number
  limit: number
}

export interface BookingSearchResult {
  bookings: Booking[]
  total: number
  page: number
  limit: number
  hasMore: boolean
  stats: {
    total: number
    pending: number
    confirmed: number
    completed: number
    cancelled: number
  }
}

export interface BookingNotification {
  id: string
  bookingId: string
  userId: string
  type: 'booking_created' | 'booking_confirmed' | 'booking_cancelled' | 'booking_completed' | 'booking_reminder' | 'payment_received' | 'review_received'
  title: string
  message: string
  data?: any
  read: boolean
  createdAt: string
}

export interface BookingReminder {
  id: string
  bookingId: string
  userId: string
  reminderTime: string
  message: string
  sent: boolean
  sentAt?: string
  createdAt: string
}

export interface BookingDispute {
  id: string
  bookingId: string
  reportedBy: 'client' | 'escort' | 'agency'
  reportedUserId: string
  reason: string
  description: string
  evidence?: string[]
  status: 'open' | 'investigating' | 'resolved' | 'closed'
  resolution?: string
  refundAmount?: number
  penaltyAmount?: number
  createdAt: string
  updatedAt: string
  resolvedAt?: string
}

export interface BookingVerification {
  id: string
  bookingId: string
  type: 'client_verification' | 'escort_verification' | 'location_verification'
  status: 'pending' | 'approved' | 'rejected'
  documents?: string[]
  notes?: string
  verifiedBy?: string
  verifiedAt?: string
  createdAt: string
  updatedAt: string
}

export interface BookingService {
  id: string
  name: string
  description: string
  duration: number
  price: number
  category: string
  isActive: boolean
  requiresVerification?: boolean
  maxDuration?: number
  minDuration?: number
  metadata?: {
    includes?: string[]
    excludes?: string[]
    requirements?: string[]
    restrictions?: string[]
  }
  createdAt: string
  updatedAt: string
}

export interface BookingLocation {
  id: string
  name: string
  type: 'hotel' | 'residence' | 'office' | 'outdoor' | 'other'
  address: string
  city: string
  state: string
  country: string
  zipCode: string
  coordinates?: {
    latitude: number
    longitude: number
  }
  isVerified: boolean
  isSafe: boolean
  safetyRating?: number
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface BookingAvailability {
  escortId: string
  date: string
  availableSlots: Array<{
    startTime: string
    endTime: string
    isAvailable: boolean
    bookingId?: string
  }>
  isAvailable: boolean
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface BookingCalendar {
  escortId: string
  month: string
  year: string
  availability: Array<{
    date: string
    isAvailable: boolean
    availableSlots: number
    bookedSlots: number
    totalSlots: number
  }>
  holidays: string[]
  blockedDates: string[]
  createdAt: string
  updatedAt: string
}

export interface BookingTemplate {
  id: string
  name: string
  description: string
  services: string[]
  duration: number
  price: number
  location: string
  notes?: string
  isActive: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface BookingAnalytics {
  overallStats: {
    totalBookings: number
    totalRevenue: number
    averageBookingValue: number
    completionRate: number
    cancellationRate: number
    averageRating: number
  }
  trends: {
    dailyBookings: Array<{
      date: string
      bookings: number
      revenue: number
    }>
    monthlyBookings: Array<{
      month: string
      bookings: number
      revenue: number
    }>
    serviceTrends: Array<{
      service: string
      bookings: number
      revenue: number
      growth: number
    }>
  }
  performance: {
    topEscorts: Array<{
      escortId: string
      escortName: string
      bookings: number
      revenue: number
      rating: number
    }>
    topClients: Array<{
      clientId: string
      clientName: string
      bookings: number
      totalSpent: number
    }>
    topLocations: Array<{
      location: string
      bookings: number
      revenue: number
    }>
  }
  issues: {
    cancelledBookings: number
    disputes: number
    noShows: number
    averageResolutionTime: number
  }
} 