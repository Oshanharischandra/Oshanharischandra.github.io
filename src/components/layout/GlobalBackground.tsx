import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useScroll, useVelocity, useReducedMotion } from 'framer-motion';

// Expanded traces covering ~6000px height to act as a unified board
const TRACES = [
  { id: 1, d: "M100,0 L100,150 L400,150 L500,250 L500,600", color: "#226bb1", width: 2 },
  { id: 2, d: "M-50,250 L600,250 L700,350 L700,1000", color: "#96d3e8", width: 1.5 },
  { id: 3, d: "M500,600 L300,800 L300,1200 L100,1400", color: "#226bb1", width: 2 },
  { id: 4, d: "M700,1000 L800,1100 L800,1800 L500,2100", color: "#96d3e8", width: 1 },
  { id: 5, d: "M100,1400 L100,2000 L300,2200 L300,2800", color: "#226bb1", width: 1.5 },
  { id: 6, d: "M500,2100 L500,2500 L800,2800 L800,3500", color: "#96d3e8", width: 1.5 },
  { id: 7, d: "M300,2800 L100,3000 L100,3800 L400,4100", color: "#226bb1", width: 2 },
  { id: 8, d: "M800,3500 L900,3600 L900,4200 L600,4500", color: "#96d3e8", width: 1 },
  { id: 9, d: "M400,4100 L400,4800 L200,5000 L200,5500", color: "#226bb1", width: 2 },
  { id: 10, d: "M600,4500 L600,5000 L800,5200 L800,5800", color: "#96d3e8", width: 1.5 },
  // Right side traces
  { id: 11, d: "M2500,0 L2500,400 L2200,700 L2200,1200", color: "#226bb1", width: 1.5 },
  { id: 12, d: "M2200,1200 L2000,1400 L2000,2000 L2300,2300", color: "#96d3e8", width: 2 },
  { id: 13, d: "M2300,2300 L2300,3000 L2000,3300 L2000,4000", color: "#226bb1", width: 1.5 },
  { id: 14, d: "M2000,4000 L2200,4200 L2200,4800 L1900,5100", color: "#96d3e8", width: 2 },
  { id: 15, d: "M1900,5100 L1900,5600 L2100,5800 L2100,6000", color: "#226bb1", width: 1.5 },
  // Cross connections
  { id: 16, d: "M500,600 L800,600 L900,700 L2200,700", color: "#226bb1", width: 1 },
  { id: 17, d: "M700,1800 L1000,1800 L1200,2000 L2000,2000", color: "#96d3e8", width: 1.5 },
  { id: 18, d: "M300,2800 L600,2800 L800,3000 L2300,3000", color: "#226bb1", width: 1 },
  { id: 19, d: "M400,4100 L700,4100 L900,4300 L2200,4300", color: "#96d3e8", width: 1.5 },
  { id: 20, d: "M200,5000 L500,5000 L700,5200 L1900,5200", color: "#226bb1", width: 1 }
];

const ICS = [
  { x: 400, y: 500, width: 60, height: 80 },
  { x: 2100, y: 1100, width: 80, height: 80 },
  { x: 700, y: 2000, width: 50, height: 100 },
  { x: 2000, y: 3200, width: 100, height: 60 },
  { x: 500, y: 4400, width: 60, height: 60 },
  { x: 1800, y: 5100, width: 80, height: 120 }
];

const TraceLine = ({ trace, scrollVelocity, prefersReducedMotion }: { trace: any, scrollVelocity: any, prefersReducedMotion: boolean | null }) => {
  const controls = useAnimation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const firePulse = async () => {
    if (prefersReducedMotion) return;
    
    // Only 60% chance to actually fire when triggered (adds randomness)
    if (Math.random() > 0.6) {
      await controls.start({
        pathLength: [0, 0.2, 0],
        pathOffset: [0, 0.8, 1],
        opacity: [0, 1, 0],
        transition: { duration: 1.2, ease: "linear" }
      });
    }
    
    // Schedule next pulse
    const nextInterval = 2000 + Math.random() * 4000; // 2s to 6s
    timeoutRef.current = setTimeout(firePulse, nextInterval);
  };

  useEffect(() => {
    if (!prefersReducedMotion) {
      const initialDelay = Math.random() * 3000;
      timeoutRef.current = setTimeout(firePulse, initialDelay);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const unsubscribe = scrollVelocity.on("change", (latest: number) => {
      if (Math.abs(latest) > 200) {
        // High scroll velocity, maybe trigger a pulse!
        if (Math.random() > 0.8) {
           firePulse();
        }
      }
    });
    return unsubscribe;
  }, [scrollVelocity, prefersReducedMotion]);

  return (
    <motion.g>
      {/* Base trace */}
      <path
        d={trace.d}
        stroke={trace.color}
        strokeWidth={trace.width}
        fill="none"
        opacity={0.15}
      />
      {/* Pulse trace */}
      <motion.path
        d={trace.d}
        stroke="#96d3e8"
        strokeWidth={trace.width * 1.5}
        fill="none"
        initial={{ opacity: 0, pathLength: 0, pathOffset: 0 }}
        animate={controls}
        style={{ filter: `drop-shadow(0 0 8px #96d3e8)` }}
      />
    </motion.g>
  );
};

const ICChip = ({ ic }: { ic: any }) => {
  const pinCount = Math.max(3, Math.floor(ic.height / 15));
  const pins = Array.from({ length: pinCount });
  
  return (
    <g opacity={0.15}>
      <rect x={ic.x} y={ic.y} width={ic.width} height={ic.height} fill="none" stroke="#aab6c6" strokeWidth="2" />
      {/* Left pins */}
      {pins.map((_, i) => (
        <line 
          key={`l-${i}`}
          x1={ic.x - 8} 
          y1={ic.y + 10 + i * (ic.height - 20) / (pinCount - 1)} 
          x2={ic.x} 
          y2={ic.y + 10 + i * (ic.height - 20) / (pinCount - 1)} 
          stroke="#aab6c6" 
          strokeWidth="2" 
        />
      ))}
      {/* Right pins */}
      {pins.map((_, i) => (
        <line 
          key={`r-${i}`}
          x1={ic.x + ic.width} 
          y1={ic.y + 10 + i * (ic.height - 20) / (pinCount - 1)} 
          x2={ic.x + ic.width + 8} 
          y2={ic.y + 10 + i * (ic.height - 20) / (pinCount - 1)} 
          stroke="#aab6c6" 
          strokeWidth="2" 
        />
      ))}
    </g>
  );
};

export default function GlobalBackground() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-[6000px] z-0 pointer-events-none opacity-50">
      {mounted && (
        <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="none" viewBox="0 0 2560 6000">
          {ICS.map((ic, i) => (
            <ICChip key={`ic-${i}`} ic={ic} />
          ))}
          {TRACES.map((trace) => (
            <TraceLine 
              key={trace.id} 
              trace={trace} 
              scrollVelocity={scrollVelocity} 
              prefersReducedMotion={prefersReducedMotion} 
            />
          ))}
        </svg>
      )}
    </div>
  );
}
