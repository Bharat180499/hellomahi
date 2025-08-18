'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Star, User, Phone, Mail, MapPin, Clock, Calendar, CheckCircle, AlertCircle, Settings, Shield, Activity, ArrowLeft, Ban, CreditCard, Check, Users, Edit, Info, MessageSquare, Image } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

// Mock data for user details
const userDetails = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  phone: '+91 98765 43210',
  location: 'Mumbai, Maharashtra',
  status: 'active',
  joinDate: '2024-01-15',
  lastActive: '2024-01-20 14:30',
  totalBookings: 12,
  totalSpent: 45000,
  rating: 4.8,
  verificationStatus: 'verified',
  profileImage: '/api/placeholder/100/100',
  bio: 'Professional client looking for quality services.',
  preferences: ['Verified escorts only', 'Evening appointments', 'Hotel meetings'],
  recentActivity: [
    { type: 'booking', description: 'Booked escort service', date: '2024-01-20' },
    { type: 'review', description: 'Left 5-star review', date: '2024-01-18' },
    { type: 'payment', description: 'Payment completed', date: '2024-01-15' },
    { type: 'booking', description: 'Booked escort service', date: '2024-01-12' },
  ],
  contactInfo: {
    emergencyContact: 'John Johnson',
    emergencyPhone: '+91 98765 43211',
    address: '123 Marine Drive, Mumbai, Maharashtra 400001'
  }
}

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [user] = useState(userDetails)

  useEffect(() => {
    // In real app, fetch user data based on params.id
    console.log('Fetching user with ID:', params.id)
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
            <span>Back to Users</span>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <h1 className="text-2xl font-bold">User Details</h1>
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
          {user.status === 'active' ? (
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
                  <AvatarImage src={user.profileImage} alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                    <Badge className={getVerificationColor(user.verificationStatus)}>
                      {user.verificationStatus.charAt(0).toUpperCase() + user.verificationStatus.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{user.bio}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Last active {user.lastActive}</span>
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
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{user.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{user.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Emergency Contact</p>
                    <p className="text-sm text-muted-foreground">{user.contactInfo.emergencyContact}</p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-sm font-medium mb-2">Address</p>
                <p className="text-sm text-muted-foreground">{user.contactInfo.address}</p>
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
                {user.recentActivity.map((activity, index) => (
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
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Bookings</span>
                <span className="font-semibold">{user.totalBookings}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Spent</span>
                <span className="font-semibold">₹{user.totalSpent.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-semibold">{user.rating}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {user.preferences.map((preference, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">{preference}</span>
                  </div>
                ))}
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
