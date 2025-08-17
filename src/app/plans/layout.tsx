import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premium Plans - HelloMahi Escort Directory',
  description: 'Choose your premium plan to unlock contact details, messaging, and booking features with verified escorts.',
  keywords: 'premium plans, escort directory, contact details, booking, messaging',
}

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
} 