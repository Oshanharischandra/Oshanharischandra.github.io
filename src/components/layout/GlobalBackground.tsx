import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useScroll, useVelocity, useReducedMotion } from 'framer-motion';

// Expanded IC blocks for higher density
const ICS = [
  { id: 'ic1', x: 200, y: 300, w: 60, h: 60 },
  { id: 'ic2', x: 800, y: 150, w: 100, h: 80 },
  { id: 'ic3', x: 2200, y: 600, w: 80, h: 120 },
  { id: 'ic4', x: 500, y: 1200, w: 60, h: 60 },
  { id: 'ic5', x: 1800, y: 1800, w: 120, h: 60 }
];

const TRACES = [
  { id: 1, d: 'M 100,200 L 300,200 L 400,300 L 400,800 L 500,900 L 800,900 L 900,1000 L 900,1500', delay: 0 },
  { id: 2, d: 'M 100,220 L 280,220 L 380,320 L 380,820 L 480,920 L 780,920 L 880,1020 L 880,1500', delay: 0.3 },
  { id: 4, d: 'M 2500,500 L 2200,500 L 2100,600 L 2100,1200 L 1700,1600 L 1200,1600 L 1100,1700 L 1100,2500', delay: 0.2 },
  { id: 5, d: 'M 2500,520 L 2220,520 L 2120,620 L 2120,1220 L 1720,1620 L 1220,1620 L 1120,1720 L 1120,2500', delay: 0.5 },
  { id: 7, d: 'M 50,2200 L 400,2200 L 500,2300 L 500,3200 L 900,3600 L 1400,3600 L 1500,3700 L 1500,4500', delay: 0.1 },
  { id: 11, d: 'M 2500,3800 L 2200,3800 L 2000,4000 L 2000,4800 L 1500,5300 L 1000,5300 L 900,5400 L 900,6000', delay: 0.3 },
  { id: 14, d: 'M 800,0 L 800,1000 L 1200,1400 L 1200,3000 L 800,3400 L 800,6000', delay: 0.1 },
].map(t => ({...t, color: '#3a4649', width: 2}));

// Nodes at trace junctions or bends
const NODES = [
  { x: 100, y: 200 }, { x: 900, y: 1500 },
  { x: 100, y: 220 }, { x: 880, y: 1500 },
  { x: 2500, y: 500 }, { x: 1100, y: 2500 },
  { x: 2500, y: 520 }, { x: 1120, y: 2500 },
  { x: 50, y: 2200 }, { x: 1500, y: 4500 },
  { x: 2500, y: 3800 }, { x: 900, y: 6000 },
];

const TraceLine = ({ trace, prefersReducedMotion }: { trace: any, prefersReducedMotion: boolean | null }) => {
  return (
    <g>
      {/* Base static trace */}
      <path
        d={trace.d}
        stroke={trace.color}
        strokeWidth={trace.width}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.3}
      />
      {/* Animated pulse trace */}
      {!prefersReducedMotion && (
        <path
          d={trace.d}
          stroke="#96d3e8"
          strokeWidth={trace.width * 2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="200 4000"
          className="animate-pulse-trace"
          style={{ animationDelay: `${trace.delay}s` }}
        />
      )}
    </g>
  );
};

const ICChip = ({ ic }: { ic: any }) => {
  const pinCount = Math.max(3, Math.floor(ic.h / 15));
  const pins = Array.from({ length: pinCount });
  
  return (
    <g className="opacity-40" style={{ willChange: 'transform, opacity' }}>
      <rect x={ic.x} y={ic.y} width={ic.w} height={ic.h} fill="#283032" stroke="#96d3e8" strokeWidth="2" rx="2" />
      <rect x={ic.x + 4} y={ic.y + 4} width={ic.w - 8} height={ic.h - 8} fill="none" stroke="#226bb1" strokeWidth="1" opacity={0.5} />
      {/* Left pins */}
      {pins.map((_, i) => (
        <line 
          key={`l-${i}`}
          x1={ic.x - 8} 
          y1={ic.y + 10 + i * (ic.h - 20) / (pinCount - 1)} 
          x2={ic.x} 
          y2={ic.y + 10 + i * (ic.h - 20) / (pinCount - 1)} 
          stroke="#aab6c6" 
          strokeWidth="2" 
        />
      ))}
      {/* Right pins */}
      {pins.map((_, i) => (
        <line 
          key={`r-${i}`}
          x1={ic.x + ic.w} 
          y1={ic.y + 10 + i * (ic.h - 20) / (pinCount - 1)} 
          x2={ic.x + ic.w + 8} 
          y2={ic.y + 10 + i * (ic.h - 20) / (pinCount - 1)} 
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-[6000px] z-0 pointer-events-none opacity-60 overflow-hidden">
      {mounted && (
        <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="xMidYMid slice" viewBox="0 0 2560 6000">
          
          {/* Base Traces & Pulses */}
          {TRACES.map((trace, index) => {
            // Mobile pass: thin out the traces to reduce density/overhead without shrinking
            if (isMobile && index % 2 !== 0) return null;
            return (
              <TraceLine 
                key={trace.id} 
                trace={trace} 
                prefersReducedMotion={prefersReducedMotion} 
              />
            );
          })}

          {/* Node Dots */}
          {NODES.map((node, i) => {
            // Thin nodes on mobile similarly
            if (isMobile && i % 2 !== 0) return null;
            return (
              <circle key={`node-${i}`} cx={node.x} cy={node.y} r="3" fill="#96d3e8" opacity={0.6} />
            );
          })}

          {/* IC Blocks - Keep all IC blocks on mobile as requested */}
          {ICS.map((ic) => (
            <ICChip key={ic.id} ic={ic} />
          ))}
          
        </svg>
      )}
    </div>
  );
}
