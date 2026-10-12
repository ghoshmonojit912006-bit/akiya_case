import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Check } from 'lucide-react';
import { Product, AestheticCategory } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  initialAesthetic?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  initialAesthetic = 'All',
}) => {
  const [selectedAesthetic, setSelectedAesthetic] = useState<string>(initialAesthetic);
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const aesthetics: ('All' | AestheticCategory)[] = [
    'All',
    'Bows',
    'Floral',
    'Cute Characters',
    'Clear Cases',
  ];

  // Distinct colors extracted from product data
  const colors = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.colorHex)));
    return ['All', ...unique];
  }, [products]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Aesthetic
    if (selectedAesthetic !== 'All') {
      result = result.filter((p) => p.aesthetic === selectedAesthetic);
    }

    // Filter by Color
    if (selectedColor !== 'All') {
      result = result.filter((p) => p.colorHex === selectedColor);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'new':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'bestseller':
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      case 'featured':
      default:
        // maintain default curated order
        break;
    }

    return result;
  }, [products, selectedAesthetic, selectedColor, sortBy]);

  const hasActiveFilters = selectedAesthetic !== 'All' || selectedColor !== 'All';

  const resetFilters = () => {
    setSelectedAesthetic('All');
    setSelectedColor('All');
    setSortBy('featured');
  };

  return (
    <div>
      {/* Controls Bar: Filters & Sorting */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-6 border-b border-blush-200/60">
        {/* Aesthetic Tabs (Desktop/Tablet) */}
        <div className="hidden sm:flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {aesthetics.map((aes) => {
            const isActive = selectedAesthetic === aes;
            return (
              <button
                key={aes}
                onClick={() => setSelectedAesthetic(aes)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-charcoal-900 text-cream-100 shadow-xs'
                    : 'bg-white text-charcoal-700 hover:bg-blush-100 border border-blush-200'
                }`}
              >
                {aes}
              </button>
            );
          })}
        </div>

        {/* Mobile Filter Toggle & Sort Select */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="sm:hidden px-4 py-2 rounded-full border border-blush-200 bg-white text-charcoal-900 text-xs font-semibold flex items-center gap-2"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {hasActiveFilters && '•'}</span>
          </button>

          {/* Color Palettes Bar (Desktop) */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-blush-200">
            <span className="text-[11px] text-charcoal-500 font-medium mr-1">Color:</span>
            <button
              onClick={() => setSelectedColor('All')}
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                selectedColor === 'All' ? 'bg-charcoal-900 text-white' : 'text-charcoal-600'
              }`}
            >
              All
            </button>
            {colors.filter((c) => c !== 'All').map((colorHex) => (
              <button
                key={colorHex}
                onClick={() => setSelectedColor(colorHex)}
                className={`w-4 h-4 rounded-full border transition-transform ${
                  selectedColor === colorHex ? 'scale-125 ring-2 ring-charcoal-900' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: colorHex }}
                title={colorHex}
                aria-label={`Filter by color ${colorHex}`}
              />
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-charcoal-500 hidden md:block">Sort By:</label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 rounded-full bg-white border border-blush-200 text-xs font-semibold text-charcoal-900 focus:outline-hidden focus:border-blush-400 cursor-pointer shadow-2xs"
              >
                <option value="featured">Featured Picks</option>
                <option value="bestseller">Bestsellers</option>
                <option value="new">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-charcoal-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-xs text-charcoal-500">Active filters:</span>
          {selectedAesthetic !== 'All' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-blush-200 text-charcoal-900 font-medium">
              {selectedAesthetic}
              <button onClick={() => setSelectedAesthetic('All')}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedColor !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-cream-200 text-charcoal-900 font-medium">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedColor }} />
              Selected Color
              <button onClick={() => setSelectedColor('All')}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={resetFilters}
            className="text-xs text-rose-500 font-semibold underline underline-offset-2 ml-2 hover:text-rose-700"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Product Count */}
      <div className="mb-4 text-xs font-medium text-charcoal-500">
        Showing <strong>{filteredProducts.length}</strong> aesthetic {filteredProducts.length === 1 ? 'case' : 'cases'}
      </div>

      {/* Product Grid: 4 columns desktop, 2 mobile */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-blush-200 p-8">
          <div className="text-4xl mb-3">🌸</div>
          <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-2">No cases found</h3>
          <p className="text-sm text-charcoal-600 max-w-sm mx-auto mb-6">
            We couldn't find any cases matching your current filter combination.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-full bg-charcoal-900 text-cream-100 text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-charcoal-900/40 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-blush-200">
                <h3 className="font-serif text-lg font-bold text-charcoal-900">Filter Cases</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-charcoal-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Aesthetic Filter Section */}
              <div className="py-4 border-b border-blush-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                  Aesthetic Style
                </h4>
                <div className="space-y-2">
                  {aesthetics.map((aes) => (
                    <button
                      key={aes}
                      onClick={() => setSelectedAesthetic(aes)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium ${
                        selectedAesthetic === aes
                          ? 'bg-blush-200 font-bold text-charcoal-900'
                          : 'hover:bg-cream-100 text-charcoal-700'
                      }`}
                    >
                      <span>{aes}</span>
                      {selectedAesthetic === aes && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter Section */}
              <div className="py-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                  Color Tint
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedColor('All')}
                    className={`px-3 py-1 rounded-full text-xs ${
                      selectedColor === 'All' ? 'bg-charcoal-900 text-white font-bold' : 'bg-cream-100'
                    }`}
                  >
                    All Colors
                  </button>
                  {colors.filter((c) => c !== 'All').map((colorHex) => (
                    <button
                      key={colorHex}
                      onClick={() => setSelectedColor(colorHex)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        selectedColor === colorHex ? 'border-charcoal-900 scale-110 ring-2 ring-blush-300' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: colorHex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-blush-200 space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-full bg-charcoal-900 text-cream-100 text-xs font-bold"
              >
                Apply Filters ({filteredProducts.length} items)
              </button>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="w-full py-2 text-xs text-rose-500 font-medium"
                >
                  Reset all filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
