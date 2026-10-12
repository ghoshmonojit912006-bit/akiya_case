import React from 'react';
import { Heart, Sparkles, Shield, Palette, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND_SETTINGS } from '../data/settings';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-200 text-charcoal-900 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Behind AKIYA CASES</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-charcoal-900 leading-tight">
            Little Details. <br />
            <span className="italic text-blush-500 font-serif">Big Personality.</span>
          </h1>

          <p className="text-base sm:text-lg text-charcoal-700 max-w-2xl mx-auto leading-relaxed">
            AKIYA CASES was born out of a simple observation: our phones are with us every minute of every day, yet most cases on the Indian market were either bulky, boring, or uninspired.
          </p>
        </div>

        {/* Visual photo & quote */}
        <div className="relative rounded-4xl overflow-hidden bg-white p-4 shadow-soft border border-blush-200">
          <img
            src="/assets/products/bow-crush.jpg"
            alt="Akiya Cases Studio Aesthetic"
            className="w-full h-80 sm:h-96 object-cover rounded-3xl"
          />
          <div className="p-6 text-center">
            <p className="font-serif text-lg sm:text-xl italic text-charcoal-800 max-w-lg mx-auto">
              "We believe your mirror selfies deserve as much thought as your morning outfit."
            </p>
            <p className="text-xs uppercase tracking-widest text-charcoal-500 font-bold mt-2">
              — The AKIYA CASES Team • Kolkata
            </p>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-blush-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blush-100 flex items-center justify-center text-blush-500 font-bold">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal-900">
              Curated Moodboards
            </h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              Every design is inspired by coquette bows, Pinterest aesthetics, and nostalgic pastel palettes designed to complement your daily aesthetic.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-blush-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-lavender-100 flex items-center justify-center text-lavender-400 font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal-900">
              Everyday Protection
            </h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              Never choose between cute and durable. We use anti-yellowing German Bayer TPU, raised camera bezels, and reinforced bumper corners.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-blush-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-pastelBlue-100 flex items-center justify-center text-pastelBlue-400 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal-900">
              Direct Community Love
            </h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              We chat directly with our customers on WhatsApp and Instagram, listening to which iPhone models and charm accessories you want next.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-cream-100 font-bold text-sm shadow-md transition-all"
          >
            <span>Explore the Latest Drop</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
