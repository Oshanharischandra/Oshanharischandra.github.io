import { motion } from 'framer-motion';
import { Mail, Download } from 'lucide-react';

const Github = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const Linkedin = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-muted/20 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white font-mono mb-6">
            Let's Connect
          </h2>
          <p className="text-muted text-lg mb-12 max-w-2xl mx-auto">
            Whether you have a question, a project in mind, or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <a 
              href="mailto:your.email@example.com" 
              className="flex items-center space-x-2 bg-primary/10 border border-primary text-primary px-8 py-4 rounded font-mono uppercase tracking-wider hover:bg-primary hover:text-white transition-all hover:shadow-[0_0_20px_rgba(34,107,177,0.5)] group w-full sm:w-auto justify-center"
            >
              <Mail size={20} className="group-hover:scale-110 transition-transform" />
              <span>Email Me</span>
            </a>
            
            <a 
              href="/resume.pdf" 
              download
              className="flex items-center space-x-2 bg-secondary/10 border border-secondary text-secondary px-8 py-4 rounded font-mono uppercase tracking-wider hover:bg-secondary hover:text-background transition-all hover:shadow-[0_0_20px_rgba(150,211,232,0.5)] group w-full sm:w-auto justify-center"
            >
              <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
              <span>Download Resume</span>
            </a>
          </div>

          <div className="flex justify-center flex-wrap gap-4 border-t border-muted/20 pt-12">
            <a 
              href="https://github.com/Oshanharischandra" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted hover:text-white bg-background border border-muted/30 px-6 py-3 rounded font-mono transition-all hover:border-secondary hover:bg-muted/10 group"
            >
              <Github size={24} className="group-hover:text-secondary transition-colors" />
              <span>GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/oshan-harischandra-354792351" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted hover:text-white bg-background border border-muted/30 px-6 py-3 rounded font-mono transition-all hover:border-[#226bb1] hover:bg-muted/10 group"
            >
              <Linkedin size={24} className="group-hover:text-[#226bb1] transition-colors" />
              <span>LinkedIn</span>
            </a>
          </div>
          
          <p className="mt-12 text-sm text-muted/60 font-mono">
            Oshan Harischandra | Oharischandra@gmail.com | 0705269414
          </p>
        </motion.div>
      </div>
    </section>
  );
}
