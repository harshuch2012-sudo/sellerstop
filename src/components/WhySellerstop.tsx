import React from 'react';
import { ShieldCheck, Zap, MessageCircle, Globe2, Sparkles, CheckCircle2 } from 'lucide-react';

export const WhySellerstop: React.FC = () => {
  const points = [
    {
      icon: <Globe2 className="w-6 h-6 text-amber-400" />,
      title: 'Curated Overseas Drops',
      description:
        'We source authentic trending consumer goods, viral energy drinks, and Japanese/US snacks that are rare or unavailable in regular stores.',
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-emerald-400" />,
      title: 'Direct WhatsApp Ordering',
      description:
        'No clunky checkout portals. Chat directly with founder Ishan Aggarwal for instant confirmation, flavor advice, and payment coordination.',
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: 'Pan-India Express Dispatch',
      description:
        'Carefully packaged with temperature-protective wrapping for chocolates and fragile perfume flacons delivered anywhere across India.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
      title: 'Personalized Verification',
      description:
        'Real product batch photos and live stock updates shared directly on WhatsApp before you finalize your order.',
    },
  ];

  return (
    <section className="py-16 md:py-24 border-b border-neutral-800/60 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The SELLERSTOP Advantage</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Why Shop With SELLERSTOP
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
            Bridging the gap between global viral sensations and passionate Indian consumers with bespoke concierge service.
          </p>
        </div>

        {/* Value Prop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((point, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all hover:-translate-y-1 duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center mb-5 shadow-inner">
                {point.icon}
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                {point.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Customer Trust Checklist Bar */}
        <div className="mt-12 p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 flex flex-wrap items-center justify-around gap-4 text-xs text-neutral-300 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% Inspected Batches</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Direct Founder Interaction</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Safe Bubble-Wrap Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Pan-India Tracking Provided</span>
          </div>
        </div>

      </div>
    </section>
  );
};
