export interface PaymentMethod {
  id: string
  userId: string
  type: 'card' | 'bank_account' | 'upi' | 'wallet' | 'net_banking'
  provider: 'razorpay' | 'stripe' | 'paypal' | 'razorpay' | 'phonepe' | 'gpay'
  name: string
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
  isVerified: boolean
  metadata?: {
    bankName?: string
    accountType?: string
    upiId?: string
    walletType?: string
  }
  createdAt: string
  updatedAt: string
}

export interface PaymentTransaction {
  id: string
  bookingId: string
  userId: string
  escortId: string
  agencyId?: string
  amount: number
  currency: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled'
  paymentMethodId: string
  paymentMethodType: string
  gatewayTransactionId?: string
  gatewayResponse?: any
  description: string
  metadata?: {
    serviceType: string
    duration: number
    location?: string
    bookingDate: string
    serviceDate: string
    platformFee?: number
    taxAmount?: number
  }
  refundAmount?: number
  refundReason?: string
  refundedAt?: string
  failureReason?: string
  failureCode?: string
  createdAt: string
  updatedAt: string
}

export interface PaymentRequest {
  bookingId: string
  amount: number
  currency: string
  paymentMethodId: string
  description: string
  metadata?: {
    serviceType: string
    duration: number
    location?: string
    bookingDate: string
    serviceDate: string
  }
}

export interface PaymentResponse {
  success: boolean
  transactionId?: string
  gatewayTransactionId?: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  message?: string
  error?: string
  redirectUrl?: string
  paymentIntent?: any
}

export interface RefundRequest {
  transactionId: string
  amount: number
  reason: string
  description?: string
}

export interface RefundResponse {
  success: boolean
  refundId?: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  message?: string
  error?: string
}

export interface PaymentMethodRequest {
  type: 'card' | 'bank_account' | 'upi' | 'wallet' | 'net_banking'
  provider: 'razorpay' | 'stripe' | 'paypal' | 'razorpay' | 'phonepe' | 'gpay'
  name: string
  cardNumber?: string
  expiryMonth?: number
  expiryYear?: number
  cvv?: string
  bankAccountNumber?: string
  ifscCode?: string
  accountHolderName?: string
  upiId?: string
  walletType?: string
  isDefault?: boolean
}

export interface PaymentMethodResponse {
  success: boolean
  paymentMethodId?: string
  message?: string
  error?: string
  requiresVerification?: boolean
  verificationUrl?: string
}

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded'
  clientSecret: string
  paymentMethodTypes: string[]
  metadata?: any
  created: number
}

export interface PaymentWebhook {
  id: string
  event: string
  data: any
  signature: string
  timestamp: number
  processed: boolean
  createdAt: string
}

export interface PaymentStats {
  totalTransactions: number
  totalAmount: number
  successfulTransactions: number
  failedTransactions: number
  pendingTransactions: number
  refundedTransactions: number
  averageTransactionAmount: number
  monthlyStats: Array<{
    month: string
    transactions: number
    amount: number
  }>
  paymentMethodStats: Array<{
    method: string
    count: number
    amount: number
  }>
}



export interface WithdrawalRequest {
  userId: string
  userType: 'escort' | 'agency'
  amount: number
  paymentMethodId: string
  description?: string
}

export interface WithdrawalResponse {
  success: boolean
  withdrawalId?: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  message?: string
  error?: string
  estimatedDelivery?: string
}

export interface Withdrawal {
  id: string
  userId: string
  userType: 'escort' | 'agency'
  amount: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
  paymentMethodId: string
  paymentMethodType: string
  description?: string
  failureReason?: string
  processedAt?: string
  createdAt: string
  updatedAt: string
}

export interface PaymentSettings {
  userId: string
  userType: 'escort' | 'agency'
  platformFee: number
  autoWithdrawal: boolean
  withdrawalThreshold: number
  preferredPaymentMethod?: string
  taxSettings: {
    gstEnabled: boolean
    gstNumber?: string
    panNumber?: string
  }
  bankDetails?: {
    accountNumber: string
    ifscCode: string
    accountHolderName: string
    bankName: string
  }
  upiDetails?: {
    upiId: string
    name: string
  }
  createdAt: string
  updatedAt: string
}

export interface PaymentNotification {
  id: string
  userId: string
  type: 'payment_received' | 'payment_failed' | 'refund_processed' | 'withdrawal_completed' | 'withdrawal_failed'
  title: string
  message: string
  data?: any
  read: boolean
  createdAt: string
}

export interface PaymentGateway {
  id: string
  name: string
  provider: string
  isActive: boolean
  config: {
    publicKey: string
    secretKey: string
    webhookSecret?: string
    environment: 'test' | 'production'
    supportedCurrencies: string[]
    supportedPaymentMethods: string[]
  }
  fees: {
    percentage: number
    fixed: number
    currency: string
  }
  createdAt: string
  updatedAt: string
}

export interface PaymentAnalytics {
  overallStats: {
    totalRevenue: number
    totalTransactions: number
    successRate: number
    averageTransactionValue: number
    monthlyGrowth: number
  }
  trends: {
    dailyRevenue: Array<{
      date: string
      revenue: number
      transactions: number
    }>
    monthlyRevenue: Array<{
      month: string
      revenue: number
      transactions: number
    }>
    paymentMethodUsage: Array<{
      method: string
      count: number
      amount: number
      percentage: number
    }>
  }
  topPerformers: {
    escorts: Array<{
      escortId: string
      escortName: string
      revenue: number
      bookings: number
    }>
    agencies: Array<{
      agencyId: string
      agencyName: string
      revenue: number
      bookings: number
    }>
  }
  issues: {
    failedTransactions: number
    pendingRefunds: number
    disputedTransactions: number
    averageResolutionTime: number
  }
} 