"use client"


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Star, Clock, MapPin, Users, Shield, Phone, Mail, MessageCircle, Video, Info, User } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      value: '+91 98765 43210',
      description: '24/7 customer support',
      color: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'Email Support',
      value: 'support@premiumdirectory.com',
      description: 'Response within 24 hours',
      color: 'text-blue-600'
    },

    {
      icon: MapPin,
      title: 'Office Address',
      value: 'Mumbai, Maharashtra, India',
      description: 'Main office location',
      color: 'text-orange-600'
    }
  ]

  const supportCategories = [
    'Account Issues',
    'Payment Problems',
    'Safety Concerns',
    'Verification Help',
    'Technical Support',
    'General Inquiry',
    'Partnership',
    'Other'
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're here to help! Get in touch with our support team for any questions or concerns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                        placeholder="Enter your full name"
                      />
                    </div>
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
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                      >
                        <option value="">Select a subject</option>
                        {supportCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${method.color.replace('text-', 'bg-')} bg-opacity-10`}>
                        <method.icon className={`h-6 w-6 ${method.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{method.title}</h3>
                        <p className="text-lg font-bold text-primary">{method.value}</p>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Support Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Support Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Phone Support</span>
                    <span className="text-sm font-medium">24/7</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm">Email Support</span>
                    <span className="text-sm font-medium">24/7 (Response within 24h)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Office Hours</span>
                    <span className="text-sm font-medium">Mon-Fri: 9 AM - 6 PM IST</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Support */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Safety Concerns
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Account Issues
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2" />
                    Verification Help
                  </Button>

                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: 'How long does verification take?',
                answer: 'Video verification typically takes 24-48 hours after your call is completed.'
              },
              {
                question: 'Can I cancel my subscription?',
                answer: 'Yes, you can cancel your subscription anytime from your dashboard.'
              },
              {
                question: 'Is my information secure?',
                answer: 'Yes, we use industry-standard encryption and never share your personal information.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, UPI, and digital wallets.'
              },
              {
                question: 'How do I report a safety concern?',
                answer: 'Use our emergency contact number or report through the safety section in your dashboard.'
              },
              {
                question: 'Can I change my profile information?',
                answer: 'Yes, you can update your profile information anytime from your dashboard.'
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Still Need Help?
              </h3>
              <p className="text-white/90 mb-6">
                Our dedicated support team is here to assist you 24/7. 
                Don't hesitate to reach out for any concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>

              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 