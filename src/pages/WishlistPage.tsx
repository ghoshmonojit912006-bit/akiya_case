import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/products/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlistProducts, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-200 text-charcoal-900 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Saved Favorites</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
            My Wishlist ({wishlistCount})
          </h1>

          <p className="text-xs sm:text-sm text-charcoal-600">
            All the cute designs you've saved for later. Ready to dress up your phone?
          </p>
        </div>

        {wishlistCount === 0 ? (
          <div className="text-center py-20 bg-white rounded-4xl border border-blush-200 p-8 max-w-md mx-auto shadow-soft">
            <div className="w-16 h-16 rounded-full bg-blush-100 flex items-center justify-center mx-auto text-2xl mb-4">
              ♡
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-charcoal-600 mb-6 leading-relaxed">
              Explore our coquette bows, cute characters, and florals to save your favorite picks.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-charcoal-900 text-cream-100 text-xs font-bold shadow-sm"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
