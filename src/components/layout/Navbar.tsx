import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-muted/20 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="text-2xl font-mono font-bold text-white tracking-tighter hover:text-secondary transition-colors">
          <span className="text-primary">&lt;</span>
          IoT
          <span className="text-primary">/&gt;</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-muted hover:text-secondary font-mono text-sm uppercase tracking-wider relative group transition-colors"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href="/resume.pdf" 
            download
            className="flex items-center space-x-2 bg-primary/10 border border-primary text-primary px-4 py-2 rounded font-mono text-sm uppercase tracking-wider hover:bg-primary hover:text-white transition-all hover:shadow-[0_0_15px_rgba(34,107,177,0.5)]"
          >
            <Download size={16} />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden text-muted hover:text-secondary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg border-b border-muted/20 py-4 px-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-secondary font-mono text-lg uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="/resume.pdf" 
            download
            className="flex items-center justify-center space-x-2 bg-primary/10 border border-primary text-primary px-4 py-3 rounded font-mono text-base uppercase tracking-wider hover:bg-primary hover:text-white transition-all"
          >
            <Download size={18} />
            <span>Download Resume</span>
          </a>
        </div>
      )}
    </nav>
  );
}
