import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Lock, Unlock, Zap } from 'lucide-react';

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
  // Phase 0: Doors Locked, Video running
  // Phase 1: Unlocking sequence (spin, glow flare)
  // Phase 2: Doors parting left & right
  // Phase 3: Completed, doors fully open
  const [phase, setPhase] = useState<'locked' | 'unlocking' | 'parting' | 'done'>('locked');
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      if (onComplete) onComplete();
      return;
    }

    // Auto-sequence timing:
    // 0.6s: locked with video running & lock pulsing
    // 1.1s: unlocking flare
    // 1.8s: parting doors
    // 3.0s: completed
    const t1 = setTimeout(() => {
      setPhase('unlocking');
    }, 900);

    const t2 = setTimeout(() => {
      setPhase('parting');
    }, 1700);

    const t3 = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  // If manual replay requested
  useEffect(() => {
    if (isManualTrigger && isOpenState) {
      setPhase('locked');
      const t1 = setTimeout(() => setPhase('unlocking'), 800);
      const t2 = setTimeout(() => setPhase('parting'), 1600);
      const t3 = setTimeout(() => {
        setPhase('done');
        if (onCloseManual) onCloseManual();
      }, 2700);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isManualTrigger, isOpenState, onCloseManual]);

  const handleSkip = () => {
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
      className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden bg-black flex items-center justify-center select-none"
      id="sellerstop-vault-portal"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80" />
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-50 px-4 py-2 rounded-full bg-black/70 hover:bg-neutral-900 border border-white/20 text-neutral-300 hover:text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-xl"
      >
        <span>Enter Directly</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      {/* ================= LEFT VAULT DOOR ================= */}
      <motion.div
        initial={{ x: 0 }}
        animate={{
          x: phase === 'parting' || phase === 'done' ? '-100%' : '0%',
        }}
        transition={{
          duration: 1.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute top-0 bottom-0 left-0 w-1/2 z-20 bg-gradient-to-r from-neutral-950 via-neutral-900 to-[#121216] border-r border-amber-400/40 shadow-2xl flex flex-col justify-between p-6 sm:p-10 overflow-hidden"
      >
        {/* Futuristic titanium panel lines & rivets */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
        
        {/* Cybernetic seam glowing light on edge */}
        <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-amber-400 to-transparent animate-pulse" />

        {/* Top Door Label */}
        <div className="flex items-center gap-2 text-neutral-500 text-[10px] tracking-widest uppercase font-mono">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>GATE-01 // WEST WING</span>
        </div>

        {/* Middle: Left Half of SELLERSTOP Shield & Title */}
        <div className="self-end text-right pr-6 sm:pr-12">
          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 block">
            EST. 2024
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl text-white tracking-tighter">
            SELLER
          </h2>
          <p className="text-[11px] text-neutral-400 tracking-wider uppercase font-medium">
            Direct Overseas Drops
          </p>
        </div>

        {/* Bottom Status */}
        <div className="text-[10px] font-mono text-neutral-500 tracking-wider">
          STATUS: {phase === 'locked' ? 'SEALED' : phase === 'unlocking' ? 'DE-PRESSURIZING' : 'OPEN'}
        </div>
      </motion.div>

      {/* ================= RIGHT VAULT DOOR ================= */}
      <motion.div
        initial={{ x: 0 }}
        animate={{
          x: phase === 'parting' || phase === 'done' ? '100%' : '0%',
        }}
        transition={{
          duration: 1.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute top-0 bottom-0 right-0 w-1/2 z-20 bg-gradient-to-l from-neutral-950 via-neutral-900 to-[#121216] border-l border-amber-400/40 shadow-2xl flex flex-col justify-between p-6 sm:p-10 overflow-hidden"
      >
        {/* Futuristic titanium panel lines & rivets */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-amber-500/10 to-transparent pointer-events-none" />
        
        {/* Cybernetic seam glowing light on edge */}
        <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-amber-400 to-transparent animate-pulse" />

        {/* Top Door Label */}
        <div className="flex items-center gap-2 text-neutral-500 text-[10px] tracking-widest uppercase font-mono self-end">
          <span>GATE-02 // EAST WING</span>
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        </div>

        {/* Middle: Right Half of SELLERSTOP Shield & Title */}
        <div className="self-start text-left pl-6 sm:pl-12">
          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 block">
            CURATED IMPORTS
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl text-amber-400 tracking-tighter">
            STOP
          </h2>
          <p className="text-[11px] text-neutral-400 tracking-wider uppercase font-medium">
            Pan-India Express
          </p>
        </div>

        {/* Bottom Status */}
        <div className="text-[10px] font-mono text-neutral-500 tracking-wider self-end">
          CORE: ISHAN AGGARWAL
        </div>
      </motion.div>

      {/* ================= CENTER VAULT LOCK / IRIS MECHANISM ================= */}
      <motion.div
        animate={{
          scale: phase === 'parting' || phase === 'done' ? 1.6 : phase === 'unlocking' ? 1.1 : 1,
          opacity: phase === 'parting' || phase === 'done' ? 0 : 1,
        }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="relative z-30 flex flex-col items-center justify-center pointer-events-none"
      >
        {/* Luminous Core Flare */}
        <div className="absolute -inset-16 bg-gradient-to-r from-amber-500/30 via-yellow-400/20 to-purple-600/30 rounded-full blur-2xl animate-pulse" />

        {/* Outer Rotating Gear Ring */}
        <div 
          className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-dashed border-amber-400/60 p-2 flex items-center justify-center animate-spin"
          style={{ animationDuration: phase === 'unlocking' ? '2s' : '16s' }}
        >
          {/* Inner Golden Rim */}
          <div className="w-full h-full rounded-full border border-amber-300/40 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.4)]">
            
            {/* Center Lock Status */}
            <div className="flex flex-col items-center justify-center text-center p-3">
              {phase === 'locked' ? (
                <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 animate-bounce mb-1" />
              ) : (
                <Unlock className="w-7 h-7 sm:w-8 sm:h-8 text-amber-300 mb-1" />
              )}
              <span className="font-heading font-black text-xs sm:text-sm text-white tracking-widest uppercase">
                {phase === 'locked' ? 'AUTHENTICATING' : 'ACCESS GRANTED'}
              </span>
              <span className="text-[9px] text-amber-400 font-mono tracking-wider mt-0.5">
                ✦ SELLERSTOP ✦
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Hint Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-amber-400/30 text-[11px] font-semibold text-neutral-200 tracking-wider backdrop-blur-md flex items-center gap-2 shadow-xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Opening Vault Doors To The World&apos;s Viral Sourced Drops...</span>
        </motion.div>
      </motion.div>

      {/* Brilliant Laser Flare Sweep along seam as doors part */}
      {phase === 'parting' && (
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 3, opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-transparent via-white to-transparent z-40 pointer-events-none shadow-[0_0_80px_#fff]"
        />
      )}
    </div>
  );
};
