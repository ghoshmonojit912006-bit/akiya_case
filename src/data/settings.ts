import { BrandSettings } from '../types';

/**
 * =========================================================================
 * AKIYA CASES — CENTRAL BUSINESS SETTINGS & CONFIGURATION
 * =========================================================================
 * You can edit the WhatsApp number, Instagram handle, and promotional bundle
 * offer details here. All components and checkout flows read from this file.
 */

export const BRAND_SETTINGS: BrandSettings = {
  brandName: 'AKIYA CASES',
  // Official Booking WhatsApp number (from Akiya Cases Instagram)
  // Format for WhatsApp API: Country code without '+' followed by number
  whatsappNumber: '918017168658',
  displayWhatsApp: '+91 80171 68658',
  instagramHandle: 'akiya.cases',
  instagramUrl: 'https://instagram.com/akiya.cases',
  supportEmail: 'orders@akiyacases.com',
  city: 'Kolkata, India',
  
  // Promotional Bundle Config (Pujo Special / Festive Drop)
  bundleOffer: {
    enabled: true,
    name: 'Pujo Special Duo Bundle',
    description: 'Buy any 2 phone cases for just ₹1,199 with Free Shipping across India!',
    requiredQty: 2,
    bundlePrice: 1199,
  },
  
  freeShippingThreshold: 999, // Free shipping on orders over ₹999
  standardShippingFee: 79,
};

/**
 * Compatible iPhone models available across product lines.
 * Add or remove models here as inventory updates.
 */
export const IPHONE_MODELS = [
  'iPhone 17 Pro Max',
  'iPhone 17 Pro',
  'iPhone 17 Air / Slim',
  'iPhone 17',
  'iPhone 16 Pro Max',
  'iPhone 16 Pro',
  'iPhone 16 Plus',
  'iPhone 16',
  'iPhone 15 Pro Max',
  'iPhone 15 Pro',
  'iPhone 15 Plus',
  'iPhone 15',
  'iPhone 14 Pro Max',
  'iPhone 14 Pro',
  'iPhone 14 Plus',
  'iPhone 14',
  'iPhone 13 Pro Max',
  'iPhone 13 Pro',
  'iPhone 13',
  'iPhone 13 mini',
  'iPhone 12 Pro Max',
  'iPhone 12 Pro',
  'iPhone 12',
  'iPhone 11 Pro Max',
  'iPhone 11 Pro',
  'iPhone 11',
] as const;

export type SupportedIPhoneModel = typeof IPHONE_MODELS[number];
