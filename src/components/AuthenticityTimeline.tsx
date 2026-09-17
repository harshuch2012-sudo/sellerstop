import React from 'react';
import { motion } from 'motion/react';
import { Plane, ShieldCheck, Snowflake, Truck, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthenticityTimeline: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Direct Overseas Sourcing',
      desc: 'Authentic batches sourced directly from trusted distributors in Dubai, Tokyo, Seoul, and Los Angeles.',
      icon: Plane,
      highlight: 'Original Foreign Barcodes',
    },
    {
      step: '02',
      title: 'Climate-Controlled Protection',
      desc: 'Dubai Kunafa chocolates are packed in insulated thermal foil with reusable ice gel to withstand Indian weather.',
      icon: Snowflake,
      highlight: 'Zero Melt Guarantee',
    },
    {
      step: '03',
      title: 'Batch Photo Confirmation',
      desc: 'Before dispatch, founder Ishan Aggarwal shares real-time packaging and batch expiry photos on WhatsApp.',
      icon: ShieldCheck,
      highlight: '100% Personal Accountability',
    },
    {
      step: '04',
      title: 'Express Pan-India Dispatch',
      desc: 'Dispatched via premium air couriers (Bluedart / Delhivery Express) with direct tracking ID provided on WhatsApp.',
      icon: Truck,
      highlight: '24-48h Metro Delivery',
    },
  ];

  return (
    <section className="py-20 md:py-28 border-b border-neutral-800/60 bg-neutral-900/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The SELLERSTOP Standard</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            From Global Origin to Your Doorstep
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            How we ensure every single imported delicacy and perfume reaches you in museum-grade, factory-sealed condition.
          </p>
        </div>

        {/* 4-Step Animated Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-400/50 shadow-xl transition-all relative flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-heading font-black text-2xl text-neutral-700 group-hover:text-amber-400/60 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-amber-300 transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.highlight}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
