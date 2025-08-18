"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, User, Users, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

import { Grid, List, Search, Filter, MapPin, Users, User, Plus, Star, MessageSquare } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EscortCard from '@/components/escort/EscortCard'

import type { Escort, EscortSearchParams, EscortSearchResponse } from '@/types/escort'

export default function EscortsPage() {
  const [searchResults, setSearchResults] = useState<EscortSearchResponse>({
    escorts: [],
    total: 0,
    page: 1,
    limit: 12,
    total_pages: 0,
    filters: {}
  })
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchParams, setSearchParams] = useState<EscortSearchParams>({
    page: 1,
    limit: 12,
    sort_by: 'rating',
    sort_order: 'desc'
  })

  // Mock data for demonstration
  const mockEscorts: Escort[] = [
    {
      id: '1',
      user_id: 'user1',
      name: 'Priya Sharma',
      age: 25,
      height: 165,
      weight: 55,
      measurements: '34-26-36',
      hair_color: 'Black',
      eye_color: 'Brown',
      ethnicity: 'Indian',
      languages: ['English', 'Hindi'],
      services: [
        {
          id: '1',
          name: 'Companionship',
          description: 'Professional companionship service',
          category: 'companionship',
          duration: 60,
          price: 15000,
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
        }
      ],
      availability: [],
      photos: [
        {
          id: '1',
          url: '/images/escorts/priya-sharma/image1.webp',
          thumbnail_url: '/images/escorts/priya-sharma/image1.webp',
          alt_text: 'Priya Sharma',
          is_primary: true,
          is_verified: true,
          created_at: '2024-01-01T00:00:00Z'
        }
      ],
      videos: [],
      documents: [],
      bio: 'Professional and discreet companion with a warm personality.',
      special_offers: [],
      verification_status: 'verified',
      status: 'active',
      featured: true,
      rating: 4.8,
      review_count: 45,
      view_count: 1250,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      user_id: 'user2',
      name: 'Zara Khan',
      age: 23,
      height: 170,
      weight: 58,
      measurements: '36-28-38',
      hair_color: 'Brown',
      eye_color: 'Green',
      ethnicity: 'Mixed',
      languages: ['English', 'Urdu'],
      services: [
        {
          id: '2',
          name: 'Dinner Date',
          description: 'Elegant dinner companionship',
          category: 'companionship',
          duration: 120,
          price: 25000,
          currency: 'INR',
          is_available: true
        }
      ],
      rates: [],
      locations: [
        {
          id: '2',
          city: 'Delhi',
          state: 'Delhi',
          country: 'India',
          is_available: true
        }
      ],
      availability: [],
      photos: [
        {
          id: '2',
          url: '/images/escorts/zara-khan/image1.webp',
          thumbnail_url: '/images/escorts/zara-khan/image1.webp',
          alt_text: 'Zara Khan',
          is_primary: true,
          is_verified: true,
          created_at: '2024-01-01T00:00:00Z'
        }
      ],
      videos: [],
      documents: [],
      bio: 'Sophisticated and elegant companion for special occasions.',
      special_offers: [],
      verification_status: 'verified',
      status: 'active',
      featured: false,
      rating: 4.7,
      review_count: 32,
      view_count: 980,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ]

  useEffect(() => {
    loadEscorts()
  }, [searchParams])

  const loadEscorts = async () => {
    setIsLoading(true)
    try {
      // For now, use mock data
      // const response = await escorts.getAll(searchParams)
      // setSearchResults(response)
      
      // Mock response
      setSearchResults({
        escorts: mockEscorts,
        total: mockEscorts.length,
        page: 1,
        limit: 12,
        total_pages: 1,
        filters: searchParams
      })
    } catch {
      console.error('Error loading escorts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    setSearchParams(prev => ({
      ...prev,
      page: 1,
      // Add search query when backend is ready
    }))
  }

  const handleFilterChange = (filters: Partial<EscortSearchParams>) => {
    setSearchParams(prev => ({
      ...prev,
      ...filters,
      page: 1
    }))
  }

  const handlePageChange = (page: number) => {
    setSearchParams(prev => ({
      ...prev,
      page
    }))
  }

  const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setSearchParams(prev => ({
      ...prev,
      sort_by: sortBy as any,
      sort_order: sortOrder
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Companion</h1>
          <p className="text-muted-foreground">
            Discover verified and professional escorts in your area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Search Bar */}
          <div className="lg:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name, location, or services..."
                className="pl-10"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  onChange={(e) => handleFilterChange({ location: e.target.value })}
                >
                  <option value="">All Locations</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="delhi">Delhi</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="hyderabad">Hyderabad</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-2 block">Price Range</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-')
                    handleFilterChange({ 
                      price_min: min ? parseInt(min) : undefined,
                      price_max: max ? parseInt(max) : undefined
                    })
                  }}
                >
                  <option value="">All Prices</option>
                  <option value="5000-10000">₹5K - ₹10K</option>
                  <option value="10000-20000">₹10K - ₹20K</option>
                  <option value="20000-50000">₹20K - ₹50K</option>
                  <option value="50000-">₹50K+</option>
                </select>
              </div>

              {/* Age Range */}
              <div>
                <label className="text-sm font-medium mb-2 block">Age Range</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-')
                    handleFilterChange({ 
                      age_min: min ? parseInt(min) : undefined,
                      age_max: max ? parseInt(max) : undefined
                    })
                  }}
                >
                  <option value="">All Ages</option>
                  <option value="18-25">18-25</option>
                  <option value="26-35">26-35</option>
                  <option value="36-45">36-45</option>
                  <option value="46-">46+</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-')
                    handleSortChange(sortBy, sortOrder as 'asc' | 'desc')
                  }}
                >
                  <option value="rating-desc">Rating (High to Low)</option>
                  <option value="rating-asc">Rating (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold">
              {isLoading ? 'Loading...' : `${searchResults.total} escorts found`}
            </h2>
            {searchResults.filters.location && (
              <Badge variant="secondary">
                <MapPin className="h-3 w-3 mr-1" />
                {searchResults.filters.location}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{searchResults.total} total escorts</span>
          </div>
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-[4/5] rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : searchResults.escorts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {searchResults.escorts.map((escort) => (
              <EscortCard 
                key={escort.id} 
                escort={escort}
                onView={(id) => console.log('Viewed escort:', id)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No escorts found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters
              </p>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {searchResults.total_pages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-8">
            <Button
              variant="outline"
              disabled={searchResults.page <= 1}
              onClick={() => handlePageChange(searchResults.page - 1)}
            >
              Previous
            </Button>
            
            <span className="text-sm">
              Page {searchResults.page} of {searchResults.total_pages}
            </span>
            
            <Button
              variant="outline"
              disabled={searchResults.page >= searchResults.total_pages}
              onClick={() => handlePageChange(searchResults.page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
} 