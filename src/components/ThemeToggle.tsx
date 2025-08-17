"use client"

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ThemeToggleProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  showText?: boolean
  showSystem?: boolean
}

export default function ThemeToggle({ 
  variant = 'ghost', 
  size = 'icon', 
  className = '',
  showText = false,
  showSystem = false
}: ThemeToggleProps) {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant={variant} size={size} className={className} disabled>
        <Sun className="h-4 w-4" />
        {showText && <span className="ml-2">Loading...</span>}
      </Button>
    )
  }

  const getCurrentTheme = () => {
    if (theme === 'system') return systemTheme || 'dark'
    return theme || 'dark'
  }

  const getNextTheme = () => {
    const current = getCurrentTheme()
    if (showSystem) {
      if (current === 'light') return 'dark'
      if (current === 'dark') return 'system'
      return 'light'
    } else {
      return current === 'light' ? 'dark' : 'light'
    }
  }

  const toggleTheme = () => {
    const nextTheme = getNextTheme()
    setTheme(nextTheme)
  }

  const getThemeIcon = () => {
    const current = getCurrentTheme()
    if (current === 'dark') return <Sun className="h-4 w-4" />
    if (current === 'light') return <Moon className="h-4 w-4" />
    return <Monitor className="h-4 w-4" />
  }

  const getThemeText = () => {
    const current = getCurrentTheme()
    if (current === 'dark') return 'Light Mode'
    if (current === 'light') return showSystem ? 'System' : 'Dark Mode'
    return 'Light Mode'
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={className}
      title={`Switch to ${getThemeText()}`}
    >
      {getThemeIcon()}
      {showText && <span className="ml-2">{getThemeText()}</span>}
    </Button>
  )
}
