'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Filter, Star, Eye, Edit, X, User, Users, Phone, Mail, MapPin, Calendar, DollarSign, CheckCircle, XCircle, AlertCircle, Download, Shield, ChevronLeft, ChevronRight, Ban, Check, Image as LucideImage } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from '@/components/ThemeToggle'

export default function AdminAgenciesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedVerification, setSelectedVerification] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const agenciesData = [
    {
      id: '1',
      name: 'Elite Escorts Mumbai',
      owner: 'Rajesh Kumar',
      email: 'rajesh@eliteescorts.com',
      phone: '+91 98765 43210',
      location: 'Mumbai, Maharashtra',
      status: 'active',
      verificationStatus: 'verified',
      totalEscorts: 25,
      totalBookings: 450,
      totalRevenue: 6750000,
      rating: 4.8,
      joinDate: '2023-06-15',
      lastActive: '2024-01-25 14:30',
      avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100'
    },
    {
      id: '2',
      name: 'Premium Escorts Delhi',
      owner: 'Amit Patel',
      email: 'amit@premiumescorts.com',
      phone: '+91 98765 43211',
      location: 'Delhi, NCR',
      status: 'active',
      verificationStatus: 'verified',
      totalEscorts: 18,
      totalBookings: 320,
      totalRevenue: 4800000,
      rating: 4.7,
      joinDate: '2023-08-20',
      lastActive: '2024-01-24 16:45',
      avatar: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=100'
    },
    {
      id: '3',
      name: 'Luxury Escorts Bangalore',
      owner: 'Priya Sharma',
      email: 'priya@luxuryescorts.com',
      phone: '+91 98765 43212',
      location: 'Bangalore, Karnataka',
      status: 'pending',
      verificationStatus: 'pending',
      totalEscorts: 12,
      totalBookings: 180,
      totalRevenue: 2700000,
      rating: 4.5,
      joinDate: '2024-01-05',
      lastActive: '2024-01-20 10:15',
      avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100'
    },
    {
      id: '4',
      name: 'Royal Escorts Chennai',
      owner: 'Vikram Singh',
      email: 'vikram@royalescorts.com',
      phone: '+91 98765 43213',
      location: 'Chennai, Tamil Nadu',
      status: 'suspended',
      verificationStatus: 'verified',
      totalEscorts: 15,
      totalBookings: 220,
      totalRevenue: 3300000,
      rating: 4.2,
      joinDate: '2023-09-10',
      lastActive: '2024-01-18 09:30',
      avatar: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=100'
    },
    {
      id: '5',
      name: 'Exclusive Escorts Hyderabad',
      owner: 'Suresh Reddy',
      email: 'suresh@exclusiveescorts.com',
      phone: '+91 98765 43214',
      location: 'Hyderabad, Telangana',
      status: 'active',
      verificationStatus: 'verified',
      totalEscorts: 20,
      totalBookings: 380,
      totalRevenue: 5700000,
      rating: 4.9,
      joinDate: '2023-07-25',
      lastActive: '2024-01-25 18:20',
      avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100'
    }
  ]



  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      case 'suspended': return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      default: return <AlertCircle className="h-4 w-4 text-gray-600 dark:text-gray-400" />
    }
  }

  const getVerificationColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-blue-600 bg-blue-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'verified': return <Shield className="h-4 w-4 text-blue-600" />
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredAgencies = agenciesData.filter(agency => {
    const matchesSearch = agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agency.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agency.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agency.phone.includes(searchQuery)
    const matchesStatus = selectedStatus === 'all' || agency.status === selectedStatus
    const matchesVerification = selectedVerification === 'all' || agency.verificationStatus === selectedVerification
    const matchesLocation = selectedLocation === 'all' || agency.location.includes(selectedLocation)
    return matchesSearch && matchesStatus && matchesVerification && matchesLocation
  })

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredAgencies.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentAgencies = filteredAgencies.slice(startIndex, endIndex)

  // Function handlers
  const handleExportData = () => {
    const csvContent = [
      ['Agency ID', 'Name', 'Owner', 'Email', 'Phone', 'Location', 'Status', 'Verification', 'Total Escorts', 'Total Bookings', 'Total Revenue', 'Rating', 'Join Date'],
      ...filteredAgencies.map(agency => [
        agency.id,
        agency.name,
        agency.owner,
        agency.email,
        agency.phone,
        agency.location,
        agency.status,
        agency.verificationStatus,
        agency.totalEscorts,
        agency.totalBookings,
        agency.totalRevenue,
        agency.rating,
        agency.joinDate
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `agencies_export_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleAddAgency = () => {
    router.push('/admin/agencies/add')
  }

  const handleViewAgency = (agencyId: string) => {
    router.push(`/admin/agencies/${agencyId}`)
  }

  const handleEditAgency = (agencyId: string) => {
    router.push(`/admin/agencies/${agencyId}/edit`)
  }

  const handleBanAgency = (agencyId: string) => {
    if (confirm('Are you sure you want to ban this agency? This action can be reversed later.')) {
      // In a real app, this would make an API call
      alert(`Agency ${agencyId} has been banned`)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Agency Management</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage all registered agencies and their operations
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 w-full sm:w-auto">
          <ThemeToggle variant="outline" size="sm" />
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button onClick={handleAddAgency} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Agency
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
                placeholder="Search agencies..."
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
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
            <select
              value={selectedVerification}
              onChange={(e) => setSelectedVerification(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="all">All Verification</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
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

      {/* Agencies Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Agencies ({filteredAgencies.length})</CardTitle>
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredAgencies.length)} of {filteredAgencies.length}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Agency</th>
                  <th className="text-left py-3 px-4 font-medium">Owner</th>
                  <th className="text-left py-3 px-4 font-medium">Contact</th>
                  <th className="text-left py-3 px-4 font-medium">Location</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Performance</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentAgencies.map((agency) => (
                  <tr key={agency.id} className="border-b hover:bg-gray-800">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={agency.avatar}
                          alt={agency.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-medium">{agency.name}</div>
                          <div className="text-sm text-muted-foreground">ID: {agency.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="font-medium">{agency.owner}</div>
                        <div className="text-sm text-muted-foreground">Owner</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-sm">
                          <Mail className="h-3 w-3" />
                          <span>{agency.email}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <Phone className="h-3 w-3" />
                          <span>{agency.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{agency.location}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agency.status)}`}>
                          {getStatusIcon(agency.status)}
                          <span className="ml-1 capitalize">{agency.status}</span>
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getVerificationColor(agency.verificationStatus)}`}>
                          {getVerificationIcon(agency.verificationStatus)}
                          <span className="ml-1 capitalize">{agency.verificationStatus}</span>
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{agency.totalEscorts}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{agency.totalBookings}</span>
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center space-x-1">
                            <Star className="h-3 w-3" />
                            <span>{agency.rating}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3" />
                            <span>₹{(agency.totalRevenue / 100000).toFixed(1)}L</span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewAgency(agency.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditAgency(agency.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleBanAgency(agency.id)}
                        >
                          <Ban className="h-4 w-4" />
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
