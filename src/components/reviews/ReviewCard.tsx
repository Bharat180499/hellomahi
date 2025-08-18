"use client"

import { CardHeader } from '@/components/ui/card'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, Edit, Trash2, MapPin, Clock, Calendar, DollarSign, CheckCircle, MessageCircle, Video, MoreVertical, Reply, Check, ThumbsUp, ThumbsDown, Flag, AlertTriangle, ImageIcon, ClockIcon, Check, Star, Calendar, DollarSign, MessageCircle, Trash2 } from 'lucide-react'

import { AvatarImage } from '@/components/ui/avatar'
import { ThumbsDown, Flag, Star, Calendar, DollarSign, CheckCircle, MessageCircle, MoreVertical, Trash2, Reply, AlertTriangle, ClockIcon, ImageIcon, ThumbsUp } from 'lucide-react'
import type { Review } from '@/types/reviews'

interface ReviewCardProps {
  review: Review
  isOwnReview?: boolean
  onEdit?: (review: Review) => void
  onDelete?: (reviewId: string) => void
  onReply?: (review: Review) => void
  onReport?: (review: Review) => void
  onVote?: (reviewId: string, isHelpful: boolean) => void
  showActions?: boolean
  compact?: boolean
}

export default function ReviewCard({
  review,
  isOwnReview = false,
  onEdit,
  onDelete,
  onReply,
  onReport,
  onVote,
  showActions = true,
  compact = false
}: ReviewCardProps) {
  const [showResponses, setShowResponses] = useState(false)
  const [showActionsMenu, setShowActionsMenu] = useState(false)
  const [isVoting, setIsVoting] = useState(false)
  const [userVote, setUserVote] = useState<'helpful' | 'not-helpful' | null>(null)

  const handleVote = async (isHelpful: boolean) => {
    if (isVoting) return

    setIsVoting(true)
    try {
      await reviewSystem.helpfulVotes.vote({
        reviewId: review.id,
        isHelpful
      })
      setUserVote(isHelpful ? 'helpful' : 'not-helpful')
      onVote?.(review.id, isHelpful)
    } catch {
      console.error('Failed to vote:', error)
    } finally {
      setIsVoting(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? 'text-yellow-500 fill-current'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  const renderServiceRatings = () => {
    if (!review.metadata) return null

    const ratings = [
      { label: 'Service Quality', value: review.metadata.serviceQuality },
      { label: 'Communication', value: review.metadata.communication },
      { label: 'Punctuality', value: review.metadata.punctuality },
      { label: 'Value for Money', value: review.metadata.valueForMoney },
      { label: 'Overall Experience', value: review.metadata.overallExperience }
    ]

    return (
      <div className="space-y-2 mt-3">
        {ratings.map((rating) => (
          <div key={rating.label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{rating.label}</span>
            <div className="flex items-center gap-1">
              {renderStars(rating.value)}
              <span className="text-xs text-muted-foreground ml-1">
                {rating.value.toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderAttachments = () => {
    if (!review.attachments || review.attachments.length === 0) return null

    return (
      <div className="mt-3">
        <div className="flex flex-wrap gap-2">
          {review.attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="relative group cursor-pointer"
              onClick={() => {/* Handle attachment preview */}}
            >
              {attachment.type === 'image' ? (
                <img
                  src={attachment.thumbnailUrl || attachment.url}
                  alt={attachment.name}
                  className="w-16 h-16 object-cover rounded border hover:opacity-80 transition-opacity"
                />
              ) : (
                <div className="w-16 h-16 bg-muted rounded border flex items-center justify-center">
                  <Video className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded flex items-center justify-center">
                {attachment.type === 'image' ? (
                  <ImageIcon className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <Video className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderResponses = () => {
    if (!review.responses || review.responses.length === 0) return null

    return (
      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Responses ({review.responses.length})</span>
        </div>
        {review.responses.map((response) => (
          <div key={response.id} className="ml-6 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={response.responderAvatar} alt={response.responderName} />
                <AvatarFallback className="text-xs">
                  {response.responderName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{response.responderName}</span>
                <Badge variant="outline" className="text-xs">
                  {response.responderType}
                </Badge>
                {!response.isPublic && (
                  <Badge variant="secondary" className="text-xs">
                    Private
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-sm">{response.content}</p>
            <div className="text-xs text-muted-foreground mt-2">
              {new Date(response.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderMetadata = () => {
    if (!review.metadata) return null

    return (
      <div className="mt-3 space-y-2 text-sm text-muted-foreground">
        {review.metadata.bookingDate && (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Booked: {new Date(review.metadata.bookingDate).toLocaleDateString()}</span>
          </div>
        )}
        {review.metadata.serviceDate && (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Service: {new Date(review.metadata.serviceDate).toLocaleDateString()}</span>
          </div>
        )}
        {review.metadata.duration && (
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4" />
            <span>Duration: {review.metadata.duration} minutes</span>
          </div>
        )}
        {review.metadata.price && (
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>Price: ₹{review.metadata.price.toLocaleString()}</span>
          </div>
        )}
        {review.location && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{review.location}</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className={`${compact ? 'p-3' : ''}`}>
      <CardHeader className={`${compact ? 'p-0 pb-2' : ''}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage 
                src={review.isAnonymous ? undefined : review.userAvatar} 
                alt={review.isAnonymous ? 'Anonymous' : review.userName} 
              />
              <AvatarFallback>
                {review.isAnonymous ? 'A' : review.userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-sm">
                  {review.isAnonymous ? 'Anonymous User' : review.userName}
                </h4>
                {review.isVerified && (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
                {review.isEdited && (
                  <span className="text-xs text-muted-foreground italic">(edited)</span>
                )}
              </div>
              
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center gap-1">
                  {renderStars(review.rating)}
                  <span className="text-sm font-medium ml-1">{review.rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(review.date).toLocaleDateString()}
                </span>
                <span className="text-sm text-muted-foreground">•</span>
                <Badge variant="outline" className="text-xs">
                  {review.serviceType}
                </Badge>
              </div>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2">
            {review.status === 'pending' && (
              <Badge variant="secondary" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Pending
              </Badge>
            )}
            {review.status === 'flagged' && (
              <Badge variant="destructive" className="text-xs">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Flagged
              </Badge>
            )}
            
            {/* Actions menu */}
            {showActions && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowActionsMenu(!showActionsMenu)}
                  className="h-8 w-8 p-0"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>

                {showActionsMenu && (
                  <div className="absolute top-full right-0 mt-1 bg-background border rounded-lg shadow-lg py-1 z-10 min-w-[160px]">
                    {isOwnReview && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            onEdit?.(review)
                            setShowActionsMenu(false)
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Review
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-red-600 hover:text-red-700"
                          onClick={() => {
                            onDelete?.(review.id)
                            setShowActionsMenu(false)
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Review
                        </Button>
                      </>
                    )}
                    
                    {!isOwnReview && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                          onReply?.(review)
                          setShowActionsMenu(false)
                        }}
                      >
                        <Reply className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        onReport?.(review)
                        setShowActionsMenu(false)
                      }}
                    >
                      <Flag className="h-4 w-4 mr-2" />
                      Report
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className={`${compact ? 'p-0' : ''}`}>
        {/* Review title and content */}
        <div className="mb-3">
          <h5 className="font-semibold mb-2">{review.title}</h5>
          <p className="text-sm leading-relaxed">{review.content}</p>
        </div>

        {/* Service ratings */}
        {!compact && renderServiceRatings()}

        {/* Attachments */}
        {!compact && renderAttachments()}

        {/* Metadata */}
        {!compact && renderMetadata()}

        {/* Responses */}
        {!compact && showResponses && renderResponses()}

        {/* Actions */}
        {showActions && (
          <div className="flex items-center justify-between mt-4 pt-3 border-t">
            <div className="flex items-center gap-4">
              {/* Helpful votes */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote(true)}
                  disabled={isVoting}
                  className={`h-8 px-2 ${
                    userVote === 'helpful' ? 'text-green-600' : ''
                  }`}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {review.helpfulCount}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote(false)}
                  disabled={isVoting}
                  className={`h-8 px-2 ${
                    userVote === 'not-helpful' ? 'text-red-600' : ''
                  }`}
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>

              {/* Show responses button */}
              {review.responses && review.responses.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowResponses(!showResponses)}
                  className="h-8"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {showResponses ? 'Hide' : 'Show'} Responses ({review.responses.length})
                </Button>
              )}
            </div>

            {/* Report count */}
            {review.reportCount > 0 && (
              <div className="text-xs text-muted-foreground">
                {review.reportCount} report{review.reportCount !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 