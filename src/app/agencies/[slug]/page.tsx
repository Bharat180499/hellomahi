"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star, Heart, User, Users, Phone, Mail, MapPin, Clock, Calendar, CheckCircle, MessageCircle, Shield, Award, TrendingUp, ArrowLeft, Globe, Share2, Check, Check, Star, Calendar, Shield, MessageCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, CheckCircle, Award, Users, Star, Phone, Mail, MapPin, Globe, Clock, Shield, Heart, Share2, MessageCircle, Calendar, TrendingUp } from 'lucide-react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { agencies } from '@/lib/api/agencies'
import type { Agency } from '@/types/agency'

export default function AgencyProfilePage() {
  const params = useParams()
  const agencySlug = params.slug as string
  
  const [agency, setAgency] = useState<Agency | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  

  // Mock agency data
  const mockAgency: Agency = {
    id: '1',
    user_id: 'user1',
    name: 'Elite Companions Agency',
    slug: agencySlug,
    description: 'Premium escort agency providing high-quality companionship services across major cities in India. We specialize in luxury companionship, corporate events, and international travel services. Our escorts are carefully selected, professionally trained, and committed to providing exceptional experiences.',
    logo_url: '/images/agencies/elite-logo.png',
    banner_url: '/images/agencies/elite-banner.jpg',
    website_url: 'https://elitecompanions.com',
    phone: '+91-9876543210',
    email: 'info@elitecompanions.com',
    address: {
      street: '123 Luxury Lane, Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      postal_code: '400001'
    },
    contact_person: {
      name: 'Priya Sharma',
      email: 'priya@elitecompanions.com',
      phone: '+91-9876543210',
      role: 'Director'
    },
    business_hours: [
      { id: '1', day_of_week: 1, open_time: '09:00', close_time: '22:00', is_open: true },
      { id: '2', day_of_week: 2, open_time: '09:00', close_time: '22:00', is_open: true },
      { id: '3', day_of_week: 3, open_time: '09:00', close_time: '22:00', is_open: true },
      { id: '4', day_of_week: 4, open_time: '09:00', close_time: '22:00', is_open: true },
      { id: '5', day_of_week: 5, open_time: '09:00', close_time: '22:00', is_open: true },
      { id: '6', day_of_week: 6, open_time: '10:00', close_time: '00:00', is_open: true },
      { id: '7', day_of_week: 0, open_time: '10:00', close_time: '00:00', is_open: true }
    ],
    services_offered: [
      'Companionship',
      'Dinner Dates',
      'Travel Companion',
      'VIP Services',
      'Corporate Functions',
      'International Travel',
      'Luxury Services',
      'Event Hosting'
    ],
    specializations: [
      'Luxury',
      'Corporate',
      'International',
      'High-end',
      'Discrete',
      'Professional'
    ],
    languages_supported: [
      'English',
      'Hindi',
      'Marathi',
      'Gujarati',
      'French',
      'German'
    ],
    payment_methods: [
      'Credit Card',
      'Bank Transfer',
      'Cash',
      'Digital Wallets',
      'International Transfer'
    ],
    verification_status: 'verified',
    status: 'active',
    featured: true,
    rating: 4.8,
    review_count: 156,
    total_escorts: 25,
    total_bookings: 1247,
    subscription_plan: {
      id: 'premium',
      name: 'Premium Plan',
      price: 50000,
      currency: 'INR',
      billing_cycle: 'monthly',
      features: ['Unlimited Escorts', 'Priority Support', 'Advanced Analytics'],
      max_escorts: 50,
      max_bookings_per_month: 1000,
      is_active: true
    },
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }

  useEffect(() => {
    loadAgency()
  }, [agencySlug])

  const loadAgency = async () => {
    setIsLoading(true)
    try {
      // For now, use mock data
      setAgency(mockAgency)
      agencies.incrementViews(mockAgency.id)
    } catch {
      console.error('Error loading agency:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite)
  }

  const getDayName = (dayOfWeek: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[dayOfWeek]
  }

  const formatTime = (time: string) => {
    return time.replace(':', 'h ')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gray-200 aspect-[4/3] rounded-lg mb-4"></div>
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!agency) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Agency not found</h3>
              <p className="text-muted-foreground">
                The agency profile you're looking for doesn't exist.
              </p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Agencies
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Banner Image */}
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="relative aspect-[3/1] overflow-hidden bg-gray-100">
                  {agency.banner_url ? (
                    <Image
                      src={agency.banner_url}
                      alt={`${agency.name} banner`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-400">No banner available</span>
                    </div>
                  )}
                  
                  {/* Verification Badge */}
                  {agency.verification_status === 'verified' && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-green-500 text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified Agency
                      </Badge>
                    </div>
                  )}

                  {/* Featured Badge */}
                  {agency.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-yellow-500 text-white">
                        <Award className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Agency Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="escorts">Escorts</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* About Agency */}
                <Card>
                  <CardHeader>
                    <CardTitle>About {agency.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{agency.description}</p>
                  </CardContent>
                </Card>

                {/* Services */}
                <Card>
                  <CardHeader>
                    <CardTitle>Services Offered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {agency.services_offered.map((service) => (
                        <div key={service} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Specializations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Specializations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {agency.specializations.map((spec) => (
                        <Badge key={spec} variant="outline">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Languages */}
                <Card>
                  <CardHeader>
                    <CardTitle>Languages Supported</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {agency.languages_supported.map((language) => (
                        <Badge key={language} variant="secondary">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Methods */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {agency.payment_methods.map((method) => (
                        <Badge key={method} variant="outline">
                          {method}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="escorts" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Our Escorts ({agency.total_escorts})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Escort Profiles</h3>
                      <p className="text-gray-600 mb-4">
                        Browse our carefully selected escorts with detailed profiles, photos, and reviews.
                      </p>
                      <Button>
                        View All Escorts
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reviews & Ratings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <div className="flex items-center justify-center mb-4">
                        <Star className="h-8 w-8 text-yellow-500 fill-current" />
                        <span className="text-3xl font-bold ml-2">{agency.rating}</span>
                        <span className="text-gray-500 ml-2">/ 5</span>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Based on {agency.review_count} reviews
                      </p>
                      <Button variant="outline">
                        Read All Reviews
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6">
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-500 mr-3" />
                        <span>{agency.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-500 mr-3" />
                        <span>{agency.email}</span>
                      </div>
                      {agency.website_url && (
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 text-gray-500 mr-3" />
                          <a href={agency.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {agency.website_url}
                          </a>
                        </div>
                      )}
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-gray-500 mr-3 mt-1" />
                        <div>
                          <div>{agency.address.street}</div>
                          <div>{agency.address.city}, {agency.address.state}</div>
                          <div>{agency.address.country} {agency.address.postal_code}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Business Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle>Business Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {agency.business_hours.map((hours) => (
                        <div key={hours.id} className="flex items-center justify-between">
                          <span className="font-medium">{getDayName(hours.day_of_week)}</span>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span className="text-sm">
                              {hours.is_open 
                                ? `${formatTime(hours.open_time)} - ${formatTime(hours.close_time)}`
                                : 'Closed'
                              }
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Person */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Person</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div><strong>Name:</strong> {agency.contact_person.name}</div>
                      <div><strong>Role:</strong> {agency.contact_person.role}</div>
                      <div><strong>Email:</strong> {agency.contact_person.email}</div>
                      <div><strong>Phone:</strong> {agency.contact_person.phone}</div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agency Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  {agency.logo_url && (
                    <div className="w-20 h-20 mx-auto mb-4 relative">
                      <Image
                        src={agency.logo_url}
                        alt={`${agency.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h1 className="text-2xl font-bold mb-2">{agency.name}</h1>
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium ml-1">{agency.rating}</span>
                    </div>
                    <span className="text-gray-500">({agency.review_count} reviews)</span>
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{agency.address.city}, {agency.address.state}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Agency
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleFavoriteToggle}>
                    <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Agency Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Agency Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm">Total Escorts</span>
                    </div>
                    <span className="font-semibold">{agency.total_escorts}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Total Bookings</span>
                    </div>
                    <span className="font-semibold">{agency.total_bookings.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="text-sm">Total Revenue</span>
                    </div>
                    <span className="font-semibold">₹{(agency.total_bookings * 15000 / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-orange-500 mr-2" />
                      <span className="text-sm">Commission Rate</span>
                    </div>
                    <span className="font-semibold">15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Agency Verification</span>
                    <Badge variant={agency.verification_status === 'verified' ? 'default' : 'secondary'}>
                      {agency.verification_status === 'verified' ? 'Verified' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Badge variant={agency.status === 'active' ? 'default' : 'secondary'}>
                      {agency.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Member Since</span>
                    <span className="text-sm font-medium">
                      {new Date(agency.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
    )
} 
