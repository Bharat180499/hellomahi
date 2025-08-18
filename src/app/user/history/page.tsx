"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Star, Heart, Eye, User, Calendar, DollarSign, MessageCircle, Download, Activity, TrendingUp, ArrowRight, MoreVertical, RefreshCw } from 'lucide-react'
import Link from 'next/link'

import Image from 'next/image'

import UserNavigation from '@/components/UserNavigation'

interface HistoryItem {
  id: string
  type: 'booking' | 'review' | 'favorite' | 'message' | 'payment' | 'profile_view'
  escortName?: string
  escortImage?: string
  escortSlug?: string
  date: string
  time: string
  description: string
  amount?: number
  status?: string
  rating?: number
  location?: string
  service?: string
}

interface ActivityStats {
  totalBookings: number
  totalSpent: number
  averageRating: number
  favoriteEscorts: number
  totalReviews: number
  activeMonths: number
}

export default function UserHistoryPage() {
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y' | 'all'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'timeline' | 'list'>('timeline')

  const historyItems: HistoryItem[] = [
    {
      id: '1',
      type: 'booking',
      escortName: 'Priya Sharma',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      escortSlug: 'priya-sharma',
      date: '2024-01-25',
      time: '8:00 PM',
      description: 'Booked Dinner Date service',
      amount: 30000,
      status: 'completed',
      location: 'Mumbai',
      service: 'Dinner Date'
    },
    {
      id: '2',
      type: 'review',
      escortName: 'Priya Sharma',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      escortSlug: 'priya-sharma',
      date: '2024-01-26',
      time: '10:30 AM',
      description: 'Left a 5-star review',
      rating: 5
    },
    {
      id: '3',
      type: 'booking',
      escortName: 'Zara Khan',
      escortImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      escortSlug: 'zara-khan',
      date: '2024-01-24',
      time: '9:00 PM',
      description: 'Booked Overnight service',
      amount: 45000,
      status: 'completed',
      location: 'Delhi',
      service: 'Overnight'
    },
    {
      id: '4',
      type: 'favorite',
      escortName: 'Sofia Rodriguez',
      escortImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      escortSlug: 'sofia-rodriguez',
      date: '2024-01-23',
      time: '3:15 PM',
      description: 'Added to favorites'
    },
    {
      id: '5',
      type: 'message',
      escortName: 'Aisha Patel',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      escortSlug: 'aisha-patel',
      date: '2024-01-22',
      time: '7:45 PM',
      description: 'Sent a message'
    },
    {
      id: '6',
      type: 'payment',
      escortName: 'Meera Nair',
      escortImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      escortSlug: 'meera-nair',
      date: '2024-01-20',
      time: '6:30 PM',
      description: 'Payment completed',
      amount: 25000,
      status: 'completed'
    },
    {
      id: '7',
      type: 'profile_view',
      escortName: 'Riya Patel',
      escortImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      escortSlug: 'riya-patel',
      date: '2024-01-19',
      time: '2:20 PM',
      description: 'Viewed profile'
    },
    {
      id: '8',
      type: 'booking',
      escortName: 'Aisha Patel',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      escortSlug: 'aisha-patel',
      date: '2024-01-18',
      time: '10:00 PM',
      description: 'Booked Massage service',
      amount: 25000,
      status: 'cancelled',
      location: 'Chennai',
      service: 'Massage'
    }
  ]

  const stats: ActivityStats = {
    totalBookings: historyItems.filter(item => item.type === 'booking').length,
    totalSpent: historyItems.filter(item => item.type === 'booking' && item.amount).reduce((sum, item) => sum + (item.amount || 0), 0),
    averageRating: 4.6,
    favoriteEscorts: historyItems.filter(item => item.type === 'favorite').length,
    totalReviews: historyItems.filter(item => item.type === 'review').length,
    activeMonths: 3
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'booking': return Calendar
      case 'review': return Star
      case 'favorite': return Heart
      case 'message': return MessageCircle
      case 'payment': return DollarSign
      case 'profile_view': return Eye
      default: return Activity
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'booking': return 'text-blue-600 bg-blue-100'
      case 'review': return 'text-yellow-600 bg-yellow-100'
      case 'favorite': return 'text-red-600 bg-red-100'
      case 'message': return 'text-green-600 bg-green-100'
      case 'payment': return 'text-purple-600 bg-purple-100'
      case 'profile_view': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const filteredItems = historyItems.filter(item => {
    const matchesType = selectedType === 'all' || item.type === selectedType
    const matchesSearch = item.escortName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesType && matchesSearch
  })

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      <UserNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Activity History</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              View your complete activity and booking history
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => alert('Exporting history data...')}>
              <Download className="h-4 w-4 mr-2" />
              Export History
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-lg font-bold">{stats.totalBookings}</p>
              <p className="text-xs text-muted-foreground">Total Bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-lg font-bold">₹{(stats.totalSpent / 1000).toFixed(0)}K</p>
              <p className="text-xs text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-lg font-bold">{stats.averageRating}</p>
              <p className="text-xs text-muted-foreground">Avg Rating</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="text-lg font-bold">{stats.favoriteEscorts}</p>
              <p className="text-xs text-muted-foreground">Favorites</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <MessageCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-lg font-bold">{stats.totalReviews}</p>
              <p className="text-xs text-muted-foreground">Reviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-lg font-bold">{stats.activeMonths}</p>
              <p className="text-xs text-muted-foreground">Active Months</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search history..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
              >
                <option value="all">All Activities</option>
                <option value="booking">Bookings</option>
                <option value="review">Reviews</option>
                <option value="favorite">Favorites</option>
                <option value="message">Messages</option>
                <option value="payment">Payments</option>
                <option value="profile_view">Profile Views</option>
              </select>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
              >
                <option value="all">All Time</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <div className="flex border rounded-lg">
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'timeline'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* History Content */}
        {viewMode === 'timeline' ? (
          <div className="space-y-6">
            {filteredItems.map((item, index) => {
              const Icon = getTypeIcon(item.type)
              return (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Timeline Icon */}
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(item.type)}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        {index < filteredItems.length - 1 && (
                          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gray-200"></div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{item.description}</h3>
                            {item.escortName && (
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <span>with</span>
                                <Link 
                                  href={`/escorts/${item.escortSlug}`}
                                  className="text-primary hover:underline font-medium"
                                >
                                  {item.escortName}
                                </Link>
                                {item.location && (
                                  <>
                                    <span>•</span>
                                    <span>{item.location}</span>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">{item.date}</div>
                            <div className="text-xs text-muted-foreground">{item.time}</div>
                          </div>
                        </div>

                        {/* Additional Details */}
                        <div className="flex items-center space-x-4 text-sm">
                          {item.amount && (
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span className="font-medium">₹{item.amount.toLocaleString()}</span>
                            </div>
                          )}
                          {item.rating && (
                            <div className="flex items-center space-x-1">
                              {renderStars(item.rating)}
                              <span>({item.rating}/5)</span>
                            </div>
                          )}
                          {item.status && (
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        {item.escortSlug && (
                          <div className="flex items-center space-x-2 mt-3">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/escorts/${item.escortSlug}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                            <Button variant="outline" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => {
              const Icon = getTypeIcon(item.type)
              return (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getTypeColor(item.type)}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">{item.description}</h4>
                          {item.escortName && (
                            <p className="text-sm text-muted-foreground">
                              with {item.escortName} • {item.date} at {item.time}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.amount && (
                          <span className="font-medium">₹{item.amount.toLocaleString()}</span>
                        )}
                        {item.rating && (
                          <div className="flex items-center space-x-1">
                            {renderStars(item.rating)}
                          </div>
                        )}
                        <Button variant="ghost" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Activity className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No activity found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedType !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start by booking your first escort'
                }
              </p>
              <Button asChild>
                <Link href="/escorts">
                  Browse Escorts
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
} 