export interface CityData {
  slug: string
  name: string
  state: string
  description: string
  image: string
  escortCount: number
  avgRating: number
  popularAreas: Array<{
    name: string
    description: string
    lat?: number
    lng?: number
  }>
  safetyTips: string[]
  localInfo: {
    bestTime: string
    advanceBooking: string
    popularServices: string[]
    averagePrice: string
    currency: string
  }
  seo: {
    title: string
    description: string
    keywords: string[]
    ogImage?: string
  }
  stats: {
    totalEscorts: number
    independentCount: number
    agencyCount: number
    verifiedCount: number
    premiumCount: number
  }
}

export const cityData: Record<string, CityData> = {
  mumbai: {
    slug: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    description: "Mumbai, the financial capital of India, offers a vibrant nightlife and premium escort services. From the upscale areas of Bandra and Juhu to the corporate hubs of Andheri and Powai, our verified escorts provide discreet and professional companionship services.",
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    escortCount: 156,
    avgRating: 4.8,
    popularAreas: [
      { name: 'Bandra West', description: 'Upscale residential area with premium hotels and restaurants', lat: 19.0596, lng: 72.8295 },
      { name: 'Juhu', description: 'Beachfront location with luxury accommodations', lat: 19.0990, lng: 72.8347 },
      { name: 'Andheri', description: 'Corporate hub with business-friendly hotels', lat: 19.1197, lng: 72.8464 },
      { name: 'Powai', description: 'Educational and IT hub with modern facilities', lat: 19.1197, lng: 72.9064 },
      { name: 'Worli', description: 'Premium residential area with high-end services', lat: 19.0176, lng: 72.8138 }
    ],
    safetyTips: [
      'Always verify escort profiles before booking',
      'Meet in public places initially',
      'Use secure payment methods',
      'Keep personal information private',
      'Report any suspicious activity'
    ],
    localInfo: {
      bestTime: 'Evening to late night',
      advanceBooking: '24-48 hours recommended',
      popularServices: ['Dinner Dates', 'Corporate Events', 'Travel Companion'],
      averagePrice: '₹15,000 - ₹50,000',
      currency: 'INR'
    },
    seo: {
      title: 'Mumbai Escorts - Premium Escort Services in Mumbai | HelloMahi',
      description: 'Discover premium Mumbai escorts and escort agencies. Browse verified independent escorts and professional agencies in Mumbai, Maharashtra. Premium access required for contact details.',
      keywords: ['Mumbai escorts', 'Mumbai escort agencies', 'Mumbai independent escorts', 'Mumbai escort services', 'Maharashtra escorts'],
      ogImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200'
    },
    stats: {
      totalEscorts: 156,
      independentCount: 89,
      agencyCount: 67,
      verifiedCount: 142,
      premiumCount: 98
    }
  },
  delhi: {
    slug: 'delhi',
    name: 'Delhi',
    state: 'Delhi',
    description: "Delhi, the capital city, offers a mix of traditional charm and modern luxury. Our verified escorts serve areas from the historic Connaught Place to the upscale South Extension and Greater Kailash.",
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
    escortCount: 142,
    avgRating: 4.7,
    popularAreas: [
      { name: 'Connaught Place', description: 'Historic center with luxury hotels and shopping', lat: 28.6315, lng: 77.2167 },
      { name: 'South Extension', description: 'Upscale residential and commercial area', lat: 28.5684, lng: 77.2430 },
      { name: 'Greater Kailash', description: 'Premium residential area with fine dining', lat: 28.5484, lng: 77.2430 },
      { name: 'Vasant Vihar', description: 'Diplomatic area with international standards', lat: 28.5684, lng: 77.1630 },
      { name: 'Hauz Khas', description: 'Trendy area with modern cafes and boutiques', lat: 28.5484, lng: 77.2030 }
    ],
    safetyTips: [
      'Choose verified escorts only',
      'Meet in well-lit public areas',
      'Use our secure messaging system',
      'Verify escort identity',
      'Follow local guidelines'
    ],
    localInfo: {
      bestTime: 'Evening to midnight',
      advanceBooking: '12-24 hours recommended',
      popularServices: ['Social Events', 'Corporate Functions', 'VIP Services'],
      averagePrice: '₹12,000 - ₹45,000',
      currency: 'INR'
    },
    seo: {
      title: 'Delhi Escorts - Premium Escort Services in Delhi | HelloMahi',
      description: 'Discover premium Delhi escorts and escort agencies. Browse verified independent escorts and professional agencies in Delhi. Premium access required for contact details.',
      keywords: ['Delhi escorts', 'Delhi escort agencies', 'Delhi independent escorts', 'Delhi escort services'],
      ogImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200'
    },
    stats: {
      totalEscorts: 142,
      independentCount: 78,
      agencyCount: 64,
      verifiedCount: 128,
      premiumCount: 89
    }
  }
  // Add more cities as needed
}

export function getCityData(slug: string): CityData | null {
  return cityData[slug] || null
}

export function getAllCities(): CityData[] {
  return Object.values(cityData)
}

export function getCitiesByState(state: string): CityData[] {
  return Object.values(cityData).filter(city => city.state === state)
}

export function searchCities(query: string): CityData[] {
  const lowercaseQuery = query.toLowerCase()
  return Object.values(cityData).filter(city => 
    city.name.toLowerCase().includes(lowercaseQuery) ||
    city.state.toLowerCase().includes(lowercaseQuery)
  )
} 