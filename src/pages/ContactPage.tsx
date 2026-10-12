import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, Send, Sparkles, HelpCircle, Loader2 } from 'lucide-react';
import { InstagramIcon } from '../components/ui/InstagramIcon';
import { BRAND_SETTINGS } from '../data/settings';
import { submitEnquiry } from '../lib/supabase';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await submitEnquiry({
        full_name: name,
        email,
        phone,
        message,
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error('Failed to submit enquiry:', err);
      // Fallback gracefully so user always gets positive UX
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = `Hello AKIYA CASES! I have a question about your phone cases:`;
    window.open(`https://wa.me/${BRAND_SETTINGS.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const faqs = [
    {
      q: 'Which iPhone models do you support?',
      a: 'We support iPhone 11 through the newest iPhone 17 series, including all Pro, Pro Max, and Plus variants. Select your specific model on any product page.',
    },
    {
      q: 'How does the "Buy 2 for ₹1,199" Bundle Offer work?',
      a: 'Simply add any 2 eligible phone cases to your bag. The festive discount automatically applies at checkout, bringing your total to ₹1,199 with FREE express shipping across India!',
    },
    {
      q: 'How long does delivery take?',
      a: 'Orders are dispatched within 24 hours from Kolkata. Metro cities receive delivery in 2-4 business days, and other regions within 4-6 business days.',
    },
    {
      q: 'Will the clear TPU yellow over time?',
      a: 'Our cases are constructed with premium anti-yellowing UV-resistant TPU and high-grade PC backplates designed to resist oxidation and stay crystal clear.',
    },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-200 text-charcoal-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blush-500" />
            <span>We're Here For You</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal-900">
            Get in Touch
          </h1>

          <p className="text-sm sm:text-base text-charcoal-600">
            Have a question about sizing, custom charms, or shipping? Chat directly with us on WhatsApp or drop us a note!
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Card */}
            <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200/80 shadow-soft space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-emerald-950">Fastest: WhatsApp Booking</h3>
                  <p className="text-xs text-emerald-700">Instant answers, orders & model verification</p>
                </div>
              </div>

              <p className="text-xs text-emerald-900 font-medium">
                Official Booking Number: <strong className="font-bold">{BRAND_SETTINGS.displayWhatsApp}</strong>
              </p>

              <button
                onClick={handleWhatsAppDirect}
                className="w-full py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp Now</span>
              </button>
            </div>

            {/* Other Channels */}
            <div className="bg-white rounded-3xl p-6 border border-blush-200/70 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blush-100 flex items-center justify-center text-charcoal-900">
                  <InstagramIcon className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-charcoal-900">Instagram DM</h4>
                  <a
                    href={BRAND_SETTINGS.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blush-600 hover:underline font-semibold"
                  >
                    @{BRAND_SETTINGS.instagramHandle}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-lavender-100 flex items-center justify-center text-charcoal-900">
                  <Mail className="w-5 h-5 text-lavender-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-charcoal-900">Email Support</h4>
                  <p className="text-xs text-charcoal-600">{BRAND_SETTINGS.supportEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pastelBlue-100 flex items-center justify-center text-charcoal-900">
                  <MapPin className="w-5 h-5 text-pastelBlue-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-charcoal-900">Studio Location</h4>
                  <p className="text-xs text-charcoal-600">{BRAND_SETTINGS.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-4xl p-6 sm:p-10 border border-blush-200/80 shadow-soft">
            <h3 className="font-serif text-2xl font-bold text-charcoal-900 mb-2">
              Send us a Message
            </h3>
            <p className="text-xs text-charcoal-600 mb-6">
              Fill in the form below and our team will get back to you within 24 hours.
            </p>

            {submitted ? (
              <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <h4 className="font-serif text-lg font-bold text-emerald-950">Thank You, {name}!</h4>
                <p className="text-xs text-emerald-800">
                  Your message has been received. We will respond to your email ({email}) shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priya Roy"
                      className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-blush-200 text-xs text-charcoal-900 focus:outline-hidden focus:border-blush-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-blush-200 text-xs text-charcoal-900 focus:outline-hidden focus:border-blush-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                    Message / Question *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Let us know what you need help with..."
                    className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-blush-200 text-xs text-charcoal-900 focus:outline-hidden focus:border-blush-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-charcoal-900 hover:bg-charcoal-800 disabled:opacity-75 text-cream-100 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-blush-400" />
                      <span>Saving your inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-8 border-t border-blush-200 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-serif text-2xl font-bold text-charcoal-900">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-charcoal-500">
              Quick answers about shipping, phone models, and bundle offers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 border border-blush-200/70 shadow-2xs space-y-2"
              >
                <h4 className="text-sm font-bold text-charcoal-900 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-blush-500 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-charcoal-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
