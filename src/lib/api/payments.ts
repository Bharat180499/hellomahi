import { apiClient } from './client'
import type { PaymentMethod, PaymentTransaction, PaymentRequest, PaymentResponse, RefundRequest, RefundResponse, PaymentMethodRequest, PaymentMethodResponse, PaymentIntent, PaymentStats, WithdrawalRequest, WithdrawalResponse, Withdrawal, PaymentSettings, PaymentNotification, PaymentAnalytics } from '@/types/payments'

// Payment Methods
export const paymentMethods = {
  // Get user's payment methods
  list: async (): Promise<{ success: boolean; paymentMethods: PaymentMethod[] }> => {
    return apiClient.get('/payments/methods')
  },

  // Get a specific payment method
  get: async (paymentMethodId: string): Promise<{ success: boolean; paymentMethod: PaymentMethod }> => {
    return apiClient.get(`/payments/methods/${paymentMethodId}`)
  },

  // Add a new payment method
  create: async (data: PaymentMethodRequest): Promise<PaymentMethodResponse> => {
    return apiClient.post('/payments/methods', data)
  },

  // Update a payment method
  update: async (paymentMethodId: string, updates: Partial<PaymentMethodRequest>): Promise<PaymentMethodResponse> => {
    return apiClient.patch(`/payments/methods/${paymentMethodId}`, updates)
  },

  // Delete a payment method
  delete: async (paymentMethodId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/payments/methods/${paymentMethodId}`)
  },

  // Set default payment method
  setDefault: async (paymentMethodId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/payments/methods/${paymentMethodId}/default`)
  },

  // Verify payment method
  verify: async (paymentMethodId: string, verificationData: any): Promise<{ success: boolean }> => {
    return apiClient.post(`/payments/methods/${paymentMethodId}/verify`, verificationData)
  }
}

// Payment Transactions
export const transactions = {
  // Get user's transactions
  list: async (page = 1, limit = 20): Promise<{ success: boolean; transactions: PaymentTransaction[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return apiClient.get(`/payments/transactions?${params}`)
  },

  // Get a specific transaction
  get: async (transactionId: string): Promise<{ success: boolean; transaction: PaymentTransaction }> => {
    return apiClient.get(`/payments/transactions/${transactionId}`)
  },

  // Create a payment transaction
  create: async (data: PaymentRequest): Promise<PaymentResponse> => {
    return apiClient.post('/payments/transactions', data)
  },

  // Confirm payment
  confirm: async (transactionId: string, paymentIntent: any): Promise<PaymentResponse> => {
    return apiClient.post(`/payments/transactions/${transactionId}/confirm`, { paymentIntent })
  },

  // Cancel payment
  cancel: async (transactionId: string, reason?: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/payments/transactions/${transactionId}/cancel`, { reason })
  },

  // Get transaction receipt
  getReceipt: async (transactionId: string): Promise<{ success: boolean; receipt: any }> => {
    return apiClient.get(`/payments/transactions/${transactionId}/receipt`)
  }
}

// Refunds
export const refunds = {
  // Request a refund
  create: async (data: RefundRequest): Promise<RefundResponse> => {
    return apiClient.post('/payments/refunds', data)
  },

  // Get refund status
  getStatus: async (refundId: string): Promise<{ success: boolean; refund: any }> => {
    return apiClient.get(`/payments/refunds/${refundId}`)
  },

  // Cancel refund
  cancel: async (refundId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/payments/refunds/${refundId}/cancel`)
  }
}

// Payment Intents
export const paymentIntents = {
  // Create payment intent
  create: async (amount: number, currency: string, metadata?: any): Promise<{ success: boolean; paymentIntent: PaymentIntent }> => {
    return apiClient.post('/payments/intents', { amount, currency, metadata })
  },

  // Get payment intent
  get: async (intentId: string): Promise<{ success: boolean; paymentIntent: PaymentIntent }> => {
    return apiClient.get(`/payments/intents/${intentId}`)
  },

  // Update payment intent
  update: async (intentId: string, updates: any): Promise<{ success: boolean; paymentIntent: PaymentIntent }> => {
    return apiClient.patch(`/payments/intents/${intentId}`, updates)
  },

  // Cancel payment intent
  cancel: async (intentId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/payments/intents/${intentId}/cancel`)
  }
}

// Withdrawals
export const withdrawals = {
  // Get withdrawal history
  list: async (page = 1, limit = 20): Promise<{ success: boolean; withdrawals: Withdrawal[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return apiClient.get(`/payments/withdrawals?${params}`)
  },

  // Get specific withdrawal
  get: async (withdrawalId: string): Promise<{ success: boolean; withdrawal: Withdrawal }> => {
    return apiClient.get(`/payments/withdrawals/${withdrawalId}`)
  },

  // Request withdrawal
  create: async (data: WithdrawalRequest): Promise<WithdrawalResponse> => {
    return apiClient.post('/payments/withdrawals', data)
  },

  // Cancel withdrawal
  cancel: async (withdrawalId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/payments/withdrawals/${withdrawalId}/cancel`)
  }
}

