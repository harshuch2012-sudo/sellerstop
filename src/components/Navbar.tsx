import React from 'react';
import { ActiveView } from '../types';
import { BUSINESS_INFO } from '../data/products';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { ShoppingBag, MessageCircle, Menu, X, Sparkles, Phone } from 'lucide-react';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  inquiryCount: number;
  openInquiry: () => void;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  onReplayVault?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  inquiryCount,
  openInquiry,
  isMenuOpen,
  toggleMenu,
  closeMenu,
  onReplayVault,
}) => {
  const navItems: { id: ActiveView; label: string; highlight?: boolean }[] = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop All' },
    { id: 'categories', label: 'Categories' },
    { id: 'belivita', label: 'Belivita Perfumes', highlight: true },
    { id: 'bestsellers', label: 'Best Sellers' },
    { id: 'newarrivals', label: 'New Arrivals' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-500/20 border-b border-amber-500/20 py-1.5 px-4 text-center text-xs text-amber-200/90 font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
        <span>Pan-India Direct Orders via WhatsApp & Call • Founder: Ishan Aggarwal</span>
        <span className="hidden md:inline text-neutral-500">|</span>
        <a 
          href={`tel:${BUSINESS_INFO.phoneRaw}`} 
          className="hidden md:inline-flex items-center gap-1 hover:text-white transition-colors"
        >
          <Phone className="w-3 h-3 text-amber-400" />
          <span>{BUSINESS_INFO.phone}</span>
        </a>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-neutral-950/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <span className="font-heading font-black text-neutral-950 text-lg md:text-xl tracking-tighter">S</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-lg md:text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  {BUSINESS_INFO.name}
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  INDIA
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 hidden sm:block">
                Imported • Popular • Premium
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-neutral-900/60 border border-neutral-800/60 px-3 py-1.5 rounded-full">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-neutral-950 bg-amber-400 shadow-sm shadow-amber-400/20 font-semibold'
                      : item.highlight
                      ? 'text-amber-300 hover:text-white hover:bg-neutral-800/60'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  {item.highlight && !isActive && (
                    <Sparkles className="w-3 h-3 inline mr-1 text-amber-400" />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Replay Vault Entrance Animation Button */}
            {onReplayVault && (
              <button
                id="header-vault-replay-btn"
                onClick={onReplayVault}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-amber-400/30 hover:border-amber-400 text-amber-300 hover:text-white text-xs font-semibold transition-all shadow-sm group"
                title="Watch Cinematic Vault Door Opening Entrance"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
                <span>Vault Entrance</span>
              </button>
            )}

            {/* Inquiry Bag Button */}
            <button
              id="header-inquiry-btn"
              onClick={openInquiry}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850 text-neutral-200 text-xs sm:text-sm font-medium transition-all"
              title="View Order Inquiry List"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Inquiry Bag</span>
              {inquiryCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold rounded-full bg-amber-400 text-neutral-950 animate-pulse">
                  {inquiryCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp CTA Button */}
            <a
              id="header-whatsapp-cta"
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden xs:inline sm:inline">Order on WhatsApp</span>
              <span className="xs:hidden sm:hidden">WhatsApp</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              id="mobile-menu-burger-btn"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop (with blur 24px per prompt specs) */}
      <div 
        id="mobile-menu-backdrop" 
        className="menu-backdrop"
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Full-Screen Navigation overlay per prompt specifications */}
      {isMenuOpen && (
        <div 
          id="mobile-full-menu"
          className="fixed inset-0 z-45 flex flex-col justify-between overflow-y-auto px-6 pb-8 text-center"
          style={{
            paddingTop: 'max(96px, calc(env(safe-area-inset-top) + 88px))',
          }}
        >
          <div className="flex flex-col items-center gap-2.5 max-w-sm mx-auto w-full">
            <div className="text-center mb-2">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400">Navigation</span>
              <p className="text-xs text-neutral-400">SELLERSTOP • Ishan Aggarwal</p>
            </div>

            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  style={{ height: '56px', fontSize: '19px', borderRadius: '10px' }}
                  className={`w-full flex items-center justify-center gap-2 font-medium transition-all ${
                    isActive
                      ? 'bg-amber-400 text-neutral-950 font-bold shadow-lg shadow-amber-400/20'
                      : 'bg-neutral-900/90 text-neutral-200 hover:bg-neutral-800 border border-neutral-800/80 hover:text-white'
                  }`}
                >
                  {item.highlight && <Sparkles className="w-4 h-4 text-amber-400" />}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Quick contact actions on mobile menu */}
          <div className="mt-8 pt-6 border-t border-neutral-800 max-w-sm mx-auto w-full flex flex-col gap-2.5">
            <a
              id="mobile-menu-whatsapp-btn"
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 text-neutral-950 font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle className="w-5 h-5" />
              Order on WhatsApp
            </a>

            <a
              id="mobile-menu-call-btn"
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="w-full py-3 px-4 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              Call {BUSINESS_INFO.phone}
            </a>

            <p className="text-xs text-neutral-500 mt-2">
              Tap anywhere or press Escape to close
            </p>
          </div>
        </div>
      )}
    </>
  );
};
