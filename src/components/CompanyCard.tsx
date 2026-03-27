'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Globe, ShieldCheck, Box } from 'lucide-react';
import React from 'react';

interface CompanyData {
  id: number;
  companyName: string;
  sector: string;
  location: string;
  status: string;
  parentGroup?: string;
}

export default function CompanyCard({ data, onClick }: { data: CompanyData, onClick: () => void }) {
  // 🖱️ Mouse Tracking for "Radial Light" Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      // 🚀 "Blur-to-Clear" and "Slide-Up" Entry
      initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className="group relative bg-[#ffffff03] border border-white/10 rounded-[2.5rem] p-8 overflow-hidden cursor-pointer transition-colors hover:border-cyan-500/40"
    >
      {/* 🌟 Dynamic Background Light (Follows Mouse) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(6, 182, 212, 0.15), transparent 80%)`
          ),
        }}
      />

      <div className="relative z-10">
        {/* Header: Logo & Status */}
        <div className="flex justify-between items-start mb-8">
          <motion.div 
            // 🎈 Continuous Floating Animation
            animate={{ y: [0, -6, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-cyan-500/50 shadow-2xl"
          >
            <span className="text-2xl font-black italic text-cyan-400/80 group-hover:text-cyan-400">
              {data.companyName[0]}
            </span>
          </motion.div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="p-2 bg-black/20 rounded-full text-slate-500 group-hover:text-cyan-400 group-hover:rotate-45 transition-all duration-500">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-2 leading-none">
          {data.companyName}
        </h3>
        
        <p className="text-cyan-500/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <Box size={12} /> {data.parentGroup || 'Independent Entity'}
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-slate-400">
            <Globe size={14} className="text-slate-600" />
            <span className="text-xs font-medium">{data.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-300">
              {data.status}
            </span>
          </div>
        </div>

        {/* Action Hint */}
        <div className="pt-4 border-t border-white/5">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-white transition-colors">
            Initialize Deep Dive 
          </span>
        </div>
      </div>
      
      {/* 🌫️ Bottom Sliding Glass Overlay */}
      <motion.div 
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"
      />
    </motion.div>
  );
}