import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Menu,
  X,
  Sparkles,
  PhoneCall,
  ArrowRight,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { BRAND_SETTINGS } from '../../data/settings';
import { SAMPLE_PRODUCTS } from '../../data/products';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const searchResults = searchQuery.trim()
    ? SAMPLE_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.aesthetic.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.colorName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop All', path: '/shop' },
    { label: 'Collections', path: '/collections' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-soft py-3'
            : 'bg-cream-100/90 backdrop-blur-md py-4 border-b border-blush-200/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-charcoal-800 hover:text-charcoal-950 focus:outline-hidden"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Wordmark */}
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <Link to="/" className="inline-block group">
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-charcoal-900 group-hover:text-blush-500 transition-colors">
                    AKIYA
                  </span>
                  <span className="text-xs uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-blush-200 text-charcoal-800 font-semibold">
                    CASES
                  </span>
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal-500 font-medium -mt-1 hidden sm:block">
                  Aesthetic iPhone Studio
                </p>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm tracking-wide font-medium transition-colors relative py-1 ${
                      isActive
                        ? 'text-charcoal-900 font-semibold'
                        : 'text-charcoal-600 hover:text-charcoal-900'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blush-300 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Icons: Search, Wishlist, Account, Bag */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-charcoal-700 hover:text-charcoal-950 rounded-full hover:bg-blush-100/60 transition-colors"
                aria-label="Search cases"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="relative p-2 text-charcoal-700 hover:text-charcoal-950 rounded-full hover:bg-blush-100/60 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-blush-300 text-charcoal-900 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className="p-2 text-charcoal-700 hover:text-charcoal-950 rounded-full hover:bg-blush-100/60 transition-colors"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </button>
                {isAccountOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-soft-hover border border-blush-200/80 p-4 z-50 text-left">
                    <div className="flex items-center gap-3 pb-3 border-b border-charcoal-100">
                      <div className="w-10 h-10 rounded-full bg-blush-200 flex items-center justify-center font-bold text-charcoal-900">
                        ♡
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-charcoal-900">Guest Shopper</p>
                        <p className="text-xs text-charcoal-500">Welcome to AKIYA CASES</p>
                      </div>
                    </div>
                    <div className="pt-3 space-y-2 text-sm text-charcoal-700">
                      <Link
                        to="/wishlist"
                        onClick={() => setIsAccountOpen(false)}
                        className="block px-2 py-1.5 rounded-lg hover:bg-cream-100 transition-colors"
                      >
                        Saved Wishlist ({wishlistCount})
                      </Link>
                      <a
                        href={BRAND_SETTINGS.instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="block px-2 py-1.5 rounded-lg hover:bg-cream-100 transition-colors"
                      >
                        Follow @{BRAND_SETTINGS.instagramHandle}
                      </a>
                      <a
                        href={`https://wa.me/${BRAND_SETTINGS.whatsappNumber}`}
                        target="_blank"
                        rel="noreferrer"
                        className="block px-2 py-1.5 rounded-lg hover:bg-emerald-50 text-emerald-800 transition-colors flex items-center gap-1.5"
                      >
                        <PhoneCall className="w-3.5 h-3.5" /> Support on WhatsApp
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Shopping Bag Icon with Live Count */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 bg-charcoal-900 hover:bg-charcoal-800 text-cream-100 rounded-full transition-transform active:scale-95 shadow-sm"
                aria-label="Open shopping cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blush-300 text-charcoal-900 text-xs font-bold rounded-full flex items-center justify-center shadow-xs">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Modal Bar Dropdown */}
        {isSearchOpen && (
          <div className="border-t border-blush-200/60 bg-white/95 backdrop-blur-md px-4 py-4 transition-all">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="w-5 h-5 text-charcoal-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cute cases (e.g. Bow, Floral, Hello Kitty, Lavender)..."
                  className="w-full pl-12 pr-10 py-3 rounded-full border border-blush-200 bg-cream-50 text-charcoal-900 text-sm focus:outline-hidden focus:border-blush-400 focus:ring-2 focus:ring-blush-200/50"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Search Suggestions or Results */}
              {searchQuery.trim() && (
                <div className="mt-3 bg-white rounded-2xl p-2 border border-blush-100 shadow-soft max-h-80 overflow-y-auto">
                  {searchResults.length === 0 ? (
                    <p className="p-4 text-center text-sm text-charcoal-500">
                      No cases found matching "{searchQuery}". Try "Bow", "Heart", or "Floral"!
                    </p>
                  ) : (
                    searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-cream-100 transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-14 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-charcoal-900">{product.name}</p>
                          <p className="text-xs text-charcoal-500">{product.tagline}</p>
                        </div>
                        <span className="text-sm font-bold text-charcoal-900">₹{product.price}</span>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-charcoal-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-cream-100 shadow-2xl p-6 flex flex-col justify-between z-10 animate-in slide-in-from-left duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-blush-200">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-2xl font-bold tracking-wider text-charcoal-900">
                    AKIYA
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blush-200 text-charcoal-900 font-bold">
                    CASES
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-full text-charcoal-600 hover:text-charcoal-900"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="mt-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block text-lg font-medium text-charcoal-800 hover:text-blush-500 py-1"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/wishlist"
                  className="block text-lg font-medium text-charcoal-800 hover:text-blush-500 py-1 flex items-center justify-between"
                >
                  <span>Wishlist</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blush-200 font-semibold">
                    {wishlistCount}
                  </span>
                </Link>
              </nav>

              <div className="mt-8 p-4 rounded-2xl bg-blush-100/70 border border-blush-200">
                <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-900 uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-blush-500" />
                  <span>Festive Bundle</span>
                </div>
                <p className="text-xs text-charcoal-600">
                  Buy any 2 aesthetic cases for just ₹1,199 + Free Delivery!
                </p>
                <Link
                  to="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-charcoal-900 mt-2 hover:underline"
                >
                  Claim Bundle <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-blush-200 space-y-3">
              <a
                href={`https://wa.me/${BRAND_SETTINGS.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-emerald-600 text-white font-medium text-sm shadow-sm"
              >
                <PhoneCall className="w-4 h-4" /> Order on WhatsApp
              </a>
              <p className="text-[11px] text-center text-charcoal-500">
                Instagram: @{BRAND_SETTINGS.instagramHandle}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
