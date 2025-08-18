"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, Star, Eye, X, MapPin, Crown, Lock, Unlock, Info } from 'lucide-react'
import { useMemo, useState } from 'react'

import Pagination from '@/components/Pagination'

import Link from 'next/link'

interface City {
  slug: string
  name: string
  state: string
}

interface CityPageClientProps {
  city: City
}

const mockEscorts = [
  {
    id: '1',
    name: 'Priya Sharma',
    slug: 'priya-sharma-mumbai',
    age: 24,
    city: 'Mumbai',
    type: 'independent',
    photo: '/images/escorts/priya-sharma/image1.webp',
    verified: true,
    rating: 4.8,
    reviews: 127,
    services: ['Dinner Dates', 'Social Events', 'Private Time', 'Travel Companion', 'Overnight'],
    pricing: { oneShot: 15000, twoShot: 25000, threeShot: 35000, fullNight: 50000 }
  },
  {
    id: '2',
    name: 'Riya Patel',
    slug: 'riya-patel-mumbai',
    age: 26,
    city: 'Mumbai',
    type: 'agency',
    agencyName: 'Elite Escorts',
    photo: '/images/escorts/riya-patel/image1.webp',
    verified: true,
    rating: 4.9,
    reviews: 89,
    services: ['Corporate Events', 'Private Time', 'Travel Companion', 'Social Functions', 'Weekend Getaways'],
    pricing: { oneShot: 20000, twoShot: 35000, threeShot: 45000, fullNight: 65000 }
  },
  {
    id: '3',
    name: 'Meera Nair',
    slug: 'meera-nair-delhi',
    age: 23,
    city: 'Delhi',
    type: 'independent',
    photo: '/images/escorts/meera-nair/image1.webp',
    verified: true,
    rating: 4.7,
    reviews: 65,
    services: ['Dinner Dates', 'Private Time', 'Overnight', 'Weekend Trips'],
    pricing: { oneShot: 12000, twoShot: 20000, threeShot: 28000, fullNight: 40000 }
  },
  {
    id: '4',
    name: 'Ananya Rao',
    slug: 'ananya-rao-bangalore',
    age: 25,
    city: 'Bangalore',
    type: 'agency',
    agencyName: 'Royal Companions',
    photo: '/images/escorts/ananya-rao/image1.webp',
    verified: true,
    rating: 4.6,
    reviews: 156,
    services: ['VIP Services', 'Travel Companion', 'Corporate Events', 'Exclusive Parties'],
    pricing: { oneShot: 25000, twoShot: 40000, threeShot: 55000, fullNight: 75000 }
  },
  {
    id: '5',
    name: 'Pooja Dessai',
    slug: 'pooja-dessai-goa',
    age: 23,
    city: 'Mumbai',
    type: 'independent',
    photo: '/images/escorts/pooja-dessai/image1.webp',
    verified: true,
    rating: 4.5,
    reviews: 78,
    services: ['Dinner Dates', 'Social Events', 'Beach Parties', 'Tourist Guide'],
    pricing: { oneShot: 10000, twoShot: 18000, threeShot: 25000, fullNight: 35000 }
  },
  {
    id: '6',
    name: 'Simran Kaur',
    slug: 'simran-kaur-delhi',
    age: 27,
    city: 'Delhi',
    type: 'agency',
    agencyName: 'Premium Partners',
    photo: '/images/escorts/simran-kaur/image1.webp',
    verified: true,
    rating: 4.4,
    reviews: 92,
    services: ['Corporate Events', 'VIP Services', 'Diplomatic Meetings', 'Cultural Events'],
    pricing: { oneShot: 18000, twoShot: 30000, threeShot: 40000, fullNight: 55000 }
  }
]

