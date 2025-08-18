"use client"


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, MapPin, Calendar, Clock, DollarSign, Upload, ImageIcon, X, CheckCircle } from 'lucide-react'

import type { ReviewRequest } from '@/types/reviews'

interface ReviewFormProps {
  escortId: string
  escortName: string
  escortAvatar?: string
  bookingId?: string
  onSubmit: (data: ReviewRequest) => void
  onCancel: () => void
  isLoading?: boolean
  initialData?: Partial<ReviewRequest>
}

export default function ReviewForm({
  escortId,
  escortName,
  escortAvatar,
  bookingId,
  onSubmit,
  onCancel,
  isLoading = false,
  initialData
}: ReviewFormProps) {
  const [formData, setFormData] = useState<ReviewRequest>({
    escortId,
    bookingId,
    rating: initialData?.rating || 5,
    title: initialData?.title || '',
    content: initialData?.content || '',
    serviceType: initialData?.serviceType || '',
    location: initialData?.location || '',
    isAnonymous: initialData?.isAnonymous || false,
    metadata: {
      serviceQuality: initialData?.metadata?.serviceQuality || 5,
      communication: initialData?.metadata?.communication || 5,
      punctuality: initialData?.metadata?.punctuality || 5,
      valueForMoney: initialData?.metadata?.valueForMoney || 5,
      overallExperience: initialData?.metadata?.overallExperience || 5,
      bookingDate: initialData?.metadata?.bookingDate || '',
      serviceDate: initialData?.metadata?.serviceDate || '',
      duration: initialData?.metadata?.duration || undefined,
      price: initialData?.metadata?.price || undefined
    },
    attachments: []
  })

  const [attachments, setAttachments] = useState<File[]>([])
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleInputChange = (field: keyof ReviewRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleMetadataChange = (field: keyof typeof formData.metadata, value: any) => {
    setFormData(prev => ({
      ...prev,
      metadata: { ...prev.metadata!, [field]: value }
    }))
  }

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }))
    // Auto-update overall experience rating
    handleMetadataChange('overallExperience', rating)
  }

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    )
    setAttachments(prev => [...prev, ...newFiles])
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.serviceType.trim()) {
      return
    }

    onSubmit({
      ...formData,
      attachments
    })
  }

  const renderStars = (rating: number, onRatingChange: (rating: number) => void, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    }

    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onRatingChange(i + 1)}
            onMouseEnter={() => setHoveredRating(i + 1)}
            onMouseLeave={() => setHoveredRating(0)}
            className="focus:outline-none"
          >
            <Star
              className={`${sizeClasses[size]} ${
                i < (hoveredRating || rating)
                  ? 'text-yellow-500 fill-current'
                  : 'text-gray-300'
              } transition-colors`}
            />
          </button>
        ))}
        <span className="text-sm font-medium ml-2">{rating.toFixed(1)}</span>
      </div>
    )
  }

  const renderServiceRating = (label: string, value: number, field: keyof typeof formData.metadata) => {
    return (
      <div className="flex items-center justify-between">
        <Label className="text-sm">{label}</Label>
        <div className="flex items-center gap-2">
          {renderStars(value, (rating) => handleMetadataChange(field, rating), 'sm')}
        </div>
      </div>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={escortAvatar} alt={escortName} />
              <AvatarFallback>
                {escortName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>Review for {escortName}</span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Overall Rating */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Overall Rating</Label>
            {renderStars(formData.rating, handleRatingChange, 'lg')}
          </div>

          {/* Review Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Review Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Summarize your experience"
              maxLength={100}
              required
            />
            <div className="text-xs text-muted-foreground text-right">
              {formData.title.length}/100
            </div>
          </div>

          {/* Review Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Review Details</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Share your experience in detail..."
              rows={6}
              maxLength={1000}
              required
            />
            <div className="text-xs text-muted-foreground text-right">
              {formData.content.length}/1000
            </div>
          </div>

          {/* Service Type */}
          <div className="space-y-2">
            <Label htmlFor="serviceType">Service Type</Label>
            <Input
              id="serviceType"
              value={formData.serviceType}
              onChange={(e) => handleInputChange('serviceType', e.target.value)}
              placeholder="e.g., Dinner Date, Massage, Companionship"
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location (Optional)</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Where did the service take place?"
                className="pl-10"
              />
            </div>
          </div>

          {/* Service Ratings */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Service Ratings</Label>
            <div className="space-y-3">
              {renderServiceRating('Service Quality', formData.metadata!.serviceQuality, 'serviceQuality')}
              {renderServiceRating('Communication', formData.metadata!.communication, 'communication')}
              {renderServiceRating('Punctuality', formData.metadata!.punctuality, 'punctuality')}
              {renderServiceRating('Value for Money', formData.metadata!.valueForMoney, 'valueForMoney')}
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Additional Details (Optional)</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Booking Date */}
              <div className="space-y-2">
                <Label htmlFor="bookingDate">Booking Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="bookingDate"
                    type="date"
                    value={formData.metadata!.bookingDate}
                    onChange={(e) => handleMetadataChange('bookingDate', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Service Date */}
              <div className="space-y-2">
                <Label htmlFor="serviceDate">Service Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="serviceDate"
                    type="date"
                    value={formData.metadata!.serviceDate}
                    onChange={(e) => handleMetadataChange('serviceDate', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="duration"
                    type="number"
                    value={formData.metadata!.duration || ''}
                    onChange={(e) => handleMetadataChange('duration', e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="120"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    value={formData.metadata!.price || ''}
                    onChange={(e) => handleMetadataChange('price', e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="5000"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Attachments (Optional)</Label>
            
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload photos or videos from your experience
              </p>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="attachments"
              />
              <Label htmlFor="attachments" className="cursor-pointer">
                <Button variant="outline" type="button">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </Label>
            </div>

            {/* Attachment previews */}
            {attachments.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Selected Files:</Label>
                <div className="flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm truncate max-w-32">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Anonymous Review */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Post Anonymously</Label>
              <p className="text-xs text-muted-foreground">
                Your name will be hidden from this review
              </p>
            </div>
            <Switch
              checked={formData.isAnonymous}
              onCheckedChange={(checked) => handleInputChange('isAnonymous', checked)}
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.title.trim() || !formData.content.trim() || !formData.serviceType.trim()}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Review
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 