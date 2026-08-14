import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4 mb-8">
            <Terminal className="text-secondary" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
              About Me
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-muted leading-relaxed text-lg">
              <p>
                My journey began with a fascination for taking electronics apart to see how they tick. Today, I channel that curiosity into designing embedded systems and bridging them with modern web technologies to create comprehensive IoT solutions.
              </p>
              <p>
                I thrive in the intersection of hardware and software. Whether it's spinning up a new PCB layout in KiCad, writing bare-metal firmware in C, or building a responsive React dashboard to monitor sensor data, I love owning the entire stack from silicon to screen.
              </p>
              <p>
                Currently pursuing an IT and Computing degree with a focus on Industrial Management, I am actively seeking roles where I can contribute to challenging engineering problems and continue growing as a full-stack hardware/software engineer.
              </p>
            </div>
            
            <div className="bg-surface/50 border border-muted/20 p-8 rounded-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <h3 className="text-xl font-mono text-secondary mb-4">Core Focus Areas</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1">▸</span>
                  <span><strong>Embedded Systems:</strong> RTOS, firmware optimization, low-level peripheral drivers.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1">▸</span>
                  <span><strong>IoT Architectures:</strong> Secure edge-to-cloud communication, MQTT brokers, time-series data storage.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1">▸</span>
                  <span><strong>Hardware Design:</strong> Schematic capture, PCB routing, component selection and power budgeting.</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
