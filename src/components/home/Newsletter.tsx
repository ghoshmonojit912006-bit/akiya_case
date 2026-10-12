import React, { useState } from 'react';
import { Mail, Check, Sparkles, Heart, Loader2 } from 'lucide-react';
import { subscribeNewsletter } from '../../lib/supabase';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    try {
      await subscribeNewsletter(email);
      setSubscribed(true);
    } catch (err) {
      console.error('Failed to subscribe to newsletter:', err);
      setSubscribed(true); // Fallback gracefully
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-cream-50 relative overflow-hidden border-t border-blush-200/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-4xl p-8 sm:p-12 border border-blush-200/80 shadow-soft relative overflow-hidden">
          {/* Subtle background icons */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-blush-100 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-lavender-100 rounded-full blur-xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-100 text-charcoal-900 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blush-500" />
            <span>VIP Drop Access</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 mb-3">
            A Little More Cute in Your Inbox
          </h2>

          <p className="text-sm sm:text-base text-charcoal-600 max-w-md mx-auto mb-8">
            Be the first to preview secret new drops, member-only discounts, and phone wallpaper gifts.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm max-w-md mx-auto flex items-center justify-center gap-2">
              <Check className="w-5 h-5 text-emerald-600" />
              <span>You're in! Welcome to the AKIYA CASES inner circle ♡</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative w-full">
                  <Mail className="w-4 h-4 text-charcoal-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-full border border-blush-200 bg-cream-50 text-charcoal-900 text-sm focus:outline-hidden focus:border-blush-400 focus:ring-2 focus:ring-blush-200/50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-charcoal-900 hover:bg-charcoal-800 disabled:opacity-75 text-cream-100 font-semibold text-sm transition-all whitespace-nowrap shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-blush-400" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-charcoal-400 mt-3 flex items-center justify-center gap-1">
                <span>No spam, only aesthetic love</span>
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
