import { motion, useReducedMotion } from 'framer-motion';

export default function GlobalBackground() {
  const prefersReducedMotion = useReducedMotion();

  // Traces expanded to cover a large scrollable area (absolute pixel coordinates)
  const traces = [
    { d: "M-50,150 L400,150 L500,250 L2500,250", color: "#226bb1", width: 2, delay: 0 },
    { d: "M-50,250 L600,250 L700,350 L2500,350", color: "#96d3e8", width: 1.5, delay: 0.2 },
    { d: "M-50,450 L300,450 L400,550 L800,550 L900,450 L2500,450", color: "#226bb1", width: 2, delay: 0.5 },
    { d: "M400,1000 L500,900 L2500,900", color: "#96d3e8", width: 1, delay: 0.7 },
    { d: "M600,-50 L600,200 L700,300 L2500,300", color: "#226bb1", width: 1.5, delay: 0.3 },
    { d: "M2500,1500 L1400,1500 L1300,1600 L-100,1600", color: "#96d3e8", width: 1.5, delay: 0.1 },
    { d: "M2500,2500 L1600,2500 L1500,2600 L-100,2600", color: "#226bb1", width: 2, delay: 0.8 },
    { d: "M-100,3000 L200,3000 L300,3100 L2500,3100", color: "#96d3e8", width: 1, delay: 0.4 },
    { d: "M-100,4000 L400,4000 L500,4100 L2500,4100", color: "#226bb1", width: 2, delay: 0.2 },
    { d: "M2500,4500 L1000,4500 L900,4600 L-100,4600", color: "#96d3e8", width: 1.5, delay: 0.6 },
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <svg width="100%" height="100%" className="absolute inset-0">
        {traces.map((trace, i) => (
          <motion.g key={i}>
            {/* The base static trace line */}
            <path
              d={trace.d}
              stroke={trace.color}
              strokeWidth={trace.width}
              fill="none"
              opacity={0.3}
            />
            {/* The animated 1-second pulse traveling along the line */}
            <path
              d={trace.d}
              stroke="#96d3e8"
              strokeWidth={trace.width * 1.5}
              fill="none"
              strokeDasharray="50 3000"
              className="animate-pulse-trace"
              style={{ 
                animationDelay: `${trace.delay}s`,
                filter: `drop-shadow(0 0 8px #96d3e8)` 
              }}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
