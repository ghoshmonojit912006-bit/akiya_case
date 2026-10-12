export interface CollectionItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  aestheticKey: string;
  image: string;
  count: number;
  badge: string;
  accentColor: string;
}

export const AESTHETIC_COLLECTIONS: CollectionItem[] = [
  {
    id: 'coquette-bows',
    name: 'Coquette Bows',
    tagline: 'Ribbons, delicate bows & sweet balletcore charm',
    description: 'Designed for the soft-glam girlies. Featuring satin ribbon illustrations, rhinestone accents, and blush pastels that turn your phone into a statement piece.',
    aestheticKey: 'Bows',
    image: '/assets/products/bow-crush.jpg',
    count: 3,
    badge: 'Trending Now',
    accentColor: '#F6DCE5',
  },
  {
    id: 'cute-characters',
    name: 'Cute Characters',
    tagline: 'Hello Kitty, puffy quilted textures & beaded charms',
    description: 'Our most viral drops! Featuring functional heart mirrors, collectible bead charms, and tactile quilted cases that feel as cute as they look.',
    aestheticKey: 'Cute Characters',
    image: '/assets/products/hello-kitty-heart.jpg',
    count: 2,
    badge: 'Viral TikTok Drop',
    accentColor: '#EEBACD',
  },
  {
    id: 'floral-dreams',
    name: 'Floral Dreams',
    tagline: 'Pastel wildflowers, lavender botanicals & butterflies',
    description: 'Fresh meadows in your pocket. Soft daisy bouquets and romantic lavender blossoms designed to bring nature-inspired calm to your daily screen time.',
    aestheticKey: 'Floral',
    image: '/assets/products/lavender-dreams.jpg',
    count: 4,
    badge: 'Most Loved',
    accentColor: '#DCD5FF',
  },
  {
    id: 'pastel-cuties',
    name: 'Pastel Cuties',
    tagline: 'Minimalist pastels, colorful mini-blooms & clean aesthetics',
    description: 'Clean, lighthearted, and effortlessly aesthetic. Subtle pastel tones designed to pair seamlessly with your outfit of the day and mirror selfies.',
    aestheticKey: 'Clear Cases',
    image: '/assets/products/sweet-pastels.jpg',
    count: 2,
    badge: 'Everyday Minimal',
    accentColor: '#D7ECF7',
  },
];
