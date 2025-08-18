"use client"

import { CardHeader, CardTitle } from '@/components/ui/card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { MapPin, Clock, Calendar, CheckCircle, AlertCircle, Shield, CreditCard, Check, Check, Calendar, Shield } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { CheckCircle, Shield, Calendar, AlertCircle, CreditCard } from 'lucide-react'

import type { Escort, Service } from '@/types/escort'

interface BookingFormProps {
  escort: Escort
  onClose: () => void
  onSuccess: (bookingId: string) => void
}

interface BookingData {
  escortId: string
  serviceId: string
  date: string
  time: string
  duration: number
  location: string
  specialRequests: string
  totalAmount: number
}

export default function BookingForm({ escort, onClose, onSuccess }: BookingFormProps) {
  const [bookingData, setBookingData] = useState<BookingData>({
    escortId: escort.id,
    serviceId: '',
    date: '',
    time: '',
    duration: 60,
    location: escort.locations[0]?.city || '',
    specialRequests: '',
    totalAmount: 0
  })
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details')

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    setBookingData(prev => ({
      ...prev,
      serviceId: service.id,
      duration: service.duration,
      totalAmount: service.price
    }))
  }

  const handleDateChange = (date: string) => {
    setBookingData(prev => ({ ...prev, date }))
  }

  const handleTimeChange = (time: string) => {
    setBookingData(prev => ({ ...prev, time }))
  }

  const handleLocationChange = (location: string) => {
    setBookingData(prev => ({ ...prev, location }))
  }

  const handleSpecialRequestsChange = (requests: string) => {
    setBookingData(prev => ({ ...prev, specialRequests: requests }))
  }

  const isDateValid = (date: string) => {
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return selectedDate >= today
  }

  const getAvailableTimes = () => {
    const times = []
    for (let hour = 10; hour <= 22; hour++) {
      times.push(`${hour.toString().padStart(2, '0')}:00`)
      times.push(`${hour.toString().padStart(2, '0')}:30`)
    }
    return times
  }

  const handleSubmit = async () => {
    if (!selectedService || !bookingData.date || !bookingData.time || !bookingData.location) {
      return
    }

    setIsLoading(true)
    try {
      // Mock booking creation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const bookingId = `booking_${Date.now()}`
      onSuccess(bookingId)
      setStep('confirmation')
    } catch {
      console.error('Error creating booking:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePayment = async () => {
    setIsLoading(true)
    try {
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      setStep('confirmation')
    } catch {
      console.error('Error processing payment:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (step === 'confirmation') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Booking Confirmed!</h3>
          <p className="text-gray-600 mb-4">
            Your booking with {escort.name} has been confirmed. You will receive a confirmation email shortly.
          </p>
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Book {escort.name}</span>
          <Badge variant="outline">
            <Shield className="h-3 w-3 mr-1" />
            Secure Booking
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 'details' && (
          <>
            {/* Service Selection */}
            <div>
              <Label className="text-base font-medium mb-3 block">Select Service</Label>
              <div className="space-y-3">
                {escort.services.map((service) => (
                  <div
                    key={service.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedService?.id === service.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleServiceSelect(service)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{service.duration} minutes</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">
                          ₹{service.price.toLocaleString()}
                        </p>
                        <Badge variant="outline" className="mt-1">
                          {service.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date and Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date" className="text-base font-medium mb-2 block">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Select Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-base font-medium mb-2 block">
                  <Clock className="h-4 w-4 inline mr-2" />
                  Select Time
                </Label>
                <select
                  id="time"
                  value={bookingData.time}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select time</option>
                  {getAvailableTimes().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location Selection */}
            <div>
              <Label htmlFor="location" className="text-base font-medium mb-2 block">
                <MapPin className="h-4 w-4 inline mr-2" />
                Location
              </Label>
              <select
                id="location"
                value={bookingData.location}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select location</option>
                {escort.locations.map((location) => (
                  <option key={location.id} value={location.city}>
                    {location.city}, {location.state}
                    {location.travel_cost && ` (+₹${location.travel_cost} travel cost)`}
                  </option>
                ))}
              </select>
            </div>

            {/* Special Requests */}
            <div>
              <Label htmlFor="requests" className="text-base font-medium mb-2 block">
                Special Requests (Optional)
              </Label>
              <textarea
                id="requests"
                value={bookingData.specialRequests}
                onChange={(e) => handleSpecialRequestsChange(e.target.value)}
                placeholder="Any special requests or preferences..."
                className="w-full p-3 border rounded-md resize-none"
                rows={3}
              />
            </div>

            {/* Booking Summary */}
            {selectedService && (
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span>{selectedService.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{selectedService.duration} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Base Price:</span>
                      <span>₹{selectedService.price.toLocaleString()}</span>
                    </div>
                    {bookingData.location && escort.locations.find(loc => loc.city === bookingData.location)?.travel_cost && (
                      <div className="flex justify-between">
                        <span>Travel Cost:</span>
                        <span>₹{escort.locations.find(loc => loc.city === bookingData.location)?.travel_cost?.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>₹{bookingData.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={() => setStep('payment')}
                disabled={!selectedService || !bookingData.date || !bookingData.time || !bookingData.location}
                className="flex-1"
              >
                Continue to Payment
              </Button>
            </div>
          </>
        )}

        {step === 'payment' && (
          <>
            {/* Payment Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <AlertCircle className="h-4 w-4" />
                <span>This is a secure payment. Your information is protected.</span>
              </div>

              <div>
                <Label htmlFor="cardNumber" className="text-base font-medium mb-2 block">
                  <CreditCard className="h-4 w-4 inline mr-2" />
                  Card Number
                </Label>
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry" className="text-base font-medium mb-2 block">
                    Expiry Date
                  </Label>
                  <Input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-base font-medium mb-2 block">
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="name" className="text-base font-medium mb-2 block">
                  Cardholder Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full"
                />
              </div>

              {/* Payment Summary */}
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Payment Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span>{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{new Date(bookingData.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span>{bookingData.time}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total Amount:</span>
                        <span>₹{bookingData.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setStep('details')} className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'Processing...' : 'Pay ₹' + bookingData.totalAmount.toLocaleString()}
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
} 