import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ProfileFrame from '../ui/ProfileFrame';

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">


      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col-reverse md:flex-row items-center justify-center gap-12 md:gap-24 z-10 pt-20 md:pt-0">
        
        {/* Left: Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 mt-12 md:mt-0 text-center md:text-left md:pr-12 relative z-20"
        >
          <div className="bg-background/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-muted/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] inline-block">
            <p className="text-secondary font-mono text-sm uppercase tracking-widest mb-4 flex items-center justify-center md:justify-start drop-shadow-md">
              <span className="w-8 h-[1px] bg-secondary mr-4 hidden md:block"></span>
              Hello, World. I am
            </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
            Oshan Harischandra
          </h1>
          <h2 className="text-xl md:text-3xl text-primary font-mono mb-6 shadow-primary/20 drop-shadow-md">
            Aspiring IoT Engineer
          </h2>
            <p className="text-muted text-lg leading-relaxed max-w-xl mx-auto md:mx-0 drop-shadow-md font-medium">
              I study at the University of Kelaniya, Faculty of Science, Department of Industrial Management, in a MIT/IT program, with a hands-on focus on IoT and embedded systems (ESP32/Arduino/STM32 projects, PCB design, sensors).
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#projects" className="px-8 py-3 bg-primary text-white font-mono text-sm uppercase tracking-wider rounded hover:bg-secondary hover:text-background transition-all shadow-[0_0_20px_rgba(34,107,177,0.3)] hover:shadow-[0_0_20px_rgba(150,211,232,0.5)] w-full sm:w-auto text-center">
                View Projects
              </a>
              <a href="#contact" className="px-8 py-3 border border-primary text-primary font-mono text-sm uppercase tracking-wider rounded hover:bg-primary/10 transition-colors w-full sm:w-auto text-center bg-background/50 backdrop-blur-sm">
                Contact Me
              </a>
            </div>
          </div>
        </motion.div>
        {/* Right: Profile Frame Container */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0 relative z-10"
        >
          <ProfileFrame />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="hidden md:flex absolute bottom-8 left-12 flex-col items-center z-20"
      >
        <span className="text-muted text-xs font-mono mb-2 uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-secondary" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
