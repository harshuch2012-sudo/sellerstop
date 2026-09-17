import React, { useState } from 'react';
import { Product } from '../types';
import { BUSINESS_INFO } from '../data/products';
import { getProductWhatsAppUrl, getCallUrl } from '../utils/whatsapp';
import { X, MessageCircle, Phone, Check, ShieldCheck, Sparkles, Plus, Minus, Share2, ArrowRight } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToInquiry: (product: Product, variant?: string, quantity?: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToInquiry,
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants ? product.variants.options[0] : ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const whatsappUrl = getProductWhatsAppUrl(product, selectedVariant || undefined, quantity);

  const handleAddInquiry = () => {
    onAddToInquiry(product, selectedVariant || undefined, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} on SELLERSTOP`,
        text: `Check out ${product.name} by ${product.brand} on SELLERSTOP India!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Dark overlay backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Window */}
      <div 
        id="product-detail-modal-box"
        className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Close Button */}
        <button
          id="modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Product Images */}
          <div className="md:col-span-6 bg-neutral-950 p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-neutral-800">
            <div className="w-full flex flex-col items-center">
              
              {/* Primary Image View */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/80 shadow-inner">
                <img
                  src={images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />

                {/* Badge overlay */}
                {product.badges && product.badges.length > 0 && (
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {product.badges.map((b, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-amber-400 text-neutral-950 shadow-md"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Gallery Thumbnails (if multiple) */}
              {images.length > 1 && (
                <div className="flex gap-2.5 mt-4 w-full justify-center">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-amber-400 scale-105'
                          : 'border-neutral-800 hover:border-neutral-700 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Micro reassurance under image */}
            <div className="mt-6 w-full pt-4 border-t border-neutral-850 flex items-center justify-between text-xs text-neutral-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Sourced & Dispatched by {BUSINESS_INFO.owner}
              </span>
              <button
                onClick={handleShare}
                className="text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Product Information & Ordering CTAs */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Brand Header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {product.brand}
                </span>
                <span className="text-neutral-600">•</span>
                <span className="text-xs text-neutral-400">
                  {product.categoryLabel}
                </span>
              </div>

              {/* Product Name */}
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                {product.name}
              </h2>

              {/* Price: STRICTLY CONTACT FOR PRICE */}
              <div className="mt-3.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/25 text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-medium text-neutral-300">Pricing:</span>
                <span className="text-sm font-bold text-amber-400">Contact for Price</span>
              </div>

              {/* Description */}
              <div className="mt-5 space-y-2">
                <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400">Description</h4>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Specific Highlights / Specs */}
              {product.details && (
                <div className="mt-5 p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800 text-xs space-y-2">
                  {product.details.origin && (
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Origin:</span>
                      <span className="text-neutral-200 font-medium">{product.details.origin}</span>
                    </div>
                  )}
                  {product.details.size && (
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Net Volume / Weight:</span>
                      <span className="text-neutral-200 font-medium">{product.details.size}</span>
                    </div>
                  )}
                  {product.details.flavorNotes && (
                    <div className="flex flex-col gap-0.5 pt-1 border-t border-neutral-800/80">
                      <span className="text-neutral-400">Profile / Notes:</span>
                      <span className="text-amber-300/90 font-medium leading-relaxed">{product.details.flavorNotes}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Available Variants Selector */}
              {product.variants && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs uppercase font-bold tracking-wider text-neutral-300">
                      Select {product.variants.name}
                    </label>
                    <span className="text-xs text-amber-400 font-medium">
                      Selected: {selectedVariant}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedVariant(option)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                          selectedVariant === option
                            ? 'bg-amber-400 text-neutral-950 border-amber-400 shadow-md shadow-amber-400/20'
                            : 'bg-neutral-800/80 text-neutral-300 border-neutral-700 hover:border-neutral-600 hover:text-white'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs uppercase font-bold tracking-wider text-neutral-300">Quantity</span>
                <div className="flex items-center border border-neutral-750 bg-neutral-950 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-2 text-neutral-400 hover:text-white disabled:opacity-30 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-neutral-400 hover:text-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Ordering Action Buttons (Strictly WhatsApp & Call) */}
            <div className="mt-8 pt-6 border-t border-neutral-800 space-y-2.5">
              
              {/* Order on WhatsApp Button */}
              <a
                id="modal-order-whatsapp-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Order on WhatsApp</span>
              </a>

              {/* Call to Order Button & Add to Inquiry Bag Button */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  id="modal-call-to-order-btn"
                  href={getCallUrl()}
                  className="py-3 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-neutral-200 hover:text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call to Order</span>
                </a>

                <button
                  id="modal-add-inquiry-btn"
                  onClick={handleAddInquiry}
                  className="py-3 px-3 rounded-xl bg-neutral-800/80 hover:bg-neutral-750 border border-neutral-700 text-neutral-200 hover:text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Added!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-amber-400" />
                      <span>Add to Inquiry</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-[11px] text-neutral-400">
                  Instant stock verification & dispatch guidance by Ishan Aggarwal
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
