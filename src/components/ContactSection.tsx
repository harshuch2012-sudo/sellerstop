import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/products';
import { getGeneralWhatsAppUrl, getCallUrl } from '../utils/whatsapp';
import { MessageCircle, Phone, Instagram, Send, MapPin, Clock, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');

  const handleSendCustomWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello ${BUSINESS_INFO.name},
My Name: ${customerName || 'Customer'}
City: ${city || 'India'}
Inquiry / Order Request: ${message || 'I would like to inquire about your trending products.'}

Please let me know availability and pricing. Thank you!`;

    const url = `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact-section" className="py-16 md:py-24 border-b border-neutral-800/60 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Direct Concierge</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Order on WhatsApp & Call
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 mt-2 leading-relaxed">
            Reach out directly for instant price quotes, product inquiries, custom bundles, and fast express dispatch across India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Card */}
            <a
              id="contact-card-whatsapp"
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 sm:p-6 rounded-3xl bg-neutral-900/90 hover:bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 transition-all duration-300 flex items-center justify-between shadow-lg hover:shadow-emerald-500/10 block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Primary Ordering Channel
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">
                    WhatsApp Chat
                  </h3>
                  <p className="text-xs text-neutral-400">{BUSINESS_INFO.phone}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                Chat Now →
              </span>
            </a>

            {/* Direct Call Card */}
            <a
              id="contact-card-phone"
              href={getCallUrl()}
              className="group p-5 sm:p-6 rounded-3xl bg-neutral-900/90 hover:bg-neutral-900 border border-neutral-800 hover:border-amber-400/50 transition-all duration-300 flex items-center justify-between shadow-lg hover:shadow-amber-500/10 block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    Direct Voice Line
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                    Call {BUSINESS_INFO.owner}
                  </h3>
                  <p className="text-xs text-neutral-400">{BUSINESS_INFO.phone}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                Call Now →
              </span>
            </a>

            {/* Instagram Card */}
            <a
              id="contact-card-instagram"
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 sm:p-6 rounded-3xl bg-neutral-900/90 hover:bg-neutral-900 border border-neutral-800 hover:border-pink-500/50 transition-all duration-300 flex items-center justify-between shadow-lg hover:shadow-pink-500/10 block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-pink-400">
                    Social & Stories
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-pink-300 transition-colors">
                    Instagram DM
                  </h3>
                  <p className="text-xs text-neutral-400">{BUSINESS_INFO.instagramHandle}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-pink-400 group-hover:translate-x-1 transition-transform">
                Visit →
              </span>
            </a>

            {/* Operation Hours & Dispatch Info */}
            <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/70 text-xs text-neutral-400 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Orders taken 7 days a week: 10:00 AM – 10:00 PM IST</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Pan-India express courier dispatch with tracking ID</span>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Custom WhatsApp Inquiry Composer */}
          <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-2.5 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="font-heading font-bold text-xl text-white">
                Quick WhatsApp Inquiry
              </h3>
            </div>
            <p className="text-xs text-neutral-400 mb-6">
              Fill in your details to launch a pre-formatted WhatsApp chat directly with Ishan Aggarwal.
            </p>

            <form onSubmit={handleSendCustomWhatsApp} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full text-sm px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                    City / State
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai, Maharashtra"
                    className="w-full text-sm px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                  Products You Want / Inquiry Details
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. I want 2 Cadbury Silk Oreo bars, 2 Campa Energy chilled cans, and 1 Dubai Kunafa Chocolate. Please let me know price and delivery time."
                  className="w-full text-sm p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                id="contact-form-submit-btn"
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>Launch WhatsApp Inquiry Now</span>
              </button>

              <p className="text-[11px] text-center text-neutral-500 pt-1">
                No credit card required. Personal service, batch photos, and payment details coordinated on WhatsApp.
              </p>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
