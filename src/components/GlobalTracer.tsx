'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function GlobalTracer({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* ⚡ THE INFINITE BORDER TRACER (Fixed to Viewport) */}
      <div className="fixed inset-0 pointer-events-none z-[9999] p-[2px]">
        <div className="relative w-full h-full">
          <motion.div 
            className="absolute inset-0 border-[3px] border-transparent"
            style={{
              // This mask creates the "20% length" effect
              WebkitMaskImage: `conic-gradient(from 0deg, black 0%, black 10%, transparent 20%, transparent 100%)`,
              maskImage: `conic-gradient(from 0deg, black 0%, black 10%, transparent 20%, transparent 100%)`,
              
              // Glowing Cyan/Blue Gradient
              borderImageSource: `conic-gradient(from 0deg, transparent, #06b6d4, #3b82f6, transparent)`,
              borderImageSlice: 1,
            }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </div>
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}