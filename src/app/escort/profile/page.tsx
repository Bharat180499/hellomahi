"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Save, 
  X, 
  Plus,
  Trash2,
  Camera,
  Star,
  Heart,
  Clock,
  DollarSign,
  Shield,
  Eye,
  EyeOff,
  Calendar,
  Globe,
  Languages,
  CheckCircle
} from 'lucide-react'

export default function EscortProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')

  const [profileData, setProfileData] = useState({
    name: 'Priya Sharma',
    age: 24,
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Bandra West, Mumbai',
    description: 'Elegant and sophisticated companion offering premium escort services in Mumbai. Available for both social and private engagements. I pride myself on providing a genuine girlfriend experience with class and discretion.',
    height: '5\'6"',
    bodyType: 'Slim',
    hairColor: 'Black',
    eyeColor: 'Brown',
    education: 'Graduate',
    languages: ['English', 'Hindi', 'Marathi'],
    interests: ['Travel', 'Music', 'Fine Dining', 'Art', 'Fashion'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      startTime: '10:00',
      endTime: '02:00',
      advanceBooking: '24 hours'
    },
    services: ['Dinner Dates', 'Social Events', 'Private Time', 'Travel Companion', 'Overnight'],
    pricing: {
      oneShot: 15000,
      twoShot: 25000,
      threeShot: 35000,
      fullNight: 50000
    },
    photos: [
      '/images/escorts/priya-sharma/image1.webp',
      '/images/escorts/priya-sharma/image2.webp',
      '/images/escorts/priya-sharma/image3.webp',
      '/images/escorts/priya-sharma/image4.webp',
      '/images/escorts/priya-sharma/image5.webp',
      '/images/escorts/priya-sharma/image6.webp'
    ],
    videos: [
      '/videos/escorts/priya-sharma/intro-video.mp4',
      '/videos/escorts/priya-sharma/dance-video.mp4'
    ]
  })

  const [newService, setNewService] = useState('')
  const [newInterest, setNewInterest] = useState('')
  const [newLanguage, setNewLanguage] = useState('')
  const [newVideo, setNewVideo] = useState<File | null>(null)

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // Handle profile update
  }

  const addService = () => {
    if (newService.trim() && !profileData.services.includes(newService.trim())) {
      setProfileData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }))
      setNewService('')
    }
  }

  const removeService = (service: string) => {
    setProfileData(prev => ({
      ...prev,
      services: prev.services.filter(s => s !== service)
    }))
  }

  const addInterest = () => {
    if (newInterest.trim() && !profileData.interests.includes(newInterest.trim())) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }))
      setNewInterest('')
    }
  }

  const removeInterest = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }))
  }

  const addLanguage = () => {
    if (newLanguage.trim() && !profileData.languages.includes(newLanguage.trim())) {
      setProfileData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }))
      setNewLanguage('')
    }
  }

  const removeLanguage = (language: string) => {
    setProfileData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== language)
    }))
  }

  const toggleAvailabilityDay = (day: string) => {
    setProfileData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        days: prev.availability.days.includes(day)
          ? prev.availability.days.filter(d => d !== day)
          : [...prev.availability.days, day]
      }
    }))
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      setNewVideo(file)
    }
  }

  const addVideo = () => {
    if (newVideo) {
      const videoUrl = URL.createObjectURL(newVideo)
      setProfileData(prev => ({
        ...prev,
        videos: [...prev.videos, videoUrl]
      }))
      setNewVideo(null)
    }
  }

  const removeVideo = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }))
  }

  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationCode] = useState('8472')

  const startVerification = async () => {
    setIsVerifying(true)
    
    try {
      // Simulate verification process
      console.log('Starting video verification with code:', verificationCode)
      
      // Here you would typically:
      // 1. Initialize video call
      // 2. Connect to verification service
      // 3. Handle the verification flow
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For demo purposes, show success after delay
      alert('Verification process initiated! Please have your verification code ready.')
      
    } catch (error) {
      console.error('Verification failed:', error)
      alert('Verification failed. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Profile Management</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage your escort profile and preferences
          </p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={() => setIsEditing(false)} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleProfileSubmit}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="verification">Identity Verification</TabsTrigger>
          <TabsTrigger value="services">Services & Pricing</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Age</label>
                    <Input
                      type="number"
                      value={profileData.age}
                      onChange={(e) => setProfileData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <Input
                      type="text"
                      value={profileData.city}
                      onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State</label>
                    <Input
                      type="text"
                      value={profileData.state}
                      onChange={(e) => setProfileData(prev => ({ ...prev, state: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <Input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={profileData.description}
                      onChange={(e) => setProfileData(prev => ({ ...prev, description: e.target.value }))}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Physical Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Height</label>
                  <Input
                    type="text"
                    value={profileData.height}
                    onChange={(e) => setProfileData(prev => ({ ...prev, height: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Body Type</label>
                  <Input
                    type="text"
                    value={profileData.bodyType}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bodyType: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Hair Color</label>
                  <Input
                    type="text"
                    value={profileData.hairColor}
                    onChange={(e) => setProfileData(prev => ({ ...prev, hairColor: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Eye Color</label>
                  <Input
                    type="text"
                    value={profileData.eyeColor}
                    onChange={(e) => setProfileData(prev => ({ ...prev, eyeColor: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Education</label>
                  <Input
                    type="text"
                    value={profileData.education}
                    onChange={(e) => setProfileData(prev => ({ ...prev, education: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Identity Verification Tab */}
        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Video Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Video Verification with Code */}
                <div className="flex items-center justify-between p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <Camera className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Video Verification Required</h3>
                      <p className="text-sm text-gray-600 mt-1">Complete live video verification to verify your identity</p>
                      <div className="mt-3">
                        <span className="text-sm font-medium text-gray-700">Verification Code: </span>
                        <span className="text-lg font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-md">8472</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                                         <div className="mt-2">
                       <Button 
                         className="bg-blue-600 hover:bg-blue-700 text-white"
                         onClick={startVerification}
                         disabled={isVerifying}
                       >
                         <Camera className="h-4 w-4 mr-2" />
                         {isVerifying ? 'Starting...' : 'Start Verification'}
                       </Button>
                     </div>
                  </div>
                </div>

                {/* Verification Instructions */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Verification Instructions:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>Click "Start Verification" to begin the video call</li>
                    <li>Have your verification code <span className="font-bold text-blue-600">8472</span> ready</li>
                    <li>Show your face clearly to the camera</li>
                    <li>Hold up a piece of paper with the verification code written on it</li>
                    <li>Follow the agent's instructions during the call</li>
                    <li>Verification typically takes 5-10 minutes</li>
                  </ol>
                </div>

                {/* Verification Status */}
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-semibold text-yellow-800">Verification Status: Pending</h4>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    Complete video verification to activate your profile and start receiving bookings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services & Pricing Tab */}
        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profileData.services.map((service, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-2">
                      <Heart className="h-3 w-3" />
                      {service}
                      {isEditing && (
                        <button
                          onClick={() => removeService(service)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Add new service"
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addService()}
                    />
                    <Button type="button" onClick={addService} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">1 Shot (₹)</label>
                  <Input
                    type="number"
                    value={profileData.pricing.oneShot}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      pricing: { ...prev.pricing, oneShot: parseInt(e.target.value) }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">2 Shot (₹)</label>
                  <Input
                    type="number"
                    value={profileData.pricing.twoShot}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      pricing: { ...prev.pricing, twoShot: parseInt(e.target.value) }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">3 Shot (₹)</label>
                  <Input
                    type="number"
                    value={profileData.pricing.threeShot}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      pricing: { ...prev.pricing, threeShot: parseInt(e.target.value) }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Full Night (₹)</label>
                  <Input
                    type="number"
                    value={profileData.pricing.fullNight}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      pricing: { ...prev.pricing, fullNight: parseInt(e.target.value) }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Availability Tab */}
        <TabsContent value="availability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Availability Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-3">Available Days</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <label key={day} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profileData.availability.days.includes(day)}
                        onChange={() => toggleAvailabilityDay(day)}
                        disabled={!isEditing}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Start Time</label>
                  <Input
                    type="time"
                    value={profileData.availability.startTime}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      availability: { ...prev.availability, startTime: e.target.value }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">End Time</label>
                  <Input
                    type="time"
                    value={profileData.availability.endTime}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      availability: { ...prev.availability, endTime: e.target.value }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Advance Booking Required</label>
                  <Input
                    type="text"
                    value={profileData.availability.advanceBooking}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      availability: { ...prev.availability, advanceBooking: e.target.value }
                    }))}
                    placeholder="e.g., 24 hours"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Photos Tab */}
        <TabsContent value="photos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Photo Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {profileData.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <div 
                      className="w-full h-48 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${photo})` }}
                    />
                    {isEditing && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <Button variant="outline">
                      <Camera className="h-4 w-4 mr-2" />
                      Add Photo
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Video Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profileData.videos.map((video, index) => (
                    <div key={index} className="relative group">
                      <video 
                        className="w-full h-48 rounded-lg object-cover"
                        controls
                        preload="metadata"
                      >
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      {isEditing && (
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => removeVideo(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                      />
                      {newVideo && (
                        <Button onClick={addVideo} size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Video
                        </Button>
                      )}
                    </div>
                    {newVideo && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">
                          Selected: {newVideo.name} ({(newVideo.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Upload video files (Max 50MB). Supported formats: MP4, AVI, MOV, WMV
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profileData.languages.map((language, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-2">
                      <Globe className="h-3 w-3" />
                      {language}
                      {isEditing && (
                        <button
                          onClick={() => removeLanguage(language)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Add new language"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                    />
                    <Button type="button" onClick={addLanguage} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-2">
                      <Heart className="h-3 w-3" />
                      {interest}
                      {isEditing && (
                        <button
                          onClick={() => removeInterest(interest)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Add new interest"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                    />
                    <Button type="button" onClick={addInterest} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 