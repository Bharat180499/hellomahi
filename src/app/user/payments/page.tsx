"use client"


import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs } from '@/components/ui/tabs'
import { Wallet, Download, Search, Filter, Calendar, Clock, DollarSign, Shield, CheckCircle, XCircle, AlertCircle, Phone, Plus, X, ArrowRight, MoreVertical, Edit, Trash2, CreditCard, Info, User } from 'lucide-react'
import UserNavigation from '@/components/UserNavigation'

interface PaymentMethod {
  id: string
  type: 'card' | 'upi' | 'wallet'
  name: string
  number: string
  expiry?: string
  isDefault: boolean
  isVerified: boolean
}

interface Transaction {
  id: string
  escortName: string
  escortImage: string
  amount: number
  status: 'completed' | 'pending' | 'failed' | 'refunded'
  date: string
  time: string
  paymentMethod: string
  bookingId: string
  service: string
}

export default function UserPaymentsPage() {
  const [activeTab, setActiveTab] = useState<'methods' | 'transactions' | 'billing'>('methods')
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | 'all'>('30d')
  const [activeBillingTab, setActiveBillingTab] = useState<'overview' | 'subscription' | 'invoices'>('overview')

  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'card',
      name: 'HDFC Credit Card',
      number: '**** **** **** 1234',
      expiry: '12/25',
      isDefault: true,
      isVerified: true
    },
    {
      id: '2',
      type: 'card',
      name: 'SBI Debit Card',
      number: '**** **** **** 5678',
      expiry: '08/26',
      isDefault: false,
      isVerified: true
    },
    {
      id: '3',
      type: 'upi',
      name: 'PhonePe UPI',
      number: 'rahul.verma@phonepe',
      isDefault: false,
      isVerified: true
    },
    {
      id: '4',
      type: 'wallet',
      name: 'Paytm Wallet',
      number: '+91 98765 43210',
      isDefault: false,
      isVerified: false
    }
  ]

  const transactions: Transaction[] = [
    {
      id: '1',
      escortName: 'Priya Sharma',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      amount: 30000,
      status: 'completed',
      date: '2024-01-25',
      time: '8:00 PM',
      paymentMethod: 'HDFC Credit Card',
      bookingId: 'BK001',
      service: 'Dinner Date'
    },
    {
      id: '2',
      escortName: 'Zara Khan',
      escortImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      amount: 45000,
      status: 'completed',
      date: '2024-01-24',
      time: '9:00 PM',
      paymentMethod: 'SBI Debit Card',
      bookingId: 'BK002',
      service: 'Overnight'
    },
    {
      id: '3',
      escortName: 'Sofia Rodriguez',
      escortImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      amount: 35000,
      status: 'pending',
      date: '2024-01-23',
      time: '7:00 PM',
      paymentMethod: 'PhonePe UPI',
      bookingId: 'BK003',
      service: 'Social Event'
    },
    {
      id: '4',
      escortName: 'Aisha Patel',
      escortImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      amount: 40000,
      status: 'failed',
      date: '2024-01-20',
      time: '6:00 PM',
      paymentMethod: 'Paytm Wallet',
      bookingId: 'BK004',
      service: 'Party Companion'
    },
    {
      id: '5',
      escortName: 'Meera Nair',
      escortImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      amount: 25000,
      status: 'refunded',
      date: '2024-01-18',
      time: '10:00 PM',
      paymentMethod: 'HDFC Credit Card',
      bookingId: 'BK005',
      service: 'Massage'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'failed': return 'text-red-600 bg-red-100'
      case 'refunded': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />
      case 'refunded': return <ArrowRight className="h-4 w-4 text-blue-600" />
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case 'card': return <CreditCard className="h-5 w-5" />
      case 'upi': return <Wallet className="h-5 w-5" />
      case 'wallet': return <Wallet className="h-5 w-5" />
      default: return <DollarSign className="h-5 w-5" />
    }
  }

  const stats = {
    totalSpent: transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0),
    totalTransactions: transactions.length,
    pendingAmount: transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0),
    refundedAmount: transactions.filter(t => t.status === 'refunded').reduce((sum, t) => sum + t.amount, 0)
  }

  const [billingData, setBillingData] = useState({
    plan: 'Premium',
    nextBilling: '2024-02-15',
    amount: '999',
    currency: 'INR',
    autoRenew: true,
    paymentMethod: 'Credit Card ending in 1234',
    subscriptionStatus: 'active',
    lastPayment: '2024-01-15',
    totalPaid: '2997'
  })

  const invoices = [
    {
      id: 'INV001',
      date: '2024-01-15',
      amount: 999,
      status: 'paid',
      description: 'Premium Membership - January 2024',
      dueDate: '2024-01-15'
    },
    {
      id: 'INV002',
      date: '2023-12-15',
      amount: 999,
      status: 'paid',
      description: 'Premium Membership - December 2023',
      dueDate: '2023-12-15'
    },
    {
      id: 'INV003',
      date: '2023-11-15',
      amount: 999,
      status: 'paid',
      description: 'Premium Membership - November 2023',
      dueDate: '2023-11-15'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <UserNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Payments</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage your payment methods and view transactions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => alert('Exporting payments data...')}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">₹{(stats.totalSpent / 1000).toFixed(0)}K</p>
              <p className="text-xs text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CreditCard className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.totalTransactions}</p>
              <p className="text-xs text-muted-foreground">Total Transactions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">₹{(stats.pendingAmount / 1000).toFixed(0)}K</p>
              <p className="text-xs text-muted-foreground">Pending Amount</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <ArrowRight className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">₹{(stats.refundedAmount / 1000).toFixed(0)}K</p>
              <p className="text-xs text-muted-foreground">Refunded Amount</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-6">
          <button
            onClick={() => setActiveTab('methods')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'methods'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Payment Methods
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'transactions'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Transaction History
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'billing'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Billing
          </button>
        </div>

        {/* Payment Methods Tab */}
        {activeTab === 'methods' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <Card key={method.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          {getPaymentMethodIcon(method.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{method.name}</h3>
                          <p className="text-sm text-muted-foreground">{method.number}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {method.isDefault && (
                          <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                            Default
                          </span>
                        )}
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {method.isVerified ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                        )}
                        <span className="text-sm text-muted-foreground">
                          {method.isVerified ? 'Verified' : 'Pending Verification'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Security Notice */}
            <Card className="bg-blue-50 dark:bg-blue-900/20">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200">Secure Payments</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      All your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value as any)}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="all">All time</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Transactions List */}
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <Card key={transaction.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={transaction.escortImage}
                            alt={transaction.escortName}
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="absolute -bottom-1 -right-1">
                            {getStatusIcon(transaction.status)}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold">{transaction.escortName}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{transaction.service}</span>
                            <span>•</span>
                            <span>{transaction.paymentMethod}</span>
                            <span>•</span>
                            <span>{transaction.date} at {transaction.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Booking ID: {transaction.bookingId}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg">₹{transaction.amount.toLocaleString()}</div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold">Billing & Subscription</h2>
                <p className="text-muted-foreground text-sm">
                  Manage your subscription and view billing history
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 w-full sm:w-auto">
                <Button variant="outline" onClick={() => alert('Exporting billing data...')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Upgrade Plan
                </Button>
              </div>
            </div>

            {/* Subscription Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Current Subscription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Current Plan</h4>
                    <p className="text-2xl font-bold text-primary">{billingData.plan}</p>
                    <p className="text-sm text-muted-foreground">₹{billingData.amount}/month</p>
                    <p className="text-xs text-muted-foreground mt-1">Premium features included</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Next Billing</h4>
                    <p className="text-lg font-medium">{billingData.nextBilling}</p>
                    <p className="text-sm text-muted-foreground">Auto-renewal enabled</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Status</h4>
                    <p className="text-lg font-medium text-green-600 capitalize">{billingData.subscriptionStatus}</p>
                    <p className="text-sm text-muted-foreground">Last payment: {billingData.lastPayment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing Navigation Tabs */}
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              <button
                onClick={() => setActiveBillingTab('overview')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeBillingTab === 'overview'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveBillingTab('subscription')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeBillingTab === 'subscription'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Subscription Details
              </button>
              <button
                onClick={() => setActiveBillingTab('invoices')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeBillingTab === 'invoices'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Invoices
              </button>
            </div>

            {/* Overview Tab */}
            {activeBillingTab === 'overview' && (
              <div className="space-y-6">
                {/* Billing Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <h4 className="font-medium">Total Paid</h4>
                        </div>
                        <p className="text-2xl font-bold text-green-600">₹{parseInt(billingData.totalPaid).toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Lifetime payments</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <h4 className="font-medium">Monthly Cost</h4>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">₹{billingData.amount}</p>
                        <p className="text-sm text-muted-foreground">Premium membership</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Download className="h-4 w-4 text-purple-600" />
                          <h4 className="font-medium">Payment Method</h4>
                        </div>
                        <p className="text-lg font-bold text-purple-600">{billingData.paymentMethod}</p>
                        <p className="text-sm text-muted-foreground">Auto-payment enabled</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Payments */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Payments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Premium Membership - January 2024</p>
                          <p className="text-sm text-muted-foreground">Jan 15, 2024</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹999</p>
                          <p className="text-sm text-green-600">Paid</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Premium Membership - December 2023</p>
                          <p className="text-sm text-muted-foreground">Dec 15, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹999</p>
                          <p className="text-sm text-green-600">Paid</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Premium Membership - November 2023</p>
                          <p className="text-sm text-muted-foreground">Nov 15, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹999</p>
                          <p className="text-sm text-green-600">Paid</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Subscription Details Tab */}
            {activeBillingTab === 'subscription' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Plan Features */}
                    <div>
                      <h4 className="font-medium mb-4">Premium Plan Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 p-3 border rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">Unlimited Bookings</p>
                            <p className="text-sm text-muted-foreground">Book escorts without limits</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 border rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">Priority Support</p>
                            <p className="text-sm text-muted-foreground">24/7 customer support</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 border rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">Advanced Search</p>
                            <p className="text-sm text-muted-foreground">Filter by multiple criteria</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 border rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">Verified Profiles</p>
                            <p className="text-sm text-muted-foreground">Access to verified escorts</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Billing Information */}
                    <div>
                      <h4 className="font-medium mb-4">Billing Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">Payment Method</h5>
                          <p className="text-sm">{billingData.paymentMethod}</p>
                          <Button variant="outline" size="sm" className="mt-2" onClick={() => alert('Redirecting to payment method update...')}>
                            Update Payment Method
                          </Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">Billing Cycle</h5>
                          <p className="text-sm">Monthly billing on the 15th</p>
                          <p className="text-sm text-muted-foreground">Next billing: {billingData.nextBilling}</p>
                        </div>
                      </div>
                    </div>

                    {/* Subscription Actions */}
                    <div className="flex justify-end space-x-4">
                      <Button variant="outline" onClick={() => alert('Redirecting to plan selection...')}>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Change Plan
                      </Button>
                      <Button variant="outline" onClick={() => alert('Cancelling subscription...')}>
                        <XCircle className="h-4 w-4 mr-2" />
                        Cancel Subscription
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Invoices Tab */}
            {activeBillingTab === 'invoices' && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Invoice History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {invoices.map((invoice) => (
                        <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-lg transition-shadow">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Download className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{invoice.description}</h4>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span>Invoice #{invoice.id}</span>
                                <span>•</span>
                                <span>{invoice.date}</span>
                                <span>•</span>
                                <span className="text-green-600 capitalize">{invoice.status}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-lg">₹{invoice.amount.toLocaleString()}</div>
                            <Button variant="outline" size="sm" onClick={() => alert(`Downloading invoice ${invoice.id}...`)}>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
} 