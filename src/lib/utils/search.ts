import type { SearchFilters, SearchResult } from '@/types/search'
import { Search } from 'lucide-react'

/**
 * Filter search results based on provided filters
 */
export function filterSearchResults(results: SearchResult[], filters: SearchFilters): SearchResult[] {
  return results.filter(result => {
    // Location filter
    if (filters.location && !result.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false
    }

    // City filter
    if (filters.city && result.city.toLowerCase() !== filters.city.toLowerCase()) {
      return false
    }

    // State filter
    if (filters.state && result.state.toLowerCase() !== filters.state.toLowerCase()) {
      return false
    }

    // Price range filter
    if (result.targetPrice < filters.priceRange[0] || result.targetPrice > filters.priceRange[1]) {
      return false
    }

    // Rating filter
    if (filters.rating > 0 && result.rating < filters.rating) {
      return false
    }

    // Age range filter
    if (result.age < filters.ageRange[0] || result.age > filters.ageRange[1]) {
      return false
    }

    // Services filter
    if (filters.services.length > 0 && !filters.services.some(service => 
      result.services.includes(service)
    )) {
      return false
    }

    // Availability filter
    if (filters.availability.length > 0 && !filters.availability.some(day => 
      result.availability.includes(day)
    )) {
      return false
    }

    // Verification status filter
    if (filters.verificationStatus.includes('verified') && !result.isVerified) {
      return false
    }

    // Plan type filter
    if (filters.planType.includes('premium') && !result.isPremium) {
      return false
    }

    // Urgent filter
    if (filters.isUrgent && !result.isUrgent) {
      return false
    }

    // Overnight filter
    if (filters.isOvernight && !result.isOvernight) {
      return false
    }

    // Outcall filter
    if (filters.isOutcall && !result.isOutcall) {
      return false
    }

    // Incall filter
    if (filters.isIncall && !result.isIncall) {
      return false
    }

    // Languages filter
    if (filters.languages && filters.languages.length > 0 && !filters.languages.some(lang => 
      result.languages.includes(lang)
    )) {
      return false
    }

    // Body type filter
    if (filters.bodyType && filters.bodyType.length > 0 && result.bodyType && !filters.bodyType.includes(result.bodyType)) {
      return false
    }

    // Hair color filter
    if (filters.hairColor && filters.hairColor.length > 0 && result.hairColor && !filters.hairColor.includes(result.hairColor)) {
      return false
    }

    // Eye color filter
    if (filters.eyeColor && filters.eyeColor.length > 0 && result.eyeColor && !filters.eyeColor.includes(result.eyeColor)) {
      return false
    }

    // Height filter
    if (filters.height && filters.height.length > 0 && result.height && !filters.height.includes(result.height)) {
      return false
    }

    // Education filter
    if (filters.education && result.education && !filters.education.includes(result.education)) {
      return false
    }

    // Interests filter
    if (filters.interests && filters.interests.length > 0 && result.interests && !filters.interests.some(interest => 
      result.interests.includes(interest)
    )) {
      return false
    }

    return true
  })
}

/**
 * Sort search results based on sort criteria
 */
export function sortSearchResults(results: SearchResult[], sortBy: string, sortOrder: 'asc' | 'desc' = 'desc'): SearchResult[] {
  return [...results].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case 'relevance':
        // Relevance is typically handled by the backend, but we can sort by rating and popularity
        comparison = (b.rating * b.totalBookings) - (a.rating * a.totalBookings)
        break
      case 'rating':
        comparison = b.rating - a.rating
        break
      case 'price_low':
        comparison = a.targetPrice - b.targetPrice
        break
      case 'price_high':
        comparison = b.targetPrice - a.targetPrice
        break
      case 'newest':
        comparison = new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
        break
      case 'popular':
        comparison = b.totalBookings - a.totalBookings
        break
      default:
        comparison = 0
    }

    return sortOrder === 'asc' ? comparison : -comparison
  })
}

/**
 * Search results by query string
 */
export function searchByQuery(results: SearchResult[], query: string): SearchResult[] {
  if (!query.trim()) return results

  const searchTerm = query.toLowerCase()
  
  return results.filter(result => {
    // Search in name
    if (result.name.toLowerCase().includes(searchTerm)) return true
    
    // Search in location
    if (result.location.toLowerCase().includes(searchTerm)) return true
    if (result.city.toLowerCase().includes(searchTerm)) return true
    if (result.state.toLowerCase().includes(searchTerm)) return true
    
    // Search in services
    if (result.services.some(service => service.toLowerCase().includes(searchTerm))) return true
    
    // Search in languages
    if (result.languages.some(lang => lang.toLowerCase().includes(searchTerm))) return true
    
    // Search in interests
    if (result.interests && result.interests.some(interest => interest.toLowerCase().includes(searchTerm))) return true
    
    // Search in education
    if (result.education && result.education.toLowerCase().includes(searchTerm)) return true
    
    // Search in description
    if (result.description.toLowerCase().includes(searchTerm)) return true

    return false
  })
}

/**
 * Get search suggestions based on results
 */
