
import HeroSection from '@/components/HeroSection'
import SearchFilters from '@/components/SearchFilters'
import CitiesSection from '@/components/CitiesSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <SearchFilters />
        <CitiesSection />
      </main>
      <Footer />
    </div>
  )
} 