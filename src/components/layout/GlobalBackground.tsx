import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useScroll, useVelocity, useReducedMotion } from 'framer-motion';

// IC blocks
const ICS = [
  { id: 'ic1', x: 200, y: 300, w: 60, h: 60 },
  { id: 'ic2', x: 800, y: 150, w: 100, h: 80 },
  { id: 'ic3', x: 2200, y: 600, w: 80, h: 120 },
  { id: 'ic4', x: 500, y: 1200, w: 60, h: 60 },
  { id: 'ic5', x: 1800, y: 1800, w: 120, h: 60 },
  { id: 'ic6', x: 300, y: 2500, w: 80, h: 80 },
  { id: 'ic7', x: 2000, y: 3100, w: 60, h: 100 },
  { id: 'ic8', x: 900, y: 3800, w: 100, h: 100 },
  { id: 'ic9', x: 2200, y: 4600, w: 80, h: 80 },
  { id: 'ic10', x: 400, y: 5200, w: 120, h: 80 },
];

// Dense trace network. All traces end at an IC or connect ICs.
const TRACES = [
  // Top section
  { id: 1, d: "M-50,300 L150,300 L200,350", color: "#226bb1", width: 2 },
  { id: 2, d: "M260,330 L400,330 L450,280 L450,-50", color: "#96d3e8", width: 1.5 },
  { id: 3, d: "M230,360 L230,500 L800,1070 L800,230", color: "#226bb1", width: 1.5 },
  { id: 4, d: "M900,190 L2560,190", color: "#96d3e8", width: 2 },
  { id: 5, d: "M850,230 L850,550 L2200,660", color: "#226bb1", width: 2 },
  { id: 6, d: "M2240,720 L2240,1200 L1860,1580 L1860,1800", color: "#96d3e8", width: 1.5 },
  // Mid section 1
  { id: 7, d: "M-50,1230 L450,1230 L500,1280", color: "#96d3e8", width: 2 },
  { id: 8, d: "M560,1230 L800,1230 L800,1830 L1800,1830", color: "#226bb1", width: 1.5 },
  { id: 9, d: "M1920,1830 L2560,1830", color: "#96d3e8", width: 1.5 },
  { id: 10, d: "M530,1260 L530,2450 L380,2500", color: "#226bb1", width: 2 },
  { id: 11, d: "M380,2540 L800,2540 L800,3150 L2000,3150", color: "#96d3e8", width: 1.5 },
  { id: 12, d: "M2030,3200 L2030,3850 L1000,3850", color: "#226bb1", width: 2 },
  { id: 13, d: "M-50,2540 L300,2540", color: "#226bb1", width: 1.5 },
  { id: 14, d: "M2060,3150 L2560,3150", color: "#96d3e8", width: 1.5 },
  // Lower section
  { id: 15, d: "M950,3900 L950,4640 L2200,4640", color: "#96d3e8", width: 2 },
  { id: 16, d: "M950,3900 L950,5240 L520,5240", color: "#226bb1", width: 1.5 },
  { id: 17, d: "M460,5280 L460,6000", color: "#96d3e8", width: 2 },
  { id: 18, d: "M2240,4680 L2240,6000", color: "#226bb1", width: 1.5 },
  { id: 19, d: "M-50,5240 L400,5240", color: "#226bb1", width: 1.5 },
  { id: 20, d: "M2280,4640 L2560,4640", color: "#96d3e8", width: 1.5 },
  // Extra dense aesthetic traces
  { id: 21, d: "M100,0 L100,200 L200,300", color: "#226bb1", width: 1 },
  { id: 22, d: "M300,360 L300,700 L800,1200", color: "#96d3e8", width: 1 },
  { id: 23, d: "M2200,600 L1800,200 L1800,-50", color: "#226bb1", width: 1 },
  { id: 24, d: "M1860,1860 L1860,2800 L2000,2940 L2000,3100", color: "#96d3e8", width: 1 },
  { id: 25, d: "M340,2580 L340,3000 L900,3560 L900,3800", color: "#226bb1", width: 1 },
  { id: 26, d: "M1000,3850 L2000,3850 L2000,4600 L2200,4600", color: "#96d3e8", width: 1 }
];

