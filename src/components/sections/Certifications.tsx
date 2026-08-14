import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, LayoutGrid, X } from 'lucide-react';
import { useCarousel } from '../../hooks/useCarousel';

const certifications = [
  {
    id: 1,
    title: "Robofest Competition",
    issuer: "Robotics Club",
    date: "2025",
    description: "Participated and built a maze-solving robot. Gained practical experience in PID control and PlatformIO."
  },
  {
    id: 2,
    title: "iDEASPRiNT Hackathon",
    issuer: "Innovation Hub",
    date: "2023",
    description: "Developed SafeX Wearable Health Monitor as part of Team MIZU."
  },
  {
    id: 3,
    title: "A- Grade in IoT Concept Proposals",
    issuer: "University of Kelaniya",
    date: "2023",
    description: "Awarded for exceptional design and feasibility in proposing industrial IoT architectures."
  },
  {
    id: 4,
    title: "Embedded Systems Specialization",
    issuer: "Coursera",
    date: "2022",
    description: "Comprehensive coursework on ARM Cortex-M architecture and RTOS fundamentals."
  },
  {
    id: 5,
    title: "PCB Design Masterclass",
    issuer: "Altium",
    date: "2022",
    description: "Advanced multi-layer board routing and signal integrity principles."
  }
];

const CertCard = ({ cert }: { cert: typeof certifications[0] }) => (
  <div className="bg-surface/80 backdrop-blur-md border border-muted/20 p-6 rounded-lg hover:border-secondary/50 hover:bg-surface/90 transition-all group flex flex-col h-full hover:shadow-[0_4px_20px_rgba(34,107,177,0.15)] relative overflow-hidden">
    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
    <div className="mb-4 relative z-10">
      <Award className="text-primary group-hover:text-secondary transition-colors" size={28} />
    </div>
    <h3 className="text-lg font-bold text-white mb-2 relative z-10">{cert.title}</h3>
    <h4 className="text-secondary font-mono text-sm mb-4 relative z-10">{cert.issuer} &bull; {cert.date}</h4>
    <p className="text-muted text-sm flex-grow relative z-10">{cert.description}</p>
  </div>
);

export default function Certifications() {
  const [showGallery, setShowGallery] = useState(false);
  
  const {
    carouselIndex,
    cardsPerView,
    setIsHovering,
    handleNext,
    handlePrev,
  } = useCarousel(
    certifications.length,
    (width) => {
      if (width >= 1024) return 3;
      if (width >= 768) return 2;
      return 1;
    },
    5000, // 5 seconds interval
    showGallery
  );

  const visibleCerts = certifications.slice(carouselIndex, carouselIndex + cardsPerView);

  return (
    <>
      <section id="certifications" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center space-x-4">
                <Award className="text-secondary" size={32} />
                <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
                  Certifications & Awards
                </h2>
              </div>
              <button 
                onClick={() => setShowGallery(true)}
                className="hidden md:flex items-center space-x-2 text-primary hover:text-secondary font-mono text-sm uppercase tracking-wider transition-colors"
              >
                <LayoutGrid size={18} />
                <span>See All</span>
              </button>
            </div>

            <div 
              className="relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onFocus={() => setIsHovering(true)}
              onBlur={() => setIsHovering(false)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[220px]">
                <AnimatePresence mode="popLayout">
                  {visibleCerts.map((cert) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <CertCard cert={cert} />
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
                  {Array.from({ length: Math.ceil(certifications.length / cardsPerView) }).map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`w-2 h-2 rounded-full transition-colors ${idx === Math.floor(carouselIndex / cardsPerView) ? 'bg-secondary' : 'bg-muted/30'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowGallery(true)}
              className="md:hidden mt-12 w-full flex items-center justify-center space-x-2 border border-primary text-primary px-6 py-3 rounded font-mono text-sm uppercase tracking-wider hover:bg-primary/10 transition-colors"
            >
              <LayoutGrid size={18} />
              <span>See All Certifications</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Full Gallery Overlay */}
      <AnimatePresence>
        {showGallery && (
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white font-mono">
                  All Certifications
                </h2>
                <button 
                  onClick={() => setShowGallery(false)}
                  className="p-2 bg-surface border border-muted/30 rounded hover:text-secondary hover:border-secondary transition-colors"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert) => (
                  <CertCard key={cert.id} cert={cert} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
