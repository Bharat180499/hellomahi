"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Star, Phone, Mail, MapPin, CheckCircle, ArrowUp, ArrowDown, Check, Check, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Grid3X3, List, Search, Filter, Star, MapPin, CheckCircle, Phone, Mail, X, ArrowUp, ArrowDown, Info } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { agencies } from '@/lib/api/agencies'
import type { Agency } from '@/types/agency'

export default function AgenciesPage() {
  const [agenciesList, setAgenciesList] = useState<Agency[]>([])
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState<'rating' | 'revenue' | 'name' | 'bookings'>('rating')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const services = [
    'Companionship',
    'Dinner Dates',
    'Travel Companion',
    'VIP Services',
    'Corporate Functions',
    'International Travel',
    'Luxury Services'
  ]

  const locations = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Pune',
    'Kolkata',
    'Ahmedabad'
  ]

  useEffect(() => {
    loadAgencies()
  }, [])

  useEffect(() => {
    filterAndSortAgencies()
  }, [agenciesList, searchTerm, selectedLocation, selectedService, minRating, sortBy, sortOrder])

  const loadAgencies = async () => {
    setIsLoading(true)
    try {
      // For now, use mock data
      const mockAgencies = agencies.getMockAgencies()
      setAgenciesList(mockAgencies)
    } catch {
      console.error('Error loading agencies:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterAndSortAgencies = () => {
    let filtered = [...agenciesList]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(agency =>
        agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agency.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agency.address.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter(agency =>
        agency.address.city.toLowerCase() === selectedLocation.toLowerCase()
      )
    }

    // Service filter
    if (selectedService) {
      filtered = filtered.filter(agency =>
        agency.services_offered.some(service =>
          service.toLowerCase().includes(selectedService.toLowerCase())
        )
      )
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(agency => agency.rating >= minRating)
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case 'rating':
          aValue = a.rating
          bValue = b.rating
          break
        case 'revenue':
          aValue = a.total_bookings * 15000
          bValue = b.total_bookings * 15000
          break
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'bookings':
          aValue = a.total_bookings
          bValue = b.total_bookings
          break
        default:
          aValue = a.rating
          bValue = b.rating
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredAgencies(filtered)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedLocation('')
    setSelectedService('')
    setMinRating(0)
  }

  const getSortIcon = () => {
    return sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Find Premium Escort Agencies</h1>
          <p className="text-xl text-muted-foreground">
            Discover verified and professional escort agencies across India
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search agencies by name, location, or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
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

          {/* Filters Panel */}
          {showFilters && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Location Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">All Locations</option>
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Service Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Service</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">All Services</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Minimum Rating</label>
                    <select
                      value={minRating}
                      onChange={(e) => setMinRating(Number(e.target.value))}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value={0}>Any Rating</option>
                      <option value={4.5}>4.5+ Stars</option>
                      <option value={4.0}>4.0+ Stars</option>
                      <option value={3.5}>3.5+ Stars</option>
                    </select>
                  </div>

                  {/* Sort Options */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Sort By</label>
                    <div className="flex gap-2">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="flex-1 p-2 border rounded-md"
                      >
                        <option value="rating">Rating</option>
                        <option value="revenue">Revenue</option>
                        <option value="name">Name</option>
                        <option value="bookings">Bookings</option>
                      </select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      >
                        {getSortIcon()}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    {filteredAgencies.length} agencies found
                  </span>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Agencies Grid/List */}
        {filteredAgencies.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No agencies found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }>
            {filteredAgencies.map((agency) => (
              <Card key={agency.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  {/* Agency Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{agency.name}</h3>
                        {agency.verification_status === 'verified' && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {agency.featured && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{agency.address.city}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span>{agency.rating}</span>
                          <span>({agency.review_count})</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Agency Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {agency.description}
                  </p>

                  {/* Services */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {agency.services_offered.slice(0, 3).map((service) => (
                        <Badge key={service} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {agency.services_offered.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{agency.services_offered.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <div className="text-lg font-semibold">{agency.total_escorts}</div>
                      <div className="text-xs text-muted-foreground">Escorts</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{agency.total_bookings}</div>
                      <div className="text-xs text-muted-foreground">Bookings</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">₹{(agency.total_bookings * 15000 / 1000000).toFixed(1)}M</div>
                      <div className="text-xs text-muted-foreground">Revenue</div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      <span>{agency.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      <span>{agency.email}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm" onClick={() => window.open(`/agencies/${agency.slug}`, '_self')}>
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => window.open(`mailto:${agency.email}?subject=Inquiry about ${agency.name}`, '_self')}>
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredAgencies.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" onClick={() => alert('Loading more agencies...')}>
              Load More Agencies
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
} 