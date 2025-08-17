"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Building, 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Save, 
  X, 
  DollarSign, 
  Calendar, 
  Star, 
  MessageCircle, 
  LogOut, 
  Shield, 
  Eye, 
  EyeOff, 
  TrendingUp, 
  Plus, 
  Trash2
} from 'lucide-react'

export default function AgencyProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const [agencyData, setAgencyData] = useState({
    agencyName: 'Elite Escorts Mumbai',
    ownerName: 'Rohit Mehra',
    email: 'eliteescorts@example.com',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Bandra West, Mumbai, Maharashtra',
    website: 'https://eliteescorts.in',
    description: 'Premium escort agency providing verified companions in Mumbai.'
  })

  const mockEscorts = [
    {
      id: '1',
      name: 'Priya',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      status: 'active',
      rating: 4.8,
      bookings: 32
    },
    {
      id: '2',
      name: 'Zara',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      status: 'pending',
      rating: 4.7,
      bookings: 18
    }
  ]



  const mockBookings = [
    {
      id: '1',
      escort: 'Priya',
      client: 'Rahul',
      date: '2024-01-20',
      time: '8:00 PM',
      amount: 30000,
      status: 'completed'
    },
    {
      id: '2',
      escort: 'Zara',
      client: 'Amit',
      date: '2024-01-25',
      time: '9:00 PM',
      amount: 45000,
      status: 'upcoming'
    }
  ]

  const tabs = [
    { id: 'profile', label: 'Agency Profile', icon: Building },
    { id: 'escorts', label: 'Team', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: Calendar }
  ]

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // Handle agency profile update
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Agency Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your agency profile, team, and bookings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    )
                  })}
                </div>
                <div className="border-t mt-6 pt-6">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/auth/login">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Agency Information</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Agency Name</label>
                        <input
                          type="text"
                          value={agencyData.agencyName}
                          onChange={(e) => setAgencyData(prev => ({ ...prev, agencyName: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border rounded-md disabled:bg-muted"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Owner Name</label>
                        <input
                          type="text"
                          value={agencyData.ownerName}
                          onChange={(e) => setAgencyData(prev => ({ ...prev, ownerName: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border rounded-md disabled:bg-muted"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={agencyData.email}
                          onChange={(e) => setAgencyData(prev => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border rounded-md disabled:bg-muted"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          value={agencyData.phone}
                          onChange={(e) => setAgencyData(prev => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border rounded-md disabled:bg-muted"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">City</label>
                        <input
                          type="text"
                          value={agencyData.city}
                          onChange={(e) => setAgencyData(prev => ({ ...prev, city: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border rounded-md disabled:bg-muted"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">State</label>
                        <input
                          type="text"
                          value={agencyData.state}
                          onChange={(e) => setAgencyData(prev => ({ ...prev, state: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border rounded-md disabled:bg-muted"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Address</label>
                        <input
                          type="text"
                          value={agencyData.address}
                          onChange={(e) => setAgencyData(prev => ({ ...prev, address: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border rounded-md disabled:bg-muted"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Website</label>
                        <input
                          type="url"
                          value={agencyData.website}
                          onChange={(e) => setAgencyData(prev => ({ ...prev, website: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border rounded-md disabled:bg-muted"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={agencyData.description}
                        onChange={(e) => setAgencyData(prev => ({ ...prev, description: e.target.value }))}
                        disabled={!isEditing}
                        rows={4}
                        className="w-full px-3 py-2 border rounded-md disabled:bg-muted"
                      />
                    </div>
                    {isEditing && (
                      <div className="flex gap-2 mt-4">
                        <Button type="submit">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Team Tab */}
            {activeTab === 'escorts' && (
              <Card>
                <CardHeader>
                  <CardTitle>Managed Escorts</CardTitle>
                  <Button size="sm" className="ml-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Escort
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockEscorts.map((escort) => (
                      <div key={escort.id} className="border rounded-lg p-4 flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={escort.image}
                            alt={escort.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">{escort.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${escort.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{escort.status}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="text-sm font-medium">{escort.rating}</span>
                            <span className="text-xs text-muted-foreground">({escort.bookings} bookings)</span>
                          </div>
                        </div>
                        <Button size="icon" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}



            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{booking.escort} with {booking.client}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{booking.date} at {booking.time}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${booking.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{booking.status}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-primary">₹{booking.amount.toLocaleString()}</div>
                          <Button size="sm" variant="outline">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
