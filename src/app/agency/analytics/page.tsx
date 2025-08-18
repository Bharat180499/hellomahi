"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Eye, User, Users, MapPin, Clock, Calendar, MessageCircle, Download, Award, Activity, TrendingUp, ArrowUp, ArrowDown, Target, BarChart3, PieChart, Minus } from 'lucide-react'
import { useState } from 'react'
import AgencyNavigation from '@/components/AgencyNavigation'

interface AnalyticsData {
  period: string
  bookings: number
  views: number
  messages: number
  rating: number
  conversionRate: number
  averageResponseTime: number
}

interface EscortAnalytics {
  id: string
  name: string
  image: string
  bookings: number
  rating: number
  responseRate: number
  completionRate: number
  views: number
  messages: number
  growth: number
}

export default function AgencyAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [selectedMetric, setSelectedMetric] = useState<'bookings' | 'views' | 'rating'>('bookings')

  const analyticsData: AnalyticsData[] = [
    { period: 'Jan 1', bookings: 12, views: 450, messages: 25, rating: 4.8, conversionRate: 2.7, averageResponseTime: 15 },
    { period: 'Jan 2', bookings: 15, views: 520, messages: 30, rating: 4.9, conversionRate: 2.9, averageResponseTime: 12 },
    { period: 'Jan 3', bookings: 8, views: 380, messages: 18, rating: 4.7, conversionRate: 2.1, averageResponseTime: 18 },
    { period: 'Jan 4', bookings: 20, views: 600, messages: 35, rating: 4.8, conversionRate: 3.3, averageResponseTime: 10 },
    { period: 'Jan 5', bookings: 18, views: 550, messages: 32, rating: 4.9, conversionRate: 3.3, averageResponseTime: 14 },
    { period: 'Jan 6', bookings: 22, views: 650, messages: 40, rating: 4.8, conversionRate: 3.4, averageResponseTime: 11 },
    { period: 'Jan 7', bookings: 25, views: 700, messages: 45, rating: 4.9, conversionRate: 3.6, averageResponseTime: 9 }
  ]

  const escortAnalytics: EscortAnalytics[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      bookings: 45,
      rating: 4.8,
      responseRate: 95,
      completionRate: 98,
      views: 1250,
      messages: 89,
      growth: 15.3
    },
    {
      id: '2',
      name: 'Zara Khan',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      bookings: 32,
      rating: 4.7,
      responseRate: 92,
      completionRate: 96,
      views: 980,
      messages: 67,
      growth: 8.7
    },
    {
      id: '3',
      name: 'Sofia Rodriguez',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      bookings: 28,
      rating: 4.6,
      responseRate: 88,
      completionRate: 94,
      views: 850,
      messages: 54,
      growth: 12.4
    },
    {
      id: '4',
      name: 'Aisha Patel',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      bookings: 25,
      rating: 4.5,
      responseRate: 85,
      completionRate: 92,
      views: 720,
      messages: 43,
      growth: 6.2
    }
  ]

  const topCities = [
    { city: 'Mumbai', bookings: 45, growth: 12.5 },
    { city: 'Delhi', bookings: 38, growth: 8.3 },
    { city: 'Bangalore', bookings: 32, growth: 15.7 },
    { city: 'Hyderabad', bookings: 28, growth: 6.2 },
    { city: 'Chennai', bookings: 25, growth: 9.1 }
  ]

  const serviceBreakdown = [
    { service: 'Companionship', bookings: 65, percentage: 54.2 },
    { service: 'Dinner Date', bookings: 25, percentage: 20.8 },
    { service: 'Massage', bookings: 15, percentage: 12.5 },
    { service: 'Travel', bookings: 10, percentage: 8.3 },
    { service: 'VIP Service', bookings: 5, percentage: 4.2 }
  ]

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <ArrowUp className="h-4 w-4 text-green-600" />
    if (growth < 0) return <ArrowDown className="h-4 w-4 text-red-600" />
    return <Minus className="h-4 w-4 text-gray-600" />
  }

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600'
    if (growth < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const totalBookings = analyticsData.reduce((sum, data) => sum + data.bookings, 0)
  const totalViews = analyticsData.reduce((sum, data) => sum + data.views, 0)
  const averageRating = analyticsData.reduce((sum, data) => sum + data.rating, 0) / analyticsData.length

  return (
    <div className="min-h-screen bg-background">
      <AgencyNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive insights into your agency's performance
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <Button variant="outline" onClick={() => alert('Exporting analytics report...')}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{totalBookings}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {getGrowthIcon(15.3)}
                    <span className={`text-sm font-medium ${getGrowthColor(15.3)}`}>
                      +15.3%
                    </span>
                    <span className="text-sm text-muted-foreground">vs last period</span>
                  </div>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>



          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
                  <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {getGrowthIcon(8.9)}
                    <span className={`text-sm font-medium ${getGrowthColor(8.9)}`}>
                      +8.9%
                    </span>
                    <span className="text-sm text-muted-foreground">vs last period</span>
                  </div>
                </div>
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {getGrowthIcon(0.2)}
                    <span className={`text-sm font-medium ${getGrowthColor(0.2)}`}>
                      +0.2
                    </span>
                    <span className="text-sm text-muted-foreground">vs last period</span>
                  </div>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Performance Overview
                </CardTitle>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value as any)}
                  className="px-3 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
                >
                  <option value="bookings">Bookings</option>
                  <option value="views">Views</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {analyticsData.map((data, index) => {
                  const value = data[selectedMetric as keyof AnalyticsData] as number
                  const maxValue = Math.max(...analyticsData.map(d => d[selectedMetric as keyof AnalyticsData] as number))
                  const height = (value / maxValue) * 100
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-primary rounded-t transition-all duration-300 hover:bg-primary/80"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-muted-foreground mt-2">
                        {data.period}
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Service Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Service Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceBreakdown.map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                        }}
                      />
                      <span className="text-sm font-medium">{service.service}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {service.bookings} bookings
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {service.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performing Escorts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Top Performing Escorts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {escortAnalytics.map((escort, index) => (
                  <div key={escort.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{escort.name}</h4>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{escort.bookings} bookings</span>
                          <span>•</span>
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span>{escort.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right mr-4">
                        <div className="font-medium text-sm">{escort.bookings} bookings</div>
                        <div className={`text-xs ${getGrowthColor(escort.growth)}`}>
                          {escort.growth > 0 ? '+' : ''}{escort.growth}%
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm" onClick={() => window.open(`/escorts/${escort.id}`, '_blank')}>
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => alert(`Opening chat with ${escort.name}`)}>
                          <MessageCircle className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => window.open(`/agency/bookings?escort=${escort.id}`, '_blank')}>
                          <Calendar className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => window.open(`/agency/escorts/${escort.id}/edit`, '_blank')}>
                          <User className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Cities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Top Performing Cities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCities.map((city, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{city.city}</h4>
                        <div className="text-xs text-muted-foreground">
                          {city.bookings} bookings
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">{city.bookings} bookings</div>
                      <div className={`text-xs ${getGrowthColor(city.growth)}`}>
                        {city.growth > 0 ? '+' : ''}{city.growth}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                  Conversion Rate
                </h4>
                <p className="text-2xl font-bold text-blue-600">3.1%</p>
                <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                  Profile views to bookings
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-green-800 dark:text-green-200">
                  Response Time
                </h4>
                <p className="text-2xl font-bold text-green-600">12 min</p>
                <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                  Average response time
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-purple-800 dark:text-purple-200">
                  Completion Rate
                </h4>
                <p className="text-2xl font-bold text-purple-600">96%</p>
                <p className="text-sm text-purple-600 dark:text-purple-300 mt-1">
                  Bookings completed successfully
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-green-800 dark:text-green-200">
                  Growing Revenue
                </h4>
                <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                  Your revenue has increased by 12.7% this period
                </p>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                  High Performance
                </h4>
                <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                  Priya Sharma leads with 45 bookings and ₹6.75L revenue
                </p>
              </div>
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                  Quality Service
                </h4>
                <p className="text-sm text-yellow-600 dark:text-yellow-300 mt-1">
                  Maintained 4.8+ rating consistently across all escorts
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 
