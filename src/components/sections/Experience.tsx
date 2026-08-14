import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: "Hardware Lead",
    company: "Team MIZU - iDEASPRiNT Hackathon",
    period: "Recent",
    description: "Spearheaded hardware architecture and sensor integration for a rapid prototyping hackathon, delivering a functional IoT MVP under tight deadlines.",
    tags: ["Prototyping", "Sensor Integration", "Team Leadership"]
  },
  {
    id: 2,
    role: "Embedded Systems Developer",
    company: "Robofest Competition",
    period: "Past",
    description: "Developed and optimized firmware for autonomous robotics, focusing on real-time motor control and sensor data processing.",
    tags: ["Firmware", "Robotics", "C++"]
  },
  {
    id: 3,
    role: "Freelance CAD Designer",
    company: "Independent",
    period: "Ongoing",
    description: "Designing custom structural frames, enclosures, and precise 3D models using SolidWorks for various hardware projects and clients.",
    tags: ["SolidWorks", "3D Modeling", "Enclosure Design"]
  },
  {
    id: 4,
    role: "Mentee Lead - Group 17",
    company: "Industry Mentorship Program",
    period: "Ongoing",
    description: "Coordinating professional correspondence and technical milestones with industry mentor Mr. Thimitha Gamage, leading a group of engineering students.",
    tags: ["Leadership", "Professional Communication", "Project Management"]
  },
  {
    id: 5,
    role: "Technical Mentor",
    company: "VisionEdge - IdeaSprint",
    period: "Recent",
    description: "Guiding a junior student team on soil sensor integration and technical pitch development for the IdeaSprint competition.",
    tags: ["Mentorship", "Soil Sensors", "Pitching"]
  }
];

import { useCarousel } from '../../hooks/useCarousel';

export default function Experience() {
  const {
    carouselIndex,
    cardsPerView,
    setIsHovering,
    handleNext,
    handlePrev,
  } = useCarousel(
    experiences.length,
    (width) => width >= 768 ? 2 : 1,
    5000 // 5 seconds interval
  );

  const visibleExperiences = experiences.slice(carouselIndex, carouselIndex + cardsPerView);

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4 mb-12">
            <Briefcase className="text-secondary" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
              Experience & Leadership
            </h2>
          </div>

          <div 
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onFocus={() => setIsHovering(true)}
            onBlur={() => setIsHovering(false)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[300px]">
              <AnimatePresence mode="popLayout">
                {visibleExperiences.map((exp) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <div className="bg-surface/80 backdrop-blur-md border border-muted/20 p-8 rounded-xl h-full flex flex-col hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary origin-top transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
                      
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white font-mono">{exp.role}</h3>
                          <p className="text-secondary font-medium">{exp.company}</p>
                        </div>
                        <span className="text-xs font-mono text-muted/80 bg-background/50 px-3 py-1 rounded-full whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                      
                      <p className="text-muted leading-relaxed mb-6 flex-grow">{exp.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {exp.tags.map(tag => (
                          <span key={tag} className="font-mono text-xs text-primary/80 bg-primary/10 px-2 py-1 rounded">
                            {tag}
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
                {Array.from({ length: Math.ceil(experiences.length / cardsPerView) }).map((_, idx) => (
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
