"use client"


import { Card, CardContent } from '@/components/ui/card'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Filter, X, Clock, DollarSign, CheckCircle, XCircle, AlertCircle, Download, CreditCard, History, Check, Check, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs } from '@/components/ui/tabs'

import { History, Wallet, Download, Search, Filter, Clock, DollarSign, CheckCircle, XCircle, AlertCircle, Plus, X, Edit, CreditCard } from 'lucide-react'
import type { PaymentMethod, PaymentTransaction } from '@/types/payments'

import PaymentMethodCard from '@/components/payments/PaymentMethodCard'
import PaymentForm from '@/components/payments/PaymentForm'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PaymentsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<PaymentTransaction | null>(null)
  const [activeTab, setActiveTab] = useState<'methods' | 'transactions'>('methods')

  // Mock data for demonstration
  const mockPaymentMethods: PaymentMethod[] = [
    {
      id: '1',
      userId: 'user1',
      type: 'card',
      provider: 'razorpay',
      name: 'HDFC Credit Card',
      last4: '1234',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
      isVerified: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      userId: 'user1',
      type: 'upi',
      provider: 'razorpay',
      name: 'UPI Payment',
      isDefault: false,
      isVerified: true,
      metadata: {
        upiId: 'john.doe@hdfc'
      },
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z'
    },
    {
      id: '3',
      userId: 'user1',
      type: 'bank_account',
      provider: 'razorpay',
      name: 'HDFC Bank Account',
      last4: '5678',
      isDefault: false,
      isVerified: false,
      metadata: {
        bankName: 'HDFC Bank',
        accountType: 'Savings'
      },
      createdAt: '2024-02-01T00:00:00Z',
      updatedAt: '2024-02-01T00:00:00Z'
    }
  ]

  const mockTransactions: PaymentTransaction[] = [
    {
      id: '1',
      bookingId: 'booking1',
      userId: 'user1',
      escortId: 'escort1',
      amount: 15000,
      currency: 'INR',
      status: 'completed',
      paymentMethodId: '1',
      paymentMethodType: 'card',
      gatewayTransactionId: 'txn_123456',
      description: 'Payment for Priya Sharma - Dinner Date',
      metadata: {
        serviceType: 'Dinner Date',
        duration: 180,
        location: 'Mumbai, Maharashtra',
        bookingDate: '2024-07-15',
        serviceDate: '2024-07-20',

        platformFee: 1500,
        taxAmount: 0
      },
      createdAt: '2024-07-15T10:30:00Z',
      updatedAt: '2024-07-15T10:30:00Z'
    },
    {
      id: '2',
      bookingId: 'booking2',
      userId: 'user1',
      escortId: 'escort2',
      amount: 12000,
      currency: 'INR',
      status: 'pending',
      paymentMethodId: '2',
      paymentMethodType: 'upi',
      description: 'Payment for Zara Khan - Companionship',
      metadata: {
        serviceType: 'Companionship',
        duration: 120,
        location: 'Delhi, NCR',
        bookingDate: '2024-07-16',
        serviceDate: '2024-07-22',

        platformFee: 1200,
        taxAmount: 0
      },
      createdAt: '2024-07-16T14:20:00Z',
      updatedAt: '2024-07-16T14:20:00Z'
    },
    {
      id: '3',
      bookingId: 'booking3',
      userId: 'user1',
      escortId: 'escort3',
      amount: 20000,
      currency: 'INR',
      status: 'failed',
      paymentMethodId: '1',
      paymentMethodType: 'card',
      failureReason: 'Insufficient funds',
      failureCode: 'INSUFFICIENT_FUNDS',
      description: 'Payment for Sofia Rodriguez - VIP Service',
      metadata: {
        serviceType: 'VIP Service',
        duration: 240,
        location: 'Bangalore, Karnataka',
        bookingDate: '2024-07-17',
        serviceDate: '2024-07-25',

        platformFee: 2000,
        taxAmount: 0
      },
      createdAt: '2024-07-17T09:15:00Z',
      updatedAt: '2024-07-17T09:15:00Z'
    }
  ]



  // Load data
  const loadData = async () => {
    setIsLoading(true)
    try {
      // For now, using mock data
      // const [methodsResponse, transactionsResponse] = await Promise.all([
      //   paymentSystem.paymentMethods.list(),
      //   paymentSystem.transactions.list()
      // ])
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setPaymentMethods(mockPaymentMethods)
      setTransactions(mockTransactions)
    } catch {
      console.error('Failed to load payment data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle payment method actions
  const handleEditPaymentMethod = (method: PaymentMethod) => {
    // Handle edit payment method
    console.log('Edit payment method:', method)
  }

  const handleDeletePaymentMethod = (methodId: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== methodId))
  }

  const handleSetDefaultPaymentMethod = (methodId: string) => {
    setPaymentMethods(prev => prev.map(method => ({
      ...method,
      isDefault: method.id === methodId
    })))
  }

  // Handle payment processing
  const handlePayment = async (paymentData: any) => {
    try {
      // For now, just add to transactions
      const newTransaction: PaymentTransaction = {
        id: Date.now().toString(),
        bookingId: paymentData.bookingId,
        userId: 'user1',
        escortId: 'escort1',
        amount: paymentData.amount,
        currency: paymentData.currency,
        status: 'processing',
        paymentMethodId: paymentData.paymentMethodId,
        paymentMethodType: 'card',
        description: paymentData.description,
        metadata: paymentData.metadata,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      setTransactions(prev => [newTransaction, ...prev])
      setShowPaymentForm(false)
    } catch {
      console.error('Payment failed:', error)
    }
  }

  // Load initial data
  useEffect(() => {
    loadData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'failed':
        return 'text-red-600 bg-red-100'
      case 'processing':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'failed':
        return <XCircle className="h-4 w-4" />
      case 'processing':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
                    <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-muted-foreground">
          Manage your payment methods and view transactions
        </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setShowPaymentForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </div>

        {/* Payment Form Modal */}
        {showPaymentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <PaymentForm
                amount={15000}
                currency="INR"
                bookingId="booking123"
                description="Payment for Escort Service"
                paymentMethods={paymentMethods}
                onPayment={handlePayment}
                onCancel={() => setShowPaymentForm(false)}
                isLoading={false}
              />
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg mb-6">
          <Button
            variant={activeTab === 'methods' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('methods')}
            className="flex-1"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Payment Methods
          </Button>
          <Button
            variant={activeTab === 'transactions' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('transactions')}
            className="flex-1"
          >
            <History className="h-4 w-4 mr-2" />
            Transactions
          </Button>

        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Payment Methods Tab */}
            {activeTab === 'methods' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Payment Methods</h2>
                  <span className="text-sm text-muted-foreground">
                    {paymentMethods.length} method{paymentMethods.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {paymentMethods.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No payment methods</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Add a payment method to start making payments
                      </p>
                      <Button onClick={() => setShowPaymentForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Payment Method
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {paymentMethods.map((method) => (
                      <PaymentMethodCard
                        key={method.id}
                        paymentMethod={method}
                        isDefault={method.isDefault}
                        onEdit={handleEditPaymentMethod}
                        onDelete={handleDeletePaymentMethod}
                        onSetDefault={handleSetDefaultPaymentMethod}
                        showActions={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Transaction History</h2>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        placeholder="Search transactions..."
                        className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>

                {transactions.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <History className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No transactions</h3>
                      <p className="text-muted-foreground text-center">
                        Your transaction history will appear here
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <Card key={transaction.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <DollarSign className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium">{transaction.description}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(transaction.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">₹{transaction.amount.toLocaleString()}</div>
                              <Badge 
                                variant="secondary" 
                                className={`text-xs ${getStatusColor(transaction.status)}`}
                              >
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(transaction.status)}
                                  {transaction.status}
                                </div>
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}


          </>
        )}
      </main>
      <Footer />
    </div>
  )
} 