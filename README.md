# 🌸 AKIYA CASES — Premium Aesthetic 3D E-Commerce Website

A modern, responsive, high-converting D2C e-commerce website built for **AKIYA CASES** — selling aesthetic, cute, feminine, and Pinterest-inspired iPhone cases.

---

## ✨ Features Overview

1. **Brand Aesthetics & Design System**
   - Curated color palette: Soft Cream (`#FFF9F5`), Blush Pink (`#F6DCE5`), Lavender (`#DCD5FF`), Pastel Blue (`#D7ECF7`), and Dark Charcoal typography (`#29252A`).
   - Elegant typography pairing DM Sans and Playfair Display editorial serif.
   - Micro-animations, subtle shadows, rounded borders, and clean spacing.

2. **3D Interactive Experience**
   - **Interactive 3D Three.js Studio**: In the Product Details page, toggle between standard photo gallery and a real 360° 3D phone case viewer with realistic bevels, reflections, camera island bumpers, and lenses.
   - **3D Tilt Cards with Glare**: Hero composition and product cards respond to pointer movement with depth and realistic specular glare.
   - Floating aesthetic stickers (bows, ribbons, hearts, flowers) with gentle physics.

3. **Homepage Sections**
   - **Hero Section**: "Your Phone Deserves to Dress Up" headline, trust badges, floating "Your next obsession ♡" tag, and CTA buttons.
   - **Shop by Aesthetic**: Coquette Bows, Cute Characters, Floral Dreams, Pastel Cuties.
   - **Our Bestsellers**: 4 top-selling product cards with quick-add and wishlist.
   - **Festive Bundle Offer**: "Buy 2 Cases — ₹1,199" promotional section inspired by the real Instagram campaign with 1-click bundle claiming.
   - **New Season Drops**: Editorial horizontal showcase.
   - **Brand Story**: "Little Details. Big Personality."
   - **Seen on Your Feed**: Aesthetic Instagram UGC photo grid linking to `@akiya.cases`.
   - **VIP Drop Newsletter**: Interactive subscription with instant confirmation feedback.

4. **Product Catalog & Details Page**
   - 8 demo products using real photos cropped directly from your uploaded Instagram posts.
   - Responsive product grid: 4 columns on desktop, 2 columns on mobile.
   - Filter by aesthetic (*Floral, Bows, Cute Characters, Clear Cases*) and color tints.
   - Sort by Featured, Bestsellers, New Arrivals, Price (Low to High, High to Low).
   - Dedicated Product Details page (`/product/:id`) with:
     - High-res photo gallery + 3D Interactive Studio toggle
     - iPhone model selector (iPhone 11 through 17 Pro Max)
     - Color/design options
     - Quantity stepper
     - Add to Bag & Buy Now buttons
     - Direct "Order on WhatsApp" button with prefilled message
     - Delivery timeline, drop-protection specs, and related items.

5. **Cart & WhatsApp Ordering**
   - Slide-over Cart Drawer (`CartDrawer.tsx`) accessible from anywhere.
   - Free shipping progress bar (unlocked on orders over ₹999 or when bundle applies).
   - Dynamic Festive Bundle calculation: automatically applies ₹1,199 duo pricing when 2 or more cases are in bag.
   - Edit iPhone models directly inside the cart drawer.
   - Persisted cart data via `localStorage`.
   - **1-Click WhatsApp Ordering**: Generates formatted order details (products, selected models, quantities, prices, subtotal, and customer info) and opens WhatsApp via `wa.me`.

6. **Checkout & Order Flow**
   - Complete checkout form: Full Name, WhatsApp phone number, Email, Address, City, State, PIN code.
   - Payment method selector: UPI (GPay/PhonePe/Paytm), Cash on Delivery (COD), or Card/Netbanking.
   - Architecture prepared for Razorpay / backend payment gateway integration.
   - Demo order confirmation with celebration confetti (`canvas-confetti`) and order ID.

7. **Supabase Backend Integration**
   - **Project Name**: `akiya-cases` (Region: `ap-south-1` Mumbai, India)
   - **Database Tables**:
     - `enquiries`: Stores all Contact Form messages, names, phone numbers, and inquiry status.
     - `orders`: Stores all Checkout orders with items JSON, phone models, shipping addresses, PIN codes, and price breakdowns.
     - `newsletter_subscribers`: Stores all VIP Drop email newsletter submissions.
   - **Row Level Security (RLS)** configured to allow seamless anonymous submissions from the website frontend.

