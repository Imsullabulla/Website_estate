
export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  image: string;
  specializations: string[];
  metrics: { label: string; value: string }[];
  phone: string;
  email: string;
  bio: string;
  goldenZones: string[];
}

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  coords: { x: number; y: number }; // Percentage for map placement
  beds: number;
  baths: number;
  sqft: number;
  type: 'Apartment' | 'House' | 'Villa' | 'Penthouse' | 'Estate';
  imageUrl: string;
  description: string;
  community: string;
  reviews: Review[];
  agent: Agent;
}

export interface FilterState {
  search: string;
  type: string;
  minPrice: number;
  maxPrice: number;
  beds: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
}
