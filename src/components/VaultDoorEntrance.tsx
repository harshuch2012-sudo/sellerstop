import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Lock, Unlock, HandMetal, ShieldCheck, ChevronRight } from 'lucide-react';

interface VaultDoorEntranceProps {
  onComplete?: () => void;
  isManualTrigger?: boolean;
  isOpenState?: boolean;
  onCloseManual?: () => void;
}

export const VaultDoorEntrance: React.FC<VaultDoorEntranceProps> = ({
  onComplete,
  isManualTrigger = false,
  isOpenState,
  onCloseManual,
}) => {
  // Phase 'locked': Wait for user to TAP the door! Web only opens upon tap.
  // Phase 'unlocking': Lock mechanism rotates, unseals, pulses with golden flare.
  // Phase 'parting': Doors slide smoothly left and right revealing the website.
  // Phase 'done': Unmounted / completed.
  const [phase, setPhase] = useState<'locked' | 'unlocking' | 'parting' | 'done'>('locked');
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Soft mechanical audio feedback using native Web Audio API
  const playVaultHapticAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Low frequency hydraulic thump
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);

      // High-frequency mechanical gear click
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(1200, ctx.currentTime + 0.05);
      clickOsc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
      clickGain.gain.setValueAtTime(0.12, ctx.currentTime + 0.05);
      clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start(ctx.currentTime + 0.05);
      clickOsc.stop(ctx.currentTime + 0.2);
    } catch {
      // AudioContext unavailable or blocked by browser policy
    }
  };

  // Check reduced motion preference on mount
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      if (onComplete) onComplete();
    }
  }, [onComplete]);

  // If manual replay requested from Navbar or Hero
  useEffect(() => {
    if (isManualTrigger && isOpenState) {
      setPhase('locked');
    }
  }, [isManualTrigger, isOpenState]);

  // Primary interactive trigger: only opens when user taps door or lock
  const handleOpenDoor = () => {
    if (phase !== 'locked') return;
    playVaultHapticAudio();
    setPhase('unlocking');

    // 0.5s: Unlocking flare and de-pressurize
    const t1 = setTimeout(() => {
      setPhase('parting');
    }, 550);

    // 1.7s: Doors have parted, smooth reveal complete
    const t2 = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
      if (onCloseManual) onCloseManual();
    }, 1750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  };

  const handleSkipDirectly = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhase('done');
    if (onComplete) onComplete();
    if (onCloseManual) onCloseManual();
  };

  if (phase === 'done' && !isManualTrigger) {
    return null;
  }

  if (isManualTrigger && !isOpenState) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 z-[9999] pointer-events-auto overflow-hidden bg-black flex items-center justify-center select-none transition-colors duration-700 ${
        phase === 'locked' ? 'cursor-pointer' : 'cursor-default'
      }`}
      id="sellerstop-vault-portal"
      onClick={handleOpenDoor}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Cinematic Looping Video running through the opening aperture */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-90 scale-105"
          poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/82e7eb75-c65f-490a-99b5-f3d1cad54200.webp"
        >
          <source 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104036_bd6924f6-3c8e-417e-8465-6d03c8c2e9e6.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/85" />
      </div>

      {/* Direct Skip Entry in top corner */}
      <button
        type="button"
        onClick={handleSkipDirectly}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/75 hover:bg-neutral-900 border border-white/25 text-neutral-300 hover:text-white text-[11px] sm:text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-xl group"
        title="Direct Entry Without Vault Animation"
      >
        <span>Skip Directly</span>
        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* ================= LEFT VAULT DOOR ================= */}
      <motion.div
        initial={{ x: 0 }}
        animate={{
          x: phase === 'parting' || phase === 'done' ? '-102%' : '0%',
        }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute top-0 bottom-0 left-0 w-1/2 z-20 bg-gradient-to-r from-neutral-950 via-neutral-900 to-[#121217] border-r border-amber-400/40 shadow-2xl flex flex-col justify-between p-6 sm:p-10 overflow-hidden"
      >
        {/* Futuristic titanium grid pattern & rivets */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className={`absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-amber-500/15 to-transparent pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'}`} />
        
        {/* Cybernetic seam glowing light on edge */}
        <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-amber-400 to-transparent animate-pulse" />

        {/* Top Door Label */}
        <div className="flex items-center gap-2 text-neutral-400 text-[9px] sm:text-[10px] tracking-widest uppercase font-mono">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
          <span className="truncate">GATE-01 <span className="hidden sm:inline">// WEST VAULT</span></span>
        </div>

        {/* Middle: Left Half of SELLERSTOP Shield & Title (Desktop & Tablet) */}
        <div className="hidden sm:block self-end text-right pr-6 sm:pr-12 md:pr-16 lg:pr-20">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-[10px] uppercase font-mono tracking-widest text-amber-300 mb-2">
            <span>CURATED IMPORTS</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tighter">
            SELLER
          </h2>
          <p className="text-[11px] text-neutral-400 tracking-wider uppercase font-medium mt-1">
            Cadbury Silk • Energy Drinks • Belivita
          </p>
        </div>

        {/* Bottom Status */}
        <div className="text-[9px] sm:text-[10px] font-mono text-neutral-400 tracking-wider flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${phase === 'locked' ? 'bg-amber-400' : 'bg-emerald-400'} animate-pulse shrink-0`} />
          <span className="truncate">{phase === 'locked' ? 'SEALED' : phase === 'unlocking' ? 'UNSEALING' : 'OPEN'}</span>
        </div>
      </motion.div>

      {/* ================= RIGHT VAULT DOOR ================= */}
      <motion.div
        initial={{ x: 0 }}
        animate={{
          x: phase === 'parting' || phase === 'done' ? '102%' : '0%',
        }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute top-0 bottom-0 right-0 w-1/2 z-20 bg-gradient-to-l from-neutral-950 via-neutral-900 to-[#121217] border-l border-amber-400/40 shadow-2xl flex flex-col justify-between p-4 sm:p-8 md:p-10 overflow-hidden"
      >
        {/* Futuristic titanium grid pattern & rivets */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className={`absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-amber-500/15 to-transparent pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'}`} />
        
        {/* Cybernetic seam glowing light on edge */}
        <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-amber-400 to-transparent animate-pulse" />

        {/* Top Door Label */}
        <div className="flex items-center gap-2 text-neutral-400 text-[9px] sm:text-[10px] tracking-widest uppercase font-mono self-end">
          <span className="truncate">GATE-02 <span className="hidden sm:inline">// EAST VAULT</span></span>
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
        </div>

        {/* Middle: Right Half of SELLERSTOP Shield & Title (Desktop & Tablet) */}
        <div className="hidden sm:block self-start text-left pl-6 sm:pl-12 md:pl-16 lg:pr-20">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-[10px] uppercase font-mono tracking-widest text-amber-300 mb-2">
            <span>DIRECT OVERSEAS</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-amber-400 tracking-tighter">
            STOP
          </h2>
          <p className="text-[11px] text-neutral-400 tracking-wider uppercase font-medium mt-1">
            Pan-India Air Dispatch
          </p>
        </div>

        {/* Bottom Status */}
        <div className="text-[9px] sm:text-[10px] font-mono text-neutral-400 tracking-wider self-end flex items-center gap-1.5">
          <span className="truncate">ISHAN AGGARWAL</span>
          <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
        </div>
      </motion.div>

      {/* ================= CENTER VAULT LOCK / INTERACTIVE IRIS APERTURE ================= */}
      <motion.div
        animate={{
          scale: phase === 'parting' || phase === 'done' ? 1.7 : phase === 'unlocking' ? 1.15 : isHovered ? 1.05 : 1,
          opacity: phase === 'parting' || phase === 'done' ? 0 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 flex flex-col items-center justify-center pointer-events-auto px-4 max-w-full"
      >
        {/* Luminous Pulsing Core Flare */}
        <div className="absolute -inset-14 sm:-inset-20 bg-gradient-to-r from-amber-500/35 via-yellow-400/25 to-purple-600/35 rounded-full blur-3xl animate-pulse pointer-events-none" />

        {/* Mobile Phone Dedicated Brand Display (Fits 100% completely, crystal-clear and never cut off) */}
        <div className="sm:hidden flex flex-col items-center text-center px-2 mb-3 z-30 pointer-events-none max-w-[85vw]">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-[10px] uppercase font-mono tracking-widest text-amber-300 mb-1.5 shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
            <span>OFFICIAL VAULT</span>
          </div>
          
          <div className="flex items-center justify-center gap-1.5">
            <span className="font-heading font-black text-3xl text-white tracking-tight drop-shadow-md">
              SELLER
            </span>
            <span className="font-heading font-black text-3xl text-amber-400 tracking-tight drop-shadow-md">
              STOP
            </span>
          </div>

          <p className="text-[11px] text-neutral-300 tracking-wider uppercase font-medium mt-0.5">
            Imported • Popular • Premium
          </p>
        </div>

        {/* Outer Radiant Ripple Waves encouraging tap */}
        {phase === 'locked' && (
          <>
            <span className="absolute w-40 h-40 sm:w-56 sm:h-56 rounded-full border border-amber-400/30 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
            <span className="absolute w-52 h-52 sm:w-72 sm:h-72 rounded-full border border-amber-400/15 pointer-events-none" />
          </>
        )}

        {/* Interactive Central Rotating Gear Ring */}
        <div 
          className={`relative w-32 h-32 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full border-2 border-dashed border-amber-400/70 p-2 flex items-center justify-center transition-all shadow-[0_0_40px_rgba(245,158,11,0.35)] ${
            phase === 'unlocking' ? 'animate-spin border-amber-300' : 'animate-spin'
          }`}
          style={{ animationDuration: phase === 'unlocking' ? '1.5s' : '18s' }}
        >
          {/* Inner Golden Rim Disc */}
          <div className="w-full h-full rounded-full border border-amber-300/50 bg-neutral-950/95 backdrop-blur-xl flex items-center justify-center shadow-inner group hover:border-amber-400 transition-colors">
            
            {/* Center Lock Status & Touch Target */}
            <div className="flex flex-col items-center justify-center text-center p-2 sm:p-3">
              {phase === 'locked' ? (
                <div className="relative">
                  <Lock className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-amber-400 mb-0.5 sm:mb-1 animate-bounce" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-amber-400 rounded-full animate-ping" />
                </div>
              ) : (
                <Unlock className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-amber-300 mb-0.5 sm:mb-1 animate-pulse" />
              )}
              
              <span className="font-heading font-black text-[11px] sm:text-xs md:text-sm text-white tracking-widest uppercase mt-0.5 sm:mt-1">
                {phase === 'locked' ? 'TAP TO UNLOCK' : 'UNSEALING'}
              </span>
              
              <span className="text-[8px] sm:text-[9px] text-amber-400 font-mono tracking-wider mt-0.5 flex items-center gap-1">
                <span>✦</span>
                <span>SELLERSTOP</span>
                <span>✦</span>
              </span>
            </div>
          </div>
        </div>

        {/* Pulsing Interactive CTA Hint Pill */}
        <motion.div 
          animate={{
            y: [0, -4, 0],
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-3.5 sm:mt-6 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 via-neutral-900 to-amber-500/20 border border-amber-400/50 text-[11px] sm:text-xs font-bold text-amber-300 tracking-wider backdrop-blur-md flex items-center gap-1.5 sm:gap-2 shadow-2xl hover:border-amber-300 hover:text-white transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 animate-spin shrink-0" style={{ animationDuration: '8s' }} />
          <span>TAP DOOR OR LOCK TO ENTER</span>
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 animate-pulse shrink-0" />
        </motion.div>
      </motion.div>

      {/* Laser flare along the seam as doors slide open */}
      {phase === 'parting' && (
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 4, opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-transparent via-white to-transparent z-40 pointer-events-none shadow-[0_0_90px_#fff]"
        />
      )}
    </div>
  );
};