// City-specific content data
const cityContent = {
  mumbai: {
    description: "Mumbai, the financial capital of India, offers a vibrant nightlife and premium escort services. From the upscale areas of Bandra and Juhu to the corporate hubs of Andheri and Powai, our verified escorts provide discreet and professional companionship services.",
    popularAreas: [
      { name: 'Bandra West', description: 'Upscale residential area with premium hotels and restaurants' },
      { name: 'Juhu', description: 'Beachfront location with luxury accommodations' },
      { name: 'Andheri', description: 'Corporate hub with business-friendly hotels' },
      { name: 'Powai', description: 'Educational and IT hub with modern facilities' },
      { name: 'Worli', description: 'Premium residential area with high-end services' }
    ],
    safetyTips: [
      'Always verify escort profiles before booking',
      'Meet in public places initially',
      'Use secure payment methods',
      'Keep personal information private',
      'Report any suspicious activity'
    ],
    localInfo: {
      bestTime: 'Evening to late night',
      advanceBooking: '24-48 hours recommended',
      popularServices: ['Dinner Dates', 'Corporate Events', 'Travel Companion'],
      averagePrice: '₹15,000 - ₹50,000'
    }
  },
  delhi: {
    description: "Delhi, the capital city, offers a mix of traditional charm and modern luxury. Our verified escorts serve areas from the historic Connaught Place to the upscale South Extension and Greater Kailash.",
    popularAreas: [
      { name: 'Connaught Place', description: 'Historic center with luxury hotels and shopping' },
      { name: 'South Extension', description: 'Upscale residential and commercial area' },
      { name: 'Greater Kailash', description: 'Premium residential area with fine dining' },
      { name: 'Vasant Vihar', description: 'Diplomatic area with international standards' },
      { name: 'Hauz Khas', description: 'Trendy area with modern cafes and boutiques' }
    ],
    safetyTips: [
      'Choose verified escorts only',
      'Meet in well-lit public areas',
      'Use our secure messaging system',
      'Verify escort identity',
      'Follow local guidelines'
    ],
    localInfo: {
      bestTime: 'Evening to midnight',
      advanceBooking: '12-24 hours recommended',
      popularServices: ['Social Events', 'Corporate Functions', 'VIP Services'],
      averagePrice: '₹12,000 - ₹45,000'
    }
  }
}

