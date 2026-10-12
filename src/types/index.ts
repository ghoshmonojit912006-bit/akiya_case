export type AestheticCategory = 'Floral' | 'Bows' | 'Cute Characters' | 'Clear Cases';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number; // in INR
  originalPrice?: number;
  discount?: string;
  image: string;
  gallery: string[];
  aesthetic: AestheticCategory;
  colorName: string;
  colorHex: string;
  badge?: 'Bestseller' | 'New' | 'Limited Drop' | 'Pujo Special';
  rating: number;
  reviewCount: number;
  description: string;
  details: string[];
  features: string[];
  compatibleModels: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  inStock: boolean;
  charmIncluded?: boolean;
}

export interface CartItem {
  id: string; // unique item key: productId + model + color
  productId: string;
  product: Product;
  selectedModel: string;
  selectedColor: string;
  quantity: number;
}

export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
  paymentMethod: 'upi' | 'cod' | 'card' | 'whatsapp';
}

export interface BrandSettings {
  brandName: string;
  whatsappNumber: string; // e.g. "918017168658"
  displayWhatsApp: string; // e.g. "+91 80171 68658"
  instagramHandle: string;
  instagramUrl: string;
  supportEmail: string;
  city: string;
  bundleOffer: {
    enabled: boolean;
    name: string;
    description: string;
    requiredQty: number; // e.g. 2
    bundlePrice: number; // e.g. 1199
  };
  freeShippingThreshold: number; // e.g. 999
  standardShippingFee: number; // e.g. 99
}
