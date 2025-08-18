"use client"

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, ArrowRight, HelpCircle, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HelpCircle, BookOpen, Mail, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function HelpPage() {
  const topics = [
    {
      title: 'Account Issues',
      description: 'Help with login, registration, and account management.',
      link: '/faq#account'
    },
    {
      title: 'Booking Problems',
      description: 'Trouble booking or managing your appointments.',
      link: '/faq#booking'
    },
    {
      title: 'Payment & Plans',
      description: 'Questions about payments, plans, and subscriptions.',
      link: '/faq#payment'
    },
    {
      title: 'Verification',
      description: 'How to get verified and verification status.',
      link: '/faq#verification'
    },
    {
      title: 'Safety & Privacy',
      description: 'Learn about our safety and privacy policies.',
      link: '/safety'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <HelpCircle className="h-10 w-10 mx-auto text-primary mb-2" />
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Help Center</h1>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions or get in touch with our support team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {topics.map((topic) => (
                <Card key={topic.title}>
                  <CardHeader>
                    <CardTitle>{topic.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-muted-foreground">{topic.description}</p>
                    <Button asChild variant="outline">
                      <Link href={topic.link}>
                        Learn More <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-xl font-semibold">Still need help?</h2>
              <Button asChild className="w-full md:w-auto">
                <Link href="/contact">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full md:w-auto">
                <Link href="/faq">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read FAQs
                </Link>
              </Button>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 