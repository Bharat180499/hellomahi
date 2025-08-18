import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Eye, X, Phone, CheckCircle, XCircle, MessageCircle, Info, Shield, Check, AlertTriangle, Check, Shield, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Phone, Shield, CheckCircle, XCircle, Heart, MessageCircle, Eye, Info } from 'lucide-react'


export default function SafetyPage() {
  const safetyTips = [
    {
      category: 'Before Meeting',
      tips: [
        'Always verify the client\'s identity through our platform',
        'Meet in a public place first before going to private locations',
        'Share your location with a trusted friend or family member',
        'Set clear boundaries and expectations before meeting',
        'Trust your instincts - if something feels wrong, don\'t proceed'
      ]
    },
    {
      category: 'During Meeting',
      tips: [
        'Keep your phone charged and easily accessible',
        'Stay in well-lit, populated areas when possible',
        'Don\'t share personal information beyond what\'s necessary',
        'Have a safe word or signal for emergency situations',
        'Always use protection and practice safe sex'
      ]
    },
    {
      category: 'After Meeting',
      tips: [
        'Report any suspicious or inappropriate behavior immediately',
        'Block and report users who violate platform policies',
        'Keep records of all interactions for your safety',
        'Trust your gut - if something felt off, report it',
        'Take time to decompress and process the experience'
      ]
    }
  ]

  const emergencyContacts = [
    {
      name: 'Platform Safety Team',
      number: '+91 98765 43210',
      description: '24/7 safety support and incident reporting'
    },
    {
      name: 'Local Police',
      number: '100',
      description: 'Emergency police assistance'
    },
    {
      name: 'Women Helpline',
      number: '1091',
      description: 'National women helpline'
    }
  ]

  const redFlags = [
    'Client refuses to verify their identity',
    'Client asks to meet in isolated or unsafe locations',
    'Client pressures you to do things you\'re uncomfortable with',
    'Client offers significantly more money than usual',
    'Client asks for personal information beyond what\'s necessary',
    'Client behaves aggressively or disrespectfully',
    'Client tries to arrange meetings outside the platform',
    'Client refuses to use protection or safe practices'
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Safety Guidelines
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your safety is our top priority. Follow these guidelines to ensure safe and 
            professional interactions on our platform.
          </p>
        </div>

        {/* Emergency Alert */}
        <Card className="mb-8 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
          <CardContent className="p-6">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  Emergency? Call Immediately
                </h3>
                <p className="text-red-700 dark:text-red-300 mb-3">
                  If you feel unsafe or are in immediate danger, call our 24/7 safety team 
                  or local emergency services right away.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Emergency: +91 98765 43210
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                    <Shield className="h-4 w-4 mr-2" />
                    Report Incident
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Safety Tips by Category */}
            {safetyTips.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            {/* Red Flags */}
            <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-800 dark:text-orange-200">
                  <XCircle className="h-5 w-5 mr-2" />
                  Red Flags to Watch For
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {redFlags.map((flag, index) => (
                    <div key={index} className="flex items-start">
                      <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{flag}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    <strong>Remember:</strong> If you encounter any of these red flags, 
                    trust your instincts and report the user immediately. Your safety comes first.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Best Practices for Success
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Communication</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Be clear about your services and boundaries</li>
                      <li>• Use platform messaging for initial contact</li>
                      <li>• Keep conversations professional</li>
                      <li>• Document all important communications</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Professionalism</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Maintain high standards of hygiene</li>
                      <li>• Dress appropriately for the occasion</li>
                      <li>• Be punctual and reliable</li>
                      <li>• Provide excellent service</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm">{contact.name}</h4>
                      <p className="text-lg font-bold text-primary">{contact.number}</p>
                      <p className="text-xs text-muted-foreground">{contact.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Safety Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Platform Safety Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    '24/7 Safety Monitoring',
                    'Identity Verification',
                    'Emergency Response Team',
                    'Incident Reporting System',
                    'User Blocking & Reporting',
                    'Location Sharing',
                    'Safety Alerts',
                    'Background Checks'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Report User
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Safety Team
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View Safety Video
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Info className="h-4 w-4 mr-2" />
                    Safety FAQ
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Safety Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>Safety Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'Client identity verified',
                    'Meeting location is safe',
                    'Someone knows your location',
                    'Phone is charged',
                    'Emergency contacts saved',
                    'Boundaries are clear',
                    'Trust your instincts'
                  ].map((item, index) => (
                    <label key={index} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{item}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Your Safety Matters
              </h3>
              <p className="text-white/90 mb-6">
                We're committed to providing a safe environment for all users. 
                If you have any concerns, don't hesitate to reach out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  Contact Safety Team
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
                  Download Safety App
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 