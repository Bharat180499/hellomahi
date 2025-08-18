"use client"

import { CardHeader, CardTitle } from '@/components/ui/card'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Filter, X } from 'lucide-react'

import { SlidersHorizontal, Search, Star, DollarSign, Shield, Crown, Award } from 'lucide-react'

interface SearchFilters {
  location: string
  city: string
  state: string
  priceRange: [number, number]
  rating: number
  ageRange: [number, number]
  services: string[]
  availability: string[]
  verificationStatus: string[]
  planType: string[]
  sortBy: string
  viewMode: 'grid' | 'list'
}

const services = [
  'Companionship', 'Massage', 'Dinner Date', 'Travel', 
  'Outcall', 'Incall', 'VIP Service', 'Party', 'Corporate Events',
  'Fashion Shows', 'Photography', 'Dancing', 'Escort', 'Model'
]

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane'
]

const states = [
  'Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Tamil Nadu',
  'West Bengal', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh'
]

export default function AdvancedSearchFilters() {
  const [isExpanded, setIsExpanded] = useState(false)
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

  const [searchTerm, setSearchTerm] = useState('')

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const toggleService = (service: string) => {
    setFilters(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const toggleAvailability = (day: string) => {
    setFilters(prev => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter(d => d !== day)
        : [...prev.availability, day]
    }))
  }

  const toggleVerification = (status: string) => {
    setFilters(prev => ({
      ...prev,
      verificationStatus: prev.verificationStatus.includes(status)
        ? prev.verificationStatus.filter(s => s !== status)
        : [...prev.verificationStatus, status]
    }))
  }

  const togglePlanType = (plan: string) => {
    setFilters(prev => ({
      ...prev,
      planType: prev.planType.includes(plan)
        ? prev.planType.filter(p => p !== plan)
        : [...prev.planType, plan]
    }))
  }

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
    setSearchTerm('')
  }

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
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name, location, or services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filters.verificationStatus.includes('verified') ? 'default' : 'outline'}
          size="sm"
          onClick={() => toggleVerification('verified')}
        >
          <Shield className="h-4 w-4 mr-1" />
          Verified
        </Button>
        <Button
          variant={filters.planType.includes('premium') ? 'default' : 'outline'}
          size="sm"
          onClick={() => togglePlanType('premium')}
        >
          <Crown className="h-4 w-4 mr-1" />
          Premium
        </Button>
        <Button
          variant={filters.rating > 0 ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('rating', filters.rating > 0 ? 0 : 4)}
        >
          <Star className="h-4 w-4 mr-1" />
          4+ Stars
        </Button>
        <Button
          variant={filters.priceRange[1] < 100000 ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('priceRange', filters.priceRange[1] < 100000 ? [0, 100000] : [0, 50000])}
        >
          <DollarSign className="h-4 w-4 mr-1" />
          Under ₹50K
        </Button>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Advanced Filters
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Location Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter location..."
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <select
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <select
                  value={filters.state}
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All States</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium mb-2">Price Range (₹)</label>
              <div className="flex items-center space-x-4">
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

            {/* Age Range */}
            <div>
              <label className="block text-sm font-medium mb-2">Age Range</label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  placeholder="Min Age"
                  value={filters.ageRange[0]}
                  onChange={(e) => handleFilterChange('ageRange', [parseInt(e.target.value) || 18, filters.ageRange[1]])}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="text-muted-foreground">to</span>
                <input
                  type="number"
                  placeholder="Max Age"
                  value={filters.ageRange[1]}
                  onChange={(e) => handleFilterChange('ageRange', [filters.ageRange[0], parseInt(e.target.value) || 50])}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Services */}
            <div>
              <label className="block text-sm font-medium mb-2">Services</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {services.map(service => (
                  <label key={service} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.services.includes(service)}
                      onChange={() => toggleService(service)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium mb-2">Availability</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <label key={day} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.availability.includes(day)}
                      onChange={() => toggleAvailability(day)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{day}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Verification Status */}
            <div>
              <label className="block text-sm font-medium mb-2">Verification Status</label>
              <div className="flex flex-wrap gap-2">
                {['verified', 'premium', 'vip'].map(status => (
                  <Button
                    key={status}
                    variant={filters.verificationStatus.includes(status) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleVerification(status)}
                  >
                    {status === 'verified' && <Shield className="h-4 w-4 mr-1" />}
                    {status === 'premium' && <Crown className="h-4 w-4 mr-1" />}
                    {status === 'vip' && <Award className="h-4 w-4 mr-1" />}
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium">Sort by:</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Rating</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={filters.viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('viewMode', 'grid')}
                >
                  Grid
                </Button>
                <Button
                  variant={filters.viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('viewMode', 'list')}
                >
                  List
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 