import React, { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { Cpu } from 'lucide-react';
import Navbar from './components/layout/Navbar';
import CustomCursor from './components/layout/CustomCursor';
import IoTMotifs from './components/layout/IoTMotifs';
import GlobalBackground from './components/layout/GlobalBackground';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Certifications from './components/sections/Certifications';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center animate-pulse" style={{ willChange: 'opacity, filter', filter: 'drop-shadow(0 0 20px rgba(150, 211, 232, 0.4))' }}>
           <Cpu size={64} className="text-secondary animate-[spin_3s_linear_infinite] mb-6" style={{ willChange: 'transform' }} />
           <p className="text-secondary font-mono mt-4 tracking-widest text-lg">
             {'<Oshan_Harischandra/>'}
             <span className="loading-dots"></span>
           </p>
        </div>
      </div>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen relative overflow-hidden">
      <GlobalBackground />
      <CustomCursor />
      <IoTMotifs />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Education />
        <Experience />
        <Contact />
      </main>
    </div>
    </MotionConfig>
  );
}

export default App;
