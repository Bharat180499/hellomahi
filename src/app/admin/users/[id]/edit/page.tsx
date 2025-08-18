"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Eye, Trash2, X, User, Phone, Mail, Calendar, ArrowLeft, Save, AlertTriangle, MapPin, Shield, Users, Bell, EyeOff } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'


export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id as string
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    dateOfBirth: '',
    address: '',
    status: 'active',
    userType: 'regular',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    notifications: {
      email: true,
      sms: true,
      push: false
    },
    notes: ''
  })

  // Mock user data - in real app this would come from API
  const mockUserData = {
    id: userId,
    firstName: 'Rahul',
    lastName: 'Verma',
    email: 'rahul@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai',
    dateOfBirth: '1990-05-15',
    address: '123 Main Street, Mumbai, Maharashtra',
    status: 'active',
    userType: 'regular',
    emergencyContact: {
      name: 'Priya Verma',
      phone: '+91 98765 43211',
      relationship: 'Spouse'
    },
    notifications: {
      email: true,
      sms: true,
      push: false
    },
    notes: 'VIP customer, prefers premium escorts'
  }

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // In real app, this would be API response
        setFormData({
          firstName: mockUserData.firstName,
          lastName: mockUserData.lastName,
          email: mockUserData.email,
          phone: mockUserData.phone,
          password: '',
          confirmPassword: '',
          location: mockUserData.location,
          dateOfBirth: mockUserData.dateOfBirth,
          address: mockUserData.address,
          status: mockUserData.status,
          userType: mockUserData.userType,
          emergencyContact: mockUserData.emergencyContact,
          notifications: mockUserData.notifications,
          notes: mockUserData.notes
        })
      } catch {
        alert('Error loading user data')
        router.push('/admin/users')
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [userId, router])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEmergencyContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    if (formData.password && formData.password.length < 8) {
      alert('Password must be at least 8 characters long')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('User updated successfully!')
      router.push(`/admin/users/${userId}`)
    } catch {
      alert('Error updating user. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
      router.push(`/admin/users/${userId}`)
    }
  }

  const handleDeleteUser = () => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      // In a real app, this would make an API call
      alert('User deleted successfully')
      router.push('/admin/users')
    }
  }

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4" />
            <p className="text-muted-foreground">Loading user data...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push(`/admin/users/${userId}`)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to User
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Edit User</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Update user information and settings
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            onClick={handleDeleteUser}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete User
          </Button>
          <Button variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Update the user's personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name *</label>
                  <Input
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name *</label>
                  <Input
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Email Address *</label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Phone Number *</label>
                <Input
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Date of Birth</label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter city/location"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter full address"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Account Settings
              </CardTitle>
              <CardDescription>
                Update account status and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Account Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="banned">Banned</option>
                  <option value="pending">Pending Verification</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">User Type</label>
                <select 
                  value={formData.userType}
                  onChange={(e) => handleInputChange('userType', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="regular">Regular User</option>
                  <option value="premium">Premium User</option>
                  <option value="vip">VIP User</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">New Password (leave blank to keep current)</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter new password"
                    minLength={8}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {formData.password && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Password must be at least 8 characters long
                  </p>
                )}
              </div>

              {formData.password && (
                <div>
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <Input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm new password"
                  />
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Notifications</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="emailNotif" 
                      checked={formData.notifications.email}
                      onChange={(e) => handleNotificationChange('email', e.target.checked)}
                      className="rounded" 
                    />
                    <label htmlFor="emailNotif" className="text-sm">Email Notifications</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="smsNotif" 
                      checked={formData.notifications.sms}
                      onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                      className="rounded" 
                    />
                    <label htmlFor="smsNotif" className="text-sm">SMS Notifications</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="pushNotif" 
                      checked={formData.notifications.push}
                      onChange={(e) => handleNotificationChange('push', e.target.checked)}
                      className="rounded" 
                    />
                    <label htmlFor="pushNotif" className="text-sm">Push Notifications</label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Emergency Contact
              </CardTitle>
              <CardDescription>
                Emergency contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Contact Name</label>
                <Input
                  value={formData.emergencyContact.name}
                  onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                  placeholder="Enter emergency contact name"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Contact Phone</label>
                <Input
                  value={formData.emergencyContact.phone}
                  onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                  placeholder="Enter emergency contact phone"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Relationship</label>
                <Input
                  value={formData.emergencyContact.relationship}
                  onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
                  placeholder="e.g., Spouse, Parent, Friend"
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Additional Information
              </CardTitle>
              <CardDescription>
                Notes and additional details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Admin Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional notes about this user"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={4}
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Important</h4>
                    <p className="text-xs text-yellow-700 mt-1">
                      Changes to account status and user type may affect the user's access to platform features. 
                      Please review carefully before saving.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </main>
  )
}
