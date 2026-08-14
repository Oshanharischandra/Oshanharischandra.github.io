import { motion, useReducedMotion } from 'framer-motion';

export default function GlobalBackground() {
  const prefersReducedMotion = useReducedMotion();

  // Expanded traces to cover more of the screen
  const traces = [
    { d: "M-50,15vh L20vw,15vh L25vw,20vh L110vw,20vh", color: "#226bb1", width: 2, delay: 0 },
    { d: "M-50,25vh L30vw,25vh L35vw,20vh L110vw,20vh", color: "#96d3e8", width: 1.5, delay: 0.2 },
    { d: "M-50,45vh L15vw,45vh L20vw,50vh L40vw,50vh L45vw,45vh L110vw,45vh", color: "#226bb1", width: 2, delay: 0.5 },
    { d: "M20vw,60vh L25vw,55vh L110vw,55vh", color: "#96d3e8", width: 1, delay: 0.7 },
    { d: "M30vw,-5vh L30vw,10vh L35vw,15vh L110vw,15vh", color: "#226bb1", width: 1.5, delay: 0.3 },
    { d: "M110vw,70vh L70vw,70vh L65vw,75vh L-10vw,75vh", color: "#96d3e8", width: 1.5, delay: 0.1 },
    { d: "M110vw,85vh L80vw,85vh L75vw,90vh L-10vw,90vh", color: "#226bb1", width: 2, delay: 0.8 },
    { d: "M-10vw,80vh L10vw,80vh L15vw,95vh L110vw,95vh", color: "#96d3e8", width: 1, delay: 0.4 },
  ];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
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
            {!prefersReducedMotion && (
              <motion.path
                d={trace.d}
                stroke="#96d3e8" // Bright blue pulse
                strokeWidth={trace.width * 1.5}
                fill="none"
                strokeDasharray="15 1000"
                initial={{ strokeDashoffset: 1015, opacity: 0 }}
                animate={{ strokeDashoffset: [-15], opacity: [0, 1, 0] }}
                transition={{ 
                  duration: 1, // Exactly 1-second pulse loop
                  delay: trace.delay, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                style={{ filter: `drop-shadow(0 0 8px #96d3e8)` }}
              />
            )}
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
