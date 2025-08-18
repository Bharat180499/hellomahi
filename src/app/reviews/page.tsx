"use client"


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'


import type { Review, Rating, ReviewFilters } from '@/types/reviews'

import ReviewCard from '@/components/reviews/ReviewCard'
import ReviewForm from '@/components/reviews/ReviewForm'
import RatingDisplay from '@/components/reviews/RatingDisplay'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [rating, setRating] = useState<Rating | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [selectedEscort, setSelectedEscort] = useState<{
    id: string
    name: string
    avatar?: string
  } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<ReviewFilters>({
    sortBy: 'date',
    sortOrder: 'desc'
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setIsHasMore] = useState(true)

  // Mock data for demonstration
  const mockRating: Rating = {
    escortId: '1',
    averageRating: 4.6,
    totalReviews: 127,
    ratingBreakdown: {
      fiveStar: 89,
      fourStar: 25,
      threeStar: 8,
      twoStar: 3,
      oneStar: 2
    },
    serviceRatings: {
      serviceQuality: 4.7,
      communication: 4.5,
      punctuality: 4.8,
      valueForMoney: 4.4,
      overallExperience: 4.6
    },
    recentReviews: [],
    lastUpdated: new Date().toISOString()
  }

  const mockReviews: Review[] = [
    {
      id: '1',
      escortId: '1',
      escortName: 'Priya Sharma',
      escortAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      userId: 'user1',
      userName: 'John D.',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      rating: 5,
      title: 'Amazing experience with Priya',
      content: 'Priya was absolutely wonderful. She was punctual, professional, and made me feel very comfortable throughout our time together. Her communication was excellent and she exceeded all my expectations. Highly recommended!',
      serviceType: 'Dinner Date',
      location: 'Mumbai, Maharashtra',
      date: '2024-07-15',
      isVerified: true,
      isAnonymous: false,
      isEdited: false,
      isDeleted: false,
      helpfulCount: 12,
      reportCount: 0,
      status: 'approved',
      metadata: {
        serviceQuality: 5,
        communication: 5,
        punctuality: 5,
        valueForMoney: 4,
        overallExperience: 5,
        bookingDate: '2024-07-10',
        serviceDate: '2024-07-15',
        duration: 180,
        price: 15000
      },
      createdAt: '2024-07-16T10:30:00Z',
      updatedAt: '2024-07-16T10:30:00Z'
    },
    {
      id: '2',
      escortId: '1',
      escortName: 'Priya Sharma',
      escortAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      userId: 'user2',
      userName: 'Sarah M.',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      rating: 4,
      title: 'Great companion for the evening',
      content: 'Priya was a delightful companion for our dinner date. She was well-dressed, articulate, and great company. The conversation flowed naturally and she was very attentive. Would definitely book again.',
      serviceType: 'Dinner Date',
      location: 'Delhi, NCR',
      date: '2024-07-12',
      isVerified: true,
      isAnonymous: false,
      isEdited: false,
      isDeleted: false,
      helpfulCount: 8,
      reportCount: 0,
      status: 'approved',
      metadata: {
        serviceQuality: 4,
        communication: 5,
        punctuality: 4,
        valueForMoney: 4,
        overallExperience: 4,
        bookingDate: '2024-07-08',
        serviceDate: '2024-07-12',
        duration: 120,
        price: 12000
      },
      createdAt: '2024-07-13T14:20:00Z',
      updatedAt: '2024-07-13T14:20:00Z'
    },
    {
      id: '3',
      escortId: '1',
      escortName: 'Priya Sharma',
      escortAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      userId: 'user3',
      userName: 'Anonymous',
      userAvatar: undefined,
      rating: 5,
      title: 'Exceptional service and professionalism',
      content: 'I had an amazing experience with Priya. She was professional, beautiful, and made me feel special. The service was exactly as described and she went above and beyond to ensure I was satisfied.',
      serviceType: 'Companionship',
      location: 'Bangalore, Karnataka',
      date: '2024-07-10',
      isVerified: true,
      isAnonymous: true,
      isEdited: false,
      isDeleted: false,
      helpfulCount: 15,
      reportCount: 0,
      status: 'approved',
      metadata: {
        serviceQuality: 5,
        communication: 5,
        punctuality: 5,
        valueForMoney: 5,
        overallExperience: 5,
        bookingDate: '2024-07-05',
        serviceDate: '2024-07-10',
        duration: 240,
        price: 20000
      },
      createdAt: '2024-07-11T09:15:00Z',
      updatedAt: '2024-07-11T09:15:00Z'
    }
  ]

  // Load reviews
  const loadReviews = async (page = 1, append = false) => {
    if (isLoading) return

    setIsLoading(true)
    try {
      // For now, using mock data
      // const response = await reviewSystem.reviews.search({
      //   filters,
      //   page,
      //   limit: 10
      // })
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (append) {
        setReviews(prev => [...prev, ...mockReviews])
      } else {
        setReviews(mockReviews)
      }
      setRating(mockRating)
      setIsHasMore(false) // No more pages in mock data
      setCurrentPage(page)
    } catch {
      console.error('Failed to load reviews:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle review submission
  const handleReviewSubmit = async (data: any) => {
    try {
      // For now, just add to the list
      const newReview: Review = {
        id: Date.now().toString(),
        escortId: data.escortId,
        escortName: selectedEscort?.name || 'Unknown',
        escortAvatar: selectedEscort?.avatar,
        userId: 'current-user',
        userName: data.isAnonymous ? 'Anonymous' : 'Current User',
        userAvatar: undefined,
        rating: data.rating,
        title: data.title,
        content: data.content,
        serviceType: data.serviceType,
        location: data.location,
        date: new Date().toISOString().split('T')[0],
        isVerified: false,
        isAnonymous: data.isAnonymous,
        isEdited: false,
        isDeleted: false,
        helpfulCount: 0,
        reportCount: 0,
        status: 'pending',
        metadata: data.metadata,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      setReviews(prev => [newReview, ...prev])
      setShowReviewForm(false)
      setSelectedEscort(null)
    } catch {
      console.error('Failed to submit review:', error)
    }
  }

  // Load initial data
  useEffect(() => {
    loadReviews(1, false)
  }, [filters])

  // Filter reviews based on search
  const filteredReviews = reviews.filter(review =>
    review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Reviews & Ratings</h1>
            <p className="text-muted-foreground">
              Read and write reviews for escorts and agencies
            </p>
          </div>
          <Button onClick={() => setShowReviewForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Write a Review
          </Button>
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <ReviewForm
                escortId={selectedEscort?.id || '1'}
                escortName={selectedEscort?.name || 'Select Escort'}
                escortAvatar={selectedEscort?.avatar}
                onSubmit={handleReviewSubmit}
                onCancel={() => {
                  setShowReviewForm(false)
                  setSelectedEscort(null)
                }}
                isLoading={false}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Overall Rating */}
            {rating && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Overall Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <RatingDisplay rating={rating} showBreakdown={true} />
                </CardContent>
              </Card>
            )}

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Rating Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rating</label>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <label key={stars} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.rating === stars}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            rating: e.target.checked ? stars : undefined
                          }))}
                          className="rounded"
                        />
                        <div className="flex items-center gap-1">
                          {Array.from({ length: stars }, (_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm">and up</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Service Type Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Service Type</label>
                  <select
                    value={filters.serviceType || ''}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      serviceType: e.target.value || undefined
                    }))}
                    className="w-full p-2 border rounded-md text-sm"
                  >
                    <option value="">All Services</option>
                    <option value="Dinner Date">Dinner Date</option>
                    <option value="Companionship">Companionship</option>
                    <option value="Massage">Massage</option>
                    <option value="Travel">Travel</option>
                    <option value="VIP Service">VIP Service</option>
                  </select>
                </div>

                {/* Sort Options */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <select
                    value={`${filters.sortBy}-${filters.sortOrder}`}
                    onChange={(e) => {
                      const [sortBy, sortOrder] = e.target.value.split('-')
                      setFilters(prev => ({
                        ...prev,
                        sortBy: sortBy as any,
                        sortOrder: sortOrder as any
                      }))
                    }}
                    className="w-full p-2 border rounded-md text-sm"
                  >
                    <option value="date-desc">Newest First</option>
                    <option value="date-asc">Oldest First</option>
                    <option value="rating-desc">Highest Rated</option>
                    <option value="rating-asc">Lowest Rated</option>
                    <option value="helpful-desc">Most Helpful</option>
                  </select>
                </div>

                {/* Verification Filter */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.isVerified === true}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        isVerified: e.target.checked ? true : undefined
                      }))}
                      className="rounded"
                    />
                    <span className="text-sm">Verified Reviews Only</span>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Review Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Reviews</span>
                  <span className="font-medium">{reviews.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Verified Reviews</span>
                  <span className="font-medium text-green-600">
                    {reviews.filter(r => r.isVerified).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Rating</span>
                  <span className="font-medium">
                    {rating ? rating.averageRating.toFixed(1) : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">This Month</span>
                  <span className="font-medium">
                    {reviews.filter(r => {
                      const reviewDate = new Date(r.date)
                      const now = new Date()
                      return reviewDate.getMonth() === now.getMonth() &&
                             reviewDate.getFullYear() === now.getFullYear()
                    }).length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {isLoading && reviews.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : filteredReviews.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No reviews found</h3>
                    <p className="text-muted-foreground text-center">
                      {searchQuery 
                        ? 'No reviews match your search criteria.'
                        : 'Be the first to write a review!'
                      }
                    </p>
                    {!searchQuery && (
                      <Button 
                        onClick={() => setShowReviewForm(true)}
                        className="mt-4"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Write First Review
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Results count */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {filteredReviews.length} review{filteredReviews.length !== 1 ? 's' : ''} found
                    </span>
                    {searchQuery && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSearchQuery('')}
                      >
                        Clear Search
                      </Button>
                    )}
                  </div>

                  {/* Reviews */}
                  <div className="space-y-4">
                    {filteredReviews.map((review) => (
                      <ReviewCard
                        key={review.id}
                        review={review}
                        showActions={true}
                        onEdit={(review) => {
                          // Handle edit
                          console.log('Edit review:', review)
                        }}
                        onDelete={(reviewId) => {
                          setReviews(prev => prev.filter(r => r.id !== reviewId))
                        }}
                        onReply={(review) => {
                          // Handle reply
                          console.log('Reply to review:', review)
                        }}
                        onReport={(review) => {
                          // Handle report
                          console.log('Report review:', review)
                        }}
                        onVote={(reviewId, isHelpful) => {
                          // Handle vote
                          console.log('Vote on review:', reviewId, isHelpful)
                        }}
                      />
                    ))}
                  </div>

                  {/* Load More */}
                  {hasMore && (
                    <div className="flex justify-center pt-4">
                      <Button
                        variant="outline"
                        onClick={() => loadReviews(currentPage + 1, true)}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Loading...' : 'Load More Reviews'}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 