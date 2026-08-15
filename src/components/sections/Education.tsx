import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const educationList = [
  {
    id: 1,
    degree: "B.Sc. in Information Technology (Expected)",
    institution: "University of Kelaniya",
    department: "Department of Industrial Management",
    period: "2025 - Present",
    details: "Relevant Coursework: Event Driven Programming, Embedded Systems, Mobile Applications Development."
  },
  {
    id: 2,
    degree: "GCE Advanced Level",
    institution: "R/Sivali Central College",
    department: "Science Faculty",
    period: "2021 - 2023",
    details: "G.C.E. Advanced Level - Mathematics, Physics, ICT."
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4 mb-16">
            <BookOpen className="text-secondary" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
              Education
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {educationList.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={item.id} className="relative flex flex-col md:flex-row items-center w-full">
                    
                    {/* Node Dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-secondary shadow-[0_0_10px_rgba(150,211,232,0.8)] transform -translate-x-1/2 z-10"></div>
                    
                    {/* Mobile: content is always on the right, Desktop: alternating */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right md:justify-end flex' : 'md:pl-12 md:ml-auto flex'}`}>
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-surface/50 backdrop-blur-md border border-muted/20 p-6 rounded-lg hover:border-primary/50 transition-colors group relative overflow-hidden w-full text-left"
                      >
                        <div className={`absolute top-0 w-20 h-20 bg-secondary/5 rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-500 ${isEven ? 'right-0 rounded-tr-none rounded-br-none rounded-tl-none' : 'left-0 rounded-tl-none rounded-bl-none rounded-tr-none'}`}></div>
                        
                        <div className="flex flex-col mb-4 relative z-10">
                          <span className="text-primary font-mono text-sm inline-block mb-2 font-bold">{item.period}</span>
                          <h3 className="font-bold text-white text-lg lg:text-xl leading-tight mb-1">{item.degree}</h3>
                          <h4 className="text-secondary font-medium">{item.institution}</h4>
                          <p className="text-sm text-muted/80">{item.department}</p>
                        </div>
                        
                        <p className="text-muted text-sm relative z-10 leading-relaxed">{item.details}</p>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