// Nodes at trace junctions or bends
const NODES = [
  { x: 150, y: 300 }, { x: 400, y: 330 }, { x: 260, y: 330 }, { x: 450, y: 280 },
  { x: 230, y: 500 }, { x: 800, y: 1070 }, { x: 850, y: 550 }, { x: 2240, y: 1200 },
  { x: 1860, y: 1580 }, { x: 450, y: 1230 }, { x: 800, y: 1830 }, { x: 530, y: 2450 },
  { x: 800, y: 2540 }, { x: 800, y: 3150 }, { x: 2030, y: 3850 }, { x: 950, y: 4640 },
  { x: 950, y: 5240 }, { x: 100, y: 200 }, { x: 300, y: 700 }, { x: 800, y: 1200 },
  { x: 1800, y: 200 }, { x: 1860, y: 2800 }, { x: 2000, y: 2940 }, { x: 340, y: 3000 },
  { x: 900, y: 3560 }, { x: 2000, y: 3850 }, { x: 2000, y: 4600 }
];

const TraceLine = ({ trace, scrollVelocity, prefersReducedMotion }: { trace: any, scrollVelocity: any, prefersReducedMotion: boolean | null }) => {
  const controls = useAnimation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const firePulse = async () => {
    if (prefersReducedMotion) return;
    
    // Random chance to fire
    if (Math.random() > 0.4) {
      await controls.start({
        strokeDashoffset: [2000, -500],
        opacity: [0, 1, 1, 0],
        transition: { duration: 1.5, ease: "linear" }
      });
    }
    
    // Schedule next
    const nextInterval = 2000 + Math.random() * 4000;
    timeoutRef.current = setTimeout(firePulse, nextInterval);
  };

  useEffect(() => {
    if (!prefersReducedMotion) {
      timeoutRef.current = setTimeout(firePulse, Math.random() * 3000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const unsubscribe = scrollVelocity.on("change", (latest: number) => {
      if (Math.abs(latest) > 150 && Math.random() > 0.85) {
        firePulse();
      }
    });
    return unsubscribe;
  }, [scrollVelocity, prefersReducedMotion]);

  return (
    <g>
      {/* Base static trace */}
      <path
        d={trace.d}
        stroke={trace.color}
        strokeWidth={trace.width}
        fill="none"
        opacity={0.3}
      />
      {/* Animated pulse trace */}
      <motion.path
        d={trace.d}
        stroke="#96d3e8"
        strokeWidth={trace.width * 2}
        fill="none"
        strokeDasharray="150 3000"
        initial={{ strokeDashoffset: 2000, opacity: 0 }}
        animate={controls}
        style={{ filter: `drop-shadow(0 0 10px #96d3e8)` }}
      />
    </g>
  );
};

const ICChip = ({ ic }: { ic: any }) => {
  const pinCount = Math.max(3, Math.floor(ic.h / 15));
  const pins = Array.from({ length: pinCount });
  
  return (
    <g className="opacity-40">
      <rect x={ic.x} y={ic.y} width={ic.w} height={ic.h} fill="#283032" stroke="#96d3e8" strokeWidth="2" />
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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-[6000px] z-0 pointer-events-none opacity-60">
      {mounted && (
        <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="none" viewBox="0 0 2560 6000">
          
          {/* Base Traces & Pulses */}
          {TRACES.map((trace) => (
            <TraceLine 
              key={trace.id} 
              trace={trace} 
              scrollVelocity={scrollVelocity} 
              prefersReducedMotion={prefersReducedMotion} 
            />
          ))}

          {/* Node Dots */}
          {NODES.map((node, i) => (
            <circle key={`node-${i}`} cx={node.x} cy={node.y} r="3" fill="#96d3e8" opacity={0.6} />
          ))}

          {/* IC Blocks */}
          {ICS.map((ic) => (
            <ICChip key={ic.id} ic={ic} />
          ))}
          
        </svg>
      )}
    </div>
  );
}
