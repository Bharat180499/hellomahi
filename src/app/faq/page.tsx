"use client"


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const faqData = [
  {
    section: 'Account',
    questions: [
      {
        q: 'How do I create an account?',
        a: 'Click on Register and choose your user type. Fill in the required details and submit the form.'
      },
      {
        q: 'Can I change my email address?',
        a: 'Yes, go to your profile settings and update your email address.'
      },
      {
        q: 'I forgot my password. What should I do?',
        a: 'Use the Forgot Password link on the login page to reset your password.'
      }
    ]
  },
  {
    section: 'Booking',
    questions: [
      {
        q: 'How do I book an escort?',
        a: 'Browse listings, select a profile, and click Book Now. Follow the instructions to complete your booking.'
      },
      {
        q: 'Can I cancel or reschedule a booking?',
        a: 'Yes, go to your bookings page to manage your appointments.'
      }
    ]
  },
  {
    section: 'Payment',
    questions: [
      {
        q: 'What payment methods are accepted?',
        a: 'We accept credit/debit cards, UPI, and net banking.'
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes, all payments are processed securely using Stripe.'
      }
    ]
  },
  {
    section: 'Verification',
    questions: [
      {
        q: 'How do I get verified?',
        a: 'Go to the verification page and follow the steps for video and document verification.'
      },
      {
        q: 'How long does verification take?',
        a: 'Verification usually takes 24-48 hours after you submit your documents.'
      }
    ]
  },
  {
    section: 'Safety & Privacy',
    questions: [
      {
        q: 'Is my information private?',
        a: 'Yes, we take privacy seriously. Your data is encrypted and never shared without your consent.'
      },
      {
        q: 'How do I report suspicious activity?',
        a: 'Use the contact form or chat to report any concerns to our support team.'
      }
    ]
  }
]

export default function FAQPage() {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({})

  const toggle = (section: string, idx: number) => {
    setOpen((prev) => ({ ...prev, [`${section}-${idx}`]: !prev[`${section}-${idx}`] }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Frequently Asked Questions</h1>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions about our platform.
              </p>
            </div>

            {faqData.map((section) => (
              <div key={section.section} className="mb-8">
                <h2 className="text-xl font-semibold mb-4">{section.section}</h2>
                <div className="space-y-3">
                  {section.questions.map((q, idx) => (
                    <Card key={q.q}>
                      <CardHeader
                        className="flex flex-row items-center justify-between cursor-pointer"
                        onClick={() => toggle(section.section, idx)}
                      >
                        <CardTitle className="text-base font-medium">{q.q}</CardTitle>
                        {open[`${section.section}-${idx}`] ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </CardHeader>
                      {open[`${section.section}-${idx}`] && (
                        <CardContent>
                          <p className="text-muted-foreground text-sm">{q.a}</p>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 