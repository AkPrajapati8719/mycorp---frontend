'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { 
  ArrowRight, Cpu, Building2, Box, Sparkles, ShieldCheck, 
  Target, BarChart3, ArrowUpRight, Globe2, Loader2 
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { myCorpApi } from '@/src/lib/api';

// 🏢 MASTER GROUP BLUEPRINT (Mapped to your [slug]/page.tsx)
const ECOSYSTEM_BLUEPRINT = [
  {
    slug: 'tata-group',
    title: "Neural Infrastructure",
    groupName: "Tata Group",
    subtitle: "Technology Division",
    description: "Built for speed, governed by logic. Engineering the frameworks that compute the future.",
    accent: "text-blue-400",
    bgAccent: "bg-blue-600",
    glowColor: "rgba(59, 130, 246, 0.5)",
    icon: <Cpu size={28} />,
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    stats: { netWorth: "$311B", entities: "29+" },
    achievements: [
      { text: "Lvl 9 Security", icon: <ShieldCheck size={12}/> },
      { text: "Neural-Sync v4", icon: <Target size={12}/> },
      { text: "Verified ISO", icon: <Target size={12}/> }
    ]
  },
  {
    slug: 'reliance-industries',
    title: "Eco-Steel Verticals",
    groupName: "Reliance Industries",
    subtitle: "Real Estate Division",
    description: "Modular skyscrapers and vertical forests. Redefining premium urban habitation.",
    accent: "text-amber-400",
    bgAccent: "bg-amber-600",
    glowColor: "rgba(245, 158, 11, 0.5)",
    icon: <Building2 size={28} />,
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000",
    stats: { netWorth: "$200B", entities: "42+" },
    achievements: [
      { text: "ISO-S Sustain", icon: <ShieldCheck size={12}/> },
      { text: "Net-Zero v2", icon: <BarChart3 size={12}/> },
      { text: "Biophilic Cert", icon: <Target size={12}/> }
    ]
  },
  {
    slug: 'adani-group',
    title: "Autonomous Flow",
    groupName: "Adani Group",
    subtitle: "Logistics Division",
    description: "Drone swarms and maglev tubes. Syncing the global supply chain with precision.",
    accent: "text-cyan-400",
    bgAccent: "bg-cyan-600",
    glowColor: "rgba(6, 182, 212, 0.5)",
    icon: <Box size={28} />,
    img: "https://images.unsplash.com/photo-1580674271209-230493643330?q=80&w=1000",
    stats: { netWorth: "$120B", entities: "15+" },
    achievements: [
      { text: "0.4ms Latency", icon: <Target size={12}/> },
      { text: "AI-Route v9", icon: <BarChart3 size={12}/> },
      { text: "Verified ISO", icon: <ShieldCheck size={12}/> }
    ]
  }
];