8. **10 Complete Pages**
   - `/` — Homepage
   - `/shop` — Shop All Catalog
   - `/product/:id` — Product Details
   - `/collections` — Aesthetic Collections
   - `/about` — About Us & Brand Philosophy
   - `/contact` — Contact, WhatsApp Booking & FAQ
   - `/wishlist` — Saved Favorites
   - `/cart` — Dedicated Cart Page
   - `/checkout` — Checkout & Order Summary
   - `*` — 404 Cute Not Found Page

---

## 🛠️ How to Run the Website Locally

1. Open your terminal in this project directory:
   ```bash
   cd c:\Users\ghosh\OneDrive\Desktop\phone_case
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

4. To test a production build:
   ```bash
   npm run build
   npm run preview
   ```

---

## ⚙️ Where to Edit Brand Data, Prices & Settings

All customizable brand and product information is cleanly separated from UI components:

### 1. WhatsApp Number, Instagram Handle & Bundle Offer
File: `src/data/settings.ts`
- **WhatsApp Booking Number**: Change `whatsappNumber: '918017168658'` (Country code without `+` followed by the 10-digit number).
- **Display Number**: Change `displayWhatsApp: '+91 80171 68658'`.
- **Instagram Handle**: Change `instagramHandle: 'akiya.cases'` and `instagramUrl`.
- **Bundle Promo Offer**: Edit `bundlePrice: 1199`, `requiredQty: 2`, and `name`.
- **Supported iPhone Models**: Edit the `IPHONE_MODELS` array to add or remove device models (iPhone 11 through 17 series).

### 2. Products, Prices, Stock & Images
File: `src/data/products.ts`
- Edit product names, taglines, prices in INR (`price`), original prices (`originalPrice`), stock status (`inStock`), and feature tags.
- To replace product images, place your images in `public/assets/products/` and update the `image` path in `src/data/products.ts`.

### 3. Collections & Aesthetic Capsules
File: `src/data/collections.ts`
- Add or edit categories (*Coquette Bows, Cute Characters, Floral Dreams, Pastel Cuties*).

---

## 📁 Project Architecture

```
src/
  types/
    index.ts              # TypeScript interfaces (Product, CartItem, Order, Settings)
  data/
    products.ts           # 8 sample products with real reference photography
    settings.ts           # Central WhatsApp, Instagram, bundle promo configs & iPhone models
    collections.ts        # Shop by Aesthetic capsules
  context/
    CartContext.tsx       # Cart state, bundle discount math, localStorage & WhatsApp generator
    WishlistContext.tsx   # Wishlist state & localStorage persistence
  components/
    layout/
      AnnouncementBar.tsx # Top promo banner
      Navbar.tsx          # Sticky blur navbar, search modal, live cart/wishlist badges
      Footer.tsx          # Brand story, policies, WhatsApp & Instagram links
    home/
      Hero.tsx            # 3D tilt hero composition with floating aesthetic badges
      ShopByAesthetic.tsx # Category moodboard cards
      Bestsellers.tsx     # 4 bestselling product cards
      BundlePromo.tsx     # Pujo Special Buy 2 for ₹1,199 promo section
      NewArrivals.tsx     # Editorial horizontal showcase
      BrandStory.tsx      # "Little Details. Big Personality."
      InstagramInspo.tsx  # Aesthetic feed photo grid
      Newsletter.tsx      # Email VIP drop subscription
    products/
      ProductCard.tsx     # Responsive 3D tilt card, quick-add, wishlist toggle
      ProductGrid.tsx     # Catalog with sorting, aesthetic filters & color chips
      ThreeCaseViewer.tsx # Interactive 360° Three.js 3D phone case viewer
    cart/
      CartDrawer.tsx      # Slide-over cart drawer with free delivery progress & bundle tracker
    ui/
      TiltCard.tsx        # Reusable 3D tilt component with specular glare
      Badge.tsx           # Aesthetic tag badges
      InstagramIcon.tsx   # Vector Instagram icon
  pages/
    HomePage.tsx
    ShopPage.tsx
    ProductDetailPage.tsx
    CollectionsPage.tsx
    AboutPage.tsx
    ContactPage.tsx
    WishlistPage.tsx
    CartPage.tsx
    CheckoutPage.tsx
    NotFoundPage.tsx
  App.tsx                 # Routing, layout, floating WhatsApp quick action
  main.tsx                # React root mount
  index.css               # Tailwind CSS directives, typography & aesthetic design system
```
