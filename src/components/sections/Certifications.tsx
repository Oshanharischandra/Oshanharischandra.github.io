import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, LayoutGrid, X, Maximize, Minimize } from 'lucide-react';
import { useCarousel } from '../../hooks/useCarousel';

const Github = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export type Certification = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  images?: string[];
  githubUrl?: string;
};

export const certifications: Certification[] = [
  {
    id: 1,
    title: "Robofest Competition",
    issuer: "SLIIT",
    date: "2025",
    description: "Participated and built a maze-solving robot. Gained practical experience in PID control and PlatformIO.",
  },
  {
    id: 2,
    title: "iDEASPRiNT Hackathon",
    issuer: "Industrial Management",
    date: "2026",
    description: "Designed SafeX Wearable Health Monitor as part of Team MIZU.",
  },
  {
    id: 3,
    title: "Codeuino Hackathon",
    issuer: "Codeuino + Gavesha",
    date: "25 MAR 2023",
    description: "Secured 3rd Place.",
    images: [
    "/certificates/codeuino-cert.png",
    "/certificates/codeuino_2.jpeg",
    "/certificates/codeuino_3.jpeg",
    "/certificates/codeuino_4.jpeg"
  ]
  },
  {
    id: 4,
    title: "Merit Selection & 3-Day Session @ UOM",
    issuer: "MORAFORESIGHT 1.0",
    date: "2023",
    description: "Secured a coveted spot within the top 80 out of 1000+ applicants, culminating in an exclusive 3-day session.",
    images: [
    "/certificates/moraforesight_1.jpeg",
    "/certificates/moraforesight_2.jpeg",
    "/certificates/moraforesight_3.jpeg"
  ]
  }
];

