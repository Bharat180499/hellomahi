"use client"


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, X, User, Users, Clock, Calendar, DollarSign, CheckCircle, XCircle, Download, Shield, Award, TrendingUp, TrendingDown, Target, Check, BarChart3 } from 'lucide-react'
import AgencyNavigation from '@/components/AgencyNavigation'

export default function AgencyReportsPage() {
  
  const [selectedReport, setSelectedReport] = useState('overview')

  const periods = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 90 days' },
    { value: '365', label: 'Last year' }
  ]

  const reports = [
    { value: 'overview', label: 'Overview', icon: BarChart3 },
  
    { value: 'bookings', label: 'Bookings', icon: Calendar },
    { value: 'escorts', label: 'Escorts', icon: Users },
    { value: 'performance', label: 'Performance', icon: Target }
  ]

  // Mock data - in real app this would come from API
  const overviewData = {
  
    totalBookings: 156,
    activeEscorts: 23,
    averageRating: 4.7,
    completionRate: 94,
    responseRate: 96,
    growth: 12.5,
    topPerformingEscort: 'Priya Sharma',
    topEarningEscort: 'Anjali Patel',
    mostBookedEscort: 'Riya Singh'
  }



  const bookingsData = {
    total: 156,
    completed: 147,
    cancelled: 9,
    pending: 12,
    averageDuration: 2.5,
    mostPopularService: 'Dinner Date',
    peakHours: '8:00 PM - 11:00 PM',
    topCities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad']
  }

  const escortsData = {
    total: 45,
    active: 23,
    inactive: 12,
    pending: 10,
    averageAge: 26,
    averageExperience: 3.2,
    topLanguages: ['English', 'Hindi', 'Marathi', 'Gujarati'],
    averageRating: 4.7,
    verificationRate: 89
  }

  const performanceData = {
    responseTime: 8.5,
    completionRate: 94,
    clientSatisfaction: 4.7,
    repeatBookings: 67,
    averageBookingValue: 15705,
    topPerformingMetrics: [
      { metric: 'Response Rate', value: '96%', trend: 'up' },
      { metric: 'Completion Rate', value: '94%', trend: 'up' },
      { metric: 'Client Rating', value: '4.7/5', trend: 'up' },
      { metric: 'Repeat Bookings', value: '67%', trend: 'up' }
    ]
  }

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">


        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Bookings</p>
                <p className="text-xl sm:text-2xl font-bold">{overviewData.totalBookings}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mr-1" />
                  <span className="text-xs sm:text-sm text-green-600">+8.2%</span>
                </div>
              </div>
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Active Escorts</p>
                <p className="text-xl sm:text-2xl font-bold">{overviewData.activeEscorts}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mr-1" />
                  <span className="text-xs sm:text-sm text-green-600">+2</span>
                </div>
              </div>
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Avg Rating</p>
                <p className="text-xl sm:text-2xl font-bold">{overviewData.averageRating}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current mr-1" />
                  <span className="text-xs sm:text-sm text-muted-foreground">out of 5</span>
                </div>
              </div>
              <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Completion Rate</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${overviewData.completionRate}%` }}></div>
                </div>
                <span className="text-sm font-medium">{overviewData.completionRate}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Response Rate</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${overviewData.responseRate}%` }}></div>
                </div>
                <span className="text-sm font-medium">{overviewData.responseRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Best Rated</p>
                <p className="text-xs text-muted-foreground">{overviewData.topPerformingEscort}</p>
              </div>
              <Award className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Highest Earner</p>
                <p className="text-xs text-muted-foreground">{overviewData.topEarningEscort}</p>
              </div>
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Most Booked</p>
                <p className="text-xs text-muted-foreground">{overviewData.mostBookedEscort}</p>
              </div>
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )



  const renderBookingsReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold">{bookingsData.total}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{bookingsData.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cancelled</p>
                <p className="text-2xl font-bold">{bookingsData.cancelled}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{bookingsData.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Booking Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm">Average Duration</span>
              <span className="font-medium">{bookingsData.averageDuration} hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Most Popular Service</span>
              <span className="font-medium">{bookingsData.mostPopularService}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Peak Hours</span>
              <span className="font-medium">{bookingsData.peakHours}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Cities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {bookingsData.topCities.map((city, index) => (
                <div key={city} className="flex items-center justify-between">
                  <span className="text-sm">{city}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${100 - (index * 15)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground">{100 - (index * 15)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderEscortsReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Escorts</p>
                <p className="text-2xl font-bold">{escortsData.total}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{escortsData.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold">{escortsData.averageRating}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold">{escortsData.verificationRate}%</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Escort Demographics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm">Average Age</span>
              <span className="font-medium">{escortsData.averageAge} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Average Experience</span>
              <span className="font-medium">{escortsData.averageExperience} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Inactive Escorts</span>
              <span className="font-medium">{escortsData.inactive}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Pending Verification</span>
              <span className="font-medium">{escortsData.pending}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {escortsData.topLanguages.map((language, index) => (
                <div key={language} className="flex items-center justify-between">
                  <span className="text-sm">{language}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${100 - (index * 20)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground">{100 - (index * 20)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderPerformanceReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                <p className="text-2xl font-bold">{performanceData.responseTime}m</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">{performanceData.completionRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Client Satisfaction</p>
                <p className="text-2xl font-bold">{performanceData.clientSatisfaction}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Repeat Bookings</p>
                <p className="text-2xl font-bold">{performanceData.repeatBookings}%</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData.topPerformingMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium">{metric.metric}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{metric.value}</span>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <AgencyNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Reports & Analytics</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Comprehensive reports and insights for your agency
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 w-full sm:w-auto">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm text-gray-900 bg-white"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => alert('Exporting reports data...')}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Report Navigation */}
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
              {reports.map(report => {
                const Icon = report.icon
                return (
                  <button
                    key={report.value}
                    onClick={() => setSelectedReport(report.value)}
                    className={`flex flex-col items-center space-y-2 p-3 sm:p-4 rounded-lg transition-colors text-sm ${
                      selectedReport === report.value
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-xs sm:text-sm font-medium">{report.label}</span>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Report Content */}
        {selectedReport === 'overview' && renderOverviewReport()}

        {selectedReport === 'bookings' && renderBookingsReport()}
        {selectedReport === 'escorts' && renderEscortsReport()}
        {selectedReport === 'performance' && renderPerformanceReport()}
      </main>
    </div>
  )
} 
