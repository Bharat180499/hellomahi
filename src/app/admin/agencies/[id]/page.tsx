'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Star, User, Users, Phone, Mail, MapPin, Clock, Calendar, CheckCircle, AlertCircle, Settings, Activity, TrendingUp, ArrowLeft, Ban, Globe, Building, FileText, CreditCard, Check, Edit, Info, MessageSquare, Image } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

// Mock data for agency details
const agencyDetails = {
  id: '1',
  name: 'Elite Escorts Mumbai',
  owner: 'Rajesh Kumar',
  email: 'rajesh@eliteescorts.com',
  phone: '+91 98765 43210',
  location: 'Mumbai, Maharashtra',
  status: 'active',
  joinDate: '2023-06-15',
  lastActive: '2024-01-25 14:30',
  verificationStatus: 'verified',
  profileImage: '/api/placeholder/100/100',
  description: 'Premium escort agency providing high-end services in Mumbai and surrounding areas.',
  totalEscorts: 25,
  totalBookings: 450,
  totalRevenue: 6750000,
  rating: 4.8,
  contactInfo: {
    address: '123 Marine Drive, Mumbai, Maharashtra 400001',
    website: 'www.eliteescorts.com',
    businessHours: '24/7',
    emergencyContact: 'Emergency Hotline: +91 98765 43211'
  },
  recentActivity: [
    { type: 'escort', description: 'New escort registered', date: '2024-01-25', details: 'Priya Sharma joined' },
    { type: 'booking', description: 'High-value booking', date: '2024-01-24', details: '₹25,000 booking completed' },
    { type: 'payment', description: 'Payment processed', date: '2024-01-23', details: '₹45,000 payment completed' },
    { type: 'review', description: '5-star review received', date: '2024-01-22', details: 'Client satisfaction' },
  ],
  escorts: [
    { id: '1', name: 'Priya Sharma', status: 'active', bookings: 45, rating: 4.9 },
    { id: '2', name: 'Aisha Patel', status: 'active', bookings: 38, rating: 4.8 },
    { id: '3', name: 'Zara Khan', status: 'inactive', bookings: 22, rating: 4.7 },
    { id: '4', name: 'Meera Nair', status: 'active', bookings: 31, rating: 4.6 },
  ],
  documents: {
    businessLicense: 'Verified',
    taxRegistration: 'Valid until 2024-12-31',
    insurance: 'Active',
    complianceCertificate: 'Up to date'
  },
  performance: {
    monthlyRevenue: [450000, 520000, 480000, 675000],
    monthlyBookings: [35, 42, 38, 45],
    averageRating: 4.8,
    responseTime: '2.3 minutes',
    completionRate: 98.5
  }
}

export default function AgencyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [agency, setAgency] = useState(agencyDetails)

  useEffect(() => {
    // In real app, fetch agency data based on params.id
    console.log('Fetching agency with ID:', params.id)
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
            <span>Back to Agencies</span>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <h1 className="text-2xl font-bold">Agency Details</h1>
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
          {agency.status === 'active' ? (
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
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Agency Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <span>Agency Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={agency.profileImage} alt={agency.name} />
                  <AvatarFallback>{agency.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-semibold">{agency.name}</h2>
                    <Badge className={getStatusColor(agency.status)}>
                      {agency.status.charAt(0).toUpperCase() + agency.status.slice(1)}
                    </Badge>
                    <Badge className={getVerificationColor(agency.verificationStatus)}>
                      {agency.verificationStatus.charAt(0).toUpperCase() + agency.verificationStatus.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{agency.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {new Date(agency.joinDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Last active {agency.lastActive}</span>
                    </div>
                  </div>
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
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Owner</p>
                    <p className="text-sm text-muted-foreground">{agency.owner}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{agency.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{agency.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{agency.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Website</p>
                    <p className="text-sm text-muted-foreground">{agency.contactInfo.website}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Business Hours</p>
                    <p className="text-sm text-muted-foreground">{agency.contactInfo.businessHours}</p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-sm font-medium mb-2">Address</p>
                <p className="text-sm text-muted-foreground">{agency.contactInfo.address}</p>
              </div>
              <div className="pt-4">
                <p className="text-sm font-medium mb-2">Emergency Contact</p>
                <p className="text-sm text-muted-foreground">{agency.contactInfo.emergencyContact}</p>
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
                {agency.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'escort' ? 'bg-blue-100 dark:bg-blue-900' :
                        activity.type === 'booking' ? 'bg-green-100 dark:bg-green-900' :
                        activity.type === 'payment' ? 'bg-purple-100 dark:bg-purple-900' :
                        'bg-orange-100 dark:bg-orange-900'
                      }`}>
                        {activity.type === 'escort' && <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                        {activity.type === 'booking' && <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />}
                        {activity.type === 'payment' && <CreditCard className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
                        {activity.type === 'review' && <Star className="h-4 w-4 text-orange-600 dark:text-orange-400" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.date} - {activity.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Escorts List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Registered Escorts ({agency.escorts.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {agency.escorts.map((escort) => (
                  <div key={escort.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{escort.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{escort.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {escort.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm font-medium">{escort.bookings}</p>
                        <p className="text-xs text-muted-foreground">Bookings</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-sm">{escort.rating}</span>
                      </div>
                      <Badge className={escort.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {escort.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Performance Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Escorts</span>
                <span className="font-semibold">{agency.totalEscorts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Bookings</span>
                <span className="font-semibold">{agency.totalBookings}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Revenue</span>
                <span className="font-semibold">₹{(agency.totalRevenue / 100000).toFixed(1)}L</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-semibold">{agency.rating}</span>
                </div>
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
                <span className="text-sm">Business License</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  {agency.documents.businessLicense}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tax Registration</span>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {agency.documents.taxRegistration}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Insurance</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  {agency.documents.insurance}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Compliance</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  {agency.documents.complianceCertificate}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Response Time</span>
                <span className="font-semibold">{agency.performance.responseTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Completion Rate</span>
                <span className="font-semibold">{agency.performance.completionRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Monthly Growth</span>
                <div className="flex items-center space-x-1 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-semibold">+12%</span>
                </div>
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
                View Analytics
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Edit Agency
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                View Documents
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
