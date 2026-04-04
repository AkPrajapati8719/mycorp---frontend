'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Globe2, ShieldCheck, Zap, ChevronRight, Activity } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Master Counter Component (Updated for Light Theme)
const Counter = ({ value, title, prefix = "", suffix = "" }: { value: number, title: string, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [hasRun, setHasRun] = useState(false);

  return (
    <motion.div 
      onViewportEnter={() => {
        if (!hasRun) {
          let start = 0;
          const timer = setInterval(() => {
            start += Math.ceil(value / 30);
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 40); 
          setHasRun(true);
        }
      }}
      className="text-center group cursor-default relative z-10"
    >
      <div className="text-4xl md:text-5xl font-black text-slate-900 italic tracking-tighter group-hover:text-blue-600 transition-colors duration-500">
        {prefix}{count}{suffix}
      </div>
      <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-2 group-hover:text-slate-600 transition-colors">
        {title}
      </p>
    </motion.div>
  );
};

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, easing: 'ease-out-cubic' });
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. HERO SECTION */}
      <section ref={targetRef} className="relative min-h-screen flex items-center pt-48 md:pt-48 lg:pt-40 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden">
        
        {/* Ambient Glows (Lightened for Alabaster theme) */}
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-400/5 blur-[150px] rounded-full pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full relative z-10">
          
          <motion.div style={{ opacity }} data-aos="fade-right">
            <div className="inline-flex items-center space-x-3 bg-white border border-slate-200 px-4 py-1.5 rounded-full mb-8 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600">Next-Gen Corporate Shell 2026</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8 uppercase italic text-slate-900">
              Absolute <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-500">Fluidity.</span>
            </h1>

            <p className="text-slate-500 text-sm md:text-lg max-w-lg leading-relaxed mb-10 border-l-2 border-blue-200 pl-6">
              Empowering global subsidiaries through <span className="text-slate-900 font-bold">Decentralized Intelligence</span> and premium logistical architecture.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sectors">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(37, 99, 235, 0.2)" }}
                  className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3 shadow-lg"
                >
                  Explore Ecosystem <ChevronRight size={16} />
                </motion.button>
              </Link>
              <Link href="/auth/register">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#f1f5f9" }}
                  className="w-full sm:w-auto bg-white border border-slate-200 text-slate-900 px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3 shadow-sm"
                >
                  Register Subsidiary
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* HERO IMAGE */}
          <div className="relative flex justify-center lg:justify-end group mt-10 lg:mt-0" data-aos="zoom-in-left">
            <div className="absolute inset-0 bg-blue-200/20 blur-[120px] rounded-full pointer-events-none" />
            <motion.div 
              whileHover={{ rotateY: 10, rotateX: -10, scale: 1.02 }}
              className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full p-2 bg-gradient-to-tr from-blue-100 via-slate-50 to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
            >
               <div className="w-full h-full rounded-full overflow-hidden border border-slate-200">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt="Corporate" />
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MARQUEE (Lightened) */}
      <div className="w-full bg-white border-y border-slate-200 py-6 flex overflow-hidden relative z-20 shadow-sm">
        <motion.div 
          animate={{ x: [0, -2000] }} 
          transition={{ repeat: Infinity, duration: 40, ease: 'linear' }} 
          className="flex whitespace-nowrap items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400"
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              <span className="flex items-center gap-2 text-blue-600"><Activity size={12}/> SYSTEM: NOMINAL</span>
              <span className="text-slate-900 font-black">MYCORP [MYC] <span className="text-green-600">▲ +4.2%</span></span>
              <span>ACTIVE NODES: 142,091</span>
              <span className="text-slate-900 font-black">GLOBAL UPTIME: 99.999%</span>
              <span className="text-blue-600">NEURAL-MESH: SECURE</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 2. ABOUT US (Lightened) */}
      <section className="py-32 px-6 bg-[#FFFFFF] relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          <div data-aos="fade-up">
             <h2 className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px] mb-6">Strategic Legacy</h2>
             <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-8 uppercase leading-[0.9] text-slate-900">
               Engineered for <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 italic">Domination.</span>
             </h3>
             
             <motion.div 
               whileHover={{ y: -5 }}
               className="relative group grid grid-cols-3 gap-4 md:gap-6 bg-slate-50 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-slate-200 mb-12 overflow-hidden transition-all duration-500 hover:border-blue-300 hover:shadow-2xl"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <Counter value={142} title="Subsidiaries" />
                <Counter value={4} title="Active Hubs" />
                <Counter value={89} title="Liquidity" prefix="$" suffix="B" />
             </motion.div>

             <p className="text-slate-500 text-sm md:text-lg leading-relaxed max-w-lg relative z-10 font-medium">
                For over a decade, MyCorp has been acquiring, integrating, and scaling the world's most critical infrastructure companies. We build the matrix it runs on.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div data-aos="fade-up" data-aos-delay="200">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="aspect-square md:h-[450px] rounded-[3rem] overflow-hidden border border-slate-200 relative group hover:shadow-2xl transition-all duration-500"
              >
                 <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" alt="Building" />
                 <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </div>
            
            <div data-aos="fade-up" data-aos-delay="400">
              <motion.div 
                whileHover={{ scale: 1.05, y: -10 }}
                className="aspect-square md:h-[450px] md:mt-16 rounded-[3rem] overflow-hidden border border-slate-200 relative group hover:shadow-2xl transition-all duration-500"
              >
                 <img src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" alt="Interior" />
                 <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE STACK (Light Edition) */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20" data-aos="fade-down">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase text-slate-900">The <span className="text-blue-600">Core</span> Stack</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: 'Neural Logistics', icon: <Globe2 size={24}/>, desc: 'AI-driven route optimization with real-time global telemetry.', color: 'from-blue-100', hoverBg: 'hover:bg-white' },
            { title: 'Ironclad Auth', icon: <ShieldCheck size={24}/>, desc: 'Biometric and hardware-key encrypted governance access.', color: 'from-cyan-100', hoverBg: 'hover:bg-white' },
            { title: 'Elastic Compute', icon: <Zap size={24}/>, desc: 'Infinite subsidiary server scaling on-demand via MyCorp Cloud.', color: 'from-amber-100', hoverBg: 'hover:bg-white' }
          ].map((item, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 150}>
              <motion.div 
                whileHover={{ y: -10 }}
                className={`p-10 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-slate-200 bg-[#FDFDFD] backdrop-blur-md transition-all duration-500 relative group overflow-hidden shadow-sm hover:shadow-2xl ${item.hoverBg}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`} />
                
                <div className="text-slate-400 mb-8 relative z-10 group-hover:text-blue-600 group-hover:scale-110 transition-all origin-left">{item.icon}</div>
                <h4 className="text-xl md:text-2xl font-black uppercase italic mb-4 relative z-10 tracking-tighter text-slate-900">{item.title}</h4>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed relative z-10 group-hover:text-slate-700 transition-colors font-medium">{item.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}