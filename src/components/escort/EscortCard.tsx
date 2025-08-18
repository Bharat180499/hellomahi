"use client"

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin } from 'lucide-react'
import Link from 'next/link'

import { CheckCircle, Star, Heart, Eye, MessageCircle } from 'lucide-react'

import type { Escort } from '@/types/escort'

interface EscortCardProps {
  escort: Escort
  showActions?: boolean
  onFavoriteToggle?: (escortId: string, isFavorite: boolean) => void
  onView?: (escortId: string) => void
}

export default function EscortCard({ 
  escort, 
  showActions = true, 
  onFavoriteToggle,
  onView 
}: EscortCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const primaryPhoto = escort.photos.find(photo => photo.is_primary) || escort.photos[0]
  const primaryLocation = escort.locations.find(loc => loc.is_available)
  const primaryService = escort.services.find(service => service.is_available)
  const averagePrice = escort.services.length > 0 
    ? Math.round(escort.services.reduce((sum, service) => sum + service.price, 0) / escort.services.length)
    : 0

  const handleFavoriteToggle = async () => {
    if (isLoading) return
    
    setIsLoading(true)
    try {
      const success = await escorts.toggleFavorite(escort.id)
      if (success) {
        const newFavoriteState = !isFavorite
        setIsFavorite(newFavoriteState)
        onFavoriteToggle?.(escort.id, newFavoriteState)
      }
    } catch {
      console.error('Error toggling favorite:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleView = () => {
    onView?.(escort.id)
    escorts.incrementViews(escort.id)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        {/* Primary Photo */}
        <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
          {primaryPhoto ? (
            <Image
              src={primaryPhoto.url}
              alt={primaryPhoto.alt_text || escort.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400 text-sm">No photo</span>
            </div>
          )}
          
          {/* Verification Badge */}
          {escort.verification_status === 'verified' && (
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="bg-green-500 text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            </div>
          )}

          {/* Featured Badge */}
          {escort.featured && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-yellow-500 text-white">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}

          {/* Favorite Button */}
          {showActions && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500"
              onClick={handleFavoriteToggle}
              disabled={isLoading}
            >
              <Heart 
                className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} 
              />
            </Button>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Name and Rating */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Link 
                  href={`/escorts/${escort.id}`}
                  className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors"
                  onClick={handleView}
                >
                  {escort.name}
                </Link>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium ml-1">
                      {escort.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({escort.review_count} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">{escort.age} years</span>
                <span className="mx-2">•</span>
                <span>{escort.height}cm</span>
                <span className="mx-2">•</span>
                <span>{escort.measurements}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>
                  {primaryLocation ? `${primaryLocation.city}, ${primaryLocation.state}` : 'Location not specified'}
                </span>
              </div>
            </div>

            {/* Services and Pricing */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {escort.services.slice(0, 3).map((service) => (
                  <Badge key={service.id} variant="outline" className="text-xs">
                    {service.name}
                  </Badge>
                ))}
                {escort.services.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{escort.services.length - 3} more
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">
                  ₹{averagePrice.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">per hour</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>{escort.view_count.toLocaleString()} views</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-1" />
                <span>Message</span>
              </div>
            </div>

            {/* Actions */}
            {showActions && (
              <div className="flex space-x-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  asChild
                >
                  <Link href={`/escorts/${escort.id}`} onClick={handleView}>
                    View Profile
                  </Link>
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  asChild
                >
                  <Link href={`/escorts/${escort.id}/book`}>
                    Book Now
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  )
} 