"use client"


import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Eye, Edit, X, Phone, Mail, MapPin, Clock, Calendar, DollarSign, CheckCircle, XCircle, MessageCircle, Shield, Crown, Activity, ArrowLeft, Check, ImageIcon, Check, Star, Calendar, DollarSign, Shield, Crown, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ToggleRight, ToggleLeft, Eye, Star, Calendar, Clock, MapPin, DollarSign, Shield, Crown, CheckCircle, XCircle, Phone, Mail, MessageCircle, Sun, X, ArrowLeft, Edit, Upload, Video, Info, Activity, ImageIcon, Tabs } from 'lucide-react'
import AgencyNavigation from '@/components/AgencyNavigation'

interface EscortDetail {
  id: string
  name: string
  image: string
  age: number
  city: string
  state: string
  rating: number
  reviewCount: number
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  isVerified: boolean
  isPremium: boolean
  isActive: boolean
  totalBookings: number

  responseRate: number
  completionRate: number
  averageResponseTime: number
  lastActive: Date
  joinDate: Date
  services: string[]
  pricing: {
    oneShot: number
    twoShot: number
    threeShot: number
    fullNight: number
    currency: string
  }
  identityVerification: {
    status: 'pending' | 'approved' | 'rejected'
    submittedAt?: Date
    reviewedAt?: Date
  }
  about: string
  languages: string[]
  education: string
  occupation: string
  height: string
  weight: string
  measurements: string
  availability: {
    days: string[]
    hours: string
    advanceBooking: string
  }
  contactInfo: {
    phone: string
    email: string
    whatsapp?: string
  }
}

