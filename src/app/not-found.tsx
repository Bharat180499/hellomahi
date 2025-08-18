"use client"

import Link from 'next/link'

import { Home, Search, Crown, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12">
            {/* 404 Number */}
            <div className="text-8xl md:text-9xl font-bold text-primary/20 mb-4">
              404
            </div>

            {/* Error Message */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Sorry, the page you're looking for doesn't exist. 
              It might have been moved or deleted.
            </p>

            {/* Navigation Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Button asChild className="w-full">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/listings">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Profiles
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-muted-foreground">
                Popular Pages
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link 
                  href="/cities" 
                  className="flex items-center justify-center p-3 border rounded-lg hover:bg-muted transition-colors"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">Cities</span>
                </Link>
                <Link 
                  href="/plans" 
                  className="flex items-center justify-center p-3 border rounded-lg hover:bg-muted transition-colors"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  <span className="text-sm">Plans</span>
                </Link>
                <Link 
                  href="/contact" 
                  className="flex items-center justify-center p-3 border rounded-lg hover:bg-muted transition-colors"
                >
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm">Contact</span>
                </Link>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-8">
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 