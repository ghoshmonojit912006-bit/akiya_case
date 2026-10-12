import React from 'react';
import { Heart, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '../ui/InstagramIcon';
import { BRAND_SETTINGS } from '../../data/settings';

const INSTA_POSTS = [
  { id: 1, image: '/assets/instagram/insta-1.jpg', likes: '1.2k', title: 'Coquette Bow Crush' },
  { id: 2, image: '/assets/instagram/insta-2.jpg', likes: '2.4k', title: 'Hello Kitty Heart & Charm' },
  { id: 3, image: '/assets/instagram/insta-3.jpg', likes: '890', title: 'Denim Pastels Flora' },
  { id: 4, image: '/assets/instagram/insta-4.jpg', likes: '1.5k', title: 'Lavender Dreams & Butterflies' },
  { id: 5, image: '/assets/instagram/insta-5.jpg', likes: '1.1k', title: 'Lilac Rhinestone Ribbons' },
  { id: 6, image: '/assets/instagram/insta-6.jpg', likes: '3.1k', title: 'Pink Princess Aesthetic' },
];

export const InstagramInspo: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-charcoal-500">
            <InstagramIcon className="w-3.5 h-3.5 text-rose-500" />
            <span>Follow Our Moodboard</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
            Seen on Your Feed
          </h2>
          <p className="text-sm text-charcoal-600">
            Tag <strong className="text-charcoal-900">@{BRAND_SETTINGS.instagramHandle}</strong> to be featured on our weekly community drops.
          </p>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTA_POSTS.map((post) => (
            <a
              key={post.id}
              href={BRAND_SETTINGS.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative rounded-2xl overflow-hidden aspect-4/5 bg-cream-200 border border-blush-200 shadow-2xs hover:shadow-soft transition-all"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-white">
                <Heart className="w-5 h-5 fill-white text-white mb-1" />
                <span className="text-xs font-bold">{post.likes}</span>
                <span className="text-[10px] opacity-80 mt-1 text-center line-clamp-1">{post.title}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={BRAND_SETTINGS.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-blush-100 border border-blush-200 text-charcoal-900 text-xs sm:text-sm font-semibold transition-all shadow-2xs hover:shadow-sm"
          >
            <InstagramIcon className="w-4 h-4 text-rose-500" />
            <span>Follow @{BRAND_SETTINGS.instagramHandle} on Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-charcoal-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
