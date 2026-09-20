import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, ArrowRight, Sparkles, Shield, ChevronRight } from 'lucide-react';

interface VaultDoorEntranceProps {
  onComplete?: () => void;
  isManualTrigger?: boolean;
  isOpenState?: boolean;
  onCloseManual?: () => void;
}

type VaultPhase = 'locked' | 'unlocking' | 'parting' | 'completed';

export const VaultDoorEntrance: React.FC<VaultDoorEntranceProps> = ({
  onComplete,
  isManualTrigger = false,
  isOpenState = false,
  onCloseManual,
}) => {
  const [phase, setPhase] = useState<VaultPhase>('locked');
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth, pleasant luxury audio feedback (gentle warm acoustic tone, error-guarded)
  const playUnlockSound = useCallback(() => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // Warm low-frequency bass pulse (solid heavy door release)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(140, now);
      subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.35);

      subGain.gain.setValueAtTime(0.2, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.4);

      // Warm acoustic chime (luxury harmonic resonance)
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = 'triangle';
      chimeOsc.frequency.setValueAtTime(587.33, now + 0.05); // D5
      chimeOsc.frequency.exponentialRampToValueAtTime(880, now + 0.22); // A5

      chimeGain.gain.setValueAtTime(0.12, now + 0.05);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeOsc.start(now + 0.05);
      chimeOsc.stop(now + 0.48);
    } catch {
      // AudioContext unavailable or blocked by browser policy
    }
  }, []);

  // Handle opening sequence
  const handleOpenVault = useCallback(() => {
    if (phase !== 'locked') return;

    playUnlockSound();
    setPhase('unlocking');

    // Smooth choreographed transition:
    // 1. Center seal unlocks (180ms)
    // 2. Heavy doors part smoothly (1000ms)
    // 3. Complete and handoff to the store
    const timerParting = setTimeout(() => {
      setPhase('parting');
    }, 180);

    const timerComplete = setTimeout(() => {
      setPhase('completed');
      if (onComplete) onComplete();
      if (onCloseManual) onCloseManual();
    }, 1250);

    return () => {
      clearTimeout(timerParting);
      clearTimeout(timerComplete);
    };
  }, [phase, playUnlockSound, onComplete, onCloseManual]);

  // Handle immediate skip
  const handleSkip = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setPhase('completed');
      if (onComplete) onComplete();
      if (onCloseManual) onCloseManual();
    },
    [onComplete, onCloseManual]
  );

  // Check reduced-motion preference
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('completed');
      if (onComplete) onComplete();
    }
  }, [onComplete]);

  // Reset when manually re-triggered
  useEffect(() => {
    if (isManualTrigger && isOpenState) {
      setPhase('locked');
    }
  }, [isManualTrigger, isOpenState]);

  // Keyboard controls: Enter or Space to open, Esc to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase !== 'locked') return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleOpenVault();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setPhase('completed');
        if (onComplete) onComplete();
        if (onCloseManual) onCloseManual();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, handleOpenVault, onComplete, onCloseManual]);

  // Mouse move for subtle volumetric light tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  if (phase === 'completed' && !isManualTrigger) {
    return null;
  }

  if (isManualTrigger && !isOpenState) {
    return null;
  }

  const isParting = phase === 'parting' || phase === 'completed';

  return (
    <div
      id="sellerstop-vault-door-entrance"
      role="dialog"
      aria-label="SELLERSTOP Private Vault Entrance"
      aria-modal="true"
      onClick={phase === 'locked' ? handleOpenVault : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed inset-0 z-[9999] overflow-hidden bg-neutral-950 flex items-center justify-center select-none ${
        phase === 'locked' ? 'cursor-pointer' : 'cursor-default pointer-events-none'
      }`}
    >
      {/* Background Ambience: Cinematic Preview Video behind the parting doors */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isParting ? 'scale-105 opacity-100' : 'scale-100 opacity-60'
          }`}
          poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/82e7eb75-c65f-490a-99b5-f3d1cad54200.webp"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104036_bd6924f6-3c8e-417e-8465-6d03c8c2e9e6.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-xs" />
      </div>

      {/* Subtle Dynamic Ambient Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-700 opacity-70"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}% ${mousePos.y}%, rgba(245, 158, 11, 0.12), transparent 70%)`,
        }}
      />

      {/* Direct Skip Button */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-5 right-5 sm:top-7 sm:right-7 z-50 px-4 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/80 text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-2 shadow-xl hover:border-amber-400/50 pointer-events-auto group"
        aria-label="Skip vault entrance and enter store directly"
      >
        <span>Skip to Store</span>
        <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* ================= LEFT VAULT DOOR ================= */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isParting ? '-102%' : '0%' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 bottom-0 left-0 w-1/2 z-20 bg-gradient-to-r from-neutral-950 via-neutral-900 to-[#141416] border-r-2 border-amber-400/60 shadow-[24px_0_60px_rgba(0,0,0,0.95)] flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden"
      >
        {/* Fine Architectural Grid & Grain */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-amber-500/15 to-transparent pointer-events-none" />

        {/* Top Header Corner */}
        <div className="flex items-center gap-2 text-neutral-400 text-[10px] sm:text-xs tracking-widest uppercase font-mono">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>EST. 2024</span>
          <span className="hidden sm:inline text-neutral-600">•</span>
          <span className="hidden sm:inline text-neutral-400">CURATED IMPORTS</span>
        </div>

        {/* Middle Brand Block (Desktop / Tablet) */}
        <div className="hidden sm:block self-end text-right pr-4 sm:pr-8 md:pr-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-[10px] uppercase font-semibold tracking-widest text-amber-300 mb-3">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>EXCLUSIVE DROP</span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
            SELLER
          </h2>
          <p className="text-xs text-neutral-400 tracking-wider uppercase font-medium mt-1">
            Chocolates • Energy • Biscuits
          </p>
        </div>

        {/* Bottom Status */}
        <div className="text-[10px] sm:text-xs font-mono text-neutral-400 tracking-wider flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>VAULT ARCHIVE</span>
        </div>
      </motion.div>

      {/* ================= RIGHT VAULT DOOR ================= */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isParting ? '102%' : '0%' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 bottom-0 right-0 w-1/2 z-20 bg-gradient-to-l from-neutral-950 via-neutral-900 to-[#141416] border-l-2 border-amber-400/60 shadow-[-24px_0_60px_rgba(0,0,0,0.95)] flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden"
      >
        {/* Fine Architectural Grid & Grain */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-amber-500/15 to-transparent pointer-events-none" />

        {/* Top Header Corner */}
        <div className="flex items-center gap-2 text-neutral-400 text-[10px] sm:text-xs tracking-widest uppercase font-mono self-end">
          <span className="hidden sm:inline text-neutral-400">PAN-INDIA DISPATCH</span>
          <span className="hidden sm:inline text-neutral-600">•</span>
          <span>AUTHENTIC BATCHES</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Middle Brand Block (Desktop / Tablet) */}
        <div className="hidden sm:block self-start text-left pl-4 sm:pl-8 md:pl-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-[10px] uppercase font-semibold tracking-widest text-amber-300 mb-3">
            <Shield className="w-3 h-3 text-amber-400" />
            <span>100% VERIFIED</span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-6xl text-amber-400 tracking-tight">
            STOP
          </h2>
          <p className="text-xs text-neutral-400 tracking-wider uppercase font-medium mt-1">
            Belivita Luxury Perfumes
          </p>
        </div>

        {/* Bottom Status */}
        <div className="text-[10px] sm:text-xs font-mono text-neutral-400 tracking-wider self-end flex items-center gap-2">
          <span>CURATED BY ISHAN AGGARWAL</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>
      </motion.div>

      {/* ================= CENTER VAULT EMBOSSED SEAL & LOCK ================= */}
      <motion.div
        animate={{
          scale: isParting ? 1.25 : phase === 'unlocking' ? 1.08 : isHovered ? 1.04 : 1,
          opacity: isParting ? 0 : 1,
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-30 flex flex-col items-center justify-center p-4 pointer-events-none"
      >
        {/* Ambient Warm Golden Halo Glow */}
        <div className="absolute -inset-10 sm:-inset-16 bg-gradient-to-r from-amber-500/30 via-yellow-400/20 to-amber-600/30 rounded-full blur-3xl pointer-events-none" />

        {/* Mobile Brand Title (Clean & Centered) */}
        <div className="sm:hidden flex flex-col items-center text-center mb-4 z-30">
          <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase mb-1">
            Private Vault Collection
          </span>
          <div className="flex items-center gap-1">
            <span className="font-heading font-black text-3xl text-white">SELLER</span>
            <span className="font-heading font-black text-3xl text-amber-400">STOP</span>
          </div>
          <span className="text-[11px] text-neutral-400 mt-0.5">
            Imported • Popular • Premium
          </span>
        </div>

        {/* Central Rotating Architectural Ring & Medallion */}
        <div
          className={`relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full border-2 border-dashed border-amber-400/70 p-2.5 flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.35)] transition-all ${
            phase === 'unlocking' ? 'border-amber-300 animate-spin' : ''
          }`}
          style={{ animationDuration: phase === 'unlocking' ? '0.7s' : '20s' }}
        >
          {/* Outer Ring Tick Accents */}
          <div className="absolute inset-1.5 rounded-full border border-amber-400/40 pointer-events-none" />

          {/* Inner Solid Brushed Vault Core */}
          <div className="w-full h-full rounded-full border-2 border-amber-400/60 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 flex flex-col items-center justify-center p-3 text-center shadow-2xl relative overflow-hidden group">
            {/* Subtle Metallic Shimmer Reflection */}
            <motion.div
              animate={{ x: ['-120%', '220%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
            />

            {/* Lock Icon */}
            <div className="relative mb-1">
              {phase === 'locked' ? (
                <Lock className="w-7 h-7 sm:w-9 sm:h-9 text-amber-400 animate-pulse" />
              ) : (
                <Unlock className="w-7 h-7 sm:w-9 sm:h-9 text-emerald-400 animate-bounce" />
              )}
            </div>

            {/* Core Label */}
            <span
              className={`font-heading font-black text-xs sm:text-sm tracking-wider uppercase ${
                phase === 'unlocking' ? 'text-emerald-400' : 'text-white'
              }`}
            >
              {phase === 'locked' ? 'ENTER VAULT' : 'OPENING'}
            </span>

            <span className="text-[9px] sm:text-[10px] text-amber-300/90 font-mono tracking-widest mt-0.5">
              SELLERSTOP
            </span>
          </div>
        </div>

        {/* Tactile Call-To-Action Pill Button */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-5 px-5 py-2.5 rounded-full bg-neutral-900/95 border border-amber-400/50 hover:border-amber-400 text-xs font-bold text-amber-300 tracking-wider shadow-2xl backdrop-blur-md flex items-center gap-2 group transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>TAP ANYWHERE TO UNLOCK</span>
          <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
        </motion.div>
      </motion.div>
    </div>
  );
};
