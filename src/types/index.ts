export type UserType = 'user' | 'agency' | 'escort'

export interface Escort {
  id: string
  slug: string // SEO-friendly URL slug
  name: string
  age: number
  location: string
  city: string
  state: string
  country: string
  type: 'independent' | 'agency' // New field for escort type
  agencyName?: string // For agency escorts
  photo: string // Main profile photo
  photos: string[] // Gallery photos
  pricing: {
    oneShot: number
    twoShot: number
    threeShot: number
    fullNight: number
    currency: string
  }
  rating: number
  reviews: number // Changed from reviewCount for consistency
  verified: boolean // Changed from isVerified for consistency
  isPremium: boolean
  isActive: boolean
  plan: 'free' | '10' | '20' | '30'
  services: string[]
  description: string
  images: string[]
  videoVerification?: string
  videoVerificationStatus: 'pending' | 'approved' | 'rejected'
  identityVerification: {
    // For Indian escorts
    aadharFront?: string
    aadharBack?: string
    // For international escorts
    passportFront?: string
    passportBack?: string
    // Common fields
    documentType: 'aadhar' | 'passport'
    status: 'pending' | 'approved' | 'rejected'
    submittedAt?: Date
    reviewedAt?: Date
    reviewerNotes?: string
  }
  contactInfo: {
    phone?: string
    whatsapp?: string
    email?: string
  }
  availability: {
    days: string[]
    hours: string
  }
  // New fields for detailed profiles
  height?: string
  bodyType?: string
  hairColor?: string
  eyeColor?: string
  education?: string
  interests?: string[]
  languages?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Agency {
  id: string
  slug: string // SEO-friendly URL slug
  name: string
  ownerName: string
  email: string
  phone: string
  website?: string
  city: string
  state: string
  address: string
  gstNumber: string
  escortsCount: number
  services: string[]
  verified: boolean // Changed from isVerified for consistency
  isPremium: boolean
  isActive: boolean
  plan: 'free' | '10' | '20' | '30'
  // New fields for agency profiles
  established?: string
  description?: string
  specialties?: string[]
  languages?: string[]
  rating?: number
  reviews?: number
  contact: {
    phone: string
    email: string
    website: string
  }
  escorts?: Escort[] // Agency's escorts
  identityVerification: {
    aadharFront?: string
    aadharBack?: string
    status: 'pending' | 'approved' | 'rejected'
    submittedAt?: Date
    reviewedAt?: Date
    reviewerNotes?: string
  }
  earnings: {
    total: number
    thisMonth: number
    lastMonth: number
  }
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  isVerified: boolean
  plan: 'free' | '10' | '20' | '30'
  planExpiry?: Date
  createdAt: Date
}

export interface Review {
  id: string
  escortId: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: Date
}

export interface SearchFilters {
  location?: string
  city?: string
  state?: string
  priceRange?: {
    min: number
    max: number
  }
  services?: string[]
  isVerified?: boolean
  isPremium?: boolean
  rating?: number
  sortBy?: 'rating' | 'price' | 'new' | 'name'
  sortOrder?: 'asc' | 'desc'
}

export interface Plan {
  id: string
  name: string
  duration: number
  price: number
  features: string[]
  isPopular?: boolean
  userType: UserType
  description?: string
}

export interface VideoVerification {
  id: string
  userId: string
  videoUrl: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: Date
  reviewedAt?: Date
  reviewerNotes?: string
} 