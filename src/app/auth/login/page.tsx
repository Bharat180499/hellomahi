"use client"


import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HelpCircle, Eye, EyeOff, Shield, Crown, CheckCircle, Mail, ArrowRight, Lock, Building, User } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type UserType = 'user' | 'agency' | 'escort'

export default function LoginPage() {
  const [userType, setUserType] = useState<UserType>('user')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Handle login logic here
      console.log('Login attempt:', { userType, ...formData })
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const userTypes = [
    {
      id: 'user' as UserType,
      title: 'Client',
      description: 'Looking for escort services',
      icon: User,
      color: 'text-blue-600'
    },
    {
      id: 'agency' as UserType,
      title: 'Escorts Agency',
      description: 'Manage multiple escorts',
      icon: Building,
      color: 'text-purple-600'
    },
    {
      id: 'escort' as UserType,
      title: 'Independent Escort',
      description: 'Individual escort profile',
      icon: Crown,
      color: 'text-pink-600'
    }
  ]

  const benefits = [
    'Secure and encrypted login',
    '24/7 customer support',
    'Verified profiles only',
    'Safe payment processing'
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex items-center justify-center py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome Back
              </h1>
              <p className="text-lg text-muted-foreground">
                Sign in to your account to continue
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Login Form */}
              <Card className="p-6">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* User Type Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-3">
                      I am a:
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {userTypes.map((type) => {
                        const IconComponent = type.icon
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setUserType(type.id)}
                            className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                              userType === type.id
                                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                                : 'border-muted hover:border-primary/50'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <IconComponent className={`h-5 w-5 ${type.color}`} />
                              <div>
                                <div className="font-medium">{type.title}</div>
                                <div className="text-xs text-muted-foreground">
                                  {type.description}
                                </div>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Login Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleChange}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">Remember me</span>
                      </label>
                      <Link 
                        href="/auth/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Signing in...
                        </div>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-background text-muted-foreground">
                        Don't have an account?
                      </span>
                    </div>
                  </div>

                  {/* Register Links */}
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/auth/register/user">
                        <User className="h-4 w-4 mr-2" />
                        Register as Client
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/auth/register/agency">
                        <Building className="h-4 w-4 mr-2" />
                        Register Agency
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/auth/register/escort">
                        <Crown className="h-4 w-4 mr-2" />
                        Register as Escort
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits Sidebar */}
              <div className="space-y-6">
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-primary" />
                      Why Choose Us?
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
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Having trouble signing in? Our support team is here to help.
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href="/help">
                          <HelpCircle className="h-4 w-4 mr-2" />
                          Help Center
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href="/contact">
                          <Mail className="h-4 w-4 mr-2" />
                          Contact Support
                        </Link>
                      </Button>
                    </div>
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