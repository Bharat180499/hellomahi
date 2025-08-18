'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ThemeToggle from '@/components/ThemeToggle'
import { Database, RefreshCw, DollarSign, Shield, Phone, Mail, Settings, Bell, Globe, Info, User, Save } from 'lucide-react'

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)

  // Mock settings data
  const settingsData = {
    general: {
      platformName: 'Elite Escorts Platform',
      platformUrl: 'https://eliteescorts.com',
      adminEmail: 'admin@eliteescorts.com',
      supportPhone: '+91 98765 43210',
      timezone: 'Asia/Kolkata',
      currency: 'INR',
      language: 'English',
      maintenanceMode: false
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true
      },
      ipWhitelist: ['192.168.1.1', '10.0.0.1'],
      failedLoginAttempts: 5,
      lockoutDuration: 15
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      notificationTypes: {
        newUser: true,
        newEscort: true,
        newAgency: true,
        newBooking: true,
        paymentReceived: true,
        systemAlert: true,
        securityAlert: true
      }
    },
    payment: {
      platformFee: 5,
      paymentMethods: ['Credit Card', 'Debit Card', 'UPI', 'Net Banking'],
      autoPayout: true,
      payoutSchedule: 'weekly',
      minimumPayout: 1000,
      currency: 'INR'
    },
    integrations: {
      paymentGateway: 'Razorpay',
      smsProvider: 'Twilio',
      emailProvider: 'SendGrid',
      analytics: 'Google Analytics',
      maps: 'Google Maps',
      storage: 'AWS S3'
    },
    system: {
      databaseBackup: true,
      backupFrequency: 'daily',
      logRetention: 90,
      cacheEnabled: true,
      cdnEnabled: true,
      sslEnabled: true,
      apiRateLimit: 1000
    }
  }

  const [settings, setSettings] = useState(settingsData)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSaving(false)
    alert('Settings saved successfully!')
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default values? This action cannot be undone.')) {
      setSettings(settingsData)
      alert('Settings have been reset to default values.')
    }
  }

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Payment', icon: DollarSign },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'system', label: 'System', icon: Database }
  ]

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Platform Information</CardTitle>
          <CardDescription>Basic platform configuration and contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Platform Name</label>
              <Input
                value={settings.general.platformName}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, platformName: e.target.value }
                })}
                placeholder="Enter platform name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Platform URL</label>
              <Input
                value={settings.general.platformUrl}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, platformUrl: e.target.value }
                })}
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Admin Email</label>
              <Input
                value={settings.general.adminEmail}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, adminEmail: e.target.value }
                })}
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Support Phone</label>
              <Input
                value={settings.general.supportPhone}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, supportPhone: e.target.value }
                })}
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Timezone</label>
              <select
                value={settings.general.timezone}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, timezone: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Currency</label>
              <select
                value={settings.general.currency}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, currency: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="maintenanceMode"
              checked={settings.general.maintenanceMode}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, maintenanceMode: e.target.checked }
              })}
              className="rounded"
            />
            <label htmlFor="maintenanceMode" className="text-sm">Enable Maintenance Mode</label>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Authentication & Security</CardTitle>
          <CardDescription>Configure security settings and access controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">Require 2FA for admin access</p>
            </div>
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={(e) => setSettings({
                ...settings,
                security: { ...settings.security, twoFactorAuth: e.target.checked }
              })}
              className="rounded"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Session Timeout (minutes)</label>
              <Input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => setSettings({
                  ...settings,
                  security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                })}
                min="5"
                max="120"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Failed Login Attempts</label>
              <Input
                type="number"
                value={settings.security.failedLoginAttempts}
                onChange={(e) => setSettings({
                  ...settings,
                  security: { ...settings.security, failedLoginAttempts: parseInt(e.target.value) }
                })}
                min="3"
                max="10"
              />
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Password Policy</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.security.passwordPolicy.requireUppercase}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: {
                      ...settings.security,
                      passwordPolicy: {
                        ...settings.security.passwordPolicy,
                        requireUppercase: e.target.checked
                      }
                    }
                  })}
                  className="rounded"
                />
                <label className="text-sm">Require uppercase letters</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.security.passwordPolicy.requireNumbers}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: {
                      ...settings.security,
                      passwordPolicy: {
                        ...settings.security.passwordPolicy,
                        requireNumbers: e.target.checked
                      }
                    }
                  })}
                  className="rounded"
                />
                <label className="text-sm">Require numbers</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.security.passwordPolicy.requireSpecialChars}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: {
                      ...settings.security,
                      passwordPolicy: {
                        ...settings.security.passwordPolicy,
                        requireSpecialChars: e.target.checked
                      }
                    }
                  })}
                  className="rounded"
                />
                <label className="text-sm">Require special characters</label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Configure how and when notifications are sent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.notifications.emailNotifications}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, emailNotifications: e.target.checked }
                })}
                className="rounded"
              />
              <label className="text-sm">Email Notifications</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.notifications.smsNotifications}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, smsNotifications: e.target.checked }
                })}
                className="rounded"
              />
              <label className="text-sm">SMS Notifications</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.notifications.pushNotifications}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, pushNotifications: e.target.checked }
                })}
                className="rounded"
              />
              <label className="text-sm">Push Notifications</label>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Notification Types</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(settings.notifications.notificationTypes).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        notificationTypes: {
                          ...settings.notifications.notificationTypes,
                          [key]: e.target.checked
                        }
                      }
                    })}
                    className="rounded"
                  />
                  <label className="text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Configuration</CardTitle>
          <CardDescription>Configure fees and payout settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium">Platform Fee (%)</label>
              <Input
                type="number"
                value={settings.payment.platformFee}
                onChange={(e) => setSettings({
                  ...settings,
                  payment: { ...settings.payment, platformFee: parseInt(e.target.value) }
                })}
                min="0"
                max="20"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Minimum Payout (₹)</label>
              <Input
                type="number"
                value={settings.payment.minimumPayout}
                onChange={(e) => setSettings({
                  ...settings,
                  payment: { ...settings.payment, minimumPayout: parseInt(e.target.value) }
                })}
                min="100"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Payout Schedule</label>
              <select
                value={settings.payment.payoutSchedule}
                onChange={(e) => setSettings({
                  ...settings,
                  payment: { ...settings.payment, payoutSchedule: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.payment.autoPayout}
              onChange={(e) => setSettings({
                ...settings,
                payment: { ...settings.payment, autoPayout: e.target.checked }
              })}
              className="rounded"
            />
            <label className="text-sm">Enable Automatic Payouts</label>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Third-Party Integrations</CardTitle>
          <CardDescription>Configure external service integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Payment Gateway</label>
              <select
                value={settings.integrations.paymentGateway}
                onChange={(e) => setSettings({
                  ...settings,
                  integrations: { ...settings.integrations, paymentGateway: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Razorpay">Razorpay</option>
                <option value="Stripe">Stripe</option>
                <option value="PayPal">PayPal</option>
                <option value="Square">Square</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">SMS Provider</label>
              <select
                value={settings.integrations.smsProvider}
                onChange={(e) => setSettings({
                  ...settings,
                  integrations: { ...settings.integrations, smsProvider: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Twilio">Twilio</option>
                <option value="AWS SNS">AWS SNS</option>
                <option value="MessageBird">MessageBird</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Email Provider</label>
              <select
                value={settings.integrations.emailProvider}
                onChange={(e) => setSettings({
                  ...settings,
                  integrations: { ...settings.integrations, emailProvider: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="SendGrid">SendGrid</option>
                <option value="Mailgun">Mailgun</option>
                <option value="AWS SES">AWS SES</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Analytics</label>
              <select
                value={settings.integrations.analytics}
                onChange={(e) => setSettings({
                  ...settings,
                  integrations: { ...settings.integrations, analytics: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Google Analytics">Google Analytics</option>
                <option value="Mixpanel">Mixpanel</option>
                <option value="Amplitude">Amplitude</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>Advanced system settings and performance options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Backup Frequency</label>
              <select
                value={settings.system.backupFrequency}
                onChange={(e) => setSettings({
                  ...settings,
                  system: { ...settings.system, backupFrequency: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Log Retention (days)</label>
              <Input
                type="number"
                value={settings.system.logRetention}
                onChange={(e) => setSettings({
                  ...settings,
                  system: { ...settings.system, logRetention: parseInt(e.target.value) }
                })}
                min="7"
                max="365"
              />
            </div>
            <div>
              <label className="text-sm font-medium">API Rate Limit (requests/hour)</label>
              <Input
                type="number"
                value={settings.system.apiRateLimit}
                onChange={(e) => setSettings({
                  ...settings,
                  system: { ...settings.system, apiRateLimit: parseInt(e.target.value) }
                })}
                min="100"
                max="10000"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.system.databaseBackup}
                onChange={(e) => setSettings({
                  ...settings,
                  system: { ...settings.system, databaseBackup: e.target.checked }
                })}
                className="rounded"
              />
              <label className="text-sm">Enable Database Backup</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.system.cacheEnabled}
                onChange={(e) => setSettings({
                  ...settings,
                  system: { ...settings.system, cacheEnabled: e.target.checked }
                })}
                className="rounded"
              />
              <label className="text-sm">Enable Caching</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.system.cdnEnabled}
                onChange={(e) => setSettings({
                  ...settings,
                  system: { ...settings.system, cdnEnabled: e.target.checked }
                })}
                className="rounded"
              />
              <label className="text-sm">Enable CDN</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.system.sslEnabled}
                onChange={(e) => setSettings({
                  ...settings,
                  system: { ...settings.system, sslEnabled: e.target.checked }
                })}
                className="rounded"
              />
              <label className="text-sm">Enable SSL</label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings()
      case 'security':
        return renderSecuritySettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'payment':
        return renderPaymentSettings()
      case 'integrations':
        return renderIntegrationSettings()
      case 'system':
        return renderSystemSettings()
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Configure platform settings, security, and system preferences
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle variant="outline" size="sm" showSystem={true} />
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button 
            size="sm" 
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
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

      {/* Tabs */}
      <div className="border-b">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {renderTabContent()}
      </div>
    </div>
  )
}
