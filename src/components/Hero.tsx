import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_INFO, PRODUCTS_DATA } from '../data/products';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { ActiveView } from '../types';
import { MessageCircle, ArrowRight, Star, Sparkles, ShieldCheck, Zap, Globe, Flame, CheckCircle2, Orbit } from 'lucide-react';

interface HeroProps {
  setActiveView: (view: ActiveView) => void;
  openProductQuickView: (productId: string) => void;
  onReplayVault?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveView, openProductQuickView, onReplayVault }) => {
  // Showcase flagship viral products across energy drinks, silk & treats, and iconic biscuits
  const heroProducts = [
    PRODUCTS_DATA.find((p) => p.id === 'monster-energy-original-classic') || PRODUCTS_DATA[0],
    PRODUCTS_DATA.find((p) => p.id === 'monster-ultra-white') || PRODUCTS_DATA[1],
    PRODUCTS_DATA.find((p) => p.id === 'redbull-classic-energy-drink') || PRODUCTS_DATA[2],
    PRODUCTS_DATA.find((p) => p.id === 'campa-gold-boost-energy') || PRODUCTS_DATA[3],
    PRODUCTS_DATA.find((p) => p.id === 'cadbury-dairy-milk-fruit-and-nut') || PRODUCTS_DATA[4],
    PRODUCTS_DATA.find((p) => p.id === 'cadbury-5-star-chocolate') || PRODUCTS_DATA[5],
    PRODUCTS_DATA.find((p) => p.id === 'cadbury-fuse-chocolate') || PRODUCTS_DATA[6],
    PRODUCTS_DATA.find((p) => p.id === 'oreo-original-vanilla-biscuit') || PRODUCTS_DATA[7],
    PRODUCTS_DATA.find((p) => p.id === 'parle-monaco-salted-biscuit') || PRODUCTS_DATA[8],
    PRODUCTS_DATA.find((p) => p.id === 'britannia-good-day-butter-cookies') || PRODUCTS_DATA[9],
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Dual video crossfading refs
  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);
  const activeVideoRef = useRef<'A' | 'B'>('A');
  const [activeVideo, setActiveVideo] = useState<'A' | 'B'>('A');

  // Video loop cross-fade logic
  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    // Check reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      videoA.pause();
      videoB.pause();
      return;
    }

    const FADE_TIME = 0.9;
    let isSwapping = false;

    const playSafe = (v: HTMLVideoElement) => {
      const p = v.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => {});
      }
    };

    playSafe(videoA);

    const onTick = (e: Event) => {
      const v = e.target as HTMLVideoElement;
      if (isSwapping || !v.duration) return;
      if (v.duration - v.currentTime > FADE_TIME) return;

      isSwapping = true;
      const nextVid = activeVideoRef.current === 'A' ? videoB : videoA;
      const nextKey = activeVideoRef.current === 'A' ? 'B' : 'A';

      nextVid.currentTime = 0;
      playSafe(nextVid);
      activeVideoRef.current = nextKey;
      setActiveVideo(nextKey);

      setTimeout(() => {
        v.pause();
        try {
          v.currentTime = 0;
        } catch {
          // ignore
        }
        isSwapping = false;
      }, FADE_TIME * 1000 + 100);
    };

    videoA.addEventListener('timeupdate', onTick);
    videoB.addEventListener('timeupdate', onTick);

    return () => {
      videoA.removeEventListener('timeupdate', onTick);
      videoB.removeEventListener('timeupdate', onTick);
    };
  }, []);

  // Auto-rotate hero featured product every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroProducts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroProducts.length]);

  const activeProduct = heroProducts[activeIndex];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 border-b border-neutral-800/80 hero bg-black">
      {/* Cinematic Looping Globe Video Background with cross-fading */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
        aria-hidden="true"
      >
        <video
          ref={videoARef}
          className={`bg-video ${activeVideo === 'A' ? 'is-active' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/82e7eb75-c65f-490a-99b5-f3d1cad54200.webp"
        >
          <source 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104036_bd6924f6-3c8e-417e-8465-6d03c8c2e9e6.mp4" 
            type="video/mp4" 
          />
        </video>
        <video
          ref={videoBRef}
          className={`bg-video ${activeVideo === 'B' ? 'is-active' : ''}`}
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/82e7eb75-c65f-490a-99b5-f3d1cad54200.webp"
        >
          <source 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104036_bd6924f6-3c8e-417e-8465-6d03c8c2e9e6.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Ambient tint overlay for contrast and luxury glass feeling */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/80 to-black/88" />
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-black/70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & Interactive Call to Action with Masked Reveals */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Pill Badge with Pill Entry animation */}
            <motion.div 
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.25, 0.8, 0.3, 1], delay: 0.46 }}
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-white/10 mb-5 shadow-sm backdrop-blur-md"
            >
              <span className="text-amber-400">
                <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
              </span>
              <span className="text-xs font-semibold tracking-wide text-neutral-200">
                Curated by <span className="text-amber-400 font-bold">{BUSINESS_INFO.owner}</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-neutral-600" />
              <span className="text-xs text-neutral-400">Pan-India Express Dispatch</span>
            </motion.div>

            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.8, 0.3, 1], delay: 0.1 }}
              className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-amber-400 mb-2.5"
            >
              {BUSINESS_INFO.tagline}
            </motion.p>

            {/* Main Heading with Signature Masked Line Rise */}
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-white mb-5">
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                  className="block"
                >
                  DISCOVER WHAT&apos;S
                </motion.span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200"
                >
                  VIRAL &amp; IMPORTED
                </motion.span>
              </span>
            </h1>

            {/* Subtitle with Blur-to-Focus reveal */}
            <motion.p 
              initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.58 }}
              className="text-base sm:text-lg text-neutral-200/90 max-w-xl leading-relaxed mb-6 font-normal"
            >
              Original Cadbury Dairy Milk Silk &amp; classic KitKat chocolates, authentic Dubai Kunafa bars, Belivita luxury perfumes &amp; global treats. Dispatched fast pan-India directly to your door.
            </motion.p>

            {/* Quality & Category Assurance */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.8, 0.3, 1], delay: 0.68 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-neutral-300 mb-8 backdrop-blur-md"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Genuine Imports • <strong className="text-amber-400 font-semibold">Exotic Monster Flavours, Thailand Red Bull &amp; Dubai Chocolates</strong></span>
            </motion.div>

            {/* Buttons with Pill In Animation */}
            <motion.div 
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.82 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                id="hero-shop-products-btn"
                onClick={() => {
                  setActiveView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-sm sm:text-base transition-all shadow-lg shadow-white/10"
              >
                <span>Shop All Products</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                id="hero-whatsapp-btn"
                href={getGeneralWhatsAppUrl("Hello Ishan, I am browsing SELLERSTOP and would like to order trending chocolates and perfumes!")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm sm:text-base transition-all shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                id="hero-explore-categories-btn"
                onClick={() => {
                  setActiveView('categories');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-amber-400 border border-amber-400/40 font-bold text-sm sm:text-base transition-all shadow-lg backdrop-blur-md"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Explore Categories</span>
              </motion.button>

              {onReplayVault && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  id="hero-vault-replay-btn"
                  onClick={onReplayVault}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-black/60 hover:bg-black/90 text-amber-300 border border-amber-400/40 font-semibold text-sm transition-all shadow-lg backdrop-blur-md"
                  title="Replay Cinematic Door Opening Animation"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Replay Door Opening</span>
                </motion.button>
              )}
            </motion.div>

            {/* Micro reassurance badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.95 }}
              className="mt-8 pt-6 border-t border-white/10 w-full grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-neutral-400"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Original Imports</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>24-48h Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Pan-India Courier</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Live WhatsApp Quotes</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Visual Product Mosaic with Full Interactive Animation */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* Centerpiece Hero Photo Showcase with AnimatePresence */}
            <div className="relative w-full max-w-md aspect-square rounded-3xl p-3 bg-neutral-900/80 border border-white/10 shadow-2xl backdrop-blur-md overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative"
                >
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                  />

                  {/* Overlay gradient badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/30 to-transparent rounded-2xl flex flex-col justify-end p-5">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-neutral-950">
                        {activeProduct.categoryLabel}
                      </span>
                      <span className="text-xs text-neutral-300 font-medium flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        Trending Drop
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white">
                      {activeProduct.name}
                    </h3>
                    <p className="text-xs text-neutral-300 line-clamp-1 mb-3">
                      {activeProduct.shortDescription}
                    </p>
                    <button
                      id="hero-featured-view-btn"
                      onClick={() => openProductQuickView(activeProduct.id)}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/15 hover:bg-amber-400 hover:text-neutral-950 backdrop-blur-md text-white font-bold text-xs transition-all border border-white/20 text-center"
                    >
                      View Product &amp; Inquire →
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Product Switcher Pills */}
            <div className="flex items-center gap-2 mt-4 z-10 flex-wrap justify-center">
              {heroProducts.map((prod, idx) => (
                <button
                  key={prod.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    activeIndex === idx
                      ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/30 scale-105'
                      : 'bg-black/60 text-neutral-400 border border-white/10 hover:text-white backdrop-blur-sm'
                  }`}
                >
                  <span>{idx + 1}.</span>
                  <span className="max-w-[70px] sm:max-w-[100px] truncate">{prod.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Floating Mini Product Badge 1: Cadbury Silk / KitKat */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              onClick={() => openProductQuickView('cadbury-dairy-milk-silk')}
              className="absolute -top-4 -left-4 sm:-left-8 p-2.5 rounded-2xl bg-neutral-950/90 border border-white/10 shadow-xl backdrop-blur-md max-w-[205px] cursor-pointer hover:scale-105 transition-transform hidden sm:flex items-center gap-2.5 z-20"
            >
              <img
                src={PRODUCTS_DATA.find((p) => p.id === 'cadbury-dairy-milk-silk')?.image}
                alt="Cadbury Dairy Milk Silk"
                className="w-11 h-11 object-cover rounded-xl shrink-0"
              />
              <div className="overflow-hidden">
                <p className="text-[10px] uppercase font-bold text-amber-400">All-Time Fav</p>
                <p className="text-xs font-semibold text-white truncate">Dairy Milk Silk</p>
                <p className="text-[10px] text-emerald-400 font-medium">Original Bar</p>
              </div>
            </motion.div>

            {/* Floating Mini Product Badge 2: Dubai Kunafa Chocolate */}
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
              onClick={() => openProductQuickView('dubai-kunafa-chocolate')}
              className="absolute -bottom-4 -right-2 sm:-right-6 p-2.5 rounded-2xl bg-neutral-950/90 border border-white/10 shadow-xl backdrop-blur-md max-w-[200px] cursor-pointer hover:scale-105 transition-transform hidden sm:flex items-center gap-2.5 z-20"
            >
              <img
                src={PRODUCTS_DATA.find((p) => p.id === 'dubai-kunafa-chocolate')?.image}
                alt="Dubai Kunafa Chocolate"
                className="w-11 h-11 object-cover rounded-xl shrink-0"
              />
              <div className="overflow-hidden">
                <p className="text-[10px] uppercase font-bold text-amber-400">Top Trending</p>
                <p className="text-xs font-semibold text-white truncate">Dubai Pistachio Bar</p>
                <p className="text-[10px] text-emerald-400 font-medium">Fresh UAE Batch</p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
