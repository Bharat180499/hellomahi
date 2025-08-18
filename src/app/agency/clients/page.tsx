"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Filter, Calendar, Clock, MapPin, DollarSign, CheckCircle, XCircle, AlertCircle, Phone, Mail, Eye, Star, Users, TrendingUp, User, MessageCircle, Edit, MoreVertical } from 'lucide-react'
import AgencyNavigation from '@/components/AgencyNavigation'

export default function AgencyClientsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const clients = [
    {
      id: 'CL-001',
      name: 'Rahul Verma',
      email: 'rahul.verma@example.com',
      phone: '+91 98765 43210',
      city: 'Mumbai',
      status: 'active',
      totalBookings: 12,
      totalSpent: 180000,
      lastBooking: '2024-01-25',
      averageRating: 4.8,
      joinDate: '2023-06-15',
      preferredEscorts: ['Priya Sharma', 'Anjali Patel'],
      notes: 'VIP client, prefers premium services',
      verificationStatus: 'verified',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'CL-002',
      name: 'Amit Patel',
      email: 'amit.patel@example.com',
      phone: '+91 98765 43211',
      city: 'Delhi',
      status: 'active',
      totalBookings: 8,
      totalSpent: 120000,
      lastBooking: '2024-01-24',
      averageRating: 4.5,
      joinDate: '2023-08-20',
      preferredEscorts: ['Riya Singh'],
      notes: 'Regular client, good communication',
      verificationStatus: 'verified',
      paymentMethod: 'UPI'
    },
    {
      id: 'CL-003',
      name: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      phone: '+91 98765 43212',
      city: 'Bangalore',
      status: 'inactive',
      totalBookings: 3,
      totalSpent: 45000,
      lastBooking: '2023-12-15',
      averageRating: 4.2,
      joinDate: '2023-10-10',
      preferredEscorts: ['Neha Gupta'],
      notes: 'Inactive for 2 months',
      verificationStatus: 'verified',
      paymentMethod: 'Net Banking'
    },
    {
      id: 'CL-004',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      phone: '+91 98765 43213',
      city: 'Chennai',
      status: 'active',
      totalBookings: 15,
      totalSpent: 225000,
      lastBooking: '2024-01-26',
      averageRating: 4.9,
      joinDate: '2023-05-05',
      preferredEscorts: ['Priya Sharma', 'Kavya Reddy'],
      notes: 'High-value client, excellent feedback',
      verificationStatus: 'verified',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'CL-005',
      name: 'Suresh Reddy',
      email: 'suresh.reddy@example.com',
      phone: '+91 98765 43214',
      city: 'Hyderabad',
      status: 'pending',
      totalBookings: 0,
      totalSpent: 0,
      lastBooking: null,
      averageRating: null,
      joinDate: '2024-01-25',
      preferredEscorts: [],
      notes: 'New client, pending verification',
      verificationStatus: 'pending',
      paymentMethod: 'Not set'
    }
  ]

  const filters = [
    { value: 'all', label: 'All Clients', count: clients.length },
    { value: 'active', label: 'Active', count: clients.filter(c => c.status === 'active').length },
    { value: 'inactive', label: 'Inactive', count: clients.filter(c => c.status === 'inactive').length },
    { value: 'pending', label: 'Pending', count: clients.filter(c => c.status === 'pending').length }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'inactive': return 'text-gray-600 bg-gray-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'inactive': return <Clock className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getVerificationColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600'
      case 'pending': return 'text-yellow-600'
      case 'unverified': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const filteredClients = clients.filter(client => 
    (selectedFilter === 'all' || client.status === selectedFilter) &&
    (searchQuery === '' || client.name.toLowerCase().includes(searchQuery.toLowerCase()) || client.email.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    inactive: clients.filter(c => c.status === 'inactive').length,
    pending: clients.filter(c => c.status === 'pending').length,
    totalRevenue: clients.reduce((sum, client) => sum + client.totalSpent, 0),
    averageRating: clients.filter(c => c.averageRating).reduce((sum, client) => sum + (client.averageRating || 0), 0) / clients.filter(c => c.averageRating).length
  }

  return (
    <div className="min-h-screen bg-background">
      <AgencyNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Client Management</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage your client relationships and track their activity
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => alert('Exporting clients data...')}>
              <Filter className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="w-full sm:w-auto" onClick={() => alert('Opening add client form...')}>
              <Users className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Clients</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.total}</p>
                </div>
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Active</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.active}</p>
                </div>
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-xl sm:text-2xl font-bold">₹{(stats.totalRevenue / 1000).toFixed(0)}K</p>
                </div>
                <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Avg Rating</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.averageRating.toFixed(1)}</p>
                </div>
                <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search clients by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm text-gray-900 bg-white"
              >
                {filters.map(filter => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label} ({filter.count})
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Clients List */}
        <div className="space-y-4 sm:space-y-6">
          {filteredClients.map(client => (
            <Card key={client.id}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                      <div>
                        <h3 className="font-medium text-sm sm:text-base">{client.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">ID: {client.id}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(client.status)}`}>
                          {getStatusIcon(client.status)}
                          <span>{client.status.charAt(0).toUpperCase() + client.status.slice(1)}</span>
                        </span>
                        <span className={`text-xs font-medium ${getVerificationColor(client.verificationStatus)}`}>
                          {client.verificationStatus.charAt(0).toUpperCase() + client.verificationStatus.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-xs sm:text-sm">
                          <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{client.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm">
                          <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                          <span>{client.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                          <span>{client.city}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-xs sm:text-sm">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                          <span>Bookings: {client.totalBookings}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm">
                          <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                          <span>Spent: ₹{(client.totalSpent / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                          <span>Rating: {client.averageRating ? client.averageRating.toFixed(1) : 'N/A'}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-xs sm:text-sm">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                          <span>Last: {client.lastBooking || 'Never'}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                          <span>Joined: {client.joinDate}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm">
                          <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                          <span>Payment: {client.paymentMethod}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs sm:text-sm">
                          <span className="font-medium">Preferred Escorts:</span>
                          <div className="mt-1">
                            {client.preferredEscorts.length > 0 ? (
                              client.preferredEscorts.map(escort => (
                                <span key={escort} className="inline-block px-2 py-1 bg-muted rounded text-xs mr-1 mb-1">
                                  {escort}
                                </span>
                              ))
                            ) : (
                              <span className="text-muted-foreground">None</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {client.notes && (
                      <div className="mb-4 p-3 bg-muted rounded-lg">
                        <p className="text-xs sm:text-sm text-muted-foreground">{client.notes}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">View Profile</span>
                        <span className="sm:hidden">View</span>
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Message</span>
                        <span className="sm:hidden">Msg</span>
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">View Bookings</span>
                        <span className="sm:hidden">Bookings</span>
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Edit</span>
                        <span className="sm:hidden">Edit</span>
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredClients.length === 0 && (
          <Card>
            <CardContent className="p-8 sm:p-12 text-center">
              <Users className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-base sm:text-lg font-medium mb-2">No clients found</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {searchQuery ? 'Try adjusting your search terms' : 'Start by adding your first client'}
              </p>
              <Button className="mt-4">
                <Users className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Load More */}
        {filteredClients.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline">
              Load More Clients
            </Button>
          </div>
        )}
      </main>
    </div>
  )
} 
