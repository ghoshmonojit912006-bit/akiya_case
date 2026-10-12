import React from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND_SETTINGS } from '../../data/settings';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-charcoal-900 text-cream-100 text-xs py-2 px-4 relative z-40 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2 text-charcoal-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Dispatching orders in 24 hours across India</span>
        </div>

        <div className="mx-auto md:mx-0 flex items-center gap-2 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-blush-300 animate-spin" style={{ animationDuration: '4s' }} />
          <span>
            {BRAND_SETTINGS.bundleOffer.name.toUpperCase()}: Buy 2 Cases for{' '}
            <strong className="text-blush-200">₹{BRAND_SETTINGS.bundleOffer.bundlePrice}</strong> + Free Delivery!
          </span>
          <Link
            to="/shop"
            className="hidden sm:inline-block underline underline-offset-4 hover:text-blush-200 transition-colors ml-1 font-semibold"
          >
            Shop Now →
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-charcoal-300">
          <span>WhatsApp Booking: {BRAND_SETTINGS.displayWhatsApp}</span>
        </div>
      </div>
    </div>
  );
};
