import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Cpu, Wifi, Activity, Zap, Radio, Server, Bluetooth, CircuitBoard } from 'lucide-react';

const ICONS = [Cpu, Wifi, Activity, Zap, Radio, Server, Bluetooth, CircuitBoard];

// Deterministic random generator for consistent hydration (or just run on client)
const generateElements = () => {
  const elements = [];
  // Generate 24 elements to distribute across the page height
  for (let i = 0; i < 24; i++) {
    elements.push({
      id: i,
      Icon: ICONS[i % ICONS.length],
      top: `${(i / 24) * 100 + (Math.random() * 4 - 2)}%`, // Distribute vertically 0-100%
      left: i % 2 === 0 ? `${5 + Math.random() * 20}%` : `${75 + Math.random() * 20}%`, // Alternate left/right edges
      size: 60 + Math.random() * 80, // 60px to 140px
      parallax: 0.1 + Math.random() * 0.3, // 0.1 to 0.4
      driftX: (Math.random() - 0.5) * 50, // Drift pixels X
      driftY: (Math.random() - 0.5) * 50, // Drift pixels Y
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 360 + (Math.random() > 0.5 ? 360 : -360), // Rotate 360deg over duration
      duration: 15 + Math.random() * 25, // 15 to 40 seconds
    });
  }
  return elements;
};

// Extracted into a separate component to safely use hooks per element
const MotifElement = ({ el, scrollY, prefersReducedMotion }: { el: any, scrollY: any, prefersReducedMotion: boolean | null }) => {
  // Parallax effect: items move DOWN as you scroll down, making them scroll slower than the page.
  const yOffset = useTransform(scrollY, [0, 5000], [0, prefersReducedMotion ? 0 : 5000 * el.parallax]);
  
  return (
    <motion.div
      className="absolute text-muted/10"
      style={{
        top: el.top,
        left: el.left,
        y: yOffset,
      }}
      initial={{ 
        rotate: el.rotateStart, 
        rotateX: el.rotateStart / 4,
        rotateY: el.rotateStart / 4,
        x: 0, 
        y: 0 
      }}
      animate={prefersReducedMotion ? {} : {
        rotate: [el.rotateStart, el.rotateEnd],
        rotateX: [el.rotateStart / 4, (el.rotateStart / 4) + 180],
        rotateY: [el.rotateStart / 4, (el.rotateStart / 4) + 180],
        x: [0, el.driftX, 0],
      }}
      transition={{
        duration: el.duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <el.Icon size={el.size} strokeWidth={1} />
    </motion.div>
  );
};

export default function IoTMotifs() {
  const [elements, setElements] = useState<ReturnType<typeof generateElements>>([]);
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Client-side only to avoid SSR mismatch
    const elts = generateElements();
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Set elements (halve on mobile)
    setElements(isMobile ? elts.filter((_, i) => i % 2 === 0) : elts);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <MotifElement 
          key={el.id} 
          el={el} 
          scrollY={scrollY} 
          prefersReducedMotion={prefersReducedMotion} 
        />
      ))}
    </div>
  );
}
