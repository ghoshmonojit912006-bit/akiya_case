import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  Star,
  ChevronRight,
  MessageCircle,
  Sparkles,
  Layers,
  Box,
} from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../data/products';
import { IPHONE_MODELS, BRAND_SETTINGS } from '../data/settings';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ThreeCaseViewer } from '../components/products/ThreeCaseViewer';
import { ProductCard } from '../components/products/ProductCard';
import { Badge } from '../components/ui/Badge';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = SAMPLE_PRODUCTS.find((p) => p.id === id) || SAMPLE_PRODUCTS[0];

  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedModel, setSelectedModel] = useState<string>(IPHONE_MODELS[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colorName);
  const [quantity, setQuantity] = useState(1);
  const [view3D, setView3D] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Update selected image when product changes
  useEffect(() => {
    setSelectedImage(product.image);
    setSelectedColor(product.colorName);
    setView3D(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedModel, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedModel, selectedColor, quantity);
    navigate('/checkout');
  };

  const handleWhatsAppOrder = () => {
    const text =
      `🌸 *Order Inquiry — AKIYA CASES*\n\n` +
      `Hello! I'd love to order this case:\n` +
      `• *Product:* ${product.name}\n` +
      `• *Phone Model:* ${selectedModel}\n` +
      `• *Color:* ${selectedColor}\n` +
      `• *Quantity:* ${quantity}\n` +
      `• *Total:* ₹${product.price * quantity}\n\n` +
      `Please confirm availability & delivery. Thank you! ♡`;

    const cleanNumber = BRAND_SETTINGS.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Related products
  const relatedProducts = SAMPLE_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.aesthetic === product.aesthetic || p.isBestseller)
  ).slice(0, 4);

  return (
    <div className="py-8 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-charcoal-500 mb-8 overflow-x-auto whitespace-nowrap pb-1">
          <Link to="/" className="hover:text-charcoal-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/shop" className="hover:text-charcoal-900 transition-colors">
            Shop All
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            to={`/shop?aesthetic=${product.aesthetic}`}
            className="hover:text-charcoal-900 transition-colors"
          >
            {product.aesthetic}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-charcoal-900 font-semibold">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Product Gallery / 3D Viewer */}
          <div className="lg:col-span-7 space-y-4">
            {/* View Mode Switcher: 2D Photo vs 3D Interactive Studio */}
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView3D(false)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    !view3D
                      ? 'bg-charcoal-900 text-cream-100 shadow-2xs'
                      : 'bg-white text-charcoal-700 hover:bg-blush-100 border border-blush-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Photo Gallery</span>
                </button>

                <button
                  onClick={() => setView3D(true)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    view3D
                      ? 'bg-charcoal-900 text-cream-100 shadow-2xs'
                      : 'bg-white text-charcoal-700 hover:bg-blush-100 border border-blush-200'
                  }`}
                >
                  <Box className="w-3.5 h-3.5 text-blush-400" />
                  <span>3D Interactive Studio</span>
                </button>
              </div>

              {product.badge && (
                <Badge
                  label={product.badge}
                  variant={product.badge === 'Bestseller' ? 'bestseller' : 'pujo'}
                />
              )}
            </div>

            {/* Display Area */}
            <div className="relative rounded-4xl bg-white border border-blush-200/80 shadow-soft overflow-hidden aspect-4/5 sm:aspect-square flex items-center justify-center p-4">
              {view3D ? (
                <ThreeCaseViewer
                  textureUrl={selectedImage}
                  colorHex={product.colorHex}
                  className="w-full h-full"
                />
              ) : (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-3xl transition-all duration-300"
                />
              )}

              {/* Wishlist Button floating */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-6 right-6 p-3 rounded-full shadow-md backdrop-blur-md transition-transform active:scale-90 ${
                  isFavorite
                    ? 'bg-rose-50 text-rose-500 fill-rose-500'
                    : 'bg-white/90 text-charcoal-700 hover:text-rose-500'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Selectors (if gallery has multiple images) */}
            {!view3D && product.gallery && product.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === img
                        ? 'border-charcoal-900 ring-2 ring-blush-300'
                        : 'border-blush-200 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-500 uppercase tracking-wider mb-2">
                <span>{product.aesthetic}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  ★ {product.rating} <span className="text-charcoal-400">({product.reviewCount} customer reviews)</span>
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-charcoal-600 mt-2 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Price block */}
            <div className="p-4 rounded-2xl bg-cream-50 border border-blush-200/70 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-charcoal-900">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-charcoal-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  {product.discount && (
                    <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800">
                      {product.discount}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-charcoal-500 mt-1">
                  Inclusive of all taxes • Ships in 24 hrs
                </p>
              </div>

              {/* Bundle Alert */}
              <div className="text-right">
                <span className="text-[11px] font-bold text-blush-600 block">
                  Buy 2 for ₹{BRAND_SETTINGS.bundleOffer.bundlePrice}!
                </span>
                <span className="text-[10px] text-charcoal-500">Auto-applies at checkout</span>
              </div>
            </div>

            {/* Phone Model Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-charcoal-800">
                <label htmlFor="model-select">Select Your iPhone Model:</label>
                <span className="text-emerald-700 font-medium">In Stock</span>
              </div>
              <select
                id="model-select"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full py-3 px-4 rounded-2xl bg-white border border-blush-200 text-sm font-semibold text-charcoal-900 focus:outline-hidden focus:border-blush-400 shadow-2xs"
              >
                {IPHONE_MODELS.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            {/* Color / Style Option */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-charcoal-800 block">
                Color & Style: <span className="font-normal text-charcoal-600">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedColor(product.colorName)}
                  className="px-3.5 py-1.5 rounded-full border-2 border-charcoal-900 bg-white text-xs font-semibold flex items-center gap-2 shadow-2xs"
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10"
                    style={{ backgroundColor: product.colorHex }}
                  />
                  <span>{product.colorName}</span>
                </button>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-charcoal-800 block">Quantity:</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-blush-200 rounded-full bg-white px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full hover:bg-blush-100 flex items-center justify-center font-bold text-charcoal-700"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-charcoal-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full hover:bg-blush-100 flex items-center justify-center font-bold text-charcoal-700"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-charcoal-500">
                  Subtotal: <strong>₹{product.price * quantity}</strong>
                </span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={addedAnimation}
                  className={`py-4 px-6 rounded-full font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md active:scale-95 ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-charcoal-900 hover:bg-charcoal-800 text-cream-100'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-4 px-6 rounded-full font-bold text-sm bg-blush-200 hover:bg-blush-300 text-charcoal-900 transition-all shadow-2xs hover:shadow-sm active:scale-95"
                >
                  Buy Now
                </button>
              </div>

              {/* Order via WhatsApp Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 px-6 rounded-full font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order this Case on WhatsApp</span>
              </button>
            </div>

            {/* Description & Feature Pills */}
            <div className="pt-4 border-t border-blush-200/80 space-y-4">
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-800">
                  Key Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-charcoal-600">
                      <Sparkles className="w-3.5 h-3.5 text-blush-500 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping & Returns accordion info */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-cream-50 border border-blush-100 text-xs text-charcoal-700">
                  <Truck className="w-4 h-4 text-charcoal-900 mx-auto mb-1" />
                  <strong className="block text-charcoal-900">Free Delivery</strong>
                  <span>On orders over ₹999</span>
                </div>
                <div className="p-3 rounded-2xl bg-cream-50 border border-blush-100 text-xs text-charcoal-700">
                  <ShieldCheck className="w-4 h-4 text-charcoal-900 mx-auto mb-1" />
                  <strong className="block text-charcoal-900">Drop Protected</strong>
                  <span>Shock-absorbing TPU</span>
                </div>
                <div className="p-3 rounded-2xl bg-cream-50 border border-blush-100 text-xs text-charcoal-700">
                  <RotateCcw className="w-4 h-4 text-charcoal-900 mx-auto mb-1" />
                  <strong className="block text-charcoal-900">Easy Support</strong>
                  <span>Via official WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20 pt-12 border-t border-blush-200">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-charcoal-500">
                You might also love
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mt-1">
                More Aesthetic Cases
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs sm:text-sm font-semibold text-charcoal-900 hover:text-blush-500 underline underline-offset-4"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
