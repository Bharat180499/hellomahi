import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  Users, 
  Star, 
  Award,
  Heart,
  Globe,
  Target,
  Eye,
  CheckCircle,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  const stats = [
    { icon: Users, value: '500+', label: 'Verified Profiles' },
    { icon: Star, value: '4.8', label: 'Average Rating' },
    { icon: Globe, value: '50+', label: 'Cities Covered' },
    { icon: Heart, value: '10K+', label: 'Happy Clients' }
  ]

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'We prioritize the safety and security of all our users with comprehensive verification processes.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a trusted community where escorts and clients can connect safely and respectfully.'
    },
    {
      icon: Star,
      title: 'Quality',
      description: 'Maintaining high standards through rigorous verification and quality control measures.'
    },
    {
      icon: Heart,
      title: 'Respect',
      description: 'Treating everyone with dignity and respect, regardless of their background or choices.'
    }
  ]

  const team = [
    {
      name: 'Priya Sharma',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
      bio: 'Former tech executive with 15+ years experience in building safe online communities.'
    },
    {
      name: 'Rahul Verma',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      bio: 'Expert in cybersecurity and platform development with focus on user privacy.'
    },
    {
      name: 'Anjali Patel',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      bio: 'Specialist in community management and user experience optimization.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 gradient-bg opacity-90"></div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About Premium Directory
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              India's most trusted platform for verified escort services, 
              connecting quality clients with professional companions.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center text-white">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          {/* Mission & Vision */}
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  To create a safe, secure, and professional platform that connects 
                  verified escorts with quality clients across India. We believe in 
                  providing a dignified space where adults can make informed choices 
                  about companionship services.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  Our platform prioritizes safety, verification, and user experience, 
                  ensuring that both escorts and clients can interact with confidence 
                  and peace of mind.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                    Learn More
                  </Button>
                  <Button variant="outline">Contact Us</Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
                    alt="Our Mission"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive verification and matching process
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Profile Creation',
                  description: 'Escorts create detailed profiles with photos, services, and pricing information.',
                  icon: Target
                },
                {
                  step: '02',
                  title: 'Verification Process',
                  description: 'Rigorous verification including video calls, ID verification, and background checks.',
                  icon: Shield
                },
                {
                  step: '03',
                  title: 'Client Matching',
                  description: 'Advanced algorithms match clients with suitable escorts based on preferences.',
                  icon: Heart
                }
              ].map((item, index) => (
                <Card key={index} className="relative p-6">
                  <div className="absolute -top-4 left-6">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Team
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the people behind Premium Directory
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center p-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section>
            <Card className="p-8 text-center">
              <CardHeader>
                <CardTitle className="text-2xl mb-4">Get in Touch</CardTitle>
                <p className="text-muted-foreground">
                  Have questions or need support? We're here to help.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>support@premiumdirectory.com</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Mumbai, Maharashtra</span>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
} 