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
    <html lang="en" className="scroll-smooth">
      
      {/* 👇 ADDED SEO & GOOGLE VERIFICATION BLOCK 👇 */}
      <head>
        <title>MyCorp Group | Global Multi-Sector Enterprise</title>
        <meta name="description" content="A premier collective driving Technology, Real Estate, and Logistics through decentralized infrastructure." />
        <meta name="keywords" content="Global Infrastructure, Industrial Ecosystem, MyCorp Group, Institutional Trust" />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="WNNZDh-gkp0kEWbNxv3_Ia05HZqtghxjuoWt_pZ-8G8" />
        
        {/* OpenGraph / Social Media Previews */}
        <meta property="og:title" content="MyCorp Group | Global Multi-Sector Enterprise" />
        <meta property="og:description" content="A premier collective driving Technology, Real Estate, and Logistics through decentralized infrastructure." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mycorp-frontend.vercel.app" />
      </head>
      {/* 👆 END SEO BLOCK 👆 */}

      {/* 🛡️ Added 'relative' to body to fix the non-static position console warning */}
      <body className="relative bg-[#F8FAFC] text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
        
        {/* ⚡ THE INFINITE TRACER OVERLAY (Refined for Light Theme) */}
        <div className="fixed inset-0 pointer-events-none z-[9999] p-[1px]">
          <div className="relative w-full h-full">
            <motion.div 
              className="absolute inset-0 border-[2px] border-transparent"
              style={{
                // 🎨 MASK LOGIC: Keeps the path sharp and elegant
                WebkitMaskImage: `conic-gradient(from 0deg, black 0%, black 10%, transparent 20%, transparent 100%)`,
                maskImage: `conic-gradient(from 0deg, black 0%, black 10%, transparent 20%, transparent 100%)`,
                
                // 🌈 TRACER COLOR: Shifted to Slate-to-Azure (Premium Executive look)
                borderImageSource: `conic-gradient(from 0deg, transparent, #94a3b8, #3b82f6, transparent)`,
                borderImageSlice: 1,
              }}
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 12, // Slower rotation for a more sophisticated feel
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          </div>
        </div>

        {/* 🏛️ UI STRUCTURE */}
        <div className="min-h-screen flex flex-col relative">
          
          {/* Navbar positioned strictly above all overlays */}
          <header className="relative z-[10000]">
            <Navbar />
          </header>

          {/* Main content layer */}
          <main className="flex-grow relative z-10">
            {children}
          </main>
          
          {/* Footer layer */}
          <footer className="relative z-10">
            <Footer />
          </footer>
          
        </div>

      </body>
    </html>
  );
}