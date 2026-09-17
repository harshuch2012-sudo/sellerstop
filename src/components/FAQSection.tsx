import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

export const FAQSection: React.FC = () => {
  const faqs = [
    {
      q: 'Why are prices not displayed directly on the website?',
      a: 'Because all products are authentic overseas imports (USA, UAE, Japan, Korea), stock availability and import duties fluctuate weekly. Handling pricing on WhatsApp allows founder Ishan Aggarwal to offer real-time, transparent rates without markup or inflated middleman fees.',
    },
    {
      q: 'How does the ordering process work on WhatsApp?',
      a: 'Simply tap "Order on WhatsApp" on any product, or add items to your Inquiry Bag and hit send. A pre-formatted message opens directly with Ishan Aggarwal (+91 9953549760). Ishan sends you live photos of the batch, confirms the final quote, accepts UPI/Bank transfer, and dispatches via express air courier with a tracking link.',
    },
    {
      q: 'Will Dubai Kunafa Pistachio chocolate melt during transit?',
      a: 'No! All temperature-sensitive perishables like Dubai Kunafa chocolate and snacks are dispatched in heavy multi-layer thermal insulation foil packed with frozen non-toxic ice gel packs, ensuring solid texture upon delivery anywhere in India.',
    },
    {
      q: 'Are Belivita perfumes 100% authentic Extrait de Parfum?',
      a: 'Yes, Belivita perfumes are master-crafted with 35% pure perfume oil concentration (Extrait grade). Each bottle features a heavy glass flacon, magnetic cap, and batch-stamped packaging with 12 to 16+ hours of skin longevity.',
    },
    {
      q: 'Which exotic Monster Energy flavours and energy drinks do you import?',
      a: 'We import authentic international batches including Monster Energy Mango Loco (Mexican Day of the Dead art can), Monster Pipeline Punch (Hawaiian passionfruit & guava), Ultra White Zero Sugar, and the original legendary Thailand Red Bull Krating Daeng Gold cans.',
    },
    {
      q: 'What is the delivery timeline across India?',
      a: 'Metro cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata) generally arrive in 24 to 48 hours. Other tier-2 cities across India take 2 to 4 business days via Bluedart Air or Delhivery Express.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 border-b border-neutral-800/60 bg-neutral-900/40 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Everything you need to know about placing an order, quality verification, and express shipping.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-neutral-900/90 border border-neutral-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors hover:bg-neutral-850"
                >
                  <span className="font-heading font-bold text-sm sm:text-base text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 transition-transform shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Help */}
        <div className="mt-10 p-5 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-400 text-center sm:text-left">
            Still have questions? Chat directly with Ishan Aggarwal on WhatsApp.
          </div>
          <a
            href={getGeneralWhatsAppUrl("Hello Ishan! I have a question about ordering on SELLERSTOP.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-all shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
