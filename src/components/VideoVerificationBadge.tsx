"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Clock, CheckCircle, XCircle, AlertCircle, Upload, Shield, Check, Check, Shield } from 'lucide-react'

import { CardHeader, CardTitle } from '@/components/ui/card'

import { CheckCircle, XCircle, Shield, Upload, AlertCircle } from 'lucide-react'

interface VideoVerificationBadgeProps {
  status: 'pending' | 'approved' | 'rejected'
  size?: 'sm' | 'md' | 'lg'
  showDetails?: boolean
  onUpload?: () => void
}

export default function VideoVerificationBadge({ 
  status, 
  size = 'md', 
  showDetails = false,
  onUpload 
}: VideoVerificationBadgeProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getStatusConfig = () => {
    switch (status) {
      case 'approved':
        return {
          icon: CheckCircle,
          text: 'Video Verified',
          className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
          iconClassName: 'text-green-600'
        }
      case 'pending':
        return {
          icon: Clock,
          text: 'Verification Pending',
          className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
          iconClassName: 'text-yellow-600'
        }
      case 'rejected':
        return {
          icon: XCircle,
          text: 'Verification Failed',
          className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
          iconClassName: 'text-red-600'
        }
    }
  }

  const config = getStatusConfig()
  const IconComponent = config.icon

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }

  return (
    <div className="relative">
      <div
        className={`inline-flex items-center rounded-full font-medium transition-all duration-200 ${config.className} ${sizeClasses[size]} cursor-pointer hover:scale-105`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <IconComponent className={`mr-1.5 ${config.iconClassName} ${iconSizes[size]}`} />
        <span>{config.text}</span>
      </div>

      {/* Hover Details */}
      {showDetails && isHovered && (
        <Card className="absolute top-full left-0 mt-2 w-80 z-50 shadow-lg border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Video Verification Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {status === 'approved' && (
              <div className="space-y-2">
                <div className="flex items-center text-sm text-green-700 dark:text-green-300">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Identity verified through video call</span>
                </div>
                <div className="flex items-center text-sm text-green-700 dark:text-green-300">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Profile photos match video</span>
                </div>
                <div className="flex items-center text-sm text-green-700 dark:text-green-300">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Background check completed</span>
                </div>
              </div>
            )}

            {status === 'pending' && (
              <div className="space-y-2">
                <div className="flex items-center text-sm text-yellow-700 dark:text-yellow-300">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Verification in progress</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Usually takes 24-48 hours
                </div>
                {onUpload && (
                  <Button size="sm" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Video
                  </Button>
                )}
              </div>
            )}

            {status === 'rejected' && (
              <div className="space-y-2">
                <div className="flex items-center text-sm text-red-700 dark:text-red-300">
                  <XCircle className="h-4 w-4 mr-2" />
                  <span>Verification failed</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Please contact support for details
                </div>
                {onUpload && (
                  <Button size="sm" variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                )}
              </div>
            )}

            <div className="pt-2 border-t">
              <div className="flex items-center text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3 mr-1" />
                <span>Video verification ensures profile authenticity</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 