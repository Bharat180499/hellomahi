"use client"


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, User, Phone, Mail, Shield, ArrowLeft, Save, Shield, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Trash2, User, Mail, Phone, Shield, Save } from 'lucide-react'

import Link from 'next/link'
import AgencyNavigation from '@/components/AgencyNavigation'

interface TeamMember {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  status: 'active' | 'inactive'
  permissions: {
    viewBookings: boolean
    editBookings: boolean
    viewEscorts: boolean
    editEscorts: boolean
    viewReports: boolean
    editSettings: boolean
  }
}

export default function AgencyTeamEditPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState<TeamMember>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'manager',
    status: 'active',
    permissions: {
      viewBookings: true,
      editBookings: false,
      viewEscorts: true,
      editEscorts: false,
      viewReports: false,
      editSettings: false
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const roles = [
    { value: 'admin', label: 'Admin', description: 'Full access to all features' },
    { value: 'manager', label: 'Manager', description: 'Manage bookings and escorts' },
    { value: 'support', label: 'Support', description: 'Customer support and basic operations' }
  ]

  // Mock data - in real app, fetch from API
  useEffect(() => {
    const mockTeamMember: TeamMember = {
      id: params.id,
      firstName: params.id === '1' ? 'Amit' : params.id === '2' ? 'Priya' : 'Rahul',
      lastName: params.id === '1' ? 'Sharma' : params.id === '2' ? 'Kumar' : 'Kumar',
      email: params.id === '1' ? 'amit@elitecompanions.com' : params.id === '2' ? 'priya@elitecompanions.com' : 'rahul@elitecompanions.com',
      phone: '+91 98765 43210',
      role: params.id === '1' ? 'admin' : params.id === '2' ? 'manager' : 'support',
      status: 'active',
      permissions: {
        viewBookings: true,
        editBookings: params.id === '1',
        viewEscorts: true,
        editEscorts: params.id === '1',
        viewReports: params.id === '1',
        editSettings: params.id === '1'
      }
    }
    setFormData(mockTeamMember)
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert('Team member updated successfully!')
    }, 2000)
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to remove this team member? This action cannot be undone.')) {
      setIsDeleting(true)
      
      // Simulate API call
      setTimeout(() => {
        setIsDeleting(false)
        alert('Team member removed successfully!')
        // Redirect back to settings
        window.location.href = '/agency/settings'
      }, 2000)
    }
  }

  const handlePermissionChange = (permission: string, value: boolean) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [permission]: value
      }
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <AgencyNavigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Link href="/agency/settings" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-3xl font-bold">Edit Team Member</h1>
            </div>
            <p className="text-muted-foreground">Update team member information and permissions</p>
          </div>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Trash2 className="h-4 w-4 mr-2 animate-spin" />
                Removing...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Remove Member
              </>
            )}
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Edit Team Member</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name *</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name *</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                          className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Status</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="status"
                        value="active"
                        checked={formData.status === 'active'}
                        onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
                        className="rounded border-gray-300"
                      />
                      <span>Active</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="status"
                        value="inactive"
                        checked={formData.status === 'inactive'}
                        onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
                        className="rounded border-gray-300"
                      />
                      <span>Inactive</span>
                    </label>
                  </div>
                </div>

                {/* Role Selection */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Role & Permissions</h3>
                  <div className="space-y-3">
                    {roles.map((role) => (
                      <label key={role.value} className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <input
                          type="radio"
                          name="role"
                          value={role.value}
                          checked={formData.role === role.value}
                          onChange={(e) => setFormData({...formData, role: e.target.value})}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{role.label}</span>
                            {role.value === 'admin' && (
                              <Shield className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{role.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Custom Permissions */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Custom Permissions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.permissions.viewBookings}
                          onChange={(e) => handlePermissionChange('viewBookings', e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <span>View Bookings</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.permissions.editBookings}
                          onChange={(e) => handlePermissionChange('editBookings', e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <span>Edit Bookings</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.permissions.viewEscorts}
                          onChange={(e) => handlePermissionChange('viewEscorts', e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <span>View Escorts</span>
                      </label>
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.permissions.editEscorts}
                          onChange={(e) => handlePermissionChange('editEscorts', e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <span>Edit Escorts</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.permissions.viewReports}
                          onChange={(e) => handlePermissionChange('viewReports', e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <span>View Reports</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.permissions.editSettings}
                          onChange={(e) => handlePermissionChange('editSettings', e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <span>Edit Settings</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <Button variant="outline" asChild>
                    <Link href="/agency/settings">
                      Cancel
                    </Link>
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Save className="h-4 w-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Update Member
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
