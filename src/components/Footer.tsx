import React from 'react';
import { BUSINESS_INFO } from '../data/products';
import { ActiveView } from '../types';
import { getGeneralWhatsAppUrl, getCallUrl } from '../utils/whatsapp';
import { MessageCircle, Phone, Instagram, ArrowUp, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  setActiveView: (view: ActiveView) => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView, onOpenInquiry }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800/80 text-neutral-400 text-xs">
      
      {/* Final WhatsApp Call to Action Strip (as per sitemap: Final WhatsApp CTA) */}
      <div className="border-b border-neutral-800/80 bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/10 py-10 px-4">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Order?</span>
          </div>
          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mb-2">
            Order Directly via WhatsApp & Phone
          </h3>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mb-6">
            Instant stock verification, authentic batch photos, and express dispatch across India with founder Ishan Aggarwal.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              id="footer-whatsapp-cta-btn"
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order on WhatsApp: {BUSINESS_INFO.phone}</span>
            </a>

            <a
              id="footer-call-cta-btn"
              href={getCallUrl()}
              className="px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-heading font-black text-neutral-950 text-base">
                S
              </div>
              <span className="font-heading font-black text-lg text-white tracking-tight">
                {BUSINESS_INFO.name}
              </span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Curating the world&apos;s most viral, imported, and hard-to-find goods—from Belivita perfumes to exotic energy cans, Silk chocolates, and chilled colas—delivered Pan-India.
            </p>
            <p className="text-neutral-300 font-medium text-xs">
              Founder & Owner: <strong className="text-amber-400">{BUSINESS_INFO.owner}</strong>
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-amber-400 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('shop')} className="hover:text-amber-400 transition-colors">
                  Shop All Products
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('belivita')} className="text-amber-300 hover:text-white transition-colors">
                  Belivita Perfumes Spotlight
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('categories')} className="hover:text-amber-400 transition-colors">
                  Browse Categories
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('bestsellers')} className="hover:text-amber-400 transition-colors">
                  Best Sellers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Concierge & Ordering */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Concierge Contact
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp: {BUSINESS_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={getCallUrl()}
                  className="flex items-center gap-2 hover:text-amber-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Voice Call: {BUSINESS_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>Instagram: {BUSINESS_INFO.instagramHandle}</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenInquiry}
                  className="text-amber-400 hover:text-amber-300 font-medium"
                >
                  View Order Inquiry Bag →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Important Pricing & Quality Notice */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Pricing Notice
            </h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              To ensure real-time inventory precision and protect customers from inflated costs, all orders and pricing inquiries are handled directly on WhatsApp and Phone.
            </p>
            <p className="text-[10px] text-neutral-500">
              No prices are displayed on this site.
            </p>
          </div>

        </div>

        {/* Bottom copyright and top scroll */}
        <div className="mt-12 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <p>
            © {new Date().getFullYear()} {BUSINESS_INFO.name}. Founded & Operated by {BUSINESS_INFO.owner}. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
