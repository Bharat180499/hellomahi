import { Metadata } from 'next'
import EscortNavigation from '@/components/EscortNavigation'

export const metadata: Metadata = {
  title: 'Escort Dashboard | HelloMahi',
  description: 'Manage your escort profile, bookings, and earnings on HelloMahi',
}

export default function EscortLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <EscortNavigation />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
} 