import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BRAND_SETTINGS, IPHONE_MODELS } from '../../data/settings';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    updateModel,
    subtotal,
    discount,
    bundleApplied,
    bundleSavings,
    shippingFee,
    total,
    isCartOpen,
    setIsCartOpen,
    generateWhatsAppUrl,
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const freeShippingThreshold = BRAND_SETTINGS.freeShippingThreshold;
  const currentSubtotal = subtotal - discount;
  const freeShippingLeft = Math.max(0, freeShippingThreshold - currentSubtotal);
  const freeShippingProgress = Math.min(100, (currentSubtotal / freeShippingThreshold) * 100);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleWhatsAppOrder = () => {
    const url = generateWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-900/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-blush-200/60 flex items-center justify-between bg-cream-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-charcoal-900" />
              <h2 className="font-serif text-xl font-bold text-charcoal-900">Your Shopping Bag</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blush-200 text-charcoal-900 font-semibold">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-charcoal-500 hover:text-charcoal-900 hover:bg-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-blush-50 px-5 py-3 border-b border-blush-200/40">
            <div className="flex items-center justify-between text-xs font-medium text-charcoal-800 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-charcoal-700" />
                {bundleApplied || freeShippingLeft === 0 ? (
                  <strong className="text-emerald-700">🎉 Yay! You unlocked FREE Delivery!</strong>
                ) : (
                  <span>
                    Add <strong>₹{freeShippingLeft}</strong> more for <strong>FREE Delivery</strong>
                  </span>
                )}
              </span>
              <span className="text-[11px] text-charcoal-500">
                {bundleApplied ? '100%' : `${Math.round(freeShippingProgress)}%`}
              </span>
            </div>
            <div className="w-full h-1.5 bg-blush-200/70 rounded-full overflow-hidden">
              <div
                className="h-full bg-charcoal-900 rounded-full transition-all duration-500"
                style={{ width: `${bundleApplied ? 100 : freeShippingProgress}%` }}
              />
            </div>

            {/* Bundle Offer Hint if only 1 item */}
            {items.length === 1 && items[0].quantity === 1 && BRAND_SETTINGS.bundleOffer.enabled && (
              <div className="mt-2 text-[11px] text-blush-600 font-medium flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-lg border border-blush-200">
                <Sparkles className="w-3 h-3 text-blush-500" />
                <span>Tip: Add 1 more case to unlock <strong>2 for ₹{BRAND_SETTINGS.bundleOffer.bundlePrice}</strong>!</span>
              </div>
            )}
          </div>

          {/* Items Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-20 h-20 rounded-full bg-blush-100 flex items-center justify-center mb-4 text-3xl">
                  🎀
                </div>
                <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-2">
                  Your bag is empty
                </h3>
                <p className="text-sm text-charcoal-600 max-w-xs mb-6">
                  Looks like you haven't picked your aesthetic phone case yet!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3 rounded-full bg-charcoal-900 text-cream-100 font-medium text-sm hover:bg-charcoal-800 transition-colors shadow-sm"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 rounded-2xl bg-cream-50/80 border border-blush-100 relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-xl bg-white shadow-2xs shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-charcoal-900 truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-charcoal-400 hover:text-rose-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Phone Model Selector in Cart */}
                      <div className="mt-1">
                        <label className="text-[11px] text-charcoal-500 block mb-0.5">Model:</label>
                        <select
                          value={item.selectedModel}
                          onChange={(e) => updateModel(item.id, e.target.value)}
                          className="w-full text-xs py-1 px-2 rounded-lg bg-white border border-blush-200 text-charcoal-800 focus:outline-hidden focus:border-blush-400"
                        >
                          {IPHONE_MODELS.map((model) => (
                            <option key={model} value={model}>
                              {model}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-blush-100">
                      <div className="flex items-center border border-blush-200 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-blush-50 text-charcoal-700"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-charcoal-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-blush-50 text-charcoal-700"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-charcoal-900">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Actions */}
          {items.length > 0 && (
            <div className="p-5 border-t border-blush-200/80 bg-white space-y-3">
              {/* Order Calculations */}
              <div className="space-y-1.5 text-xs text-charcoal-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-charcoal-900">₹{subtotal}</span>
                </div>

                {bundleApplied && bundleSavings > 0 && (
                  <div className="flex justify-between text-blush-600 font-semibold bg-blush-50 px-2 py-1 rounded-md">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-blush-500" /> Bundle Discount
                    </span>
                    <span>-₹{bundleSavings}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-charcoal-900">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-charcoal-900 pt-2 border-t border-charcoal-100">
                  <span>Total Amount</span>
                  <span className="font-serif text-lg">₹{total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {/* Proceed to Checkout Button */}
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 px-4 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-cream-100 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Instant WhatsApp Order Button */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Directly via WhatsApp</span>
                </button>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-charcoal-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Safe shopping • Dispatched from Kolkata, India</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
