// User Types
export type UserRole = 'client' | 'provider' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  phone?: string;
  location?: string;
  createdAt: Date | string;
}

// Event Types
export type EventType = 
  | 'boda' 
  | 'cumpleanos' 
  | 'xv' 
  | 'corporativo' 
  | 'empresarial'
  | 'baby-shower' 
  | 'gender-reveal'
  | 'graduacion' 
  | 'bautizo' 
  | 'infantil'
  | 'inauguracion'
  | 'festival'
  | 'concierto'
  | 'brunch'
  | 'networking'
  | 'despedida'
  | 'experiencia-privada'
  | 'otro';
export type EventStatus = 'draft' | 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type EventStyle = 'elegante' | 'casual' | 'rustico' | 'moderno' | 'vintage' | 'minimalista' | 'tematico';

export interface Event {
  id: string;
  name: string;
  type: EventType;
  date: Date;
  location: string;
  guestCount: number;
  budget: number;
  description?: string;
  status: EventStatus;
  style?: EventStyle;
  clientId: string;
  services: EventService[];
  appointments?: Appointment[];
  deposits?: Deposit[];
  contracts?: Contract[];
  createdAt: Date | string;
  updatedAt: Date;
}

export interface EventService {
  id: string;
  serviceId: string;
  providerId: string;
  name: string;
  category: ServiceCategory;
  price: number;
  status: 'pending' | 'confirmed' | 'rejected';
}

// Service Categories - NEW STRUCTURE with Groups and Subcategories
export interface ServiceSubcategory {
  id: string;
  name: string;
}

export interface ServiceCategoryGroup {
  id: string;
  name: string;
  description: string;
  icon: string;
  subcategories: ServiceSubcategory[];
}

// Legacy type for backward compatibility
export type ServiceCategory = string;

// Provider Types
export interface Provider {
  id: string;
  userId: string;
  businessName: string;
  description: string;
  location: string;
  categories: ServiceCategory[];
  rating: number;
  reviewCount: number;
  portfolio: string[];
  isVerified: boolean;
  isFeatured: boolean;
  isAdvertised: boolean;
  plan: 'free' | 'professional' | 'enterprise';
  services: Service[];
  availability: Availability[];
  trialEndsAt?: Date;
}

export interface Service {
  id: string;
  providerId: string;
  name: string;
  description: string;
  category: ServiceCategory;
  price: number;
  priceType: 'fixed' | 'per_person' | 'per_hour' | 'per_item';
  images: string[];
  includesTasting?: boolean;
  includesVisit?: boolean;
}

export interface Availability {
  date: Date;
  isAvailable: boolean;
}

// Appointment Types - NEW
export type AppointmentType = 'venue_visit' | 'tasting' | 'decoration_viewing' | 'consultation';
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  eventId: string;
  providerId: string;
  type: AppointmentType;
  date: Date;
  notes?: string;
  status: AppointmentStatus;
  createdAt: Date | string;
}

// Deposit Types - NEW
export interface Deposit {
  id: string;
  eventId: string;
  providerId: string;
  serviceId: string;
  amount: number;
  percentage: number;
  status: 'pending' | 'paid' | 'refunded';
  dueDate: Date;
  paidAt?: Date;
  createdAt: Date | string;
}

// Contract Types - NEW
export interface Contract {
  id: string;
  eventId: string;
  providerId: string;
  serviceId: string;
  content: string;
  clientSignature?: string;
  providerSignature?: string;
  clientSignedAt?: Date;
  providerSignedAt?: Date;
  status: 'draft' | 'sent' | 'signed' | 'completed';
  createdAt: Date | string;
}

// Booking Types
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  eventId: string;
  clientId: string;
  providerId: string;
  serviceId: string;
  date: Date;
  price: number;
  status: BookingStatus;
  createdAt: Date | string;
}

// Review Types
export interface Review {
  id: string;
  bookingId: string;
  clientId: string;
  providerId: string;
  rating: number;
  comment: string;
  createdAt: Date | string;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  attachments?: string[];
  createdAt: Date | string;
  isRead: boolean;
}

// Marketing Types - NEW
export interface AdCampaign {
  id: string;
  providerId: string;
  type: 'featured' | 'banner' | 'sponsored';
  startDate: Date;
  endDate: Date;
  budget: number;
  impressions: number;
  clicks: number;
  status: 'active' | 'paused' | 'completed';
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}
