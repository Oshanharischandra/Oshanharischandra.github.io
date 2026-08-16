  import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FolderGit2, ExternalLink, Code, X, ChevronLeft, ChevronRight, Image as ImageIcon, LayoutGrid, Maximize, Minimize } from 'lucide-react';
import type { Project } from '../../data/projects';
import { projectsData } from '../../data/projects';

// Helper to shuffle array
const shuffleArray = (array: Project[]) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// Reusable Project Card Component
const ProjectCard = ({ project, onClick }: { project: Project, onClick: () => void }) => (
  <motion.div
    onClick={onClick}
    className="group relative bg-surface border border-muted/20 rounded-xl cursor-pointer hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full overflow-hidden"
  >
    {/* Glow Effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl z-0"
      style={{ boxShadow: 'inset 0 0 0 1px #96d3e8, 0 0 20px rgba(150, 211, 232, 0.15)' }}
    />
    
    {/* Project Image / Fallback */}
    <div className="w-full h-48 bg-background flex items-center justify-center border-b border-muted/20 overflow-hidden relative z-10">
      {project.images && project.images.length > 0 ? (
        <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <div className="flex flex-col items-center text-muted/30">
          <ImageIcon size={48} />
          <span className="text-xs font-mono mt-2">No Image</span>
        </div>
      )}
    </div>

    <div className="p-6 flex flex-col flex-grow z-10">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors">{project.title}</h3>
        <div className="flex space-x-3 ml-4 shrink-0">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-muted hover:text-secondary transition-colors" onClick={e => e.stopPropagation()}>
              <Code size={18} />
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-muted hover:text-secondary transition-colors" onClick={e => e.stopPropagation()}>
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
      
      <p className="text-muted text-sm mb-6 flex-grow line-clamp-3">
        {project.description}
      </p>

      {project.contribution && (
        <div className="mb-4 text-xs bg-primary/10 border-l-2 border-primary p-2 rounded-r text-muted">
          <span className="text-primary font-mono font-bold block mb-1">Contribution:</span>
          <span className="line-clamp-2">{project.contribution}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.slice(0, 4).map(tag => (
          <span key={tag} className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className="font-mono text-[10px] text-muted bg-muted/10 px-2 py-1 rounded">
            +{project.tags.length - 4}
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

import { useCarousel } from '../../hooks/useCarousel';

export default function Projects() {
  const [shuffledProjects, setShuffledProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setShuffledProjects(shuffleArray(projectsData));
  }, []);

  const {
    carouselIndex,
    cardsPerView,
    setIsHovering,
    handleNext,
    handlePrev,
  } = useCarousel(
    shuffledProjects.length,
    (width) => width >= 768 ? 2 : 1,
    5000, // 5 seconds interval
    showGallery || !!selectedProject
  );

  const visibleProjects = shuffledProjects.slice(carouselIndex, carouselIndex + cardsPerView);

  return (
    <>
      <section id="projects" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center space-x-4">
                <FolderGit2 className="text-secondary" size={32} />
                <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
                  Featured Projects
                </h2>
              </div>
              <button 
                onClick={() => setShowGallery(true)}
                className="hidden md:flex items-center space-x-2 text-primary hover:text-secondary font-mono text-sm uppercase tracking-wider transition-colors"
              >
                <LayoutGrid size={18} />
                <span>See All Projects</span>
              </button>
            </div>

            {/* Carousel */}
            <div 
              className="relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onFocus={() => setIsHovering(true)}
              onBlur={() => setIsHovering(false)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[480px]">
                <AnimatePresence mode="wait">
                  {visibleProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="h-full"
                    >
                      <ProjectCard project={project} onClick={() => { setSelectedProject(project); setCurrentImageIndex(0); setIsFullscreen(false); }} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Carousel Controls */}
              <div className="flex items-center justify-between mt-8">
                <div className="flex space-x-2">
                  <button onClick={handlePrev} className="p-2 border border-muted/30 rounded text-muted hover:text-secondary hover:border-secondary transition-colors" aria-label="Previous projects">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={handleNext} className="p-2 border border-muted/30 rounded text-muted hover:text-secondary hover:border-secondary transition-colors" aria-label="Next projects">
                    <ChevronRight size={24} />
                  </button>
                </div>
                
                {/* Dots */}
                <div className="flex space-x-2">
                  {Array.from({ length: Math.ceil(shuffledProjects.length / cardsPerView) }).map((_, idx) => (
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
              <span>See All Projects</span>
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
                  All Projects
                </h2>
                <button 
                  onClick={() => setShowGallery(false)}
                  className="p-2 bg-surface border border-muted/30 rounded hover:text-secondary hover:border-secondary transition-colors"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onClick={() => { setSelectedProject(project); setCurrentImageIndex(0); setIsFullscreen(false); }} 
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#283032]/90 backdrop-blur-[12px]"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-full overflow-y-auto bg-surface border border-secondary/30 rounded-2xl p-6 md:p-10 shadow-[0_0_40px_rgba(34,107,177,0.2)]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 text-muted hover:text-white transition-colors z-10 bg-background/50 rounded p-1"
              >
                <X size={24} />
              </button>

              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="w-full -mt-6 -mx-6 md:-mt-10 md:-mx-10 mb-8 rounded-t-2xl relative">
                  <div className="w-full h-48 md:h-80 bg-black/40 relative overflow-hidden group flex items-center justify-center">
                    <img 
                      src={selectedProject.images[currentImageIndex]} 
                      alt={`${selectedProject.title} ${currentImageIndex + 1}`} 
                      className="w-full h-full object-contain" 
                    />
                    
                    <button
                      onClick={() => setIsFullscreen(true)}
                      className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-black/80"
                      title="View Fullscreen"
                    >
                      <Maximize size={20} />
                    </button>

                    {selectedProject.images.length > 1 && (
                      <>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev === 0 ? selectedProject.images!.length - 1 : prev - 1); }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-black/80"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => (selectedProject.images && prev === selectedProject.images.length - 1) ? 0 : prev + 1); }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-black/80"
                        >
                          <ChevronRight size={20} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/50 px-3 py-1 rounded-full text-white text-xs font-mono">
                          {currentImageIndex + 1} / {selectedProject.images.length}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Row */}
                  {selectedProject.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto p-4 bg-surface/50 border-b border-muted/20 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {selectedProject.images.map((img, idx) => (
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

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 pr-8">{selectedProject.title}</h3>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag: string) => (
                  <span key={tag} className="font-mono text-xs text-secondary bg-secondary/10 px-2 py-1 rounded border border-secondary/20">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted/90 mb-6">{selectedProject.description}</p>
                
                {selectedProject.longDescription && (
                  <div className="mb-6">
                    <h4 className="text-white font-mono text-lg mb-2 border-b border-muted/20 pb-2">Details</h4>
                    <p className="text-muted leading-relaxed">{selectedProject.longDescription}</p>
                  </div>
                )}

                {selectedProject.contribution && (
                  <div className="mb-6 bg-primary/10 border-l-4 border-primary p-4 rounded-r">
                    <h4 className="text-primary font-mono text-sm uppercase mb-1">Individual Contribution</h4>
                    <p className="text-muted/90 text-sm">{selectedProject.contribution}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-muted/20">
                {selectedProject.githubUrl && (
                  <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-2 text-white bg-background border border-muted/30 px-4 py-2 rounded hover:bg-muted/10 hover:border-secondary transition-all">
                    <Code size={18} />
                    <span>View Source</span>
                  </a>
                )}
                {selectedProject.demoUrl && (
                  <a href={selectedProject.demoUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-2 text-background bg-secondary px-4 py-2 rounded hover:bg-secondary/90 transition-all font-medium">
                    <ExternalLink size={18} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {isFullscreen && selectedProject && selectedProject.images && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center p-4 cursor-auto pointer-events-auto"
          >
            <button 
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2 bg-black/50 rounded"
            >
              <Minimize size={32} />
            </button>
            <div className="relative w-full h-full flex items-center justify-center group">
               <img src={selectedProject.images[currentImageIndex]} alt={selectedProject.title} className="max-w-full max-h-[85vh] object-contain" />
               
               {/* Controls */}
               {selectedProject.images.length > 1 && (
                 <>
                   <button 
                     onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev === 0 ? selectedProject.images!.length - 1 : prev - 1); }}
                     className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-black/80"
                   >
                     <ChevronLeft size={32} />
                   </button>
                   <button 
                     onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => (selectedProject.images && prev === selectedProject.images.length - 1) ? 0 : prev + 1); }}
                     className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-black/80"
                   >
                     <ChevronRight size={32} />
                   </button>
                 </>
               )}
            </div>
            
            {/* Fullscreen Thumbnail Row */}
            {selectedProject.images.length > 1 && (
              <div className="absolute bottom-6 flex gap-2 overflow-x-auto max-w-full px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                 {selectedProject.images.map((img, idx) => (
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
