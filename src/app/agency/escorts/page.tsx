"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Shield,
  Crown,
  CheckCircle,
  Clock,
  XCircle,
  Star,
  DollarSign,
  Calendar,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Settings,
  Activity,
  Target,
  Award,
  BarChart3,
  ToggleLeft,
  ToggleRight
} from 'lucide-react'
import AgencyNavigation from '@/components/AgencyNavigation'

interface Escort {
  id: string
  name: string
  image: string
  age: number
  city: string
  rating: number
  reviewCount: number
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  isVerified: boolean
  isPremium: boolean
  isActive: boolean
  totalBookings: number

  lastActive: Date
  joinDate: Date
  services: string[]
  price: number
}

export default function AgencyEscortsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'bookings'>('name')

  const [escorts, setEscorts] = useState<Escort[]>([
    {
      id: '1',
      name: 'Priya Sharma',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      age: 25,
      city: 'Mumbai',
      rating: 4.8,
      reviewCount: 127,
      status: 'active',
      isVerified: true,
      isPremium: true,
      isActive: true,
      totalBookings: 45,
  
      lastActive: new Date(),
      joinDate: new Date('2023-06-15'),
      services: ['Companionship', 'Dinner Date', 'Travel'],
      price: 15000
    },
    {
      id: '2',
      name: 'Zara Khan',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      age: 23,
      city: 'Mumbai',
      rating: 4.7,
      reviewCount: 89,
      status: 'active',
      isVerified: true,
      isPremium: false,
      isActive: true,
      totalBookings: 32,
  
      lastActive: new Date(Date.now() - 3600000),
      joinDate: new Date('2023-08-20'),
      services: ['Companionship', 'Massage'],
      price: 12000
    },
    {
      id: '3',
      name: 'Sofia Rodriguez',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      age: 27,
      city: 'Mumbai',
      rating: 4.6,
      reviewCount: 67,
      status: 'pending',
      isVerified: false,
      isPremium: false,
      isActive: false,
      totalBookings: 0,
  
      lastActive: new Date(Date.now() - 86400000),
      joinDate: new Date('2024-01-15'),
      services: ['Companionship', 'VIP Service'],
      price: 18000
    },
    {
      id: '4',
      name: 'Aisha Patel',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      age: 24,
      city: 'Mumbai',
      rating: 4.9,
      reviewCount: 156,
      status: 'active',
      isVerified: true,
      isPremium: true,
      isActive: true,
      totalBookings: 67,
  
      lastActive: new Date(),
      joinDate: new Date('2023-04-10'),
      services: ['Companionship', 'Dinner Date', 'Travel', 'VIP Service'],
      price: 20000
    },
    {
      id: '5',
      name: 'Maya Singh',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
      age: 26,
      city: 'Mumbai',
      rating: 4.5,
      reviewCount: 43,
      status: 'inactive',
      isVerified: false,
      isPremium: false,
      isActive: false,
      totalBookings: 12,
  
      lastActive: new Date(Date.now() - 172800000),
      joinDate: new Date('2023-11-05'),
      services: ['Companionship', 'Massage'],
      price: 10000
    }
  ])

  const toggleEscortStatus = (escortId: string) => {
    setEscorts(prevEscorts => 
      prevEscorts.map(escort => 
        escort.id === escortId 
          ? { ...escort, isActive: !escort.isActive }
          : escort
      )
    )
  }

  const filteredEscorts = escorts.filter(escort => {
    const matchesSearch = escort.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         escort.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || escort.status === statusFilter
    return matchesSearch && matchesStatus
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'rating':
        return b.rating - a.rating
      
      case 'bookings':
        return b.totalBookings - a.totalBookings
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'suspended':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-3 w-3" />
      case 'inactive':
        return <XCircle className="h-3 w-3" />
      case 'pending':
        return <Clock className="h-3 w-3" />
      case 'suspended':
        return <XCircle className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AgencyNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Manage Escorts</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage your escort team and their profiles
            </p>
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/agency/escorts/add">
              <Plus className="h-4 w-4 mr-2" />
              Add New Escort
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Escorts</p>
                  <p className="text-xl sm:text-2xl font-bold">{escorts.length}</p>
                </div>
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Active</p>
                  <p className="text-xl sm:text-2xl font-bold">{escorts.filter(e => e.isActive).length}</p>
                </div>
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Verified</p>
                  <p className="text-xl sm:text-2xl font-bold">{escorts.filter(e => e.isVerified).length}</p>
                </div>
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Premium</p>
                  <p className="text-xl sm:text-2xl font-bold">{escorts.filter(e => e.isPremium).length}</p>
                </div>
                <Crown className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search escorts by name or city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm text-gray-900 bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm text-gray-900 bg-white"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>

                <option value="bookings">Sort by Bookings</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Escorts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredEscorts.map(escort => (
            <Card key={escort.id} className="relative">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={escort.image}
                      alt={escort.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">{escort.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{escort.age} years</span>
                        <span>•</span>
                        <MapPin className="h-3 w-3" />
                        <span>{escort.city}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {escort.isVerified && <Shield className="h-4 w-4 text-blue-600" />}
                    {escort.isPremium && <Crown className="h-4 w-4 text-yellow-600" />}
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{escort.rating}</span>
                      <span className="text-sm text-muted-foreground">({escort.reviewCount})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Bookings</span>
                    <span className="font-medium">{escort.totalBookings}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rate</span>
                    <span className="font-medium">₹{escort.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(escort.status)}`}>
                    {getStatusIcon(escort.status)}
                    <span>{escort.status.charAt(0).toUpperCase() + escort.status.slice(1)}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Joined {escort.joinDate.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">Profile Status:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleEscortStatus(escort.id)}
                      className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                        escort.isActive 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800'
                      }`}
                    >
                      {escort.isActive ? (
                        <>
                          <ToggleRight className="h-3 w-3" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="h-3 w-3" />
                          <span>Inactive</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/agency/escorts/${escort.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/agency/escorts/${escort.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => alert(`Opening chat with ${escort.name}`)}>
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEscorts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No escorts found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Get started by adding your first escort'
                }
              </p>
              <Button asChild>
                <Link href="/agency/escorts/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Escort
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
} 
