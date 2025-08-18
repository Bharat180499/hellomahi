'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Filter, Star, Eye, Edit, X, MapPin, Clock, Calendar, CheckCircle, XCircle, AlertCircle, Download, ChevronLeft, ChevronRight, Building, Check, Check, Star, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ThemeToggle from '@/components/ThemeToggle'
import { Ban, Download, ChevronLeft, ChevronRight, Search, Filter, Eye, Star, Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle, Plus, X, Edit, Building, User, Image as LucideImage } from 'lucide-react'

export default function AdminBookingsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedDateRange, setSelectedDateRange] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const bookingsData = [
    {
      id: 'BK001',
      user: {
        id: '1',
        name: 'Rahul Verma',
        email: 'rahul@example.com',
        phone: '+91 98765 43210',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
      },
      escort: {
        id: '1',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '+91 98765 43211',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100'
      },
      agency: {
        id: '1',
        name: 'Elite Escorts Mumbai'
      },
      bookingDate: '2024-01-25',
      bookingTime: '20:00',
      duration: '2 hours',
      location: 'Mumbai, Maharashtra',
      status: 'confirmed',
      amount: 15000,
      paymentStatus: 'paid',
      rating: 5,
      review: 'Excellent service, very professional',
      createdAt: '2024-01-20 14:30',
      updatedAt: '2024-01-25 18:00'
    },
    {
      id: 'BK002',
      user: {
        id: '2',
        name: 'Amit Patel',
        email: 'amit@example.com',
        phone: '+91 98765 43212',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
      },
      escort: {
        id: '2',
        name: 'Zara Khan',
        email: 'zara@example.com',
        phone: '+91 98765 43213',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
      },
      agency: {
        id: '2',
        name: 'Premium Escorts Delhi'
      },
      bookingDate: '2024-01-24',
      bookingTime: '19:30',
      duration: '3 hours',
      location: 'Delhi, NCR',
      status: 'completed',
      amount: 25000,
      paymentStatus: 'paid',
      rating: 4,
      review: 'Good experience, would recommend',
      createdAt: '2024-01-18 16:45',
      updatedAt: '2024-01-24 22:30'
    },
    {
      id: 'BK003',
      user: {
        id: '3',
        name: 'Vikram Singh',
        email: 'vikram@example.com',
        phone: '+91 98765 43214',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
      },
      escort: {
        id: '3',
        name: 'Sofia Rodriguez',
        email: 'sofia@example.com',
        phone: '+91 98765 43215',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'
      },
      agency: {
        id: '3',
        name: 'Luxury Escorts Bangalore'
      },
      bookingDate: '2024-01-26',
      bookingTime: '21:00',
      duration: '1 hour',
      location: 'Bangalore, Karnataka',
      status: 'pending',
      amount: 8000,
      paymentStatus: 'pending',
      rating: null,
      review: null,
      createdAt: '2024-01-22 10:15',
      updatedAt: '2024-01-22 10:15'
    },
    {
      id: 'BK004',
      user: {
        id: '4',
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '+91 98765 43216',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
      },
      escort: {
        id: '4',
        name: 'Aisha Patel',
        email: 'aisha@example.com',
        phone: '+91 98765 43217',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100'
      },
      agency: {
        id: '1',
        name: 'Elite Escorts Mumbai'
      },
      bookingDate: '2024-01-23',
      bookingTime: '18:00',
      duration: '4 hours',
      location: 'Mumbai, Maharashtra',
      status: 'cancelled',
      amount: 30000,
      paymentStatus: 'refunded',
      rating: null,
      review: null,
      createdAt: '2024-01-19 09:30',
      updatedAt: '2024-01-23 17:00'
    },
    {
      id: 'BK005',
      user: {
        id: '5',
        name: 'Suresh Reddy',
        email: 'suresh@example.com',
        phone: '+91 98765 43218',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
      },
      escort: {
        id: '5',
        name: 'Meera Nair',
        email: 'meera@example.com',
        phone: '+91 98765 43219',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
      },
      agency: {
        id: '5',
        name: 'Exclusive Escorts Hyderabad'
      },
      bookingDate: '2024-01-27',
      bookingTime: '20:30',
      duration: '2 hours',
      location: 'Hyderabad, Telangana',
      status: 'confirmed',
      amount: 12000,
      paymentStatus: 'paid',
      rating: null,
      review: null,
      createdAt: '2024-01-21 18:20',
      updatedAt: '2024-01-21 18:20'
    }
  ]



  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      case 'completed': return <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
      default: return <AlertCircle className="h-4 w-4 text-gray-600 dark:text-gray-400" />
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20'
      case 'pending': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20'
      case 'refunded': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20'
      case 'failed': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
    }
  }

  const filteredBookings = bookingsData.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.escort.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.agency.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus
    const matchesLocation = selectedLocation === 'all' || booking.location.includes(selectedLocation)
    return matchesSearch && matchesStatus && matchesLocation
  })

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBookings = filteredBookings.slice(startIndex, endIndex)

  // Function handlers
  const handleExportData = () => {
    const csvContent = [
      ['Booking ID', 'User', 'Escort', 'Agency', 'Date', 'Time', 'Duration', 'Location', 'Status', 'Payment Status', 'Rating', 'Created At'],
      ...filteredBookings.map(booking => [
        booking.id,
        booking.user.name,
        booking.escort.name,
        booking.agency.name,
        booking.bookingDate,
        booking.bookingTime,
        booking.duration,
        booking.location,
        booking.status,
        booking.paymentStatus,
        booking.rating || 'N/A',
        booking.createdAt
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bookings_export_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleCreateBooking = () => {
    router.push('/admin/bookings/create')
  }

  const handleViewBooking = (bookingId: string) => {
    router.push(`/admin/bookings/${bookingId}`)
  }

  const handleEditBooking = (bookingId: string) => {
    router.push(`/admin/bookings/${bookingId}/edit`)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Booking Management</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Monitor and manage all platform bookings
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 w-full sm:w-auto">
          <ThemeToggle variant="outline" size="sm" />
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button onClick={handleCreateBooking} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create Booking
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="all">All Locations</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredBookings.length)} of {filteredBookings.length}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Booking ID</th>
                  <th className="text-left py-3 px-4 font-medium">User</th>
                  <th className="text-left py-3 px-4 font-medium">Escort</th>
                  <th className="text-left py-3 px-4 font-medium">Agency</th>
                  <th className="text-left py-3 px-4 font-medium">Details</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>

                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-800">
                    <td className="py-3 px-4">
                      <div className="font-medium">{booking.id}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={booking.user.avatar}
                          alt={booking.user.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-medium">{booking.user.name}</div>
                          <div className="text-sm text-muted-foreground">{booking.user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={booking.escort.avatar}
                          alt={booking.escort.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-medium">{booking.escort.name}</div>
                          <div className="text-sm text-muted-foreground">{booking.escort.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <Building className="h-3 w-3" />
                        <span className="text-sm">{booking.agency.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          <span>{booking.bookingDate} at {booking.bookingTime}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <Clock className="h-3 w-3" />
                          <span>{booking.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <MapPin className="h-3 w-3" />
                          <span>{booking.location}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">{booking.status}</span>
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                          <span className="capitalize">{booking.paymentStatus}</span>
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        {booking.rating && (
                          <div className="flex items-center space-x-1 text-sm">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span>{booking.rating}/5</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewBooking(booking.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditBooking(booking.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
