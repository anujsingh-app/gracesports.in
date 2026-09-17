export type CategoryId = 'tables' | 'balls' | 'accessories' | 'arena' | 'sportswear' | 'flooring';

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  featured?: boolean;
  badge?: string;
  image: string;
  galleryImages?: string[];
  shortDescription: string;
  description: string;
  specifications: {
    label: string;
    value: string;
  }[];
  dimensions?: string;
  weight?: string;
  isPopular?: boolean;
}

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  academy: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  featured?: boolean;
}

export interface InquiryItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export type ActiveTab = 'home' | 'catalogue' | 'about' | 'gallery' | 'contact' | 'policies';
