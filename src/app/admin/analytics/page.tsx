'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Eye, User, Users, MapPin, Calendar, DollarSign, Download, Crown, Activity, TrendingUp, TrendingDown, Building, BarChart3, PieChart, Sun } from 'lucide-react'
import React, { useState } from 'react';

export default function AdminAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedLocation, setSelectedLocation] = useState('all')

  // Mock data for analytics
  const analyticsData = {
    overview: {
      totalUsers: 1250,
      totalEscorts: 450,
      totalAgencies: 25,
      totalBookings: 3200,
      totalRevenue: 48000000,
      averageRating: 4.7,
      userGrowth: 12.5,
      escortGrowth: 8.3,
      bookingGrowth: 15.2,
      revenueGrowth: 18.7
    },
    revenueData: [
      { month: 'Jan', revenue: 3200000, bookings: 280 },
      { month: 'Feb', revenue: 3800000, bookings: 320 },
      { month: 'Mar', revenue: 4200000, bookings: 350 },
      { month: 'Apr', revenue: 4500000, bookings: 380 },
      { month: 'May', revenue: 4800000, bookings: 400 },
      { month: 'Jun', revenue: 5200000, bookings: 420 }
    ],
    topLocations: [
      { city: 'Mumbai', bookings: 850, revenue: 12750000, growth: 15.2 },
      { city: 'Delhi', bookings: 720, revenue: 10800000, growth: 12.8 },
      { city: 'Bangalore', bookings: 580, revenue: 8700000, growth: 18.5 },
      { city: 'Chennai', bookings: 420, revenue: 6300000, growth: 10.3 },
      { city: 'Hyderabad', bookings: 380, revenue: 5700000, growth: 14.7 }
    ],
    topAgencies: [
      { name: 'Elite Escorts Mumbai', bookings: 180, revenue: 2700000, rating: 4.8 },
      { name: 'Premium Escorts Delhi', bookings: 150, revenue: 2250000, rating: 4.7 },
      { name: 'Luxury Escorts Bangalore', bookings: 120, revenue: 1800000, rating: 4.6 },
      { name: 'Royal Escorts Chennai', bookings: 95, revenue: 1425000, rating: 4.5 },
      { name: 'Exclusive Escorts Hyderabad', bookings: 85, revenue: 1275000, rating: 4.4 }
    ],
    userDemographics: {
      ageGroups: [
        { age: '18-25', percentage: 25 },
        { age: '26-35', percentage: 40 },
        { age: '36-45', percentage: 20 },
        { age: '46+', percentage: 15 }
      ],
      genderDistribution: [
        { gender: 'Male', percentage: 75 },
        { gender: 'Female', percentage: 20 },
        { gender: 'Other', percentage: 5 }
      ]
    },
    bookingTrends: {
      hourlyDistribution: [
        { hour: '18:00', bookings: 45 },
        { hour: '19:00', bookings: 52 },
        { hour: '20:00', bookings: 68 },
        { hour: '21:00', bookings: 75 },
        { hour: '22:00', bookings: 58 },
        { hour: '23:00', bookings: 42 }
      ],
      weeklyDistribution: [
        { day: 'Mon', bookings: 85 },
        { day: 'Tue', bookings: 92 },
        { day: 'Wed', bookings: 88 },
        { day: 'Thu', bookings: 95 },
        { day: 'Fri', bookings: 120 },
        { day: 'Sat', bookings: 150 },
        { day: 'Sun', bookings: 110 }
      ]
    }
  }

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600'
  }

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />
  }

  // Function handlers
  const handleExport = () => {
    const csvContent = [
      ['Metric', 'Value', 'Growth %'],
      ['Total Users', analyticsData.overview.totalUsers, analyticsData.overview.userGrowth],
      ['Total Escorts', analyticsData.overview.totalEscorts, analyticsData.overview.escortGrowth],
      ['Total Bookings', analyticsData.overview.totalBookings, analyticsData.overview.bookingGrowth],
      ['Total Revenue', analyticsData.overview.totalRevenue, analyticsData.overview.revenueGrowth],
      ['Average Rating', analyticsData.overview.averageRating, 'N/A']
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics_export_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Comprehensive insights into platform performance and user behavior
          </p>
        </div>
        <div className="flex items-center space-x-2">
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
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            <option value="all">All Locations</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
            <option value="bangalore">Bangalore</option>
            <option value="chennai">Chennai</option>
            <option value="hyderabad">Hyderabad</option>
          </select>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalUsers.toLocaleString()}</div>
            <div className={`flex items-center space-x-1 text-xs ${getGrowthColor(analyticsData.overview.userGrowth)}`}>
              {getGrowthIcon(analyticsData.overview.userGrowth)}
              <span>{Math.abs(analyticsData.overview.userGrowth)}%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Escorts</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalEscorts.toLocaleString()}</div>
            <div className={`flex items-center space-x-1 text-xs ${getGrowthColor(analyticsData.overview.escortGrowth)}`}>
              {getGrowthIcon(analyticsData.overview.escortGrowth)}
              <span>{Math.abs(analyticsData.overview.escortGrowth)}%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalBookings.toLocaleString()}</div>
            <div className={`flex items-center space-x-1 text-xs ${getGrowthColor(analyticsData.overview.bookingGrowth)}`}>
              {getGrowthIcon(analyticsData.overview.bookingGrowth)}
              <span>{Math.abs(analyticsData.overview.bookingGrowth)}%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(analyticsData.overview.totalRevenue / 1000000).toFixed(1)}M</div>
            <div className={`flex items-center space-x-1 text-xs ${getGrowthColor(analyticsData.overview.revenueGrowth)}`}>
              {getGrowthIcon(analyticsData.overview.revenueGrowth)}
              <span>{Math.abs(analyticsData.overview.revenueGrowth)}%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Revenue Trend</span>
            </CardTitle>
            <CardDescription>Monthly revenue and booking trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.revenueData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.month}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">{data.bookings} bookings</span>
                    <span className="text-sm font-medium">₹{(data.revenue / 100000).toFixed(1)}L</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Locations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Top Locations</span>
            </CardTitle>
            <CardDescription>Performance by city</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topLocations.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{location.city}</p>
                      <p className="text-xs text-muted-foreground">{location.bookings} bookings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">₹{(location.revenue / 100000).toFixed(1)}L</p>
                    <div className={`flex items-center space-x-1 text-xs ${getGrowthColor(location.growth)}`}>
                      {getGrowthIcon(location.growth)}
                      <span>{Math.abs(location.growth)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Agencies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Top Performing Agencies</span>
          </CardTitle>
          <CardDescription>Revenue and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Agency</th>
                  <th className="text-left py-3 px-4 font-medium">Bookings</th>
                  <th className="text-left py-3 px-4 font-medium">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium">Rating</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.topAgencies.map((agency, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">{index + 1}</span>
                        </div>
                        <span className="font-medium">{agency.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{agency.bookings}</td>
                    <td className="py-3 px-4">₹{(agency.revenue / 100000).toFixed(1)}L</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{agency.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Demographics and Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Demographics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>User Demographics</span>
            </CardTitle>
            <CardDescription>Age and gender distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Age Groups</h4>
                <div className="space-y-2">
                  {analyticsData.userDemographics.ageGroups.map((group, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{group.age}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${group.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{group.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3">Gender Distribution</h4>
                <div className="space-y-2">
                  {analyticsData.userDemographics.genderDistribution.map((gender, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{gender.gender}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${gender.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{gender.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Booking Trends</span>
            </CardTitle>
            <CardDescription>Hourly and weekly patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Peak Hours</h4>
                <div className="space-y-2">
                  {analyticsData.bookingTrends.hourlyDistribution.map((hour, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{hour.hour}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(hour.bookings / 75) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{hour.bookings}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3">Weekly Pattern</h4>
                <div className="space-y-2">
                  {analyticsData.bookingTrends.weeklyDistribution.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{day.day}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(day.bookings / 150) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{day.bookings}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