export function getSearchSuggestions(results: SearchResult[], query: string, limit = 5): string[] {
  if (!query.trim()) return []

  const suggestions = new Set<string>()
  const searchTerm = query.toLowerCase()

  results.forEach(result => {
    // Name suggestions
    if (result.name.toLowerCase().includes(searchTerm)) {
      suggestions.add(result.name)
    }

    // Location suggestions
    if (result.location.toLowerCase().includes(searchTerm)) {
      suggestions.add(result.location)
    }
    if (result.city.toLowerCase().includes(searchTerm)) {
      suggestions.add(result.city)
    }

    // Service suggestions
    result.services.forEach(service => {
      if (service.toLowerCase().includes(searchTerm)) {
        suggestions.add(service)
      }
    })

    // Language suggestions
    result.languages.forEach(lang => {
      if (lang.toLowerCase().includes(searchTerm)) {
        suggestions.add(lang)
      }
    })
  })

  return Array.from(suggestions).slice(0, limit)
}

/**
 * Calculate search relevance score
 */
export function calculateRelevanceScore(result: SearchResult, query: string): number {
  if (!query.trim()) return 0

  const searchTerm = query.toLowerCase()
  let score = 0

  // Exact name match gets highest score
  if (result.name.toLowerCase() === searchTerm) {
    score += 100
  } else if (result.name.toLowerCase().includes(searchTerm)) {
    score += 50
  }

  // Location matches
  if (result.location.toLowerCase().includes(searchTerm)) {
    score += 30
  }
  if (result.city.toLowerCase().includes(searchTerm)) {
    score += 25
  }

  // Service matches
  if (result.services.some(service => service.toLowerCase().includes(searchTerm))) {
    score += 20
  }

  // Language matches
  if (result.languages.some(lang => lang.toLowerCase().includes(searchTerm))) {
    score += 15
  }

  // Boost by rating and popularity
  score += result.rating * 2
  score += result.totalBookings * 0.1

  // Boost verified and premium profiles
  if (result.isVerified) score += 10
  if (result.isPremium) score += 5

  return score
}

/**
 * Build search query string from filters
 */
export function buildSearchQuery(filters: SearchFilters): string {
  const parts: string[] = []

  if (filters.location) parts.push(filters.location)
  if (filters.city) parts.push(filters.city)
  if (filters.state) parts.push(filters.state)
  if (filters.services.length > 0) parts.push(filters.services.join(' '))
  if (filters.languages && filters.languages.length > 0) parts.push(filters.languages.join(' '))

  return parts.join(' ')
}

/**
 * Parse search query into filters
 */
export function parseSearchQuery(query: string): Partial<SearchFilters> {
  const filters: Partial<SearchFilters> = {}
  const terms = query.toLowerCase().split(' ')

  // Common cities
  const cities = ['mumbai', 'delhi', 'bangalore', 'hyderabad', 'chennai', 'kolkata', 'pune']
  const foundCity = terms.find(term => cities.includes(term))
  if (foundCity) {
    filters.city = foundCity.charAt(0).toUpperCase() + foundCity.slice(1)
  }

  // Common services
  const services = ['companionship', 'massage', 'dinner', 'travel', 'vip', 'party', 'corporate']
  const foundServices = terms.filter(term => services.includes(term))
  if (foundServices.length > 0) {
    filters.services = foundServices.map(service => 
      service.charAt(0).toUpperCase() + service.slice(1)
    )
  }

  // Common languages
  const languages = ['english', 'hindi', 'marathi', 'gujarati', 'tamil', 'telugu', 'kannada']
  const foundLanguages = terms.filter(term => languages.includes(term))
  if (foundLanguages.length > 0) {
    filters.languages = foundLanguages.map(lang => 
      lang.charAt(0).toUpperCase() + lang.slice(1)
    )
  }

  return filters
}

/**
 * Get search statistics from results
 */
export function getSearchStats(results: SearchResult[]) {
  if (results.length === 0) {
    return {
      total: 0,
      averagePrice: 0,
      averageRating: 0,
      verifiedCount: 0,
      premiumCount: 0,
      availableCount: 0,
      priceRange: { min: 0, max: 0 },
      topServices: [],
      topLocations: []
    }
  }

  const prices = results.map(r => r.targetPrice)
  const ratings = results.map(r => r.rating)
  const services = results.flatMap(r => r.services)
  const locations = results.map(r => r.location)

  // Count services
  const serviceCounts = services.reduce((acc, service) => {
    acc[service] = (acc[service] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Count locations
  const locationCounts = locations.reduce((acc, location) => {
    acc[location] = (acc[location] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return {
    total: results.length,
    averagePrice: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
    averageRating: Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10,
    verifiedCount: results.filter(r => r.isVerified).length,
    premiumCount: results.filter(r => r.isPremium).length,
    availableCount: results.filter(r => r.isAvailable).length,
    priceRange: {
      min: Math.min(...prices),
      max: Math.max(...prices)
    },
    topServices: Object.entries(serviceCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([service]) => service),
    topLocations: Object.entries(locationCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([location]) => location)
  }
}

/**
 * Debounce function for search input
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function for search input
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
} 