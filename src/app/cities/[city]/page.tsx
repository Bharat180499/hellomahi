import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CityPageClient from './CityPageClient'

// Mock data - in real app, this would come from API
const cities = [
  { slug: 'mumbai', name: 'Mumbai', state: 'Maharashtra' },
  { slug: 'delhi', name: 'Delhi', state: 'Delhi' },
  { slug: 'bangalore', name: 'Bangalore', state: 'Karnataka' },
  { slug: 'hyderabad', name: 'Hyderabad', state: 'Telangana' },
  { slug: 'chennai', name: 'Chennai', state: 'Tamil Nadu' },
  { slug: 'kolkata', name: 'Kolkata', state: 'West Bengal' },
  { slug: 'pune', name: 'Pune', state: 'Maharashtra' },
  { slug: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat' },
]

interface CityPageProps {
  params: { city: string }
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const city = cities.find(c => c.slug === params.city)
  
  if (!city) {
    return {
      title: 'City Not Found',
    }
  }

  return {
    title: `${city.name} Escorts - Premium Escort Services | HelloMahi`,
    description: `Discover premium ${city.name} escorts and escort agencies. Browse verified independent escorts and professional agencies in ${city.name}, ${city.state}. Premium access required for contact details.`,
    keywords: `${city.name} escorts, ${city.name} escort agencies, ${city.name} independent escorts, ${city.name} escort services, ${city.state} escorts`,
    openGraph: {
      title: `${city.name} Escorts - Premium Escort Services`,
      description: `Browse verified ${city.name} escorts and agencies. Premium access required for contact details.`,
      type: 'website',
    },
  }
}

export default function CityPage({ params }: CityPageProps) {
  const city = cities.find(c => c.slug === params.city)
  
  if (!city) {
    notFound()
  }

  return <CityPageClient city={city} />
} 