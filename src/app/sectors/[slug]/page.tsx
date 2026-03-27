'use client';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { 
  ArrowUpRight, Cpu, Globe2, Building2, Zap, ShieldCheck, 
  BarChart3, Target, Activity, Box, Layers, ArrowRight, 
  Database, Network, Radio, Server, Fingerprint, MapPin, Star,
  Ship, Plane, Truck, History, Briefcase, FileText, Binary
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// 🏢 MASTER DATA HUB
const SUBSIDIARY_MAINFRAME: Record<string, any[]> = {
  'tata-group': [
    { name: "TCS Neural", group: "Tata Group", industry: "AI Systems", val: "$142B", pop: "98%", loc: "Mumbai, IN", tech: "Neural-Sync", icon: <Database size={18}/> },
    { name: "Tata Motors EV", group: "Tata Group", industry: "Automotive", val: "$22B", pop: "94%", loc: "Pune, IN", tech: "Giga-Cell", icon: <Activity size={18}/> },
    { name: "Tata Steel", group: "Tata Group", industry: "Materials", val: "$18B", pop: "91%", loc: "Jamshedpur", tech: "Eco-Steel", icon: <Layers size={18}/> },
    { name: "Tata Power", group: "Tata Group", industry: "Energy", val: "$12B", pop: "89%", loc: "Mumbai, IN", tech: "Smart-Grid", icon: <Zap size={18}/> },
    { name: "Titan Digital", group: "Tata Group", industry: "Precision", val: "$31B", pop: "96%", loc: "Bangalore", tech: "Nano-Logic", icon: <Fingerprint size={18}/> }
  ],
  'reliance-industries': [
    { name: "Jio Platforms", group: "Reliance", industry: "Telecom", val: "$65B", pop: "95%", loc: "Navi Mumbai", tech: "5G-Mesh", icon: <Network size={18}/> },
    { name: "Reliance Retail", group: "Reliance", industry: "Consumer", val: "$28B", pop: "92%", loc: "Mumbai, IN", tech: "Auto-Flow", icon: <Box size={18}/> },
    { name: "Reliance O2C", group: "Reliance", industry: "Energy", val: "$75B", pop: "88%", loc: "Jamnagar", tech: "Bio-Fuel", icon: <Zap size={18}/> },
    { name: "Jio Cinema", group: "Reliance", industry: "Media", val: "$5B", pop: "97%", loc: "Mumbai, IN", tech: "Stream-AI", icon: <Radio size={18}/> },
    { name: "Reliance Life", group: "Reliance", industry: "Bio-Tech", val: "$2B", pop: "84%", loc: "Navi Mumbai", tech: "DNA-Sync", icon: <ShieldCheck size={18}/> }
  ],
  'adani-group': [
    { name: "Adani Ports", group: "Adani Group", industry: "Maritime", val: "$22B", pop: "99%", loc: "Mundra, IN", tech: "Maglev", icon: <Ship size={18}/> },
    { name: "Adani Green", group: "Adani Group", industry: "Renewable", val: "$15B", pop: "93%", loc: "Ahmedabad", tech: "Solar-Mesh", icon: <Zap size={18}/> },
    { name: "Adani Total Gas", group: "Adani Group", industry: "Energy", val: "$12B", pop: "87%", loc: "Ahmedabad", tech: "Hydrogen", icon: <Activity size={18}/> },
    { name: "Adani Airports", group: "Adani Group", industry: "Aviation", val: "$8B", pop: "91%", loc: "Navi Mumbai", tech: "Aero-Flow", icon: <Plane size={18}/> },
    { name: "Adani Wilmar", group: "Adani Group", industry: "Logistics", val: "$6B", pop: "85%", loc: "Ahmedabad", tech: "Grid-Sync", icon: <Truck size={18}/> }
  ]
};

const GROUP_META: Record<string, any> = {
  'tata-group': { title: "Neural Infrastructure", accentBg: "bg-blue-600", glowColor: "rgba(59, 130, 246, 0.5)", accentText: "text-blue-400", icon: <Cpu size={24} />, stats: [{ label: "Uptime", val: "99.9%", icon: <Zap size={16}/> }, { label: "Nodes", val: "12.4k", icon: <Globe2 size={16}/> }, { label: "Trust", val: "Lvl 9", icon: <ShieldCheck size={16}/> }], tags: ["Neural-Sync", "Quantum", "Edge"], longDesc: "A century of trust meeting futuristic computing. Tata Group's tech architecture is the backbone of global digital transformation, hosting secured nodes across 46 countries with zero-latency synchronization." },
  'reliance-industries': { title: "Eco-Energy Core", accentBg: "bg-cyan-600", glowColor: "rgba(6, 182, 212, 0.5)", accentText: "text-cyan-400", icon: <Box size={24} />, stats: [{ label: "Market", val: "Top 1", icon: <BarChart3 size={16}/> }, { label: "Jio Hubs", val: "8.2k", icon: <Network size={16}/> }, { label: "Status", val: "Stable", icon: <ShieldCheck size={16}/> }], tags: ["5G-Mesh", "Bio-Fuel", "Scale"], longDesc: "Architecting hyper-scale retail and data ecosystems. Reliance Industries leverages integrated energy solutions and pan-India digital pipelines to provide 1.4 billion citizens with instantaneous connectivity." },
  'adani-group': { title: "Sovereign Foundations", accentBg: "bg-amber-600", glowColor: "rgba(245, 158, 11, 0.5)", accentText: "text-amber-400", icon: <Building2 size={24} />, stats: [{ label: "Cargo", val: "450M", icon: <Ship size={16}/> }, { label: "Units", val: "18.2k", icon: <Layers size={16}/> }, { label: "Growth", val: "+18%", icon: <BarChart3 size={16}/> }], tags: ["Infrastructure", "Net-Zero", "Cargo"], longDesc: "Building the physical frameworks of a modern nation. Adani Group combines maritime mastery with renewable vertical forests, ensuring that national logistics and power grids remain autonomous and sustainable." }
};

export default function SectorPage() {
  const { slug } = useParams();
  const groupKey = (slug as string) || 'tata-group';
  const data = GROUP_META[groupKey] || GROUP_META['tata-group'];
  const entities = SUBSIDIARY_MAINFRAME[groupKey] || SUBSIDIARY_MAINFRAME['tata-group'];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, easing: 'ease-out-cubic' });
    const handleMouseMove = (e: MouseEvent) => {
      const cards = containerRef.current?.querySelectorAll('.glow-card');
      cards?.forEach((card: any) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#021533] text-white pt-32 pb-20 overflow-x-hidden relative selection:bg-white/10">
      <div className={`absolute top-0 right-0 w-full h-full ${data.accentBg}/5 blur-[150px] rounded-full pointer-events-none z-0`} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* TIER 1: THE HERO */}
        <section className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center space-x-3 mb-6">
              <div className={`${data.accentText} p-2 bg-white/5 rounded-lg border border-white/10 shadow-lg`}>{data.icon}</div>
              <span className="text-slate-500 font-bold tracking-[0.4em] uppercase text-[9px]">Mainframe Access Protocol</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase italic leading-[0.9] mb-6">
              {groupKey.replace('-', ' ')} <br/><span className={data.accentText}>{data.title.split(' ')[0]}</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg mb-10 border-l border-white/10 pl-6">
              {data.description}
            </p>
            <Link href="/auth/register">
              <motion.button whileHover={{ scale: 1.05 }} className={`${data.accentBg} text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-2xl`}>
                Register subsidiary <ArrowUpRight size={14} />
              </motion.button>
            </Link>
          </motion.div>

          <div className="relative group h-[450px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute inset-0 z-50 pointer-events-none">
              <motion.div 
                className="absolute inset-0 rounded-[3rem] border-[2px] border-transparent"
                style={{
                  maskImage: `conic-gradient(from 0deg, black 0%, black 15%, transparent 30%, transparent 100%)`,
                  WebkitMaskImage: `conic-gradient(from 0deg, black 0%, black 15%, transparent 30%, transparent 100%)`,
                  borderImage: `conic-gradient(from 0deg, transparent, ${data.glowColor}, transparent) 1`,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt="Group Hero" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#021533] to-transparent opacity-80" />
          </div>
        </section>

        {/* TIER 1.5: DYNAMIC DESCRIPTION PARA (NEW TIER) */}
        <section className="mb-32" data-aos="fade-up">
           <div className="relative p-10 md:p-16 bg-white/[0.01] border border-white/5 rounded-[3rem] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="grid md:grid-cols-4 gap-12 items-start relative z-10">
                 <div className="md:col-span-3">
                    <div className="flex items-center gap-3 mb-6">
                       <FileText size={18} className={data.accentText} />
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic">Division Dossier // decrypted</span>
                    </div>
                    <p className="text-xl md:text-2xl font-bold italic leading-relaxed text-slate-300">
                       {data.longDesc}
                    </p>
                 </div>
                 <div className="space-y-6">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                       <Binary size={24} className={data.accentText} />
                       <h5 className="text-[9px] font-black uppercase tracking-widest mt-4 text-slate-500">Infrastructure Layer</h5>
                       <p className="text-xs font-bold text-white mt-1">Decentralized Mesh Architecture</p>
                    </div>
                 </div>
              </div>
              {/* Vertical CRT Scan Line Animation */}
              <motion.div 
                animate={{ top: ['-10%', '110%'] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[10%] bg-gradient-to-b from-transparent via-white/[0.03] to-transparent pointer-events-none"
              />
           </div>
        </section>

        {/* TIER 2: GROUP HOLDINGS */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/5 pb-8" data-aos="fade-up">
            <div>
              <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter leading-none">
                Group <span className={data.accentText}>Mainframe</span>
              </h2>
              <p className="text-slate-500 text-[9px] uppercase font-bold tracking-[0.5em] mt-3 ml-1">Authorized Asset Registry // Subsidiary Holdings</p>
            </div>
            <div className="mt-6 md:mt-0 flex gap-2">
              {data.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[8px] font-bold uppercase tracking-widest text-slate-400">{tag}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 w-full">
            {entities.map((sub, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="glow-card group relative bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 flex flex-col justify-between h-[380px] overflow-hidden transition-all duration-500 hover:bg-white/[0.04]"
              >
                <div className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <motion.div 
                    className="absolute inset-0 rounded-[2rem] border-[2px] border-transparent"
                    style={{
                      maskImage: `conic-gradient(from 0deg, black 0%, black 15%, transparent 30%)`,
                      WebkitMaskImage: `conic-gradient(from 0deg, black 0%, black 15%, transparent 30%)`,
                      borderImage: `conic-gradient(from 0deg, transparent, ${data.glowColor}, transparent) 1`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
                    style={{ background: `radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), ${data.glowColor.replace('0.5', '0.12')}, transparent 80%)` }} 
                />

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                       <div className={`${data.accentText} p-3 bg-white/5 rounded-xl border border-white/5`}>{sub.icon}</div>
                       <div className="text-right">
                          <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest block">{sub.group}</span>
                          <span className="text-[7px] font-bold text-white/40 uppercase tracking-widest block">{sub.industry}</span>
                       </div>
                    </div>
                    <h4 className="text-lg font-black italic uppercase leading-tight tracking-tighter text-white mb-2">{sub.name}</h4>
                    <div className="grid grid-cols-2 gap-3 mb-6 mt-2">
                        <div className="flex flex-col gap-1">
                            <span className="text-[7px] text-slate-500 uppercase font-black tracking-widest">Net Worth</span>
                            <span className="text-xs font-black italic text-white leading-none">{sub.val}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[7px] text-slate-500 uppercase font-black tracking-widest">Global Rank</span>
                            <div className="flex items-center gap-1">
                               <Star size={8} className="text-amber-400 fill-amber-400" />
                               <span className="text-xs font-black italic text-white leading-none">{sub.pop}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                       <div className="flex items-center gap-1.5">
                          <MapPin size={10} className={data.accentText} />
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{sub.loc}</span>
                       </div>
                       <div className="p-1.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                          <ArrowRight size={12} className={data.accentText} />
                       </div>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TIER 3: GROUP PERFORMANCE HUD */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 w-full">
          {data.stats.map((stat: any, i: number) => (
            <div key={i} data-aos="zoom-in" data-aos-delay={i * 100}>
              <motion.div 
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="glow-card bg-white/[0.01] border border-white/5 p-10 rounded-[3rem] text-center relative overflow-hidden group shadow-2xl transition-all duration-500 hover:bg-white/[0.03]"
              >
                {/* 🌟 1. RADIAL MOUSE GLOW (Background Light) */}
                {/* This follows the mouse cursor inside the card */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${data.glowColor.replace('0.5', '0.15')}, transparent 80%)`
                  }}
                />

                {/* ⚡ 2. THE 30% TRACER BORDER */}
                <div className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <motion.div 
                    className="absolute inset-0 rounded-[3rem] border-[2px] border-transparent"
                    style={{
                      maskImage: `conic-gradient(from 0deg, black 0%, black 15%, transparent 30%)`,
                      WebkitMaskImage: `conic-gradient(from 0deg, black 0%, black 15%, transparent 30%)`,
                      borderImage: `conic-gradient(from 0deg, transparent, ${data.glowColor}, transparent) 1`,
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {/* 📟 3. SCANLINE ANIMATION (Added Interactivity) */}
                <div className="absolute inset-0 w-full h-[2px] bg-white/[0.02] top-[-100%] group-hover:animate-scanline pointer-events-none z-10" />

                {/* CONTENT TIER */}
                <div className="relative z-20">
                  {/* Animated Icon with subtle bounce */}
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className={`${data.accentText} mb-6 flex justify-center drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
                  >
                    {stat.icon}
                  </motion.div>

                  {/* Value with Staggered Entrance */}
                  <motion.h4 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2 group-hover:text-white transition-colors"
                  >
                    {stat.val}
                  </motion.h4>

                  <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.4em] group-hover:tracking-[0.5em] transition-all duration-500">
                    {stat.label}
                  </p>
                </div>

                {/* 💎 4. CORNER DECORATORS (Added Aesthetic) */}
                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/20 rounded-tr-sm group-hover:border-white/60 transition-colors" />
                <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/20 rounded-bl-sm group-hover:border-white/60 transition-colors" />
              </motion.div>
            </div>
          ))}
        </section>
        
        {/* TIER 4: INDUSTRIAL GOVERNANCE (NEW TIER) */}
        <section className="mt-20 border-t border-white/10 pt-20" data-aos="fade-up">
           <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                 <div className="inline-flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
                    <ShieldCheck size={14} className={data.accentText + " animate-pulse mr-2"} />
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-300">Level 9 Security Protocol Active</span>
                 </div>
                 <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-6">Autonomous <br/> <span className="text-white/20">Governance Core.</span></h3>
                 <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                    Each subsidiary operates within the MyCorp decentralized legal framework, ensuring regulatory compliance across multiple jurisdictions via real-time biometric auditing.
                 </p>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                 {[1,2,3,4].map((item) => (
                    <div key={item} className="h-24 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center group hover:bg-white/5 transition-all">
                       <div className="w-12 h-1 bg-white/10 relative overflow-hidden">
                          <motion.div 
                            animate={{ left: ['-100%', '100%'] }} 
                            transition={{ duration: 2, repeat: Infinity, delay: item * 0.5 }}
                            className={`absolute top-0 h-full w-1/2 ${data.accentBg}`} 
                          />
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

      </div>
    </main>
  );
}