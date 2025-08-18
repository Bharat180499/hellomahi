"use client"

import { CardHeader, CardTitle } from '@/components/ui/card'

import { Camera, Shield, Crown, DollarSign, Settings, Bell, Calendar, Upload } from 'lucide-react'

import VideoVerificationBadge from '@/components/VideoVerificationBadge'
import { formatDate } from '@/lib/utils'

// Mock user data
const mockUser = {
  id: '1',
  name: 'Priya Sharma',
  email: 'priya@example.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
  isVerified: true,
  plan: '30' as const,
  planExpiry: new Date('2024-02-15'),
  createdAt: new Date('2024-01-15'),
  videoVerificationStatus: 'pending' as const
}

export default function DashboardPage() {
  
  const [uploadProgress, setUploadProgress] = useState(0)

  const daysUntilExpiry = Math.ceil((mockUser.planExpiry.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your profile and verification status
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
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
                <div className="flex items-start space-x-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-muted">
                      <img
                        src={mockUser.avatar}
                        alt={mockUser.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      size="icon"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Profile Details */}
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={mockUser.name}
                          disabled={!isEditing}
                          className="w-full mt-1 px-3 py-2 border rounded-md disabled:bg-muted"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue={mockUser.email}
                          disabled={!isEditing}
                          className="w-full mt-1 px-3 py-2 border rounded-md disabled:bg-muted"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Phone
                        </label>
                        <input
                          type="tel"
                          defaultValue={mockUser.phone}
                          disabled={!isEditing}
                          className="w-full mt-1 px-3 py-2 border rounded-md disabled:bg-muted"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Location
                        </label>
                        <input
                          type="text"
                          defaultValue="Mumbai, Maharashtra"
                          disabled={!isEditing}
                          className="w-full mt-1 px-3 py-2 border rounded-md disabled:bg-muted"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex gap-2">
                        <Button>Save Changes</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Video Verification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Video Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <VideoVerificationBadge 
                        status={mockUser.videoVerificationStatus} 
                        size="lg"
                        showDetails={true}
                      />
                      <span className="text-sm text-muted-foreground">
                        Last updated: {formatDate(mockUser.createdAt)}
                      </span>
                    </div>
                  </div>

                  {mockUser.videoVerificationStatus === "pending" && (
                    <div className="border rounded-lg p-4 bg-muted/30">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Upload Verification Video</h4>
                        <Button size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Video
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Upload Progress</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-sm text-muted-foreground">
                    <p>Video verification helps build trust with potential clients and increases your profile visibility.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services & Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Services & Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Hourly Rate (₹)
                      </label>
                      <input
                        type="number"
                        defaultValue="15000"
                        disabled={!isEditing}
                        className="w-full mt-1 px-3 py-2 border rounded-md disabled:bg-muted"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Currency
                      </label>
                      <select
                        defaultValue="INR"
                        disabled={!isEditing}
                        className="w-full mt-1 px-3 py-2 border rounded-md disabled:bg-muted"
                      >
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Services Offered
                    </label>
                    <div className="mt-2 space-y-2">
                      {['Companionship', 'Dinner Date', 'Travel', 'VIP Service'].map((service) => (
                        <label key={service} className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Plan Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crown className="h-5 w-5 mr-2" />
                  Plan Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {mockUser.plan} Days Plan
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Premium Features Active
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Expires on:</span>
                      <span className="font-medium">{formatDate(mockUser.planExpiry)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Days remaining:</span>
                      <span className={`font-medium ${daysUntilExpiry < 7 ? 'text-red-600' : 'text-green-600'}`}>
                        {daysUntilExpiry} days
                      </span>
                    </div>
                  </div>

                  <Button className="w-full">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Renew Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Availability
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photos
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profile Views</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Messages</span>
                    <span className="font-medium">89</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Favorites</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reviews</span>
                    <span className="font-medium">23</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 