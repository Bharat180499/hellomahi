'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { getStatusColor, getPriorityColor } from '@/lib/admin-utils'
import { ChevronLeft, ChevronRight, Download, Search, Filter, Eye, Calendar, Clock, CheckCircle, AlertCircle, MessageCircle, Plus, Archive, Reply, User } from 'lucide-react'

export default function AdminSupportPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Mock data for support tickets
  const ticketsData = [
    {
      id: 'TKT001',
      user: {
        name: 'Rahul Verma',
        email: 'rahul@example.com',
        phone: '+91 98765 43210',
        type: 'user'
      },
      subject: 'Payment issue with booking',
      description: 'I made a payment for booking BK001 but it shows as pending. Please help resolve this issue.',
      status: 'open',
      priority: 'high',
      category: 'payment',
      assignedTo: 'Support Team',
      createdAt: '2024-01-25 14:30',
      updatedAt: '2024-01-25 16:45',
      lastResponse: '2024-01-25 16:45',
      responseTime: '2h 15m',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'I made a payment for booking BK001 but it shows as pending. Please help resolve this issue.',
          timestamp: '2024-01-25 14:30'
        },
        {
          id: 2,
          sender: 'admin',
          message: 'Thank you for contacting us. We are investigating the payment issue. Please allow us 24-48 hours to resolve this.',
          timestamp: '2024-01-25 16:45'
        }
      ]
    },
    {
      id: 'TKT002',
      user: {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '+91 98765 43211',
        type: 'escort'
      },
      subject: 'Profile verification pending',
      description: 'I submitted my documents for verification 3 days ago but still no response. When will this be processed?',
      status: 'in_progress',
      priority: 'medium',
      category: 'verification',
      assignedTo: 'Verification Team',
      createdAt: '2024-01-23 10:15',
      updatedAt: '2024-01-25 12:30',
      lastResponse: '2024-01-25 12:30',
      responseTime: '2d 2h 15m',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'I submitted my documents for verification 3 days ago but still no response. When will this be processed?',
          timestamp: '2024-01-23 10:15'
        },
        {
          id: 2,
          sender: 'admin',
          message: 'We are currently processing verification requests. Your documents are under review and should be completed within 24 hours.',
          timestamp: '2024-01-25 12:30'
        }
      ]
    },
    {
      id: 'TKT003',
      user: {
        name: 'Elite Escorts Mumbai',
        email: 'contact@eliteescorts.com',
        phone: '+91 98765 43212',
        type: 'agency'
      },
      subject: 'Payment payout delayed',
      description: 'Our payment payout for December 2023 is still pending. Please expedite the process.',
      status: 'resolved',
      priority: 'high',
      category: 'financial',
      assignedTo: 'Finance Team',
      createdAt: '2024-01-20 09:00',
      updatedAt: '2024-01-24 15:20',
      lastResponse: '2024-01-24 15:20',
      responseTime: '4d 6h 20m',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'Our payment payout for December 2023 is still pending. Please expedite the process.',
          timestamp: '2024-01-20 09:00'
        },
        {
          id: 2,
          sender: 'admin',
          message: 'We apologize for the delay. The payout has been processed and should reflect in your account within 24-48 hours.',
          timestamp: '2024-01-24 15:20'
        }
      ]
    },
    {
      id: 'TKT004',
      user: {
        name: 'Amit Patel',
        email: 'amit@example.com',
        phone: '+91 98765 43213',
        type: 'user'
      },
      subject: 'App not working properly',
      description: 'The mobile app keeps crashing when I try to book an escort. This is very frustrating.',
      status: 'open',
      priority: 'medium',
      category: 'technical',
      assignedTo: 'Technical Team',
      createdAt: '2024-01-26 11:30',
      updatedAt: '2024-01-26 11:30',
      lastResponse: null,
      responseTime: 'Awaiting response',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'The mobile app keeps crashing when I try to book an escort. This is very frustrating.',
          timestamp: '2024-01-26 11:30'
        }
      ]
    },
    {
      id: 'TKT005',
      user: {
        name: 'Zara Khan',
        email: 'zara@example.com',
        phone: '+91 98765 43214',
        type: 'escort'
      },
      subject: 'Account suspended without reason',
      description: 'My account was suspended yesterday without any explanation. Please review and reactivate.',
      status: 'closed',
      priority: 'high',
      category: 'account',
      assignedTo: 'Admin Team',
      createdAt: '2024-01-22 16:45',
      updatedAt: '2024-01-25 10:15',
      lastResponse: '2024-01-25 10:15',
      responseTime: '2d 17h 30m',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'My account was suspended yesterday without any explanation. Please review and reactivate.',
          timestamp: '2024-01-22 16:45'
        },
        {
          id: 2,
          sender: 'admin',
          message: 'We have reviewed your account and found it was suspended due to policy violation. However, after further investigation, we have reactivated your account. Please ensure compliance with our terms.',
          timestamp: '2024-01-25 10:15'
        }
      ]
    }
  ]







  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'payment': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20'
      case 'verification': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20'
      case 'financial': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20'
      case 'technical': return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20'
      case 'account': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
    }
  }

  const filteredTickets = ticketsData.filter(ticket => {
    const matchesSearch = ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus
    const matchesPriority = selectedPriority === 'all' || ticket.priority === selectedPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTickets = filteredTickets.slice(startIndex, endIndex)

  // Calculate summary statistics
  const totalTickets = ticketsData.length
  const openTickets = ticketsData.filter(t => t.status === 'open').length
  const inProgressTickets = ticketsData.filter(t => t.status === 'in_progress').length
  const resolvedTickets = ticketsData.filter(t => t.status === 'resolved').length
  const averageResponseTime = '2h 30m'

  // Function handlers
  const handleExport = () => {
    const csvContent = [
      ['Ticket ID', 'Subject', 'User', 'User Type', 'Status', 'Priority', 'Category', 'Assigned To', 'Created At', 'Response Time'],
      ...filteredTickets.map(ticket => [
        ticket.id,
        ticket.subject,
        ticket.user.name,
        ticket.user.type,
        ticket.status,
        ticket.priority,
        ticket.category,
        ticket.assignedTo,
        ticket.createdAt,
        ticket.responseTime
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `support_tickets_export_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleNewTicket = () => {
    // In a real app, this would open a new ticket form or navigate to a create page
    alert('New ticket form would open here')
  }

  const handleViewTicket = (ticketId: string) => {
    // In a real app, this would open a detailed view modal or navigate to a detail page
    alert(`Viewing ticket details for ${ticketId}`)
  }

  const handleReplyTicket = (ticketId: string) => {
    // In a real app, this would open a reply form
    alert(`Reply form would open for ticket ${ticketId}`)
  }

  const handleArchiveTicket = (ticketId: string) => {
    if (confirm('Are you sure you want to archive this ticket?')) {
      // In a real app, this would make an API call
      alert(`Ticket ${ticketId} has been archived`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Support Center</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage customer support tickets and provide assistance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={handleNewTicket}>
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTickets}</div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTickets}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTickets}</div>
            <p className="text-xs text-muted-foreground">Being handled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedTickets}</div>
            <p className="text-xs text-muted-foreground">Avg response: {averageResponseTime}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tickets..."
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
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
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
                <label className="text-sm font-medium">Category</label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm mt-1">
                  <option value="all">All Categories</option>
                  <option value="payment">Payment</option>
                  <option value="verification">Verification</option>
                  <option value="financial">Financial</option>
                  <option value="technical">Technical</option>
                  <option value="account">Account</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">User Type</label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm mt-1">
                  <option value="all">All Types</option>
                  <option value="user">User</option>
                  <option value="escort">Escort</option>
                  <option value="agency">Agency</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Created Date Range</label>
                <div className="flex space-x-2 mt-1">
                  <Input type="date" placeholder="From" className="text-sm" />
                  <Input type="date" placeholder="To" className="text-sm" />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Support Tickets ({filteredTickets.length})</CardTitle>
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredTickets.length)} of {filteredTickets.length}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentTickets.map((ticket) => (
              <div key={ticket.id} className="border rounded-lg p-6 hover:bg-gray-800">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">#{ticket.id}</h3>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status.replace('_', ' ').charAt(0).toUpperCase() + ticket.status.replace('_', ' ').slice(1)}
                      </Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                      </Badge>
                      <Badge className={getCategoryColor(ticket.category)}>
                        {ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1)}
                      </Badge>
                    </div>
                    <h4 className="text-md font-medium mb-2">{ticket.subject}</h4>
                    <p className="text-muted-foreground mb-3">{ticket.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium">User</p>
                        <div className="flex items-center space-x-2">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{ticket.user.name}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Type</p>
                        <span className="text-sm text-muted-foreground capitalize">{ticket.user.type}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Assigned To</p>
                        <span className="text-sm text-muted-foreground">{ticket.assignedTo}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Response Time</p>
                        <span className="text-sm text-muted-foreground">{ticket.responseTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Updated: {new Date(ticket.updatedAt).toLocaleDateString()}</span>
                      </div>
                      {ticket.lastResponse && (
                        <div className="flex items-center space-x-1">
                          <Reply className="h-3 w-3" />
                          <span>Last Response: {new Date(ticket.lastResponse).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewTicket(ticket.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleReplyTicket(ticket.id)}
                    >
                      <Reply className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleArchiveTicket(ticket.id)}
                    >
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </Button>
                  </div>
                </div>
              </div>
            ))}
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
    </div>
  )
}
