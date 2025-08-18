"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Star, X, User, Users, MapPin } from 'lucide-react'
import { useRef, useState } from 'react'


import { searchCities } from '@/lib/cityData'

interface SearchResult {
  type: 'city' | 'escort' | 'agency'
  id: string
  name: string
  subtitle?: string
  description?: string
  rating?: number
  count?: number
  image?: string
}

interface SearchAutocompleteProps {
  placeholder?: string
  onSearch: (query: string) => void
  onResultSelect: (result: SearchResult) => void
  className?: string
}

export default function SearchAutocomplete({
  placeholder = "Search cities, escorts, or agencies...",
  onSearch,
  onResultSelect,
  className
}: SearchAutocompleteProps) {
  
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Mock escort and agency data for search
  const mockEscorts = [
    { id: '1', name: 'Priya', city: 'Mumbai', rating: 4.8, type: 'escort' as const },
    { id: '2', name: 'Aisha', city: 'Delhi', rating: 4.9, type: 'escort' as const },
    { id: '3', name: 'Zara', city: 'Mumbai', rating: 4.7, type: 'escort' as const }
  ]

  const mockAgencies = [
    { id: '1', name: 'Elite Escorts', city: 'Mumbai', count: 25, type: 'agency' as const },
    { id: '2', name: 'Royal Companions', city: 'Delhi', count: 18, type: 'agency' as const }
  ]

  useEffect(() => {
    if (query.length >= 2) {
      performSearch(query)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    const allResults: SearchResult[] = []

    // Search cities
    const cityResults = searchCities(searchQuery)
    cityResults.forEach(city => {
      allResults.push({
        type: 'city',
        id: city.slug,
        name: city.name,
        subtitle: city.state,
        description: `${city.escortCount} verified escorts`,
        count: city.escortCount,
        image: city.image
      })
    })

    // Search escorts
    const escortResults = mockEscorts.filter(escort =>
      escort.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      escort.city.toLowerCase().includes(searchQuery.toLowerCase())
    )
    escortResults.forEach(escort => {
      allResults.push({
        type: 'escort',
        id: escort.id,
        name: escort.name,
        subtitle: escort.city,
        description: 'Independent Escort',
        rating: escort.rating
      })
    })

    // Search agencies
    const agencyResults = mockAgencies.filter(agency =>
      agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.city.toLowerCase().includes(searchQuery.toLowerCase())
    )
    agencyResults.forEach(agency => {
      allResults.push({
        type: 'agency',
        id: agency.id,
        name: agency.name,
        subtitle: agency.city,
        description: `${agency.count} escorts`,
        count: agency.count
      })
    })

    setResults(allResults.slice(0, 8)) // Limit to 8 results
    setIsOpen(true)
    setSelectedIndex(-1)
    setIsLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultSelect(results[selectedIndex])
        } else {
          onSearch(query)
        }
        break
      case 'Escape':
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }

  const handleResultSelect = (result: SearchResult) => {
    onResultSelect(result)
    setQuery('')
    setIsOpen(false)
    setSelectedIndex(-1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'city':
        return <MapPin className="h-4 w-4 text-blue-500" />
      case 'escort':
        return <Users className="h-4 w-4 text-purple-500" />
      case 'agency':
        return <Users className="h-4 w-4 text-green-500" />
      default:
        return <Search className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">
                Searching...
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => (
                  <div
                    key={`${result.type}-${result.id}`}
                    className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                      index === selectedIndex ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => handleResultSelect(result)}
                  >
                    <div className="flex items-center gap-3">
                      {getResultIcon(result.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-900 truncate">
                            {result.name}
                          </h4>
                          {result.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">{result.rating}</span>
                            </div>
                          )}
                        </div>
                        {result.subtitle && (
                          <p className="text-sm text-gray-600">{result.subtitle}</p>
                        )}
                        {result.description && (
                          <p className="text-xs text-gray-500">{result.description}</p>
                        )}
                      </div>
                      {result.count && (
                        <div className="text-sm text-gray-500">
                          {result.count}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : query.length >= 2 ? (
              <div className="p-4 text-center text-gray-500">
                No results found for "{query}"
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  )
} 