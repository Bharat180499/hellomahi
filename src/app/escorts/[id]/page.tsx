"use client"


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star, Heart, Phone, Mail, MapPin, Clock, Calendar, CheckCircle, MessageCircle, Play, Shield, ArrowLeft, Share2, Check, Download, Search, Eye, Sun, Video, Info } from 'lucide-react'
import { useParams } from 'next/navigation'
import Image from 'next/image'


import Header from '@/components/Header'
import Footer from '@/components/Footer'

import type { Escort } from '@/types/escort'

export default function EscortProfilePage() {
  const params = useParams()
  const escortId = params.id as string
  
  const [escort, setEscort] = useState<Escort | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  

  // Mock escort data
  const mockEscort: Escort = {
    id: escortId,
    user_id: 'user1',
    name: 'Priya Sharma',
    age: 25,
    height: 165,
    weight: 55,
    measurements: '34-26-36',
    hair_color: 'Black',
    eye_color: 'Brown',
    ethnicity: 'Indian',
    languages: ['English', 'Hindi', 'Marathi'],
    services: [
      {
        id: '1',
        name: 'Companionship',
        description: 'Professional companionship service for social events and gatherings',
        category: 'companionship',
        duration: 60,
        price: 15000,
        currency: 'INR',
        is_available: true
      },
      {
        id: '2',
        name: 'Dinner Date',
        description: 'Elegant dinner companionship for special occasions',
        category: 'companionship',
        duration: 120,
        price: 25000,
        currency: 'INR',
        is_available: true
      },
      {
        id: '3',
        name: 'Travel Companion',
        description: 'Professional travel companion for business or leisure trips',
        category: 'travel',
        duration: 480,
        price: 50000,
        currency: 'INR',
        is_available: true
      }
    ],
    rates: [],
    locations: [
      {
        id: '1',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        is_available: true
      },
      {
        id: '2',
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India',
        is_available: true,
        travel_cost: 5000
      }
    ],
    availability: [
      {
        id: '1',
        day_of_week: 1,
        start_time: '10:00',
        end_time: '22:00',
        is_available: true
      },
      {
        id: '2',
        day_of_week: 2,
        start_time: '10:00',
        end_time: '22:00',
        is_available: true
      },
      {
        id: '3',
        day_of_week: 3,
        start_time: '10:00',
        end_time: '22:00',
        is_available: true
      },
      {
        id: '4',
        day_of_week: 4,
        start_time: '10:00',
        end_time: '22:00',
        is_available: true
      },
      {
        id: '5',
        day_of_week: 5,
        start_time: '10:00',
        end_time: '22:00',
        is_available: true
      },
      {
        id: '6',
        day_of_week: 6,
        start_time: '12:00',
        end_time: '00:00',
        is_available: true
      },
      {
        id: '7',
        day_of_week: 0,
        start_time: '12:00',
        end_time: '00:00',
        is_available: true
      }
    ],
    photos: [
      {
        id: '1',
        url: '/images/escorts/priya-sharma/image1.webp',
        thumbnail_url: '/images/escorts/priya-sharma/image1.webp',
        alt_text: 'Priya Sharma - Professional Portrait',
        is_primary: true,
        is_verified: true,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        url: '/images/escorts/priya-sharma/image2.webp',
        thumbnail_url: '/images/escorts/priya-sharma/image2.webp',
        alt_text: 'Priya Sharma - Casual Look',
        is_primary: false,
        is_verified: true,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '3',
        url: '/images/escorts/priya-sharma/image3.webp',
        thumbnail_url: '/images/escorts/priya-sharma/image3.webp',
        alt_text: 'Priya Sharma - Evening Dress',
        is_primary: false,
        is_verified: true,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    videos: [
      {
        id: '1',
        url: '/videos/escorts/priya-sharma/intro.mp4',
        thumbnail_url: '/images/escorts/priya-sharma/video-thumb.jpg',
        title: 'Introduction Video',
        duration: 30,
        is_verified: true,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    documents: [
      {
        id: '1',
        type: 'id_proof',
        url: '/documents/escorts/priya-sharma/id-proof.pdf',
        filename: 'ID_Proof.pdf',
        file_size: 2048576,
        is_verified: true,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    bio: 'Professional and discreet companion with a warm personality. I specialize in providing high-quality companionship services for business events, social gatherings, and special occasions. With years of experience in the industry, I ensure a memorable and professional experience for all my clients.',
    special_offers: [
      'First-time client discount: 10% off',
      'Weekday special rates',
      'Extended booking discounts'
    ],
    verification_status: 'verified',
    status: 'active',
    featured: true,
    rating: 4.8,
    review_count: 45,
    view_count: 1250,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }

  useEffect(() => {
    loadEscort()
  }, [escortId])

  const loadEscort = async () => {
    setIsLoading(true)
    try {
      // For now, use mock data
      // const response = await escorts.getById(escortId)
      // setEscort(response)
      
      setEscort(mockEscort)
      escorts.incrementViews(escortId)
    } catch {
      console.error('Error loading escort:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFavoriteToggle = async () => {
    try {
      const success = await escorts.toggleFavorite(escortId)
      if (success) {
        setIsFavorite(!isFavorite)
      }
    } catch {
      console.error('Error toggling favorite:', error)
    }
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

  if (!escort) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Escort not found</h3>
              <p className="text-muted-foreground">
                The escort profile you're looking for doesn't exist.
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
          Back to Search
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Photo Gallery */}
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Main Photo */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                    {escort.photos[selectedPhoto] ? (
                      <Image
                        src={escort.photos[selectedPhoto].url}
                        alt={escort.photos[selectedPhoto].alt_text}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No photo available</span>
                      </div>
                    )}
                    
                    {/* Verification Badge */}
                    {escort.verification_status === 'verified' && (
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-green-500 text-white">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    )}

                    {/* Featured Badge */}
                    {escort.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}

                    {/* Video Play Button */}
                    {escort.videos.length > 0 && (
                      <div className="absolute bottom-4 right-4">
                        <Button size="sm" className="bg-black/50 hover:bg-black/70">
                          <Play className="h-4 w-4 mr-1" />
                          Watch Video
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Gallery */}
                  {escort.photos.length > 1 && (
                    <div className="p-4">
                      <div className="flex space-x-2 overflow-x-auto">
                        {escort.photos.map((photo, index) => (
                          <button
                            key={photo.id}
                            onClick={() => setSelectedPhoto(index)}
                            className={`flex-shrink-0 w-20 h-20 relative overflow-hidden rounded-lg border-2 ${
                              index === selectedPhoto ? 'border-primary' : 'border-gray-200'
                            }`}
                          >
                            <Image
                              src={photo.thumbnail_url}
                              alt={photo.alt_text}
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Profile Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Basic Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>About {escort.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{escort.bio}</p>
                  </CardContent>
                </Card>

                {/* Physical Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Physical Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Age</label>
                        <p className="text-lg font-semibold">{escort.age} years</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Height</label>
                        <p className="text-lg font-semibold">{escort.height} cm</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Weight</label>
                        <p className="text-lg font-semibold">{escort.weight} kg</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Measurements</label>
                        <p className="text-lg font-semibold">{escort.measurements}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Hair Color</label>
                        <p className="text-lg font-semibold">{escort.hair_color}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Eye Color</label>
                        <p className="text-lg font-semibold">{escort.eye_color}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Ethnicity</label>
                        <p className="text-lg font-semibold">{escort.ethnicity}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Languages</label>
                        <p className="text-lg font-semibold">{escort.languages.join(', ')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Special Offers */}
                {escort.special_offers.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Special Offers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {escort.special_offers.map((offer, index) => (
                          <li key={index} className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-2" />
                            <span>{offer}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="services" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Services & Rates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {escort.services.map((service) => (
                        <div key={service.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-lg">{service.name}</h4>
                            <Badge variant="outline">{service.category}</Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{service.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {service.duration} minutes
                              </span>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-primary">
                                ₹{service.price.toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-500">per session</p>
                            </div>
                          </div>
                        </div>
                      ))}
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
                        <span className="text-3xl font-bold ml-2">{escort.rating}</span>
                        <span className="text-gray-500 ml-2">/ 5</span>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Based on {escort.review_count} reviews
                      </p>
                      <Button variant="outline">
                        Read All Reviews
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="availability" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {escort.availability.map((slot) => (
                        <div key={slot.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{getDayName(slot.day_of_week)}</h4>
                            <p className="text-sm text-gray-500">
                              {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                            </p>
                          </div>
                          <Badge variant={slot.is_available ? "default" : "secondary"}>
                            {slot.is_available ? "Available" : "Unavailable"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold mb-2">{escort.name}</h1>
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium ml-1">{escort.rating}</span>
                    </div>
                    <span className="text-gray-500">({escort.review_count} reviews)</span>
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{escort.locations.map(loc => loc.city).join(', ')}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleFavoriteToggle}>
                    <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-3" />
                    <span className="text-sm">Contact via platform</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-3" />
                    <span className="text-sm">Message via chat</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-gray-500 mr-3" />
                    <span className="text-sm">Verified profile</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Profile Views</span>
                    <span className="font-medium">{escort.view_count.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Member Since</span>
                    <span className="font-medium">
                      {new Date(escort.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Response Rate</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Response Time</span>
                    <span className="font-medium">Within 1 hour</span>
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