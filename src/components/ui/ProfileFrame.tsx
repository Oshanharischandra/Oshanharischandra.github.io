import { motion } from 'framer-motion';

export default function ProfileFrame() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto flex items-center justify-center">
      {/* Glow Effect behind the hexagon */}
      <div 
        className="absolute inset-0 bg-secondary/20 blur-2xl rounded-full"
        style={{ transform: 'scale(0.8)' }}
      />
      
      {/* Animated SVG Border */}
      <svg 
        viewBox="0 0 100 100" 
        className="absolute inset-0 w-full h-full drop-shadow-[0_0_15px_rgba(150,211,232,0.6)] z-20 pointer-events-none"
        preserveAspectRatio="none"
      >
        <motion.polygon 
          points="50,2 98,25 98,75 50,98 2,75 2,25"
          fill="none"
          stroke="#96d3e8"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ 
            duration: 2.5, 
            ease: "easeInOut",
            opacity: { duration: 0.5 }
          }}
        />
        {/* Corner Accent Dots */}
        {[
          "50,2", "98,25", "98,75", "50,98", "2,75", "2,25"
        ].map((point, index) => {
          const [cx, cy] = point.split(",");
          return (
            <motion.circle 
              key={index}
              cx={cx} cy={cy} r="1.5" 
              fill="#226bb1"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5 + (index * 0.1), duration: 0.3 }}
            />
          );
        })}
      </svg>

      {/* Hexagon Clipped Image Container */}
      <div 
        className="relative w-[96%] h-[96%] bg-surface flex items-center justify-center overflow-hidden z-10"
        style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
      >
        {/* Placeholder text. Replace this inner content with an actual <img src="..." /> later */}
        <span className="text-muted font-mono text-sm opacity-50 text-center px-4">
          [Photo Placeholder]
        </span>
      </div>
    </div>
  );
}
