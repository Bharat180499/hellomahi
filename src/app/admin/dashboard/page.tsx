"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ThemeToggle from '@/components/ThemeToggle'
import { getStatusColor, getVerificationStatusColor, getTypeColor, getIconColor } from '@/lib/admin-utils'
import { 
  Users, 
  Crown, 
  Building, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Eye,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Shield,
  BarChart3,
  Activity,
  ArrowRight,
  MoreVertical,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  User,
  Star,
  FileText,
  HelpCircle
} from 'lucide-react'

export default function AdminDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d')

  const adminStats = {
    totalUsers: 2847,
    totalEscorts: 1234,
    totalAgencies: 89,
    totalRevenue: 45200000,
    pendingVerifications: 23,
    openSupportTickets: 15,
    systemAlerts: 3,
    newReports: 8
  }

  const recentBookings = [
    {
      id: '1',
      escortName: 'Priya Sharma',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      clientName: 'Rahul Verma',
      date: '2024-01-25',
      time: '8:00 PM',
      status: 'confirmed'
    },
    {
      id: '2',
      escortName: 'Zara Khan',
      escortImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      clientName: 'Amit Patel',
      date: '2024-01-24',
      time: '9:00 PM',
      status: 'completed'
    },
    {
      id: '3',
      escortName: 'Sofia Rodriguez',
      escortImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      clientName: 'Vikram Singh',
      date: '2024-01-23',
      time: '7:00 PM',
      status: 'pending'
    },
    {
      id: '4',
      escortName: 'Aisha Patel',
      escortImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      clientName: 'Rajesh Kumar',
      date: '2024-01-22',
      time: '10:00 PM',
      status: 'confirmed'
    },
    {
      id: '5',
      escortName: 'Meera Nair',
      escortImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
      clientName: 'Suresh Reddy',
      date: '2024-01-21',
      time: '6:00 PM',
      status: 'completed'
    }
  ]

  const recentRegistrations = [
    {
      id: '1',
      type: 'escort',
      name: 'Diya Sharma',
      location: 'Mumbai',
      verificationStatus: 'pending',
      date: '2024-01-25'
    },
    {
      id: '2',
      type: 'user',
      name: 'Arjun Singh',
      location: 'Delhi',
      verificationStatus: 'verified',
      date: '2024-01-24'
    },
    {
      id: '3',
      type: 'agency',
      name: 'Premium Escorts Delhi',
      location: 'Delhi',
      verificationStatus: 'pending',
      date: '2024-01-23'
    },
    {
      id: '4',
      type: 'escort',
      name: 'Kavya Reddy',
      location: 'Bangalore',
      verificationStatus: 'verified',
      date: '2024-01-22'
    },
    {
      id: '5',
      type: 'user',
      name: 'Priyanka Gupta',
      location: 'Chennai',
      verificationStatus: 'pending',
      date: '2024-01-21'
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'user': return User
      case 'escort': return Crown
      case 'agency': return Building
      default: return User
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Welcome back, Admin
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 w-full sm:w-auto">
          <ThemeToggle variant="outline" size="sm" />
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-background text-foreground"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/admin/settings">
              <Settings className="h-4 w-4 mr-2" />
              System Settings
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +12% this month
                </p>
              </div>
              <Users className={`h-8 w-8 ${getIconColor('user')}`} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Escorts</p>
                <p className="text-2xl font-bold">{adminStats.totalEscorts.toLocaleString()}</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +8% this month
                </p>
              </div>
              <Crown className={`h-8 w-8 ${getIconColor('escort')}`} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Agencies</p>
                <p className="text-2xl font-bold">{adminStats.totalAgencies}</p>
                <p className="text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +3 this month
                </p>
              </div>
              <Building className={`h-8 w-8 ${getIconColor('agency')}`} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₹{(adminStats.totalRevenue / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +15% this month
                </p>
              </div>
              <DollarSign className={`h-8 w-8 ${getIconColor('revenue')}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 mb-8">
        {/* Left Column - Recent Activity */}
        <div className="xl:col-span-2 space-y-6">
          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Recent Bookings
                </CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/bookings">
                    View All
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={booking.escortImage}
                        alt={booking.escortName}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <h4 className="font-medium text-sm">{booking.escortName}</h4>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span>{booking.clientName}</span>
                          <Calendar className="h-3 w-3" />
                          <span>{booking.date}</span>
                          <Clock className="h-3 w-3" />
                          <span>{booking.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Registrations */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Recent Registrations
                </CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/moderation">
                    View All
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRegistrations.map((registration) => {
                  const Icon = getTypeIcon(registration.type)
                  return (
                    <div key={registration.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${getTypeColor(registration.type)}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{registration.name}</h4>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{registration.location}</span>
                            <span>•</span>
                            <span className="capitalize">{registration.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">{registration.date}</div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getVerificationStatusColor(registration.verificationStatus)}`}>
                          {registration.verificationStatus}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quick Stats */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className={`h-5 w-5 ${getIconColor('warning')}`} />
                  <div>
                    <p className="font-medium text-sm">Verification Queue</p>
                    <p className="text-xs text-muted-foreground">Pending reviews</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{adminStats.pendingVerifications}</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <HelpCircle className={`h-5 w-5 ${getIconColor('info')}`} />
                  <div>
                    <p className="font-medium text-sm">Support Tickets</p>
                    <p className="text-xs text-muted-foreground">Open tickets</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{adminStats.openSupportTickets}</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertCircle className={`h-5 w-5 ${getIconColor('error')}`} />
                  <div>
                    <p className="font-medium text-sm">System Alerts</p>
                    <p className="text-xs text-muted-foreground">Critical issues</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-red-600 dark:text-red-400">{adminStats.systemAlerts}</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className={`h-5 w-5 ${getIconColor('escort')}`} />
                  <div>
                    <p className="font-medium text-sm">Recent Reports</p>
                    <p className="text-xs text-muted-foreground">New reports</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{adminStats.newReports}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/users">
                  <Users className="h-4 w-4 mr-2" />
                  User Management
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/moderation">
                  <Shield className="h-4 w-4 mr-2" />
                  Escort Verification
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/agencies">
                  <Building className="h-4 w-4 mr-2" />
                  Agency Oversight
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/analytics">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  System Analytics
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section - Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className={`h-6 w-6 ${getIconColor('user')}`} />
            </div>
            <h3 className="font-semibold mb-2">User Management</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Manage all platform users
            </p>
            <Button asChild className="w-full">
              <Link href="/admin/users">
                Browse Users
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className={`h-6 w-6 ${getIconColor('escort')}`} />
            </div>
            <h3 className="font-semibold mb-2">Escort Verification</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Review and verify profiles
            </p>
            <Button asChild className="w-full">
              <Link href="/admin/moderation">
                Review Profiles
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className={`h-6 w-6 ${getIconColor('agency')}`} />
            </div>
            <h3 className="font-semibold mb-2">Agency Oversight</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Monitor agency activities
            </p>
            <Button asChild className="w-full">
              <Link href="/admin/agencies">
                Monitor Agencies
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className={`h-6 w-6 ${getIconColor('analytics')}`} />
            </div>
            <h3 className="font-semibold mb-2">System Analytics</h3>
            <p className="text-sm text-muted-foreground mb-4">
              View detailed reports
            </p>
            <Button asChild className="w-full">
              <Link href="/admin/analytics">
                View Reports
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
