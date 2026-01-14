
export type Theme = 'light' | 'dark';
export type Screen = 'onboarding' | 'dashboard' | 'ride' | 'marketplace' | 'earn' | 'profile' | 'checkout' | 'business-detail' | 'store';
export type RideStatus = 'idle' | 'payment-select' | 'searching' | 'accepted' | 'arrived' | 'in-progress' | 'completed' | 'review';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  mainCategory: string;
  categories: string[];
}

export interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  image: string;
  logo: string;
  products: Product[];
  phone: string;
  location: string;
  isOpen: boolean;
  distance: string;
}

export interface CartItem extends Product {
  businessId: string;
  businessName: string;
  quantity: number;
}

export interface Activity {
  id: string;
  type: 'ride' | 'order';
  title: string;
  subtitle: string;
  price: number;
  date: string;
  status: 'completed' | 'cancelled';
  rating?: number;
}

export interface UserData {
  name: string;
  phone: string;
  email: string;
  location: string | null;
  photo: string | null;
  rating: number;
}
