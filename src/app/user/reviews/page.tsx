"use client"


import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, RefreshCw, Search, Filter, Eye, Star, Clock, CheckCircle, XCircle, AlertCircle, MessageCircle, Plus, X, MoreVertical, Edit, Trash2, User } from 'lucide-react'
import UserNavigation from '@/components/UserNavigation'

interface Review {
  id: string
  escortId: string
  escortName: string
  escortImage: string
  escortSlug: string
  rating: number
  title: string
  review: string
  date: string
  status: 'published' | 'pending' | 'rejected'
  helpfulCount: number
  response?: string
  responseDate?: string
  bookingId: string
  service: string
  amount: number
}

export default function UserReviewsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedRating, setSelectedRating] = useState<string>('all')
  const [showWriteReview, setShowWriteReview] = useState(false)

  const reviews: Review[] = [
    {
      id: '1',
      escortId: 'priya-sharma',
      escortName: 'Priya Sharma',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      escortSlug: 'priya-sharma',
      rating: 5,
      title: 'Exceptional Experience',
      review: 'Priya was absolutely amazing! She was professional, punctual, and made the evening truly special. Her personality is wonderful and she has great conversation skills. Highly recommend!',
      date: '2024-01-25',
      status: 'published',
      helpfulCount: 12,
      response: 'Thank you so much for your kind words, Rahul! It was a pleasure meeting you. Looking forward to our next meeting.',
      responseDate: '2024-01-26',
      bookingId: 'BK001',
      service: 'Dinner Date',
      amount: 30000
    },
    {
      id: '2',
      escortId: 'zara-khan',
      escortName: 'Zara Khan',
      escortImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      escortSlug: 'zara-khan',
      rating: 4,
      title: 'Great Company',
      review: 'Zara was very professional and friendly. The evening was enjoyable and she was easy to talk to. Would definitely recommend.',
      date: '2024-01-24',
      status: 'published',
      helpfulCount: 8,
      bookingId: 'BK002',
      service: 'Overnight',
      amount: 45000
    },
    {
      id: '3',
      escortId: 'sofia-rodriguez',
      escortName: 'Sofia Rodriguez',
      escortImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      escortSlug: 'sofia-rodriguez',
      rating: 5,
      title: 'Outstanding Service',
      review: 'Sofia exceeded all expectations. She was beautiful, intelligent, and made the event perfect. Her attention to detail was impressive.',
      date: '2024-01-20',
      status: 'pending',
      helpfulCount: 0,
      bookingId: 'BK004',
      service: 'Party Companion',
      amount: 40000
    },
    {
      id: '4',
      escortId: 'aisha-patel',
      escortName: 'Aisha Patel',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      escortSlug: 'aisha-patel',
      rating: 3,
      title: 'Decent Experience',
      review: 'The service was okay but could have been better. Aisha was polite but seemed a bit reserved.',
      date: '2024-01-18',
      status: 'published',
      helpfulCount: 3,
      bookingId: 'BK005',
      service: 'Massage',
      amount: 25000
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.escortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || review.status === selectedStatus
    const matchesRating = selectedRating === 'all' || review.rating.toString() === selectedRating
    return matchesSearch && matchesStatus && matchesRating
  })

  const stats = {
    total: reviews.length,
    published: reviews.filter(r => r.status === 'published').length,
    pending: reviews.filter(r => r.status === 'pending').length,
    averageRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
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
            <h1 className="text-2xl sm:text-3xl font-bold">My Reviews</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage and view your reviews of escorts
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => alert('Exporting reviews data...')}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setShowWriteReview(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Write Review
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total Reviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.published}</p>
              <p className="text-xs text-muted-foreground">Published</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.pending}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.averageRating}</p>
              <p className="text-xs text-muted-foreground">Avg Rating</p>
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
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="relative">
                        <Image
                          src={review.escortImage}
                          alt={review.escortName}
                          width={64}
                          height={64}
                          className="rounded-full"
                        />
                        <div className="absolute -bottom-1 -right-1">
                          {getStatusIcon(review.status)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{review.title}</h3>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span>for</span>
                              <Link 
                                href={`/escorts/${review.escortSlug}`}
                                className="text-primary hover:underline font-medium"
                              >
                                {review.escortName}
                              </Link>
                              <span>•</span>
                              <span>{review.service}</span>
                              <span>•</span>
                              <span>₹{review.amount.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                              {review.status}
                            </span>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Rating */}
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex items-center space-x-1">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-muted-foreground">({review.rating}/5)</span>
                        </div>

                        {/* Review Text */}
                        <p className="text-sm text-gray-700 mb-4 leading-relaxed">{review.review}</p>

                        {/* Review Meta */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <span>Booking ID: {review.bookingId}</span>
                            <span>•</span>
                            <span>{review.date}</span>
                            <span>•</span>
                            <span>{review.helpfulCount} helpful</span>
                          </div>
                        </div>

                        {/* Escort Response */}
                        {review.response && (
                          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <MessageCircle className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                Response from {review.escortName}
                              </span>
                            </div>
                            <p className="text-sm text-blue-700 dark:text-blue-300">{review.response}</p>
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">{review.responseDate}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-stretch gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/escorts/${review.escortSlug}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </Link>
                    </Button>
                    {review.status === 'published' && (
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No reviews found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedStatus !== 'all' || selectedRating !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start by writing your first review'
                }
              </p>
              <Button onClick={() => setShowWriteReview(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Write Review
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Write Review Modal (simplified) */}
        {showWriteReview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Write a Review</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowWriteReview(false)}>
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Select a booking to write a review for...
                </p>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowWriteReview(false)}>
                    Cancel
                  </Button>
                  <Button>
                    Write Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
} 