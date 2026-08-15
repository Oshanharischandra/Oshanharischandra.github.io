import { motion } from 'framer-motion';
import heroImg from '../../assets/hero.jpeg'; // TODO: Swap in a higher-resolution source image later

interface ProfileFrameProps {
  photoPosition?: string;
}

export default function ProfileFrame({ photoPosition = "center 20%" }: ProfileFrameProps) {
  return (
    <div className="relative w-72 h-[28rem] md:w-[26rem] md:h-[34rem] mx-auto flex items-center justify-center p-4">
      {/* Soft Glow Effect behind the panel */}
      <div 
        className="absolute inset-0 bg-secondary/10 blur-[60px] rounded-full"
        style={{ transform: 'scale(0.8)' }}
      />
      
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-secondary/80 rounded-tl-xl z-20 pointer-events-none drop-shadow-[0_0_8px_rgba(150,211,232,0.8)]" />
      <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-secondary/80 rounded-tr-xl z-20 pointer-events-none drop-shadow-[0_0_8px_rgba(150,211,232,0.8)]" />
      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-secondary/80 rounded-bl-xl z-20 pointer-events-none drop-shadow-[0_0_8px_rgba(150,211,232,0.8)]" />
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-secondary/80 rounded-br-xl z-20 pointer-events-none drop-shadow-[0_0_8px_rgba(150,211,232,0.8)]" />

      {/* Soft Vignette Clipped Image Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-full h-full flex items-center justify-center overflow-hidden z-10"
        style={{ 
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)'
        }}
      >
        <img 
          src={heroImg} 
          alt="Oshan Niluminda" 
          className="w-full h-full object-cover"
          style={{ objectPosition: photoPosition }}
        />
        
        {/* Subtle inner overlay for tech feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none mix-blend-overlay" />
      </motion.div>
    </div>
  );
}

