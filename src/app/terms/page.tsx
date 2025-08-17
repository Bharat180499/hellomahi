"use client"

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">1. User Responsibilities</h2>
            <p className="text-muted-foreground mb-2">
              Users must be at least 18 years old and provide accurate information during registration. Users are responsible for their own conduct and interactions on the platform.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">2. Agency & Escort Responsibilities</h2>
            <p className="text-muted-foreground mb-2">
              Agencies and independent escorts must comply with all applicable laws and provide truthful, up-to-date information. All profiles must undergo verification.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">3. Payment & Subscriptions</h2>
            <p className="text-muted-foreground mb-2">
              All payments are processed securely. Subscription plans are non-refundable except as required by law. Users are responsible for managing their subscriptions.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">4. Safety & Conduct</h2>
            <p className="text-muted-foreground mb-2">
              We prioritize user safety. Any abuse, harassment, or illegal activity will result in account suspension or termination. Report suspicious activity to our support team.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">5. Legal Compliance</h2>
            <p className="text-muted-foreground mb-2">
              All users, agencies, and escorts must comply with local, state, and national laws. The platform is not responsible for user actions outside the platform.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
            <p className="text-muted-foreground mb-2">
              We may update these terms at any time. Continued use of the platform constitutes acceptance of the updated terms.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">7. Contact</h2>
            <p className="text-muted-foreground mb-2">
              For questions about these terms, please <a href="/contact" className="text-primary underline">contact us</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
} 