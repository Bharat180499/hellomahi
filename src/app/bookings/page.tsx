"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Star, 
  MapPin,
  Phone,
  MessageCircle,
  Filter,
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
  Download,
  RefreshCw,
  Plus,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar as CalendarIcon
} from 'lucide-react'
import type { Booking, BookingStats } from '@/types/bookings'
import { bookingSystem } from '@/lib/api/bookings'
import BookingCard from '@/components/booking/BookingCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [stats, setStats] = useState<BookingStats | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | 'all'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'status'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Mock data for demonstration
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
      createdAt: '2024-01-20T10:30:00Z',
      updatedAt: '2024-01-20T10:30:00Z',
      notes: 'Business dinner at Taj Hotel'
    },
    {
      id: '2',
      escortId: 'escort2',
      escortName: 'Zara Khan',
      escortImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      clientId: 'client2',
      clientName: 'Amit Patel',
      clientPhone: '+91 98765 43211',
      clientEmail: 'amit@example.com',
      date: '2024-01-24',
      time: '21:00',
      duration: 3,
      services: ['Massage', 'Companionship'],
      location: 'Client Residence, Bandra West',
      amount: 45000,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: '2024-01-22T14:20:00Z',
      updatedAt: '2024-01-22T14:20:00Z',
      notes: 'Weekend relaxation session'
    },
    {
      id: '3',
      escortId: 'escort3',
      escortName: 'Sofia Rodriguez',
      escortImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      clientId: 'client3',
      clientName: 'Vikram Singh',
      clientPhone: '+91 98765 43212',
      clientEmail: 'vikram@example.com',
      date: '2024-01-23',
      time: '19:00',
      duration: 4,
      services: ['VIP Service', 'Overnight'],
      location: 'Marriott Hotel, Mumbai',
      amount: 80000,
      status: 'completed',
      paymentStatus: 'paid',
      createdAt: '2024-01-21T09:15:00Z',
      updatedAt: '2024-01-23T23:00:00Z',
      rating: 5,
      review: 'Excellent service, very professional'
    },
    {
      id: '4',
      escortId: 'escort4',
      escortName: 'Aisha Patel',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      clientId: 'client4',
      clientName: 'Rajesh Kumar',
      clientPhone: '+91 98765 43213',
      clientEmail: 'rajesh@example.com',
      date: '2024-01-20',
      time: '18:00',
      duration: 2,
      services: ['Social Event'],
      location: 'Client Office, Andheri',
      amount: 25000,
      status: 'cancelled',
      paymentStatus: 'refunded',
      createdAt: '2024-01-18T16:30:00Z',
      updatedAt: '2024-01-19T12:00:00Z',
      cancellationReason: 'Client emergency'
    }
  ]

  const mockStats: BookingStats = {
    totalBookings: 4,
    pendingBookings: 1,
    confirmedBookings: 1,
    completedBookings: 1,
    cancelledBookings: 1,
    totalRevenue: 180000,
    averageRating: 5,
    completionRate: 75,
    cancellationRate: 25,
    monthlyStats: [
      { month: 'January 2024', bookings: 4, revenue: 180000, completed: 1, cancelled: 1 }
    ],
    topServices: [
      { service: 'Companionship', bookings: 2, revenue: 75000 },
      { service: 'VIP Service', bookings: 1, revenue: 80000 },
      { service: 'Social Event', bookings: 1, revenue: 25000 }
    ],
    topLocations: [
      { location: 'Mumbai', bookings: 4, revenue: 180000 }
    ]
  }

  // Load data
  const loadData = async () => {
    setIsLoading(true)
    try {
      // For now, using mock data
      // const [bookingsResponse, statsResponse] = await Promise.all([
      //   bookingSystem.bookings.list(),
      //   bookingSystem.bookingStats.getStats()
      // ])
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setBookings(mockBookings)
      setStats(mockStats)
    } catch (error) {
      console.error('Failed to load booking data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle booking actions
  const handleViewBooking = (booking: Booking) => {
    console.log('View booking:', booking)
  }

  const handleEditBooking = (booking: Booking) => {
    console.log('Edit booking:', booking)
  }

  const handleCancelBooking = (booking: Booking) => {
    console.log('Cancel booking:', booking)
  }

  const handleConfirmBooking = (booking: Booking) => {
    console.log('Confirm booking:', booking)
  }

  const handleCompleteBooking = (booking: Booking) => {
    console.log('Complete booking:', booking)
  }

  const handleMessageBooking = (booking: Booking) => {
    console.log('Message booking:', booking)
  }

  const handleDownloadBooking = (booking: Booking) => {
    console.log('Download booking:', booking)
  }

  // Filter and sort bookings
  const filteredBookings = bookings
    .filter(booking => {
      const matchesSearch = 
        booking.escortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus
      
      const matchesTab = (() => {
        switch (activeTab) {
          case 'upcoming':
            return ['pending', 'confirmed'].includes(booking.status)
          case 'completed':
            return booking.status === 'completed'
          case 'cancelled':
            return booking.status === 'cancelled'
          default:
            return true
        }
      })()
      
      return matchesSearch && matchesStatus && matchesTab
    })
    .sort((a, b) => {
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
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })

  // Load initial data
  useEffect(() => {
    loadData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100'
      case 'completed':
        return 'text-blue-600 bg-blue-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'cancelled':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Bookings Management</h1>
            <p className="text-muted-foreground">
              Manage your appointments and track booking history
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={loadData} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                    <p className="text-2xl font-bold">{stats.totalBookings}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">₹{(stats.totalRevenue / 1000).toFixed(0)}K</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                    <p className="text-2xl font-bold">{stats.completionRate}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                    <p className="text-2xl font-bold">{stats.averageRating}</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
              >
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
                <option value="status">Sort by Status</option>
              </select>
              <Button
                variant="outline"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
            <TabsTrigger value="upcoming">
              Upcoming ({bookings.filter(b => ['pending', 'confirmed'].includes(b.status)).length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({bookings.filter(b => b.status === 'completed').length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({bookings.filter(b => b.status === 'cancelled').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : filteredBookings.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No bookings found</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    {searchTerm ? 'Try adjusting your search criteria' : 'Your booking history will appear here'}
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Booking
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    userType="client"
                    onView={handleViewBooking}
                    onEdit={handleEditBooking}
                    onCancel={handleCancelBooking}
                    onConfirm={handleConfirmBooking}
                    onComplete={handleCompleteBooking}
                    onMessage={handleMessageBooking}
                    onDownload={handleDownloadBooking}
                    showActions={true}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  userType="client"
                  onView={handleViewBooking}
                  onEdit={handleEditBooking}
                  onCancel={handleCancelBooking}
                  onConfirm={handleConfirmBooking}
                  onComplete={handleCompleteBooking}
                  onMessage={handleMessageBooking}
                  onDownload={handleDownloadBooking}
                  showActions={true}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  userType="client"
                  onView={handleViewBooking}
                  onEdit={handleEditBooking}
                  onCancel={handleCancelBooking}
                  onConfirm={handleConfirmBooking}
                  onComplete={handleCompleteBooking}
                  onMessage={handleMessageBooking}
                  onDownload={handleDownloadBooking}
                  showActions={true}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  userType="client"
                  onView={handleViewBooking}
                  onEdit={handleEditBooking}
                  onCancel={handleCancelBooking}
                  onConfirm={handleConfirmBooking}
                  onComplete={handleCompleteBooking}
                  onMessage={handleMessageBooking}
                  onDownload={handleDownloadBooking}
                  showActions={true}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {filteredBookings.length > 0 && (
          <div className="flex items-center justify-between mt-8">
            <p className="text-sm text-muted-foreground">
              Showing {filteredBookings.length} of {bookings.length} bookings
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
} 