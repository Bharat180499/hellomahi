"use client"

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">1. Data Collection</h2>
            <p className="text-muted-foreground mb-2">
              We collect personal information you provide during registration, profile creation, and use of our services. This includes contact details, profile data, and usage information.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">2. Use of Data</h2>
            <p className="text-muted-foreground mb-2">
              Your data is used to provide and improve our services, process bookings and payments, and communicate with you about your account and platform updates.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">3. Data Sharing</h2>
            <p className="text-muted-foreground mb-2">
              We do not sell your data. We may share information with service providers (e.g., payment processors) as needed to operate the platform, or as required by law.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
            <p className="text-muted-foreground mb-2">
              We use industry-standard security measures to protect your data. However, no system is 100% secure. Please use strong passwords and report any suspicious activity.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">5. Cookies</h2>
            <p className="text-muted-foreground mb-2">
              We use cookies to enhance your experience, remember preferences, and analyze site usage. You can manage cookie preferences in your browser settings.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">6. User Rights</h2>
            <p className="text-muted-foreground mb-2">
              You have the right to access, update, or delete your data. Contact us to exercise your rights or for any privacy-related questions.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">7. Contact</h2>
            <p className="text-muted-foreground mb-2">
              For privacy concerns, please <a href="/contact" className="text-primary underline">contact us</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
} 