'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Ban, Eye, Star, Calendar, Clock, MapPin, Shield, CheckCircle, AlertCircle, Phone, Mail, Settings, ArrowLeft, Edit, CreditCard, Info, Activity, User, MessageSquare, Image } from 'lucide-react'

// Mock data for escort details
const escortDetails = {
  id: '1',
  name: 'Priya Sharma',
  email: 'priya.sharma@email.com',
  phone: '+91 98765 43210',
  location: 'Mumbai, Maharashtra',
  status: 'active',
  joinDate: '2024-01-10',
  lastActive: '2024-01-20 16:30',
  totalBookings: 45,
  rating: 4.9,
  verificationStatus: 'verified',
  profileImage: '/api/placeholder/100/100',
  bio: 'Professional escort with 3+ years of experience. Specializing in high-end services.',
  age: 25,
  height: '5\'6"',
  weight: '55 kg',
  languages: ['English', 'Hindi', 'Marathi'],
  services: ['Incall', 'Outcall', 'Overnight', 'Travel Companion'],
  specializations: ['High-end clients', 'Corporate events', 'Travel companion'],
  recentActivity: [
    { type: 'booking', description: 'New booking from VIP client', date: '2024-01-20' },
    { type: 'review', description: 'Received 5-star review', date: '2024-01-18' },
    { type: 'payment', description: 'Payment received', date: '2024-01-15' },
    { type: 'booking', description: 'Extended booking', date: '2024-01-12' },
  ],
  contactInfo: {
    emergencyContact: 'Raj Sharma',
    emergencyPhone: '+91 98765 43212',
    address: '456 Marine Drive, Mumbai, Maharashtra 400001'
  },
  documents: {
    idProof: 'Verified',
    addressProof: 'Verified',
    medicalCertificate: 'Valid until 2024-12-31',
    backgroundCheck: 'Cleared'
  }
}

export default function EscortDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [escort, setEscort] = useState(escortDetails)

  useEffect(() => {
    // In real app, fetch escort data based on params.id
    console.log('Fetching escort with ID:', params.id)
  }, [params.id])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getVerificationColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Escorts</span>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <h1 className="text-2xl font-bold">Escort Details</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Message
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Edit
          </Button>
          {escort.status === 'active' ? (
            <Button variant="destructive" size="sm">
              <Ban className="h-4 w-4 mr-2" />
              Suspend
            </Button>
          ) : (
            <Button variant="default" size="sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              Activate
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={escort.profileImage} alt={escort.name} />
                  <AvatarFallback>{escort.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-semibold">{escort.name}</h2>
                    <Badge className={getStatusColor(escort.status)}>
                      {escort.status.charAt(0).toUpperCase() + escort.status.slice(1)}
                    </Badge>
                    <Badge className={getVerificationColor(escort.verificationStatus)}>
                      {escort.verificationStatus.charAt(0).toUpperCase() + escort.verificationStatus.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{escort.bio}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {new Date(escort.joinDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Last active {escort.lastActive}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Age</p>
                    <p className="text-sm text-muted-foreground">{escort.age} years</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Height</p>
                    <p className="text-sm text-muted-foreground">{escort.height}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Weight</p>
                    <p className="text-sm text-muted-foreground">{escort.weight}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <p className="text-sm font-medium mb-2">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {escort.languages.map((language, index) => (
                    <Badge key={index} variant="secondary">{language}</Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <p className="text-sm font-medium mb-2">Services Offered</p>
                <div className="flex flex-wrap gap-2">
                  {escort.services.map((service, index) => (
                    <Badge key={index} variant="outline">{service}</Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <p className="text-sm font-medium mb-2">Specializations</p>
                <div className="flex flex-wrap gap-2">
                  {escort.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary">{spec}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{escort.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{escort.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{escort.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Emergency Contact</p>
                    <p className="text-sm text-muted-foreground">{escort.contactInfo.emergencyContact}</p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-sm font-medium mb-2">Address</p>
                <p className="text-sm text-muted-foreground">{escort.contactInfo.address}</p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {escort.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'booking' ? 'bg-blue-100 dark:bg-blue-900' :
                        activity.type === 'review' ? 'bg-green-100 dark:bg-green-900' :
                        'bg-purple-100 dark:bg-purple-900'
                      }`}>
                        {activity.type === 'booking' && <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                        {activity.type === 'review' && <Star className="h-4 w-4 text-green-600 dark:text-green-400" />}
                        {activity.type === 'payment' && <Activity className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Bookings</span>
                <span className="font-semibold">{escort.totalBookings}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-semibold">{escort.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Profile Views</span>
                <span className="font-semibold">1,234</span>
              </div>
            </CardContent>
          </Card>

          {/* Document Verification */}
          <Card>
            <CardHeader>
              <CardTitle>Document Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">ID Proof</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  {escort.documents.idProof}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Address Proof</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  {escort.documents.addressProof}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Medical Certificate</span>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {escort.documents.medicalCertificate}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Background Check</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  {escort.documents.backgroundCheck}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Activity className="h-4 w-4 mr-2" />
                View Full History
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                View Public Profile
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <AlertCircle className="h-4 w-4 mr-2" />
                Report Issue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
