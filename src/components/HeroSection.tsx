"use client"

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, User, Users, CheckCircle, Shield, Crown, ArrowRight, Lock, Check, Check, Star, Shield, Crown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Users, Star, ArrowRight, Crown, Lock, CheckCircle } from 'lucide-react'


export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-bg opacity-90"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Premium
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Escort Services
            </span>
            For Discerning Clients
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Access verified, premium escorts with our exclusive client membership. Safe, secure, and discreet.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center space-x-2 text-white/90">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-lg font-semibold">500+ Verified</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Users className="h-5 w-5 text-blue-400" />
              <span className="text-lg font-semibold">50+ Cities</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-lg font-semibold">4.8★ Rating</span>
            </div>
          </div>

          {/* CTA Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {/* Client Registration */}
            <Card className="glass-effect border-white/20 hover:border-white/40 transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Join as Client</h3>
                  <p className="text-white/80 mb-4">
                    Get exclusive access to verified escorts with premium features
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 w-full"
                    asChild
                  >
                    <Link href="/plans?type=user">
                      View Client Plans
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Escort Registration */}
            <Card className="glass-effect border-white/20 hover:border-white/40 transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Join as Escort</h3>
                  <p className="text-white/80 mb-4">
                    Create your profile and connect with premium clients
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white border-0 w-full"
                    asChild
                  >
                    <Link href="/plans?type=escort">
                      View Escort Plans
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/80">
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-green-400" />
              <span className="text-sm">Exclusive Access</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-sm">Video Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-sm">Safe & Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-white/70 text-sm">
            <p>Premium membership required to view escort profiles and contact details</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
} 