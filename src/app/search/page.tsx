"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Star, Heart, Eye, MapPin, MessageCircle, Shield, Crown, SlidersHorizontal, Grid, List, TrendingUp, TrendingDown, Phone, Mail, Share2, Bookmark, ArrowUp, ArrowDown, Filter, Sun } from 'lucide-react'
import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import type { SearchResult, SearchFilters } from '@/types/search'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'price_low' | 'price_high' | 'newest' | 'popular'>('relevance')
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    city: '',
    state: '',
    priceRange: [0, 100000],
    rating: 0,
    ageRange: [18, 50],
    services: [],
    availability: [],
    verificationStatus: [],
    planType: [],
    sortBy: 'relevance',
    viewMode: 'grid'
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Mock search results for demonstration
  const mockSearchResults: SearchResult[] = [
    {
      id: '1',
      type: 'escort',
      name: 'Priya Sharma',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      rating: 4.8,
      reviewCount: 127,
      price: 15000,
      location: 'Mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      services: ['Companionship', 'Dinner Date', 'Massage'],
      isVerified: true,
      isPremium: true,
      isAvailable: true,
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      languages: ['English', 'Hindi', 'Marathi'],
      age: 25,
      height: '5\'6"',
      bodyType: 'Slim',
      hairColor: 'Black',
      eyeColor: 'Brown',
      education: 'Graduate',
      interests: ['Travel', 'Music', 'Dancing'],
      description: 'Professional and elegant companion with excellent communication skills.',
      gallery: [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300'
      ],
      featured: true,
      responseTime: 5,
      completionRate: 98,
      cancellationRate: 2,
      totalBookings: 156,
      lastActive: '2024-01-25T10:30:00Z',
      joinDate: '2023-06-15T00:00:00Z'
    },
    {
      id: '2',
      type: 'escort',
      name: 'Zara Khan',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      rating: 4.7,
      reviewCount: 89,
      price: 12000,
      location: 'Delhi',
      city: 'Delhi',
      state: 'Delhi',
      services: ['Companionship', 'Travel', 'VIP Service'],
      isVerified: true,
      isPremium: false,
      isAvailable: true,
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      languages: ['English', 'Hindi', 'Urdu'],
      age: 28,
      height: '5\'5"',
      bodyType: 'Curvy',
      hairColor: 'Brown',
      eyeColor: 'Green',
      education: 'Post Graduate',
      interests: ['Fashion', 'Photography', 'Cooking'],
      description: 'Sophisticated and charming companion for all occasions.',
      gallery: [
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300'
      ],
      featured: false,
      responseTime: 8,
      completionRate: 95,
      cancellationRate: 5,
      totalBookings: 98,
      lastActive: '2024-01-25T09:15:00Z',
      joinDate: '2023-08-20T00:00:00Z'
    },
    {
      id: '3',
      type: 'escort',
      name: 'Sofia Rodriguez',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      rating: 4.9,
      reviewCount: 203,
      price: 18000,
      location: 'Bangalore',
      city: 'Bangalore',
      state: 'Karnataka',
      services: ['Companionship', 'Dinner Date', 'Party', 'Corporate Events'],
      isVerified: true,
      isPremium: true,
      isAvailable: true,
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      languages: ['English', 'Spanish', 'Hindi'],
      age: 26,
      height: '5\'7"',
      bodyType: 'Athletic',
      hairColor: 'Blonde',
      eyeColor: 'Blue',
      education: 'Graduate',
      interests: ['Fitness', 'Yoga', 'Art'],
      description: 'Energetic and professional companion with international experience.',
      gallery: [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300',
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300'
      ],
      featured: true,
      responseTime: 3,
      completionRate: 99,
      cancellationRate: 1,
      totalBookings: 234,
      lastActive: '2024-01-25T11:45:00Z',
      joinDate: '2023-04-10T00:00:00Z'
    }
  ]

  // Load search results
  const loadSearchResults = async () => {
    setIsLoading(true)
    try {
      // For now, using mock data
      // const response = await searchSystem.search.search({
      //   query: searchQuery,
      //   filters,
      //   page: currentPage,
      //   limit: 20,
      //   userType: 'client'
      // })

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))

      setSearchResults(mockSearchResults)
      setTotalResults(mockSearchResults.length)
      setHasMore(false)
    } catch {
      console.error('Failed to load search results:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1)
    loadSearchResults()
  }

  // Handle filter changes
  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  // Handle service toggle
  const toggleService = (service: string) => {
    setFilters(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  // Handle verification toggle
  const toggleVerification = (status: string) => {
    setFilters(prev => ({
      ...prev,
      verificationStatus: prev.verificationStatus.includes(status)
        ? prev.verificationStatus.filter(s => s !== status)
        : [...prev.verificationStatus, status]
    }))
  }

  // Handle plan type toggle
  const togglePlanType = (plan: string) => {
    setFilters(prev => ({
      ...prev,
      planType: prev.planType.includes(plan)
        ? prev.planType.filter(p => p !== plan)
        : [...prev.planType, plan]
    }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      location: '',
      city: '',
      state: '',
      priceRange: [0, 100000],
      rating: 0,
      ageRange: [18, 50],
      services: [],
      availability: [],
      verificationStatus: [],
      planType: [],
      sortBy: 'relevance',
      viewMode: 'grid'
    })
  }

  // Load initial results
  useEffect(() => {
    loadSearchResults()
  }, [])

  const activeFiltersCount = [
    filters.location,
    filters.city,
    filters.state,
    filters.rating > 0,
    filters.services.length > 0,
    filters.availability.length > 0,
    filters.verificationStatus.length > 0,
    filters.planType.length > 0
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, location, or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  size="sm"
                >
                  Search
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
              
              <div className="flex items-center border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              {isLoading ? 'Searching...' : `${totalResults} results found`}
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="rating">Sort by Rating</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="newest">Sort by Newest</option>
              <option value="popular">Sort by Popularity</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Filters</CardTitle>
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      placeholder="Enter city or area"
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Price Range</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.priceRange[0]}
                        onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <span className="text-muted-foreground">to</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.priceRange[1]}
                        onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 100000])}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Minimum Rating</label>
                    <select
                      value={filters.rating}
                      onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value={0}>Any Rating</option>
                      <option value={4}>4+ Stars</option>
                      <option value={4.5}>4.5+ Stars</option>
                      <option value={5}>5 Stars</option>
                    </select>
                  </div>

                  {/* Verification Status */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Verification</label>
                    <div className="space-y-2">
                      <Button
                        variant={filters.verificationStatus.includes('verified') ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleVerification('verified')}
                        className="w-full justify-start"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Verified Only
                      </Button>
                      <Button
                        variant={filters.planType.includes('premium') ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => togglePlanType('premium')}
                        className="w-full justify-start"
                      >
                        <Crown className="h-4 w-4 mr-2" />
                        Premium Only
                      </Button>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Services</label>
                    <div className="space-y-2">
                      {['Companionship', 'Dinner Date', 'Massage', 'Travel', 'VIP Service', 'Party'].map(service => (
                        <Button
                          key={service}
                          variant={filters.services.includes(service) ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => toggleService(service)}
                          className="w-full justify-start"
                        >
                          {service}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Apply Filters */}
                  <Button onClick={handleSearch} className="w-full">
                    Apply Filters
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Search Results */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : searchResults.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {searchResults.map((result) => (
                  <Card key={result.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <Image
                            src={result.image}
                            alt={result.name}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                          {result.isVerified && (
                            <Badge className="absolute -top-2 -right-2 bg-green-600">
                              <Shield className="h-3 w-3" />
                            </Badge>
                          )}
                          {result.isPremium && (
                            <Badge className="absolute -bottom-2 -left-2 bg-yellow-600">
                              <Crown className="h-3 w-3" />
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg truncate">{result.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span>{result.location}</span>
                                <span>•</span>
                                <span>{result.age} years</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg">₹{result.price.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">per hour</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="font-medium">{result.rating}</span>
                              <span className="text-sm text-muted-foreground">({result.reviewCount})</span>
                            </div>
                            {result.isAvailable && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                Available
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {result.services.slice(0, 3).map(service => (
                              <Badge key={service} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                            {result.services.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{result.services.length - 3} more
                              </Badge>
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {result.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                              <Button size="sm" variant="outline">
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button size="sm">
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {searchResults.length > 0 && (
              <div className="flex items-center justify-between mt-8">
                <p className="text-sm text-muted-foreground">
                  Showing {searchResults.length} of {totalResults} results
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled={currentPage === 1}>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled={!hasMore}>
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 