export default function SectorsIndexPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSyncing, setIsSyncing] = useState(true);
  const [liveCount, setLiveCount] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, easing: 'ease-out-cubic' });

    const syncWithMainframe = async () => {
      try {
        const jobs = await myCorpApi.getJobs();
        setLiveCount(jobs.length);
      } catch (error) {
        console.error("Mainframe unreachable, using local cache.");
      } finally {
        setIsSyncing(false);
      }
    };
    syncWithMainframe();

    const handleMouseMove = (e: MouseEvent) => {
      const cards = containerRef.current?.querySelectorAll('.pro-glow-card');
      if (!cards) return;
      cards.forEach((card: any) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#021533] text-white pt-32 pb-20 overflow-x-hidden relative selection:bg-white/10">
      
      {/* GLOBAL DYNAMIC BACKGROUND */}
      <div className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-blue-600/5 blur-[200px] rounded-full pointer-events-none z-0 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-600/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* TIER 1: THE DISCOVERY HERO (UNCHANGED) */}
        <section className="text-center mb-32 max-w-4xl mx-auto" data-aos="fade-down">
          <div className="inline-flex items-center justify-center space-x-2 mb-6 bg-white/5 border border-white/10 px-5 py-2 rounded-full backdrop-blur-md">
            <Sparkles size={14} className="text-blue-400 animate-pulse" />
            <span className="text-slate-400 font-bold tracking-[0.4em] uppercase text-[9px] md:text-[10px]">The MyCorp Ecosystem Portal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[1.0] mb-8 px-4 break-words">
            Global operational <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-cyan-400">Divisions.</span>
          </h1>
          
          {isSyncing ? (
            <div className="flex items-center justify-center gap-3 text-blue-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-12">
              <Loader2 size={16} className="animate-spin" /> Synchronizing Sector Data...
            </div>
          ) : (
            <p className="text-slate-400 text-sm md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
              Pioneering industry benchmarks across <span className="text-white font-bold">{liveCount || 3}</span> active operational sectors. Select a division to view live performance data.
            </p>
          )}

          <Link href="/auth/register">
             <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-3 transition-all duration-500 shadow-xl mx-auto"
            >
              Register Global Subsidiary <ArrowUpRight size={18} />
            </motion.button>
          </Link>
        </section>

        {/* TIER 2: THE ECOSYSTEM PORTAL (UPDATED CARDS) */}
        <section className="grid lg:grid-cols-3 gap-8 md:gap-10 w-full mb-32">
          {ECOSYSTEM_BLUEPRINT.map((sector, i) => (
            <div key={sector.slug} data-aos="fade-up" data-aos-delay={i * 150} className="w-full">
              
              <motion.div 
                whileHover={{ y: -15 }}
                className="pro-glow-card relative w-full aspect-[4/5] md:h-[650px] rounded-[3.5rem] overflow-hidden border border-white/10 group transition-all duration-700 h-full flex flex-col justify-between bg-black/40"
                style={{ '--glow-color': sector.glowColor } as any}
              >
                {/* ⚡ INFINITE TRACER BORDER (20% Length Animation) */}
                <div className="absolute inset-0 rounded-[3.5rem] pointer-events-none z-50">
                  <motion.div 
                    className="absolute inset-0 rounded-[3.5rem] border-[2px] border-transparent"
                    style={{
                      maskImage: `conic-gradient(from 0deg, transparent 0%, black 10%, transparent 20%)`,
                      WebkitMaskImage: `conic-gradient(from 0deg, transparent 0%, black 10%, transparent 20%)`,
                      borderImage: `conic-gradient(from 0deg, transparent 0%, ${sector.glowColor} 10%, transparent 20%) 1`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {/* 🌟 RADIAL MOUSE GLOW */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${sector.glowColor.replace('0.5', '0.15')}, transparent 80%)`
                  }}
                />

                <img 
                  src={sector.img} 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 z-0" 
                  alt={sector.groupName} 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#021533] via-[#021533]/70 to-transparent z-10 transition-opacity duration-700 group-hover:opacity-90" />

                <div className="absolute inset-0 z-20 p-10 md:p-12 flex flex-col justify-between h-full">
                  
                  {/* Header: Icon & Dynamic Slug Link */}
                  <div className="flex justify-between items-start">
                    <div className={`${sector.accent} p-4 md:p-5 bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:border-white/40`}>
                      {sector.icon}
                    </div>
                    {/* FIXED: Dynamic link pointing to your [slug]/page.tsx */}
                    <Link href={`/sectors/${sector.slug}`}>
                       <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-white/10">
                          <ArrowUpRight size={20} className={sector.accent} />
                       </div>
                    </Link>
                  </div>

                  <div className="space-y-6">
                    {/* 📊 GROUP STATS CHIPS */}
                    <div className="flex flex-wrap gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 translate-y-4 group-hover:translate-y-0">
                       <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-slate-200">
                         <TrendingUp size={12} className={sector.accent} /> NW: {sector.stats.netWorth}
                       </div>
                       <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-slate-200">
                         <Users size={12} className={sector.accent} /> {sector.stats.entities} Entities
                       </div>
                    </div>

                    <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
                      <span className={`${sector.accent} font-black tracking-[0.4em] uppercase text-[9px] md:text-[10px] mb-3 block`}>
                        {sector.groupName}
                      </span>
                      <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-none mb-4 break-words">
                        {sector.title}
                      </h2>
                      <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 max-w-sm">
                        {sector.description}
                      </p>
                    </div>

                    <Link href={`/sectors/${sector.slug}`} className="block w-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300 translate-y-4 group-hover:translate-y-0">
                       <motion.button 
                        whileHover={{ scale: 1.03 }}
                        className={`w-full ${sector.bgAccent} text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 border border-transparent hover:border-white/20`}
                      >
                        Initialize Mainframe Access <ArrowRight size={14}/>
                      </motion.button>
                    </Link>
                  </div>

                </div>
              </motion.div>
            </div>
          ))}
        </section>

        {/* TIER 3: CONCLUDING STATEMENT (UNCHANGED) */}
        <section className="max-w-4xl mx-auto text-center border-t border-white/5 pt-20 mt-10" data-aos="fade-up">
          <div className="inline-flex items-center justify-center p-5 rounded-full bg-white/5 border border-white/10 mb-8 shadow-xl">
            <Globe2 size={32} className="text-blue-500" />
          </div>
          <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-6">
            Infinite <span className="text-blue-500">Scalability.</span>
          </h3>
          <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
            MyCorp's operational footprint is in a state of continuous expansion. Integrating your subsidiary into our decentralized ecosystem grants immediate access to cross-sector synergy.
          </p>
        </section>

      </div>
    </main>
  );
}

// 📐 HELPER ICONS (Defined outside to prevent conflicts)
function TrendingUp({ size, className }: { size: number, className: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function Users({ size, className }: { size: number, className: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}