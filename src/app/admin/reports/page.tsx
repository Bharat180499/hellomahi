'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Filter, Eye, X, Clock, DollarSign, CheckCircle, XCircle, AlertCircle, Download, Crown, Activity, ChevronLeft, ChevronRight, FileText, BarChart3, PieChart, Check, Users, User } from 'lucide-react'
import { useState } from 'react'



export default function AdminReportsPage() {
  const [selectedReport, setSelectedReport] = useState('all')
  
  const [currentPage, setCurrentPage] = useState(1)

  // Mock data for reports
  const reportsData = [
    {
      id: 'REP001',
      title: 'Monthly Revenue Report',
      type: 'financial',
      status: 'completed',
      generatedAt: '2024-01-25 10:30',
      period: 'December 2023',
      size: '2.5 MB',
      format: 'PDF',
      description: 'Comprehensive revenue analysis including bookings and platform fees',
      metrics: {
        totalRevenue: 4800000,
        totalBookings: 320,
        averageBookingValue: 15000,
        growth: 15.2
      }
    },
    {
      id: 'REP002',
      title: 'User Activity Report',
      type: 'analytics',
      status: 'completed',
      generatedAt: '2024-01-24 14:15',
      period: 'Last 30 days',
      size: '1.8 MB',
      format: 'Excel',
      description: 'User engagement metrics, demographics, and behavior patterns',
      metrics: {
        activeUsers: 1250,
        newRegistrations: 180,
        averageSessionTime: '25 minutes',
        growth: 8.5
      }
    },
    {
      id: 'REP003',
      title: 'Escort Performance Report',
      type: 'performance',
      status: 'processing',
      generatedAt: '2024-01-26 09:45',
      period: 'January 2024',
      size: '3.2 MB',
      format: 'PDF',
      description: 'Escort ratings, bookings, earnings, and performance metrics',
      metrics: {
        totalEscorts: 450,
        averageRating: 4.7,
        totalBookings: 2800,
        growth: 12.3
      }
    },
    {
      id: 'REP004',
      title: 'Agency Performance Report',
      type: 'financial',
      status: 'completed',
      generatedAt: '2024-01-23 16:20',
      period: 'Q4 2023',
      size: '1.5 MB',
      format: 'Excel',
      description: 'Agency performance and payout summaries',
      metrics: {
        totalRevenue: 720000,
        agencies: 25,
        averageRevenue: 28800,
        growth: 18.7
      }
    },
    {
      id: 'REP005',
      title: 'Platform Analytics Report',
      type: 'analytics',
      status: 'failed',
      generatedAt: '2024-01-22 11:30',
      period: 'Last 7 days',
      size: '0 MB',
      format: 'PDF',
      description: 'Platform usage statistics and technical performance metrics',
      metrics: {
        pageViews: 45000,
        uniqueVisitors: 8500,
        conversionRate: 3.2,
        growth: -2.1
      }
    }
  ]



  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      case 'processing': return <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      case 'failed': return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
      case 'pending': return <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      default: return <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'financial': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20'
      case 'analytics': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20'
      case 'performance': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20'
      case 'compliance': return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
    }
  }

  const filteredReports = reportsData.filter(report => {
    return selectedReport === 'all' || report.type === selectedReport
  })

  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentReports = filteredReports.slice(startIndex, endIndex)

  // Function handlers
  const handleFilter = () => {
    // In a real app, this would open a filter modal
    alert('Filter modal would open here')
  }

  const handleGenerateReport = () => {
    // In a real app, this would open a report generation form
    alert('Report generation form would open here')
  }

  const handleDownloadReport = (reportId: string) => {
    // In a real app, this would trigger a download
    alert(`Downloading report ${reportId}`)
  }

  const handleViewReport = (reportId: string) => {
    // In a real app, this would open a preview modal
    alert(`Viewing report ${reportId}`)
  }

  const handleViewDetails = (reportId: string) => {
    // In a real app, this would open a detailed view
    alert(`Viewing details for report ${reportId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Reports Center</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Generate, manage, and download comprehensive platform reports
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleFilter}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" onClick={handleGenerateReport}>
            <Plus className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportsData.length}</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportsData.filter(r => r.status === 'completed').length}</div>
            <p className="text-xs text-muted-foreground">80% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportsData.filter(r => r.status === 'processing').length}</div>
            <p className="text-xs text-muted-foreground">Currently generating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportsData.filter(r => r.status === 'failed').length}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Types Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Report Types</span>
            </CardTitle>
            <CardDescription>Available report categories and their usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Financial Reports</p>
                    <p className="text-sm text-muted-foreground">Revenue, payments</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">2 reports</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Activity className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Analytics Reports</p>
                    <p className="text-sm text-muted-foreground">User behavior, platform metrics</p>
                  </div>
                </div>
                <Badge className="bg-purple-100 text-purple-800">2 reports</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Crown className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Performance Reports</p>
                    <p className="text-sm text-muted-foreground">Escort and agency performance</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">1 report</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest report generation activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportsData.slice(0, 3).map((report) => (
                <div key={report.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(report.status)}
                    <div>
                      <p className="text-sm font-medium">{report.title}</p>
                      <p className="text-xs text-muted-foreground">{report.generatedAt}</p>
                    </div>
                  </div>
                  <Badge className={getTypeColor(report.type)}>
                    {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="all">All Report Types</option>
              <option value="financial">Financial</option>
              <option value="analytics">Analytics</option>
              <option value="performance">Performance</option>
              <option value="compliance">Compliance</option>
            </select>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Generated Reports ({filteredReports.length})</CardTitle>
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredReports.length)} of {filteredReports.length}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentReports.map((report) => (
                              <div key={report.id} className="border rounded-lg p-6 hover:bg-gray-800">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{report.title}</h3>
                      <Badge className={getTypeColor(report.type)}>
                        {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(report.status)}
                        <Badge className={getStatusColor(report.status)}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-3">{report.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium">Period</p>
                        <p className="text-sm text-muted-foreground">{report.period}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Generated</p>
                        <p className="text-sm text-muted-foreground">{report.generatedAt}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Size</p>
                        <p className="text-sm text-muted-foreground">{report.size}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Format</p>
                        <p className="text-sm text-muted-foreground">{report.format}</p>
                      </div>
                    </div>
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(report.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-2 bg-gray-50 rounded">
                          <p className="text-xs text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <p className="text-sm font-semibold">
                            {typeof value === 'number' && key.includes('Revenue') 
                              ? `₹${(value / 100000).toFixed(1)}L`
                              : typeof value === 'number' && key.includes('Rate')
                              ? `${value}%`
                              : typeof value === 'number' && key.includes('Time')
                              ? `${value} min`
                              : typeof value === 'number'
                              ? value.toLocaleString()
                              : value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    {report.status === 'completed' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadReport(report.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewReport(report.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewDetails(report.id)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Details
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
