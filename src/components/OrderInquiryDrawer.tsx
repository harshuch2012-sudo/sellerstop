import React, { useState } from 'react';
import { InquiryItem } from '../types';
import { BUSINESS_INFO } from '../data/products';
import { getInquiryListWhatsAppUrl, getCallUrl } from '../utils/whatsapp';
import { X, Trash2, MessageCircle, Phone, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';

interface OrderInquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: InquiryItem[];
  onUpdateQuantity: (productId: string, quantity: number, variant?: string) => void;
  onRemoveItem: (productId: string, variant?: string) => void;
  onClearInquiry: () => void;
  onContinueShopping: () => void;
}

export const OrderInquiryDrawer: React.FC<OrderInquiryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearInquiry,
  onContinueShopping,
}) => {
  const [customerNote, setCustomerNote] = useState<string>('');

  if (!isOpen) return null;

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const whatsappUrl = getInquiryListWhatsAppUrl(items, customerNote);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark overlay backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          id="order-inquiry-drawer-panel"
          className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col justify-between"
        >
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white">Order Inquiry</h3>
                <p className="text-xs text-neutral-400">
                  {totalItemsCount} item{totalItemsCount === 1 ? '' : 's'} selected for WhatsApp inquiry
                </p>
              </div>
            </div>

            <button
              id="inquiry-drawer-close-btn"
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Items Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-neutral-800/80 flex items-center justify-center text-neutral-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-heading font-bold text-base text-white mb-1">Your Inquiry Bag is Empty</h4>
                <p className="text-xs text-neutral-400 max-w-xs mb-6">
                  Browse our imported snacks, Belivita perfumes, energy drinks, and viral products to add to your order.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onContinueShopping();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-amber-400/20"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800/60 text-xs">
                  <span className="text-neutral-400">Selected Products</span>
                  <button
                    onClick={onClearInquiry}
                    className="text-neutral-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                </div>

                {items.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedVariant || 'default'}-${idx}`}
                    className="p-3.5 rounded-2xl bg-neutral-950/70 border border-neutral-800 flex gap-3.5 items-center justify-between"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 object-cover rounded-xl shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400 truncate">
                        {item.product.brand}
                      </p>
                      <h4 className="text-xs font-semibold text-white truncate">
                        {item.product.name}
                      </h4>
                      {item.selectedVariant && (
                        <p className="text-[11px] text-neutral-400 truncate">
                          Option: <span className="text-neutral-300">{item.selectedVariant}</span>
                        </p>
                      )}
                      <p className="text-[10px] font-medium text-emerald-400 mt-0.5">
                        Price on WhatsApp Inquiry
                      </p>
                    </div>

                    {/* Quantity Controls & Delete */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedVariant)}
                        className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
                        title="Remove product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center border border-neutral-750 bg-neutral-900 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1), item.selectedVariant)
                          }
                          className="px-1.5 py-0.5 text-neutral-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedVariant)
                          }
                          className="px-1.5 py-0.5 text-neutral-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Optional Customer Note / Delivery City */}
                <div className="pt-2">
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                    Delivery City or Special Request (Optional):
                  </label>
                  <textarea
                    rows={2}
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder="e.g. Delivery to Delhi NCR, need by Friday..."
                    className="w-full text-xs p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer Actions */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-neutral-800 bg-neutral-950/60 space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-1">
                <span>Direct Pricing & Dispatch:</span>
                <span className="font-bold text-amber-400">Via WhatsApp Quote</span>
              </div>

              {/* Send Inquiry on WhatsApp */}
              <a
                id="drawer-send-whatsapp-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Inquiry on WhatsApp</span>
              </a>

              {/* Call Support */}
              <a
                id="drawer-call-btn"
                href={getCallUrl()}
                className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call {BUSINESS_INFO.owner} ({BUSINESS_INFO.phone})</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
