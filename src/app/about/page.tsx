'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { ArrowUpRight, ShieldCheck, Cpu, Target, Zap, Globe2, Users } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AboutPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, easing: 'ease-out-cubic' });
  }, []);

  return (
    <main className="min-h-screen bg-[#021533] text-white pt-32 pb-20 overflow-hidden relative selection:bg-blue-500/30">
      
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-blue-600/5 blur-[200px] rounded-full pointer-events-none z-0" />
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center px-6 rounded-[3rem] mx-4 md:mx-6 overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
            alt="Corporate Vision"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#021533]/80 via-[#021533]/40 to-[#021533]" />
        </motion.div>

        <div className="relative z-10 text-center max-w-4xl" data-aos="zoom-out-up">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-5 py-2 rounded-full mb-8 backdrop-blur-md">
            <Globe2 size={12} className="text-blue-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">The MyCorp Narrative</span>
          </div>
          <h1 className="text-4xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] mb-6 drop-shadow-2xl">
            Architecting <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">The Future.</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-xl font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
            From neural networks to urban steel, we don't just build companies—we engineer global currents.
          </p>
        </div>
      </section>

      {/* 2. THE THREE TIERS: ECOSYSTEM PILLARS */}
      <section className="max-w-7xl mx-auto px-6 space-y-32 md:space-y-40 mt-32 relative z-10">
        
        {/* TIER 1: TECH (Fixed Image) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div 
              data-aos="fade-up"
              className="relative group w-full aspect-[4/5] md:h-[600px] md:aspect-auto rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/10 transition-all duration-700 hover:border-blue-500/50 hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]"
            >
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000" className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Tech" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#021533] via-[#021533]/40 to-transparent" />
            </motion.div>

            <div data-aos="fade-left" className="w-full">
              <span className="text-blue-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Division 01</span>
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.9] mb-6">
                  Digital <br /> <span className="text-slate-500">Infrastructure.</span>
              </h2>
              <p className="text-slate-400 text-sm md:text-lg leading-relaxed mb-8">
                  Our Tech-Core division manages high-density server environments that process trillions of data points in real-time. We provide the neural mesh for the modern enterprise.
              </p>
              <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest bg-blue-600/10 border border-blue-500/30 text-blue-400 px-8 py-4 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300">
                  Access Protocols <ArrowUpRight size={14} />
              </button>
            </div>
        </div>

        {/* TIER 2: REAL ESTATE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div 
              data-aos="fade-up"
              className="relative group w-full aspect-[4/5] md:h-[600px] md:aspect-auto rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/10 transition-all duration-700 hover:border-amber-500/50 hover:shadow-[0_0_50px_rgba(245,158,11,0.2)] lg:order-2"
            >
              <img src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1000" className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Real Estate" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#021533] via-[#021533]/40 to-transparent" />
            </motion.div>

            <div data-aos="fade-right" className="w-full lg:order-1">
              <span className="text-[#D4AF37] font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Division 02</span>
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.9] mb-6">
                  Sustainable <br /> <span className="text-[#D4AF37]">Living.</span>
              </h2>
              <p className="text-slate-400 text-sm md:text-lg leading-relaxed mb-8">
                  The Estate-H division redefines habitation through modular Eco-Steel architecture and vertical cities. Built for resilience, designed for elegance.
              </p>
              <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest bg-amber-500/10 border border-amber-500/30 text-amber-400 px-8 py-4 rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300">
                  View Blueprints <ArrowUpRight size={14} />
              </button>
            </div>
        </div>

        {/* TIER 3: LOGISTICS (Fixed Image) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div 
              data-aos="fade-up"
              className="relative group w-full aspect-[4/5] md:h-[600px] md:aspect-auto rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/10 transition-all duration-700 hover:border-cyan-500/50 hover:shadow-[0_0_50px_rgba(6,182,212,0.2)]"
            >
              <img src="https://images.unsplash.com/photo-1580674271209-230493643330?q=80&w=1000" className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Logistics" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#021533] via-[#021533]/40 to-transparent" />
              <div className="absolute bottom-8 right-8 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/50 text-cyan-400 p-4 rounded-full z-20 shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                  <Zap size={20} />
              </div>
            </motion.div>

            <div data-aos="fade-left" className="w-full">
              <span className="text-cyan-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Division 03</span>
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.9] mb-6">
                  Autonomous <br /> <span className="text-cyan-500">Flow.</span>
              </h2>
              <p className="text-slate-400 text-sm md:text-lg leading-relaxed mb-8">
                  Logistics at MyCorp is defined by autonomous drone networks and maglev supply chains that move the global economy while the world sleeps.
              </p>
              <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
                  <div>
                    <p className="text-2xl md:text-4xl font-black italic text-white">140k+</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Active Units</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-4xl font-black italic text-cyan-500">0.4ms</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Logic Delay</p>
                  </div>
              </div>
            </div>
        </div>
      </section>

      {/* 3. NEW: BOARD OF DIRECTORS (Leadership) */}
      <section className="max-w-7xl mx-auto py-32 px-6 mt-20 border-t border-white/5 relative z-10">
        <div className="text-center mb-20" data-aos="fade-down">
          <div className="inline-flex items-center space-x-2 mb-4 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            <Users size={12} className="text-slate-400" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Executive Command</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
            Board of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Directors.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Alexander Vance", title: "Group CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500", accent: "group-hover:border-blue-500/50" },
            { name: "Elena Rostova", title: "Head of Infrastructure", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500", accent: "group-hover:border-amber-500/50" },
            { name: "Marcus Chen", title: "Chief Logistics Officer", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=500", accent: "group-hover:border-cyan-500/50" }
          ].map((leader, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 150} className="text-center group cursor-pointer">
              <div className={`w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 mb-6 transition-all duration-500 ${leader.accent}`}>
                <img src={leader.img} alt={leader.name} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter">{leader.name}</h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2">{leader.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. UPGRADED: CORE VALUES */}
      <section className="max-w-7xl mx-auto pb-32 px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Integrity', icon: <ShieldCheck size={28}/>, sub: 'Governance v4.0', color: "text-blue-400", border: "hover:border-blue-500/30", bg: "hover:bg-blue-500/5" },
            { title: 'Intelligence', icon: <Cpu size={28}/>, sub: 'AI Integration', color: "text-amber-400", border: "hover:border-amber-500/30", bg: "hover:bg-amber-500/5" },
            { title: 'Impact', icon: <Target size={28}/>, sub: 'ESG Compliance', color: "text-cyan-400", border: "hover:border-cyan-500/30", bg: "hover:bg-cyan-500/5" }
          ].map((item, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 150}>
              <motion.div 
                whileHover={{ y: -5 }}
                className={`bg-white/[0.02] backdrop-blur-md p-10 md:p-14 rounded-[3rem] border border-white/5 text-center transition-all duration-500 cursor-default ${item.border} ${item.bg} group`}
              >
                <div className={`${item.color} mb-6 flex justify-center group-hover:scale-110 transition-transform duration-500`}>{item.icon}</div>
                <h4 className="text-2xl md:text-3xl font-black uppercase italic mb-3 tracking-tighter">{item.title}</h4>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">{item.sub}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}