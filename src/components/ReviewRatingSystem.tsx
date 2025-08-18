"use client"

import { CardHeader, CardTitle } from '@/components/ui/card'

import { ThumbsDown, Flag, Star, Calendar, CheckCircle, MessageCircle, MoreVertical, ThumbsUp } from 'lucide-react'
import Image from 'next/image'

interface Review {
  id: string
  escortId: string
  escortName: string
  escortImage: string
  clientId: string
  clientName: string
  clientImage: string
  rating: number
  title: string
  content: string
  date: Date
  isVerified: boolean
  isHelpful: number
  isNotHelpful: number
  response?: {
    content: string
    date: Date
  }
  categories: {
    professionalism: number
    punctuality: number
    communication: number
    appearance: number
    service: number
  }
  tags: string[]
  bookingId: string
  bookingAmount: number
}

export default function ReviewRatingSystem() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      escortId: 'escort1',
      escortName: 'Priya Sharma',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      clientId: 'client1',
      clientName: 'Rahul Verma',
      clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      rating: 5,
      title: 'Exceptional experience with Priya',
      content: 'I had an absolutely wonderful time with Priya. She was professional, punctual, and exceeded all my expectations. Her communication was excellent throughout the entire process, and she made me feel comfortable from the moment we met. The service was top-notch and I would definitely recommend her to anyone looking for quality companionship.',
      date: new Date('2024-01-20'),
      isVerified: true,
      isHelpful: 12,
      isNotHelpful: 1,
      response: {
        content: 'Thank you Rahul for your wonderful review! I had a great time with you as well. Looking forward to meeting again.',
        date: new Date('2024-01-21')
      },
      categories: {
        professionalism: 5,
        punctuality: 5,
        communication: 5,
        appearance: 5,
        service: 5
      },
      tags: ['Professional', 'Punctual', 'Beautiful', 'Great Service'],
      bookingId: 'booking1',
      bookingAmount: 30000
    },
    {
      id: '2',
      escortId: 'escort1',
      escortName: 'Priya Sharma',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      clientId: 'client2',
      clientName: 'Amit Patel',
      clientImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      rating: 4,
      title: 'Good experience overall',
      content: 'Priya was very professional and the service was good. She arrived on time and was well-dressed. The only minor issue was that the communication could have been a bit better, but overall I was satisfied with the experience.',
      date: new Date('2024-01-18'),
      isVerified: true,
      isHelpful: 8,
      isNotHelpful: 2,
      categories: {
        professionalism: 4,
        punctuality: 5,
        communication: 3,
        appearance: 5,
        service: 4
      },
      tags: ['Professional', 'On Time', 'Good Service'],
      bookingId: 'booking2',
      bookingAmount: 45000
    }
  ])

  const [selectedRating, setSelectedRating] = useState<number>(0)
  const [hoverRating, setHoverRating] = useState<number>(0)
  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewContent, setReviewContent] = useState('')
  const [selectedCategories, setSelectedCategories] = useState({
    professionalism: 0,
    punctuality: 0,
    communication: 0,
    appearance: 0,
    service: 0
  })
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filterRating, setFilterRating] = useState<number>(0)
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'helpful'>('date')

  const availableTags = [
    'Professional', 'Punctual', 'Beautiful', 'Great Service', 'Friendly',
    'Discrete', 'Experienced', 'Well-dressed', 'Good Communication',
    'Value for Money', 'Clean', 'Safe', 'Reliable', 'Attentive'
  ]

  const categoryLabels = {
    professionalism: 'Professionalism',
    punctuality: 'Punctuality',
    communication: 'Communication',
    appearance: 'Appearance',
    service: 'Service Quality'
  }

  const handleCategoryRating = (category: keyof typeof selectedCategories, rating: number) => {
    setSelectedCategories(prev => ({ ...prev, [category]: rating }))
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleSubmitReview = () => {
    const newReview: Review = {
      id: Date.now().toString(),
      escortId: 'escort1',
      escortName: 'Priya Sharma',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      clientId: 'currentUser',
      clientName: 'Current User',
      clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      rating: selectedRating,
      title: reviewTitle,
      content: reviewContent,
      date: new Date(),
      isVerified: true,
      isHelpful: 0,
      isNotHelpful: 0,
      categories: selectedCategories,
      tags: selectedTags,
      bookingId: 'booking3',
      bookingAmount: 35000
    }

    setReviews(prev => [newReview, ...prev])
    
    // Reset form
    setSelectedRating(0)
    setReviewTitle('')
    setReviewContent('')
    setSelectedCategories({
      professionalism: 0,
      punctuality: 0,
      communication: 0,
      appearance: 0,
      service: 0
    })
    setSelectedTags([])
  }

  const handleHelpful = (reviewId: string, isHelpful: boolean) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === reviewId
          ? {
              ...review,
              isHelpful: isHelpful ? review.isHelpful + 1 : review.isHelpful,
              isNotHelpful: !isHelpful ? review.isNotHelpful + 1 : review.isNotHelpful
            }
          : review
      )
    )
  }

  const filteredReviews = reviews
    .filter(review => filterRating === 0 || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'helpful':
          return b.isHelpful - a.isHelpful
        case 'date':
        default:
          return b.date.getTime() - a.date.getTime()
      }
    })

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }))

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Reviews & Ratings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center space-x-1 my-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= averageRating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Based on {reviews.length} reviews
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="md:col-span-2">
              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 w-16">
                      <span className="text-sm">{rating}</span>
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Write Review */}
      <Card>
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Rating */}
          <div>
            <label className="block text-sm font-medium mb-2">Overall Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setSelectedRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-2xl"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || selectedRating)
                        ? 'text-yellow-500 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Category Ratings */}
          <div>
            <label className="block text-sm font-medium mb-3">Rate by Category</label>
            <div className="space-y-3">
              {Object.entries(categoryLabels).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm">{label}</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => handleCategoryRating(key as keyof typeof selectedCategories, star)}
                        className="text-lg"
                      >
                        <Star
                          className={`h-5 w-5 ${
                            star <= selectedCategories[key as keyof typeof selectedCategories]
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Review Title</label>
            <input
              type="text"
              placeholder="Summarize your experience..."
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Review Content */}
          <div>
            <label className="block text-sm font-medium mb-2">Review Details</label>
            <textarea
              placeholder="Share your experience in detail..."
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Tags</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-muted-foreground/20 hover:bg-muted'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSubmitReview}
            disabled={!selectedRating || !reviewTitle || !reviewContent}
            className="w-full"
          >
            Submit Review
          </Button>
        </CardContent>
      </Card>

      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-4">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(Number(e.target.value))}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value={0}>All Ratings</option>
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={2}>2 Stars</option>
            <option value={1}>1 Star</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'rating' | 'helpful')}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="date">Sort by Date</option>
            <option value="rating">Sort by Rating</option>
            <option value="helpful">Sort by Helpful</option>
          </select>
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredReviews.length} review{filteredReviews.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map(review => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Image
                      src={review.clientImage}
                      alt={review.clientName}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{review.clientName}</h4>
                        {review.isVerified && (
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">
                          {review.rating}.0
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{review.date.toLocaleDateString()}</span>
                        <span>•</span>
                        <span>₹{review.bookingAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                {/* Review Title and Content */}
                <div>
                  <h5 className="font-medium mb-2">{review.title}</h5>
                  <p className="text-muted-foreground">{review.content}</p>
                </div>

                {/* Category Ratings */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  {Object.entries(review.categories).map(([category, rating]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                {review.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {review.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Escort Response */}
                {review.response && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Image
                        src={review.escortImage}
                        alt={review.escortName}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="font-medium text-sm">{review.escortName}</span>
                      <span className="text-xs text-muted-foreground">Escort</span>
                    </div>
                    <p className="text-sm">{review.response.content}</p>
                    <div className="text-xs text-muted-foreground mt-2">
                      {review.response.date.toLocaleDateString()}
                    </div>
                  </div>
                )}

                {/* Review Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleHelpful(review.id, true)}
                      className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>Helpful ({review.isHelpful})</span>
                    </button>
                    <button
                      onClick={() => handleHelpful(review.id, false)}
                      className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span>Not Helpful ({review.isNotHelpful})</span>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 