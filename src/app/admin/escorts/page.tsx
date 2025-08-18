"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ThemeToggle from '@/components/ThemeToggle'
import { getVerificationStatusColor } from '@/lib/admin-utils'
import { Ban, Download, ChevronLeft, ChevronRight, Search, Filter, Eye, Star, Calendar, MapPin, Shield, CheckCircle, XCircle, AlertCircle, Phone, Plus, X, Edit, Trash2, Image as LucideImage } from 'lucide-react'

export default function AdminEscortsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedVerification, setSelectedVerification] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedEscorts, setSelectedEscorts] = useState<string[]>([])

  const escortsData = [
    {
      id: '1',
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 4.8,
      totalBookings: 45,
      verificationStatus: 'verified',
      profileStatus: 'active',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      phone: '+91 98765 43210',
      email: 'priya@example.com',
      joinDate: '2023-12-01'
    },
    {
      id: '2',
      name: 'Zara Khan',
      location: 'Delhi',
      rating: 4.7,
      totalBookings: 38,
      verificationStatus: 'verified',
      profileStatus: 'active',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      phone: '+91 98765 43211',
      email: 'zara@example.com',
      joinDate: '2023-11-15'
    },
    {
      id: '3',
      name: 'Sofia Rodriguez',
      location: 'Bangalore',
      rating: 4.6,
      totalBookings: 32,
      verificationStatus: 'pending',
      profileStatus: 'active',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      phone: '+91 98765 43212',
      email: 'sofia@example.com',
      joinDate: '2024-01-05'
    },
    {
      id: '4',
      name: 'Aisha Patel',
      location: 'Mumbai',
      rating: 4.9,
      totalBookings: 52,
      verificationStatus: 'verified',
      profileStatus: 'inactive',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      phone: '+91 98765 43213',
      email: 'aisha@example.com',
      joinDate: '2023-10-20'
    },
    {
      id: '5',
      name: 'Meera Nair',
      location: 'Delhi',
      rating: 4.5,
      totalBookings: 28,
      verificationStatus: 'rejected',
      profileStatus: 'banned',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
      phone: '+91 98765 43214',
      email: 'meera@example.com',
      joinDate: '2023-09-10'
    }
  ]



  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'inactive': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'banned': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      case 'inactive': return <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      case 'banned': return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
      default: return <AlertCircle className="h-4 w-4 text-gray-600 dark:text-gray-400" />
    }
  }

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
      default: return <AlertCircle className="h-4 w-4 text-gray-600 dark:text-gray-400" />
    }
  }

  const filteredEscorts = escortsData.filter(escort => {
    const matchesSearch = escort.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         escort.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || escort.profileStatus === selectedStatus
    const matchesVerification = selectedVerification === 'all' || escort.verificationStatus === selectedVerification
    const matchesLocation = selectedLocation === 'all' || escort.location === selectedLocation
    return matchesSearch && matchesStatus && matchesVerification && matchesLocation
  })

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredEscorts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEscorts = filteredEscorts.slice(startIndex, endIndex)

  // Function handlers
  const handleExportData = () => {
    const csvContent = [
      ['ID', 'Name', 'Location', 'Rating', 'Total Bookings', 'Verification Status', 'Profile Status', 'Phone', 'Email', 'Join Date'],
      ...filteredEscorts.map(escort => [
        escort.id,
        escort.name,
        escort.location,
        escort.rating,
        escort.totalBookings,
        escort.verificationStatus,
        escort.profileStatus,
        escort.phone,
        escort.email,
        escort.joinDate
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `escorts_export_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleAddEscort = () => {
    router.push('/admin/escorts/add')
  }

  const handleViewEscort = (escortId: string) => {
    router.push(`/admin/escorts/${escortId}`)
  }

  const handleEditEscort = (escortId: string) => {
    router.push(`/admin/escorts/${escortId}/edit`)
  }

  const handleVerifyEscort = (escortId: string) => {
    if (confirm('Are you sure you want to verify this escort?')) {
      // In a real app, this would make an API call
      alert(`Escort ${escortId} has been verified`)
    }
  }

  const handleBanEscort = (escortId: string) => {
    if (confirm('Are you sure you want to ban this escort?')) {
      // In a real app, this would make an API call
      alert(`Escort ${escortId} has been banned`)
    }
  }

  const handleDeleteEscort = (escortId: string) => {
    if (confirm('Are you sure you want to delete this escort? This action cannot be undone.')) {
      // In a real app, this would make an API call
      alert(`Escort ${escortId} has been deleted`)
    }
  }

  const handleBulkAction = (action: string) => {
    if (selectedEscorts.length === 0) {
      alert('Please select escorts first')
      return
    }
    
    if (confirm(`Are you sure you want to ${action} ${selectedEscorts.length} selected escorts?`)) {
      // In a real app, this would make an API call
      alert(`${action} action performed on ${selectedEscorts.length} escorts`)
      setSelectedEscorts([])
    }
  }

  const toggleEscortSelection = (escortId: string) => {
    setSelectedEscorts(prev => 
      prev.includes(escortId) 
        ? prev.filter(id => id !== escortId)
        : [...prev, escortId]
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Escort Management</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage escort profiles and verifications
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 w-full sm:w-auto">
          <ThemeToggle variant="outline" size="sm" />
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button onClick={handleAddEscort} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Escort
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search escorts..."
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
              <option value="inactive">Inactive</option>
              <option value="banned">Banned</option>
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
            </select>
          </div>
          
          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Min Rating</label>
                <Input type="number" placeholder="0" min="0" max="5" step="0.1" className="text-sm mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Min Bookings</label>
                <Input type="number" placeholder="0" className="text-sm mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Join Date Range</label>
                <div className="flex space-x-2 mt-1">
                  <Input type="date" placeholder="From" className="text-sm" />
                  <Input type="date" placeholder="To" className="text-sm" />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedEscorts.length > 0 && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedEscorts.length} escort(s) selected
              </span>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('verify')}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Verify
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('activate')}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Activate
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('ban')}
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Ban
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('delete')}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Escorts Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Escorts ({filteredEscorts.length})</CardTitle>
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredEscorts.length)} of {filteredEscorts.length}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">
                    <input
                      type="checkbox"
                      checked={selectedEscorts.length === currentEscorts.length && currentEscorts.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEscorts(currentEscorts.map(escort => escort.id))
                        } else {
                          setSelectedEscorts([])
                        }
                      }}
                      className="rounded"
                    />
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Escort</th>
                  <th className="text-left py-3 px-4 font-medium">Location</th>
                  <th className="text-left py-3 px-4 font-medium">Rating</th>
                  <th className="text-left py-3 px-4 font-medium">Bookings</th>
                  <th className="text-left py-3 px-4 font-medium">Verification</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEscorts.map((escort) => (
                  <tr key={escort.id} className="border-b hover:bg-gray-800">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedEscorts.includes(escort.id)}
                        onChange={() => toggleEscortSelection(escort.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={escort.avatar}
                          alt={escort.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-medium">{escort.name}</div>
                          <div className="text-sm text-muted-foreground">ID: {escort.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{escort.location}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{escort.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{escort.totalBookings}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getVerificationStatusColor(escort.verificationStatus)}`}>
                        {getVerificationIcon(escort.verificationStatus)}
                        <span className="ml-1 capitalize">{escort.verificationStatus}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(escort.profileStatus)}`}>
                        {getStatusIcon(escort.profileStatus)}
                        <span className="ml-1 capitalize">{escort.profileStatus}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewEscort(escort.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditEscort(escort.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleVerifyEscort(escort.id)}
                        >
                          <Shield className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleBanEscort(escort.id)}
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteEscort(escort.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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
