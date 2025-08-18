"use client"


import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Download, Calendar, Clock, MapPin, DollarSign, Users, Phone, MessageCircle, Edit, User, ClockIcon, CalendarIcon, Tabs, Image } from 'lucide-react'
import Image from 'next/image'

interface Booking {
  id: string
  escortId: string
  escortName: string
  escortImage: string
  clientId: string
  clientName: string
  clientPhone: string
  clientEmail: string
  date: string
  time: string
  duration: number
  services: string[]
  location: string
  amount: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  createdAt: Date
  notes?: string
}

interface TimeSlot {
  time: string
  available: boolean
  price?: number
}

export default function AdvancedBookingSystem() {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [selectedDuration, setSelectedDuration] = useState<number>(2)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [bookingLocation, setBookingLocation] = useState('')
  const [clientNotes, setClientNotes] = useState('')
  const [activeTab, setActiveTab] = useState<'new' | 'upcoming' | 'past'>('new')

  const mockBookings: Booking[] = [
    {
      id: '1',
      escortId: 'escort1',
      escortName: 'Priya Sharma',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      clientId: 'client1',
      clientName: 'Rahul Verma',
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
      escortId: 'escort1',
      escortName: 'Priya Sharma',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      clientId: 'client2',
      clientName: 'Amit Patel',
      clientPhone: '+91 98765 43211',
      clientEmail: 'amit@example.com',
      date: '2024-01-28',
      time: '21:00',
      duration: 3,
      services: ['Massage', 'Companionship'],
      location: 'Client Residence, Bandra West',
      amount: 45000,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date('2024-01-22'),
      notes: 'Weekend relaxation session'
    }
  ]

  const timeSlots: TimeSlot[] = [
    { time: '10:00', available: true, price: 12000 },
    { time: '11:00', available: true, price: 12000 },
    { time: '12:00', available: false },
    { time: '13:00', available: true, price: 12000 },
    { time: '14:00', available: true, price: 12000 },
    { time: '15:00', available: false },
    { time: '16:00', available: true, price: 15000 },
    { time: '17:00', available: true, price: 15000 },
    { time: '18:00', available: true, price: 15000 },
    { time: '19:00', available: true, price: 18000 },
    { time: '20:00', available: true, price: 18000 },
    { time: '21:00', available: true, price: 18000 },
    { time: '22:00', available: true, price: 20000 },
    { time: '23:00', available: true, price: 20000 },
    { time: '00:00', available: true, price: 25000 }
  ]

  const services = [
    { name: 'Companionship', price: 0 },
    { name: 'Dinner Date', price: 5000 },
    { name: 'Massage', price: 3000 },
    { name: 'Travel', price: 8000 },
    { name: 'VIP Service', price: 10000 },
    { name: 'Party', price: 15000 }
  ]

  const durations = [
    { hours: 1, price: 15000 },
    { hours: 2, price: 25000 },
    { hours: 3, price: 35000 },
    { hours: 4, price: 45000 },
    { hours: 6, price: 65000 },
    { hours: 8, price: 85000 }
  ]

  const toggleService = (serviceName: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceName)
        ? prev.filter(s => s !== serviceName)
        : [...prev, serviceName]
    )
  }

  const calculateTotal = () => {
    const basePrice = durations.find(d => d.hours === selectedDuration)?.price || 0
    const servicePrice = selectedServices.reduce((total, service) => {
      const serviceData = services.find(s => s.name === service)
      return total + (serviceData?.price || 0)
    }, 0)
    return basePrice + servicePrice
  }

  const handleBooking = () => {
    // Handle booking creation
    console.log('Creating booking:', {
      date: selectedDate,
      time: selectedTime,
      duration: selectedDuration,
      services: selectedServices,
      location: bookingLocation,
      notes: clientNotes,
      total: calculateTotal()
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'completed': return 'text-blue-600 bg-blue-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
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

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('new')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'new'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          New Booking
        </button>
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'upcoming'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'past'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Past Bookings
        </button>
      </div>

      {activeTab === 'new' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking Form */}
          <div className="space-y-6">
            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Select Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </CardContent>
            </Card>

            {/* Time Selection */}
            {selectedDate && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    Select Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(slot => (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                          selectedTime === slot.time
                            ? 'bg-primary text-primary-foreground border-primary'
                            : slot.available
                            ? 'hover:bg-muted border-muted-foreground/20'
                            : 'bg-muted text-muted-foreground cursor-not-allowed'
                        }`}
                      >
                        <div>{slot.time}</div>
                        {slot.price && (
                          <div className="text-xs">₹{slot.price.toLocaleString()}</div>
                        )}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Duration Selection */}
            {selectedTime && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Select Duration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {durations.map(duration => (
                      <button
                        key={duration.hours}
                        onClick={() => setSelectedDuration(duration.hours)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                          selectedDuration === duration.hours
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'hover:bg-muted border-muted-foreground/20'
                        }`}
                      >
                        <div>{duration.hours} Hour{duration.hours > 1 ? 's' : ''}</div>
                        <div className="text-xs">₹{duration.price.toLocaleString()}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Services Selection */}
            {selectedDuration && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Select Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {services.map(service => (
                      <label key={service.name} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(service.name)}
                            onChange={() => toggleService(service.name)}
                            className="rounded border-gray-300"
                          />
                          <span className="font-medium">{service.name}</span>
                        </div>
                        {service.price > 0 && (
                          <span className="text-sm text-muted-foreground">
                            +₹{service.price.toLocaleString()}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Location & Notes */}
            {selectedServices.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Location & Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Meeting Location</label>
                    <input
                      type="text"
                      placeholder="Enter meeting location..."
                      value={bookingLocation}
                      onChange={(e) => setBookingLocation(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Special Requests</label>
                    <textarea
                      placeholder="Any special requests or notes..."
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{new Date(selectedDate).toLocaleDateString()}</span>
                  </div>
                )}
                {selectedTime && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span>{selectedTime}</span>
                  </div>
                )}
                {selectedDuration && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{selectedDuration} hour{selectedDuration > 1 ? 's' : ''}</span>
                  </div>
                )}
                {selectedServices.length > 0 && (
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Services:</span>
                    </div>
                    <div className="space-y-1">
                      {selectedServices.map(service => (
                        <div key={service} className="flex justify-between text-sm">
                          <span>• {service}</span>
                          <span>₹{services.find(s => s.name === service)?.price.toLocaleString() || 0}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
                <Button 
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTime || !selectedDuration || selectedServices.length === 0}
                  className="w-full"
                >
                  Confirm Booking
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Bookings List */}
      {(activeTab === 'upcoming' || activeTab === 'past') && (
        <div className="space-y-4">
          {mockBookings
            .filter(booking => 
              activeTab === 'upcoming' 
                ? ['pending', 'confirmed'].includes(booking.status)
                : ['completed', 'cancelled'].includes(booking.status)
            )
            .map(booking => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Image
                        src={booking.escortImage}
                        alt={booking.escortName}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{booking.escortName}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                            {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>₹{booking.amount.toLocaleString()}</span>
                          </div>
                        </div>
                        {booking.notes && (
                          <p className="text-sm text-muted-foreground mt-2">
                            <strong>Notes:</strong> {booking.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  )
} 