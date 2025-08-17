"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Wallet, 
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Shield,
  Star
} from 'lucide-react'
import type { PaymentMethod } from '@/types/payments'

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod
  isDefault?: boolean
  onEdit?: (paymentMethod: PaymentMethod) => void
  onDelete?: (paymentMethodId: string) => void
  onSetDefault?: (paymentMethodId: string) => void
  showActions?: boolean
  compact?: boolean
}

export default function PaymentMethodCard({
  paymentMethod,
  isDefault = false,
  onEdit,
  onDelete,
  onSetDefault,
  showActions = true,
  compact = false
}: PaymentMethodCardProps) {
  const [showActionsMenu, setShowActionsMenu] = useState(false)

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

  const getPaymentDisplayName = () => {
    switch (paymentMethod.type) {
      case 'card':
        return `${paymentMethod.brand || 'Card'} •••• ${paymentMethod.last4 || '****'}`
      case 'bank_account':
        return `${paymentMethod.metadata?.bankName || 'Bank'} •••• ${paymentMethod.last4 || '****'}`
      case 'upi':
        return `${paymentMethod.metadata?.upiId || 'UPI ID'}`
      case 'wallet':
        return `${paymentMethod.metadata?.walletType || 'Wallet'}`
      default:
        return paymentMethod.name
    }
  }

  const getPaymentSubtitle = () => {
    switch (paymentMethod.type) {
      case 'card':
        return `Expires ${paymentMethod.expiryMonth}/${paymentMethod.expiryYear}`
      case 'bank_account':
        return `${paymentMethod.metadata?.accountType || 'Account'}`
      case 'upi':
        return 'UPI Payment'
      case 'wallet':
        return 'Digital Wallet'
      default:
        return paymentMethod.provider
    }
  }

  const getStatusColor = () => {
    if (paymentMethod.isVerified) {
      return 'text-green-600'
    }
    return 'text-yellow-600'
  }

  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <div className="flex items-center gap-3">
          {getPaymentIcon(paymentMethod.type)}
          <div>
            <div className="font-medium text-sm">{getPaymentDisplayName()}</div>
            <div className="text-xs text-muted-foreground">{getPaymentSubtitle()}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isDefault && (
            <Badge variant="secondary" className="text-xs">
              Default
            </Badge>
          )}
          {paymentMethod.isVerified ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          )}
        </div>
      </div>
    )
  }

  return (
    <Card className="relative">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              {getPaymentIcon(paymentMethod.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium truncate">{getPaymentDisplayName()}</h4>
                {isDefault && (
                  <Badge variant="secondary" className="text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Default
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-1">
                {getPaymentSubtitle()}
              </p>
              
              <div className="flex items-center gap-2">
                <span className={`text-xs ${getStatusColor()}`}>
                  {paymentMethod.isVerified ? 'Verified' : 'Pending Verification'}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground capitalize">
                  {paymentMethod.provider}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          {showActions && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowActionsMenu(!showActionsMenu)}
                className="h-8 w-8 p-0"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>

              {showActionsMenu && (
                <div className="absolute top-full right-0 mt-1 bg-background border rounded-lg shadow-lg py-1 z-10 min-w-[160px]">
                  {!isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        onSetDefault?.(paymentMethod.id)
                        setShowActionsMenu(false)
                      }}
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Set as Default
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      onEdit?.(paymentMethod)
                      setShowActionsMenu(false)
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-red-600 hover:text-red-700"
                    onClick={() => {
                      onDelete?.(paymentMethod.id)
                      setShowActionsMenu(false)
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Security badge */}
        <div className="flex items-center gap-1 mt-3 pt-3 border-t">
          <Shield className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Secured by {paymentMethod.provider}
          </span>
        </div>
      </CardContent>
    </Card>
  )
} 