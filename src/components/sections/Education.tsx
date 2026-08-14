import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

const educationList = [
  {
    id: 1,
    degree: "B.Sc. in Information Technology (Expected)",
    institution: "University of Kelaniya",
    department: "Department of Industrial Management",
    period: "2021 - Present",
    details: "Relevant Coursework: Web Application Development, Event Driven Programming, Embedded Systems, Mobile Applications Development."
  },
  {
    id: 2,
    degree: "High School Diploma",
    institution: "[Your School Name]",
    department: "Physical Science Stream",
    period: "2018 - 2020",
    details: "G.C.E. Advanced Level - Mathematics, Physics, Chemistry."
  }
];

export default function Education() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => setCardsPerView(window.innerWidth >= 768 ? 2 : 1);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev + cardsPerView >= educationList.length ? 0 : prev + cardsPerView));
  }, [cardsPerView]);

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - cardsPerView < 0 ? Math.max(0, educationList.length - cardsPerView) : prev - cardsPerView));
  };

  // 3s Auto-advance
  useEffect(() => {
    if (prefersReducedMotion || isHovering || educationList.length <= cardsPerView) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [nextSlide, prefersReducedMotion, isHovering, cardsPerView]);

  const visibleEducation = educationList.slice(carouselIndex, carouselIndex + cardsPerView);

  return (
    <section id="education" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4 mb-12">
            <BookOpen className="text-secondary" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
              Education
            </h2>
          </div>

          <div 
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onFocus={() => setIsHovering(true)}
            onBlur={() => setIsHovering(false)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[250px]">
              <AnimatePresence mode="popLayout">
                {visibleEducation.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <div className="bg-surface/50 backdrop-blur-md border border-muted/20 p-6 rounded-lg hover:border-primary/50 transition-colors h-full flex flex-col group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/5 rounded-bl-full pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                      
                      <div className="flex flex-col justify-between mb-4 relative z-10">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-white text-lg lg:text-xl pr-4">{item.degree}</h3>
                          <span className="text-primary font-mono text-xs whitespace-nowrap bg-primary/10 px-2 py-1 rounded">{item.period}</span>
                        </div>
                        <h4 className="text-secondary font-medium">{item.institution}</h4>
                        <p className="text-sm text-muted/80">{item.department}</p>
                      </div>
                      
                      <p className="text-muted text-sm relative z-10 flex-grow">{item.details}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Carousel Controls */}
            {educationList.length > cardsPerView && (
              <div className="flex items-center justify-between mt-8">
                <div className="flex space-x-2">
                  <button onClick={prevSlide} className="p-2 border border-muted/30 rounded text-muted hover:text-secondary hover:border-secondary transition-colors" aria-label="Previous">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextSlide} className="p-2 border border-muted/30 rounded text-muted hover:text-secondary hover:border-secondary transition-colors" aria-label="Next">
                    <ChevronRight size={24} />
                  </button>
                </div>
                
                {/* Dots */}
                <div className="flex space-x-2">
                  {Array.from({ length: Math.ceil(educationList.length / cardsPerView) }).map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`w-2 h-2 rounded-full transition-colors ${idx === Math.floor(carouselIndex / cardsPerView) ? 'bg-secondary' : 'bg-muted/30'}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
