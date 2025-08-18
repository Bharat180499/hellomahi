"use client"

import { CardHeader, CardTitle } from '@/components/ui/card'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'

import { Banknote, Smartphone, Wallet, Eye, EyeOff, Shield, CheckCircle, CreditCard, Lock } from 'lucide-react'
import type { PaymentMethod, PaymentRequest } from '@/types/payments'

interface PaymentFormProps {
  amount: number
  currency: string
  bookingId: string
  description: string
  paymentMethods: PaymentMethod[]
  onPayment: (paymentData: PaymentRequest) => void
  onCancel: () => void
  isLoading?: boolean
}

export default function PaymentForm({
  amount,
  currency,
  bookingId,
  description,
  paymentMethods,
  onPayment,
  onCancel,
  isLoading = false
}: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [showNewCardForm, setShowNewCardForm] = useState(false)
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })
  const [showCvv, setShowCvv] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Set default payment method if available
  useEffect(() => {
    const defaultMethod = paymentMethods.find(method => method.isDefault)
    if (defaultMethod) {
      setSelectedMethod(defaultMethod)
    } else if (paymentMethods.length > 0) {
      setSelectedMethod(paymentMethods[0])
    }
  }, [paymentMethods])

  const validateCardData = () => {
    const newErrors: Record<string, string> = {}

    if (!cardData.number.replace(/\s/g, '').match(/^\d{13,19}$/)) {
      newErrors.number = 'Please enter a valid card number'
    }

    if (!cardData.expiry.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiry = 'Please enter expiry in MM/YY format'
    }

    if (!cardData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'Please enter a valid CVV'
    }

    if (!cardData.name.trim()) {
      newErrors.name = 'Please enter cardholder name'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (showNewCardForm && !validateCardData()) {
      return
    }

    const paymentData: PaymentRequest = {
      bookingId,
      amount,
      currency,
      paymentMethodId: selectedMethod?.id || '',
      description,
      metadata: {
        serviceType: 'Escort Service',
        duration: 120,
        bookingDate: new Date().toISOString().split('T')[0],
        serviceDate: new Date().toISOString().split('T')[0]
      }
    }

    onPayment(paymentData)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="h-5 w-5" />
      case 'bank_account':
        return <Banknote className="h-5 w-5" />
      case 'upi':
        return <Smartphone className="h-5 w-5" />
      case 'wallet':
        return <Wallet className="h-5 w-5" />
      default:
        return <CreditCard className="h-5 w-5" />
    }
  }

  const getPaymentDisplayName = (method: PaymentMethod) => {
    switch (method.type) {
      case 'card':
        return `${method.brand || 'Card'} •••• ${method.last4 || '****'}`
      case 'bank_account':
        return `${method.metadata?.bankName || 'Bank'} •••• ${method.last4 || '****'}`
      case 'upi':
        return `${method.metadata?.upiId || 'UPI ID'}`
      case 'wallet':
        return `${method.metadata?.walletType || 'Wallet'}`
      default:
        return method.name
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Payment Details</span>
          <div className="flex items-center gap-1">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-sm text-muted-foreground">Secure</span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Amount Display */}
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold">
            ₹{amount.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">
            {description}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Select Payment Method</Label>
          
          {/* Existing Payment Methods */}
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedMethod?.id === method.id
                  ? 'border-primary bg-primary/5'
                  : 'border-muted hover:border-primary/50'
              }`}
              onClick={() => setSelectedMethod(method)}
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                {getPaymentIcon(method.type)}
              </div>
              <div className="flex-1">
                <div className="font-medium">{getPaymentDisplayName(method)}</div>
                <div className="text-sm text-muted-foreground">
                  {method.isVerified ? 'Verified' : 'Pending Verification'}
                </div>
              </div>
              {selectedMethod?.id === method.id && (
                <CheckCircle className="h-5 w-5 text-primary" />
              )}
            </div>
          ))}

          {/* Add New Card Option */}
          <div
            className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
              showNewCardForm
                ? 'border-primary bg-primary/5'
                : 'border-muted hover:border-primary/50'
            }`}
            onClick={() => {
              setShowNewCardForm(!showNewCardForm)
              setSelectedMethod(null)
            }}
          >
            <div className="p-2 bg-primary/10 rounded-lg">
              <CreditCard className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Add New Card</div>
              <div className="text-sm text-muted-foreground">
                Credit or debit card
              </div>
            </div>
            {showNewCardForm && (
              <CheckCircle className="h-5 w-5 text-primary" />
            )}
          </div>
        </div>

        {/* New Card Form */}
        {showNewCardForm && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                value={cardData.number}
                onChange={(e) => setCardData(prev => ({
                  ...prev,
                  number: formatCardNumber(e.target.value)
                }))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className={errors.number ? 'border-red-500' : ''}
              />
              {errors.number && (
                <p className="text-sm text-red-500">{errors.number}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  value={cardData.expiry}
                  onChange={(e) => setCardData(prev => ({
                    ...prev,
                    expiry: formatExpiry(e.target.value)
                  }))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className={errors.expiry ? 'border-red-500' : ''}
                />
                {errors.expiry && (
                  <p className="text-sm text-red-500">{errors.expiry}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <div className="relative">
                  <Input
                    id="cvv"
                    type={showCvv ? 'text' : 'password'}
                    value={cardData.cvv}
                    onChange={(e) => setCardData(prev => ({
                      ...prev,
                      cvv: e.target.value.replace(/\D/g, '')
                    }))}
                    placeholder="123"
                    maxLength={4}
                    className={errors.cvv ? 'border-red-500' : ''}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setShowCvv(!showCvv)}
                  >
                    {showCvv ? (
                      <EyeOff className="h-3 w-3" />
                    ) : (
                      <Eye className="h-3 w-3" />
                    )}
                  </Button>
                </div>
                {errors.cvv && (
                  <p className="text-sm text-red-500">{errors.cvv}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                value={cardData.name}
                onChange={(e) => setCardData(prev => ({
                  ...prev,
                  name: e.target.value
                }))}
                placeholder="John Doe"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <Lock className="h-4 w-4 text-green-600 mt-0.5" />
          <div className="text-sm">
            <div className="font-medium text-green-800 dark:text-green-200">
              Secure Payment
            </div>
            <div className="text-green-700 dark:text-green-300">
              Your payment information is encrypted and secure. We never store your card details.
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
          <div className="flex justify-between text-sm">
            <span>Service Amount</span>
            <span>₹{(amount * 0.9).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Platform Fee</span>
            <span>₹{(amount * 0.1).toLocaleString()}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-medium">
            <span>Total Amount</span>
            <span>₹{amount.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || (!selectedMethod && !showNewCardForm)}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Pay ₹{amount.toLocaleString()}
              </>
            )}
          </Button>
        </div>

        {/* Payment Methods Info */}
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <CreditCard className="h-3 w-3" />
            <span>Visa</span>
          </div>
          <div className="flex items-center gap-1">
            <CreditCard className="h-3 w-3" />
            <span>Mastercard</span>
          </div>
          <div className="flex items-center gap-1">
            <Smartphone className="h-3 w-3" />
            <span>UPI</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 