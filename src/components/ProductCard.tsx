import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { getProductWhatsAppUrl } from '../utils/whatsapp';
import { MessageCircle, Eye, Plus, Check, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewProduct: (product: Product) => void;
  onAddToInquiry?: (product: Product) => void;
  isInInquiry?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewProduct,
  onAddToInquiry,
  isInInquiry = false,
}) => {
  const whatsappUrl = getProductWhatsAppUrl(
    product,
    product.variants ? product.variants.options[0] : undefined,
    1
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 hover:border-amber-400/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-neutral-950/80"
    >
      {/* Product Image Container */}
      <div 
        onClick={() => onViewProduct(product)}
        className="relative aspect-square w-full overflow-hidden bg-neutral-950 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 brightness-95 group-hover:brightness-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.badges && product.badges.map((badge, idx) => (
            <span
              key={idx}
              className={`px-2.5 py-0.5 text-[10px] uppercase font-extrabold tracking-wider rounded-md backdrop-blur-md ${
                idx === 0 
                  ? 'bg-amber-400 text-neutral-950 font-black shadow-md' 
                  : 'bg-neutral-900/90 text-neutral-200 border border-neutral-700/60'
              }`}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Quick View Hover overlay */}
        <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3.5 py-1.5 rounded-xl bg-neutral-900/90 backdrop-blur-md text-amber-400 text-xs font-bold flex items-center gap-1.5 border border-amber-400/40 shadow-xl">
            <Eye className="w-3.5 h-3.5" />
            View Details
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 truncate">
              {product.brand}
            </span>
            <span className="text-[10px] text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded-full shrink-0">
              {product.categoryLabel}
            </span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onViewProduct(product)}
            className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Available Variants indicator */}
          {product.variants && (
            <div className="mt-3 flex items-center gap-1 text-[11px] text-neutral-400">
              <span className="text-neutral-500">{product.variants.name}:</span>
              <span className="font-medium text-neutral-300 truncate">
                {product.variants.options.slice(0, 2).join(', ')}
                {product.variants.options.length > 2 ? ` +${product.variants.options.length - 2} more` : ''}
              </span>
            </div>
          )}
        </div>

        {/* Call to Action Buttons (Strictly NO PRICES) */}
        <div className="mt-4 pt-3.5 border-t border-neutral-800/80 flex flex-col gap-2">
          
          <div className="flex items-center gap-2">
            {/* Order on WhatsApp */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              id={`card-order-whatsapp-${product.id}`}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/10"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>Order on WhatsApp</span>
            </motion.a>

            {/* Add to Inquiry Bag Button */}
            {onAddToInquiry && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                id={`card-inquire-btn-${product.id}`}
                onClick={() => onAddToInquiry(product)}
                className={`p-2.5 rounded-xl border transition-all text-xs font-semibold shrink-0 ${
                  isInInquiry
                    ? 'bg-amber-400/20 border-amber-400 text-amber-400'
                    : 'bg-neutral-800 hover:bg-neutral-750 border-neutral-700 text-neutral-300 hover:text-white'
                }`}
                title={isInInquiry ? 'Added to Inquiry Bag' : 'Add to Inquiry Bag'}
              >
                {isInInquiry ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </motion.button>
            )}
          </div>

          {/* View Product Button */}
          <button
            id={`card-view-product-${product.id}`}
            onClick={() => onViewProduct(product)}
            className="w-full py-2 px-3 rounded-xl bg-neutral-800/70 hover:bg-neutral-800 border border-neutral-750 hover:border-neutral-700 text-neutral-300 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Product</span>
          </button>
        </div>

      </div>
    </motion.div>
  );
};
