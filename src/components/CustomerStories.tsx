import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageCircle, MapPin, CheckCircle, Quote } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

export const CustomerStories: React.FC = () => {
  const reviews = [
    {
      name: 'Aditya Mehta',
      city: 'Mumbai, Maharashtra',
      item: 'Viral Dubai Kunafa Pistachio Bar (2x)',
      comment: 'Was skeptical about ordering chocolate in Indian summer, but Ishan packed it in heavy thermal foil with ice packs! Arrived completely solid and the pistachio crunch is 10/10.',
      date: 'Verified Buyer • 2 days ago',
    },
    {
      name: 'Rohan Singhania',
      city: 'New Delhi',
      item: 'Belivita Oud Royal 100ml Decanter',
      comment: 'Unbelievable longevity. Sprayed it at 8 AM before client meetings, was still projecting past midnight. Genuine extrait oil. Ishan coordinated the WhatsApp delivery within 24 hours.',
      date: 'Verified Buyer • 4 days ago',
    },
    {
      name: 'Ananya Verma',
      city: 'Bengaluru, Karnataka',
      item: 'Prime Hydration Ice Pop + Stanley Tumbler',
      comment: 'Finally found real USA imported Prime without paying insane airport prices. The Stanley tumbler in Rose Quartz is 100% genuine with authentic box serials. Thank you SELLERSTOP!',
      date: 'Verified Buyer • 1 week ago',
    },
    {
      name: 'Kabir Chawla',
      city: 'Chandigarh',
      item: 'Takis Fuego Mega Bag + Feastables Bar',
      comment: 'Takis were super fresh and crunchy, spicy habanero punch is unmatched. Smooth WhatsApp transaction, no app lag or signup forms needed.',
      date: 'Verified Buyer • 1 week ago',
    },
  ];

  return (
    <section className="py-20 md:py-28 border-b border-neutral-800/60 bg-neutral-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>Customer Testimonials</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Loved by Enthusiasts Pan-India
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Real WhatsApp unboxing feedback from customers who received their imports in pristine condition.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-400/40 shadow-xl flex flex-col justify-between relative group transition-all"
            >
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic mb-4">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-sm text-white">
                    {rev.name}
                  </h4>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-0.5">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>{rev.city}</span>
                </div>
                <p className="text-[10px] text-amber-400 font-medium truncate mt-1">
                  Ordered: {rev.item}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp Join Button */}
        <div className="mt-12 text-center">
          <a
            href={getGeneralWhatsAppUrl("Hello Ishan! I'd like to check current batch availability and order.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Join 2,000+ Happy Customers on WhatsApp ({BUSINESS_INFO.phone})</span>
          </a>
        </div>

      </div>
    </section>
  );
};
