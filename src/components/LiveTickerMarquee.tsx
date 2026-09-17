import React from 'react';
import { Sparkles, Flame, ShieldCheck, Zap, Globe, MessageCircle } from 'lucide-react';

export const LiveTickerMarquee: React.FC = () => {
  const tickerItems = [
    { text: 'VIRAL DUBAI KUNAFA PISTACHIO BARS IN STOCK', icon: Flame, color: 'text-amber-400' },
    { text: 'MONSTER MANGO LOCO, PIPELINE PUNCH & ULTRA ZERO', icon: Zap, color: 'text-emerald-400' },
    { text: 'THAILAND RED BULL KRATING DAENG GOLD NOW IN STOCK', icon: Flame, color: 'text-amber-400' },
    { text: 'CADBURY DAIRY MILK SILK & ORIGINAL KITKAT BARS', icon: Sparkles, color: 'text-amber-300' },
    { text: 'BELIVITA OUD ROYAL EXTRAIT 35% DE PARFUM', icon: Sparkles, color: 'text-amber-300' },
    { text: 'PAN-INDIA EXPRESS AIR COURIER DISPATCH', icon: Globe, color: 'text-blue-400' },
    { text: 'ORDER DIRECT VIA WHATSAPP: +91 9953549760', icon: MessageCircle, color: 'text-emerald-400' },
    { text: '100% AUTHENTIC DIRECT OVERSEAS IMPORTS', icon: ShieldCheck, color: 'text-amber-400' },
  ];

  return (
    <div className="relative overflow-hidden bg-neutral-900 border-y border-neutral-800/80 py-3.5 select-none">
      {/* Subtle glowing side fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-ticker space-x-8">
        {/* First Loop */}
        <div className="flex items-center space-x-8">
          {tickerItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={`tick-1-${i}`} className="flex items-center space-x-2.5 whitespace-nowrap">
                <Icon className={`w-3.5 h-3.5 ${item.color} shrink-0 animate-pulse`} />
                <span className="font-heading font-bold text-xs tracking-wider text-neutral-200">
                  {item.text}
                </span>
                <span className="text-neutral-700 text-xs font-black">✦</span>
              </div>
            );
          })}
        </div>

        {/* Duplicate Loop for Seamless Infinite Marquee */}
        <div className="flex items-center space-x-8">
          {tickerItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={`tick-2-${i}`} className="flex items-center space-x-2.5 whitespace-nowrap">
                <Icon className={`w-3.5 h-3.5 ${item.color} shrink-0 animate-pulse`} />
                <span className="font-heading font-bold text-xs tracking-wider text-neutral-200">
                  {item.text}
                </span>
                <span className="text-neutral-700 text-xs font-black">✦</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
