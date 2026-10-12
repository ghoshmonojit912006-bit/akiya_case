import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { AESTHETIC_COLLECTIONS } from '../../data/collections';

export const ShopByAesthetic: React.FC = () => {
  return (
    <section className="py-16 bg-cream-50/70 border-y border-blush-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-charcoal-500 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blush-400" />
              <span>Curated Moodboards</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              Shop by Aesthetic
            </h2>
          </div>
          <p className="text-sm text-charcoal-600 max-w-md mt-2 md:mt-0">
            Find the vibe that matches your camera roll, outfit rotation, and daily aesthetic.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AESTHETIC_COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              to={`/shop?aesthetic=${col.aestheticKey}`}
              className="group relative rounded-3xl overflow-hidden bg-white p-3 border border-blush-200/60 shadow-soft hover:shadow-soft-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-4/5 mb-4 bg-cream-100">
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-charcoal-900 shadow-2xs">
                    {col.badge}
                  </span>
                </div>
              </div>

              <div className="px-2 pb-2">
                <h3 className="font-serif text-xl font-bold text-charcoal-900 group-hover:text-blush-500 transition-colors">
                  {col.name}
                </h3>
                <p className="text-xs text-charcoal-600 line-clamp-2 mt-1">
                  {col.tagline}
                </p>

                <div className="mt-4 pt-3 border-t border-blush-100 flex items-center justify-between text-xs font-semibold text-charcoal-900">
                  <span>Explore Cases</span>
                  <div className="w-7 h-7 rounded-full bg-cream-200 group-hover:bg-blush-200 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
