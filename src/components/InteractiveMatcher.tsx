import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS_DATA } from '../data/products';
import { getProductWhatsAppUrl } from '../utils/whatsapp';
import { Sparkles, Zap, Flame, Heart, MessageCircle, ArrowRight, Check } from 'lucide-react';

interface InteractiveMatcherProps {
  onViewProduct: (product: Product) => void;
  onAddToInquiry: (product: Product, variant?: string) => void;
}

export const InteractiveMatcher: React.FC<InteractiveMatcherProps> = ({
  onViewProduct,
  onAddToInquiry,
}) => {
  const vibes = [
    {
      id: 'viral-sweet',
      label: 'Late-Night Sweet Crunch',
      icon: Sparkles,
      description: 'Gourmet roasted pistachios & crunchy butter kataifi pastry drenched in Belgian chocolate.',
      productId: 'dubai-kunafa-chocolate',
    },
    {
      id: 'luxury-scent',
      label: 'Opulent Sillage & Agarwood',
      icon: Flame,
      description: 'Deep royal Cambodian agarwood, saffron, and smoked amber with 14-hour longevity.',
      productId: 'belivita-oud-royal',
    },
    {
      id: 'high-energy',
      label: 'Hydration & Clean Caffeine',
      icon: Zap,
      description: 'Zero added sugar, 10% coconut water, and essential BCAAs in iconic tropical flavors.',
      productId: 'prime-hydration-drink',
    },
    {
      id: 'k-beauty',
      label: 'Glass Skin Radiance',
      icon: Heart,
      description: '96.3% Snail secretion filtrate for deep barrier repair, instant soothing, and hydrated glow.',
      productId: 'cosrx-snail-mucin-essence',
    },
  ];

  const [selectedVibeId, setSelectedVibeId] = useState('viral-sweet');

  const selectedVibe = vibes.find((v) => v.id === selectedVibeId) || vibes[0];
  const matchedProduct = PRODUCTS_DATA.find((p) => p.id === selectedVibe.productId);

  return (
    <section className="py-20 md:py-28 border-b border-neutral-800/60 bg-neutral-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Matcher</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            What&apos;s Your Current Obsession?
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Select your vibe below and discover the exact imported drop tailored to your mood.
          </p>
        </div>

        {/* Vibe Option Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-10 max-w-4xl mx-auto">
          {vibes.map((vibe) => {
            const Icon = vibe.icon;
            const isSelected = vibe.id === selectedVibeId;
            return (
              <motion.button
                key={vibe.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedVibeId(vibe.id)}
                className={`p-4 rounded-2xl text-center border transition-all flex flex-col items-center justify-center gap-2.5 ${
                  isSelected
                    ? 'bg-amber-400 text-neutral-950 border-amber-400 shadow-lg shadow-amber-400/20 font-bold'
                    : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-neutral-950 text-amber-400' : 'bg-neutral-800 text-amber-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm leading-snug">
                  {vibe.label}
                </span>
                {isSelected && (
                  <span className="text-[10px] uppercase tracking-wider bg-neutral-950/20 px-2 py-0.5 rounded-full font-extrabold">
                    Matched
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Matched Product Animated Showcase Card */}
        {matchedProduct && (
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={matchedProduct.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl flex flex-col md:flex-row items-center gap-6 sm:gap-8"
              >
                {/* Product Image */}
                <div className="w-full md:w-64 aspect-square rounded-2xl overflow-hidden shrink-0 border border-neutral-800 relative group">
                  <img
                    src={matchedProduct.image}
                    alt={matchedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-neutral-950">
                    {matchedProduct.categoryLabel}
                  </span>
                </div>

                {/* Info and Actions */}
                <div className="flex-1 text-left space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      {matchedProduct.brand}
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl text-white mt-1">
                      {matchedProduct.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {matchedProduct.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {matchedProduct.badges?.map((badge, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-300 font-medium"
                      >
                        <Check className="w-3 h-3 text-emerald-400" />
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={getProductWhatsAppUrl(matchedProduct)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Order on WhatsApp</span>
                    </a>

                    <button
                      onClick={() => onViewProduct(matchedProduct)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Full Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
};
