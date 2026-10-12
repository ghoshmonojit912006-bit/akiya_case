import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../../data/products';
import { ProductCard } from '../products/ProductCard';

export const Bestsellers: React.FC = () => {
  // Take 4 top bestseller products
  const bestsellers = SAMPLE_PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-rose-500 mb-2">
              <Flame className="w-3.5 h-3.5 fill-rose-500" />
              <span>Everyone's Obsession</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              Our Bestsellers
            </h2>
          </div>
          <Link
            to="/shop?sort=bestseller"
            className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal-900 hover:text-blush-500 group transition-colors"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 columns on desktop, 2 on mobile as requested in Section 5 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
