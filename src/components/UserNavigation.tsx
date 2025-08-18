"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Menu, HelpCircle, Star, Heart, Calendar, Clock, DollarSign, MessageCircle, Settings, Bell, Sun, Moon, X, BarChart3, User } from 'lucide-react'

export default function UserNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const pathname = usePathname()

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/')
  }

  const userNavItems = [
    {
      title: 'Dashboard',
      href: '/user/dashboard',
      icon: BarChart3
    },
    {
      title: 'Bookings',
      href: '/user/bookings',
      icon: Calendar
    },
    {
      title: 'Favorites',
      href: '/user/favorites',
      icon: Heart
    },
    {
      title: 'Messages',
      href: '/user/messages',
      icon: MessageCircle
    },
    {
      title: 'Reviews',
      href: '/user/reviews',
      icon: Star
    },
    {
      title: 'Payments',
      href: '/user/payments',
      icon: DollarSign
    },
    {
      title: 'History',
      href: '/user/history',
      icon: Clock
    },
    {
      title: 'Settings',
      href: '/user/settings',
      icon: Settings
    },
    {
      title: 'Support',
      href: '/user/support',
      icon: HelpCircle
    }
  ]

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/user/dashboard" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <User className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <span className="text-lg font-bold sm:hidden">User</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {userNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            <Button variant="outline" size="sm" asChild className="hidden lg:inline-flex relative">
              <Link href="/user/notifications">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-background/95 backdrop-blur">
            <div className="container px-4 py-4 space-y-4">
              {/* Mobile Actions */}
              <div className="flex items-center justify-between pb-4 border-b">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="h-9 w-9"
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild className="relative">
                    <Link href="/user/notifications">
                      <Bell className="h-4 w-4" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        3
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="grid grid-cols-2 gap-2">
                {userNavItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex flex-col items-center space-y-1 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted hover:text-foreground'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs">{item.title}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Floating Messages Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="h-16 w-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 animate-bounce"
          asChild
        >
          <Link href="/user/messages" className="flex items-center justify-center">
            <div className="relative">
              <MessageCircle className="h-7 w-7 text-white" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </Link>
        </Button>
      </div>
    </>
  )
} 