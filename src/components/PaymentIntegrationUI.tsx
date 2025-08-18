"use client"

import { CardHeader, CardTitle } from '@/components/ui/card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, Clock, Calendar, DollarSign, CheckCircle, Download, ArrowLeft, ArrowRight, Ban, CreditCard, Wallet, Check, Check, Calendar, DollarSign, Trash2 } from 'lucide-react'

import { Wallet, Banknote, Download, Calendar, DollarSign, CheckCircle, Plus, ArrowRight, ArrowLeft, Trash2, CreditCard } from 'lucide-react'

interface PaymentMethod {
  id: string
  type: 'card' | 'upi' | 'netbanking' | 'wallet'
  name: string
  number?: string
  upiId?: string
  bankName?: string
  isDefault: boolean
  isVerified: boolean
  expiryDate?: string
}

interface Transaction {
  id: string
  type: 'booking' | 'subscription' | 'refund' | 'withdrawal'
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  paymentMethod: string
  description: string
  date: Date
  bookingId?: string
  clientName?: string
  transactionId: string
}

export default function PaymentIntegrationUI() {
  const [activeTab, setActiveTab] = useState<'methods' | 'transactions' | 'payouts'>('methods')
  
  const [selectedPaymentType, setSelectedPaymentType] = useState<'card' | 'upi' | 'netbanking' | 'wallet'>('card')

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'HDFC Credit Card',
      number: '**** **** **** 1234',
      isDefault: true,
      isVerified: true,
      expiryDate: '12/25'
    },
    {
      id: '2',
      type: 'upi',
      name: 'Google Pay',
      upiId: 'rahul@okicici',
      isDefault: false,
      isVerified: true
    },
    {
      id: '3',
      type: 'netbanking',
      name: 'ICICI Bank',
      bankName: 'ICICI Bank',
      isDefault: false,
      isVerified: true
    }
  ])

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'booking',
      amount: 30000,
      currency: 'INR',
      status: 'completed',
      paymentMethod: 'HDFC Credit Card',
      description: 'Booking payment for Priya Sharma',
      date: new Date('2024-01-20'),
      bookingId: 'BK001',
      clientName: 'Rahul Verma',
      transactionId: 'TXN123456789'
    },
    {
      id: '2',
      type: 'subscription',
      amount: 4999,
      currency: 'INR',
      status: 'completed',
      paymentMethod: 'Google Pay',
      description: 'Premium subscription renewal',
      date: new Date('2024-01-18'),
      transactionId: 'TXN123456788'
    },
    {
      id: '3',
      type: 'booking',
      amount: 45000,
      currency: 'INR',
      status: 'pending',
      paymentMethod: 'ICICI Bank',
      description: 'Booking payment for Zara Khan',
      date: new Date('2024-01-22'),
      bookingId: 'BK002',
      clientName: 'Amit Patel',
      transactionId: 'TXN123456787'
    },
    {
      id: '4',
      type: 'refund',
      amount: 15000,
      currency: 'INR',
      status: 'completed',
      paymentMethod: 'HDFC Credit Card',
      description: 'Refund for cancelled booking',
      date: new Date('2024-01-15'),
      bookingId: 'BK003',
      transactionId: 'TXN123456786'
    }
  ])

  const [payoutMethods, setPayoutMethods] = useState([
    {
      id: '1',
      type: 'bank',
      name: 'HDFC Bank',
      accountNumber: '**** **** 5678',
      ifscCode: 'HDFC0001234',
      isDefault: true,
      isVerified: true
    },
    {
      id: '2',
      type: 'upi',
      name: 'UPI Transfer',
      upiId: 'priya@okhdfc',
      isDefault: false,
      isVerified: true
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'failed':
        return 'text-red-600 bg-red-100'
      case 'refunded':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="h-4 w-4" />
      case 'subscription':
        return <CreditCard className="h-4 w-4" />
      case 'refund':
        return <ArrowLeft className="h-4 w-4" />
      case 'withdrawal':
        return <ArrowRight className="h-4 w-4" />
      default:
        return <DollarSign className="h-4 w-4" />
    }
  }

  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="h-5 w-5" />
      case 'upi':
        return <Wallet className="h-5 w-5" />
      case 'netbanking':
        return <Banknote className="h-5 w-5" />
      case 'wallet':
        return <Wallet className="h-5 w-5" />
      default:
        return <DollarSign className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payment Center</h1>
          <p className="text-muted-foreground">
            Manage your payment methods and transactions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
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
          Transactions
        </button>
        <button
          onClick={() => setActiveTab('payouts')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'payouts'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Payout Methods
        </button>
      </div>

      {/* Payment Methods Tab */}
      {activeTab === 'methods' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paymentMethods.map(method => (
              <Card key={method.id} className="relative">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getPaymentMethodIcon(method.type)}
                      <div>
                        <h3 className="font-medium">{method.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">{method.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {method.isDefault && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                      {method.isVerified && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {method.number && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Card Number</span>
                        <span className="text-sm font-mono">{method.number}</span>
                      </div>
                    )}
                    {method.upiId && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">UPI ID</span>
                        <span className="text-sm font-mono">{method.upiId}</span>
                      </div>
                    )}
                    {method.bankName && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Bank</span>
                        <span className="text-sm">{method.bankName}</span>
                      </div>
                    )}
                    {method.expiryDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Expires</span>
                        <span className="text-sm">{method.expiryDate}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add New Payment Method */}
            <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
                <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                <h3 className="font-medium text-muted-foreground">Add Payment Method</h3>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  Add a new credit card, UPI, or bank account
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <div className="space-y-6">
          {/* Transaction Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                    <p className="text-2xl font-bold">₹75,000</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold">₹45,000</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">₹45,000</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Refunds</p>
                    <p className="text-2xl font-bold">₹15,000</p>
                  </div>
                  <ArrowLeft className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transactions List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-muted rounded-lg">
                        {getTypeIcon(transaction.type)}
                      </div>
                      <div>
                        <h4 className="font-medium">{transaction.description}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span>{transaction.date.toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{transaction.paymentMethod}</span>
                          {transaction.clientName && (
                            <>
                              <span>•</span>
                              <span>{transaction.clientName}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
                          ₹{transaction.amount.toLocaleString()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {transaction.transactionId}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Payout Methods Tab */}
      {activeTab === 'payouts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {payoutMethods.map(method => (
              <Card key={method.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {method.type === 'bank' ? (
                        <Banknote className="h-5 w-5" />
                      ) : (
                        <Wallet className="h-5 w-5" />
                      )}
                      <div>
                        <h3 className="font-medium">{method.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">{method.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {method.isDefault && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                      {method.isVerified && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {method.accountNumber && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Account Number</span>
                        <span className="text-sm font-mono">{method.accountNumber}</span>
                      </div>
                    )}
                    {method.ifscCode && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">IFSC Code</span>
                        <span className="text-sm font-mono">{method.ifscCode}</span>
                      </div>
                    )}
                    {method.upiId && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">UPI ID</span>
                        <span className="text-sm font-mono">{method.upiId}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add New Payout Method */}
            <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
                <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                <h3 className="font-medium text-muted-foreground">Add Payout Method</h3>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  Add a bank account or UPI for receiving payments
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Payout History */}
          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Banknote className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No payout history yet</p>
                <p className="text-sm">Your earnings will appear here once you start receiving payments</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 