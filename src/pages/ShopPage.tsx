import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SAMPLE_PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/products/ProductGrid';
import { Sparkles, Heart } from 'lucide-react';
import { BRAND_SETTINGS } from '../data/settings';

export const ShopPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const aestheticParam = searchParams.get('aesthetic') || 'All';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-200/80 text-charcoal-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blush-500" />
            <span>Complete Aesthetic Catalog</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal-900">
            All iPhone Cases
          </h1>

          <p className="text-sm sm:text-base text-charcoal-600">
            Cute, trendy, and shockproof cases tailored for iPhone 11 through 17 series. Pick any 2 to unlock our{' '}
            <strong className="text-charcoal-900">₹{BRAND_SETTINGS.bundleOffer.bundlePrice} Duo Bundle</strong>!
          </p>
        </div>

        {/* Product Grid */}
        <ProductGrid products={SAMPLE_PRODUCTS} initialAesthetic={aestheticParam} />
      </div>
    </div>
  );
};
