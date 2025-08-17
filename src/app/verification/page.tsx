"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Shield, 
  Camera, 
  CheckCircle, 
  Clock, 
  XCircle,
  Upload,
  Play,
  AlertCircle,
  Users,
  Star,
  Award,
  ArrowRight
} from 'lucide-react'
import VideoVerificationBadge from '@/components/VideoVerificationBadge'

export default function VerificationPage() {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    {
      id: 1,
      title: 'Profile Setup',
      description: 'Complete your basic profile information',
      icon: Users,
      status: 'completed'
    },
    {
      id: 2,
      title: 'Photo Upload',
      description: 'Upload clear, recent photos of yourself',
      icon: Camera,
      status: 'completed'
    },
    {
      id: 3,
      title: 'Video Call',
      description: 'Schedule and complete a video verification call',
      icon: Play,
      status: 'current'
    },
    {
      id: 4,
      title: 'Review Process',
      description: 'Our team reviews your verification',
      icon: Shield,
      status: 'pending'
    },
    {
      id: 5,
      title: 'Verification Complete',
      description: 'Receive your verified badge',
      icon: CheckCircle,
      status: 'pending'
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'Build Trust',
      description: 'Verified profiles receive 3x more client inquiries'
    },
    {
      icon: Star,
      title: 'Priority Placement',
      description: 'Get featured in top search results'
    },
    {
      icon: Award,
      title: 'Premium Badge',
      description: 'Stand out with exclusive verification badge'
    },
    {
      icon: Users,
      title: 'Quality Clients',
      description: 'Connect with verified, high-value clients'
    }
  ]

  const requirements = [
    'Valid government-issued photo ID',
    'Clear, recent photos (face and full body)',
    'Stable internet connection for video call',
    'Quiet, well-lit environment for video',
    'Be prepared to show ID during video call'
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Video Verification Process
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Get verified to build trust with clients and increase your profile visibility
          </p>
          <div className="flex items-center justify-center space-x-4">
            <VideoVerificationBadge status="approved" size="lg" showDetails={true} />
            <span className="text-muted-foreground">|</span>
            <div className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-1" />
              <span>500+ verified profiles</span>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <div key={step.id} className="relative">
                  <Card className={`text-center p-4 transition-all duration-200 ${
                    step.status === 'current' ? 'ring-2 ring-primary' : ''
                  }`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                      step.status === 'completed' ? 'bg-green-100 text-green-600' :
                      step.status === 'current' ? 'bg-primary text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {step.status === 'completed' ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <step.icon className="h-6 w-6" />
                      )}
                    </div>
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </Card>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-0.5 bg-muted"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Step Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  Step 3: Video Verification Call
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/30 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">What to Expect:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>5-10 minute video call with our verification team</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Show your government-issued ID to camera</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Confirm your profile information</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Answer a few simple questions</span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Play className="h-4 w-4 mr-2" />
                    Schedule Video Call
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload ID Documents
                  </Button>
                </div>

                <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800 dark:text-yellow-200">
                      Important: Video calls are recorded for verification purposes only
                    </p>
                    <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                      All recordings are encrypted and deleted after verification
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                      <span className="text-sm">{requirement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <p className="font-medium">Video call completed</p>
                      <p className="text-sm text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <p className="font-medium">Review process</p>
                      <p className="text-sm text-muted-foreground">24-48 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-muted rounded-full mr-4"></div>
                    <div className="flex-1">
                      <p className="font-medium">Verification badge activated</p>
                      <p className="text-sm text-muted-foreground">Within 48 hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <benefit.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{benefit.title}</h4>
                        <p className="text-xs text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Success Rate</span>
                    <span className="font-semibold text-green-600">98%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Time</span>
                    <span className="font-semibold">36 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Verified Profiles</span>
                    <span className="font-semibold">500+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Client Trust</span>
                    <span className="font-semibold text-green-600">95%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Demo Video
                  </Button>
                  <Button variant="outline" className="w-full">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    FAQ
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Get Verified?
              </h3>
              <p className="text-white/90 mb-6">
                Join hundreds of verified escorts who have increased their earnings and client quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  Start Verification
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 