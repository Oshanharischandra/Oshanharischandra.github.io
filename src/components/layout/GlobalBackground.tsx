import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useScroll, useVelocity, useReducedMotion } from 'framer-motion';

// Expanded IC blocks for higher density
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
  { id: 'ic11', x: 1400, y: 400, w: 80, h: 80 },
  { id: 'ic12', x: 100, y: 1800, w: 60, h: 120 },
  { id: 'ic13', x: 2300, y: 2000, w: 100, h: 60 },
  { id: 'ic14', x: 1200, y: 2800, w: 80, h: 80 },
  { id: 'ic15', x: 600, y: 4200, w: 60, h: 60 },
  { id: 'ic16', x: 1600, y: 5500, w: 100, h: 80 }
];

// Dense trace network using only 45-degree and 90-degree transitions (real routing)
// A corner like L200,100 L250,150 L250,300 ensures 45-deg chamfers
const TRACES = [
  // Top section
  { id: 1, d: "M-50,330 L170,330 L200,360", color: "#226bb1", width: 2 },
  { id: 2, d: "M260,330 L380,330 L430,280 L430,-50", color: "#96d3e8", width: 1.5 },
  { id: 3, d: "M230,360 L230,450 L300,520 L750,520 L800,570 L800,800", color: "#226bb1", width: 1.5 },
  { id: 4, d: "M900,190 L1350,190 L1400,240 L1400,400", color: "#96d3e8", width: 2 },
  { id: 5, d: "M1480,440 L2160,440 L2200,480 L2200,600", color: "#226bb1", width: 2 },
  { id: 6, d: "M2240,720 L2240,1150 L1890,1500 L1890,1800", color: "#96d3e8", width: 1.5 },
  
  // Mid section 1
  { id: 7, d: "M-50,1230 L450,1230 L500,1280", color: "#96d3e8", width: 2 },
  { id: 8, d: "M560,1230 L750,1230 L800,1280 L800,1780 L850,1830 L1800,1830", color: "#226bb1", width: 1.5 },
  { id: 9, d: "M1920,1830 L2250,1830 L2300,1880 L2300,2000", color: "#96d3e8", width: 1.5 },
  { id: 10, d: "M530,1260 L530,2450 L480,2500 L380,2500", color: "#226bb1", width: 2 },
  { id: 11, d: "M380,2540 L750,2540 L800,2590 L800,3100 L850,3150 L2000,3150", color: "#96d3e8", width: 1.5 },
  { id: 12, d: "M2030,3200 L2030,3800 L1980,3850 L1000,3850", color: "#226bb1", width: 2 },
  { id: 13, d: "M-50,2540 L250,2540 L300,2590", color: "#226bb1", width: 1.5 },
  { id: 14, d: "M2060,3150 L2510,3150 L2560,3200", color: "#96d3e8", width: 1.5 },
  
  // Lower section
  { id: 15, d: "M950,3900 L950,4590 L1000,4640 L2200,4640", color: "#96d3e8", width: 2 },
  { id: 16, d: "M950,3900 L950,5190 L900,5240 L520,5240", color: "#226bb1", width: 1.5 },
  { id: 17, d: "M460,5280 L460,5950 L410,6000", color: "#96d3e8", width: 2 },
  { id: 18, d: "M2240,4680 L2240,5950 L2290,6000", color: "#226bb1", width: 1.5 },
  { id: 19, d: "M-50,5240 L350,5240 L400,5290", color: "#226bb1", width: 1.5 },
  { id: 20, d: "M2280,4640 L2510,4640 L2560,4590", color: "#96d3e8", width: 1.5 },
  
  // Extra dense aesthetic traces (thinner)
  { id: 21, d: "M100,0 L100,150 L150,200 L250,200 L300,250 L300,300", color: "#226bb1", width: 1 },
  { id: 22, d: "M280,360 L280,650 L330,700 L750,700 L800,750 L800,1200", color: "#96d3e8", width: 1 },
  { id: 23, d: "M2220,600 L2220,550 L2170,500 L1850,500 L1800,450 L1800,-50", color: "#226bb1", width: 1 },
  { id: 24, d: "M1860,1860 L1860,2750 L1910,2800 L1950,2800 L2000,2850 L2000,3100", color: "#96d3e8", width: 1 },
  { id: 25, d: "M340,2580 L340,2950 L390,3000 L850,3000 L900,3050 L900,3800", color: "#226bb1", width: 1 },
  { id: 26, d: "M1000,3880 L1950,3880 L2000,3930 L2000,4550 L2050,4600 L2200,4600", color: "#96d3e8", width: 1 },
  { id: 27, d: "M160,1920 L160,2400 L210,2450 L260,2450 L300,2490 L300,2500", color: "#226bb1", width: 1.5 },
  { id: 28, d: "M1240,2880 L1240,3200 L1190,3250 L1100,3250 L1050,3300 L1050,3800", color: "#96d3e8", width: 1 },
  { id: 29, d: "M630,4260 L630,4800 L580,4850 L480,4850 L430,4900 L430,5200", color: "#226bb1", width: 1.5 },
  { id: 30, d: "M1650,5580 L1650,5800 L1700,5850 L2000,5850 L2050,5900 L2050,6000", color: "#96d3e8", width: 2 }
];

