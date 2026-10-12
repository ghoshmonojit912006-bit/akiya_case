import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 px-4 text-center max-w-md mx-auto">
      <div className="w-24 h-24 rounded-full bg-blush-200 text-charcoal-900 flex items-center justify-center text-4xl mx-auto mb-6 shadow-soft animate-float-slow">
        🎀
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-charcoal-500">
        404 — Page Not Found
      </span>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 mt-2 mb-3">
        Lost in the Aesthetic Feed?
      </h1>

      <p className="text-xs sm:text-sm text-charcoal-600 mb-8 leading-relaxed">
        We couldn't find the page or phone case you were looking for. Let's get you back to our main drop!
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-cream-100 font-bold text-xs sm:text-sm shadow-md transition-all"
      >
        <span>Back to Homepage</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};
