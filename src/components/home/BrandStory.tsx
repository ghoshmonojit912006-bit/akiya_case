import React from 'react';
import { Heart, Sparkles, Shield, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-20 bg-cream-50 relative overflow-hidden border-t border-blush-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-200 text-charcoal-900 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Our Philosophy</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 leading-tight">
            Little Details. Big Personality.
          </h2>

          <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed font-normal">
            AKIYA CASES is all about turning everyday essentials into little expressions of your personality. From dreamy florals to playful bows, find a case that feels like you.
          </p>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-5 rounded-2xl bg-white border border-blush-200/60 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-blush-100 flex items-center justify-center text-blush-500 mb-3">
                <Palette className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-charcoal-900 mb-1">
                Pinterest Aesthetics
              </h4>
              <p className="text-xs text-charcoal-600 leading-normal">
                Curated pastel colors, coquette bows, and trending elements designed for mirror selfies.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-blush-200/60 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-lavender-100 flex items-center justify-center text-lavender-400 mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-charcoal-900 mb-1">
                Real Daily Protection
              </h4>
              <p className="text-xs text-charcoal-600 leading-normal">
                Raised camera bezels, shock-absorbing bumper frames, and anti-yellowing crystal TPU backing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-blush-200/60 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-pastelBlue-100 flex items-center justify-center text-pastelBlue-400 mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-charcoal-900 mb-1">
                Affordable Luxury
              </h4>
              <p className="text-xs text-charcoal-600 leading-normal">
                Premium packaging and handcrafted charm accessories at accessible Indian price points.
              </p>
            </div>
          </div>

          <div className="pt-6">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-bold text-charcoal-900 hover:text-blush-500 underline underline-offset-4 transition-colors"
            >
              <span>Read the AKIYA CASES story</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
