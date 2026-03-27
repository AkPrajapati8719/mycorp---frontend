'use client';

import { motion } from 'framer-motion';
import Navbar from '@/src/components/shared/Navbar';
import Footer from '@/src/components/shared/Footer';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#021533] text-white antialiased selection:bg-blue-500/30 overflow-x-hidden">
        
        {/* ⚡ THE INFINITE TRACER OVERLAY */}
        {/* Fixed position ensures it frames the entire browser window */}
        <div className="fixed inset-0 pointer-events-none z-[9999] p-[2px]">
          <div className="relative w-full h-full">
            <motion.div 
              className="absolute inset-0 border-[3px] border-transparent"
              style={{
                // 🎨 MASK LOGIC: This creates the "20% Length" effect
                WebkitMaskImage: `conic-gradient(from 0deg, black 0%, black 10%, transparent 20%, transparent 100%)`,
                maskImage: `conic-gradient(from 0deg, black 0%, black 10%, transparent 20%, transparent 100%)`,
                
                // 🌈 TRACER COLOR: Cyan-to-Blue Neon Glow
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

        {/* 🏛️ UI STRUCTURE */}
        <div className="min-h-screen flex flex-col relative">
          
          {/* Navbar sits above the tracer visually */}
          <header className="relative z-[10000]">
            <Navbar />
          </header>

          <main className="flex-grow relative z-10">
            {children}
          </main>
          
          <footer className="relative z-10">
            <Footer />
          </footer>
          
        </div>

      </body>
    </html>
  );
}