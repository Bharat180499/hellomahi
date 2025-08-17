import type { Booking, BookingRequest, BookingUpdate } from '@/types/bookings'

/**
 * Validate booking request data
 */
export function validateBookingRequest(data: BookingRequest): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  // Required fields
  if (!data.escortId) errors.push('Escort ID is required')
  if (!data.date) errors.push('Date is required')
  if (!data.time) errors.push('Time is required')
  if (!data.duration || data.duration <= 0) errors.push('Duration must be greater than 0')
  if (!data.services || data.services.length === 0) errors.push('At least one service is required')
  if (!data.location) errors.push('Location is required')
  if (!data.amount || data.amount <= 0) errors.push('Amount must be greater than 0')

  // Date validation
  if (data.date) {
    const bookingDate = new Date(data.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (bookingDate < today) {
      errors.push('Booking date cannot be in the past')
    }
  }

  // Time validation
  if (data.time) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    if (!timeRegex.test(data.time)) {
      errors.push('Invalid time format (HH:MM)')
    }
  }

  // Duration validation
  if (data.duration) {
    if (data.duration > 24) {
      errors.push('Duration cannot exceed 24 hours')
    }
    if (data.duration < 0.5) {
      errors.push('Duration must be at least 30 minutes')
    }
  }

  // Amount validation
  if (data.amount) {
    if (data.amount < 1000) {
      errors.push('Minimum booking amount is ₹1,000')
    }
    if (data.amount > 1000000) {
      errors.push('Maximum booking amount is ₹10,00,000')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Calculate booking total based on services and duration
 */
export function calculateBookingTotal(services: string[], duration: number, baseRates: Record<string, number>): number {
  let total = 0

  services.forEach(service => {
    const baseRate = baseRates[service] || 5000 // Default rate
    total += baseRate * duration
  })

  return total
}

/**
 * Calculate cancellation fee based on cancellation time
 */
export function calculateCancellationFee(booking: Booking, cancellationTime: Date): number {
  const bookingDateTime = new Date(`${booking.date}T${booking.time}`)
  const timeDifference = bookingDateTime.getTime() - cancellationTime.getTime()
  const hoursDifference = timeDifference / (1000 * 60 * 60)

  // Cancellation policy
  if (hoursDifference >= 24) {
    // More than 24 hours: 10% fee
    return Math.round(booking.amount * 0.1)
  } else if (hoursDifference >= 12) {
    // 12-24 hours: 25% fee
    return Math.round(booking.amount * 0.25)
  } else if (hoursDifference >= 6) {
    // 6-12 hours: 50% fee
    return Math.round(booking.amount * 0.5)
  } else {
    // Less than 6 hours: 100% fee
    return booking.amount
  }
}

/**
 * Check if booking can be cancelled
 */
export function canCancelBooking(booking: Booking): { canCancel: boolean; reason?: string } {
  if (booking.status === 'cancelled') {
    return { canCancel: false, reason: 'Booking is already cancelled' }
  }

  if (booking.status === 'completed') {
    return { canCancel: false, reason: 'Booking is already completed' }
  }

  const bookingDateTime = new Date(`${booking.date}T${booking.time}`)
  const now = new Date()
  const timeDifference = bookingDateTime.getTime() - now.getTime()
  const hoursDifference = timeDifference / (1000 * 60 * 60)

  if (hoursDifference < 1) {
    return { canCancel: false, reason: 'Cannot cancel within 1 hour of booking time' }
  }

  return { canCancel: true }
}

/**
 * Check if booking can be rescheduled
 */
export function canRescheduleBooking(booking: Booking): { canReschedule: boolean; reason?: string } {
  if (booking.status === 'cancelled') {
    return { canReschedule: false, reason: 'Cannot reschedule cancelled booking' }
  }

  if (booking.status === 'completed') {
    return { canReschedule: false, reason: 'Cannot reschedule completed booking' }
  }

  const bookingDateTime = new Date(`${booking.date}T${booking.time}`)
  const now = new Date()
  const timeDifference = bookingDateTime.getTime() - now.getTime()
  const hoursDifference = timeDifference / (1000 * 60 * 60)

  if (hoursDifference < 2) {
    return { canReschedule: false, reason: 'Cannot reschedule within 2 hours of booking time' }
  }

  return { canReschedule: true }
}

/**
 * Get booking status color and icon
 */
export function getBookingStatusInfo(status: Booking['status']) {
  switch (status) {
    case 'pending':
      return {
        color: 'text-yellow-600 bg-yellow-100',
        icon: 'clock',
        label: 'Pending'
      }
    case 'confirmed':
      return {
        color: 'text-green-600 bg-green-100',
        icon: 'check-circle',
        label: 'Confirmed'
      }
    case 'completed':
      return {
        color: 'text-blue-600 bg-blue-100',
        icon: 'check-circle',
        label: 'Completed'
      }
    case 'cancelled':
      return {
        color: 'text-red-600 bg-red-100',
        icon: 'x-circle',
        label: 'Cancelled'
      }
    case 'no-show':
      return {
        color: 'text-red-600 bg-red-100',
        icon: 'x-circle',
        label: 'No Show'
      }
    case 'rescheduled':
      return {
        color: 'text-purple-600 bg-purple-100',
        icon: 'calendar',
        label: 'Rescheduled'
      }
    default:
      return {
        color: 'text-gray-600 bg-gray-100',
        icon: 'help-circle',
        label: 'Unknown'
      }
  }
}

/**
 * Get payment status color and icon
 */
export function getPaymentStatusInfo(status: Booking['paymentStatus']) {
  switch (status) {
    case 'pending':
      return {
        color: 'text-yellow-600 bg-yellow-100',
        icon: 'clock',
        label: 'Pending'
      }
    case 'paid':
      return {
        color: 'text-green-600 bg-green-100',
        icon: 'check-circle',
        label: 'Paid'
      }
    case 'refunded':
      return {
        color: 'text-red-600 bg-red-100',
        icon: 'refresh-ccw',
        label: 'Refunded'
      }
    case 'partial':
      return {
        color: 'text-orange-600 bg-orange-100',
        icon: 'minus-circle',
        label: 'Partial'
      }
    default:
      return {
        color: 'text-gray-600 bg-gray-100',
        icon: 'help-circle',
        label: 'Unknown'
      }
  }
}

/**
 * Format booking duration
 */
export function formatDuration(duration: number): string {
  if (duration === 1) {
    return '1 hour'
  } else if (duration < 1) {
    const minutes = Math.round(duration * 60)
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`
  } else {
    return `${duration} hour${duration !== 1 ? 's' : ''}`
  }
}

/**
 * Format booking date and time
 */
export function formatBookingDateTime(date: string, time: string): string {
  const bookingDate = new Date(`${date}T${time}`)
  return bookingDate.toLocaleString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Get booking time remaining
 */
export function getTimeRemaining(booking: Booking): { days: number; hours: number; minutes: number; isOverdue: boolean } {
  const bookingDateTime = new Date(`${booking.date}T${booking.time}`)
  const now = new Date()
  const timeDifference = bookingDateTime.getTime() - now.getTime()

  if (timeDifference < 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      isOverdue: true
    }
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))

  return {
    days,
    hours,
    minutes,
    isOverdue: false
  }
}

/**
 * Generate booking reference number
 */
export function generateBookingReference(): string {
  const timestamp = Date.now().toString()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `BK${timestamp.slice(-6)}${random}`
}



/**
 * Check if booking is urgent
 */
export function isUrgentBooking(booking: Booking): boolean {
  if (!booking.isUrgent) return false

  const bookingDateTime = new Date(`${booking.date}T${booking.time}`)
  const now = new Date()
  const timeDifference = bookingDateTime.getTime() - now.getTime()
  const hoursDifference = timeDifference / (1000 * 60 * 60)

  return hoursDifference <= 24
}

/**
 * Get booking priority level
 */
export function getBookingPriority(booking: Booking): 'low' | 'medium' | 'high' {
  if (booking.isUrgent) return 'high'
  if (booking.amount > 50000) return 'high'
  if (booking.amount > 25000) return 'medium'
  return 'low'
}

/**
 * Validate booking update data
 */
export function validateBookingUpdate(updates: BookingUpdate): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  // Date validation
  if (updates.date) {
    const bookingDate = new Date(updates.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (bookingDate < today) {
      errors.push('Booking date cannot be in the past')
    }
  }

  // Time validation
  if (updates.time) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    if (!timeRegex.test(updates.time)) {
      errors.push('Invalid time format (HH:MM)')
    }
  }

  // Duration validation
  if (updates.duration) {
    if (updates.duration > 24) {
      errors.push('Duration cannot exceed 24 hours')
    }
    if (updates.duration < 0.5) {
      errors.push('Duration must be at least 30 minutes')
    }
  }

  // Amount validation
  if (updates.amount) {
    if (updates.amount < 1000) {
      errors.push('Minimum booking amount is ₹1,000')
    }
    if (updates.amount > 1000000) {
      errors.push('Maximum booking amount is ₹10,00,000')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Sort bookings by various criteria
 */
export function sortBookings(bookings: Booking[], sortBy: string, sortOrder: 'asc' | 'desc' = 'desc'): Booking[] {
  return [...bookings].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
        break
      case 'amount':
        comparison = a.amount - b.amount
        break
      case 'status':
        comparison = a.status.localeCompare(b.status)
        break
      case 'escort':
        comparison = a.escortName.localeCompare(b.escortName)
        break
      case 'client':
        comparison = a.clientName.localeCompare(b.clientName)
        break
      default:
        comparison = 0
    }

    return sortOrder === 'asc' ? comparison : -comparison
  })
}

/**
 * Filter bookings by various criteria
 */
export function filterBookings(bookings: Booking[], filters: {
  status?: string[]
  dateRange?: { start: string; end: string }
  amountRange?: { min: number; max: number }
  services?: string[]
  location?: string
  escortId?: string
  clientId?: string
}): Booking[] {
  return bookings.filter(booking => {
    // Status filter
    if (filters.status && filters.status.length > 0 && !filters.status.includes(booking.status)) {
      return false
    }

    // Date range filter
    if (filters.dateRange) {
      const bookingDate = new Date(booking.date)
      const startDate = new Date(filters.dateRange.start)
      const endDate = new Date(filters.dateRange.end)
      
      if (bookingDate < startDate || bookingDate > endDate) {
        return false
      }
    }

    // Amount range filter
    if (filters.amountRange) {
      if (booking.amount < filters.amountRange.min || booking.amount > filters.amountRange.max) {
        return false
      }
    }

    // Services filter
    if (filters.services && filters.services.length > 0 && !filters.services.some(service => 
      booking.services.includes(service)
    )) {
      return false
    }

    // Location filter
    if (filters.location && !booking.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false
    }

    // Escort filter
    if (filters.escortId && booking.escortId !== filters.escortId) {
      return false
    }

    // Client filter
    if (filters.clientId && booking.clientId !== filters.clientId) {
      return false
    }

    return true
  })
} 