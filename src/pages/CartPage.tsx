import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  MessageCircle,
  Truck,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND_SETTINGS, IPHONE_MODELS } from '../data/settings';

export const CartPage: React.FC = () => {
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
    generateWhatsAppUrl,
  } = useCart();

  const navigate = useNavigate();

  const handleWhatsAppOrder = () => {
    const url = generateWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (items.length === 0) {
    return (
      <div className="py-20 max-w-lg mx-auto px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-blush-100 flex items-center justify-center mx-auto text-3xl mb-4">
          🎀
        </div>
        <h1 className="font-serif text-3xl font-bold text-charcoal-900 mb-2">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-charcoal-600 mb-8 leading-relaxed">
          Looks like you haven't added any aesthetic iPhone cases yet!
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-charcoal-900 text-cream-100 font-bold text-sm shadow-md"
        >
          <span>Shop Collection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
            Shopping Bag ({items.length})
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
            Review your aesthetic selections and phone models before checking out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-blush-200/80 shadow-2xs flex flex-col sm:flex-row gap-5 items-start sm:items-center"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-28 object-cover rounded-2xl bg-cream-50 shrink-0"
                />

                <div className="flex-1 space-y-2 min-w-0 w-full sm:w-auto">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-charcoal-900">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-charcoal-500">{item.product.tagline}</p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-charcoal-400 hover:text-rose-500 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                    <div>
                      <label className="text-[11px] text-charcoal-500 block mb-0.5 font-medium">
                        Device Model:
                      </label>
                      <select
                        value={item.selectedModel}
                        onChange={(e) => updateModel(item.id, e.target.value)}
                        className="py-1 px-2.5 rounded-lg border border-blush-200 bg-cream-50 text-xs text-charcoal-900 font-semibold focus:outline-hidden focus:border-blush-400"
                      >
                        {IPHONE_MODELS.map((model) => (
                          <option key={model} value={model}>
                            {model}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] text-charcoal-500 block mb-0.5 font-medium">
                        Quantity:
                      </label>
                      <div className="flex items-center border border-blush-200 rounded-lg bg-cream-50 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 hover:bg-blush-100 text-charcoal-700 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-charcoal-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-blush-100 text-charcoal-700 font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="sm:ml-auto text-right">
                      <span className="text-[11px] text-charcoal-500 block">Item Total:</span>
                      <span className="text-base font-extrabold text-charcoal-900">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-4">
              <Link
                to="/shop"
                className="text-xs font-bold text-charcoal-800 hover:text-blush-500 underline underline-offset-4"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Summary Column */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-4xl p-6 sm:p-8 border border-blush-200 shadow-soft space-y-6 sticky top-28">
              <h2 className="font-serif text-xl font-bold text-charcoal-900 pb-3 border-b border-blush-100">
                Order Summary
              </h2>

              <div className="space-y-2 text-xs text-charcoal-700">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-charcoal-900">₹{subtotal}</span>
                </div>

                {bundleApplied && bundleSavings > 0 && (
                  <div className="flex justify-between text-blush-600 font-semibold bg-blush-50 p-2 rounded-lg">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> {BRAND_SETTINGS.bundleOffer.name}
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

                <div className="flex justify-between text-base font-bold text-charcoal-900 pt-3 border-t border-charcoal-100">
                  <span>Total Due</span>
                  <span className="font-serif text-xl">₹{total}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-4 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-cream-100 font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp</span>
                </button>
              </div>

              <div className="pt-2 text-[11px] text-charcoal-500 text-center space-y-1">
                <p className="flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Secure Checkout & Demo Flow</span>
                </p>
                <p>Fast dispatch from Kolkata, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
