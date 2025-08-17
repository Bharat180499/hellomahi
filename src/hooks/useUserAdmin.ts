"use client"

import { useState, useEffect } from 'react'

interface UserAdminData {
  id: string | number
  email: string
  name: string
  userType?: string
  role: string
  avatar?: string
  isVerified?: boolean
  lastLogin: string
  permissions: string[]
  twoFactorEnabled?: boolean
}

export function useUserAdmin() {
  const [userData, setUserData] = useState<UserAdminData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Use setTimeout to ensure this runs after component mount
    const timer = setTimeout(() => {
      console.log('useUserAdmin: Loading user data...')
      try {
        const userDataStr = localStorage.getItem('userAdminData')
        const token = localStorage.getItem('userAdminToken')
        
        console.log('useUserAdmin: Found data:', { userDataStr: !!userDataStr, token: !!token })
        
        if (userDataStr && token) {
          const parsedUserData = JSON.parse(userDataStr)
          console.log('useUserAdmin: Parsed user data:', parsedUserData)
          setUserData(parsedUserData)
          setIsAuthenticated(true)
        } else {
          console.log('useUserAdmin: No valid data found')
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Error loading user data:', error)
        // Clear invalid data
        localStorage.removeItem('userAdminData')
        localStorage.removeItem('userAdminToken')
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
        console.log('useUserAdmin: Loading complete')
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const login = (user: UserAdminData) => {
    localStorage.setItem('userAdminData', JSON.stringify(user))
    localStorage.setItem('userAdminToken', 'mock-jwt-token-' + Date.now())
    localStorage.setItem('userAdminLastActivity', new Date().toISOString())
    setUserData(user)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('userAdminToken')
    localStorage.removeItem('userAdminData')
    localStorage.removeItem('userAdminLastActivity')
    setUserData(null)
    setIsAuthenticated(false)
  }

  return {
    userData,
    isLoading,
    isAuthenticated,
    login,
    logout
  }
}