// Nodes at trace junctions or bends
const NODES = [
  { x: 170, y: 330 }, { x: 380, y: 330 }, { x: 430, y: 280 },
  { x: 230, y: 450 }, { x: 300, y: 520 }, { x: 750, y: 520 }, { x: 800, y: 570 },
  { x: 1350, y: 190 }, { x: 1400, y: 240 }, { x: 2160, y: 440 }, { x: 2200, y: 480 },
  { x: 2240, y: 1150 }, { x: 1890, y: 1500 }, { x: 450, y: 1230 }, { x: 750, y: 1230 },
  { x: 800, y: 1280 }, { x: 800, y: 1780 }, { x: 850, y: 1830 }, { x: 2250, y: 1830 },
  { x: 2300, y: 1880 }, { x: 530, y: 2450 }, { x: 480, y: 2500 }, { x: 750, y: 2540 },
  { x: 800, y: 2590 }, { x: 800, y: 3100 }, { x: 850, y: 3150 }, { x: 2030, y: 3800 },
  { x: 1980, y: 3850 }, { x: 250, y: 2540 }, { x: 2510, y: 3150 }, { x: 950, y: 4590 },
  { x: 1000, y: 4640 }, { x: 950, y: 5190 }, { x: 900, y: 5240 }, { x: 460, y: 5950 },
  { x: 410, y: 6000 }, { x: 2240, y: 5950 }, { x: 2290, y: 6000 }, { x: 350, y: 5240 },
  { x: 2510, y: 4640 }, { x: 100, y: 150 }, { x: 150, y: 200 }, { x: 250, y: 200 },
  { x: 300, y: 250 }, { x: 280, y: 650 }, { x: 330, y: 700 }, { x: 750, y: 700 },
  { x: 800, y: 750 }, { x: 2220, y: 550 }, { x: 2170, y: 500 }, { x: 1850, y: 500 },
  { x: 1800, y: 450 }, { x: 1860, y: 2750 }, { x: 1910, y: 2800 }, { x: 1950, y: 2800 },
  { x: 2000, y: 2850 }, { x: 340, y: 2950 }, { x: 390, y: 3000 }, { x: 850, y: 3000 },
  { x: 900, y: 3050 }, { x: 1950, y: 3880 }, { x: 2000, y: 3930 }, { x: 2000, y: 4550 },
  { x: 2050, y: 4600 }
];

const TraceLine = ({ trace, scrollVelocity, prefersReducedMotion }: { trace: any, scrollVelocity: any, prefersReducedMotion: boolean | null }) => {
  const controls = useAnimation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const firePulse = async () => {
    if (prefersReducedMotion) return;
    
    // High chance to fire to keep board active
    if (Math.random() > 0.3) {
      await controls.start({
        strokeDashoffset: [2500, -500],
        opacity: [0, 1, 1, 0],
        transition: { duration: 1.2, ease: "linear" }
      });
    }
    
    // Schedule next pulse much quicker for active board (1.5s to 4s)
    const nextInterval = 1500 + Math.random() * 2500;
    timeoutRef.current = setTimeout(firePulse, nextInterval);
  };

  useEffect(() => {
    if (!prefersReducedMotion) {
      timeoutRef.current = setTimeout(firePulse, Math.random() * 2000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const unsubscribe = scrollVelocity.on("change", (latest: number) => {
      if (Math.abs(latest) > 150 && Math.random() > 0.8) {
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
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.3}
      />
      {/* Animated pulse trace */}
      <motion.path
        d={trace.d}
        stroke="#96d3e8"
        strokeWidth={trace.width * 2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="150 3000"
        initial={{ strokeDashoffset: 2500, opacity: 0 }}
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
