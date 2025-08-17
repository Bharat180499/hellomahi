'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { getStatusColor } from '@/lib/admin-utils'
import { 
  DollarSign, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CreditCard,
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  Building,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from 'lucide-react'

export default function AdminPaymentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Mock data for payments
  const paymentsData = [
    {
      id: 'PAY001',
      bookingId: 'BK001',
      user: 'Rahul Verma',
      escort: 'Priya Sharma',
      agency: 'Elite Escorts Mumbai',
      amount: 15000,
      platformFee: 750,
      type: 'booking',
      status: 'completed',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN123456789',
      date: '2024-01-25 18:30',
      processedAt: '2024-01-25 18:35'
    },
    {
      id: 'PAY002',
      bookingId: 'BK002',
      user: 'Amit Patel',
      escort: 'Zara Khan',
      agency: 'Premium Escorts Delhi',
      amount: 25000,
      platformFee: 1250,
      type: 'booking',
      status: 'completed',
      paymentMethod: 'UPI',
      transactionId: 'TXN123456790',
      date: '2024-01-24 22:30',
      processedAt: '2024-01-24 22:32'
    },
    {
      id: 'PAY003',
      bookingId: 'BK003',
      user: 'Vikram Singh',
      escort: 'Sofia Rodriguez',
      agency: 'Luxury Escorts Bangalore',
      amount: 8000,
      platformFee: 400,
      type: 'booking',
      status: 'pending',
      paymentMethod: 'Net Banking',
      transactionId: 'TXN123456791',
      date: '2024-01-26 21:00',
      processedAt: null
    },
    {
      id: 'PAY004',
      bookingId: 'BK004',
      user: 'Rajesh Kumar',
      escort: 'Aisha Patel',
      agency: 'Elite Escorts Mumbai',
      amount: 30000,
      platformFee: 1500,
      type: 'refund',
      status: 'completed',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN123456792',
      date: '2024-01-23 17:00',
      processedAt: '2024-01-23 17:05'
    },
    {
      id: 'PAY005',
      bookingId: 'BK005',
      user: 'Suresh Reddy',
      escort: 'Meera Nair',
      agency: 'Exclusive Escorts Hyderabad',
      amount: 12000,
      platformFee: 600,
      type: 'booking',
      status: 'failed',
      paymentMethod: 'Debit Card',
      transactionId: 'TXN123456793',
      date: '2024-01-27 20:30',
      processedAt: null
    }
  ]



  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      case 'failed': return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
      case 'refunded': return <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      default: return <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'booking': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20'
      case 'refund': return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
    }
  }

  const filteredPayments = paymentsData.filter(payment => {
    const matchesSearch = payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.escort.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus
    const matchesType = selectedType === 'all' || payment.type === selectedType
    return matchesSearch && matchesStatus && matchesType
  })

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPayments = filteredPayments.slice(startIndex, endIndex)

  // Function handlers
  const handleExport = () => {
    const csvContent = [
      ['Payment ID', 'Booking ID', 'User', 'Escort', 'Agency', 'Amount', 'Platform Fee', 'Type', 'Status', 'Payment Method', 'Transaction ID', 'Date'],
      ...filteredPayments.map(payment => [
        payment.id,
        payment.bookingId,
        payment.user,
        payment.escort,
        payment.agency,
        payment.amount,
        payment.platformFee,
        payment.type,
        payment.status,
        payment.paymentMethod,
        payment.transactionId,
        payment.date
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `payments_export_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleAdvancedFilter = () => {
    // In a real app, this would open an advanced filter modal
    alert('Advanced filter modal would open here')
  }

  const handleViewPayment = (paymentId: string) => {
    // In a real app, this would open a detailed view modal or navigate to a detail page
    alert(`Viewing payment details for ${paymentId}`)
  }

  const handleMoreActions = (paymentId: string) => {
    // In a real app, this would open a dropdown menu with more options
    alert(`More actions menu for payment ${paymentId}`)
  }

  // Calculate summary statistics
  const totalRevenue = paymentsData.filter(p => p.status === 'completed' && p.type === 'booking').reduce((sum, p) => sum + p.amount, 0)
  const totalPlatformFees = paymentsData.filter(p => p.status === 'completed' && p.type === 'booking').reduce((sum, p) => sum + p.platformFee, 0)
  const pendingAmount = paymentsData.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Payments Management</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Monitor and manage all payment transactions and financial operations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={handleAdvancedFilter}>
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filter
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalRevenue / 100000).toFixed(1)}L</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>



        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Fees</CardTitle>
            <CreditCard className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalPlatformFees / 100000).toFixed(1)}L</div>
            <p className="text-xs text-muted-foreground">5% processing fee</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(pendingAmount / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
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
                placeholder="Search payments..."
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
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="all">All Types</option>
              <option value="booking">Booking</option>
              <option value="refund">Refund</option>
            </select>
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment Transactions ({filteredPayments.length})</CardTitle>
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredPayments.length)} of {filteredPayments.length}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Payment ID</th>
                  <th className="text-left py-3 px-4 font-medium">Booking</th>
                  <th className="text-left py-3 px-4 font-medium">User</th>
                  <th className="text-left py-3 px-4 font-medium">Escort</th>
                  <th className="text-left py-3 px-4 font-medium">Agency</th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Method</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-800">
                    <td className="py-3 px-4">
                      <div className="font-medium">{payment.id}</div>
                      <div className="text-sm text-muted-foreground">{payment.transactionId}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{payment.bookingId}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{payment.user}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{payment.escort}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">{payment.agency}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">₹{payment.amount.toLocaleString()}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getTypeColor(payment.type)}>
                        {payment.type.charAt(0).toUpperCase() + payment.type.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(payment.status)}
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <CreditCard className="h-3 w-3" />
                        <span className="text-sm">{payment.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">{new Date(payment.date).toLocaleDateString()}</div>
                      <div className="text-xs text-muted-foreground">{new Date(payment.date).toLocaleTimeString()}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewPayment(payment.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleMoreActions(payment.id)}
                        >
                          <MoreVertical className="h-4 w-4" />
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
    </div>
  )
}
