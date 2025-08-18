"use client"



import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Eye, Trash2, User, Users, Bell, Shield, Building, CreditCard, EyeOff } from 'lucide-react'
import AgencyNavigation from '@/components/AgencyNavigation'

export default function AgencySettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'billing' | 'team'>('profile')
  const [isLoading, setIsLoading] = useState(false)
  
  const [showNewPassword, setShowNewPassword] = useState(false)

  const [profileData, setProfileData] = useState({
    agencyName: 'Elite Companions Agency',
    email: 'admin@elitecompanions.com',
    phone: '+91 98765 43210',
    website: 'https://elitecompanions.com',
    address: 'Bandra West, Mumbai, Maharashtra',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    description: 'Premium escort agency providing high-end companionship services across major Indian cities.',
    established: '2020'
  })

  const [securityData, setSecurityData] = useState({
    newPassword: '',
    confirmPassword: ''
  })

  const [notificationSettings, setNotificationSettings] = useState({
    newBookings: true,
    bookingUpdates: true,
    paymentReceived: true,
    escortsOnline: false,
    systemUpdates: true,
    marketingEmails: false,
    smsNotifications: true,
    emailNotifications: true
  })

  const [billingData, setBillingData] = useState({
    plan: 'Premium',
    nextBilling: '2024-02-15',
    amount: '9999',
    currency: 'INR',
    autoRenew: true,
    paymentMethod: 'Credit Card ending in 1234'
  })

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log('Profile updated:', profileData)
    }, 2000)
  }

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log('Security updated:', securityData)
    }, 2000)
  }

  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log('Notifications updated:', notificationSettings)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <AgencyNavigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold">Agency Settings</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage your agency profile, security, and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
            {/* Sidebar Navigation */}
            <div className="xl:col-span-1">
              <Card>
                <CardContent className="p-4">
                  <nav className="grid grid-cols-2 xl:grid-cols-1 gap-2 xl:gap-2">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-sm ${
                        activeTab === 'profile'
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <Building className="h-4 w-4" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('security')}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-sm ${
                        activeTab === 'security'
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <Shield className="h-4 w-4" />
                      <span>Security</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('notifications')}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-sm ${
                        activeTab === 'notifications'
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('billing')}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-sm ${
                        activeTab === 'billing'
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>Billing</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('team')}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-sm ${
                        activeTab === 'team'
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <Users className="h-4 w-4" />
                      <span>Team</span>
                    </button>

                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="xl:col-span-3">
              {activeTab === 'profile' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Agency Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSubmit} className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Agency Name *</label>
                          <input
                            type="text"
                            value={profileData.agencyName}
                            onChange={(e) => setProfileData({...profileData, agencyName: e.target.value})}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email *</label>
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone *</label>
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Website</label>
                          <input
                            type="url"
                            value={profileData.website}
                            onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">City *</label>
                          <input
                            type="text"
                            value={profileData.city}
                            onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">State *</label>
                          <select
                            value={profileData.state}
                            onChange={(e) => setProfileData({...profileData, state: e.target.value})}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          >
                            <option value="">Select State</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                            <option value="Ladakh">Ladakh</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Puducherry">Puducherry</option>
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Pincode</label>
                          <input
                            type="text"
                            value={profileData.pincode}
                            onChange={(e) => setProfileData({...profileData, pincode: e.target.value})}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Established Year</label>
                          <input
                            type="number"
                            value={profileData.established}
                            onChange={(e) => setProfileData({...profileData, established: e.target.value})}
                            min="1900"
                            max="2024"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                        </div>
                      </div>



                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                          value={profileData.description}
                          onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                          rows={4}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                      </div>



                      <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'security' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSecuritySubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">New Password</label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? 'text' : 'password'}
                              value={securityData.newPassword}
                              onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                              className="w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            value={securityData.confirmPassword}
                            onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>



                      <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? 'Updating...' : 'Update Security'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'notifications' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleNotificationSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Booking Notifications</h4>
                        <div className="space-y-3">
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={notificationSettings.newBookings}
                              onChange={(e) => setNotificationSettings({...notificationSettings, newBookings: e.target.checked})}
                              className="rounded border-gray-300"
                            />
                            <span>New booking requests</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={notificationSettings.bookingUpdates}
                              onChange={(e) => setNotificationSettings({...notificationSettings, bookingUpdates: e.target.checked})}
                              className="rounded border-gray-300"
                            />
                            <span>Booking status updates</span>
                          </label>

                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">System Notifications</h4>
                        <div className="space-y-3">

                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={notificationSettings.systemUpdates}
                              onChange={(e) => setNotificationSettings({...notificationSettings, systemUpdates: e.target.checked})}
                              className="rounded border-gray-300"
                            />
                            <span>System updates and maintenance</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={notificationSettings.marketingEmails}
                              onChange={(e) => setNotificationSettings({...notificationSettings, marketingEmails: e.target.checked})}
                              className="rounded border-gray-300"
                            />
                            <span>Marketing emails and promotions</span>
                          </label>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Notification Channels</h4>
                        <div className="space-y-3">
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={notificationSettings.emailNotifications}
                              onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                              className="rounded border-gray-300"
                            />
                            <span>Email notifications</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={notificationSettings.smsNotifications}
                              onChange={(e) => setNotificationSettings({...notificationSettings, smsNotifications: e.target.checked})}
                              className="rounded border-gray-300"
                            />
                            <span>SMS notifications</span>
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? 'Saving...' : 'Save Preferences'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'billing' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Billing & Subscription</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Current Plan</h4>
                        <p className="text-2xl font-bold text-primary">{billingData.plan}</p>
                        <p className="text-sm text-muted-foreground">₹{billingData.amount}/month</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Next Billing</h4>
                        <p className="text-lg font-medium">{billingData.nextBilling}</p>
                        <p className="text-sm text-muted-foreground">Auto-renewal enabled</p>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Payment Method</h4>
                      <p className="text-sm">{billingData.paymentMethod}</p>
                      <Button variant="outline" size="sm" className="mt-2" onClick={() => alert('Redirecting to payment method update...')}>
                        Update Payment Method
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Billing History</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Premium Plan - January 2024</p>
                            <p className="text-sm text-muted-foreground">Jan 15, 2024</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹9,999</p>
                            <p className="text-sm text-green-600">Paid</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Premium Plan - December 2023</p>
                            <p className="text-sm text-muted-foreground">Dec 15, 2023</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹9,999</p>
                            <p className="text-sm text-green-600">Paid</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button variant="outline" onClick={() => alert('Downloading invoice...')}>
                        Download Invoice
                      </Button>
                      <Button variant="outline" onClick={() => window.open('/agency/billing', '_blank')}>
                        Change Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'team' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Team Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Team Members</h4>
                      <Button onClick={() => window.open('/agency/team/add', '_blank')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Member
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                            AS
                          </div>
                          <div>
                            <p className="font-medium">Amit Sharma</p>
                            <p className="text-sm text-muted-foreground">amit@elitecompanions.com</p>
                            <p className="text-xs text-muted-foreground">Admin</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => window.open('/agency/team/edit/1', '_blank')}>
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => confirm('Are you sure you want to remove this team member?') && alert('Team member removed')}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-medium">
                            PK
                          </div>
                          <div>
                            <p className="font-medium">Priya Kumar</p>
                            <p className="text-sm text-muted-foreground">priya@elitecompanions.com</p>
                            <p className="text-xs text-muted-foreground">Manager</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => window.open('/agency/team/edit/2', '_blank')}>
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => confirm('Are you sure you want to remove this team member?') && alert('Team member removed')}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-medium">
                            RK
                          </div>
                          <div>
                            <p className="font-medium">Rahul Kumar</p>
                            <p className="text-sm text-muted-foreground">rahul@elitecompanions.com</p>
                            <p className="text-xs text-muted-foreground">Support</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => window.open('/agency/team/edit/3', '_blank')}>
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => confirm('Are you sure you want to remove this team member?') && alert('Team member removed')}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Invite New Member</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <Button className="mt-4" onClick={() => alert('Invitation sent successfully!')}>
                        Send Invitation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}


            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 
