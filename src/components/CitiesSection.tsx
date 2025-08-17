import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  MapPin, 
  Users, 
  Star, 
  ArrowRight,
  Crown
} from 'lucide-react'

// Featured cities data
const featuredCities = [
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
  }
]

export default function CitiesSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Browse by City
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover verified escorts in major cities across India. Premium access required for contact details.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredCities.map((city) => (
            <Card key={city.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-md">
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

        {/* View All Cities CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Explore All Cities
              </h3>
              <p className="text-white/90 mb-6">
                Discover premium escort services in cities across India. 
                Premium access required for contact details and full profiles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-100"
                  asChild
                >
                  <Link href="/cities">
                    <MapPin className="mr-2 h-5 w-5" />
                    View All Cities
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                  asChild
                >
                  <Link href="/plans">
                    <Crown className="mr-2 h-5 w-5" />
                    Get Premium Access
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 