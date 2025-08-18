"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Search, User, Phone, Mail, Download, ArrowRight, ChevronUp, ChevronDown, Send, HelpCircle, Star, Calendar, Shield, MessageCircle, CreditCard } from 'lucide-react'
import Link from 'next/link'


import UserNavigation from '@/components/UserNavigation'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  isExpanded: boolean
}

interface SupportTicket {
  id: string
  subject: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: string
  createdAt: string
  updatedAt: string
  assignedTo?: string
}

export default function UserSupportPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  const [activeTab, setActiveTab] = useState<'faq' | 'tickets' | 'contact'>('faq')

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How do I book an escort?',
      answer: 'To book an escort, browse our directory, select an escort you like, and click the "Book Now" button. You can then choose your preferred date, time, and service. Complete the payment to confirm your booking.',
      category: 'booking',
      isExpanded: false
    },
    {
      id: '2',
      question: 'What payment methods are accepted?',
      answer: 'We accept various payment methods including credit/debit cards, UPI, digital wallets (Paytm, PhonePe), and net banking. All payments are secure and encrypted.',
      category: 'payment',
      isExpanded: false
    },
    {
      id: '3',
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking up to 24 hours before the scheduled time. Cancellations made within 24 hours may incur a cancellation fee. Please contact support for assistance.',
      category: 'booking',
      isExpanded: false
    },
    {
      id: '4',
      question: 'How do I know if an escort is verified?',
      answer: 'Verified escorts have a blue checkmark badge on their profile. We verify all escorts through identity verification, background checks, and video verification.',
      category: 'safety',
      isExpanded: false
    },
    {
      id: '5',
      question: 'What if I have a bad experience?',
      answer: 'If you have a negative experience, please contact our support team immediately. We take all complaints seriously and will investigate the matter. You may be eligible for a refund.',
      category: 'safety',
      isExpanded: false
    },
    {
      id: '6',
      question: 'How do I write a review?',
      answer: 'After completing a booking, you can write a review from your dashboard. Go to "My Bookings" and click "Write Review" next to the completed booking.',
      category: 'reviews',
      isExpanded: false
    },
    {
      id: '7',
      question: 'Is my personal information safe?',
      answer: 'Yes, we take your privacy seriously. All personal information is encrypted and stored securely. We never share your details with third parties without your consent.',
      category: 'privacy',
      isExpanded: false
    },
    {
      id: '8',
      question: 'How do I contact an escort before booking?',
      answer: 'You can message escorts directly through our messaging system. Go to the escort\'s profile and click "Message" to start a conversation.',
      category: 'communication',
      isExpanded: false
    }
  ]

  const supportTickets: SupportTicket[] = [
    {
      id: '1',
      subject: 'Payment failed during booking',
      description: 'I tried to book Priya Sharma but the payment failed. The amount was deducted from my account but the booking was not confirmed.',
      status: 'in_progress',
      priority: 'high',
      category: 'payment',
      createdAt: '2024-01-25',
      updatedAt: '2024-01-26',
      assignedTo: 'Support Team'
    },
    {
      id: '2',
      subject: 'Need to reschedule booking',
      description: 'I have a booking with Zara Khan tomorrow but need to reschedule due to an emergency. Can you help me with this?',
      status: 'open',
      priority: 'medium',
      category: 'booking',
      createdAt: '2024-01-26',
      updatedAt: '2024-01-26'
    },
    {
      id: '3',
      subject: 'Account verification issue',
      description: 'I uploaded my documents for verification but it\'s been pending for 3 days. Can you check the status?',
      status: 'resolved',
      priority: 'low',
      category: 'account',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-23',
      assignedTo: 'Verification Team'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Categories', icon: HelpCircle },
    { id: 'booking', name: 'Booking', icon: Calendar },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'safety', name: 'Safety', icon: Shield },
    { id: 'account', name: 'Account', icon: User },
    { id: 'reviews', name: 'Reviews', icon: Star },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'communication', name: 'Communication', icon: MessageCircle }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-blue-600 bg-blue-100'
      case 'in_progress': return 'text-yellow-600 bg-yellow-100'
      case 'resolved': return 'text-green-600 bg-green-100'
      case 'closed': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const filteredFAQ = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFAQ = (id: string) => {
    // In a real app, you'd update the state properly
    console.log('Toggle FAQ:', id)
  }

  return (
    <div className="min-h-screen bg-background">
      <UserNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Support Center</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Get help and find answers to your questions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => {
              const link = document.createElement('a')
              link.href = '/api/download/user-guide.pdf'
              link.download = 'user-guide.pdf'
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
              alert('Download started! If the file doesn\'t download, please contact support.')
            }}>
              <Download className="h-4 w-4 mr-2" />
              Download Guide
            </Button>
            <Button onClick={() => setShowContactForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.open('tel:+9118001234567', '_self')}>
            <CardContent className="p-6 text-center">
              <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Speak with our support team
              </p>
              <p className="font-medium">+91 1800-123-4567</p>
              <p className="text-xs text-muted-foreground">24/7 Support</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.open('mailto:support@example.com?subject=Support Request', '_self')}>
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Send us an email
              </p>
              <p className="font-medium">support@example.com</p>
              <p className="text-xs text-muted-foreground">Response within 24h</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-6">
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'faq'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            FAQ
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'tickets'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            My Tickets
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'contact'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Contact Us
          </button>
        </div>

        {/* FAQ Section */}
        {activeTab === 'faq' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search FAQ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQ.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div
                      className="cursor-pointer"
                      onClick={() => toggleFAQ(item.id)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{item.question}</h3>
                        <Button variant="ghost" size="sm">
                          {item.isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </div>
                      {item.isExpanded && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredFAQ.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No FAQ found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or contact our support team
                  </p>
                  <Button onClick={() => setShowContactForm(true)}>
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Tickets Section */}
        {activeTab === 'tickets' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">My Support Tickets</h2>
              <Button onClick={() => setShowContactForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </div>

            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <Card key={ticket.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{ticket.subject}</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                            {ticket.status.replace('_', ' ')}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Created: {ticket.createdAt}</span>
                          <span>Updated: {ticket.updatedAt}</span>
                          {ticket.assignedTo && (
                            <span>Assigned to: {ticket.assignedTo}</span>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Contact Section */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-muted-foreground">+91 1800-123-4567</p>
                      <p className="text-xs text-muted-foreground">Available 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">support@example.com</p>
                      <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                    </div>
                  </div>

                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Emergency Contact</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    For urgent safety concerns, call our emergency hotline: +91 1800-999-9999
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="Brief description of your issue"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select a category</option>
                    <option value="booking">Booking Issue</option>
                    <option value="payment">Payment Problem</option>
                    <option value="safety">Safety Concern</option>
                    <option value="account">Account Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your issue in detail..."
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
} 