// Payment Settings
export const paymentSettings = {
  // Get payment settings
  get: async (): Promise<{ success: boolean; settings: PaymentSettings }> => {
    return apiClient.get('/payments/settings')
  },

  // Update payment settings
  update: async (updates: Partial<PaymentSettings>): Promise<{ success: boolean; settings: PaymentSettings }> => {
    return apiClient.patch('/payments/settings', updates)
  },

  // Update bank details
  updateBankDetails: async (bankDetails: PaymentSettings['bankDetails']): Promise<{ success: boolean }> => {
    return apiClient.patch('/payments/settings/bank-details', { bankDetails })
  },

  // Update UPI details
  updateUpiDetails: async (upiDetails: PaymentSettings['upiDetails']): Promise<{ success: boolean }> => {
    return apiClient.patch('/payments/settings/upi-details', { upiDetails })
  },

  // Update tax settings
  updateTaxSettings: async (taxSettings: PaymentSettings['taxSettings']): Promise<{ success: boolean }> => {
    return apiClient.patch('/payments/settings/tax-settings', { taxSettings })
  }
}

// Payment Notifications
export const paymentNotifications = {
  // Get payment notifications
  list: async (page = 1, limit = 20): Promise<{ success: boolean; notifications: PaymentNotification[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return apiClient.get(`/payments/notifications?${params}`)
  },

  // Mark notification as read
  markAsRead: async (notificationId: string): Promise<{ success: boolean }> => {
    return apiClient.post(`/payments/notifications/${notificationId}/read`)
  },

  // Mark all notifications as read
  markAllAsRead: async (): Promise<{ success: boolean }> => {
    return apiClient.post('/payments/notifications/read-all')
  },

  // Get unread count
  getUnreadCount: async (): Promise<{ success: boolean; count: number }> => {
    return apiClient.get('/payments/notifications/unread-count')
  }
}

// Payment Analytics (Admin)
export const paymentAnalytics = {
  // Get payment statistics
  getStats: async (): Promise<{ success: boolean; stats: PaymentStats }> => {
    return apiClient.get('/payments/analytics/stats')
  },

  // Get payment analytics
  getAnalytics: async (period: 'day' | 'week' | 'month' | 'year' = 'month'): Promise<{ success: boolean; analytics: PaymentAnalytics }> => {
    return apiClient.get(`/payments/analytics?period=${period}`)
  },

  // Get failed transactions
  getFailedTransactions: async (page = 1, limit = 20): Promise<{ success: boolean; transactions: PaymentTransaction[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return apiClient.get(`/payments/analytics/failed-transactions?${params}`)
  },

  // Get pending refunds
  getPendingRefunds: async (page = 1, limit = 20): Promise<{ success: boolean; refunds: any[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return apiClient.get(`/payments/analytics/pending-refunds?${params}`)
  },

  // Get disputed transactions
  getDisputedTransactions: async (page = 1, limit = 20): Promise<{ success: boolean; disputes: any[]; hasMore: boolean }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return apiClient.get(`/payments/analytics/disputed-transactions?${params}`)
  }
}

// Payment Gateway Management (Admin)
export const paymentGateways = {
  // Get payment gateways
  list: async (): Promise<{ success: boolean; gateways: any[] }> => {
    return apiClient.get('/payments/gateways')
  },

  // Get specific gateway
  get: async (gatewayId: string): Promise<{ success: boolean; gateway: any }> => {
    return apiClient.get(`/payments/gateways/${gatewayId}`)
  },

  // Create payment gateway
  create: async (data: any): Promise<{ success: boolean; gateway: any }> => {
    return apiClient.post('/payments/gateways', data)
  },

  // Update payment gateway
  update: async (gatewayId: string, updates: any): Promise<{ success: boolean; gateway: any }> => {
    return apiClient.patch(`/payments/gateways/${gatewayId}`, updates)
  },

  // Delete payment gateway
  delete: async (gatewayId: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/payments/gateways/${gatewayId}`)
  },

  // Test payment gateway
  test: async (gatewayId: string): Promise<{ success: boolean; result: any }> => {
    return apiClient.post(`/payments/gateways/${gatewayId}/test`)
  }
}

// Export all payment functions
export const paymentSystem = {
  paymentMethods,
  transactions,
  refunds,
  paymentIntents,
  withdrawals,
  paymentSettings,
  paymentNotifications,
  paymentAnalytics,
  paymentGateways
} 