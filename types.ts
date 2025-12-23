
export enum UserRole {
  CLIENT = 'CLIENT',
  PROVIDER = 'PROVIDER',
  ADMIN = 'ADMIN'
}

export interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  bufferTime: number; // cleaning/prep time in minutes
  price: number;
  description: string;
}

export interface Review {
  id: string;
  salonId: string;
  clientId: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean;
}

export interface Salon {
  id: string;
  name: string;
  description: string;
  address: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  galleryImages: string[]; // Added for the requested feature
  services: Service[];
  ownerId: string;
  specialties: string[];
  isVerified?: boolean;
  category: 'Coiffure' | 'Barbier' | 'Ongles' | 'Spa' | 'Soin';
  reviews?: Review[];
  cancellationPolicy: {
    freeUntilHours: number;
    lateCancelFeePercent: number;
    noShowFeePercent: number;
  };
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  bookingId?: string;
}

export interface Booking {
  id: string;
  salonId: string;
  serviceId: string;
  clientId: string;
  clientName: string;
  dateTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice: number;
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  createdAt: string;
  reviewId?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  imageUrl: string;
  date: string;
  readTime: string;
}
