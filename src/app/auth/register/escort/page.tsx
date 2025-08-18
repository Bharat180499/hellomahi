"use client"


import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, CheckCircle, Shield, Crown, ArrowLeft, ArrowRight, Check, Check, Shield, Crown } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Crown, ArrowRight, Shield, CheckCircle, EyeOff, Eye } from 'lucide-react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function EscortRegistrationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    age: '',
    country: 'India',
    city: '',
    state: '',
    address: '',
    services: [] as string[],
    price: '',
    currency: 'INR',
    description: '',
    // Verification documents
    aadharFront: null as File | null,
    aadharBack: null as File | null,
    passportFront: null as File | null,
    passportBack: null as File | null,
    videoVerification: null as File | null,
    agreeToTerms: false,
    agreeToPrivacy: false,
    agreeToVerification: false,
    marketingEmails: false,
    selectedPlan: searchParams.get('plan') || '20'
  })
  
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Update plan when URL changes
  useEffect(() => {
    const plan = searchParams.get('plan')
    if (plan) {
      setFormData(prev => ({ ...prev, selectedPlan: plan }))
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log('Escort registration:', formData)
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

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const isIndianEscort = formData.country === 'India'

  const benefits = [
    'Create your professional escort profile',
    'Video verification for trust building',
    'Direct client messaging system',
    'Flexible pricing and availability',
    'Analytics and performance tracking',
    'Secure payment processing'
  ]

  const services = [
    'Companionship', 'Massage', 'Dinner Date', 'Travel', 
    'Outcall', 'Incall', 'VIP Service', 'Party', 'Corporate Events'
  ]

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'
  ]

  const countries = [
    'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
    'Germany', 'France', 'Italy', 'Spain', 'Netherlands',
    'Switzerland', 'Austria', 'Belgium', 'Sweden', 'Norway',
    'Denmark', 'Finland', 'Ireland', 'New Zealand', 'Singapore'
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <Link 
                href="/auth/login"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Login
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Create Escort Profile
              </h1>
              <p className="text-lg text-muted-foreground">
                Join thousands of successful escorts on our platform
              </p>
              {formData.selectedPlan && (
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  <Crown className="h-4 w-4 mr-2" />
                  Selected Plan: {formData.selectedPlan} Days Premium
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Registration Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Crown className="h-5 w-5 mr-2 text-primary" />
                      Escort Registration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              First Name *
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Password */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Security</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Password *
                            </label>
                            <div className="relative">
                              <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded-md text-foreground bg-background pr-10"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Confirm Password *
                            </label>
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded-md text-foreground bg-background pr-10"
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Personal Details */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Date of Birth *
                            </label>
                            <input
                              type="date"
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Age *
                            </label>
                            <input
                              type="number"
                              name="age"
                              value={formData.age}
                              onChange={handleChange}
                              required
                              min="18"
                              max="65"
                              className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Country *
                            </label>
                            <select
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                            >
                              {countries.map(country => (
                                <option key={country} value={country}>{country}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Location</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              City *
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              State *
                            </label>
                            <select
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                            >
                              <option value="">Select State</option>
                              {states.map(state => (
                                <option key={state} value={state}>{state}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium mb-2">
                            Address
                          </label>
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                          />
                        </div>
                      </div>

                      {/* Services */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Services Offered</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {services.map(service => (
                            <label key={service} className="flex items-center space-x-2">
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

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          About Me
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Tell clients about yourself, your services, and what makes you special..."
                          className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                        />
                      </div>

                      {/* Identity Verification */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Identity Verification</h3>
                        <div className="bg-muted/50 p-4 rounded-lg mb-4">
                          <div className="flex items-start space-x-3">
                            <Shield className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <h4 className="font-medium mb-2">Verification Requirements</h4>
                              <p className="text-sm text-muted-foreground mb-3">
                                {isIndianEscort 
                                  ? 'Indian escorts must provide Aadhar card (front & back) and video verification'
                                  : 'International escorts must provide passport (front & back) and video verification'
                                }
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {isIndianEscort ? (
                            <>
                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Aadhar Card Front *
                                </label>
                                <input
                                  type="file"
                                  name="aadharFront"
                                  onChange={handleChange}
                                  accept="image/*"
                                  required
                                  className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Aadhar Card Back *
                                </label>
                                <input
                                  type="file"
                                  name="aadharBack"
                                  onChange={handleChange}
                                  accept="image/*"
                                  required
                                  className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Passport Front *
                                </label>
                                <input
                                  type="file"
                                  name="passportFront"
                                  onChange={handleChange}
                                  accept="image/*"
                                  required
                                  className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Passport Back *
                                </label>
                                <input
                                  type="file"
                                  name="passportBack"
                                  onChange={handleChange}
                                  accept="image/*"
                                  required
                                  className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                                />
                              </div>
                            </>
                          )}
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium mb-2">
                            Video Verification *
                          </label>
                          <input
                            type="file"
                            name="videoVerification"
                            onChange={handleChange}
                            accept="video/*"
                            required
                            className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Record a short video introducing yourself and confirming your identity
                          </p>
                        </div>
                      </div>

                      {/* Terms and Conditions */}
                      <div className="space-y-4">
                        <label className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                            required
                            className="mt-1 rounded border-gray-300"
                          />
                          <span className="text-sm">
                            I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Community Guidelines</a>
                          </span>
                        </label>

                        <label className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            name="agreeToPrivacy"
                            checked={formData.agreeToPrivacy}
                            onChange={handleChange}
                            required
                            className="mt-1 rounded border-gray-300"
                          />
                          <span className="text-sm">
                            I agree to the <a href="#" className="text-primary hover:underline">Privacy Policy</a> and consent to data processing
                          </span>
                        </label>

                        <label className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            name="agreeToVerification"
                            checked={formData.agreeToVerification}
                            onChange={handleChange}
                            required
                            className="mt-1 rounded border-gray-300"
                          />
                          <span className="text-sm">
                            I consent to identity verification and understand this is required for profile approval
                          </span>
                        </label>

                        <label className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            name="marketingEmails"
                            checked={formData.marketingEmails}
                            onChange={handleChange}
                            className="mt-1 rounded border-gray-300"
                          />
                          <span className="text-sm">
                            I would like to receive marketing emails and updates about new features
                          </span>
                        </label>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Creating account...
                          </div>
                        ) : (
                          <>
                            Create Escort Profile
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Benefits Sidebar */}
              <div className="space-y-6">
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-primary" />
                      Escort Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardHeader>
                    <CardTitle>Already have an account?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/auth/login">
                        Sign In
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 