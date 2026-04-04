'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ArrowUpRight, ShieldCheck, Cpu, Target, Zap, Globe2, Users } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// --- Reusable Glow Card Wrapper ---
const InteractiveGlowCard = ({ children, className, glowColor = "rgba(59, 130, 246, 0.15)" }: any) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={`relative group overflow-hidden ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${glowColor}, transparent 80%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
};

export default function AboutPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, easing: 'ease-out-cubic' });
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-32 pb-20 overflow-hidden relative selection:bg-blue-100 selection:text-blue-900">
      
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-blue-400/5 blur-[200px] rounded-full pointer-events-none z-0" />
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center px-6 rounded-[3rem] mx-4 md:mx-6 overflow-hidden border border-slate-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
            alt="Corporate Vision"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white" />
        </motion.div>

        <div className="relative z-10 text-center max-w-4xl" data-aos="zoom-out-up">
          <div className="inline-flex items-center space-x-2 bg-white border border-slate-200 px-5 py-2 rounded-full mb-8 shadow-sm backdrop-blur-md">
            <Globe2 size={12} className="text-blue-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">The MyCorp Narrative</span>
          </div>
          <h1 className="text-4xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] mb-6 text-slate-900">
            Architecting <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">The Future.</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            From neural networks to urban steel, we don't just build companies—we engineer global currents with institutional precision.
          </p>
        </div>
      </section>

      {/* 2. THE THREE TIERS: ECOSYSTEM PILLARS */}
      <section className="max-w-7xl mx-auto px-6 space-y-32 md:space-y-40 mt-32 relative z-10">
        
        {/* TIER 1: TECH */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-24 items-center">
            <InteractiveGlowCard className="w-full aspect-[4/5] md:h-[600px] md:aspect-auto rounded-[2.5rem] md:rounded-[4rem] border border-slate-200 bg-white shadow-xl transition-all duration-700 hover:shadow-2xl">
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000" className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Tech" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
            </InteractiveGlowCard>

            <div data-aos="fade-left" className="w-full">
              <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Division 01</span>
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.9] mb-6 text-slate-900">
                  Digital <br /> <span className="text-slate-400">Infrastructure.</span>
              </h2>
              <p className="text-slate-500 text-sm md:text-lg leading-relaxed mb-8 font-medium">
                  Our Tech-Core division manages high-density server environments that process trillions of data points. We provide the neural mesh for the modern enterprise.
              </p>
              <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white px-8 py-4 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-lg">
                  Access Protocols <ArrowUpRight size={14} />
              </button>
            </div>
        </div>

        {/* TIER 2: REAL ESTATE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-24 items-center">
            <InteractiveGlowCard glowColor="rgba(245, 158, 11, 0.15)" className="w-full aspect-[4/5] md:h-[600px] md:aspect-auto rounded-[2.5rem] md:rounded-[4rem] border border-slate-200 bg-white shadow-xl transition-all duration-700 hover:shadow-2xl lg:order-2">
              <img src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1000" className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Real Estate" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
            </InteractiveGlowCard>

            <div data-aos="fade-right" className="w-full lg:order-1">
              <span className="text-amber-600 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Division 02</span>
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.9] mb-6 text-slate-900">
                  Sustainable <br /> <span className="text-amber-500">Habitation.</span>
              </h2>
              <p className="text-slate-500 text-sm md:text-lg leading-relaxed mb-8 font-medium">
                  The Estate-H division redefines living through modular architecture and vertical forests. Built for resilience, designed for absolute elegance.
              </p>
              <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest border border-slate-200 text-slate-900 bg-white px-8 py-4 rounded-full hover:bg-slate-50 transition-all duration-300 shadow-sm">
                  View Blueprints <ArrowUpRight size={14} />
              </button>
            </div>
        </div>

        {/* TIER 3: LOGISTICS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-24 items-center">
            <InteractiveGlowCard glowColor="rgba(6, 182, 212, 0.15)" className="w-full aspect-[4/5] md:h-[600px] md:aspect-auto rounded-[2.5rem] md:rounded-[4rem] border border-slate-200 bg-white shadow-xl transition-all duration-700 hover:shadow-2xl">
              <img src="https://images.unsplash.com/photo-1670121180530-cfcba4438038?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGxvZ2lzdGljc3xlbnwwfHwwfHx8MA%3D%3D" className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Logistics" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 right-8 bg-white/80 backdrop-blur-md border border-slate-200 text-cyan-600 p-4 rounded-full z-20 shadow-xl">
                  <Zap size={20} />
              </div>
            </InteractiveGlowCard>

            <div data-aos="fade-left" className="w-full">
              <span className="text-cyan-600 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Division 03</span>
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.9] mb-6 text-slate-900">
                  Autonomous <br /> <span className="text-cyan-500">Flow.</span>
              </h2>
              <p className="text-slate-500 text-sm md:text-lg leading-relaxed mb-8 font-medium">
                  Logistics at MyCorp is defined by autonomous drone networks and maglev supply chains that move the global economy at high velocity.
              </p>
              <div className="grid grid-cols-2 gap-6 border-t border-slate-100 pt-8">
                  <div>
                    <p className="text-2xl md:text-4xl font-black italic text-slate-900">140k+</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Active Units</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-4xl font-black italic text-cyan-600">0.4ms</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Logic Delay</p>
                  </div>
              </div>
            </div>
        </div>
      </section>

      {/* 3. BOARD OF DIRECTORS (ELEGANT LIGHT WITH HOVER LIGHT) */}
      <section className="max-w-7xl mx-auto py-32 px-6 mt-20 border-t border-slate-100 relative z-10">
        <div className="text-center mb-20" data-aos="fade-down">
          <div className="inline-flex items-center space-x-2 mb-4 bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-full shadow-sm">
            <Users size={12} className="text-slate-400" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">Executive Command</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-slate-900">
            Board of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Directors.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { name: "Alexander Vance", title: "Group CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500", color: "rgba(37, 99, 235, 0.1)" },
            { name: "Elena Rostova", title: "Head of Infrastructure", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500", color: "rgba(245, 158, 11, 0.1)" },
            { name: "Marcus Chen", title: "Chief Logistics Officer", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=500", color: "rgba(6, 182, 212, 0.1)" }
          ].map((leader, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 150} className="text-center group cursor-pointer">
              <InteractiveGlowCard glowColor={leader.color} className="w-full aspect-[4/5] rounded-[3rem] overflow-hidden border border-slate-200 bg-white mb-6 transition-all duration-500 group-hover:shadow-2xl group-hover:border-blue-200">
                <img src={leader.img} alt={leader.name} className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              </InteractiveGlowCard>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">{leader.name}</h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2">{leader.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CORE VALUES (LIGHT CARDS WITH HOVER LIGHT) */}
      <section className="max-w-7xl mx-auto pb-32 px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Integrity', icon: <ShieldCheck size={28}/>, sub: 'Governance v4.0', color: "text-blue-600", glow: "rgba(37, 99, 235, 0.08)" },
            { title: 'Intelligence', icon: <Cpu size={28}/>, sub: 'AI Integration', color: "text-amber-600", glow: "rgba(245, 158, 11, 0.08)" },
            { title: 'Impact', icon: <Target size={28}/>, sub: 'ESG Compliance', color: "text-cyan-600", glow: "rgba(6, 182, 212, 0.08)" }
          ].map((item, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 150}>
              <InteractiveGlowCard 
                glowColor={item.glow}
                className="bg-white border border-slate-200 p-12 md:p-14 rounded-[3.5rem] text-center transition-all duration-500 cursor-default shadow-sm hover:shadow-xl hover:border-blue-100"
              >
                <div className={`${item.color} mb-6 flex justify-center group-hover:scale-110 transition-transform duration-500`}>{item.icon}</div>
                <h4 className="text-2xl md:text-3xl font-black uppercase italic mb-3 tracking-tighter text-slate-900">{item.title}</h4>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">{item.sub}</p>
              </InteractiveGlowCard>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}