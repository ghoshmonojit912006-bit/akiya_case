import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AESTHETIC_COLLECTIONS } from '../data/collections';
import { SAMPLE_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export const CollectionsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const activeAesthetic = searchParams.get('aesthetic');

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-200 text-charcoal-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blush-500" />
            <span>Curated Aesthetics</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal-900">
            Aesthetic Collections
          </h1>

          <p className="text-sm sm:text-base text-charcoal-600">
            Explore our curated capsules designed to match your camera roll vibe, whether you're in your balletcore bow era or floral garden state of mind.
          </p>
        </div>

        {/* Collections Overview */}
        <div className="space-y-16">
          {AESTHETIC_COLLECTIONS.map((col) => {
            const collectionProducts = SAMPLE_PRODUCTS.filter(
              (p) => p.aesthetic === col.aestheticKey
            );

            // If an aesthetic is filtered, skip others unless viewing all
            if (activeAesthetic && col.aestheticKey !== activeAesthetic) {
              return null;
            }

            return (
              <div
                key={col.id}
                id={col.id}
                className="bg-white rounded-4xl p-6 sm:p-10 border border-blush-200/70 shadow-soft"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-blush-100 gap-4">
                  <div className="space-y-2 max-w-xl">
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                      {col.badge}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
                      {col.name}
                    </h2>
                    <p className="text-sm text-charcoal-600 leading-relaxed">
                      {col.description}
                    </p>
                  </div>

                  <Link
                    to={`/shop?aesthetic=${col.aestheticKey}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-900 hover:text-blush-500 underline underline-offset-4"
                  >
                    <span>View all {col.name} ({collectionProducts.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
                  {collectionProducts.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
