'use client';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import { ArrowUpRight, Cpu, Globe2, Building2, Zap, ShieldCheck, BarChart3, Target, Activity, Box, Layers } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// 1. Fully Safelisted Tailwind Glow Effects
const SECTOR_DATA: Record<string, any> = {
  tech: {
    title: "Neural Infrastructure",
    description: "Engineering the spinal cord of modern industry. We build carbon-neutral data hubs and neural nodes that compute the future of decentralized intelligence.",
    accentText: "text-blue-400",
    accentBg: "bg-blue-600",
    glowBorder: "group-hover:border-blue-500/60 hover:border-blue-500/60",
    glowShadow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]",
    glowBackground: "group-hover:bg-blue-500/10",
    icon: <Cpu size={24} />,
    stats: [
      { label: "Uptime", val: "99.99%", icon: <Zap size={16}/> },
      { label: "Nodes", val: "12.4k", icon: <Globe2 size={16}/> },
      { label: "Security", val: "Level 9", icon: <ShieldCheck size={16}/> }
    ],
    imgHero: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
    protocolTitle: "Neural-Mesh Integrity",
    protocolDesc: "Every tech subsidiary is integrated into the MyCorp Neural-Mesh, ensuring zero-latency communication and military-grade encryption by default.",
    tags: ["Neural-Sync", "Zero-Trust", "Edge-Compute"]
  },
  'real-estate': {
    title: "Eco-Steel Verticals",
    description: "Redefining habitation. We specialize in modular skyscrapers and vertical forests that heal the environment while providing premium urban living spaces.",
    accentText: "text-amber-400",
    accentBg: "bg-amber-600",
    glowBorder: "group-hover:border-amber-500/60 hover:border-amber-500/60",
    glowShadow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]",
    glowBackground: "group-hover:bg-amber-500/10",
    icon: <Building2 size={24} />,
    stats: [
      { label: "Sustain", val: "ISO-Z", icon: <ShieldCheck size={16}/> },
      { label: "Units", val: "18.2k", icon: <Layers size={16}/> },
      { label: "Growth", val: "+14.2%", icon: <BarChart3 size={16}/> }
    ],
    imgHero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
    protocolTitle: "Sovereign Foundations",
    protocolDesc: "Our real estate builds utilize carbon-negative steel and AI-managed micro-grids to ensure full resource autonomy for every subsidiary unit.",
    tags: ["Net-Zero", "Smart-Grid", "Biophilic"]
  },
  logistics: {
    title: "Autonomous Flow",
    description: "Global movement at the speed of thought. Our network utilizes autonomous drone swarms and high-speed maglev tubes to sync the global supply chain.",
    accentText: "text-cyan-400",
    accentBg: "bg-cyan-600",
    glowBorder: "group-hover:border-cyan-500/60 hover:border-cyan-500/60",
    glowShadow: "group-hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]",
    glowBackground: "group-hover:bg-cyan-500/10",
    icon: <Box size={24} />,
    stats: [
      { label: "Flow Rate", val: "0.4ms", icon: <Zap size={16}/> },
      { label: "Hubs", val: "890+", icon: <Globe2 size={16}/> },
      { label: "Status", val: "Online", icon: <Activity size={16}/> }
    ],
    imgHero: "https://images.unsplash.com/photo-1580674271209-230493643330?q=80&w=1200",
    protocolTitle: "Kinetic Optimization",
    protocolDesc: "Zero-G sorting and predictive AI routing allow our logistics branches to bypass traditional bottlenecks with 99.9% precision.",
    tags: ["Maglev", "AI-Route", "Autonomous"]
  }
};

