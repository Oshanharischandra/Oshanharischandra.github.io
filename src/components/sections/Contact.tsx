import { motion } from 'framer-motion';
import { Mail, Code, User, Download } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-surface/30 border-t border-muted/20 relative">
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

          <div className="flex justify-center space-x-8 border-t border-muted/20 pt-12">
            <a 
              href="https://github.com/username" 
              target="_blank" 
              rel="noreferrer"
              className="text-muted hover:text-secondary transition-colors group"
            >
              <Code size={32} className="group-hover:-translate-y-2 transition-transform duration-300" />
              <span className="sr-only">GitHub</span>
            </a>
            <a 
              href="https://linkedin.com/in/username" 
              target="_blank" 
              rel="noreferrer"
              className="text-muted hover:text-secondary transition-colors group"
            >
              <User size={32} className="group-hover:-translate-y-2 transition-transform duration-300" />
              <span className="sr-only">LinkedIn</span>
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
