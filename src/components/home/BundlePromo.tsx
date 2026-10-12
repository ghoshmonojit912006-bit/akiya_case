import React, { useState } from 'react';
import { Sparkles, Check, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BRAND_SETTINGS } from '../../data/settings';
import { SAMPLE_PRODUCTS } from '../../data/products';
import { TiltCard } from '../ui/TiltCard';

export const BundlePromo: React.FC = () => {
  const { addToCart } = useCart();
  const [claimed, setClaimed] = useState(false);

  const bundle = BRAND_SETTINGS.bundleOffer;

  // 1-click bundle add: adds 2 viral cases (Hello Kitty Heart + Bow Crush)
  const handleClaimBundle = () => {
    const case1 = SAMPLE_PRODUCTS.find((p) => p.id === 'hello-kitty-heart') || SAMPLE_PRODUCTS[0];
    const case2 = SAMPLE_PRODUCTS.find((p) => p.id === 'bow-crush') || SAMPLE_PRODUCTS[1];

    addToCart(case1);
    addToCart(case2);
    setClaimed(true);
    setTimeout(() => setClaimed(false), 2000);
  };

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-blush-50/70 border-y border-blush-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-5xl p-6 sm:p-10 lg:p-12 shadow-soft border border-blush-200/80 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Visual Promo Card inspired by Instagram Post */}
          <div className="lg:col-span-5 flex justify-center">
            <TiltCard maxTilt={8} className="w-full max-w-md">
              <div className="relative rounded-3xl overflow-hidden bg-cream-50 p-3 shadow-card border border-blush-200">
                <img
                  src="/assets/promos/pujo-sale-bundle.jpg"
                  alt="Akiya Cases Pujo Sale Buy 2 for 1199"
                  className="w-full h-auto rounded-2xl object-cover"
                />

                {/* Floating pill badge */}
                <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-charcoal-900 text-cream-100 text-xs font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blush-300" />
                  <span>Limited Festive Offer</span>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Promotional Details & 1-Click Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blush-200 text-charcoal-900 text-xs font-bold tracking-wider uppercase">
              <span>PUJO & FESTIVE SPECIAL • JUST FOR POOKIE GIRLS 🎀</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 leading-tight">
              Buy Any 2 Cases for{' '}
              <span className="text-blush-500 font-serif underline decoration-blush-300 underline-offset-8">
                ₹{bundle.bundlePrice}
              </span>
            </h2>

            <p className="text-charcoal-700 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Double the cuteness, half the guilt! Mix and match any two aesthetic designs—including our viral Hello Kitty Mirror Heart with free charm strap.
            </p>

            {/* Benefit bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0 text-left pt-1">
              <div className="flex items-center gap-2.5 text-sm text-charcoal-800">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold">
                  ✓
                </div>
                <span>Free Charm Strap with select cases</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-charcoal-800">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold">
                  ✓
                </div>
                <span>Free Express Shipping across India</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-charcoal-800">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold">
                  ✓
                </div>
                <span>Save up to ₹400 compared to single prices</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-charcoal-800">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold">
                  ✓
                </div>
                <span>Available for all iPhone 11 - 17 models</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handleClaimBundle}
                disabled={claimed}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-cream-100 font-semibold text-sm sm:text-base transition-all duration-200 shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                {claimed ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Bundle Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Claim Duo Bundle (₹1,199)</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/${BRAND_SETTINGS.whatsappNumber}?text=${encodeURIComponent(
                  `Hello AKIYA CASES! I'd like to order the Pujo Special Bundle (Buy 2 for ₹${bundle.bundlePrice}). Please share available models!`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-xs flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Book on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-1 flex items-center justify-center lg:justify-start gap-2 text-xs text-charcoal-500">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Ships next business day • Verified Indian D2C Brand</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
