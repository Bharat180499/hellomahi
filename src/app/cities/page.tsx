import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Filter, Star, User, Users, ArrowRight, Lock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'


// Mock data for cities
const cities = [
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    escortCount: 156,
    avgRating: 4.8,
    popularAreas: ['Bandra West', 'Juhu', 'Andheri', 'Powai', 'Worli']
  },
  {
    id: 'delhi',
    name: 'Delhi',
    state: 'Delhi',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
    escortCount: 142,
    avgRating: 4.7,
    popularAreas: ['Connaught Place', 'South Extension', 'Greater Kailash', 'Vasant Vihar', 'Hauz Khas']
  },
  {
    id: 'bangalore',
    name: 'Bangalore',
    state: 'Karnataka',
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800',
    escortCount: 98,
    avgRating: 4.6,
    popularAreas: ['Indiranagar', 'Koramangala', 'Whitefield', 'Electronic City', 'Marathahalli']
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    escortCount: 87,
    avgRating: 4.5,
    popularAreas: ['Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'Hitech City', 'Secunderabad']
  },
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
    escortCount: 76,
    avgRating: 4.4,
    popularAreas: ['T Nagar', 'Anna Nagar', 'Adyar', 'Mylapore', 'Velachery']
  },
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800',
    escortCount: 65,
    avgRating: 4.3,
    popularAreas: ['Koregaon Park', 'Viman Nagar', 'Kalyani Nagar', 'Hinjewadi', 'Baner']
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    state: 'West Bengal',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
    escortCount: 76,
    avgRating: 4.2,
    popularAreas: ['Park Street', 'Salt Lake', 'New Town', 'Howrah', 'Dum Dum']
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    state: 'Gujarat',
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800',
    escortCount: 65,
    avgRating: 4.1,
    popularAreas: ['Satellite', 'Vastrapur', 'Navrangpura', 'Bodakdev', 'Paldi']
  }
]

export default function CitiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Browse by City
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover verified escorts in major cities across India
          </p>
        </div>

        {/* Premium Access Notice */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Lock className="h-6 w-6 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Premium Access Required</h3>
                  <p className="text-purple-700 mb-4">
                    Escort profiles and contact details are available exclusively to premium clients. 
                    Join our membership to access verified escorts in your preferred city.
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    asChild
                  >
                    <Link href="/plans?type=user">
                      Get Premium Access
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search cities..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cities.map((city) => (
            <Card key={city.id} className="group card-hover overflow-hidden">
              {/* City Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* City Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{city.name}</h3>
                  <p className="text-sm opacity-90">{city.state}</p>
                </div>

                {/* Stats Badge */}
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  <Users className="h-3 w-3 inline mr-1" />
                  {city.escortCount}
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="font-semibold">{city.avgRating}</span>
                      <span className="text-muted-foreground text-sm ml-1">avg rating</span>
                    </div>
                  </div>

                  {/* Popular Areas */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Popular Areas:</h4>
                    <div className="flex flex-wrap gap-1">
                      {city.popularAreas.slice(0, 3).map((area) => (
                        <span
                          key={area}
                          className="text-xs bg-muted px-2 py-1 rounded-full"
                        >
                          {area}
                        </span>
                      ))}
                      {city.popularAreas.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{city.popularAreas.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    asChild
                  >
                    <Link href={`/cities/${city.id}`}>
                      Browse {city.name} Escorts
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Cities Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Featured Cities</h2>
            <p className="text-muted-foreground">
              Most popular destinations for premium escort services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cities.slice(0, 3).map((city) => (
              <Card key={`featured-${city.id}`} className="relative overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{city.name}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{city.escortCount} verified profiles</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{city.avgRating}</span>
                      </div>
                    </div>
                    <Button 
                      variant="secondary" 
                      className="w-full"
                      asChild
                    >
                      <Link href={`/cities/${city.id}`}>
                        Browse {city.name} Escorts
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-white/90 mb-6">
                Join our premium membership to access verified escorts in all cities across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/plans?type=user">
                    View Client Plans
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600" asChild>
                  <Link href="/auth/login">
                    Login
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 