export default function SectorPage() {
  const { slug } = useParams();
  const data = SECTOR_DATA[slug as string] || SECTOR_DATA.tech;

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, easing: 'ease-out-cubic' });
  }, []);

  return (
    <main className="min-h-screen bg-[#021533] text-white pt-32 pb-20 overflow-x-hidden relative selection:bg-white/20">
      
      {/* Background Ambience Glow */}
      <div className={`absolute top-[-10%] right-[-10%] w-[800px] h-[800px] ${data.accentBg}/5 blur-[150px] rounded-full pointer-events-none`} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* =========================================
            TIER 1: DISCOVERY HERO 
            ========================================= */}
        <section className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center mb-32 w-full">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="w-full">
            <div className="flex items-center space-x-3 mb-8">
              <div className={`${data.accentText} p-3 bg-white/5 rounded-xl border border-white/10 shadow-lg`}>{data.icon}</div>
              <span className="text-slate-500 font-bold tracking-[0.4em] uppercase text-[9px] md:text-[10px]">Strategic Division</span>
            </div>
            
            {/* Break-words prevents mobile overflow */}
            <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase italic leading-[1.1] mb-6 break-words">
              {slug?.toString().replace('-', ' ')} <br/><span className={data.accentText}>Operations.</span>
            </h1>
            
            <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-lg mb-10 border-l border-white/10 pl-6 md:pl-8">
              {data.description}
            </p>

            <Link href="/auth/register" className="inline-block w-full md:w-auto">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full md:w-auto ${data.accentBg} text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-3 transition-all duration-500 border border-transparent ${data.glowBorder} ${data.glowShadow}`}
              >
                Register Company Here <ArrowUpRight size={16} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Glowing Image Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative w-full aspect-square md:aspect-auto md:h-[500px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/10 group transition-all duration-700 ${data.glowBorder} ${data.glowShadow}`}
          >
            {/* The Light Background Effect on Hover */}
            <div className={`absolute inset-0 opacity-0 transition-opacity duration-700 z-10 ${data.glowBackground}`} />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#021533] to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-700" />
            
            <img src={data.imgHero} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt="Sector Hero" />
            
            <div className="absolute bottom-8 left-8 z-20">
               <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-3 shadow-2xl">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-bold text-white uppercase tracking-widest">Global Ops Active</span>
               </div>
            </div>
          </motion.div>
        </section>

        {/* =========================================
            TIER 2: PERFORMANCE (Glowing KPI Grid) 
            ========================================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 w-full">
          {data.stats.map((stat: any, i: number) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 150} className="w-full">
              <motion.div 
                whileHover={{ y: -8 }}
                className={`bg-white/[0.01] border border-white/5 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] transition-all duration-500 group relative overflow-hidden flex flex-col items-center text-center cursor-default ${data.glowBorder} ${data.glowShadow}`}
              >
                {/* Background Light Fill on Hover */}
                <div className={`absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none ${data.glowBackground}`} />
                
                <div className={`${data.accentText} mb-6 p-4 bg-white/5 rounded-2xl relative z-10 transition-transform duration-500 group-hover:scale-110`}>
                  {stat.icon}
                </div>
                <h4 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2 relative z-10">{stat.val}</h4>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest relative z-10">{stat.label}</p>
              </motion.div>
            </div>
          ))}
        </section>

        {/* =========================================
            TIER 3: PROTOCOLS & REGISTRATION 
            ========================================= */}
        <section className="grid lg:grid-cols-2 gap-8 md:gap-10 items-stretch w-full mb-20" data-aos="fade-up">
           
           {/* Text & Registration Card */}
           <div className={`bg-white/[0.02] border border-white/5 p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] flex flex-col justify-center relative overflow-hidden group transition-all duration-700 ${data.glowBorder} ${data.glowShadow}`}>
              {/* Background Light Fill on Hover */}
              <div className={`absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none z-0 ${data.glowBackground}`} />
              
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none transition-opacity duration-700 group-hover:opacity-10">
                {data.icon}
              </div>
              
              <div className="flex items-center space-x-4 mb-6 relative z-10">
                <Target className={data.accentText} size={24} />
                <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter">{data.protocolTitle}</h3>
              </div>
              
              <p className="text-slate-400 leading-loose text-sm md:text-base mb-10 opacity-90 relative z-10">
                {data.protocolDesc}
              </p>
              
              <div className="flex flex-wrap gap-3 mb-12 relative z-10">
                 {data.tags.map((tag: string) => (
                   <span key={tag} className="text-[8px] md:text-[9px] font-bold text-slate-300 border border-white/10 px-4 py-2 rounded-full uppercase tracking-widest transition-all bg-white/5">{tag}</span>
                 ))}
              </div>

              <Link href="/auth/register" className="relative z-10 inline-block w-full md:w-auto">
                 <button className={`w-full md:w-auto text-[10px] md:text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center md:justify-start space-x-4 text-white group/btn px-6 py-4 rounded-2xl border border-white/10 transition-all duration-500 bg-white/5 ${data.glowBorder} ${data.glowShadow}`}>
                    <span>Register Company</span>
                    <div className={`p-2 rounded-full bg-white/10 transition-all duration-500`}>
                      <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </div>
                 </button>
              </Link>
           </div>
           
           {/* Image & Status Card */}
           <motion.div 
            whileHover={{ scale: 0.98 }}
            className={`relative group rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/10 min-h-[400px] md:min-h-[500px] transition-all duration-700 w-full ${data.glowBorder} ${data.glowShadow}`}
           >
              {/* Background Light Fill on Hover */}
              <div className={`absolute inset-0 opacity-0 transition-opacity duration-700 z-10 ${data.glowBackground}`} />
              
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 transition-all duration-1000" alt="Governance" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#021533] via-[#021533]/40 to-transparent z-10" />
              
              <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
                 <div className={`bg-[#021533]/80 backdrop-blur-2xl p-8 md:p-10 rounded-[2rem] md:rounded-[3.5rem] border border-white/10 text-center max-w-xs transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ${data.glowShadow}`}>
                    <Activity className={data.accentText} size={36}  />
                    <h5 className="font-black italic uppercase text-lg md:text-xl mb-2 md:mb-3">Registry v2.0</h5>
                    <p className="text-[9px] md:text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold leading-relaxed">Auditing new {slug} subsidiaries for deployment.</p>
                 </div>
              </div>
           </motion.div>
        </section>

      </div>
    </main>
  );
}