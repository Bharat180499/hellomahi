"use client"


import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Clock, XCircle, Users, Heart, Star, Search, MoreVertical, MapPin, DollarSign, Eye, MessageCircle, Phone, Calendar } from 'lucide-react'

import UserNavigation from '@/components/UserNavigation'

interface FavoriteEscort {
  id: string
  name: string
  image: string
  slug: string
  rating: number
  reviewCount: number
  location: string
  price: string
  status: 'available' | 'busy' | 'unavailable'
  services: string[]
  languages: string[]
  lastBooked?: string
  isOnline: boolean
  verified: boolean
  phone?: string
}

export default function UserFavoritesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const favoriteEscorts: FavoriteEscort[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      slug: 'priya-sharma',
      rating: 4.8,
      reviewCount: 127,
      location: 'Mumbai',
      price: '₹30,000',
      status: 'available',
      services: ['Dinner Date', 'Social Event', 'Travel Companion'],
      languages: ['English', 'Hindi', 'Marathi'],
      lastBooked: '2 days ago',
      isOnline: true,
      verified: true,
      phone: '+91 98765 43210'
    },
    {
      id: '2',
      name: 'Zara Khan',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      slug: 'zara-khan',
      rating: 4.7,
      reviewCount: 89,
      location: 'Delhi',
      price: '₹45,000',
      status: 'available',
      services: ['Overnight', 'VIP Service', 'Massage'],
      languages: ['English', 'Hindi', 'Urdu'],
      lastBooked: '1 week ago',
      isOnline: false,
      verified: true,
      phone: '+91 98765 43211'
    },
    {
      id: '3',
      name: 'Sofia Rodriguez',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      slug: 'sofia-rodriguez',
      rating: 4.6,
      reviewCount: 156,
      location: 'Bangalore',
      price: '₹35,000',
      status: 'busy',
      services: ['Social Event', 'Party Companion', 'Dinner Date'],
      languages: ['English', 'Spanish', 'Portuguese'],
      lastBooked: '3 days ago',
      isOnline: true,
      verified: true,
      phone: '+91 98765 43212'
    },
    {
      id: '4',
      name: 'Aisha Patel',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      slug: 'aisha-patel',
      rating: 4.5,
      reviewCount: 73,
      location: 'Mumbai',
      price: '₹25,000',
      status: 'available',
      services: ['Massage', 'Companionship', 'Social Event'],
      languages: ['English', 'Hindi', 'Gujarati'],
      isOnline: true,
      verified: false,
      phone: '+91 98765 43213'
    },
    {
      id: '5',
      name: 'Meera Nair',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      slug: 'meera-nair',
      rating: 4.9,
      reviewCount: 203,
      location: 'Chennai',
      price: '₹40,000',
      status: 'unavailable',
      services: ['VIP Service', 'Travel Companion', 'Overnight'],
      languages: ['English', 'Tamil', 'Malayalam'],
      lastBooked: '5 days ago',
      phone: '+91 98765 43214',
      isOnline: false,
      verified: true
    },
    {
      id: '6',
      name: 'Riya Patel',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      slug: 'riya-patel',
      rating: 4.4,
      reviewCount: 45,
      location: 'Hyderabad',
      price: '₹28,000',
      status: 'available',
      services: ['Dinner Date', 'Companionship', 'Social Event'],
      languages: ['English', 'Hindi', 'Telugu'],
      isOnline: true,
      verified: true
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100'
      case 'busy': return 'text-yellow-600 bg-yellow-100'
      case 'unavailable': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'busy': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'unavailable': return <XCircle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredEscorts = favoriteEscorts.filter(escort => {
    const matchesSearch = escort.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         escort.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = selectedLocation === 'all' || escort.location === selectedLocation
    const matchesStatus = selectedStatus === 'all' || escort.status === selectedStatus
    return matchesSearch && matchesLocation && matchesStatus
  })

  const locations = Array.from(new Set(favoriteEscorts.map(escort => escort.location)))

  return (
    <div className="min-h-screen bg-background">
      <UserNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">My Favorites</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Your favorite escorts and companions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 w-full sm:w-auto">
            <Button variant="outline" asChild>
              <Link href="/escorts">
                <Users className="h-4 w-4 mr-2" />
                Browse More
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{favoriteEscorts.length}</p>
              <p className="text-xs text-muted-foreground">Total Favorites</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{favoriteEscorts.filter(e => e.status === 'available').length}</p>
              <p className="text-xs text-muted-foreground">Available Now</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{favoriteEscorts.filter(e => e.status === 'busy').length}</p>
              <p className="text-xs text-muted-foreground">Currently Busy</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{(favoriteEscorts.reduce((sum, e) => sum + e.rating, 0) / favoriteEscorts.length).toFixed(1)}</p>
              <p className="text-xs text-muted-foreground">Avg Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search favorites..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
              >
                <option value="all">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEscorts.map((escort) => (
            <Card key={escort.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <Image
                      src={escort.image}
                      alt={escort.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                    <div className="absolute -bottom-1 -right-1">
                      {getStatusIcon(escort.status)}
                    </div>
                    {escort.isOnline && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4 text-red-500 fill-current" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Info */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{escort.name}</h3>
                    {escort.verified && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{escort.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < escort.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({escort.reviewCount})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-600">{escort.price}</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(escort.status)}`}>
                      {escort.status}
                    </span>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Services</h4>
                  <div className="flex flex-wrap gap-1">
                    {escort.services.slice(0, 3).map((service, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                    {escort.services.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{escort.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Languages</h4>
                  <div className="flex flex-wrap gap-1">
                    {escort.languages.map((language, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button asChild className="flex-1">
                    <Link href={`/escorts/${escort.slug}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => alert(`Opening chat with ${escort.name}`)}>
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.open(`tel:${escort.phone || '+9118001234567'}`, '_self')}>
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>

                {/* Book Button */}
                {escort.status === 'available' && (
                  <Button asChild className="w-full mt-3">
                    <Link href={`/escorts/${escort.slug}`}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Now
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredEscorts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No favorites found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedLocation !== 'all' || selectedStatus !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start by adding escorts to your favorites'
                }
              </p>
              <Button asChild>
                <Link href="/escorts">
                  Browse Escorts
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
} 