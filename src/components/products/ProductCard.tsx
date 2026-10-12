import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Badge } from '../ui/Badge';
import { TiltCard } from '../ui/TiltCard';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  // Determine badge style
  const getBadgeVariant = (badge?: string) => {
    if (badge === 'Bestseller') return 'bestseller';
    if (badge === 'New') return 'new';
    if (badge === 'Limited Drop') return 'limited';
    if (badge === 'Pujo Special') return 'pujo';
    return 'outline';
  };

  return (
    <div className="group flex flex-col h-full">
      <TiltCard maxTilt={6} className="h-full flex flex-col">
        <div
          className="relative bg-white rounded-3xl p-3 sm:p-4 border border-blush-200/50 shadow-soft hover:shadow-soft-hover transition-all duration-300 flex flex-col h-full overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Top Badges & Wishlist Button */}
          <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none">
            {product.badge ? (
              <Badge label={product.badge} variant={getBadgeVariant(product.badge)} />
            ) : <span />}

            <button
              onClick={handleWishlistToggle}
              className={`p-2.5 rounded-full pointer-events-auto transition-transform active:scale-90 shadow-2xs backdrop-blur-md ${
                isFavorite
                  ? 'bg-rose-50 text-rose-500 fill-rose-500'
                  : 'bg-white/80 text-charcoal-700 hover:text-rose-500 hover:bg-white'
              }`}
              aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

          {/* Product Image Frame */}
          <Link
            to={`/product/${product.id}`}
            className="block relative rounded-2xl overflow-hidden bg-cream-50 aspect-4/5 w-full mb-3.5"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              loading="lazy"
            />

            {/* Quick View Overlay on Desktop Hover */}
            <div
              className={`absolute inset-0 bg-charcoal-900/15 backdrop-blur-[2px] hidden md:flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <span className="px-4 py-2 rounded-full bg-white/95 text-charcoal-900 text-xs font-semibold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <Eye className="w-3.5 h-3.5" /> View Details
              </span>
            </div>
          </Link>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-between pt-1">
            <div>
              <div className="flex items-center justify-between gap-1 text-[11px] text-charcoal-500 uppercase tracking-wider mb-1">
                <span>{product.aesthetic}</span>
                <span className="flex items-center gap-1 text-amber-500 font-medium">
                  ★ {product.rating} <span className="text-charcoal-400">({product.reviewCount})</span>
                </span>
              </div>

              <Link to={`/product/${product.id}`} className="block group-hover:text-blush-500 transition-colors">
                <h3 className="font-serif text-base sm:text-lg font-bold text-charcoal-900 leading-snug line-clamp-1">
                  {product.name}
                </h3>
              </Link>

              <p className="text-xs text-charcoal-600 line-clamp-1 mt-0.5">
                {product.tagline}
              </p>
            </div>

            {/* Price & Quick Add Button */}
            <div className="mt-3 pt-3 border-t border-blush-100 flex items-center justify-between gap-2">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base sm:text-lg font-extrabold text-charcoal-900">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-charcoal-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
                {product.discount && (
                  <span className="text-[10px] font-bold text-emerald-600 block">
                    {product.discount}
                  </span>
                )}
              </div>

              <button
                onClick={handleQuickAdd}
                disabled={addedAnimation}
                className={`py-2 px-3 sm:px-3.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 active:scale-95 shadow-2xs ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-cream-200 text-charcoal-900 hover:bg-blush-200'
                }`}
                aria-label="Quick add to bag"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
};
