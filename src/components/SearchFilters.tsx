"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Filter, 
  MapPin, 
  DollarSign, 
  Star,
  Shield,
  Crown,
  X,
  Lock,
  ArrowRight
} from 'lucide-react'

export default function SearchFilters() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState({
    location: '',
    priceRange: '',
    rating: '',
    verified: false,
    premium: false,
    services: [] as string[]
  })

  const services = [
    'Massage', 'Companionship', 'Dinner Date', 'Travel', 
    'Outcall', 'Incall', 'VIP Service', 'Party'
  ]

  const toggleService = (service: string) => {
    setFilters(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const clearFilters = () => {
    setFilters({
      location: '',
      priceRange: '',
      rating: '',
      verified: false,
      premium: false,
      services: []
    })
  }

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Premium Search Features</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Hide' : 'Show'} Features
              </Button>
            </div>
          </CardHeader>

          {isExpanded && (
            <CardContent className="space-y-6">
              {/* Basic Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Location</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city or area"
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Price Range</span>
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Any Price</option>
                    <option value="0-5000">₹0 - ₹5,000</option>
                    <option value="5000-10000">₹5,000 - ₹10,000</option>
                    <option value="10000-20000">₹10,000 - ₹20,000</option>
                    <option value="20000-50000">₹20,000 - ₹50,000</option>
                    <option value="50000+">₹50,000+</option>
                  </select>
                </div>

                {/* Rating */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <Star className="h-4 w-4" />
                    <span>Minimum Rating</span>
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Any Rating</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>
              </div>

              {/* Verification Filters */}
              <div className="flex flex-wrap gap-4">
                <Button
                  variant={filters.verified ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilters(prev => ({ ...prev, verified: !prev.verified }))}
                  className="flex items-center space-x-2"
                >
                  <Shield className="h-4 w-4" />
                  <span>Verified Only</span>
                </Button>

                <Button
                  variant={filters.premium ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilters(prev => ({ ...prev, premium: !prev.premium }))}
                  className="flex items-center space-x-2"
                >
                  <Crown className="h-4 w-4" />
                  <span>Premium Only</span>
                </Button>
              </div>

              {/* Services */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Services</label>
                <div className="flex flex-wrap gap-2">
                  {services.map((service) => (
                    <Button
                      key={service}
                      variant={filters.services.includes(service) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleService(service)}
                    >
                      {service}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Premium Access Notice */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Lock className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-1">Premium Access Required</h4>
                    <p className="text-sm text-purple-700 mb-3">
                      These advanced search features and escort profiles are available exclusively to premium clients. 
                      Join our membership to access verified escorts and advanced filtering options.
                    </p>
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      asChild
                    >
                      <Link href="/plans?type=user">
                        Get Premium Access
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Clear All</span>
                </Button>

                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-600"
                  asChild
                >
                  <Link href="/plans?type=user">
                    Get Premium Access
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </section>
  )
} 