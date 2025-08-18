"use client"

import { useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  fill?: boolean
  priority?: boolean
  placeholder?: string
  onLoad?: () => void
  onError?: () => void
}

export default function LazyImage({
  src,
  alt,
  className,
  fill = false,
  priority = false,
  placeholder = '/api/placeholder/300/400',
  onLoad,
  onError,
  ...props
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    onError?.()
  }

  return (
    <div ref={imgRef} className={cn('relative overflow-hidden', className)}>
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      )}

      {/* Error placeholder */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
          <span className="text-red-500 text-sm">Image not available</span>
        </div>
      )}

      {/* Actual image */}
      {isInView && !hasError && (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          priority={priority}
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </div>
  )
} 