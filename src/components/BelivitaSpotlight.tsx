import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, Crown, Shield, ArrowRight } from 'lucide-react';

interface BelivitaSpotlightProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onAddToInquiry: (product: Product) => void;
  inquiryItemIds: string[];
  onViewAllBelivita: () => void;
}

export const BelivitaSpotlight: React.FC<BelivitaSpotlightProps> = ({
  products,
  onViewProduct,
  onAddToInquiry,
  inquiryItemIds,
  onViewAllBelivita,
}) => {
  const belivitaProducts = products.filter((p) => p.isBelivita || p.category === 'belivita');

  return (
    <section className="py-16 md:py-24 border-b border-neutral-800/60 bg-gradient-to-b from-neutral-950 via-neutral-900/40 to-neutral-950 relative overflow-hidden">
      {/* Subtle gold glow accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Crown className="w-3.5 h-3.5" />
              <span>Artisanal Luxury Fragrance</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Belivita Perfumes Collection
            </h2>

            <p className="text-sm sm:text-base text-neutral-400 mt-2.5 leading-relaxed">
              Crafted with high-concentration extrait oils, magnetic sillage, and all-day projection suited for the tropical climate. Exclusively distributed via SELLERSTOP.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400 pr-2 border-r border-neutral-800">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Pure Oil Extrait Formulations</span>
            </div>

            <button
              onClick={onViewAllBelivita}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-400/40 text-neutral-200 hover:text-white text-xs font-semibold transition-all hover:scale-[1.02]"
            >
              <span>View All Fragrances</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Belivita Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {belivitaProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewProduct={onViewProduct}
              onAddToInquiry={onAddToInquiry}
              isInInquiry={inquiryItemIds.includes(product.id)}
            />
          ))}
        </div>

        {/* Belivita Luxury Banner Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-850 to-neutral-900 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg text-white">
                Looking for a Custom Fragrance Recommendation?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                Chat directly with founder Ishan Aggarwal on WhatsApp to find your signature scent.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/919953549760?text=Hello%20SELLERSTOP,%20I%20want%20fragrance%20recommendations%20for%20Belivita%20Perfumes!"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-400/20"
          >
            Ask on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
