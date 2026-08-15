import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Cpu, ChevronLeft, ChevronRight } from 'lucide-react';
import { skillsData } from '../../data/skills';
import { useCarousel } from '../../hooks/useCarousel';

export default function Skills() {
  const {
    carouselIndex,
    cardsPerView,
    setIsHovering,
    handleNext,
    handlePrev,
  } = useCarousel(
    skillsData.length,
    (width) => {
      if (width >= 1024) return 3;
      if (width >= 768) return 2;
      return 1;
    },
    5000 // 5 seconds interval
  );

  const visibleSkills = skillsData.slice(carouselIndex, carouselIndex + cardsPerView);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4 mb-12">
            <Cpu className="text-secondary" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
              Technical Arsenal
            </h2>
          </div>

          <div 
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onFocus={() => setIsHovering(true)}
            onBlur={() => setIsHovering(false)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[200px]">
              <AnimatePresence mode="wait">
                {visibleSkills.map((group) => (
                  <motion.div
                    key={group.category}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="h-full"
                  >
                    <div className="bg-background/80 backdrop-blur-sm border border-muted/20 rounded-lg p-6 hover:border-secondary/50 transition-colors h-full flex flex-col">
                      <h3 className="text-lg font-mono text-primary mb-4 border-b border-muted/20 pb-2">
                        {group.category}
                      </h3>
                      <div className="flex flex-wrap gap-2 flex-grow content-start">
                        {group.skills.map((skill) => (
                          <span 
                            key={skill}
                            className="px-3 py-1 text-sm bg-surface text-muted rounded-full border border-muted/10 hover:border-secondary hover:text-secondary hover:shadow-[0_0_10px_rgba(150,211,232,0.3)] transition-all cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex space-x-2">
                <button onClick={handlePrev} className="p-2 border border-muted/30 rounded text-muted hover:text-secondary hover:border-secondary transition-colors" aria-label="Previous">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={handleNext} className="p-2 border border-muted/30 rounded text-muted hover:text-secondary hover:border-secondary transition-colors" aria-label="Next">
                  <ChevronRight size={24} />
                </button>
              </div>
              
              {/* Dots */}
              <div className="flex space-x-2">
                {Array.from({ length: Math.ceil(skillsData.length / cardsPerView) }).map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-2 h-2 rounded-full transition-colors ${idx === Math.floor(carouselIndex / cardsPerView) ? 'bg-secondary' : 'bg-muted/30'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
