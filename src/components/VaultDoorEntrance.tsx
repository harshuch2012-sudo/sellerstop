import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Lock, Unlock, ShieldCheck, ChevronRight, Activity, Cpu } from 'lucide-react';

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
  // Phase sequence:
  // 'locked' -> Idle state, waiting for tap with breathing glow & floating embers
  // 'unlocking' -> High-tech unsealing: iris rotation, pneumatic steam burst, pressure drop
  // 'parting' -> Heavy titanium doors glide open with 3D hydraulic perspective & light flare
  // 'done' -> Portal dissolved, website revealed
  const [phase, setPhase] = useState<'locked' | 'unlocking' | 'parting' | 'done'>('locked');
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 }); // percentage
  const [readoutText, setReadoutText] = useState<'SEALED' | 'DISENGAGING' | 'ACCESS GRANTED'>('SEALED');
  const [pressureVal, setPressureVal] = useState(1.013);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Floating ambient ember particles
  const particles = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: `${(i * 4.7 + 3) % 96}%`,
      top: `${(i * 7.9 + 12) % 88}%`,
      size: (i % 3) + 2,
      duration: 3 + (i % 4) * 1.5,
      delay: (i % 5) * 0.4,
      driftX: (i % 2 === 0 ? 1 : -1) * (15 + (i % 20)),
    }));
  }, []);

  // Multi-Stage Procedural Audio Synthesizer (Web Audio API)
  const playVaultHapticAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // 1. High-tech charging hum
      const humOsc = ctx.createOscillator();
      const humGain = ctx.createGain();
      humOsc.type = 'sine';
      humOsc.frequency.setValueAtTime(220, now);
      humOsc.frequency.exponentialRampToValueAtTime(880, now + 0.28);
      humGain.gain.setValueAtTime(0.08, now);
      humGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      humOsc.connect(humGain);
      humGain.connect(ctx.destination);
      humOsc.start(now);
      humOsc.stop(now + 0.35);

      // 2. Heavy titanium deadbolt clunk (Low sub-bass thump)
      const thumpOsc = ctx.createOscillator();
      const thumpGain = ctx.createGain();
      thumpOsc.type = 'triangle';
      thumpOsc.frequency.setValueAtTime(140, now + 0.08);
      thumpOsc.frequency.exponentialRampToValueAtTime(32, now + 0.45);
      thumpGain.gain.setValueAtTime(0.28, now + 0.08);
      thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      thumpOsc.connect(thumpGain);
      thumpGain.connect(ctx.destination);
      thumpOsc.start(now + 0.08);
      thumpOsc.stop(now + 0.52);

      // 3. Pneumatic air decompression hiss (white noise burst)
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      // Lowpass filter for smooth industrial hiss
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now + 0.1);
      filter.frequency.exponentialRampToValueAtTime(400, now + 0.45);
      filter.Q.value = 1.2;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12, now + 0.1);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      whiteNoise.start(now + 0.1);
      whiteNoise.stop(now + 0.48);

      // 4. Precision mechanical latch ratchet click
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'sawtooth';
      clickOsc.frequency.setValueAtTime(1800, now + 0.25);
      clickOsc.frequency.exponentialRampToValueAtTime(250, now + 0.38);
      clickGain.gain.setValueAtTime(0.09, now + 0.25);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start(now + 0.25);
      clickOsc.stop(now + 0.45);
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  // Check reduced motion preference on mount
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      if (onComplete) onComplete();
    }
  }, [onComplete]);

  // Handle manual replay triggers
  useEffect(() => {
    if (isManualTrigger && isOpenState) {
      setPhase('locked');
      setReadoutText('SEALED');
      setPressureVal(1.013);
    }
  }, [isManualTrigger, isOpenState]);

  // Track mouse coordinates for interactive volumetric lighting
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Primary interactive trigger: smooth cinematic progression
  const handleOpenDoor = () => {
    if (phase !== 'locked') return;
    playVaultHapticAudio();
    setPhase('unlocking');
    setReadoutText('DISENGAGING');

    // Smooth pressure countdown simulation
    let currentP = 1.013;
    const pInterval = setInterval(() => {
      currentP = Math.max(0, currentP - 0.22);
      setPressureVal(Number(currentP.toFixed(3)));
      if (currentP <= 0) clearInterval(pInterval);
    }, 90);

    // 0.45s: Decompression finishes, access granted
    const tReadout = setTimeout(() => {
      setReadoutText('ACCESS GRANTED');
    }, 450);

    // 0.7s: Pneumatic valves release, doors begin silky 3D glide
    const tParting = setTimeout(() => {
      setPhase('parting');
    }, 700);

    // 2.25s: Full cinematic glide and flare completed, smooth handoff to storefront
    const tDone = setTimeout(() => {
      clearInterval(pInterval);
      setPhase('done');
      if (onComplete) onComplete();
      if (onCloseManual) onCloseManual();
    }, 2250);

    return () => {
      clearInterval(pInterval);
      clearTimeout(tReadout);
      clearTimeout(tParting);
      clearTimeout(tDone);
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
      className={`fixed inset-0 z-[9999] pointer-events-auto overflow-hidden bg-black flex items-center justify-center select-none transition-colors duration-1000 ${
        phase === 'locked' ? 'cursor-pointer' : 'cursor-default'
      }`}
      id="sellerstop-vault-portal"
      onClick={handleOpenDoor}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1500px' }}
    >
      {/* Background Cinematic Looping Video running through the opening aperture */}
      <motion.div 
        animate={{
          scale: phase === 'parting' || phase === 'done' ? 1.14 : isHovered ? 1.05 : 1.02,
          filter: phase === 'parting' ? 'brightness(1.25)' : 'brightness(1)',
        }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-90"
          poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/82e7eb75-c65f-490a-99b5-f3d1cad54200.webp"
        >
          <source 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104036_bd6924f6-3c8e-417e-8465-6d03c8c2e9e6.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/90" />
      </motion.div>

      {/* Floating Ambient Golden Ember Sparks */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: phase === 'parting' ? [0.4, 1, 0] : [0.15, 0.75, 0.15],
              y: phase === 'parting' ? -120 : [-20, -70, -120],
              x: [0, p.driftX, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
            className="rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]"
          />
        ))}
      </div>

      {/* Interactive Cursor Spotlight Glow Effect */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-500 opacity-60"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}% ${mousePos.y}%, rgba(245, 158, 11, 0.12), transparent 70%)`,
        }}
      />

      {/* Direct Skip Entry in top corner */}
      <button
        type="button"
        onClick={handleSkipDirectly}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/80 hover:bg-neutral-900 border border-white/25 text-neutral-300 hover:text-white text-[11px] sm:text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-2xl group hover:border-amber-400/50"
        title="Direct Entry Without Vault Animation"
      >
        <span>Skip Directly</span>
        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform text-amber-400" />
      </button>

      {/* Pneumatic Lateral Steam Jet Plumes (Triggered on Unlocking) */}
      <AnimatePresence>
        {phase === 'unlocking' && (
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-48 pointer-events-none z-25 flex justify-between overflow-hidden">
            {/* Left Steam Plume */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0.2, x: 0 }}
              animate={{ opacity: [0, 0.65, 0], scaleY: 1.4, x: -35 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="w-24 h-full bg-gradient-to-r from-transparent via-amber-200/25 to-white/20 blur-xl"
            />
            {/* Right Steam Plume */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0.2, x: 0 }}
              animate={{ opacity: [0, 0.65, 0], scaleY: 1.4, x: 35 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="w-24 h-full bg-gradient-to-l from-transparent via-amber-200/25 to-white/20 blur-xl"
            />
          </div>
        )}
      </AnimatePresence>

      {/* ================= LEFT VAULT DOOR ================= */}
      <motion.div
        initial={{ x: 0, rotateY: 0 }}
        animate={{
          x: phase === 'parting' || phase === 'done' ? '-104%' : '0%',
          rotateY: phase === 'parting' ? -7 : 0,
        }}
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1], // Silky smooth quintic ease-out
        }}
        className="absolute top-0 bottom-0 left-0 w-1/2 z-20 bg-gradient-to-r from-neutral-950 via-neutral-900 to-[#121217] border-r border-amber-400/50 shadow-[20px_0_60px_rgba(0,0,0,0.85)] flex flex-col justify-between p-4 sm:p-8 md:p-10 overflow-hidden transform-gpu origin-left"
      >
        {/* Futuristic titanium grid pattern & rivets */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
        <div className={`absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-amber-500/20 via-amber-400/5 to-transparent pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-60'}`} />
        
        {/* Cybernetic seam glowing light on edge */}
        <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-amber-400 to-transparent animate-pulse" />

        {/* Top Door Label with Live Telemetry */}
        <div className="flex items-center gap-2 text-neutral-400 text-[9px] sm:text-[10px] tracking-widest uppercase font-mono">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
          <span className="truncate">GATE-01 <span className="hidden sm:inline">// WEST VAULT</span></span>
          <span className="hidden md:inline-block text-neutral-600">|</span>
          <span className="hidden md:inline text-amber-300/80 font-mono">PRESS: {pressureVal} ATM</span>
        </div>

        {/* Middle: Left Half of SELLERSTOP Shield & Title (Desktop & Tablet) */}
        <div className="hidden sm:block self-end text-right pr-6 sm:pr-12 md:pr-16 lg:pr-20">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-[10px] uppercase font-mono tracking-widest text-amber-300 mb-2 shadow-sm">
            <Cpu className="w-3 h-3 text-amber-400" />
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
          <span className="truncate">{readoutText}</span>
        </div>
      </motion.div>

      {/* ================= RIGHT VAULT DOOR ================= */}
      <motion.div
        initial={{ x: 0, rotateY: 0 }}
        animate={{
          x: phase === 'parting' || phase === 'done' ? '104%' : '0%',
          rotateY: phase === 'parting' ? 7 : 0,
        }}
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1], // Silky smooth quintic ease-out
        }}
        className="absolute top-0 bottom-0 right-0 w-1/2 z-20 bg-gradient-to-l from-neutral-950 via-neutral-900 to-[#121217] border-l border-amber-400/50 shadow-[-20px_0_60px_rgba(0,0,0,0.85)] flex flex-col justify-between p-4 sm:p-8 md:p-10 overflow-hidden transform-gpu origin-right"
      >
        {/* Futuristic titanium grid pattern & rivets */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
        <div className={`absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-amber-500/20 via-amber-400/5 to-transparent pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-60'}`} />
        
        {/* Cybernetic seam glowing light on edge */}
        <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-amber-400 to-transparent animate-pulse" />

        {/* Top Door Label with Live Telemetry */}
        <div className="flex items-center gap-2 text-neutral-400 text-[9px] sm:text-[10px] tracking-widest uppercase font-mono self-end">
          <span className="hidden md:inline text-amber-300/80 font-mono">HYDRAULIC: READY</span>
          <span className="hidden md:inline-block text-neutral-600">|</span>
          <span className="truncate">GATE-02 <span className="hidden sm:inline">// EAST VAULT</span></span>
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
        </div>

        {/* Middle: Right Half of SELLERSTOP Shield & Title (Desktop & Tablet) */}
        <div className="hidden sm:block self-start text-left pl-6 sm:pl-12 md:pl-16 lg:pr-20">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-[10px] uppercase font-mono tracking-widest text-amber-300 mb-2 shadow-sm">
            <Activity className="w-3 h-3 text-amber-400" />
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
          scale: phase === 'parting' || phase === 'done' ? 1.8 : phase === 'unlocking' ? 1.18 : isHovered ? 1.06 : 1,
          opacity: phase === 'parting' || phase === 'done' ? 0 : 1,
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-30 flex flex-col items-center justify-center pointer-events-auto px-4 max-w-full"
      >
        {/* Luminous Pulsing Core Flare */}
        <motion.div 
          animate={{
            scale: phase === 'unlocking' ? [1, 1.4, 1.2] : isHovered ? [1, 1.15, 1] : 1,
            opacity: phase === 'unlocking' ? 0.9 : 0.6,
          }}
          transition={{ duration: phase === 'unlocking' ? 0.6 : 2.5, repeat: phase === 'unlocking' ? 0 : Infinity, ease: 'easeInOut' }}
          className="absolute -inset-16 sm:-inset-24 bg-gradient-to-r from-amber-500/40 via-yellow-400/30 to-purple-600/40 rounded-full blur-3xl pointer-events-none" 
        />

        {/* Mobile Phone Dedicated Brand Display (100% complete, crisp, un-clipped & centered) */}
        <div className="sm:hidden flex flex-col items-center text-center px-2 mb-3 z-30 pointer-events-none max-w-[85vw]">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-[10px] uppercase font-mono tracking-widest text-amber-300 mb-1.5 shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-400 shrink-0 animate-pulse" />
            <span>OFFICIAL VAULT</span>
          </div>
          
          <div className="flex items-center justify-center gap-1.5">
            <span className="font-heading font-black text-3xl text-white tracking-tight drop-shadow-md">
              SELLER
            </span>
            <span className="font-heading font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 tracking-tight drop-shadow-md">
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
            <span className="absolute w-40 h-40 sm:w-56 sm:h-56 rounded-full border border-amber-400/35 animate-ping pointer-events-none" style={{ animationDuration: '2.8s' }} />
            <span className="absolute w-52 h-52 sm:w-72 sm:h-72 rounded-full border border-amber-400/20 pointer-events-none animate-pulse" />
            <span className="absolute w-64 h-64 sm:w-88 sm:h-88 rounded-full border border-dashed border-amber-400/10 pointer-events-none animate-spin" style={{ animationDuration: '45s' }} />
          </>
        )}

        {/* Interactive Central Rotating Multi-Ring Gear Aperture */}
        <div 
          className={`relative w-32 h-32 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full border-2 border-dashed border-amber-400/75 p-2 flex items-center justify-center transition-all shadow-[0_0_50px_rgba(245,158,11,0.4)] ${
            phase === 'unlocking' ? 'animate-spin border-amber-300' : 'animate-spin'
          }`}
          style={{ animationDuration: phase === 'unlocking' ? '1.2s' : '16s' }}
        >
          {/* Outer Geometric Tick Marks Ring */}
          <div className="absolute inset-1 rounded-full border border-amber-400/30 pointer-events-none" />

          {/* Inner Golden Rim Disc */}
          <div className="w-full h-full rounded-full border border-amber-300/60 bg-neutral-950/95 backdrop-blur-xl flex items-center justify-center shadow-inner group hover:border-amber-400 transition-colors relative overflow-hidden">
            
            {/* Shimmering Ambient Light Sweep across the Lock */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
            />

            {/* Center Lock Status & Touch Target */}
            <div className="flex flex-col items-center justify-center text-center p-2 sm:p-3 relative z-10">
              {phase === 'locked' ? (
                <div className="relative">
                  <Lock className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-amber-400 mb-0.5 sm:mb-1 animate-bounce" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-amber-400 rounded-full animate-ping" />
                </div>
              ) : (
                <Unlock className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-emerald-400 mb-0.5 sm:mb-1 animate-pulse" />
              )}
              
              <span className={`font-heading font-black text-[11px] sm:text-xs md:text-sm tracking-widest uppercase mt-0.5 sm:mt-1 ${
                phase === 'unlocking' ? 'text-emerald-400 animate-pulse' : 'text-white'
              }`}>
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
          className="mt-3.5 sm:mt-6 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-500/25 via-neutral-900 to-amber-500/25 border border-amber-400/60 text-[11px] sm:text-xs font-bold text-amber-300 tracking-wider backdrop-blur-md flex items-center gap-1.5 sm:gap-2 shadow-2xl hover:border-amber-300 hover:text-white transition-all cursor-pointer hover:shadow-amber-500/20"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 animate-spin shrink-0" style={{ animationDuration: '7s' }} />
          <span>TAP DOOR OR LOCK TO ENTER</span>
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 animate-pulse shrink-0" />
        </motion.div>
      </motion.div>

      {/* Volumetric Anamorphic Laser Flare as Doors Part */}
      {phase === 'parting' && (
        <>
          {/* Horizontal Golden Anamorphic Streak */}
          <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 6, opacity: [1, 0.9, 0] }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute inset-y-1/2 left-0 right-0 h-2 -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-200 to-transparent z-40 pointer-events-none shadow-[0_0_80px_#f59e0b]"
          />
          {/* Vertical Expanding Seam Light Beam */}
          <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 5, opacity: 0 }}
            transition={{ duration: 1.3, ease: 'easeOut' }}
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-16 bg-gradient-to-r from-transparent via-white to-transparent z-40 pointer-events-none shadow-[0_0_120px_#fff]"
          />
        </>
      )}
    </div>
  );
};
