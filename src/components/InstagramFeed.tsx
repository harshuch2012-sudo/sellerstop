import React from 'react';
import { BUSINESS_INFO } from '../data/products';
import { Instagram, ArrowUpRight, Heart, MessageCircle } from 'lucide-react';

export const InstagramFeed: React.FC = () => {
  const posts = [
    {
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop&q=80',
      caption: 'Belivita Oud Royal flacons in stock. Pure luxury in every spray. ✨',
      likes: '1.4k',
      tag: '#BelivitaPerfumes',
    },
    {
      image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=600&auto=format&fit=crop&q=80',
      caption: 'Fresh Prime Hydration crate drop! Meta Moon & Ice Pop available.',
      likes: '2.8k',
      tag: '#PrimeHydration',
    },
    {
      image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80',
      caption: 'Viral Dubai Kunafa Pistachio Bar crunch test! Fresh batch ready.',
      likes: '5.1k',
      tag: '#DubaiChocolate',
    },
    {
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
      caption: 'Korean skincare Holy Grail: COSRX Snail Mucin for glass skin.',
      likes: '980',
      tag: '#KBeautyIndia',
    },
  ];

  return (
    <section className="py-16 md:py-20 border-b border-neutral-800/60 bg-neutral-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-pink-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Instagram className="w-4 h-4" />
              <span>Join The Community</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Follow Us on Instagram
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Sneak peeks of incoming international drops, restock alerts, and daily customer stories.
            </p>
          </div>

          <a
            id="instagram-follow-btn"
            href={BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition-opacity"
          >
            <span>Follow {BUSINESS_INFO.instagramHandle}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Instagram Grid Showcase */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
              />

              <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between backdrop-blur-xs">
                <span className="text-[10px] font-bold text-amber-400">
                  {post.tag}
                </span>

                <div>
                  <p className="text-xs text-white line-clamp-2 mb-2 font-medium">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-neutral-300">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-neutral-300" />
                      Comment
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
