import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '../ui/InstagramIcon';
import { BRAND_SETTINGS } from '../../data/settings';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-900 text-cream-100 pt-16 pb-10 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-charcoal-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block group">
              <div className="flex items-center gap-2">
                <span className="font-serif text-3xl font-bold tracking-widest text-cream-100 group-hover:text-blush-200 transition-colors">
                  AKIYA
                </span>
                <span className="text-xs uppercase tracking-widest px-2 py-0.5 rounded-full bg-blush-200 text-charcoal-900 font-bold">
                  CASES
                </span>
              </div>
            </Link>

            <p className="text-charcoal-300 text-sm leading-relaxed max-w-sm">
              Discover aesthetic, cute, and Pinterest-inspired iPhone cases made to match your mood, your style, and your everyday mirror selfies. Designed with love in Kolkata.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={BRAND_SETTINGS.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal-800 hover:bg-blush-200 hover:text-charcoal-900 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${BRAND_SETTINGS.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal-800 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            <div className="pt-2 text-xs text-charcoal-400 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blush-300" />
                <span>Shipping from {BRAND_SETTINGS.city}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blush-300" />
                <span>{BRAND_SETTINGS.supportEmail}</span>
              </p>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-blush-200">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-sm text-charcoal-300">
              <li>
                <Link to="/shop" className="hover:text-cream-100 transition-colors">
                  All iPhone Cases
                </Link>
              </li>
              <li>
                <Link to="/collections?aesthetic=Bows" className="hover:text-cream-100 transition-colors">
                  Coquette Bows
                </Link>
              </li>
              <li>
                <Link to="/collections?aesthetic=Floral" className="hover:text-cream-100 transition-colors">
                  Floral Dreams
                </Link>
              </li>
              <li>
                <Link to="/collections?aesthetic=Cute Characters" className="hover:text-cream-100 transition-colors">
                  Hello Kitty & Charms
                </Link>
              </li>
              <li>
                <Link to="/collections?aesthetic=Clear Cases" className="hover:text-cream-100 transition-colors">
                  Clear & Pastels
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-blush-200">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm text-charcoal-300">
              <li>
                <Link to="/contact" className="hover:text-cream-100 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${BRAND_SETTINGS.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cream-100 transition-colors flex items-center gap-1"
                >
                  WhatsApp Booking <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-cream-100 transition-colors">
                  About AKIYA CASES
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-cream-100 transition-colors">
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand Policies */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-blush-200">
              Brand Policies
            </h4>
            <ul className="space-y-2 text-sm text-charcoal-300">
              <li>
                <span className="hover:text-cream-100 transition-colors cursor-pointer" title="Editable shipping policy placeholder">
                  Shipping & Delivery Policy
                </span>
              </li>
              <li>
                <span className="hover:text-cream-100 transition-colors cursor-pointer" title="Editable return policy placeholder">
                  Returns & Replacement
                </span>
              </li>
              <li>
                <span className="hover:text-cream-100 transition-colors cursor-pointer" title="Editable privacy policy placeholder">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-cream-100 transition-colors cursor-pointer" title="Editable terms placeholder">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-400 gap-4">
          <p>© {new Date().getFullYear()} {BRAND_SETTINGS.brandName}. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-charcoal-300">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-blush-400 fill-blush-400" />
            <span>for pookie girls & cute aesthetic lovers</span>
          </div>
          <p className="text-[11px] text-charcoal-500">
            Official Booking No: {BRAND_SETTINGS.displayWhatsApp}
          </p>
        </div>
      </div>
    </footer>
  );
};
