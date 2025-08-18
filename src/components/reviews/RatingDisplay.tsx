"use client"

import { Star } from 'lucide-react'
import type { Rating } from '@/types/reviews'

interface RatingDisplayProps {
  rating: Rating
  showBreakdown?: boolean
  showTrends?: boolean
  compact?: boolean
  className?: string
}

export default function RatingDisplay({
  rating,
  showBreakdown = true,
  showTrends = false,
  compact = false,
  className = ''
}: RatingDisplayProps) {
  const renderStars = (ratingValue: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5'
    }

    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              i < ratingValue
                ? 'text-yellow-500 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const getRatingPercentage = (count: number) => {
    return rating.totalReviews > 0 ? (count / rating.totalReviews) * 100 : 0
  }

  const getRatingColor = (ratingValue: number) => {
    if (ratingValue >= 4.5) return 'text-green-600'
    if (ratingValue >= 4.0) return 'text-blue-600'
    if (ratingValue >= 3.5) return 'text-yellow-600'
    if (ratingValue >= 3.0) return 'text-orange-600'
    return 'text-red-600'
  }

  const getRatingLabel = (ratingValue: number) => {
    if (ratingValue >= 4.5) return 'Excellent'
    if (ratingValue >= 4.0) return 'Very Good'
    if (ratingValue >= 3.5) return 'Good'
    if (ratingValue >= 3.0) return 'Average'
    if (ratingValue >= 2.0) return 'Below Average'
    return 'Poor'
  }

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {renderStars(rating.averageRating, 'sm')}
        <span className={`text-sm font-medium ${getRatingColor(rating.averageRating)}`}>
          {rating.averageRating.toFixed(1)}
        </span>
        <span className="text-xs text-muted-foreground">
          ({rating.totalReviews} reviews)
        </span>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Rating */}
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">
            {rating.averageRating.toFixed(1)}
          </div>
          {renderStars(rating.averageRating, 'lg')}
          <div className="text-sm text-muted-foreground mt-1">
            {getRatingLabel(rating.averageRating)}
          </div>
          <div className="text-xs text-muted-foreground">
            Based on {rating.totalReviews} reviews
          </div>
        </div>

        {/* Service Ratings */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Service Quality</span>
            <div className="flex items-center gap-2">
              {renderStars(rating.serviceRatings.serviceQuality, 'sm')}
              <span className="text-sm font-medium">
                {rating.serviceRatings.serviceQuality.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Communication</span>
            <div className="flex items-center gap-2">
              {renderStars(rating.serviceRatings.communication, 'sm')}
              <span className="text-sm font-medium">
                {rating.serviceRatings.communication.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Punctuality</span>
            <div className="flex items-center gap-2">
              {renderStars(rating.serviceRatings.punctuality, 'sm')}
              <span className="text-sm font-medium">
                {rating.serviceRatings.punctuality.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Value for Money</span>
            <div className="flex items-center gap-2">
              {renderStars(rating.serviceRatings.valueForMoney, 'sm')}
              <span className="text-sm font-medium">
                {rating.serviceRatings.valueForMoney.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Breakdown */}
      {showBreakdown && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Rating Breakdown</h4>
          <div className="space-y-2">
            {[
              { stars: 5, count: rating.ratingBreakdown.fiveStar, label: '5 stars' },
              { stars: 4, count: rating.ratingBreakdown.fourStar, label: '4 stars' },
              { stars: 3, count: rating.ratingBreakdown.threeStar, label: '3 stars' },
              { stars: 2, count: rating.ratingBreakdown.twoStar, label: '2 stars' },
              { stars: 1, count: rating.ratingBreakdown.oneStar, label: '1 star' }
            ].map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <span className="text-sm w-12">{item.label}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getRatingPercentage(item.count)}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {showTrends && rating.recentReviews.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Recent Reviews</h4>
          <div className="space-y-2">
            {rating.recentReviews.slice(0, 3).map((review) => (
              <div key={review.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <div className="flex items-center gap-2">
                  {renderStars(review.rating, 'sm')}
                  <span className="text-sm truncate max-w-48">{review.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="text-xs text-muted-foreground">
        Last updated: {new Date(rating.lastUpdated).toLocaleDateString()}
      </div>
    </div>
  )
} 