"use client"


import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Heart, Eye, Edit, Trash2, DollarSign, MessageCircle, Camera, Upload, Play, Shield, Star, DollarSign, Shield, MessageCircle, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Grid, List, Filter, Eye, EyeOff, Star, Heart, DollarSign, Shield, Crown, MessageCircle, Settings, Sun, Edit, Trash2, Camera, Upload, Play, Video, Info, Award, Tabs, Image } from 'lucide-react'
import Image from 'next/image'

interface MediaItem {
  id: string
  type: 'image' | 'video'
  url: string
  thumbnail?: string
  isPublic: boolean
  isVerified: boolean
  uploadedAt: Date
  views: number
  likes: number
}

interface ProfileStats {
  totalViews: number
  profileLikes: number
  responseRate: number
  averageResponseTime: number
  completionRate: number
  repeatClients: number
  totalEarnings: number
  memberSince: Date
}

export default function AdvancedProfileFeatures() {
  
  const [activeTab, setActiveTab] = useState<'gallery' | 'info' | 'stats' | 'settings'>('gallery')
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [mediaFilter, setMediaFilter] = useState<'all' | 'public' | 'private' | 'verified'>('all')

  const [profileData, setProfileData] = useState({
    name: 'Priya Sharma',
    age: 25,
    location: 'Bandra West, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    height: '5\'6"',
    weight: '55 kg',
    measurements: '34-26-36',
    languages: ['English', 'Hindi', 'Marathi'],
    education: 'Graduate',
    occupation: 'Professional Escort',
    about: 'Elegant and sophisticated companion for high-end events and private meetings. I specialize in providing discreet, professional companionship services for business executives, tourists, and individuals seeking quality time with a refined companion.',
    services: ['Companionship', 'Dinner Date', 'Travel', 'VIP Service', 'Party', 'Corporate Events'],
    rates: {
      hourly: 15000,
      twoHours: 25000,
      overnight: 80000,
      weekend: 150000
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      hours: '10:00 AM - 2:00 AM',
      advanceBooking: '24 hours'
    },
    memberSince: new Date('2023-06-15'),
    stats: {
      totalViews: 15420,
      profileLikes: 342,
      responseRate: 95,
      averageResponseTime: 15,
      completionRate: 98,
      repeatClients: 45,
      totalEarnings: 1850000
    }
  })

  const [mediaGallery, setMediaGallery] = useState<MediaItem[]>([
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800',
      isPublic: true,
      isVerified: true,
      uploadedAt: new Date('2024-01-15'),
      views: 1250,
      likes: 89
    },
    {
      id: '2',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
      isPublic: true,
      isVerified: true,
      uploadedAt: new Date('2024-01-16'),
      views: 980,
      likes: 67
    },
    {
      id: '3',
      type: 'video',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800',
      isPublic: false,
      isVerified: true,
      uploadedAt: new Date('2024-01-17'),
      views: 450,
      likes: 34
    },
    {
      id: '4',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800',
      isPublic: true,
      isVerified: false,
      uploadedAt: new Date('2024-01-18'),
      views: 320,
      likes: 23
    }
  ])

  const [profileStats] = useState<ProfileStats>({
    totalViews: 15420,
    profileLikes: 342,
    responseRate: 95,
    averageResponseTime: 15,
    completionRate: 98,
    repeatClients: 45,
    totalEarnings: 1850000,
    memberSince: new Date('2023-06-15')
  })

  const [verificationBadges] = useState([
    { id: 'id', name: 'ID Verified', icon: Shield, color: 'text-blue-600' },
    { id: 'video', name: 'Video Verified', icon: Video, color: 'text-green-600' },
    { id: 'premium', name: 'Premium Member', icon: Crown, color: 'text-yellow-600' },
    { id: 'vip', name: 'VIP Status', icon: Award, color: 'text-purple-600' },
    { id: 'safety', name: 'Safety Verified', icon: Shield, color: 'text-red-600' }
  ])

  const handleMediaUpload = (files: FileList) => {
    // In a real app, this would upload to cloud storage
    console.log('Uploading files:', files)
  }

  const toggleMediaVisibility = (mediaId: string) => {
    setMediaGallery(prev => 
      prev.map(media => 
        media.id === mediaId 
          ? { ...media, isPublic: !media.isPublic }
          : media
      )
    )
  }

  const deleteMedia = (mediaId: string) => {
    setMediaGallery(prev => prev.filter(media => media.id !== mediaId))
  }

  const filteredMedia = mediaGallery.filter(media => {
    if (mediaFilter === 'public') return media.isPublic
    if (mediaFilter === 'private') return !media.isPublic
    if (mediaFilter === 'verified') return media.isVerified
    return true
  })

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200"
                alt={profileData.name}
                width={120}
                height={120}
                className="rounded-full"
              />
              <div className="absolute -bottom-2 -right-2">
                <Button size="sm" className="rounded-full">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold">{profileData.name}</h1>
                <div className="flex items-center space-x-1">
                  {verificationBadges.map(badge => (
                    <badge.icon key={badge.id} className={`h-5 w-5 ${badge.color}`} />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                <span>{profileData.age} years old</span>
                <span>•</span>
                <span>{profileData.location}</span>
                <span>•</span>
                <span>Member since {profileData.memberSince.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">{profileData.stats?.totalViews.toLocaleString()} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">{profileData.stats?.profileLikes} likes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span className="text-sm">4.8 (127 reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('gallery')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'gallery'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Media Gallery
        </button>
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'info'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Profile Info
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'stats'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Statistics
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'settings'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Settings
        </button>
      </div>

      {/* Media Gallery Tab */}
      {activeTab === 'gallery' && (
        <div className="space-y-4">
          {/* Gallery Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select
                value={mediaFilter}
                onChange={(e) => setMediaFilter(e.target.value as any)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Media</option>
                <option value="public">Public Only</option>
                <option value="private">Private Only</option>
                <option value="verified">Verified Only</option>
              </select>
              <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Media
            </Button>
          </div>

          {/* Media Grid */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.map(media => (
                <Card key={media.id} className="relative group">
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <Image
                        src={media.type === 'video' ? media.thumbnail! : media.url}
                        alt="Media"
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      {media.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="h-8 w-8 text-white bg-black/50 rounded-full p-2" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex space-x-1">
                        {media.isVerified && (
                          <div className="bg-green-500 text-white p-1 rounded-full">
                            <Shield className="h-3 w-3" />
                          </div>
                        )}
                        <button
                          onClick={() => toggleMediaVisibility(media.id)}
                          className="bg-black/50 text-white p-1 rounded-full"
                        >
                          {media.isPublic ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
                        <div className="flex items-center justify-between text-sm">
                          <span>{media.views} views</span>
                          <span>{media.likes} likes</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium capitalize">{media.type}</span>
                        <button
                          onClick={() => deleteMedia(media.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {media.uploadedAt.toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMedia.map(media => (
                <Card key={media.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-20 h-20">
                        <Image
                          src={media.type === 'video' ? media.thumbnail! : media.url}
                          alt="Media"
                          fill
                          className="object-cover rounded"
                        />
                        {media.type === 'video' && (
                          <Play className="absolute inset-0 m-auto h-6 w-6 text-white bg-black/50 rounded-full p-1" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium capitalize">{media.type}</span>
                          {media.isVerified && (
                            <Shield className="h-4 w-4 text-green-600" />
                          )}
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            media.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {media.isPublic ? 'Public' : 'Private'}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {media.views} views • {media.likes} likes • {media.uploadedAt.toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleMediaVisibility(media.id)}
                          className="p-2 hover:bg-muted rounded"
                        >
                          {media.isPublic ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => deleteMedia(media.id)}
                          className="p-2 hover:bg-muted rounded text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Profile Info Tab */}
      {activeTab === 'info' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Age</label>
                  <input
                    type="number"
                    value={profileData.age}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Height</label>
                  <input
                    type="text"
                    value={profileData.height}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Weight</label>
                  <input
                    type="text"
                    value={profileData.weight}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">About Me</label>
                <textarea
                  value={profileData.about}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services & Rates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Services Offered</label>
                <div className="grid grid-cols-2 gap-2">
                  {profileData.services.map(service => (
                    <div key={service} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={true}
                        disabled={!isEditing}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Rates</label>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Hourly:</span>
                    <span className="font-medium">₹{profileData.rates.hourly.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">2 Hours:</span>
                    <span className="font-medium">₹{profileData.rates.twoHours.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Overnight:</span>
                    <span className="font-medium">₹{profileData.rates.overnight.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Weekend:</span>
                    <span className="font-medium">₹{profileData.rates.weekend.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Statistics Tab */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">{profileStats.totalViews.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Profile Likes</p>
                  <p className="text-2xl font-bold">{profileStats.profileLikes}</p>
                </div>
                <Heart className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                  <p className="text-2xl font-bold">{profileStats.responseRate}%</p>
                </div>
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold">₹{(profileStats.totalEarnings / 100000).toFixed(1)}L</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-4">Privacy Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Show online status</span>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Allow messages from non-clients</span>
                    <Button variant="outline" size="sm">Disabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Show last seen</span>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-4">Notification Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New booking requests</span>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New messages</span>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profile views</span>
                    <Button variant="outline" size="sm">Disabled</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 