const CertCard = ({ cert, onClick }: { cert: Certification, onClick?: () => void }) => {
  const hasImage = cert.images && cert.images.length > 0;
  
  return (
    <div 
      onClick={onClick}
      className="bg-surface/80 backdrop-blur-md border border-muted/20 rounded-lg hover:border-secondary/50 hover:bg-surface/90 transition-all group flex flex-col h-full hover:-translate-y-2 hover:shadow-[0_4px_20px_rgba(34,107,177,0.15)] relative overflow-hidden cursor-pointer"
    >
      <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full pointer-events-none group-hover:scale-150 transition-transform duration-500 z-0"></div>
      
      {hasImage && (
        <div className="w-full h-32 md:h-40 border-b border-muted/20 relative z-10 shrink-0">
          <img src={cert.images![0]} alt={cert.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow relative z-10">
        {(!hasImage || cert.githubUrl) && (
          <div className="mb-4 flex justify-between items-start">
            {!hasImage ? (
              <Award className="text-primary group-hover:text-secondary transition-colors" size={28} />
            ) : (
              <div />
            )}
            {cert.githubUrl && (
              <a href={cert.githubUrl} target="_blank" rel="noreferrer" className="text-muted hover:text-secondary transition-colors z-20" onClick={e => e.stopPropagation()}>
                <Github size={18} />
              </a>
            )}
          </div>
        )}
        <h3 className="text-lg font-bold text-white mb-2">{cert.title}</h3>
        <h4 className="text-secondary font-mono text-sm mb-4">{cert.issuer} &bull; {cert.date}</h4>
        <p className="text-muted text-sm flex-grow line-clamp-3">{cert.description}</p>
      </div>
    </div>
  );
};

export default function Certifications() {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
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
                <AnimatePresence mode="wait">
                  {visibleCerts.map((cert) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="h-full"
                    >
                      <CertCard cert={cert} onClick={() => { setSelectedCert(cert); setCurrentImageIndex(0); setIsFullscreen(false); }} />
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
                  <CertCard key={cert.id} cert={cert} onClick={() => { setSelectedCert(cert); setCurrentImageIndex(0); setIsFullscreen(false); }} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#283032]/90 backdrop-blur-[12px]"
              onClick={() => setSelectedCert(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-full overflow-y-auto bg-surface border border-secondary/30 rounded-2xl p-6 md:p-10 shadow-[0_0_40px_rgba(34,107,177,0.2)]"
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 text-muted hover:text-white transition-colors z-10 bg-background/50 rounded p-1"
              >
                <X size={24} />
              </button>

              {selectedCert.images && selectedCert.images.length > 0 && (
                <div className="w-full -mt-6 -mx-6 md:-mt-10 md:-mx-10 mb-8 rounded-t-2xl relative">
                  <div className="w-full h-48 md:h-80 bg-black/40 relative overflow-hidden group flex items-center justify-center">
                    <img 
                      src={selectedCert.images[currentImageIndex]} 
                      alt={`${selectedCert.title} ${currentImageIndex + 1}`} 
                      className="w-full h-full object-contain" 
                    />
                    
                    <button
                      onClick={() => setIsFullscreen(true)}
                      className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-black/80"
                      title="View Fullscreen"
                    >
                      <Maximize size={20} />
                    </button>

                    {selectedCert.images.length > 1 && (
                      <>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev === 0 ? selectedCert.images!.length - 1 : prev - 1); }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-black/80"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => (selectedCert.images && prev === selectedCert.images.length - 1) ? 0 : prev + 1); }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-black/80"
                        >
                          <ChevronRight size={20} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/50 px-3 py-1 rounded-full text-white text-xs font-mono">
                          {currentImageIndex + 1} / {selectedCert.images.length}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Row */}
                  {selectedCert.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto p-4 bg-surface/50 border-b border-muted/20 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {selectedCert.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`h-16 w-24 shrink-0 rounded overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-secondary opacity-100' : 'border-transparent opacity-40 hover:opacity-100'}`}
                        >
                          <img src={img} className="w-full h-full object-cover" alt="Thumbnail" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 pr-8">{selectedCert.title}</h3>
              <h4 className="text-secondary font-mono text-sm mb-6">{selectedCert.issuer} &bull; {selectedCert.date}</h4>

              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted/90 mb-6">{selectedCert.description}</p>
              </div>

              {selectedCert.githubUrl && (
                <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-muted/20">
                  <a href={selectedCert.githubUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-2 text-white bg-background border border-muted/30 px-4 py-2 rounded hover:bg-muted/10 hover:border-secondary transition-all">
                    <Github size={18} />
                    <span>View Repository</span>
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {isFullscreen && selectedCert && selectedCert.images && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] w-screen h-screen bg-black/95 flex flex-col items-center justify-center p-4 !cursor-auto pointer-events-auto"
          >
            <button 
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2 bg-black/50 rounded"
            >
              <Minimize size={32} />
            </button>
            <div className="relative w-full h-full flex items-center justify-center group">
               <img src={selectedCert.images[currentImageIndex]} alt={selectedCert.title} className="max-w-full max-h-[85vh] object-contain" />
               
               {/* Controls */}
               {selectedCert.images.length > 1 && (
                 <>
                   <button 
                     onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev === 0 ? selectedCert.images!.length - 1 : prev - 1); }}
                     className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-black/80"
                   >
                     <ChevronLeft size={32} />
                   </button>
                   <button 
                     onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => (selectedCert.images && prev === selectedCert.images.length - 1) ? 0 : prev + 1); }}
                     className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-black/80"
                   >
                     <ChevronRight size={32} />
                   </button>
                 </>
               )}
            </div>
            
            {/* Fullscreen Thumbnail Row */}
            {selectedCert.images.length > 1 && (
              <div className="absolute bottom-6 flex gap-2 overflow-x-auto max-w-full px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                 {selectedCert.images.map((img, idx) => (
                   <button
                     key={idx}
                     onClick={() => setCurrentImageIndex(idx)}
                     className={`h-16 w-24 shrink-0 rounded overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-secondary opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                   >
                     <img src={img} className="w-full h-full object-cover" alt="Thumbnail" />
                   </button>
                 ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
