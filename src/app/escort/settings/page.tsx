"use client"
import { CardHeader, CardTitle, Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Eye, Edit, Trash2, X, User, Calendar, DollarSign, Camera, Download, Save, CreditCard, Lock, LogOut, EyeOff, Settings } from 'lucide-react'

export default function EscortSettingsPage() {

  const [billingData, setBillingData] = useState({
    plan: 'Premium',
    nextBilling: '2024-02-15',
    amount: '2999',
    currency: 'INR',
    autoRenew: true,
    paymentMethod: 'Credit Card ending in 5678',
    commission: '15%',
    payoutSchedule: 'Weekly',
    lastPayout: '2024-01-20',
    totalEarnings: '125000'
  })

  const [accountData, setAccountData] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [notificationSettings, setNotificationSettings] = useState({
    newBookings: true,
    bookingReminders: true,
    paymentReceived: true,
    messages: true,
    profileViews: false,
    marketingEmails: false,
    pushNotifications: true,
    emailNotifications: true
  })

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // Handle account update
  }

  const handlePasswordChange = () => {
    if (accountData.newPassword === accountData.confirmPassword) {
      // Handle password change
      setAccountData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }))
    }
  }

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage your account preferences and security settings
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        {/* Account Settings Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Account Information</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAccountSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input
                      type="text"
                      value={accountData.name}
                      onChange={(e) => setAccountData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <Input
                      type="email"
                      value={accountData.email}
                      onChange={(e) => setAccountData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      value={accountData.phone}
                      onChange={(e) => setAccountData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Profile Photo</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-8 w-8 text-gray-600" />
                      </div>
                      {isEditing && (
                        <Button variant="outline" size="sm">
                          <Camera className="h-4 w-4 mr-2" />
                          Change Photo
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                {isEditing && (
                  <div className="mt-6 flex gap-2">
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={accountData.currentPassword}
                      onChange={(e) => setAccountData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <Input
                    type="password"
                    value={accountData.newPassword}
                    onChange={(e) => setAccountData(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                  <Input
                    type="password"
                    value={accountData.confirmPassword}
                    onChange={(e) => setAccountData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirm new password"
                  />
                </div>
                <Button onClick={handlePasswordChange} disabled={!accountData.newPassword || accountData.newPassword !== accountData.confirmPassword}>
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Delete Account</h3>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Sign Out</h3>
                    <p className="text-sm text-muted-foreground">Sign out from all devices</p>
                  </div>
                  <Button variant="outline">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Booking Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Booking Requests</p>
                        <p className="text-sm text-muted-foreground">Get notified when you receive new booking requests</p>
                      </div>
                      <Switch
                        checked={notificationSettings.newBookings}
                        onCheckedChange={() => toggleNotification('newBookings')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Booking Reminders</p>
                        <p className="text-sm text-muted-foreground">Receive reminders before your scheduled appointments</p>
                      </div>
                      <Switch
                        checked={notificationSettings.bookingReminders}
                        onCheckedChange={() => toggleNotification('bookingReminders')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Payment Received</p>
                        <p className="text-sm text-muted-foreground">Get notified when payments are received</p>
                      </div>
                      <Switch
                        checked={notificationSettings.paymentReceived}
                        onCheckedChange={() => toggleNotification('paymentReceived')}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Communication</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Messages</p>
                        <p className="text-sm text-muted-foreground">Get notified when you receive new messages</p>
                      </div>
                      <Switch
                        checked={notificationSettings.messages}
                        onCheckedChange={() => toggleNotification('messages')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Profile Views</p>
                        <p className="text-sm text-muted-foreground">Get notified when someone views your profile</p>
                      </div>
                      <Switch
                        checked={notificationSettings.profileViews}
                        onCheckedChange={() => toggleNotification('profileViews')}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Marketing</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-muted-foreground">Receive promotional emails and updates</p>
                      </div>
                      <Switch
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={() => toggleNotification('marketingEmails')}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Notification Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                      </div>
                      <Switch
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={() => toggleNotification('pushNotifications')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={() => toggleNotification('emailNotifications')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Billing & Earnings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Subscription Plan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Current Plan</h4>
                  <p className="text-2xl font-bold text-primary">{billingData.plan}</p>
                  <p className="text-sm text-muted-foreground">₹{billingData.amount}/month</p>
                  <p className="text-xs text-muted-foreground mt-1">Premium features included</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Next Billing</h4>
                  <p className="text-lg font-medium">{billingData.nextBilling}</p>
                  <p className="text-sm text-muted-foreground">Auto-renewal enabled</p>
                </div>
              </div>

              {/* Earnings Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <h4 className="font-medium">Total Earnings</h4>
                  </div>
                  <p className="text-2xl font-bold text-green-600">₹{parseInt(billingData.totalEarnings).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Lifetime earnings</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <h4 className="font-medium">Commission Rate</h4>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{billingData.commission}</p>
                  <p className="text-sm text-muted-foreground">Platform commission</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Download className="h-4 w-4 text-purple-600" />
                    <h4 className="font-medium">Payout Schedule</h4>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{billingData.payoutSchedule}</p>
                  <p className="text-sm text-muted-foreground">Last: {billingData.lastPayout}</p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Payment Method</h4>
                <p className="text-sm">{billingData.paymentMethod}</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => alert('Redirecting to payment method update...')}>
                  Update Payment Method
                </Button>
              </div>

              {/* Billing History */}
              <div className="space-y-4">
                <h4 className="font-medium">Billing History</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Premium Plan - January 2024</p>
                      <p className="text-sm text-muted-foreground">Jan 15, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹2,999</p>
                      <p className="text-sm text-green-600">Paid</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Premium Plan - December 2023</p>
                      <p className="text-sm text-muted-foreground">Dec 15, 2023</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹2,999</p>
                      <p className="text-sm text-green-600">Paid</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Premium Plan - November 2023</p>
                      <p className="text-sm text-muted-foreground">Nov 15, 2023</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹2,999</p>
                      <p className="text-sm text-green-600">Paid</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Earnings History */}
              <div className="space-y-4">
                <h4 className="font-medium">Recent Earnings</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Week of Jan 15-21, 2024</p>
                      <p className="text-sm text-muted-foreground">5 bookings completed</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹45,000</p>
                      <p className="text-sm text-green-600">Paid out</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Week of Jan 8-14, 2024</p>
                      <p className="text-sm text-muted-foreground">3 bookings completed</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹32,000</p>
                      <p className="text-sm text-green-600">Paid out</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Week of Jan 1-7, 2024</p>
                      <p className="text-sm text-muted-foreground">4 bookings completed</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹48,000</p>
                      <p className="text-sm text-green-600">Paid out</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => alert('Downloading invoice...')}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
                <Button variant="outline" onClick={() => alert('Redirecting to plan selection...')}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Change Plan
                </Button>
                <Button variant="outline" onClick={() => alert('Redirecting to earnings dashboard...')}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  View Earnings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 