import { Product } from '../types';
import { IPHONE_MODELS } from './settings';

/**
 * =========================================================================
 * AKIYA CASES — PRODUCT CATALOG (DEMO DATA)
 * =========================================================================
 * You can edit product names, prices in INR, images, compatible models,
 * stock status, and descriptions below. All images use the real assets
 * cropped directly from your uploaded Instagram references.
 */

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'bow-crush',
    name: 'Bow Crush',
    tagline: 'Cute bow-pattern coquette case with pastel accents',
    price: 699,
    originalPrice: 899,
    discount: '22% OFF',
    image: '/assets/products/bow-crush.jpg',
    gallery: [
      '/assets/products/bow-crush.jpg',
      '/assets/products/pink-princess.jpg',
      '/assets/products/ribbon-romance.jpg'
    ],
    aesthetic: 'Bows',
    colorName: 'Blush & Ribbon Tint',
    colorHex: '#F6DCE5',
    badge: 'Bestseller',
    rating: 4.9,
    reviewCount: 42,
    description: 'Adorn your phone in pure charm. Featuring delicate pastel bows, heart motifs, and a soft-grip shockproof bumper, Bow Crush is the ultimate coquette accessory for everyday mirror selfies.',
    details: [
      'Raised 1.8mm camera bezel and screen lip protection',
      'Anti-yellowing crystal TPU backing with high-definition bow print',
      'Tactile responsive buttons with clicky feedback',
      'Wireless MagSafe charging friendly'
    ],
    features: ['Shockproof Bumper', 'Anti-Yellowing UV Coating', 'Camera Ring Guard', 'Lanyard Strap Slot'],
    compatibleModels: [...IPHONE_MODELS],
    isBestseller: true,
    isNew: false,
    inStock: true,
  },
  {
    id: 'hello-kitty-heart',
    name: 'Hello Kitty Heart Mirror',
    tagline: 'Character-inspired quilted case with heart mirror & beaded charm strap',
    price: 799,
    originalPrice: 999,
    discount: '20% OFF',
    image: '/assets/products/hello-kitty-heart.jpg',
    gallery: [
      '/assets/products/hello-kitty-heart.jpg',
      '/assets/products/hello-kitty-pink.jpg',
      '/assets/products/hello-kitty-silver.jpg'
    ],
    aesthetic: 'Cute Characters',
    colorName: 'Pink & Silver Quilted',
    colorHex: '#EEBACD',
    badge: 'Pujo Special',
    rating: 5.0,
    reviewCount: 88,
    charmIncluded: true,
    description: 'Turn heads everywhere with our viral Hello Kitty Heart case. Features an embossed puffy quilted texture, an embellished functional mirror heart for quick touch-ups, and a handcrafted matching rope-bead charm strap.',
    details: [
      'Functional real heart mirror with gem rhinestone trim',
      'Includes premium matching braided rope charm strap (free)',
      'Cushioned puff quilt back texture with Sanrio-inspired details',
      'Full perimeter drop protection'
    ],
    features: ['Real Heart Mirror', 'Matching Charm Strap', 'Embossed Quilt Texture', 'Heavy-Duty Shock Absorption'],
    compatibleModels: [...IPHONE_MODELS],
    isBestseller: true,
    isNew: true,
    inStock: true,
  },
  {
    id: 'lavender-dreams',
    name: 'Lavender Dreams',
    tagline: 'Dreamy purple floral case with fluttering butterflies',
    price: 699,
    originalPrice: 849,
    discount: '18% OFF',
    image: '/assets/products/lavender-dreams.jpg',
    gallery: [
      '/assets/products/lavender-dreams.jpg',
      '/assets/products/daisy-daydream.jpg'
    ],
    aesthetic: 'Floral',
    colorName: 'Lilac & Lavender',
    colorHex: '#DCD5FF',
    badge: 'Limited Drop',
    rating: 4.8,
    reviewCount: 31,
    description: 'A romantic floral dreamscape on your device. Hand-drawn lavender blooms, delicate butterflies, and warm apricot buds encapsulated in a glossy crystal shell with a vibrant pink camera bumper.',
    details: [
      'Contrast pop-pink camera guard for striking aesthetic contrast',
      'Ultra-clear scratch-resistant back plate',
      'Supports Qi wireless charging',
      'Slim ergonomic profile that easily slips into pockets'
    ],
    features: ['Contrast Camera Bumper', 'Floral & Butterfly Art', 'Ultra-Slim Grip', 'Scratch Resistant'],
    compatibleModels: [...IPHONE_MODELS],
    isBestseller: false,
    isNew: true,
    inStock: true,
  },
  {
    id: 'ribbon-romance',
    name: 'Ribbon Romance',
    tagline: 'Lavender ribbon-pattern case with delicate rhinestone sparkles',
    price: 699,
    originalPrice: 899,
    discount: '22% OFF',
    image: '/assets/products/ribbon-romance.jpg',
    gallery: [
      '/assets/products/ribbon-romance.jpg',
      '/assets/products/bow-crush.jpg'
    ],
    aesthetic: 'Bows',
    colorName: 'Soft Lilac Bow',
    colorHex: '#C2B5FF',
    badge: 'New',
    rating: 4.9,
    reviewCount: 26,
    description: 'Elegance meets playfulness. Flowing hand-illustrated lavender satin ribbons accented with tiny sparkling crystal stars, encased in a premium frosted lavender shock frame.',
    details: [
      'Delicate balletcore / coquette aesthetic',
      'Impact-resistant corner airbags for 6ft drop protection',
      'Frosted translucent edge bumper for soft pastel glow',
      'Smooth velvet-touch finish'
    ],
    features: ['Rhinestone Sparkle Art', 'Corner Airbag Buffers', 'Frosted Pastel Edge', 'Lightweight Feel'],
    compatibleModels: [...IPHONE_MODELS],
    isBestseller: false,
    isNew: true,
    inStock: true,
  },
  {
    id: 'sweet-pastels',
    name: 'Sweet Pastels',
    tagline: 'Colorful mini-flower case on crystal clear finish',
    price: 649,
    originalPrice: 799,
    discount: '19% OFF',
    image: '/assets/products/sweet-pastels.jpg',
    gallery: [
      '/assets/products/sweet-pastels.jpg',
      '/assets/products/pastel-bloom.jpg'
    ],
    aesthetic: 'Floral',
    colorName: 'Multicolor Flower Tint',
    colorHex: '#D7ECF7',
    badge: 'Bestseller',
    rating: 4.9,
    reviewCount: 57,
    description: 'A meadow of joyful pastels! Sky blue, sunshine yellow, and mint green flowers sprinkled across a crystal clear backdrop that lets your iPhone’s original color shine through.',
    details: [
      'Crystal clear backing showcases your iPhone base color',
      'Micro-dot matrix technology prevents watermark bubbles',
      'Reinforced camera island framing',
      'Fingerprint-resistant matte-gloss blend'
    ],
    features: ['Crystal Transparent', 'Multi-color Pastel Flowers', 'Anti-Watermark Tech', 'Everyday Protection'],
    compatibleModels: [...IPHONE_MODELS],
    isBestseller: true,
    isNew: false,
    inStock: true,
  },
  {
    id: 'pastel-bloom',
    name: 'Pastel Bloom',
    tagline: 'Aesthetic pastel wildflower bouquet on fresh transparent shell',
    price: 649,
    originalPrice: 799,
    discount: '19% OFF',
    image: '/assets/products/pastel-bloom.jpg',
    gallery: [
      '/assets/products/pastel-bloom.jpg',
      '/assets/products/sweet-pastels.jpg'
    ],
    aesthetic: 'Floral',
    colorName: 'Blossom Palette',
    colorHex: '#FFF9F5',
    badge: 'New',
    rating: 4.7,
    reviewCount: 19,
    description: 'Soft blooms for sunny days. Pastel Bloom highlights subtle watercolor-styled daisies and garden flora, perfect for a cozy, clean girl aesthetic.',
    details: [
      'Premium flexible TPU frame for easy installation',
      'Dual-layer IMD printing technology that will never peel or fade',
      'Precision port and speaker cutouts',
      'Comfortable non-slip side grips'
    ],
    features: ['Fade-Resistant Print', 'Non-Slip Side Grip', 'Precision Cutouts', 'Lightweight Fit'],
    compatibleModels: [...IPHONE_MODELS],
    isBestseller: false,
    isNew: true,
    inStock: true,
  },
  {
    id: 'daisy-daydream',
    name: 'Daisy Daydream',
    tagline: 'White & lavender flower botanical case with butterfly accents',
    price: 699,
    originalPrice: 849,
    discount: '18% OFF',
    image: '/assets/products/daisy-daydream.jpg',
    gallery: [
      '/assets/products/daisy-daydream.jpg',
      '/assets/products/lavender-dreams.jpg'
    ],
    aesthetic: 'Floral',
    colorName: 'Daisy Lavender',
    colorHex: '#DCD5FF',
    badge: 'Limited Drop',
    rating: 4.8,
    reviewCount: 22,
    description: 'Drift away with Daisy Daydream. A garden-inspired masterpiece with pure white blossoms, periwinkle petals, and subtle botanical outlines on a protective shockproof case.',
    details: [
      '360-degree all-around edge protection',
      'High-gloss scratch guard topcoat',
      'Compatible with screen protectors without bubbling',
      'Custom camera ring contour'
    ],
    features: ['Botanical Illustrations', 'Glossy Topcoat', '360° Shock Ring', 'Screen Friendly'],
    compatibleModels: [...IPHONE_MODELS],
    isBestseller: false,
    isNew: false,
    inStock: true,
  },
  {
    id: 'pink-princess',
    name: 'Pink Princess',
    tagline: 'Pink aesthetic statement case with decorative bow & heart details',
    price: 749,
    originalPrice: 949,
    discount: '21% OFF',
    image: '/assets/products/pink-princess.jpg',
    gallery: [
      '/assets/products/pink-princess.jpg',
      '/assets/products/bow-crush.jpg'
    ],
    aesthetic: 'Bows',
    colorName: 'Princess Blush',
    colorHex: '#F6DCE5',
    badge: 'Bestseller',
    rating: 5.0,
    reviewCount: 64,
    description: 'Feel like royalty every time you pick up your phone. Designed for the girls who adore all things pink, cute, and coquette. Rich pastel hues with soft-touch bumper and camera guard.',
    details: [
      'Vibrant blush pink bumper with shock absorption corners',
      'Intricate coquette bow motifs with golden and pearl accents',
      'Raised lip to prevent camera scratches when placed on tables',
      'Silky smooth hand feel with anti-grease coating'
    ],
    features: ['Royal Blush Pink Frame', 'Coquette Ribbon Details', 'Anti-Fingerprint', 'Heavy-Duty Bezel'],
    compatibleModels: [...IPHONE_MODELS],
    isBestseller: true,
    isNew: false,
    inStock: true,
  },
];