export default function CityPageClient({ city }: CityPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedRating, setSelectedRating] = useState<string>('all')
  const [selectedService, setSelectedService] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('rating')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const cityEscorts = mockEscorts.filter(escort => 
    escort.city.toLowerCase() === city.name.toLowerCase()
  )

  const cityInfo = cityContent[city.slug as keyof typeof cityContent]

  // Filter and search logic
  const filteredEscorts = useMemo(() => {
    let filtered = cityEscorts

    // Search by name
    if (searchTerm) {
      filtered = filtered.filter(escort =>
        escort.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (escort.agencyName && escort.agencyName.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(escort => escort.type === selectedType)
    }

    // Filter by rating
    if (selectedRating !== 'all') {
      const minRating = parseFloat(selectedRating)
      filtered = filtered.filter(escort => escort.rating >= minRating)
    }

    // Filter by service
    if (selectedService !== 'all') {
      filtered = filtered.filter(escort => escort.services.includes(selectedService))
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'reviews':
          return b.reviews - a.reviews
        case 'price':
          return a.pricing.oneShot - b.pricing.oneShot
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return filtered
  }, [cityEscorts, searchTerm, selectedType, selectedRating, selectedService, sortBy])

  const independentCount = cityEscorts.filter(e => e.type === 'independent').length
  const agencyCount = cityEscorts.filter(e => e.type === 'agency').length

  const allServices = Array.from(new Set(cityEscorts.flatMap(e => e.services)))

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedType('all')
    setSelectedRating('all')
    setSelectedService('all')
    setSortBy('rating')
  }

  const hasActiveFilters = searchTerm || selectedType !== 'all' || selectedRating !== 'all' || selectedService !== 'all'

  // Pagination logic
  const totalPages = Math.ceil(filteredEscorts.length / itemsPerPage)
  const paginatedEscorts = filteredEscorts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedType, selectedRating, selectedService, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {city.name} Escorts
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Premium escort services in {city.name}, {city.state}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-white mb-2">
                  {cityEscorts.length}
                </div>
                <div className="text-gray-300">Total Escorts</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-white mb-2">
                  {independentCount}
                </div>
                <div className="text-gray-300">Independent</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-white mb-2">
                  {agencyCount}
                </div>
                <div className="text-gray-300">Agency</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Link href="/plans">
                  <Crown className="mr-2 h-5 w-5" />
                  Get Premium Access
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                <MapPin className="mr-2 h-5 w-5" />
                View All Cities
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* City Information Section */}
      {cityInfo && (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* City Description */}
            <div className="lg:col-span-2">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">About {city.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {cityInfo.description}
                  </p>
                  
                  {/* Local Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-semibold mb-3">Local Information</h4>
                      <div className="space-y-2 text-gray-300">
                        <div><strong>Best Time:</strong> {cityInfo.localInfo.bestTime}</div>
                        <div><strong>Advance Booking:</strong> {cityInfo.localInfo.advanceBooking}</div>
                        <div><strong>Average Price:</strong> {cityInfo.localInfo.averagePrice}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-3">Popular Services</h4>
                      <div className="flex flex-wrap gap-2">
                        {cityInfo.localInfo.popularServices.map(service => (
                          <Badge key={service} variant="outline" className="text-purple-400 border-purple-500">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Safety Tips */}
            <div>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Safety Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {cityInfo.safetyTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <span className="text-green-400 mt-1">•</span>
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Popular Areas */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Popular Areas in {city.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cityInfo.popularAreas.map((area) => (
                  <div key={area.name} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h4 className="text-white font-semibold mb-2">{area.name}</h4>
                    <p className="text-gray-400 text-sm">{area.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search and Filters Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search escorts by name or agency..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="border-red-500/20 text-red-400 hover:bg-red-500/10"
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Escort Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="independent">Independent</SelectItem>
                  <SelectItem value="agency">Agency</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Minimum Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Rating</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  <SelectItem value="4.0">4.0+ Stars</SelectItem>
                  <SelectItem value="3.5">3.5+ Stars</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {allServices.map(service => (
                    <SelectItem key={service} value={service}>{service}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                  <SelectItem value="price">Lowest Price</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Results Summary */}
          <div className="flex items-center justify-between text-white">
            <div>
              Showing {filteredEscorts.length} of {cityEscorts.length} escorts
              {hasActiveFilters && (
                <span className="text-gray-400 ml-2">(filtered)</span>
              )}
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4 mr-1" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Premium Notice */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-6 max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Lock className="h-6 w-6 text-white" />
            <h3 className="text-xl font-bold text-white">Premium Access Required</h3>
          </div>
          <p className="text-white/90">
            Contact details, full photos, and messaging are available with premium plans
          </p>
        </div>

        {/* Escorts Grid */}
        {filteredEscorts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedEscorts.map((escort) => (
                <Card key={escort.id} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      {/* Show escort photo clearly (not blurred) */}
                      <div 
                        className="w-full h-64"
                        style={{
                          backgroundImage: `url(${escort.photo})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge variant={escort.type === 'independent' ? 'default' : 'secondary'}>
                          {escort.type === 'independent' ? 'Independent' : 'Agency'}
                        </Badge>
                        {escort.verified && (
                          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500">
                            Verified
                          </Badge>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="absolute top-3 right-3 bg-black/50 rounded-full px-2 py-1">
                        <div className="flex items-center gap-1 text-white text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{escort.rating}</span>
                        </div>
                      </div>

                      {/* Premium Contact Overlay - Small banner at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-3 px-4">
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm">View Profile</span>
                          <div className="flex items-center gap-1">
                            <Lock className="h-3 w-3 text-amber-400" />
                            <span className="text-amber-400 text-xs font-medium">Premium to Contact</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-white text-lg mb-1">
                          {escort.name}
                        </CardTitle>
                        <p className="text-gray-400 text-sm">
                          {escort.age} years • {escort.city}
                        </p>
                        {escort.type === 'agency' && escort.agencyName && (
                          <p className="text-purple-400 text-sm font-medium">
                            {escort.agencyName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <span>{escort.reviews} reviews</span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {escort.pricing.oneShot.toLocaleString()}₹+
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {escort.services.slice(0, 2).map((service, index) => (
                        <Badge key={index} variant="outline" className="justify-center text-xs text-gray-300 border-gray-600">
                          {service}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        asChild 
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        <Link href={`/escorts/${escort.slug}`}>
                          View Profile
                        </Link>
                      </Button>
                      <Button 
                        asChild 
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      >
                        <Link href="/plans">
                          <Lock className="mr-1 h-3 w-3" />
                          Contact
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={filteredEscorts.length}
                  itemsPerPage={itemsPerPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No escorts found</h3>
              <p className="text-gray-400 mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={clearFilters} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Clear All Filters
              </Button>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Connect?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get premium access to contact {filteredEscorts.length} verified escorts in {city.name}. 
              Unlock full profiles, contact details, and messaging features.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Link href="/plans">
                <Crown className="mr-2 h-5 w-5" />
                Choose Your Plan
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 