import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Star } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background soft ambient blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blush-200/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-lavender-200/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-pastelBlue-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Small announcement badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blush-200/70 border border-blush-300/80 text-charcoal-900 text-xs font-semibold tracking-wider uppercase shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blush-500 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-blush-500" />
              <span>NEW DROP • CUTE CASES FOR EVERY MOOD</span>
            </div>

            {/* Large headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-charcoal-900 leading-[1.12]">
              Your Phone Deserves to{' '}
              <span className="relative inline-block text-blush-500 italic font-serif">
                Dress Up.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-blush-300 -z-10"
                  viewBox="0 0 200 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.00024 6.99997C47.0002 2.49997 142.5 -1.50003 198 6.99997"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Supporting text */}
            <p className="text-base sm:text-lg md:text-xl text-charcoal-700 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover aesthetic phone cases made to match your mood, your style, and your everyday moments.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-cream-100 font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/shop?sort=bestseller"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-blush-100/60 border border-blush-200 text-charcoal-900 font-semibold text-sm sm:text-base transition-all duration-200 shadow-2xs hover:shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Explore Bestsellers</span>
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              </Link>
            </div>

            {/* Small trust message */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-charcoal-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-medium">Cute designs. Everyday protection. Made for your vibe.</span>
            </div>

            {/* Micro Social Proof */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-blush-300 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                  🌸
                </div>
                <div className="w-7 h-7 rounded-full bg-lavender-300 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                  🎀
                </div>
                <div className="w-7 h-7 rounded-full bg-pastelBlue-300 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                  ✨
                </div>
              </div>
              <p className="text-xs text-charcoal-500">
                Loved by <strong>1,200+</strong> aesthetic girls on Instagram
              </p>
            </div>
          </div>

          {/* Right Column: Hero Visual Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <TiltCard maxTilt={10} className="w-full max-w-md">
              <div className="relative p-2 sm:p-4 animate-float-slow">
                {/* Main Hero Case Card */}
                <div className="relative rounded-4xl overflow-hidden bg-white shadow-soft-hover border-4 border-white/90 p-2">
                  <img
                    src="/assets/products/bow-crush.jpg"
                    alt="Bow Crush Aesthetic iPhone Case with Roses"
                    className="w-full h-auto rounded-3xl object-cover shadow-inner"
                  />

                  {/* Glass overlay badge on bottom */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-card border border-white/60 shadow-lg flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-500">
                        Drop of the Week
                      </span>
                      <h3 className="font-serif text-lg font-bold text-charcoal-900">
                        Bow Crush Case
                      </h3>
                    </div>
                    <Link
                      to="/product/bow-crush"
                      className="px-4 py-2 rounded-full bg-charcoal-900 text-cream-100 text-xs font-bold hover:bg-blush-500 transition-colors"
                    >
                      ₹699
                    </Link>
                  </div>
                </div>

                {/* Floating Ribbon / Heart badge */}
                <div className="absolute -top-4 -right-2 sm:-right-4 px-4 py-2 rounded-full bg-white/95 border border-blush-200/80 shadow-float flex items-center gap-2 animate-bounce" style={{ animationDuration: '4s' }}>
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-400" />
                  <span className="text-xs font-bold text-charcoal-900 tracking-wide">
                    Your next obsession ♡
                  </span>
                </div>

                {/* Secondary Mini Floater: Hello Kitty Heart Charm */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 p-2 rounded-2xl bg-white shadow-float border border-blush-200/70 max-w-[170px] hidden sm:block">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/assets/products/hello-kitty-heart.jpg"
                      alt="Hello Kitty Heart Mirror"
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <p className="text-[10px] text-charcoal-500 font-semibold uppercase">Pujo Special</p>
                      <p className="text-xs font-bold text-charcoal-900 truncate">Mirror & Charm</p>
                      <p className="text-[11px] font-extrabold text-blush-600">Buy 2 • ₹1,199</p>
                    </div>
                  </div>
                </div>

                {/* Cute Floating Decorative Stickers */}
                <div className="absolute top-1/4 -left-6 w-11 h-11 rounded-full bg-blush-100 border border-white shadow-card flex items-center justify-center text-lg animate-float-delayed pointer-events-none">
                  🎀
                </div>
                <div className="absolute bottom-1/3 -right-5 w-10 h-10 rounded-full bg-lavender-100 border border-white shadow-card flex items-center justify-center text-base animate-pulse-soft pointer-events-none">
                  🌸
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
