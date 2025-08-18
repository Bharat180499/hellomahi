import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import VideoVerificationBadge from '@/components/VideoVerificationBadge'
import { formatPrice, formatDate } from '@/lib/utils'
import { Crown, Heart, MapPin, Star, Phone, MessageCircle, Clock, Calendar, Users } from 'lucide-react'

import type { Escort } from '@/types'

// Mock data - in real app this would come from API
const mockProfile: Escort = {
  id: '1',
  slug: 'priya-sharma',
  name: 'Priya',
  age: 25,
  location: 'Bandra West',
  city: 'Mumbai',
  state: 'Maharashtra',
  country: 'India',
  type: 'independent',
  photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800',
  photos: [
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800'
  ],
  pricing: {
    oneShot: 8000,
    twoShot: 12000,
    threeShot: 15000,
    fullNight: 25000,
    currency: 'INR'
  },
  rating: 4.8,
  reviews: 127,
  verified: true,
  isPremium: true,
  isActive: true,
  plan: '30',
  services: ['Companionship', 'Dinner Date', 'Travel', 'VIP Service', 'Party'],
  description: 'Elegant and sophisticated companion for high-end events and private meetings. I specialize in providing discreet, professional companionship services for business executives, tourists, and individuals seeking quality time with a refined companion. With years of experience in the industry, I ensure every encounter is memorable and tailored to your specific needs.',
  images: [
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800'
  ],
  videoVerificationStatus: 'approved',
  identityVerification: {
    documentType: 'aadhar',
    status: 'approved'
  },
  contactInfo: {
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    email: 'priya@example.com'
  },
  availability: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    hours: '10:00 AM - 2:00 AM'
  },
  height: '5\'6"',
  bodyType: 'Slim',
  hairColor: 'Black',
  eyeColor: 'Brown',
  education: 'Graduate',
  interests: ['Travel', 'Music', 'Dancing'],
  languages: ['English', 'Hindi', 'Marathi'],
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-15')
}

// Mock reviews
const mockReviews = [
  {
    id: '1',
    userName: 'Rahul',
    rating: 5,
    comment: 'Amazing experience! Priya is professional, beautiful, and made the evening perfect.',
    date: new Date('2024-01-10')
  },
  {
    id: '2',
    userName: 'Amit',
    rating: 4,
    comment: 'Great companion for business dinner. Very elegant and well-spoken.',
    date: new Date('2024-01-08')
  },
  {
    id: '3',
    userName: 'Vikram',
    rating: 5,
    comment: 'Exceeded all expectations. Highly recommended for premium service.',
    date: new Date('2024-01-05')
  }
]

export default function ProfilePage({ params }: { params: { id: string } }) {
  // In real app, fetch profile data based on params.id
  if (params.id !== '1') {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src={mockProfile.photo}
                alt={mockProfile.name}
                fill
                className="object-cover"
                priority
              />
              
              {/* Overlay Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <VideoVerificationBadge 
                  status={mockProfile.videoVerificationStatus} 
                  size="lg"
                  showDetails={true}
                />
                {mockProfile.isPremium && (
                  <div className="premium-badge">
                    <Crown className="h-4 w-4 mr-1" />
                    Premium
                  </div>
                )}
              </div>

              {/* Favorite Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white"
              >
                <Heart className="h-6 w-6" />
              </Button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 mt-4">
              {mockProfile.photos.slice(1).map((photo, index) => (
                <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden">
                  <Image
                    src={photo}
                    alt={`${mockProfile.name} ${index + 2}`}
                    fill
                    className="object-cover cursor-pointer hover:opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{mockProfile.name}</CardTitle>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {mockProfile.location}, {mockProfile.city}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="font-semibold">{mockProfile.rating}</span>
                                             <span className="text-muted-foreground ml-1">
                         ({mockProfile.reviews} reviews)
                       </span>
                     </div>
                   </div>
                   <div className="text-right">
                     <div className="text-2xl font-bold text-primary">
                       {formatPrice(mockProfile.pricing.oneShot)}
                     </div>
                     <div className="text-sm text-muted-foreground">per hour</div>
                   </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>

                {/* Availability */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="font-medium">Available:</span>
                    <span className="ml-2">{mockProfile.availability.hours}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="font-medium">Days:</span>
                    <span className="ml-2">{mockProfile.availability.days.join(', ')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockProfile.services.map((service) => (
                    <span
                      key={service}
                      className="bg-muted px-3 py-1 rounded-full text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About {mockProfile.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {mockProfile.description}
            </p>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-400" />
              Client Reviews ({mockReviews.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">{review.userName}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review.date)}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 