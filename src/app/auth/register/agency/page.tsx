"use client"


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, CheckCircle, Shield, ArrowLeft, ArrowRight, Building, Check, EyeOff } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AgencyRegistrationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    agencyName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    website: '',
    city: '',
    state: '',
    address: '',
    gstNumber: '',
    escortsCount: '',
    services: [] as string[],
    agreeToTerms: false,
    agreeToPrivacy: false,
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
      console.log('Agency registration:', formData)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const benefits = [
    'Manage multiple escorts under one account',
    'Advanced analytics and reporting',
    'Bulk profile management',
    'Priority customer support',
    'Custom branding options',
    'Revenue sharing program'
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
                Create Agency Account
              </h1>
              <p className="text-lg text-muted-foreground">
                Join thousands of agencies who trust our platform
              </p>
              {formData.selectedPlan && (
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  <Building className="h-4 w-4 mr-2" />
                  Selected Plan: {formData.selectedPlan} Days Agency
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Registration Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="h-5 w-5 mr-2 text-primary" />
                      Agency Registration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Agency Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Agency Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Agency Name *
                            </label>
                            <input
                              type="text"
                              name="agencyName"
                              value={formData.agencyName}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Owner Name *
                            </label>
                            <input
                              type="text"
                              name="ownerName"
                              value={formData.ownerName}
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
                        <div className="mt-4">
                          <label className="block text-sm font-medium mb-2">
                            Website
                          </label>
                          <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://yourwebsite.com"
                            className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                          />
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

                      {/* Business Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Business Information</h3>
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
                            Address *
                          </label>
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                          />
                        </div>
                      </div>

                      {/* Business Details */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Business Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              GST Number *
                            </label>
                            <input
                              type="text"
                              name="gstNumber"
                              value={formData.gstNumber}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Number of Escorts *
                            </label>
                            <input
                              type="number"
                              name="escortsCount"
                              value={formData.escortsCount}
                              onChange={handleChange}
                              required
                              min="1"
                              className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                            />
                          </div>
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
                            Create Agency Account
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
                      Agency Benefits
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