import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS_DATA } from '../data/products';
import { Product, ActiveView } from '../types';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { 
  Sparkles, 
  Orbit, 
  Play, 
  Pause, 
  ArrowRight, 
  MessageCircle, 
  Flame,
  Zap,
  Cookie
} from 'lucide-react';

interface PlanetOrbitShowcaseProps {
  onViewProduct: (product: Product) => void;
  setActiveView: (view: ActiveView) => void;
}

export const PlanetOrbitShowcase: React.FC<PlanetOrbitShowcaseProps> = ({
  onViewProduct,
  setActiveView,
}) => {
  // Selected 8 flagship orbiting items including Monster, Campa Boost, Dairy Milk Fruit & Nut, Fuse, 5 Star, Monaco, Good Day
  const orbitProducts = [
    PRODUCTS_DATA.find((p) => p.id === 'monster-energy-original-classic') || PRODUCTS_DATA[0],
    PRODUCTS_DATA.find((p) => p.id === 'monster-ultra-white') || PRODUCTS_DATA[1],
    PRODUCTS_DATA.find((p) => p.id === 'campa-gold-boost-energy') || PRODUCTS_DATA[2],
    PRODUCTS_DATA.find((p) => p.id === 'cadbury-dairy-milk-fruit-and-nut') || PRODUCTS_DATA[3],
    PRODUCTS_DATA.find((p) => p.id === 'cadbury-5-star-chocolate') || PRODUCTS_DATA[4],
    PRODUCTS_DATA.find((p) => p.id === 'cadbury-fuse-chocolate') || PRODUCTS_DATA[5],
    PRODUCTS_DATA.find((p) => p.id === 'parle-monaco-salted-biscuit') || PRODUCTS_DATA[6],
    PRODUCTS_DATA.find((p) => p.id === 'britannia-good-day-butter') || PRODUCTS_DATA[7],
  ];

  const [isPaused, setIsPaused] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  // Smooth rotational loop
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.35 * speedMultiplier) % 360);
    }, 20);

    return () => clearInterval(interval);
  }, [isPaused, speedMultiplier]);

  const categories = [
    { id: 'all', label: 'All Orbits', icon: Orbit },
    { id: 'energy-beverages', label: 'Monster, Boost & Colas', icon: Zap },
    { id: 'silk-chocolates', label: 'Silk, Fruit & Nut, Fuse', icon: Sparkles },
    { id: 'biscuits-bakery', label: 'Monaco, Good Day & Oreo', icon: Cookie },
    { id: 'perfumes', label: 'Belivita Luxury Perfumes', icon: Sparkles },
    { id: 'chips-namkeen', label: "Lay's & Kurkure", icon: Flame },
  ];

  const filteredProducts = selectedCategoryFilter === 'all' 
    ? orbitProducts 
    : PRODUCTS_DATA.filter((p) => p.category === selectedCategoryFilter).slice(0, 8);

  return (
    <section id="planet-orbit-section" className="relative overflow-hidden py-20 md:py-28 bg-[#070709] border-b border-neutral-800/80 select-none">
      {/* Background Cosmic Starfield & Nebula Glows */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-purple-950/15 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle Star specks */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4 shadow-lg shadow-amber-400/10"
          >
            <Orbit className="w-4 h-4 animate-spin" style={{ animationDuration: '12s' }} />
            <span>Planetary Interactive Showcase</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-4"
          >
            COME TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">SELLERSTOP</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light"
          >
            Step into our gravitational pull. Handpicked Monster Original &amp; Ultra White, Campa Gold Boost, Cadbury Dairy Milk Fruit &amp; Nut, 5 Star, Fuse, Monaco, Good Day, and Belivita perfumes rotate live around the SELLERSTOP core. Hover or click any satellite to inspect.
          </motion.p>

          {/* Category Filter Pills to manipulate orbit */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryFilter(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-amber-400 text-neutral-950 font-bold shadow-lg shadow-amber-400/25 scale-105'
                      : 'bg-neutral-900/90 text-neutral-300 border border-white/10 hover:border-amber-400/40 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ORBIT ARENA (Visualizing Planet + Revolving Items) */}
        <div className="relative w-full max-w-4xl mx-auto h-[550px] sm:h-[620px] md:h-[680px] flex items-center justify-center">
          
          {/* Orbital Path 1: Inner Elliptical Ring */}
          <div className="absolute w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] rounded-full border border-dashed border-amber-400/20 pointer-events-none animate-spin" style={{ animationDuration: '60s' }} />

          {/* Orbital Path 2: Outer Elliptical Ring */}
          <div className="absolute w-[460px] h-[460px] sm:w-[560px] sm:h-[560px] md:w-[640px] md:h-[640px] rounded-full border border-neutral-700/40 pointer-events-none" />

          {/* Orbital Path 3: Ambient faint cosmic ring */}
          <div className="absolute w-[600px] h-[600px] sm:w-[720px] sm:h-[720px] md:w-[800px] md:h-[800px] rounded-full border border-neutral-800/30 pointer-events-none" />

          {/* CENTER: 3D-Styled Rotating Planet SELLERSTOP Core */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative z-20 flex flex-col items-center justify-center cursor-pointer group"
            onClick={() => {
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {/* Pulsing Atmosphere Aura */}
            <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-amber-500/25 via-amber-400/15 to-purple-600/20 blur-xl group-hover:scale-115 transition-transform duration-700 pointer-events-none animate-pulse" />

            {/* The Planet Sphere */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full overflow-hidden shadow-[0_0_60px_rgba(245,158,11,0.35)] border-2 border-amber-400/60 bg-gradient-to-br from-amber-950 via-neutral-900 to-black flex flex-col items-center justify-center text-center p-4">
              
              {/* Rotating Planet Surface Pattern Texture */}
              <div 
                className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,#f59e0b,transparent_60%),radial-gradient(circle_at_70%_70%,#7c3aed,transparent_60%)] animate-spin"
                style={{ animationDuration: '45s' }}
              />

              {/* Surface grid lines simulating planetary latitude */}
              <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute inset-2 rounded-full border border-dashed border-amber-400/20 pointer-events-none" />

              {/* Core Badge & Content */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-400 text-neutral-950 font-black text-sm flex items-center justify-center mb-1.5 shadow-md shadow-amber-400/40 group-hover:rotate-12 transition-transform">
                  S
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                  COME TO
                </span>
                <span className="font-heading font-black text-sm sm:text-base text-white tracking-wide leading-tight">
                  SELLERSTOP
                </span>
                <span className="text-[9px] text-neutral-300 font-medium mt-1 px-2 py-0.5 rounded-full bg-black/60 border border-white/10">
                  Tap to Enter Shop →
                </span>
              </div>
            </div>

            {/* Orbit status pill below planet */}
            <div className="mt-3 px-3 py-1 rounded-full bg-black/80 border border-white/10 backdrop-blur-md flex items-center gap-2 text-[10px] text-neutral-300 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Solar Orbit Active • {filteredProducts.length} Items Circling</span>
            </div>
          </motion.div>

          {/* ORBITING SATELLITE ITEMS */}
          {filteredProducts.map((product, idx) => {
            // Distribute items evenly around 360 degrees
            const total = filteredProducts.length;
            const angleOffset = (360 / total) * idx;
            const currentAngle = (rotationAngle + angleOffset) * (Math.PI / 180);

            // Alternate orbital radii for rich multi-depth planetary feel
            const isInner = idx % 2 === 0;
            const radiusX = isInner ? 190 : 280;
            const radiusY = isInner ? 140 : 210;

            // Compute parametric coordinates
            const x = Math.cos(currentAngle) * radiusX;
            const y = Math.sin(currentAngle) * radiusY;

            // Calculate z-depth for 3D illusion (items in front are bigger & higher z-index)
            const zFactor = (Math.sin(currentAngle) + 1) / 2; // 0 to 1
            const scale = 0.82 + zFactor * 0.35; // 0.82 to 1.17
            const opacity = 0.65 + zFactor * 0.35; // 0.65 to 1
            const zIndex = Math.round(zFactor * 30);

            return (
              <div
                key={product.id}
                style={{
                  transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                className="absolute transition-transform duration-75 will-change-transform"
                onMouseEnter={() => {
                  setIsPaused(true);
                  setHoveredProduct(product);
                }}
                onMouseLeave={() => {
                  setIsPaused(false);
                  setHoveredProduct(null);
                }}
              >
                {/* Orbit Item Capsule */}
                <div 
                  onClick={() => onViewProduct(product)}
                  className="group cursor-pointer relative p-2 rounded-2xl bg-neutral-900/90 hover:bg-neutral-900 border border-neutral-700/80 hover:border-amber-400/80 shadow-2xl backdrop-blur-md flex items-center gap-3 transition-all duration-300 hover:shadow-amber-400/20 max-w-[190px] sm:max-w-[220px]"
                >
                  {/* Thumbnail */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-black shrink-0 relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-1 left-1 px-1 py-0.5 rounded text-[8px] font-bold bg-amber-400 text-neutral-950 uppercase leading-none">
                      #{idx + 1}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="overflow-hidden text-left">
                    <span className="text-[9px] uppercase font-bold text-amber-400 block truncate">
                      {product.brand}
                    </span>
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                      {product.name}
                    </h4>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                      <MessageCircle className="w-2.5 h-2.5" />
                      Inquire
                    </span>
                  </div>

                  {/* Orbital Connection Dot */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400 ring-4 ring-amber-400/20 pointer-events-none" />
                </div>
              </div>
            );
          })}

        </div>

        {/* Orbit Interactive Control Bar */}
        <div className="mt-8 max-w-lg mx-auto flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-2xl bg-neutral-900/90 border border-white/10 backdrop-blur-md shadow-xl text-xs">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300 transition-all"
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Resume Orbit</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause Orbit</span>
                </>
              )}
            </button>

            <span className="text-neutral-400 hidden sm:inline">|</span>

            {/* Orbit Speed Adjuster */}
            <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/5">
              <span className="text-[10px] text-neutral-400 px-1">Speed:</span>
              {[0.5, 1, 2].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setSpeedMultiplier(spd)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                    speedMultiplier === spd
                      ? 'bg-white text-neutral-950'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* Quick WhatsApp Inquiry for Orbit Items */}
          <a
            href={getGeneralWhatsAppUrl("Hello Ishan, I am exploring the planetary orbit items on SELLERSTOP and want to place an order!")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold ml-auto"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Order Orbit Drops</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        {/* Hovered Product Spotlight Callout Banner */}
        <AnimatePresence>
          {hoveredProduct && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 max-w-md mx-auto p-4 rounded-2xl bg-neutral-900 border border-amber-400/40 shadow-2xl flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <img 
                  src={hoveredProduct.image} 
                  alt={hoveredProduct.name} 
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Inspecting Satellite
                  </span>
                  <p className="text-xs font-bold text-white line-clamp-1">
                    {hoveredProduct.name}
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    {hoveredProduct.details?.origin || 'Original Import'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onViewProduct(hoveredProduct)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs shrink-0 transition-all"
              >
                Quick View
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
