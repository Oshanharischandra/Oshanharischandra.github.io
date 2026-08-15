import { motion } from 'framer-motion';
import heroImg from '../../assets/hero.jpeg'; // TODO: Swap in a higher-resolution source image later

interface ProfileFrameProps {
  photoPosition?: string;
}

export default function ProfileFrame({ photoPosition = "center 20%" }: ProfileFrameProps) {
  return (
    <div className="relative w-72 h-[28rem] md:w-[26rem] md:h-[34rem] mx-auto flex items-center justify-center p-4">
      {/* Glow Effect behind the panel */}
      <div 
        className="absolute inset-0 bg-secondary/10 blur-3xl rounded-2xl"
        style={{ transform: 'scale(0.8)' }}
      />
      
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-secondary rounded-tl-xl z-20 pointer-events-none drop-shadow-[0_0_8px_rgba(150,211,232,0.8)]" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-secondary rounded-tr-xl z-20 pointer-events-none drop-shadow-[0_0_8px_rgba(150,211,232,0.8)]" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-secondary rounded-bl-xl z-20 pointer-events-none drop-shadow-[0_0_8px_rgba(150,211,232,0.8)]" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-secondary rounded-br-xl z-20 pointer-events-none drop-shadow-[0_0_8px_rgba(150,211,232,0.8)]" />

      {/* Animated SVG Rectangular Border */}
      <svg 
        className="absolute inset-0 w-full h-full drop-shadow-[0_0_12px_rgba(150,211,232,0.5)] z-20 pointer-events-none"
        preserveAspectRatio="none"
      >
        <motion.rect
          x="1" y="1" width="100%" height="100%" rx="16" ry="16"
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
          // Using style to override the width/height to properly fit inside SVG keeping a 1px gap for stroke
          style={{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)' }}
        />
      </svg>

      {/* Rounded Rect Clipped Image Container */}
      <div 
        className="relative w-full h-full bg-surface flex items-center justify-center overflow-hidden z-10 rounded-2xl shadow-xl border border-secondary/20"
      >
        <img 
          src={heroImg} 
          alt="Oshan Niluminda" 
          className="w-full h-full object-cover"
          style={{ objectPosition: photoPosition }}
        />
        
        {/* Subtle inner overlay for tech feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none mix-blend-multiply" />
      </div>
    </div>
  );
}