export default function EscortDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'analytics' | 'verification'>('overview')
  const [escort, setEscort] = useState<EscortDetail>({
    id: params.id,
    name: 'Priya Sharma',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    age: 25,
    city: 'Mumbai',
    state: 'Maharashtra',
    rating: 4.8,
    reviewCount: 127,
    status: 'active',
    isVerified: true,
    isPremium: true,
    isActive: true,
    totalBookings: 45,

    responseRate: 95,
    completionRate: 98,
    averageResponseTime: 12,
    lastActive: new Date(),
    joinDate: new Date('2023-06-15'),
    services: ['Companionship', 'Dinner Date', 'Travel', 'VIP Service'],
    pricing: {
      oneShot: 15000,
      twoShot: 25000,
      threeShot: 35000,
      fullNight: 50000,
      currency: '₹'
    },
    identityVerification: {
      status: 'approved',
      submittedAt: new Date('2023-06-10'),
      reviewedAt: new Date('2023-06-12')
    },
    about: 'Elegant and sophisticated companion for high-end events and private meetings. I specialize in providing discreet, professional companionship services for business executives, tourists, and individuals seeking quality time with a refined companion.',
    languages: ['English', 'Hindi', 'Marathi'],
    education: 'Graduate',
    occupation: 'Professional Escort',
    height: '5\'6"',
    weight: '55 kg',
    measurements: '34-26-36',
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      hours: '10:00 AM - 2:00 AM',
      advanceBooking: '24 hours'
    },
    contactInfo: {
      phone: '+91 98765 43210',
      email: 'priya@example.com',
      whatsapp: '+91 98765 43210'
    }
  })

  const toggleEscortStatus = () => {
    setEscort(prev => ({
      ...prev,
      isActive: !prev.isActive
    }))
  }

  const recentBookings = [
    {
      id: '1',
      clientName: 'Rahul Verma',
      date: '2024-01-25',
      time: '8:00 PM',
      duration: 2,
      amount: 30000,
      status: 'completed'
    },
    {
      id: '2',
      clientName: 'Amit Patel',
      date: '2024-01-24',
      time: '9:00 PM',
      duration: 3,
      amount: 45000,
      status: 'confirmed'
    },
    {
      id: '3',
      clientName: 'Vikram Singh',
      date: '2024-01-23',
      time: '7:00 PM',
      duration: 2,
      amount: 30000,
      status: 'completed'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'inactive': return 'text-gray-600 bg-gray-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'suspended': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'inactive': return <Clock className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'suspended': return <XCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AgencyNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/agency/escorts">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Escorts
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{escort.name}</h1>
              <p className="text-muted-foreground">
                Escort Profile Details
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 mr-4">
              <span className="text-sm text-muted-foreground">Profile Status:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleEscortStatus}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  escort.isActive 
                    ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                {escort.isActive ? (
                  <>
                    <ToggleRight className="h-4 w-4" />
                    <span>Active</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="h-4 w-4" />
                    <span>Inactive</span>
                  </>
                )}
              </Button>
            </div>
            <Button variant="outline" onClick={() => alert(`Opening chat with ${escort.name}`)}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/agency/escorts/${escort.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Overview */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <Image
                    src={escort.image}
                    alt={escort.name}
                    width={120}
                    height={120}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-2xl font-bold">{escort.name}</h2>
                      <div className="flex items-center space-x-1">
                        {escort.isVerified && <Shield className="h-5 w-5 text-blue-600" />}
                        {escort.isPremium && <Crown className="h-5 w-5 text-yellow-600" />}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(escort.status)}`}>
                          {getStatusIcon(escort.status)}
                          <span>{escort.status.charAt(0).toUpperCase() + escort.status.slice(1)}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <span>{escort.age} years old</span>
                      <span>•</span>
                      <MapPin className="h-4 w-4" />
                      <span>{escort.city}, {escort.state}</span>
                      <span>•</span>
                      <span>Member since {escort.joinDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{escort.rating}</span>
                        <span className="text-muted-foreground">({escort.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{escort.totalBookings} bookings</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
        
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Tabs */}
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'bookings'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Bookings
              </button>
              <button
                onClick={() => setActiveTab('verification')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'verification'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Verification
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'analytics'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Analytics
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{escort.about}</p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Height:</span>
                        <span>{escort.height}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weight:</span>
                        <span>{escort.weight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Measurements:</span>
                        <span>{escort.measurements}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Education:</span>
                        <span>{escort.education}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Occupation:</span>
                        <span>{escort.occupation}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Services & Pricing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Services Offered:</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {escort.services.map(service => (
                            <span key={service} className="px-2 py-1 bg-muted rounded-full text-xs">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">1 Shot Rate:</span>
                          <span className="font-medium">₹{escort.pricing.oneShot.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">2 Shot Rate:</span>
                          <span className="font-medium">₹{escort.pricing.twoShot.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">3 Shot Rate:</span>
                          <span className="font-medium">₹{escort.pricing.threeShot.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Full Night Rate:</span>
                          <span className="font-medium">₹{escort.pricing.fullNight.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Identity Verification:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            escort.identityVerification.status === 'approved' ? 'text-green-600 bg-green-100' :
                            escort.identityVerification.status === 'rejected' ? 'text-red-600 bg-red-100' :
                            'text-yellow-600 bg-yellow-100'
                          }`}>
                            {escort.identityVerification.status.charAt(0).toUpperCase() + escort.identityVerification.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Availability</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Available Days:</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {escort.availability.days.map(day => (
                          <span key={day} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Working Hours:</label>
                        <p className="mt-1">{escort.availability.hours}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Advance Booking:</label>
                        <p className="mt-1">{escort.availability.advanceBooking}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Gallery */}
                <Card>
                  <CardHeader>
                    <CardTitle>Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Sample gallery images - in real app these would come from escort data */}
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                        <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          <div className="text-center text-gray-500">
                            <ImageIcon className="h-8 w-8 mx-auto mb-1" />
                            <p className="text-xs">Photo {index}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline" size="sm">
                        View Full Gallery
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'bookings' && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map(booking => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{booking.clientName}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <span>{booking.date}</span>
                            <span>•</span>
                            <span>{booking.time}</span>
                            <span>•</span>
                            <span>{booking.duration} hours</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₹{booking.amount.toLocaleString()}</div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'completed' ? 'text-green-600 bg-green-100' :
                            booking.status === 'confirmed' ? 'text-blue-600 bg-blue-100' :
                            'text-yellow-600 bg-yellow-100'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'verification' && (
              <div className="space-y-6">
                {/* Selfie Verification */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Selfie Verification
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Selfie Display */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Selfie Photo</label>
                        <div className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                          <div className="text-center text-gray-500">
                            <Shield className="h-12 w-12 mx-auto mb-2" />
                            <p className="text-sm">Selfie verification photo</p>
                            <p className="text-xs">Uploaded for identity verification</p>
                          </div>
                        </div>
                      </div>

                      {/* Verification Details */}
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-start space-x-3">
                            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-blue-900 mb-1">Verification Status</h4>
                              <p className="text-sm text-blue-700">
                                Identity verification helps ensure the safety and authenticity of our platform.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-muted-foreground">Verification Status:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              escort.identityVerification.status === 'approved' ? 'text-green-600 bg-green-100' :
                              escort.identityVerification.status === 'rejected' ? 'text-red-600 bg-red-100' :
                              'text-yellow-600 bg-yellow-100'
                            }`}>
                              {escort.identityVerification.status.charAt(0).toUpperCase() + escort.identityVerification.status.slice(1)}
                            </span>
                          </div>
                          
                          {escort.identityVerification.submittedAt && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-muted-foreground">Submitted:</span>
                              <span className="text-sm">{escort.identityVerification.submittedAt.toLocaleDateString()}</span>
                            </div>
                          )}
                          
                          {escort.identityVerification.reviewedAt && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-muted-foreground">Reviewed:</span>
                              <span className="text-sm">{escort.identityVerification.reviewedAt.toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>

                        {/* Verification Guidelines */}
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-sm mb-2">Verification Guidelines Met:</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              <span>Face clearly visible and well-lit</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              <span>No sunglasses, hats, or face coverings</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              <span>Recent photo (within 6 months)</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              <span>Good quality image (not blurry)</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              <span>Neutral expression</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Video Verification */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Video Verification
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Shield className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">Video Verification Required</h4>
                            <p className="text-sm text-gray-600 mt-1">Complete live video verification to verify identity</p>
                            <div className="mt-2">
                              <span className="text-sm font-medium text-gray-700">Verification Code: </span>
                              <span className="text-lg font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-md">8472</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            escort.identityVerification.status === 'approved' ? 'bg-green-100 text-green-800' :
                            escort.identityVerification.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {escort.identityVerification.status === 'approved' ? 'Verified' :
                             escort.identityVerification.status === 'rejected' ? 'Rejected' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Verification Instructions:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                        <li>Click "Start Verification" to begin the video call</li>
                        <li>Have your verification code <span className="font-bold text-blue-600">8472</span> ready</li>
                        <li>Show your face clearly to the camera</li>
                        <li>Hold up a piece of paper with the verification code written on it</li>
                        <li>Follow the agent's instructions during the call</li>
                        <li>Verification typically takes 5-10 minutes</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}



            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                        <p className="text-2xl font-bold">{escort.responseRate}%</p>
                      </div>
                      <MessageCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                        <p className="text-2xl font-bold">{escort.completionRate}%</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                        <p className="text-2xl font-bold">{escort.averageResponseTime} min</p>
                      </div>
                      <Clock className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Last Active</p>
                        <p className="text-2xl font-bold">{escort.lastActive.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                      <Activity className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{escort.contactInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{escort.contactInfo.email}</span>
                </div>
                {escort.contactInfo.whatsapp && (
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{escort.contactInfo.whatsapp}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {escort.languages.map(language => (
                    <span key={language} className="px-2 py-1 bg-muted rounded-full text-xs">
                      {language}
                    </span>
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
                <Button variant="outline" className="w-full justify-start" onClick={() => alert(`Opening chat with ${escort.name}`)}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/agency/escorts/${escort.id}/edit`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open(`tel:${escort.contactInfo.phone}`, '_self')}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Escort
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open(`/escorts/${escort.id}`, '_blank')}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Public Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 