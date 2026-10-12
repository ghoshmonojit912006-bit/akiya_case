import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../../data/products';
import { ProductCard } from '../products/ProductCard';

export const NewArrivals: React.FC = () => {
  // Take new arrivals or latest additions
  const newProducts = SAMPLE_PRODUCTS.filter((p) => p.isNew || p.badge === 'New' || p.badge === 'Limited Drop');

  return (
    <section className="py-16 md:py-20 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-lavender-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fresh Off The Studio</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              New Season Drops
            </h2>
          </div>
          <Link
            to="/shop?sort=new"
            className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal-900 hover:text-blush-500 group transition-colors"
          >
            <span>Explore All New Arrivals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Editorial Showcase Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
