"use client"


import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Users, Crown, Calendar, Shield, AlertCircle, Camera, X, CheckCircle, ImageIcon } from 'lucide-react'


import AgencyNavigation from '@/components/AgencyNavigation'

export default function AddEscortPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    age: '',
    city: '',
    state: '',
    height: '',
    weight: '',
    measurements: '',
    languages: [] as string[],
    education: '',
    occupation: '',
    about: '',
    services: [] as string[],
    pricing: {
      oneShot: '',
      twoShot: '',
      threeShot: '',
      fullNight: ''
    },
    availability: {
      days: [] as string[],
      startTime: '',
      endTime: '',
      advanceBooking: ''
    },
    gallery: [] as File[]
  })

  
  const [isLoading, setIsLoading] = useState(false)
  const [selfieFile, setSelfieFile] = useState<File | null>(null)
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log('Adding escort:', formData)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).files?.[0] || null
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({
      ...prev,
      gallery: [...prev.gallery, ...files]
    }))
  }

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }))
  }

  const handleSelfieUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelfieFile(file)
      setSelfiePreview(URL.createObjectURL(file))
    }
  }

  const removeSelfie = () => {
    setSelfieFile(null)
    if (selfiePreview) {
      URL.revokeObjectURL(selfiePreview)
      setSelfiePreview(null)
    }
  }

  const captureSelfie = () => {
    // This would typically open camera for live capture
    // For now, we'll simulate by opening file input
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.capture = 'user'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        setSelfieFile(file)
        setSelfiePreview(URL.createObjectURL(file))
      }
    }
    input.click()
  }

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const toggleLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }))
  }

  const toggleAvailabilityDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        days: prev.availability.days.includes(day)
          ? prev.availability.days.filter(d => d !== day)
          : [...prev.availability.days, day]
      }
    }))
  }

  const services = [
    'Companionship', 'Massage', 'Dinner Date', 'Travel', 
    'Outcall', 'Incall', 'VIP Service', 'Party', 'Corporate Events',
    'Fashion Shows', 'Photography', 'Dancing'
  ]

  const languages = [
    'English', 'Hindi', 'Marathi', 'Gujarati', 'Bengali', 'Tamil',
    'Telugu', 'Kannada', 'Malayalam', 'Punjabi', 'Urdu', 'French',
    'Spanish', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese'
  ]

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'
  ]

  return (
    <div className="min-h-screen bg-background">
      <AgencyNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/agency/escorts">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Escorts
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Add New Escort</h1>
              <p className="text-muted-foreground">
                Add a new escort to your agency
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="18"
                    max="65"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                    >
                      <option value="">Select State</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>


              </CardContent>
            </Card>

            {/* Physical Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Physical Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Height</label>
                    <input
                      type="text"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="e.g., 5'6&quot;"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Weight</label>
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="e.g., 55 kg"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Measurements</label>
                    <input
                      type="text"
                      name="measurements"
                      value={formData.measurements}
                      onChange={handleChange}
                      placeholder="e.g., 34-26-36"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Languages Spoken</label>
                  <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                    {languages.map(language => (
                      <label key={language} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.languages.includes(language)}
                          onChange={() => toggleLanguage(language)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{language}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Education</label>
                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      placeholder="e.g., Graduate"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      placeholder="e.g., Professional Escort"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">About</label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about the escort..."
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services & Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Crown className="h-5 w-5 mr-2" />
                Services & Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Services Offered *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {services.map(service => (
                    <label key={service} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => toggleService(service)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">1 Shot Rate *</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="pricing.oneShot"
                      value={formData.pricing.oneShot}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₹</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">2 Shot Rate *</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="pricing.twoShot"
                      value={formData.pricing.twoShot}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₹</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">3 Shot Rate *</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="pricing.threeShot"
                      value={formData.pricing.threeShot}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₹</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Full Night Rate *</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="pricing.fullNight"
                      value={formData.pricing.fullNight}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₹</span>
                  </div>
                </div>
              </div>
              
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Availability
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
                        checked={formData.availability.days.includes(day)}
                        onChange={() => toggleAvailabilityDay(day)}
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
                  <input
                    type="time"
                    name="availability.startTime"
                    value={formData.availability.startTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">End Time</label>
                  <input
                    type="time"
                    name="availability.endTime"
                    value={formData.availability.endTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Advance Booking Required</label>
                  <input
                    type="text"
                    name="availability.advanceBooking"
                    value={formData.availability.advanceBooking}
                    onChange={handleChange}
                    placeholder="e.g., 24 hours"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selfie Verification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Selfie Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Verification Required</h4>
                    <p className="text-sm text-blue-700">
                      Please upload a clear selfie for identity verification. This helps ensure the safety and authenticity of our platform.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Selfie Upload Section */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Selfie *</label>
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSelfieUpload}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                      />
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={captureSelfie}
                          className="flex-1"
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Take Selfie
                        </Button>
                        {selfieFile && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={removeSelfie}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload a clear, recent photo of the escort for verification
                    </p>
                  </div>

                  {/* Verification Guidelines */}
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-sm mb-2">Verification Guidelines:</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Face should be clearly visible and well-lit</li>
                      <li>• No sunglasses, hats, or face coverings</li>
                      <li>• Photo should be recent (within 6 months)</li>
                      <li>• Good quality image (not blurry)</li>
                      <li>• Neutral expression preferred</li>
                    </ul>
                  </div>
                </div>

                {/* Selfie Preview */}
                <div>
                  <label className="block text-sm font-medium mb-2">Selfie Preview</label>
                  <div className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                    {selfiePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={selfiePreview}
                          alt="Selfie Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Uploaded
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        <Camera className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-sm">No selfie uploaded</p>
                        <p className="text-xs">Upload or take a selfie for verification</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">Verification Status: Pending</span>
                </div>
                <p className="text-xs text-yellow-700 mt-1">
                  Selfie will be reviewed by our verification team within 24-48 hours.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Gallery Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="h-5 w-5 mr-2" />
                Gallery Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Upload Photos *</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryUpload}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload multiple photos for the escort's gallery (Max 10 images)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Upload Video</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleGalleryUpload}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload a video for the escort's gallery (Max 50MB)
                </p>
              </div>

              {/* Gallery Preview */}
              {formData.gallery.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-2">Gallery Preview</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.gallery.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {file.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex items-center justify-end space-x-4">
            <Button variant="outline" asChild>
              <Link href="/agency/escorts">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Escort'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
} 
