"use client"


import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Key, Smartphone, Download, LogOut, Eye, EyeOff, Calendar, Shield, Phone, Mail, Settings, Bell, Sun, Moon, X, Edit, Trash2, Camera, Globe, Info, User, Save } from 'lucide-react'
import UserNavigation from '@/components/UserNavigation'

interface UserProfile {
  name: string
  email: string
  phone: string
  avatar: string
  location: string
  dateOfBirth: string
  language: string
  timezone: string
}

interface NotificationSettings {
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  bookingUpdates: boolean
  newMessages: boolean
  promotionalOffers: boolean
  securityAlerts: boolean
}

export default function UserSettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'preferences'>('profile')
  
  
  const [isDark, setIsDark] = useState(true)

  const [profile, setProfile] = useState<UserProfile>({
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    location: 'Mumbai, Maharashtra',
    dateOfBirth: '1990-05-15',
    language: 'English',
    timezone: 'Asia/Kolkata'
  })

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    bookingUpdates: true,
    newMessages: true,
    promotionalOffers: false,
    securityAlerts: true
  })

  const [securitySettings, setSecuritySettings] = useState({
    loginAlerts: true,
    deviceManagement: true,
    sessionTimeout: '30'
  })

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const handleProfileSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  const handleNotificationToggle = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSecurityToggle = (key: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }))
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-background">
      <UserNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Profile Information
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {isEditing ? (
                        <>
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                          <Button onClick={handleProfileSave}>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </>
                      ) : (
                        <Button onClick={() => setIsEditing(true)}>
                          <Settings className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Image
                        src={profile.avatar}
                        alt={profile.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <h3 className="font-semibold">{profile.name}</h3>
                      <p className="text-sm text-muted-foreground">Member since January 2024</p>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Date of Birth</label>
                      <input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => setProfile(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Language</label>
                      <select
                        value={profile.language}
                        onChange={(e) => setProfile(prev => ({ ...prev, language: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Gujarati">Gujarati</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Password Change */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Change Password</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">New Password</label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                      <Button>
                        <Key className="h-4 w-4 mr-2" />
                        Update Password
                      </Button>
                    </div>



                    {/* Login Alerts */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-green-600" />
                        <div>
                          <h4 className="font-semibold">Login Alerts</h4>
                          <p className="text-sm text-muted-foreground">
                            Get notified when someone logs into your account
                          </p>
                        </div>
                      </div>
                      <Button
                        variant={securitySettings.loginAlerts ? 'default' : 'outline'}
                        onClick={() => handleSecurityToggle('loginAlerts')}
                      >
                        {securitySettings.loginAlerts ? 'Enabled' : 'Enable'}
                      </Button>
                    </div>

                    {/* Device Management */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-purple-600" />
                        <div>
                          <h4 className="font-semibold">Device Management</h4>
                          <p className="text-sm text-muted-foreground">
                            Manage devices that have access to your account
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">
                        Manage Devices
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Email Notifications */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={notifications.emailNotifications ? 'default' : 'outline'}
                      onClick={() => handleNotificationToggle('emailNotifications')}
                    >
                      {notifications.emailNotifications ? 'Enabled' : 'Enable'}
                    </Button>
                  </div>

                  {/* SMS Notifications */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-5 w-5 text-green-600" />
                      <div>
                        <h4 className="font-semibold">SMS Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via SMS
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={notifications.smsNotifications ? 'default' : 'outline'}
                      onClick={() => handleNotificationToggle('smsNotifications')}
                    >
                      {notifications.smsNotifications ? 'Enabled' : 'Enable'}
                    </Button>
                  </div>

                  {/* Push Notifications */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-5 w-5 text-purple-600" />
                      <div>
                        <h4 className="font-semibold">Push Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive push notifications on your device
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={notifications.pushNotifications ? 'default' : 'outline'}
                      onClick={() => handleNotificationToggle('pushNotifications')}
                    >
                      {notifications.pushNotifications ? 'Enabled' : 'Enable'}
                    </Button>
                  </div>

                  {/* Specific Notifications */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Specific Notifications</h4>
                    <div className="space-y-3">
                      {Object.entries({
                        bookingUpdates: 'Booking Updates',
                        newMessages: 'New Messages',
                        promotionalOffers: 'Promotional Offers',
                        securityAlerts: 'Security Alerts'
                      }).map(([key, label]) => (
                        <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="text-sm font-medium">{label}</span>
                          <Button
                            variant={notifications[key as keyof NotificationSettings] ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleNotificationToggle(key as keyof NotificationSettings)}
                          >
                            {notifications[key as keyof NotificationSettings] ? 'On' : 'Off'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Preferences */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      General Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Theme */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {isDark ? <Moon className="h-5 w-5 text-blue-600" /> : <Sun className="h-5 w-5 text-yellow-600" />}
                        <div>
                          <h4 className="font-semibold">Theme</h4>
                          <p className="text-sm text-muted-foreground">
                            Choose your preferred theme
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" onClick={toggleTheme}>
                        {isDark ? 'Dark Mode' : 'Light Mode'}
                      </Button>
                    </div>

                    {/* Language */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Globe className="h-5 w-5 text-green-600" />
                        <div>
                          <h4 className="font-semibold">Language</h4>
                          <p className="text-sm text-muted-foreground">
                            Choose your preferred language
                          </p>
                        </div>
                      </div>
                      <select
                        value={profile.language}
                        onChange={(e) => setProfile(prev => ({ ...prev, language: e.target.value }))}
                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Gujarati">Gujarati</option>
                      </select>
                    </div>

                    {/* Timezone */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        <div>
                          <h4 className="font-semibold">Timezone</h4>
                          <p className="text-sm text-muted-foreground">
                            Set your local timezone
                          </p>
                        </div>
                      </div>
                      <select
                        value={profile.timezone}
                        onChange={(e) => setProfile(prev => ({ ...prev, timezone: e.target.value }))}
                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                        <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                        <option value="America/New_York">America/New_York (EST)</option>
                        <option value="Europe/London">Europe/London (GMT)</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Download My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 