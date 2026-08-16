import React from 'react';
import { Cpu, Wifi, Activity, Zap, Radio, Server, Bluetooth, CircuitBoard } from 'lucide-react';

const ICONS = [Cpu, Wifi, Activity, Zap, Radio]; // Hardcode 5 icons

const generateElements = () => {
  const elements = [];
  // Generate exactly 5 elements for extreme performance
  for (let i = 0; i < 5; i++) {
    elements.push({
      id: i,
      Icon: ICONS[i % ICONS.length],
      top: `${20 + i * 15}%`, // Distribute vertically 
      left: i % 2 === 0 ? '10%' : '80%', // Alternate left/right
      size: 60 + Math.random() * 40, // 60px to 100px
      delay: -(Math.random() * 30), // Random delay for animation
    });
  }
  return elements;
};

// Extracted into a separate component for cleaner map rendering
const MotifElement = ({ el }: { el: any }) => {
  return (
    <div
      className="absolute text-muted/10 animate-float-icon"
      style={{
        top: el.top,
        left: el.left,
        animationDelay: `${el.delay}s`,
      }}
    >
      <el.Icon size={el.size} strokeWidth={1} />
    </div>
  );
};

export default function IoTMotifs() {
  // Client-side only constant array
  const elements = generateElements();

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <MotifElement 
          key={el.id} 
          el={el} 
        />
      ))}
    </div>
  );
}
