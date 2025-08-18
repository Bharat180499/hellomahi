"use client"


import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Star, User, ArrowRight, HelpCircle, Gift, Check, Check, Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Zap, Gift, HelpCircle, Search, Star, Heart, Users, Shield, Crown, MessageCircle, X, ArrowRight, Camera, Upload, Video, TrendingUp, Building, User } from 'lucide-react'
import type { Plan, UserType } from '@/types'
import { Input } from '@/components/ui/input';

// Mock plans data for different user types
const plansByUserType: Record<UserType, Plan[]> = {
  user: [
    {
      id: '10',
      name: '10 Days Premium',
      duration: 10,
      price: 999,
      userType: 'user',
      features: [
        'Unlimited escort browsing',
        'Advanced search filters',
        'Direct messaging with escorts',
        'Booking history',
        '24/7 customer support',
        'Secure payment processing',
        'Profile favorites',
        'Real-time availability'
      ]
    },
    {
      id: '20',
      name: '20 Days Premium',
      duration: 20,
      price: 1799,
      userType: 'user',
      isPopular: true,
      features: [
        'All 10 Days features',
        'Priority booking requests',
        'Exclusive escort access',
        'Advanced analytics',
        'Custom notifications',
        'VIP customer support',
        'Profile customization',
        'Booking reminders'
      ]
    },
    {
      id: '30',
      name: '30 Days Premium',
      duration: 30,
      price: 2499,
      userType: 'user',
      features: [
        'All 20 Days features',
        'VIP status badge',
        'Exclusive events access',
        'Personal concierge',
        'Priority dispute resolution',
        'Advanced privacy settings',
        'Custom search alerts',
        'Premium customer support'
      ]
    }
  ],
  escort: [
    {
      id: '10',
      name: '10 Days Premium',
      duration: 10,
      price: 2999,
      userType: 'escort',
      features: [
        'Priority listing placement',
        'Unlimited photo uploads',
        'Video verification badge',
        'Advanced analytics',
        'Priority customer support',
        'Featured in city listings',
        'Message notifications',
        'Basic profile customization'
      ]
    },
    {
      id: '20',
      name: '20 Days Premium',
      duration: 20,
      price: 4999,
      userType: 'escort',
      isPopular: true,
      features: [
        'All 10 Days features',
        'Premium profile badge',
        'Featured on homepage',
        'Advanced search filters',
        'Profile boost every 3 days',
        'Priority booking requests',
        'Dedicated account manager',
        'Custom profile URL'
      ]
    },
    {
      id: '30',
      name: '30 Days Premium',
      duration: 30,
      price: 6999,
      userType: 'escort',
      features: [
        'All 20 Days features',
        'VIP status badge',
        'Top placement in all searches',
        'Daily profile boost',
        'Exclusive client matching',
        '24/7 priority support',
        'Profile customization tools',
        'Analytics dashboard',
        'Client feedback system'
      ]
    }
  ],
  agency: [
    {
      id: '10',
      name: '10 Days Agency',
      duration: 10,
      price: 5999,
      userType: 'agency',
      features: [
        'Manage up to 10 escorts',
        'Bulk profile management',
        'Agency dashboard',
        'Basic analytics',
        'Priority support',
        'Agency branding',
        'Escort verification tools',
        'Booking management'
      ]
    },
    {
      id: '20',
      name: '20 Days Agency',
      duration: 20,
      price: 9999,
      userType: 'agency',
      isPopular: true,
      features: [
        'All 10 Days features',
        'Manage up to 25 escorts',
        'Advanced analytics',
        'Revenue sharing program',
        'Custom agency profile',
        'Priority listing placement',
        'Dedicated account manager',
        'Bulk messaging tools'
      ]
    },
    {
      id: '30',
      name: '30 Days Agency',
      duration: 30,
      price: 14999,
      userType: 'agency',
      features: [
        'All 20 Days features',
        'Unlimited escorts',
        'VIP agency status',
        'Exclusive client access',
        'Advanced reporting',
        'Custom integrations',
        '24/7 priority support',
        'White-label options',
        'Revenue optimization tools'
      ]
    }
  ]
}

