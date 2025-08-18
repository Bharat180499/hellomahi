"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Filter, Eye, X, MapPin, Clock, CheckCircle, XCircle, Download, Shield, ChevronLeft, ChevronRight, FileText, Check, Flag, Star, Crown, Settings, Camera, Building, User, MessageSquare, Image as LucideImage } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminModerationPage() {
  const [activeTab, setActiveTab] = useState<'verification' | 'content' | 'reports'>('verification')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const verificationQueue = [
    {
      id: '1',
      type: 'escort',
      name: 'Diya Sharma',
      location: 'Mumbai',
      priority: 'high',
      status: 'pending',
      submittedDate: '2024-01-25',
      documents: ['ID Proof', 'Address Proof', 'Photos'],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      email: 'diya@example.com',
      phone: '+91 98765 43210'
    },
    {
      id: '2',
      type: 'agency',
      name: 'Premium Escorts Delhi',
      location: 'Delhi',
      priority: 'medium',
      status: 'pending',
      submittedDate: '2024-01-24',
      documents: ['Business License', 'Owner ID', 'Address Proof'],
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      email: 'premium@example.com',
      phone: '+91 98765 43211'
    },
    {
      id: '3',
      type: 'escort',
      name: 'Kavya Reddy',
      location: 'Bangalore',
      priority: 'low',
      status: 'pending',
      submittedDate: '2024-01-23',
      documents: ['ID Proof', 'Photos'],
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      email: 'kavya@example.com',
      phone: '+91 98765 43212'
    }
  ]

  const contentQueue = [
    {
      id: '1',
      type: 'photo',
      name: 'Priya Sharma',
      content: 'Profile Photo',
      priority: 'high',
      status: 'pending',
      submittedDate: '2024-01-25',
      reason: 'Inappropriate content',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100'
    },
    {
      id: '2',
      type: 'description',
      name: 'Zara Khan',
      content: 'Profile Description',
      priority: 'medium',
      status: 'pending',
      submittedDate: '2024-01-24',
      reason: 'Violation of guidelines',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    },
    {
      id: '3',
      type: 'review',
      name: 'Amit Patel',
      content: 'User Review',
      priority: 'low',
      status: 'pending',
      submittedDate: '2024-01-23',
      reason: 'Spam content',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    }
  ]

  const reportsQueue = [
    {
      id: '1',
      type: 'user',
      reportedBy: 'Rahul Verma',
      reportedUser: 'Priya Sharma',
      reason: 'Inappropriate behavior',
      priority: 'high',
      status: 'pending',
      submittedDate: '2024-01-25',
      description: 'User reported for inappropriate messages',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100'
    },
    {
      id: '2',
      type: 'escort',
      reportedBy: 'Amit Patel',
      reportedUser: 'Zara Khan',
      reason: 'Fake profile',
      priority: 'medium',
      status: 'pending',
      submittedDate: '2024-01-24',
      description: 'Escort profile appears to be fake',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    },
    {
      id: '3',
      type: 'agency',
      reportedBy: 'Vikram Singh',
      reportedUser: 'Elite Escorts Mumbai',
      reason: 'Poor service',
      priority: 'low',
      status: 'pending',
      submittedDate: '2024-01-23',
      description: 'Agency provided poor quality service',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
      case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20'
      case 'low': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
    }
  }



  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'user': return User
      case 'escort': return Crown
      case 'agency': return Building
      case 'photo': return Camera
      case 'description': return FileText
      case 'review': return Star
      default: return User
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'user': return 'text-blue-600 dark:text-blue-400'
      case 'escort': return 'text-purple-600 dark:text-purple-400'
      case 'agency': return 'text-green-600 dark:text-green-400'
      case 'photo': return 'text-pink-600 dark:text-pink-400'
      case 'description': return 'text-orange-600 dark:text-orange-400'
      case 'review': return 'text-yellow-600 dark:text-yellow-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getCurrentData = () => {
    switch (activeTab) {
      case 'verification':
        return verificationQueue
      case 'content':
        return contentQueue
      case 'reports':
        return reportsQueue
      default:
        return verificationQueue
    }
  }

  const filteredData = getCurrentData().filter(item => {
    const matchesSearch = 'name' in item ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) : false
    const matchesLocation = 'location' in item ? item.location?.toLowerCase().includes(searchQuery.toLowerCase()) : false
    const matchesPriority = selectedPriority === 'all' || item.priority === selectedPriority
    return (matchesSearch || matchesLocation) && matchesPriority
  })

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  // Function handlers
  const handleExportQueue = () => {
    const csvContent = [
      ['ID', 'Type', 'Name', 'Location', 'Priority', 'Status', 'Submitted Date'],
      ...filteredData.map(item => [
        item.id,
        item.type,
        'name' in item ? item.name : 'reportedBy' in item ? item.reportedBy : 'N/A',
        'location' in item ? item.location || '' : 'N/A',
        item.priority,
        item.status,
        item.submittedDate
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeTab}_queue_export_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleViewItem = (itemId: string) => {
    // In a real app, this would open a detailed view modal or navigate to a detail page
    alert(`Viewing details for item ${itemId}`)
  }

  const handleApproveItem = (itemId: string) => {
    if (confirm('Are you sure you want to approve this item?')) {
      // In a real app, this would make an API call
      alert(`Item ${itemId} has been approved`)
    }
  }

  const handleRejectItem = (itemId: string) => {
    if (confirm('Are you sure you want to reject this item?')) {
      // In a real app, this would make an API call
      alert(`Item ${itemId} has been rejected`)
    }
  }

  const handleBulkAction = (action: string) => {
    if (selectedItems.length === 0) {
      alert('Please select items first')
      return
    }
    
    if (confirm(`Are you sure you want to ${action} ${selectedItems.length} selected items?`)) {
      // In a real app, this would make an API call
      alert(`${action} action performed on ${selectedItems.length} items`)
      setSelectedItems([])
    }
  }

  const handleSendTemplateResponse = (template: string) => {
    if (selectedItems.length === 0) {
      alert('Please select items first')
      return
    }
    
    if (confirm(`Send "${template}" template response to ${selectedItems.length} selected items?`)) {
      // In a real app, this would make an API call
      alert(`Template response "${template}" sent to ${selectedItems.length} items`)
      setSelectedItems([])
    }
  }

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Moderation Center</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage verification requests, content moderation, and user reports
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" onClick={handleExportQueue}>
            <Download className="h-4 w-4 mr-2" />
            Export Queue
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/admin/settings">
              <Shield className="h-4 w-4 mr-2" />
              Moderation Settings
            </Link>
          </Button>
        </div>
      </div>

      {/* Queue Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Verification Queue</p>
                <p className="text-2xl font-bold">{verificationQueue.length}</p>
                <p className="text-xs text-yellow-600 mt-1">
                  <Clock className="h-3 w-3 inline mr-1" />
                  Pending reviews
                </p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Content Queue</p>
                <p className="text-2xl font-bold">{contentQueue.length}</p>
                <p className="text-xs text-yellow-600 mt-1">
                  <Clock className="h-3 w-3 inline mr-1" />
                  Pending reviews
                </p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reports Queue</p>
                <p className="text-2xl font-bold">{reportsQueue.length}</p>
                <p className="text-xs text-yellow-600 mt-1">
                  <Clock className="h-3 w-3 inline mr-1" />
                  Pending reviews
                </p>
              </div>
              <Flag className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
        <button
          onClick={() => setActiveTab('verification')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'verification'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-300'
          }`}
        >
          <Shield className="h-4 w-4 inline mr-2" />
          Verification Queue
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'content'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-300'
          }`}
        >
          <FileText className="h-4 w-4 inline mr-2" />
          Content Moderation
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'reports'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-300'
          }`}
        >
          <Flag className="h-4 w-4 inline mr-2" />
          Reports
        </button>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
          
          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Submission Date Range</label>
                <div className="flex space-x-2 mt-1">
                  <Input type="date" placeholder="From" className="text-sm" />
                  <Input type="date" placeholder="To" className="text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Item Type</label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm mt-1">
                  <option value="all">All Types</option>
                  <option value="escort">Escort</option>
                  <option value="agency">Agency</option>
                  <option value="user">User</option>
                  <option value="photo">Photo</option>
                  <option value="description">Description</option>
                  <option value="review">Review</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm mt-1">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedItems.length} item(s) selected
              </span>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('approve')}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Selected
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('reject')}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Queue Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {activeTab === 'verification' && 'Verification Queue'}
              {activeTab === 'content' && 'Content Moderation Queue'}
              {activeTab === 'reports' && 'Reports Queue'}
              ({filteredData.length})
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length}
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
                      checked={selectedItems.length === currentData.length && currentData.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(currentData.map(item => item.id))
                        } else {
                          setSelectedItems([])
                        }
                      }}
                      className="rounded"
                    />
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Item</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Location</th>
                  <th className="text-left py-3 px-4 font-medium">Priority</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Submitted</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item) => {
                  const Icon = getTypeIcon(item.type)
                  return (
                    <tr key={item.id} className="border-b hover:bg-gray-800">
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleItemSelection(item.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={item.avatar}
                            alt={'name' in item ? item.name : 'reportedBy' in item ? item.reportedUser : 'Item'}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div>
                            <div className="font-medium">
                              {'name' in item ? item.name : 'reportedBy' in item ? item.reportedUser : 'Unknown'}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {activeTab === 'reports' && 'reportedBy' in item ? `Reported by: ${item.reportedBy}` : `ID: ${item.id}`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className={`flex items-center space-x-1 ${getTypeColor(item.type)}`}>
                          <Icon className="h-4 w-4" />
                          <span className="text-sm capitalize">{item.type}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{'location' in item ? item.location : 'N/A'}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1 text-sm">
                          <Clock className="h-3 w-3" />
                          <span>{item.submittedDate}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewItem(item.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleApproveItem(item.id)}
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRejectItem(item.id)}
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Bulk Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => handleBulkAction('approve')}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve Selected
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => handleBulkAction('reject')}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject Selected
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => handleSendTemplateResponse('Standard Response')}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Template Response
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Template Responses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start text-sm"
              onClick={() => handleSendTemplateResponse('Verification Approved')}
            >
              Verification Approved
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start text-sm"
              onClick={() => handleSendTemplateResponse('Verification Rejected')}
            >
              Verification Rejected
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start text-sm"
              onClick={() => handleSendTemplateResponse('Content Violation')}
            >
              Content Violation
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start text-sm"
              onClick={() => handleSendTemplateResponse('Report Resolved')}
            >
              Report Resolved
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
