import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

export const FloatingWhatsAppWidget: React.FC = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Speech bubble popup */}
      <AnimatePresence>
        {isTooltipOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-3 max-w-[260px] p-3.5 rounded-2xl bg-neutral-900 border border-neutral-700 shadow-2xl backdrop-blur-md relative text-left"
          >
            <button
              onClick={() => setIsTooltipOpen(false)}
              className="absolute top-2 right-2 text-neutral-400 hover:text-white p-1"
              aria-label="Close message"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3" />
              <span>Instant Concierge</span>
            </div>
            <p className="text-xs text-neutral-200 font-medium leading-snug">
              Looking for a trending product or custom price quote?
            </p>
            <p className="text-[11px] text-emerald-400 font-semibold mt-1">
              Chat with Ishan Aggarwal on WhatsApp →
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.a
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        href={getGeneralWhatsAppUrl("Hello Ishan! I'm browsing SELLERSTOP and would like to check stock.")}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 flex items-center justify-center shadow-2xl shadow-emerald-500/40 relative group"
        aria-label="Order on WhatsApp"
      >
        {/* Pulsing rings */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 text-neutral-950 group-hover:scale-110 transition-transform" />
      </motion.a>

    </div>
  );
};
