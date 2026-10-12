import React from 'react';
import { Hero } from '../components/home/Hero';
import { ShopByAesthetic } from '../components/home/ShopByAesthetic';
import { Bestsellers } from '../components/home/Bestsellers';
import { BundlePromo } from '../components/home/BundlePromo';
import { NewArrivals } from '../components/home/NewArrivals';
import { BrandStory } from '../components/home/BrandStory';
import { InstagramInspo } from '../components/home/InstagramInspo';
import { Newsletter } from '../components/home/Newsletter';
import { Truck, ShieldCheck, RefreshCw, Heart } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero />

      {/* Trust Feature Badges */}
      <div className="bg-white border-y border-blush-200/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center shrink-0 text-charcoal-900">
                <Truck className="w-5 h-5 text-blush-600" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-charcoal-900">Free Express Delivery</h4>
                <p className="text-[11px] text-charcoal-500">Across India on orders over ₹999</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-lavender-100 flex items-center justify-center shrink-0 text-charcoal-900">
                <ShieldCheck className="w-5 h-5 text-lavender-500" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-charcoal-900">Anti-Yellowing TPU</h4>
                <p className="text-[11px] text-charcoal-500">Crystal clear with 6ft drop guard</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-pastelBlue-100 flex items-center justify-center shrink-0 text-charcoal-900">
                <RefreshCw className="w-5 h-5 text-pastelBlue-500" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-charcoal-900">Direct WhatsApp Booking</h4>
                <p className="text-[11px] text-charcoal-500">Instant answers & order help</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0 text-charcoal-900">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-charcoal-900">100% Pookie Approved</h4>
                <p className="text-[11px] text-charcoal-500">Aesthetic mirror selfie ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Shop by Aesthetic */}
      <ShopByAesthetic />

      {/* 3. Bestsellers */}
      <Bestsellers />

      {/* 4. Special Bundle Promo Card */}
      <BundlePromo />

      {/* 5. New Arrivals */}
      <NewArrivals />

      {/* 6. Brand Story */}
      <BrandStory />

      {/* 7. Instagram Inspiration */}
      <InstagramInspo />

      {/* 8. Newsletter */}
      <Newsletter />
    </div>
  );
};
