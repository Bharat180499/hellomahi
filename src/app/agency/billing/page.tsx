"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  CreditCard, 
  Download, 
  Calendar,
  CheckCircle,
  XCircle,
  ArrowRight,
  Star,
  Shield,
  Zap,
  Crown
} from 'lucide-react'
import AgencyNavigation from '@/components/AgencyNavigation'

interface Plan {
  id: string
  name: string
  price: number
  features: string[]
  popular?: boolean
  current?: boolean
}

export default function AgencyBillingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>('premium')
  const [paymentMethod, setPaymentMethod] = useState('card')

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 4999,
      features: [
        'Up to 10 escorts',
        'Basic analytics',
        'Email support',
        'Standard features'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 9999,
      features: [
        'Up to 50 escorts',
        'Advanced analytics',
        'Priority support',
        'Premium features',
        'Custom branding'
      ],
      popular: true,
      current: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 19999,
      features: [
        'Unlimited escorts',
        'Full analytics suite',
        '24/7 support',
        'All features',
        'Custom integrations',
        'Dedicated account manager'
      ]
    }
  ]

  const billingHistory = [
    {
      id: '1',
      date: '2024-01-15',
      amount: 9999,
      status: 'paid',
      description: 'Premium Plan - January 2024'
    },
    {
      id: '2',
      date: '2023-12-15',
      amount: 9999,
      status: 'paid',
      description: 'Premium Plan - December 2023'
    },
    {
      id: '3',
      date: '2023-11-15',
      amount: 9999,
      status: 'paid',
      description: 'Premium Plan - November 2023'
    }
  ]

  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId)
    alert(`Plan changed to ${plans.find(p => p.id === planId)?.name}`)
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    alert(`Downloading invoice ${invoiceId}...`)
  }

  const handleUpdatePaymentMethod = () => {
    alert('Redirecting to payment method update...')
  }

  return (
    <div className="min-h-screen bg-background">
      <AgencyNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
          <p className="text-muted-foreground">Manage your subscription and billing information</p>
        </div>

        {/* Current Plan */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-6 border rounded-lg bg-gradient-to-r from-primary/10 to-primary/5">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary rounded-full">
                  <Crown className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Premium Plan</h3>
                  <p className="text-muted-foreground">₹9,999/month</p>
                  <p className="text-sm text-muted-foreground">Next billing: February 15, 2024</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Active
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Available Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">₹{plan.price.toLocaleString()}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`w-full ${plan.current ? 'bg-muted text-muted-foreground' : ''}`}
                      variant={plan.current ? 'outline' : 'default'}
                      disabled={plan.current}
                      onClick={() => handlePlanChange(plan.id)}
                    >
                      {plan.current ? 'Current Plan' : 'Select Plan'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-6 w-6 text-primary" />
                  <div>
                    <h4 className="font-medium">Credit Card ending in 1234</h4>
                    <p className="text-sm text-muted-foreground">Expires 12/25</p>
                  </div>
                </div>
                <Button variant="outline" onClick={handleUpdatePaymentMethod}>
                  Update
                </Button>
              </div>
              
              <div className="space-y-4">
                <h5 className="font-medium">Add New Payment Method</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button>
                  Add Payment Method
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {billingHistory.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-muted rounded-lg">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{invoice.description}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">₹{invoice.amount.toLocaleString()}</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        invoice.status === 'paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {invoice.status === 'paid' ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-1" />
                        )}
                        {invoice.status}
                      </span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadInvoice(invoice.id)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
