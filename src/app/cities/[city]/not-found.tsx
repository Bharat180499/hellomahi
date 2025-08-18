import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, MapPin, ArrowLeft } from 'lucide-react'

export default function CityNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-red-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              City Not Found
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-gray-300">
              The city you're looking for doesn't exist or isn't available in our directory.
            </p>
            
            <div className="space-y-3">
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Link href="/cities">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Browse All Cities
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-black" asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 