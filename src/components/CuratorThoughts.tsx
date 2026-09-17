import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CURATOR_THOUGHTS, BUSINESS_INFO } from '../data/products';
import { Quote, Sparkles, MessageCircle, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

export const CuratorThoughts: React.FC = () => {
  const [activeThoughtIndex, setActiveThoughtIndex] = useState(0);

  const currentThought = CURATOR_THOUGHTS[activeThoughtIndex];

  return (
    <section className="py-20 md:py-28 border-b border-neutral-800/60 bg-gradient-to-b from-neutral-950 via-neutral-900/40 to-neutral-950 relative overflow-hidden">
      
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curator&apos;s Thought & Philosophy</span>
          </motion.div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            &ldquo;We don&apos;t just import goods.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
              We bring world sensations to your door.
            </span>&rdquo;
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 mt-3 max-w-2xl mx-auto">
            A deeper look into the sourcing obsession of <strong className="text-white">{BUSINESS_INFO.owner}</strong> — why personal direct contact will always triumph over automated storefronts.
          </p>
        </div>

        {/* Interactive Thought Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Thought Selection Navigation */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 pl-1">
              Curator Perspectives
            </p>
            {CURATOR_THOUGHTS.map((thought, idx) => (
              <motion.button
                key={thought.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setActiveThoughtIndex(idx)}
                className={`w-full p-4 rounded-2xl text-left transition-all border flex items-center justify-between ${
                  activeThoughtIndex === idx
                    ? 'bg-neutral-900 border-amber-400/80 shadow-lg shadow-amber-400/10'
                    : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700 text-neutral-400'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider block mb-0.5 ${
                    activeThoughtIndex === idx ? 'text-amber-400' : 'text-neutral-400'
                  }`}>
                    {thought.tag}
                  </span>
                  <span className={`font-heading font-bold text-sm sm:text-base block truncate ${
                    activeThoughtIndex === idx ? 'text-white' : 'text-neutral-300'
                  }`}>
                    {thought.quote.slice(0, 52)}...
                  </span>
                </div>
                <ArrowRight className={`w-4 h-4 transition-transform shrink-0 ${
                  activeThoughtIndex === idx ? 'text-amber-400 translate-x-1' : 'text-neutral-600'
                }`} />
              </motion.button>
            ))}

            {/* Quality Statement Box */}
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 mt-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-neutral-300">
                <strong className="text-white block font-semibold">Strict Authenticity Guarantee</strong>
                Every item is imported sealed with original batch barcodes. We strictly curate premium consumables, viral beverages, gourmet chocolates &amp; artisanal perfumes.
              </div>
            </div>
          </div>

          {/* Right Column: Hero Quote Showcase Card with AnimatePresence */}
          <div className="lg:col-span-7">
            <div className="relative p-8 sm:p-10 md:p-12 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-2xl backdrop-blur-sm overflow-hidden">
              
              {/* Massive decorative quote mark */}
              <Quote className="absolute -bottom-6 -right-6 w-36 h-36 text-neutral-800/30 pointer-events-none rotate-12" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentThought.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="relative z-10"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold mb-6">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentThought.tag}</span>
                  </div>

                  <blockquote className="font-heading font-medium text-xl sm:text-2xl md:text-3xl text-neutral-100 leading-relaxed tracking-tight mb-8">
                    &ldquo;{currentThought.quote}&rdquo;
                  </blockquote>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-neutral-800">
                    <div>
                      <h4 className="font-heading font-bold text-base text-white">
                        {currentThought.author}
                      </h4>
                      <p className="text-xs text-amber-400/90 font-medium">
                        {currentThought.role}
                      </p>
                    </div>

                    <a
                      href={getGeneralWhatsAppUrl(`Hello Ishan, I read your thought on "${currentThought.tag}" on SELLERSTOP! Would love to check product availability.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-105 self-start sm:self-auto"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat with Ishan</span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
