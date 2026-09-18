import React from 'react';
import { BUSINESS_INFO } from '../data/products';
import { Shield, Sparkles, User, MapPin, MessageCircle, Phone, Instagram } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="py-16 md:py-24 border-b border-neutral-800/60 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Founder & Business Profile */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 p-3 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80"
                alt="Founder Ishan Aggarwal SELLERSTOP"
                className="w-full aspect-4/5 object-cover rounded-2xl brightness-90"
              />

              <div className="absolute bottom-6 inset-x-6 p-5 rounded-2xl bg-neutral-950/85 backdrop-blur-md border border-neutral-700/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Founder & Curator
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                    Active On Call
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-xl text-white">
                  {BUSINESS_INFO.owner}
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5">
                  SELLERSTOP • {BUSINESS_INFO.location}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Commitment */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <User className="w-3.5 h-3.5" />
              <span>About SELLERSTOP</span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-6">
              Bringing Global Viral Finds Right to Your Doorstep.
            </h2>

            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              <p>
                Founded by <strong className="text-white font-semibold">{BUSINESS_INFO.owner}</strong>,{' '}
                <strong className="text-amber-400 font-semibold">{BUSINESS_INFO.name}</strong> was born out of a passion to bridge the gap between worldwide trending sensations and consumers in India.
              </p>
              <p>
                Whether it is the viral <strong className="text-white">Dubai Kunafa Pistachio Chocolate</strong>, the mouth-melting swirl of <strong className="text-white">Cadbury Dairy Milk Silk &amp; Silk Oreo</strong>, high-octane <strong className="text-white">Campa Power Energy</strong>, imported <strong className="text-white">Monster Energy &amp; Thai Red Bull</strong> cans, or the artisanal luxury of <strong className="text-white">Belivita Perfumes</strong>—we curate each drop with obsession.
              </p>
              <p className="text-neutral-400 text-sm">
                We believe in straightforward, transparent commerce without robotic checkout pages or hidden charges. You speak directly with our team on WhatsApp or phone, confirm availability, verify batch photos, and receive swift Pan-India tracked dispatch.
              </p>
            </div>

            {/* Credibility highlights */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full pt-6 border-t border-neutral-800">
              <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
                <MapPin className="w-4 h-4 text-amber-400 mb-1.5" />
                <p className="text-xs font-bold text-white">All-India Delivery</p>
                <p className="text-[11px] text-neutral-400">Metro & Regional Hubs</p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
                <Shield className="w-4 h-4 text-amber-400 mb-1.5" />
                <p className="text-xs font-bold text-white">Personal Care</p>
                <p className="text-[11px] text-neutral-400">Careful temperature wrap</p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 col-span-2 sm:col-span-1">
                <Sparkles className="w-4 h-4 text-amber-400 mb-1.5" />
                <p className="text-xs font-bold text-white">Curated Catalog</p>
                <p className="text-[11px] text-neutral-400">Regular new overseas drops</p>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=Hello%20${encodeURIComponent(BUSINESS_INFO.owner)},%20I%20want%20to%20know%20more%20about%20SELLERSTOP!`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with {BUSINESS_INFO.owner}</span>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-200 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>

              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-pink-400 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>{BUSINESS_INFO.instagramHandle}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
