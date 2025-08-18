"use client"


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HelpCircle, Send, Search, Star, Phone, Mail, MessageCircle, Settings, Plus, Video, FileText, Download, Tabs } from 'lucide-react'
import AgencyNavigation from '@/components/AgencyNavigation'

export default function AgencySupportPage() {
  const [activeTab, setActiveTab] = useState<'tickets' | 'faq' | 'contact' | 'resources'>('tickets')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const [helpfulFaqs, setHelpfulFaqs] = useState<Set<number>>(new Set())

  const supportTickets = [
    {
      id: 'TKT-001',
      subject: 'Payment processing issue',
      status: 'open',
      priority: 'high',
      category: 'billing',
      createdAt: '2024-01-25',
      lastUpdated: '2024-01-26',
      description: 'Unable to process payments for the last 2 days. Getting error message.',
      assignedTo: 'Support Team',
      responses: 2
    },
    {
      id: 'TKT-002',
      subject: 'Escort verification delay',
      status: 'in-progress',
      priority: 'medium',
      category: 'verification',
      createdAt: '2024-01-24',
      lastUpdated: '2024-01-25',
      description: 'Verification process taking longer than usual for new escorts.',
      assignedTo: 'Verification Team',
      responses: 3
    },
    {
      id: 'TKT-003',
      subject: 'Dashboard analytics not loading',
      status: 'resolved',
      priority: 'low',
      category: 'technical',
      createdAt: '2024-01-23',
      lastUpdated: '2024-01-24',
      description: 'Analytics dashboard showing blank screen since yesterday.',
      assignedTo: 'Technical Team',
      responses: 4
    },
    {
      id: 'TKT-004',
      subject: 'Payment processing error',
      status: 'closed',
      priority: 'high',
      category: 'billing',
      createdAt: '2024-01-22',
      lastUpdated: '2024-01-23',
      description: 'Payment processing is incorrect for this month.',
      assignedTo: 'Billing Team',
      responses: 5
    }
  ]

  const faqCategories = [
    { value: 'all', label: 'All Categories' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'technical', label: 'Technical Issues' },
    { value: 'verification', label: 'Verification' },
    { value: 'escorts', label: 'Escort Management' },
    { value: 'bookings', label: 'Bookings' }
  ]

  const faqs = [
    {
      id: 1,
      question: 'How do I add a new escort to my agency?',
      answer: 'To add a new escort, go to the Escorts section in your dashboard and click "Add New Escort". Fill in all required information including personal details, services, pricing, and availability. The escort will need to complete verification before becoming active.',
      category: 'escorts',
      helpful: 15
    },
    {
      id: 2,
      question: 'What is the payment structure?',
      answer: 'Payments are processed directly to escorts after each booking. Platform fees are automatically deducted from each transaction.',
      category: 'billing',
      helpful: 23
    },
    {
      id: 3,
      question: 'How long does verification take?',
      answer: 'Verification typically takes 24-48 hours. This includes ID verification, background checks, and video verification. You can track the status in the verification section.',
      category: 'verification',
      helpful: 18
    },
    {
      id: 4,
      question: 'Can I change my payment method?',
      answer: 'Yes, you can update your payment method in the Billing section of your settings. Go to Settings > Billing and click "Update Payment Method".',
      category: 'billing',
      helpful: 12
    },
    {
      id: 5,
      question: 'How do I handle booking cancellations?',
      answer: 'Cancellations are handled through the booking management system. You can view and manage cancellations in the Bookings section. Refunds are processed automatically according to your cancellation policy.',
      category: 'bookings',
      helpful: 20
    },
    {
      id: 6,
      question: 'What if an escort doesn\'t respond to bookings?',
      answer: 'If an escort is not responding, you can contact them directly through the messaging system. If the issue persists, you can temporarily deactivate their profile or contact support for assistance.',
      category: 'escorts',
      helpful: 14
    }
  ]

  const contactMethods = [
    {
      type: 'phone',
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      value: '+91 1800-123-4567',
      available: '24/7',
      icon: Phone
    },
    {
      type: 'email',
      title: 'Email Support',
      description: 'Send us a detailed message',
      value: 'support@elitecompanions.com',
      available: 'Within 4 hours',
      icon: Mail
    }
  ]

  const resources = [
    {
      title: 'Agency Setup Guide',
      description: 'Complete guide to setting up your agency profile',
      type: 'PDF',
      size: '2.3 MB',
      downloads: 145
    },
    {
      title: 'Escort Management Tutorial',
      description: 'Learn how to effectively manage your escorts',
      type: 'Video',
      duration: '15 min',
      views: 89
    },
    {
      title: 'Billing & Payment Guide',
      description: 'Understanding billing and payment structure',
      type: 'PDF',
      size: '1.8 MB',
      downloads: 203
    },
    {
      title: 'Verification Process',
      description: 'Step-by-step verification process guide',
      type: 'Video',
      duration: '8 min',
      views: 156
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-600 bg-red-100'
      case 'in-progress': return 'text-yellow-600 bg-yellow-100'
      case 'resolved': return 'text-green-600 bg-green-100'
      case 'closed': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const handleNewTicket = () => {
    setShowNewTicketForm(true)
    setActiveTab('contact')
  }

  const handleViewTicket = (ticketId: string) => {
    alert(`Viewing ticket: ${ticketId}`)
  }

  const handleContactMethod = (method: string) => {
    switch (method) {
      case 'Phone':
        window.open('tel:+9118001234567', '_self')
        break
      case 'Email':
        window.open('mailto:support@example.com?subject=Agency Support Request', '_self')
        break
      default:
        alert(`Contacting ${method}`)
    }
  }

  const handleHelpfulFaq = (faqId: number) => {
    setHelpfulFaqs(prev => {
      const newSet = new Set(prev)
      if (newSet.has(faqId)) {
        newSet.delete(faqId)
        alert('Thank you for your feedback!')
      } else {
        newSet.add(faqId)
        alert('Thank you! This helps us improve our FAQ.')
      }
      return newSet
    })
  }

  const filteredTickets = supportTickets.filter(ticket => 
    selectedCategory === 'all' || ticket.category === selectedCategory
  )

  const filteredFaqs = faqs.filter(faq => 
    (selectedCategory === 'all' || faq.category === selectedCategory) &&
    (searchQuery === '' || faq.question.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-background">
      <AgencyNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Support Center</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Get help and support for your agency
            </p>
          </div>
          <Button className="w-full sm:w-auto" onClick={handleNewTicket}>
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>

        {/* Navigation Tabs */}
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
              <button
                onClick={() => setActiveTab('tickets')}
                className={`flex flex-col items-center space-y-2 p-3 sm:p-4 rounded-lg transition-colors text-sm ${
                  activeTab === 'tickets'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-xs sm:text-sm font-medium">Tickets</span>
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex flex-col items-center space-y-2 p-3 sm:p-4 rounded-lg transition-colors text-sm ${
                  activeTab === 'faq'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-xs sm:text-sm font-medium">FAQ</span>
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex flex-col items-center space-y-2 p-3 sm:p-4 rounded-lg transition-colors text-sm ${
                  activeTab === 'contact'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-xs sm:text-sm font-medium">Contact</span>
              </button>
                             {/* Resources tab commented out
               <button
                 onClick={() => setActiveTab('resources')}
                 className={`flex flex-col items-center space-y-2 p-3 sm:p-4 rounded-lg transition-colors text-sm ${
                   activeTab === 'resources'
                     ? 'bg-primary text-primary-foreground'
                     : 'hover:bg-muted'
                 }`}
               >
                 <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                 <span className="text-xs sm:text-sm font-medium">Resources</span>
               </button>
               */}
            </div>
          </CardContent>
        </Card>

        {/* Tab Content */}
        {activeTab === 'tickets' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-lg text-sm text-gray-900 bg-white"
                >
                  {faqCategories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <Button className="w-full sm:w-auto" onClick={handleNewTicket}>
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {filteredTickets.map(ticket => (
                <Card key={ticket.id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                          <h3 className="font-medium text-sm sm:text-base">{ticket.subject}</h3>
                          <div className="flex flex-wrap gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                            </span>
                            <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                            </span>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">{ticket.description}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-muted-foreground">
                          <span>Created: {ticket.createdAt}</span>
                          <span>Updated: {ticket.lastUpdated}</span>
                          <span>Assigned to: {ticket.assignedTo}</span>
                          <span>{ticket.responses} responses</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => handleViewTicket(ticket.id)}>
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search FAQ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm text-gray-900 bg-white"
              >
                {faqCategories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {filteredFaqs.map(faq => (
                <Card key={faq.id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                        <h3 className="font-medium text-sm sm:text-base">{faq.question}</h3>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{faq.helpful} found helpful</span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{faq.answer}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <span className="text-xs text-muted-foreground">Category: {faq.category}</span>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs" onClick={() => handleHelpfulFaq(faq.id)}>
                          {helpfulFaqs.has(faq.id) ? 'Thank you!' : 'Was this helpful?'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {contactMethods.map(method => {
                const Icon = method.icon
                return (
                  <Card key={method.type}>
                    <CardContent className="p-4 sm:p-6 text-center">
                      <Icon className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-primary" />
                      <h3 className="font-medium mb-2 text-sm sm:text-base">{method.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{method.description}</p>
                      <p className="font-medium mb-2 text-sm sm:text-base">{method.value}</p>
                      <p className="text-xs text-muted-foreground">Available: {method.available}</p>
                      <Button className="mt-3 sm:mt-4 w-full text-xs sm:text-sm" onClick={() => handleContactMethod(method.title)}>
                        Contact {method.title}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-2">Subject</label>
                      <input
                        type="text"
                        placeholder="Brief description of your issue"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-2">Category</label>
                      <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm text-gray-900 bg-white">
                        <option value="">Select Category</option>
                        <option value="billing">Billing & Payments</option>
                        <option value="technical">Technical Issues</option>
                        <option value="verification">Verification</option>
                        <option value="escorts">Escort Management</option>
                        <option value="bookings">Bookings</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">Message</label>
                    <textarea
                      rows={6}
                      placeholder="Describe your issue in detail..."
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Resources section commented out
        {activeTab === 'resources' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {resources.map((resource, index) => (
                <Card key={index}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0">
                        {resource.type === 'PDF' ? (
                          <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
                        ) : (
                          <Video className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium mb-2 text-sm sm:text-base">{resource.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-3">{resource.description}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                          <div className="flex items-center space-x-3 sm:space-x-4 text-xs text-muted-foreground">
                            <span>{resource.type}</span>
                            {resource.type === 'PDF' ? (
                              <span>{resource.size}</span>
                            ) : (
                              <span>{resource.duration}</span>
                            )}
                            {resource.type === 'PDF' ? (
                              <span>{resource.downloads} downloads</span>
                            ) : (
                              <span>{resource.views} views</span>
                            )}
                          </div>
                          <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs">
                            {resource.type === 'PDF' ? 'Download' : 'Watch'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Additional Resources</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg gap-3">
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">API Documentation</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">Technical documentation for developers</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs">
                      View Docs
                    </Button>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg gap-3">
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">Video Tutorials</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">Step-by-step video guides</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs">
                      Watch Videos
                    </Button>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg gap-3">
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">Community Forum</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">Connect with other agencies</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs">
                      Join Forum
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        */}
      </main>
    </div>
  )
} 
