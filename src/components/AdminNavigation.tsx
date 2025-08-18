"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { X, Bell, Shield, Activity, ChevronLeft, ChevronRight, Shield, Bell } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/ThemeToggle'
import { Menu, HelpCircle, ChevronLeft, ChevronRight, Calendar, DollarSign, Users, Shield, Crown, Settings, Bell, X, FileText, Activity, BarChart3, TrendingUp, Building, User } from 'lucide-react'

export default function AdminNavigation() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme } = useTheme()
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/')
  }

  const adminNavItems = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: BarChart3
    },
    {
      title: 'Users',
      href: '/admin/users',
      icon: Users
    },
    {
      title: 'Escorts',
      href: '/admin/escorts',
      icon: Crown
    },
    {
      title: 'Agencies',
      href: '/admin/agencies',
      icon: Building
    },
    {
      title: 'Bookings',
      href: '/admin/bookings',
      icon: Calendar
    },
    {
      title: 'Analytics',
      href: '/admin/analytics',
      icon: TrendingUp
    },
    {
      title: 'Moderation',
      href: '/admin/moderation',
      icon: Shield
    },
    {
      title: 'Payments',
      href: '/admin/payments',
      icon: DollarSign
    },
    {
      title: 'Reports',
      href: '/admin/reports',
      icon: FileText
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: Settings
    },
    {
      title: 'Support',
      href: '/admin/support',
      icon: HelpCircle
    }
  ]

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Admin Panel</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="h-9 w-9"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } bg-background border-r ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <Link href="/admin/dashboard" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              {!isCollapsed && (
                <span className="text-lg font-bold">Admin Panel</span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 hidden lg:flex"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-2">
            {adminNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors group ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted hover:text-foreground'
                  }`}
                  title={isCollapsed ? item.title : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              )
            })}
          </nav>

          {/* Footer Actions */}
          <div className="border-t p-2 space-y-2">
            <ThemeToggle
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${isCollapsed ? 'w-9' : 'w-full'}`}
              showText={!isCollapsed}
              showSystem={true}
            />
            
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className={`relative ${isCollapsed ? 'w-9 h-9 p-0' : 'w-full'}`}
              title={isCollapsed ? 'Notifications' : undefined}
            >
              <Link href="/admin/notifications">
                <Bell className="h-4 w-4" />
                {!isCollapsed && <span className="ml-2">Notifications</span>}
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  7
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Floating Activity Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="h-16 w-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 border-0 animate-pulse"
          asChild
        >
          <Link href="/admin/moderation" className="flex items-center justify-center">
            <div className="relative">
              <Activity className="h-7 w-7 text-white" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
          </Link>
        </Button>
      </div>
    </>
  )
}
