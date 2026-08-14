import React from 'react';
import { MotionConfig } from 'framer-motion';
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
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen relative overflow-hidden">
      <CustomCursor />
      <GlobalBackground />
      <IoTMotifs />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Experience />
        <Certifications />
        <Contact />
      </main>
    </div>
    </MotionConfig>
  );
}

export default App;
