"use client"

import { useEffect, useState } from 'react'

interface PerformanceOptimizerProps {
  children: React.ReactNode
  enableLazyLoading?: boolean
  enableCaching?: boolean
  enableMonitoring?: boolean
}

export default function PerformanceOptimizer({
  children,
  enableLazyLoading = true,
  enableCaching = true,
  enableMonitoring = true
}: PerformanceOptimizerProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Performance monitoring
    if (enableMonitoring) {
      monitorPerformance()
    }

    // Preload critical resources
    preloadCriticalResources()

    setIsLoaded(true)
  }, [enableMonitoring])

  const monitorPerformance = () => {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log('LCP:', lastEntry.startTime)
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime)
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        console.log('CLS:', clsValue)
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    }

    // Monitor page load time
    window.addEventListener('load', () => {
      const loadTime = performance.now()
      console.log('Page Load Time:', loadTime)
    })
  }

  const preloadCriticalResources = () => {
    // Preload critical images
    const criticalImages = [
      '/api/placeholder/300/400',
      // Add other critical image paths
    ]

    criticalImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })

    // Preload critical fonts
    const criticalFonts = [
      // Add critical font URLs
    ]

    criticalFonts.forEach(href => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'font'
      link.href = href
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })
  }

  const optimizeImages = () => {
    // Intersection Observer for lazy loading
    if (enableLazyLoading && 'IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.removeAttribute('data-src')
              imageObserver.unobserve(img)
            }
          }
        })
      }, {
        rootMargin: '50px'
      })

      // Observe all images with data-src attribute
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img)
      })
    }
  }

  const setupCaching = () => {
    if (enableCaching && 'serviceWorker' in navigator) {
      // Register service worker for caching
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration)
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error)
        })
    }
  }

  useEffect(() => {
    if (isLoaded) {
      optimizeImages()
      setupCaching()
    }
  }, [isLoaded])

  return <>{children}</>
} 