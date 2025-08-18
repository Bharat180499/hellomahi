"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { X, User, Sun, Moon, Shield, Crown, Shield, Crown } from 'lucide-react'

import { Menu, Shield, Crown, Moon } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Crown className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Premium Directory</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/plans" className="text-sm font-medium transition-colors hover:text-primary">
            Plans
          </Link>
          <Link href="/cities" className="text-sm font-medium transition-colors hover:text-primary">
            Cities
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Button variant="outline" size="sm" asChild>
            <Link href="/auth/login">
              <User className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
          
          <Button variant="default" size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600" asChild>
            <Link href="/plans">
              <Shield className="mr-2 h-4 w-4" />
              Join Now
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container space-y-4 pb-4">
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/plans" 
                className="text-sm font-medium transition-colors hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Plans
              </Link>
              <Link 
                href="/cities" 
                className="text-sm font-medium transition-colors hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Cities
              </Link>
              <Link 
                href="/about" 
                className="text-sm font-medium transition-colors hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </nav>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/auth/login">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button variant="default" size="sm" className="w-full bg-gradient-to-r from-purple-600 to-pink-600" asChild>
                <Link href="/plans">
                  <Shield className="mr-2 h-4 w-4" />
                  Join Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 