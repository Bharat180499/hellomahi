import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Navigation } from 'lucide-react'
"use client"



interface Location {
  id: string
  name: string
  lat: number
  lng: number
  type: 'area' | 'hotel' | 'restaurant'
  rating?: number
  description?: string
}

interface CityMapProps {
  city: string
  locations: Location[]
  onLocationSelect?: (location: Location) => void
}

export default function CityMap({ city, locations, onLocationSelect }: CityMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // In a real app, this would load Google Maps or Mapbox
    // For now, we'll create a simple map visualization
    setMapLoaded(true)
  }, [])

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location)
    onLocationSelect?.(location)
  }

  const getDirections = (location: Location) => {
    // Open Google Maps directions
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`
    window.open(url, '_blank')
  }

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Popular Areas in {city}</CardTitle>
      </CardHeader>
      <CardContent>
        {!mapLoaded ? (
          <div className="h-64 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Loading map...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Simple map visualization */}
            <div className="relative h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden">
              {/* Map placeholder - in real app this would be Google Maps */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <p className="text-blue-800 font-semibold">Interactive Map</p>
                  <p className="text-blue-600 text-sm">Click locations below to explore</p>
                </div>
              </div>

              {/* Location markers */}
              {locations.map((location, index) => (
                <div
                  key={location.id}
                  className="absolute"
                  style={{
                    left: `${20 + (index * 15)}%`,
                    top: `${30 + (index * 10)}%`
                  }}
                >
                  <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform"
                       onClick={() => handleLocationClick(location)} />
                </div>
              ))}
            </div>

            {/* Location list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedLocation?.id === location.id
                      ? 'bg-purple-500/20 border-purple-500'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => handleLocationClick(location)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-semibold">{location.name}</h4>
                        {location.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-yellow-400 text-sm">{location.rating}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{location.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                          {location.type}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation()
                        getDirections(location)
                      }}
                    >
                      <Navigation className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected location details */}
            {selectedLocation && (
              <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <h4 className="text-white font-semibold mb-2">{selectedLocation.name}</h4>
                <p className="text-gray-300 text-sm mb-3">{selectedLocation.description}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => getDirections(selectedLocation)}
                  >
                    <Navigation className="h-3 w-3 mr-1" />
                    Get Directions
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => setSelectedLocation(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 