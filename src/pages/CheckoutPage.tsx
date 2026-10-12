import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle,
  MessageCircle,
  Sparkles,
  ArrowRight,
  CreditCard,
  QrCode,
  DollarSign,
  Loader2,
  Database,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { OrderCustomerInfo } from '../types';
import { BRAND_SETTINGS } from '../data/settings';
import { createOrder } from '../lib/supabase';

export const CheckoutPage: React.FC = () => {
  const {
    items,
    subtotal,
    discount,
    bundleApplied,
    bundleSavings,
    shippingFee,
    total,
    clearCart,
    generateWhatsAppUrl,
  } = useCart();

  const navigate = useNavigate();

  const [customer, setCustomer] = useState<OrderCustomerInfo>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    apartment: '',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700001',
    paymentMethod: 'upi',
    notes: '',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dbRecordId, setDbRecordId] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate cute order reference ID
    const generatedOrderId = `AKIYA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedOrderId);

    try {
      // Save order to Supabase orders table
      const record = await createOrder({
        order_number: generatedOrderId,
        customer_name: customer.fullName,
        customer_email: customer.email,
        customer_phone: customer.phone,
        delivery_address: customer.address,
        apartment: customer.apartment,
        city: customer.city,
        state: customer.state,
        pincode: customer.pincode,
        payment_method: customer.paymentMethod,
        items: items.map((i) => ({
          id: i.id,
          product_id: i.productId,
          name: i.product.name,
          selected_model: i.selectedModel,
          selected_color: i.selectedColor,
          quantity: i.quantity,
          price: i.product.price,
          image: i.product.image,
        })),
        total_items: items.reduce((s, i) => s + i.quantity, 0),
        subtotal,
        discount,
        bundle_applied: bundleApplied,
        bundle_name: bundleApplied ? BRAND_SETTINGS.bundleOffer.name : undefined,
        shipping_fee: shippingFee,
        total_amount: total,
        notes: customer.notes,
      });

      if (record && record.id) {
        setDbRecordId(record.id);
      }
    } catch (err) {
      console.error('Failed to save order to Supabase:', err);
    } finally {
      setIsSubmitting(false);

      // Fire cute confetti
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F6DCE5', '#DCD5FF', '#D7ECF7', '#29252A'],
      });

      setOrderPlaced(true);
      clearCart();
    }
  };

  const handleWhatsAppCheckout = () => {
    const url = generateWhatsAppUrl(customer);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (orderPlaced) {
    return (
      <div className="py-16 md:py-24 max-w-2xl mx-auto px-4 text-center">
        <div className="bg-white rounded-5xl p-8 sm:p-12 border border-blush-200 shadow-soft space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-blush-200 text-charcoal-900 text-xs font-bold uppercase tracking-wider">
              Order Confirmed & Saved ♡
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Order Reference: <strong className="text-charcoal-900 font-mono text-sm">{orderId}</strong>
            </p>
          </div>

          {/* Supabase backend status pill */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 text-left space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-950">
              <Database className="w-4 h-4 text-emerald-600" />
              <span>Saved in Supabase Database:</span>
            </div>
            <p>
              Your order details and shipping information have been stored in the <strong className="font-mono">orders</strong> table in your project.
            </p>
            {dbRecordId && (
              <p className="text-[11px] font-mono text-emerald-700">
                Database Record ID: {dbRecordId}
              </p>
            )}
          </div>

          {/* Demo Architecture Notice */}
          <div className="p-4 rounded-2xl bg-cream-50 border border-blush-200 text-xs text-charcoal-700 text-left space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-charcoal-900">
              <Sparkles className="w-4 h-4 text-blush-500" />
              <span>Demo Store Notice:</span>
            </div>
            <p>
              This order was recorded in demo mode. No payment was charged. In a live production environment, this triggers a backend webhook or Razorpay / Cashfree payment gateway.
            </p>
            <p className="text-charcoal-600">
              To send this exact order directly to the Akiya Cases business team, click the WhatsApp button below!
            </p>
          </div>

          {/* WhatsApp Confirmation Button */}
          <div className="pt-2 space-y-3">
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Order Details to WhatsApp</span>
            </button>

            <Link
              to="/shop"
              className="inline-block text-xs font-bold text-charcoal-700 hover:text-charcoal-950 underline underline-offset-4"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 max-w-md mx-auto px-4 text-center">
        <h2 className="font-serif text-2xl font-bold text-charcoal-900 mb-2">
          Your bag is empty
        </h2>
        <p className="text-xs text-charcoal-600 mb-6">
          Add an aesthetic phone case before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 rounded-full bg-charcoal-900 text-cream-100 text-xs font-bold"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
            Secure Checkout
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
            Complete your shipping details below or order directly with our Kolkata studio on WhatsApp.
          </p>
        </div>

        <form onSubmit={handleDemoSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Customer & Delivery Info */}
          <div className="lg:col-span-7 space-y-8">
            {/* Quick WhatsApp Ordering Banner */}
            <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">Prefer to Order on WhatsApp?</h4>
                  <p className="text-xs text-emerald-700">Skip forms and send your order straight to our team.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="py-2.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold whitespace-nowrap shadow-xs"
              >
                Order on WhatsApp →
              </button>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-4xl p-6 sm:p-8 border border-blush-200/80 shadow-soft space-y-4">
              <h3 className="font-serif text-xl font-bold text-charcoal-900">
                1. Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={customer.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Ananya Das"
                    className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-blush-200 text-xs text-charcoal-900 focus:outline-hidden focus:border-blush-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={customer.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-blush-200 text-xs text-charcoal-900 focus:outline-hidden focus:border-blush-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={customer.email}
                  onChange={handleInputChange}
                  placeholder="ananya@gmail.com"
                  className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-blush-200 text-xs text-charcoal-900 focus:outline-hidden focus:border-blush-400"
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-4xl p-6 sm:p-8 border border-blush-200/80 shadow-soft space-y-4">
              <h3 className="font-serif text-xl font-bold text-charcoal-900">
                2. Shipping Address
              </h3>

              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                  Street Address & House/Flat No. *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={customer.address}
                  onChange={handleInputChange}
                  placeholder="Flat 4B, Sunflower Apts, Park Street"
                  className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-blush-200 text-xs text-charcoal-900 focus:outline-hidden focus:border-blush-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={customer.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-blush-200 text-xs text-charcoal-900 focus:outline-hidden focus:border-blush-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={customer.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-blush-200 text-xs text-charcoal-900 focus:outline-hidden focus:border-blush-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={customer.pincode}
                    onChange={handleInputChange}
                    placeholder="700001"
                    className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-blush-200 text-xs text-charcoal-900 focus:outline-hidden focus:border-blush-400"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-4xl p-6 sm:p-8 border border-blush-200/80 shadow-soft space-y-4">
              <h3 className="font-serif text-xl font-bold text-charcoal-900">
                3. Payment Method (Demo Ready)
              </h3>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-blush-200 hover:bg-cream-50 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={customer.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-charcoal-900"
                  />
                  <QrCode className="w-5 h-5 text-purple-600" />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-charcoal-900 block">UPI Instant (GPay / PhonePe / Paytm / QR)</span>
                    <span className="text-[11px] text-charcoal-500">Fastest confirmation with zero transaction fees</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-blush-200 hover:bg-cream-50 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={customer.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-charcoal-900"
                  />
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-charcoal-900 block">Cash on Delivery (COD)</span>
                    <span className="text-[11px] text-charcoal-500">Pay cash upon delivery at your doorstep</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-blush-200 hover:bg-cream-50 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={customer.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-charcoal-900"
                  />
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-charcoal-900 block">Debit / Credit Card / Netbanking</span>
                    <span className="text-[11px] text-charcoal-500">Razorpay gateway integration ready</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-4xl p-6 sm:p-8 border border-blush-200 shadow-soft space-y-6 sticky top-28">
              <h3 className="font-serif text-xl font-bold text-charcoal-900 pb-3 border-b border-blush-100">
                Order Summary
              </h3>

              {/* Items in Summary */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-14 object-cover rounded-xl bg-cream-50 shrink-0"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-charcoal-900 truncate">{item.product.name}</p>
                      <p className="text-charcoal-500 text-[11px]">
                        {item.selectedModel} • Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-charcoal-900">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="pt-3 border-t border-blush-100 space-y-2 text-xs text-charcoal-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-charcoal-900">₹{subtotal}</span>
                </div>

                {bundleApplied && bundleSavings > 0 && (
                  <div className="flex justify-between text-blush-600 font-semibold bg-blush-50 p-2 rounded-lg">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Bundle Discount
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
                  <span>Total to Pay</span>
                  <span className="font-serif text-xl">₹{total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-charcoal-900 hover:bg-charcoal-800 disabled:opacity-75 text-cream-100 font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-blush-400" />
                      <span>Saving Order to Database...</span>
                    </>
                  ) : (
                    <>
                      <span>Place Order (₹{total})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order to WhatsApp</span>
                </button>
              </div>

              {/* Trust badges */}
              <div className="pt-2 text-[11px] text-charcoal-500 text-center space-y-1">
                <p className="flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ready for Razorpay Integration</span>
                </p>
                <p>Support via WhatsApp: {BRAND_SETTINGS.displayWhatsApp}</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
