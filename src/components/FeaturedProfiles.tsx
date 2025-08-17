"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { 
  Star, 
  MapPin, 
  Shield, 
  Crown, 
  Heart,
  Phone,
  MessageCircle,
  Eye
} from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { Escort } from '@/types'

// Mock data for featured profiles
const mockProfiles: Escort[] = [
  {
    id: '1',
    slug: 'priya-mumbai',
    name: 'Priya',
    age: 25,
    location: 'Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    type: 'independent',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    photos: ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400'],
    pricing: {
      oneShot: 15000,
      twoShot: 25000,
      threeShot: 35000,
      fullNight: 50000,
      currency: 'INR'
    },
    rating: 4.8,
    reviews: 127,
    verified: true,
    isPremium: true,
    isActive: true,
    plan: '30',
    services: ['Companionship', 'Dinner Date', 'Travel'],
    description: 'Elegant and sophisticated companion for high-end events and private meetings.',
    images: ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400'],
    videoVerificationStatus: 'approved',
    identityVerification: {
      documentType: 'aadhar',
      status: 'approved'
    },
    contactInfo: {
      phone: '+91 98765 43210',
      email: 'priya@example.com'
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      hours: '10:00 AM - 2:00 AM'
    },
    height: '165',
    hairColor: 'Black',
    eyeColor: 'Brown',
    languages: ['English', 'Hindi', 'Marathi'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    slug: 'anjali-bangalore',
    name: 'Anjali',
    age: 28,
    location: 'Koramangala',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    type: 'independent',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    photos: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'],
    pricing: {
      oneShot: 12000,
      twoShot: 20000,
      threeShot: 28000,
      fullNight: 40000,
      currency: 'INR'
    },
    rating: 4.9,
    reviews: 89,
    verified: true,
    isPremium: true,
    isActive: true,
    plan: '20',
    services: ['Massage', 'Companionship', 'VIP Service'],
    description: 'Professional massage therapist and companion for relaxation and entertainment.',
    images: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'],
    videoVerificationStatus: 'approved',
    identityVerification: {
      documentType: 'aadhar',
      status: 'approved'
    },
    contactInfo: {
      phone: '+91 98765 43211',
      email: 'anjali@example.com'
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      hours: '11:00 AM - 1:00 AM'
    },
    height: '168',
    hairColor: 'Brown',
    eyeColor: 'Green',
    languages: ['English', 'Hindi', 'Kannada'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '3',
    slug: 'zara-delhi',
    name: 'Zara',
    age: 23,
    location: 'South Extension',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    type: 'independent',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    photos: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'],
    pricing: {
      oneShot: 18000,
      twoShot: 30000,
      threeShot: 42000,
      fullNight: 60000,
      currency: 'INR'
    },
    rating: 4.7,
    reviews: 156,
    verified: true,
    isPremium: true,
    isActive: true,
    plan: '30',
    services: ['Companionship', 'Dinner Date', 'Party', 'Travel'],
    description: 'Young and energetic companion perfect for parties and social events.',
    images: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'],
    videoVerificationStatus: 'approved',
    identityVerification: {
      documentType: 'aadhar',
      status: 'approved'
    },
    contactInfo: {
      phone: '+91 98765 43212',
      email: 'zara@example.com'
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      hours: '12:00 PM - 3:00 AM'
    },
    height: '162',
    hairColor: 'Black',
    eyeColor: 'Brown',
    languages: ['English', 'Hindi', 'Urdu'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  }
]

export default function FeaturedProfiles() {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Verified Profiles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most trusted and highly-rated escorts with video verification
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mockProfiles.map((profile) => (
            <Card key={profile.id} className="group card-hover overflow-hidden">
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={profile.images[0]}
                  alt={profile.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {profile.verified && (
                    <div className="verified-badge">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </div>
                  )}
                  {profile.isPremium && (
                    <div className="premium-badge">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </div>
                  )}
                </div>

                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white"
                  onClick={() => toggleFavorite(profile.id)}
                >
                  <Heart 
                    className={`h-5 w-5 ${favorites.includes(profile.id) ? 'fill-red-500' : ''}`} 
                  />
                </Button>

                {/* Price Badge */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {formatPrice(profile.pricing.oneShot)}
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{profile.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {profile.location}, {profile.city}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="font-semibold">{profile.rating}</span>
                      <span className="text-muted-foreground ml-1">
                        ({profile.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {profile.description}
                </p>

                {/* Services */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {profile.services.slice(0, 3).map((service) => (
                    <span
                      key={service}
                      className="text-xs bg-muted px-2 py-1 rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                  {profile.services.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{profile.services.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    asChild
                  >
                    <Link href={`/profile/${profile.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            asChild
          >
            <Link href="/listings">
              View All Profiles
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
} 