export interface Escort {
  id: string;
  user_id: string;
  agency_id?: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  measurements: string;
  hair_color: string;
  eye_color: string;
  ethnicity: string;
  languages: string[];
  services: Service[];
  rates: Rate[];
  locations: Location[];
  availability: Availability[];
  photos: Photo[];
  videos: Video[];
  documents: Document[];
  bio: string;
  special_offers: string[];
  verification_status: 'pending' | 'verified' | 'rejected';
  status: 'active' | 'inactive' | 'suspended';
  featured: boolean;
  rating: number;
  review_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: number; // in minutes
  price: number;
  currency: string;
  is_available: boolean;
}

export interface Rate {
  id: string;
  service_id: string;
  duration: number; // in minutes
  price: number;
  currency: string;
  is_available: boolean;
}

export interface Location {
  id: string;
  city: string;
  state: string;
  country: string;
  is_available: boolean;
  travel_cost?: number;
}

export interface Availability {
  id: string;
  day_of_week: number; // 0-6 (Sunday-Saturday)
  start_time: string; // HH:MM format
  end_time: string; // HH:MM format
  is_available: boolean;
}

export interface Photo {
  id: string;
  url: string;
  thumbnail_url: string;
  alt_text: string;
  is_primary: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface Video {
  id: string;
  url: string;
  thumbnail_url: string;
  title: string;
  duration: number; // in seconds
  is_verified: boolean;
  created_at: string;
}

export interface Document {
  id: string;
  type: string;
  url: string;
  filename: string;
  file_size: number;
  is_verified: boolean;
  created_at: string;
}



export interface EscortSearchFilters {
  location?: string;
  services?: string[];
  price_min?: number;
  price_max?: number;
  age_min?: number;
  age_max?: number;
  ethnicity?: string[];
  languages?: string[];
  availability?: string; // date in YYYY-MM-DD format
  rating_min?: number;
  verified_only?: boolean;
  featured_only?: boolean;
}

export interface EscortSearchParams extends EscortSearchFilters {
  page?: number;
  limit?: number;
  sort_by?: 'rating' | 'price' | 'name' | 'created_at';
  sort_order?: 'asc' | 'desc';
}

export interface EscortSearchResponse {
  escorts: Escort[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  filters: EscortSearchFilters;
}

export interface CreateEscortData {
  name: string;
  age: number;
  height: number;
  weight: number;
  measurements: string;
  hair_color: string;
  eye_color: string;
  ethnicity: string;
  languages: string[];
  bio: string;
  services: Omit<Service, 'id'>[];
  rates: Omit<Rate, 'id'>[];
  locations: Omit<Location, 'id'>[];
  availability: Omit<Availability, 'id'>[];
}

export interface UpdateEscortData extends Partial<CreateEscortData> {
  status?: 'active' | 'inactive' | 'suspended';
  featured?: boolean;
}

export interface EscortStats {
  total_escorts: number;
  active_escorts: number;
  verified_escorts: number;
  featured_escorts: number;
  total_views: number;
  total_bookings: number;
  average_rating: number;
} 