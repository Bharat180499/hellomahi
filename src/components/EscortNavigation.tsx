"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  User, 
  Calendar, 
  DollarSign, 
  Settings, 
  MessageCircle, 
  LogOut, 
  Menu, 
  X,
  Crown,
  Bell,
  Search,
  HelpCircle
} from 'lucide-react'

export default function EscortNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    {
      href: '/escort/dashboard',
      label: 'Dashboard',
      icon: User
    },
    {
      href: '/escort/profile',
      label: 'Profile',
      icon: User
    },
    {
      href: '/escort/bookings',
      label: 'Bookings',
      icon: Calendar
    },
    {
      href: '/escort/messages',
      label: 'Messages',
      icon: MessageCircle
    },
    {
      href: '/escort/support',
      label: 'Support',
      icon: HelpCircle
    },
    {
      href: '/escort/settings',
      label: 'Settings',
      icon: Settings
    }
  ]

  const isActive = (href: string) => {
    if (href === '/escort/dashboard') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/escort/dashboard" className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">HelloMahi</span>
              <span className="text-sm text-gray-500">Escort</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Button
                  key={item.href}
                  variant={isActive(item.href) ? "default" : "ghost"}
                  asChild
                  className={`flex items-center space-x-2 ${isActive(item.href) ? 'text-white' : 'text-gray-700 hover:text-gray-900'}`}
                >
                  <Link href={item.href}>
                    <IconComponent className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              )
            })}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-gray-900">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" asChild className="relative text-gray-700 hover:text-gray-900">
              <Link href="/escort/notifications">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="text-gray-700">
              <Link href="/auth/login">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Button
                    key={item.href}
                    variant={isActive(item.href) ? "default" : "ghost"}
                    asChild
                    className={`w-full justify-start ${isActive(item.href) ? 'text-white' : 'text-gray-700 hover:text-gray-900'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href={item.href}>
                      <IconComponent className="h-4 w-4 mr-3" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                )
              })}
              <div className="pt-4 border-t border-gray-200">
                <Button variant="outline" className="w-full text-gray-700" asChild>
                  <Link href="/auth/login">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 