"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, X, Phone, Mail, Calendar, DollarSign, Camera, Crown, ArrowLeft, Save, FileText, Calendar, DollarSign, Crown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, X, Save, User, Mail, Phone, MapPin, Calendar, FileText, Shield, Users, Globe, Crown, EyeOff, Eye, DollarSign, Camera, Upload, CheckCircle } from 'lucide-react'


export default function AddEscortPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    dateOfBirth: '',
    address: '',
    bio: '',
    hourlyRate: '',
    services: [] as string[],
    languages: [] as string[],
    verificationStatus: 'pending',
    profileStatus: 'active',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    documents: {
      idProof: '',
      addressProof: '',
      photos: [] as string[]
    }
  })

  const availableServices = [
    'Companionship', 'Dinner Date', 'Travel Companion', 'Event Escort', 
    'Massage', 'Intimate Services', 'VIP Services', 'Outcall Only'
  ]

  const availableLanguages = [
    'English', 'Hindi', 'Marathi', 'Gujarati', 'Bengali', 'Tamil', 
    'Telugu', 'Kannada', 'Malayalam', 'Punjabi', 'Urdu'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEmergencyContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }))
  }

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long')
      return
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Escort profile created successfully!')
      router.push('/admin/escorts')
    } catch {
      alert('Error creating escort profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All entered data will be lost.')) {
      router.push('/admin/escorts')
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push('/admin/escorts')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Escorts
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Add New Escort</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Create a new escort profile
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Profile
              </>
            )}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Crown className="h-5 w-5 mr-2" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Enter the escort's personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name *</label>
                  <Input
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name *</label>
                  <Input
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Email Address *</label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Phone Number *</label>
                <Input
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Date of Birth</label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Location *</label>
                <Input
                  required
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter city/location"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter full address"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Bio/Description</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself, your interests, and what makes you special..."
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Account Security
              </CardTitle>
              <CardDescription>
                Set up login credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Password *</label>
                <div className="relative">
                  <Input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter password"
                    minLength={8}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">Confirm Password *</label>
                <Input
                  required
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm password"
                />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Account Status</label>
                <select
                  value={formData.profileStatus}
                  onChange={(e) => handleInputChange('profileStatus', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending Verification</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Verification Status</label>
                <select
                  value={formData.verificationStatus}
                  onChange={(e) => handleInputChange('verificationStatus', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Services & Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Services & Pricing
              </CardTitle>
              <CardDescription>
                Define services offered and pricing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Hourly Rate (₹) *</label>
                <Input
                  required
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                  placeholder="Enter hourly rate"
                  min="0"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Services Offered</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {availableServices.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={service}
                        checked={formData.services.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                        className="rounded"
                      />
                      <label htmlFor={service} className="text-sm">{service}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Languages Spoken</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {availableLanguages.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={language}
                        checked={formData.languages.includes(language)}
                        onChange={() => handleLanguageToggle(language)}
                        className="rounded"
                      />
                      <label htmlFor={language} className="text-sm">{language}</label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Emergency Contact
              </CardTitle>
              <CardDescription>
                Emergency contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Contact Name</label>
                <Input
                  value={formData.emergencyContact.name}
                  onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                  placeholder="Enter emergency contact name"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Contact Phone</label>
                <Input
                  value={formData.emergencyContact.phone}
                  onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                  placeholder="Enter emergency contact phone"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Relationship</label>
                <Input
                  value={formData.emergencyContact.relationship}
                  onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
                  placeholder="e.g., Spouse, Parent, Friend"
                />
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Document Upload
              </CardTitle>
              <CardDescription>
                Upload required verification documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">ID Proof</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload ID proof</p>
                  <p className="text-xs text-gray-500">Aadhar Card, PAN Card, or Passport</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Address Proof</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload address proof</p>
                  <p className="text-xs text-gray-500">Utility bill, rental agreement, or bank statement</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Profile Photos</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload photos</p>
                  <p className="text-xs text-gray-500">Upload 3-5 high-quality photos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Additional Information
              </CardTitle>
              <CardDescription>
                Additional details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Working Hours</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground">From</label>
                    <Input type="time" className="text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">To</label>
                    <Input type="time" className="text-sm" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Service Areas</label>
                <textarea
                  placeholder="List the areas where you provide services"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Preferences</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="incall" className="rounded" />
                    <label htmlFor="incall" className="text-sm">Incall Services</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="outcall" className="rounded" />
                    <label htmlFor="outcall" className="text-sm">Outcall Services</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="overnight" className="rounded" />
                    <label htmlFor="overnight" className="text-sm">Overnight Services</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="travel" className="rounded" />
                    <label htmlFor="travel" className="text-sm">Travel Companion</label>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Special Notes</label>
                <textarea
                  placeholder="Any special requirements, preferences, or notes"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </main>
  )
}
