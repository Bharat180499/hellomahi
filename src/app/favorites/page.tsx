"use client"




import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Star, Heart, Eye, Edit, Trash2, MapPin, DollarSign, MessageCircle, Upload, Download, Shield, Crown, List, Grid, Filter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Favorite, FavoriteList, FavoriteStats } from '@/types/favorites'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [lists, setLists] = useState<FavoriteList[]>([])
  const [stats, setStats] = useState<FavoriteStats | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const [selectedList, setSelectedList] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'price' | 'date_added' | 'last_viewed'>('date_added')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Mock data for demonstration
  const mockFavorites: Favorite[] = [
    {
      id: '1',
      userId: 'user1',
      targetId: 'escort1',
      targetType: 'escort',
      targetName: 'Priya Sharma',
      targetImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      targetLocation: 'Mumbai',
      targetRating: 4.8,
      targetPrice: 15000,
      targetServices: ['Companionship', 'Dinner Date', 'Massage'],
      isAvailable: true,
      isVerified: true,
      isPremium: true,
      notes: 'Professional and elegant companion',
      tags: ['professional', 'elegant', 'verified'],
      priority: 'high',
      createdAt: '2024-01-20T10:30:00Z',
      updatedAt: '2024-01-25T15:20:00Z',
      lastViewed: '2024-01-25T15:20:00Z',
      viewCount: 12,
      contactCount: 3,
      bookingCount: 2
    },
    {
      id: '2',
      userId: 'user1',
      targetId: 'escort2',
      targetType: 'escort',
      targetName: 'Zara Khan',
      targetImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      targetLocation: 'Delhi',
      targetRating: 4.7,
      targetPrice: 12000,
      targetServices: ['Companionship', 'Travel', 'VIP Service'],
      isAvailable: true,
      isVerified: true,
      isPremium: false,
      notes: 'Great for travel companionship',
      tags: ['travel', 'vip', 'reliable'],
      priority: 'medium',
      createdAt: '2024-01-18T14:20:00Z',
      updatedAt: '2024-01-24T09:15:00Z',
      lastViewed: '2024-01-24T09:15:00Z',
      viewCount: 8,
      contactCount: 2,
      bookingCount: 1
    },
    {
      id: '3',
      userId: 'user1',
      targetId: 'escort3',
      targetType: 'escort',
      targetName: 'Sofia Rodriguez',
      targetImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      targetLocation: 'Bangalore',
      targetRating: 4.9,
      targetPrice: 18000,
      targetServices: ['Companionship', 'Dinner Date', 'Party', 'Corporate Events'],
      isAvailable: true,
      isVerified: true,
      isPremium: true,
      notes: 'Perfect for corporate events',
      tags: ['corporate', 'party', 'premium'],
      priority: 'high',
      createdAt: '2024-01-15T16:45:00Z',
      updatedAt: '2024-01-23T11:30:00Z',
      lastViewed: '2024-01-23T11:30:00Z',
      viewCount: 15,
      contactCount: 4,
      bookingCount: 3
    }
  ]

  const mockLists: FavoriteList[] = [
    {
      id: '1',
      userId: 'user1',
      name: 'My Favorites',
      description: 'Default favorites list',
      isPublic: false,
      isDefault: true,
      color: '#3B82F6',
      icon: 'heart',
      favorites: mockFavorites,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-25T15:20:00Z',
      viewCount: 0,
      shareCount: 0,
      metadata: {
        totalFavorites: 3,
        averageRating: 4.8,
        averagePrice: 15000,
        topServices: ['Companionship', 'Dinner Date'],
        topLocations: ['Mumbai', 'Delhi', 'Bangalore']
      }
    },
    {
      id: '2',
      userId: 'user1',
      name: 'Travel Companions',
      description: 'Escorts for travel and business trips',
      isPublic: true,
      isDefault: false,
      color: '#10B981',
      icon: 'plane',
      favorites: mockFavorites.filter(f => f.tags.includes('travel')),
      createdAt: '2024-01-18T00:00:00Z',
      updatedAt: '2024-01-24T09:15:00Z',
      viewCount: 5,
      shareCount: 2,
      metadata: {
        totalFavorites: 1,
        averageRating: 4.7,
        averagePrice: 12000,
        topServices: ['Travel', 'VIP Service'],
        topLocations: ['Delhi']
      }
    },
    {
      id: '3',
      userId: 'user1',
      name: 'Corporate Events',
      description: 'Professional escorts for business events',
      isPublic: false,
      isDefault: false,
      color: '#8B5CF6',
      icon: 'briefcase',
      favorites: mockFavorites.filter(f => f.tags.includes('corporate')),
      createdAt: '2024-01-20T00:00:00Z',
      updatedAt: '2024-01-23T11:30:00Z',
      viewCount: 3,
      shareCount: 0,
      metadata: {
        totalFavorites: 1,
        averageRating: 4.9,
        averagePrice: 18000,
        topServices: ['Corporate Events', 'Party'],
        topLocations: ['Bangalore']
      }
    }
  ]

  const mockStats: FavoriteStats = {
    totalFavorites: 3,
    totalLists: 3,
    publicLists: 1,
    privateLists: 2,
    mostViewedFavorites: [
      { favoriteId: '3', targetName: 'Sofia Rodriguez', viewCount: 15 },
      { favoriteId: '1', targetName: 'Priya Sharma', viewCount: 12 },
      { favoriteId: '2', targetName: 'Zara Khan', viewCount: 8 }
    ],
    mostContactedFavorites: [
      { favoriteId: '3', targetName: 'Sofia Rodriguez', contactCount: 4 },
      { favoriteId: '1', targetName: 'Priya Sharma', contactCount: 3 },
      { favoriteId: '2', targetName: 'Zara Khan', contactCount: 2 }
    ],
    mostBookedFavorites: [
      { favoriteId: '3', targetName: 'Sofia Rodriguez', bookingCount: 3 },
      { favoriteId: '1', targetName: 'Priya Sharma', bookingCount: 2 },
      { favoriteId: '2', targetName: 'Zara Khan', bookingCount: 1 }
    ],
    topServices: [
      { service: 'Companionship', count: 3 },
      { service: 'Dinner Date', count: 2 },
      { service: 'Travel', count: 1 }
    ],
    topLocations: [
      { location: 'Mumbai', count: 1 },
      { location: 'Delhi', count: 1 },
      { location: 'Bangalore', count: 1 }
    ],
    averageRating: 4.8,
    averagePrice: 15000,
    monthlyStats: [
      {
        month: 'January 2024',
        favoritesAdded: 3,
        favoritesRemoved: 0,
        views: 35,
        contacts: 9,
        bookings: 6
      }
    ]
  }

  // Load data
  const loadData = async () => {
    setIsLoading(true)
    try {
      // For now, using mock data
      // const [favoritesResponse, listsResponse, statsResponse] = await Promise.all([
      //   favoriteSystem.favorites.list(),
      //   favoriteSystem.favoriteLists.list(),
      //   favoriteSystem.favoriteStats.getStats()
      // ])

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      setFavorites(mockFavorites)
      setLists(mockLists)
      setStats(mockStats)
    } catch {
      console.error('Failed to load favorites data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle favorite actions
  const handleViewFavorite = (favorite: Favorite) => {
    console.log('View favorite:', favorite)
  }

  const handleMessageFavorite = (favorite: Favorite) => {
    console.log('Message favorite:', favorite)
  }

  const handleRemoveFavorite = (favorite: Favorite) => {
    console.log('Remove favorite:', favorite)
  }

  const handleEditFavorite = (favorite: Favorite) => {
    console.log('Edit favorite:', favorite)
  }

  const handleShareList = (list: FavoriteList) => {
    console.log('Share list:', list)
  }

  const handleCreateList = () => {
    console.log('Create new list')
  }

  // Filter and sort favorites
  const filteredFavorites = favorites
    .filter(favorite => {
      const matchesSearch = 
        favorite.targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        favorite.targetLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        favorite.targetServices.some(service => service.toLowerCase().includes(searchTerm.toLowerCase())) ||
        favorite.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesList = selectedList === 'all' || 
        lists.find(list => list.id === selectedList)?.favorites.some(f => f.id === favorite.id)
      
      return matchesSearch && matchesList
    })
    .sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'name':
          comparison = a.targetName.localeCompare(b.targetName)
          break
        case 'rating':
          comparison = a.targetRating - b.targetRating
          break
        case 'price':
          comparison = a.targetPrice - b.targetPrice
          break
        case 'date_added':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
        case 'last_viewed':
          comparison = new Date(a.lastViewed || a.createdAt).getTime() - new Date(b.lastViewed || b.createdAt).getTime()
          break
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })

  // Load initial data
  useEffect(() => {
    loadData()
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'low':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Favorites</h1>
            <p className="text-muted-foreground">
              Manage your favorite escorts and agencies
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Favorite
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Favorites</p>
                    <p className="text-2xl font-bold">{stats.totalFavorites}</p>
                  </div>
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Lists</p>
                    <p className="text-2xl font-bold">{stats.totalLists}</p>
                  </div>
                  <List className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                    <p className="text-2xl font-bold">{stats.averageRating}</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average Price</p>
                    <p className="text-2xl font-bold">₹{(stats.averagePrice / 1000).toFixed(0)}K</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex gap-6">
          {/* Lists Sidebar */}
          <div className="w-80 flex-shrink-0">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Lists</CardTitle>
                  <Button variant="ghost" size="sm" onClick={handleCreateList}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={selectedList === 'all' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedList('all')}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  All Favorites ({favorites.length})
                </Button>
                {lists.map(list => (
                  <Button
                    key={list.id}
                    variant={selectedList === list.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setSelectedList(list.id)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded mr-2"
                          style={{ backgroundColor: list.color }}
                        />
                        <span>{list.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {list.favorites.length}
                      </span>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Filters and Search */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
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
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
                  >
                    <option value="date_added">Sort by Date Added</option>
                    <option value="name">Sort by Name</option>
                    <option value="rating">Sort by Rating</option>
                    <option value="price">Sort by Price</option>
                    <option value="last_viewed">Sort by Last Viewed</option>
                  </select>
                  <Button
                    variant="outline"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
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
              </CardContent>
            </Card>

            {/* Favorites Grid/List */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : filteredFavorites.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No favorites found</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    {searchTerm ? 'Try adjusting your search criteria' : 'Start adding your favorite escorts and agencies'}
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Favorite
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredFavorites.map((favorite) => (
                  <Card key={favorite.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <Image
                            src={favorite.targetImage}
                            alt={favorite.targetName}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                          {favorite.isVerified && (
                            <Badge className="absolute -top-2 -right-2 bg-green-600">
                              <Shield className="h-3 w-3" />
                            </Badge>
                          )}
                          {favorite.isPremium && (
                            <Badge className="absolute -bottom-2 -left-2 bg-yellow-600">
                              <Crown className="h-3 w-3" />
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg truncate">{favorite.targetName}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span>{favorite.targetLocation}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg">₹{favorite.targetPrice.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">per hour</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="font-medium">{favorite.targetRating}</span>
                            </div>
                            {favorite.isAvailable && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                Available
                              </Badge>
                            )}
                            <Badge variant="outline" className={getPriorityColor(favorite.priority)}>
                              {favorite.priority}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {favorite.targetServices.slice(0, 2).map(service => (
                              <Badge key={service} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                            {favorite.targetServices.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{favorite.targetServices.length - 2} more
                              </Badge>
                            )}
                          </div>

                          {favorite.notes && (
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {favorite.notes}
                            </p>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleViewFavorite(favorite)}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleMessageFavorite(favorite)}>
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleEditFavorite(favorite)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button size="sm" variant="outline" onClick={() => handleRemoveFavorite(favorite)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                            <span>Viewed {favorite.viewCount} times</span>
                            <span>Last viewed {new Date(favorite.lastViewed || favorite.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 