export default function PlansPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [userType, setUserType] = useState<UserType>((searchParams.get('type') as UserType) || 'escort')
  const [selectedPlan, setSelectedPlan] = useState<string>('20')
  const [upiQr, setUpiQr] = useState<{ image_url: string; label: string } | null>(null);
  const [proof, setProof] = useState<File | null>(null);
  const [proofUploading, setProofUploading] = useState(false);

  useEffect(() => {
    const fetchQr = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/upi-qr/random`);
        const data = await res.json();
        if (data.success && data.data) setUpiQr(data.data);
      } catch {}
    };
    fetchQr();
  }, []);

  const handleProofUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proof) return;
    setProofUploading(true);
    // TODO: Implement payment proof upload API
    setTimeout(() => { setProofUploading(false); alert('Payment proof uploaded!'); }, 1000);
  };

  const handleContinue = () => {
    // Redirect to appropriate registration page with selected plan
    const registrationPaths = {
      user: '/auth/register/user',
      agency: '/auth/register/agency',
      escort: '/auth/register/escort'
    }
    router.push(`${registrationPaths[userType]}?plan=${selectedPlan}`)
  }

  const getPopularFeatures = () => {
    const featuresByType = {
      user: [
        {
          icon: Shield,
          title: 'Secure & Private',
          description: 'Your privacy and security are our top priority'
        },
        {
          icon: Users,
          title: 'Verified Escorts',
          description: 'Connect with verified, professional escorts'
        },
        {
          icon: MessageCircle,
          title: 'Direct Messaging',
          description: 'Communicate directly with your chosen escort'
        },
        {
          icon: Heart,
          title: 'Quality Service',
          description: 'Premium escort services and experiences'
        },
        {
          icon: TrendingUp,
          title: 'Advanced Search',
          description: 'Find exactly what you\'re looking for'
        },
        {
          icon: Zap,
          title: 'Quick Booking',
          description: 'Fast and secure booking process'
        }
      ],
      escort: [
        {
          icon: Shield,
          title: 'Video Verification',
          description: 'Build trust with verified video profiles'
        },
        {
          icon: Crown,
          title: 'Premium Badge',
          description: 'Stand out with exclusive premium status'
        },
        {
          icon: TrendingUp,
          title: 'Priority Placement',
          description: 'Get featured in top search results'
        },
        {
          icon: Users,
          title: 'Quality Clients',
          description: 'Connect with verified, high-value clients'
        },
        {
          icon: Camera,
          title: 'Unlimited Photos',
          description: 'Showcase your best with unlimited uploads'
        },
        {
          icon: MessageCircle,
          title: 'Direct Messaging',
          description: 'Communicate directly with potential clients'
        }
      ],
      agency: [
        {
          icon: Building,
          title: 'Agency Dashboard',
          description: 'Manage all your escorts from one place'
        },
        {
          icon: Users,
          title: 'Multiple Escorts',
          description: 'Manage unlimited escort profiles'
        },
        {
          icon: TrendingUp,
          title: 'Revenue Sharing',
          description: 'Earn from every booking your escorts make'
        },
        {
          icon: Shield,
          title: 'Verification Tools',
          description: 'Verify your escorts quickly and easily'
        },
        {
          icon: MessageCircle,
          title: 'Bulk Management',
          description: 'Manage multiple escorts efficiently'
        },
        {
          icon: Crown,
          title: 'Agency Branding',
          description: 'Build your agency brand and reputation'
        }
      ]
    }
    return featuresByType[userType]
  }

  const getTestimonials = () => {
    const testimonialsByType = {
      user: [
        {
          name: 'Rahul S.',
          role: 'Premium Client',
          avatar: 'RS',
          rating: 5,
          quote: 'The premium features made it so easy to find exactly what I was looking for. The verification system gives me peace of mind.',
          improvement: 'Found perfect matches 3x faster'
        },
        {
          name: 'Arjun M.',
          role: 'VIP Client',
          avatar: 'AM',
          rating: 5,
          quote: 'The exclusive access and priority booking saved me so much time. The quality of escorts is outstanding.',
          improvement: 'Priority booking requests'
        },
        {
          name: 'Vikram K.',
          role: 'Premium Client',
          avatar: 'VK',
          rating: 5,
          quote: 'The advanced search filters and real-time availability helped me plan my bookings perfectly. Highly recommended!',
          improvement: 'Better planning with real-time data'
        }
      ],
      escort: [
        {
          name: 'Priya M.',
          role: 'Premium Escort',
          avatar: 'PM',
          rating: 5,
          quote: 'Since upgrading to premium, my bookings have increased by 300%. The priority placement really makes a difference.',
          improvement: '300% increase in bookings'
        },
        {
          name: 'Anjali S.',
          role: 'VIP Escort',
          avatar: 'AS',
          rating: 5,
          quote: 'The video verification badge and premium features helped me attract higher-paying clients. My earnings doubled!',
          improvement: 'Doubled monthly earnings'
        },
        {
          name: 'Zara K.',
          role: 'Premium Escort',
          avatar: 'ZK',
          rating: 5,
          quote: 'The analytics dashboard helps me understand my performance and optimize my profile. Great investment!',
          improvement: 'Better client insights'
        }
      ],
      agency: [
        {
          name: 'Elite Escorts',
          role: 'Agency Partner',
          avatar: 'EE',
          rating: 5,
          quote: 'Managing 25+ escorts has never been easier. The agency dashboard and analytics help us optimize our business.',
          improvement: '25+ escorts managed efficiently'
        },
        {
          name: 'Royal Companions',
          role: 'VIP Agency',
          avatar: 'RC',
          rating: 5,
          quote: 'The revenue sharing program and bulk management tools have increased our profits by 150%. Excellent platform!',
          improvement: '150% profit increase'
        },
        {
          name: 'Premium Partners',
          role: 'Agency Partner',
          avatar: 'PP',
          rating: 5,
          quote: 'The verification tools and dedicated account manager make onboarding new escorts seamless and fast.',
          improvement: 'Faster escort onboarding'
        }
      ]
    }
    return testimonialsByType[userType]
  }

  const getFAQs = () => {
    const faqsByType = {
      user: [
        {
          question: 'How do I know the escorts are verified?',
          answer: 'All escorts on our platform go through a strict verification process including video verification and identity document checks. Verified profiles display a special badge.'
        },
        {
          question: 'Is my privacy protected?',
          answer: 'Absolutely! We use bank-level encryption and strict privacy policies. Your personal information and booking history are completely confidential.'
        },
        {
          question: 'Can I cancel or reschedule bookings?',
          answer: 'Yes, you can cancel or reschedule bookings according to the escort\'s cancellation policy. Premium clients get priority support for booking changes.'
        },
        {
          question: 'What payment methods are accepted?',
          answer: 'We accept all major credit cards, UPI, net banking, and digital wallets. All payments are processed securely through Stripe.'
        },
        {
          question: 'How do I contact customer support?',
          answer: 'Premium clients get 24/7 priority support via email and phone. Standard support is available during business hours.'
        },
        {
          question: 'Can I upgrade my plan later?',
          answer: 'Yes, you can upgrade your plan at any time. The remaining days from your current plan will be prorated and applied to your new plan.'
        }
      ],
      escort: [
        {
          question: 'How does video verification work?',
          answer: 'You\'ll need to record a short video introducing yourself and confirming your identity. This helps build trust with potential clients and is required for profile approval.'
        },
        {
          question: 'How much can I earn with premium features?',
          answer: 'Premium escorts typically earn 2-3x more than standard profiles due to priority placement, verification badges, and access to higher-paying clients.'
        },
        {
          question: 'What documents do I need for verification?',
          answer: 'Indian escorts need Aadhar card (front & back), international escorts need passport (front & back), plus video verification. The process takes 24-48 hours.'
        },
        {
          question: 'Can I manage my availability?',
          answer: 'Yes, you can set your availability, working hours, and advance booking requirements. Premium features include real-time availability updates.'
        },
        {
          question: 'How do I get featured in search results?',
          answer: 'Premium profiles get priority placement. VIP escorts get top placement in all searches with daily profile boosts and exclusive client matching.'
        },
        {
          question: 'What analytics are available?',
          answer: 'Premium escorts get detailed analytics including profile views, client interactions, booking patterns, and earnings reports to optimize performance.'
        }
      ],
      agency: [
        {
          question: 'How many escorts can I manage?',
          answer: '10 Days plan: up to 10 escorts, 20 Days plan: up to 25 escorts, 30 Days plan: unlimited escorts with advanced management tools.'
        },
        {
          question: 'How does revenue sharing work?',
          answer: 'Agencies earn a percentage from every booking their escorts make. The percentage increases with higher-tier plans and better performance.'
        },
        {
          question: 'Can I customize the agency profile?',
          answer: 'Yes, you can customize your agency profile with your branding, logo, and company information. VIP agencies get white-label options.'
        },
        {
          question: 'How do I verify my escorts?',
          answer: 'We provide bulk verification tools for agencies. You can upload multiple escorts\' documents and manage their verification status from your dashboard.'
        },
        {
          question: 'What reporting and analytics are available?',
          answer: 'Agency plans include comprehensive reporting on earnings, escort performance, client feedback, and business insights to optimize operations.'
        },
        {
          question: 'Do I get dedicated support?',
          answer: 'Yes, agencies get priority support with dedicated account managers. VIP agencies get 24/7 priority support and custom integrations.'
        }
      ]
    }
    return faqsByType[userType]
  }

  const userTypeConfig = {
    user: {
      title: 'Client Plans',
      subtitle: 'Choose the perfect plan to access premium escort services',
      icon: User,
      color: 'text-blue-600'
    },
    escort: {
      title: 'Escort Plans',
      subtitle: 'Select the perfect plan to maximize your visibility and earnings',
      icon: EscortIcon,
      color: 'text-pink-600'
    },
    agency: {
      title: 'Agency Plans',
      subtitle: 'Choose the ideal plan to manage and grow your escort agency',
      icon: Building,
      color: 'text-purple-600'
    }
  }

  const currentPlans = plansByUserType[userType]
  const config = userTypeConfig[userType]
  const IconComponent = config.icon
  const testimonials = getTestimonials()
  const faqs = getFAQs()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {config.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {config.subtitle}
          </p>
        </div>

        {/* User Type Selection */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-4">Select Your User Type</h2>
            <p className="text-muted-foreground">Choose the type of account you want to create</p>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
              {Object.entries(userTypeConfig).map(([type, typeConfig]) => {
                const TypeIcon = typeConfig.icon
                return (
                  <button
                    key={type}
                    onClick={() => setUserType(type as UserType)}
                    className={`p-6 border rounded-xl text-left transition-all duration-200 ${
                      userType === type
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <TypeIcon className={`h-6 w-6 ${typeConfig.color}`} />
                      <div>
                        <div className="font-semibold">{typeConfig.title.split(' ')[0]}</div>
                        <div className="text-sm text-muted-foreground">
                          {type === 'user' ? 'Looking for services' : 
                           type === 'escort' ? 'Individual escort' : 'Manage multiple escorts'}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {currentPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative transition-all duration-200 ${
                selectedPlan === plan.id 
                  ? 'ring-2 ring-primary scale-105' 
                  : 'hover:scale-105'
              } ${plan.isPopular ? 'border-primary' : ''}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    <Star className="h-3 w-3 inline mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <div>
                    <div className="text-3xl font-bold">
                      ₹{plan.price}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {plan.duration} days
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.isPopular 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                      : ''
                  }`}
                  variant={selectedPlan === plan.id ? 'default' : 'outline'}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center mb-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 text-lg"
            onClick={handleContinue}
          >
            Continue with {currentPlans.find(p => p.id === selectedPlan)?.name}
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            You'll be redirected to complete your registration
          </p>
        </div>

        {upiQr && (
          <div className="max-w-xl mx-auto my-12 p-6 border rounded-lg bg-white text-center">
            <h3 className="text-xl font-bold mb-2">Pay with UPI QR</h3>
            <img src={upiQr.image_url} alt={upiQr.label} className="w-48 h-48 mx-auto mb-2 border rounded" />
            <div className="mb-2 font-medium">{upiQr.label}</div>
            <div className="mb-4 text-sm text-gray-600">Scan this QR code with your UPI app to pay for your plan. After payment, upload your payment proof below.</div>
            <form onSubmit={handleProofUpload} className="flex flex-col items-center gap-2">
              <Input type="file" accept="image/*" onChange={e => setProof(e.target.files?.[0] || null)} required />
              <Button type="submit" disabled={proofUploading}>{proofUploading ? 'Uploading...' : 'Upload Payment Proof'}</Button>
            </form>
          </div>
        )}

        {/* Popular Features */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Why Choose Premium?</h2>
            <p className="text-muted-foreground">
              Premium features designed to maximize your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getPopularFeatures().map((feature, index) => (
              <Card key={index} className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Success Stories</h2>
            <p className="text-muted-foreground">
              See how our platform has helped {userType === 'user' ? 'clients' : userType === 'escort' ? 'escorts' : 'agencies'} achieve their goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="flex items-center mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 italic">
                  "{testimonial.quote}"
                </p>
                <div className="text-xs font-medium text-green-600">
                  {testimonial.improvement}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Everything you need to know about our {userType === 'user' ? 'client' : userType === 'escort' ? 'escort' : 'agency'} plans
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <HelpCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Gift className="h-8 w-8 mr-2" />
                <h3 className="text-2xl font-bold">Ready to Get Started?</h3>
              </div>
              <p className="text-white/90 mb-6">
                Join thousands of successful {userType === 'user' ? 'clients' : userType === 'escort' ? 'escorts' : 'agencies'} who have transformed their experience with our premium plans.
              </p>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={handleContinue}
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Choose Your Plan
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 