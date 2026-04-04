'use client';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { 
  ArrowUpRight, Cpu, Globe2, Building2, Zap, ShieldCheck, 
  BarChart3, Target, Activity, Box, Layers, ArrowRight, 
  Database, Network, Radio, Server, Fingerprint, MapPin, Star,
  Ship, Plane, Truck, History, Briefcase, FileText, Binary, Quote
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// 🏢 MASTER DATA HUB
const SUBSIDIARY_MAINFRAME: Record<string, any[]> = {
  'tata-group': [
    { name: "TCS Neural", group: "Tata Group", industry: "AI Systems", val: "$142B", pop: "98%", loc: "Mumbai, IN", tech: "Neural-Sync", url: "https://www.tcs.com", desc: "The world's most trusted IT powerhouse, managing the digital backbone of the Fortune 500.", icon: <Database size={18}/> },
    { name: "Tata Motors EV", group: "Tata Group", industry: "Automotive", val: "$22B", pop: "94%", loc: "Pune, IN", tech: "Giga-Cell", url: "https://www.tatamotors.com", desc: "Redefining mobility with India's largest electric fleet and Jaguar Land Rover's luxury heritage.", icon: <Activity size={18}/> },
    { name: "Tata Steel", group: "Tata Group", industry: "Materials", val: "$18B", pop: "91%", loc: "Jamshedpur", tech: "Eco-Steel", url: "https://www.tatasteel.com", desc: "A global top-ten steel producer driving infrastructure with sustainable metallurgy.", icon: <Layers size={18}/> },
    { name: "Tata Power", group: "Tata Group", industry: "Energy", val: "$12B", pop: "89%", loc: "Mumbai, IN", tech: "Smart-Grid", url: "https://www.tatapower.com", desc: "Leading the green transition with massive solar microgrids and pan-India EV networks.", icon: <Zap size={18}/> },
    { name: "Titan Digital", group: "Tata Group", industry: "Precision", val: "$31B", pop: "96%", loc: "Bangalore", tech: "Nano-Logic", url: "https://www.titancompany.in", desc: "Mastering precision engineering from iconic timepieces to high-tech wearable nodes.", icon: <Fingerprint size={18}/> }
  ],
  'reliance-industries': [
    { name: "Jio Platforms", group: "Reliance", industry: "Telecom", val: "$65B", pop: "95%", loc: "Navi Mumbai", tech: "5G-Mesh", url: "https://www.jio.com", desc: "The engine of digital India, providing hyper-speed connectivity to millions.", icon: <Network size={18}/> },
    { name: "Reliance Retail", group: "Reliance", industry: "Consumer", val: "$28B", pop: "92%", loc: "Mumbai, IN", tech: "Auto-Flow", url: "https://www.relianceretail.com", desc: "India's largest retail ecosystem, bridging digital commerce and physical logistics.", icon: <Box size={18}/> },
    { name: "Reliance O2C", group: "Reliance", industry: "Energy", val: "$75B", pop: "88%", loc: "Jamnagar", tech: "Bio-Fuel", url: "https://www.ril.com", desc: "Operating the world's largest refinery complex while pivoting toward green-hydrogen.", icon: <Zap size={18}/> },
    { name: "Jio Cinema", group: "Reliance", industry: "Media", val: "$5B", pop: "97%", loc: "Mumbai, IN", tech: "Stream-AI", url: "https://www.jiocinema.com", desc: "Dominating the entertainment landscape with exclusive sports and original content.", icon: <Radio size={18}/> },
    { name: "Reliance Life", group: "Reliance", industry: "Bio-Tech", val: "$2B", pop: "84%", loc: "Navi Mumbai", tech: "DNA-Sync", url: "https://www.relbio.com", desc: "Advancing precision medicine and molecular diagnostics for a bio-secure future.", icon: <ShieldCheck size={18}/> }
  ],
  'adani-group': [
    { name: "Adani Ports", group: "Adani Group", industry: "Maritime", val: "$22B", pop: "99%", loc: "Mundra, IN", tech: "Maglev", url: "https://www.adaniports.com", desc: "Managing India's gateway to the world via automated ports and smart SEZ corridors.", icon: <Ship size={18}/> },
    { name: "Adani Green", group: "Adani Group", industry: "Renewable", val: "$15B", pop: "93%", loc: "Ahmedabad", tech: "Solar-Mesh", url: "https://www.adanigreenenergy.com", desc: "Building the world's largest renewable energy parks to power a sustainable economy.", icon: <Zap size={18}/> },
    { name: "Adani Total Gas", group: "Adani Group", industry: "Energy", val: "$12B", pop: "87%", loc: "Ahmedabad", tech: "Hydrogen", url: "https://www.adanigas.com", desc: "Supplying clean energy through the nation's most extensive piped natural gas network.", icon: <Activity size={18}/> },
    { name: "Adani Airports", group: "Adani Group", industry: "Aviation", val: "$8B", pop: "91%", loc: "Navi Mumbai", tech: "Aero-Flow", url: "https://www.adani.com/business/airports", desc: "Modernizing air travel hubs with AI-driven passenger management.", icon: <Plane size={18}/> },
    { name: "Adani Wilmar", group: "Adani Group", industry: "Logistics", val: "$6B", pop: "85%", loc: "Ahmedabad", tech: "Grid-Sync", url: "https://www.adaniwilmar.com", desc: "Securing the nation's food chain through hyper-efficient manufacturing.", icon: <Truck size={18}/> }
  ]
};

const GROUP_META: Record<string, any> = {
  'tata-group': { 
    title: "Neural Infrastructure", 
    accentBg: "bg-blue-600", 
    glowColor: "rgba(37, 99, 235, 0.12)", 
    accentText: "text-blue-600", 
    icon: <Cpu size={24} />, 
    stats: [{ label: "Uptime", val: "99.9%", icon: <Zap size={16}/> }, { label: "Nodes", val: "12.4k", icon: <Globe2 size={16}/> }, { label: "Trust", val: "Lvl 9", icon: <ShieldCheck size={16}/> }], 
    tags: ["Neural-Sync", "Quantum", "Edge"], 
    started: "1868",
    vision: "Leadership with Trust",
    longDesc: "Tata Group's tech architecture is the backbone of global digital transformation. From the early industrial days to AI-driven neural nodes, the group has spent over 150 years building institutional trust through precision engineering and ethical governance. Today, it hosts secured nodes across 46 countries." 
  },
  'reliance-industries': { 
    title: "Eco-Energy Core", 
    accentBg: "bg-cyan-600", 
    glowColor: "rgba(6, 182, 212, 0.12)", 
    accentText: "text-cyan-600", 
    icon: <Box size={24} />, 
    stats: [{ label: "Market", val: "Top 1", icon: <BarChart3 size={16}/> }, { label: "Jio Hubs", val: "8.2k", icon: <Network size={16}/> }, { label: "Status", val: "Stable", icon: <ShieldCheck size={16}/> }], 
    tags: ["5G-Mesh", "Bio-Fuel", "Scale"], 
    started: "1958",
    vision: "Growth is Life",
    longDesc: "Reliance Industries is an agile conglomerate that redefined the Indian consumer landscape. By architecting hyper-scale retail and data ecosystems, Reliance provides connectivity to 1.4 billion citizens through its pan-India digital pipeline." 
  },
  'adani-group': { 
    title: "Sovereign Foundations", 
    accentBg: "bg-amber-600", 
    glowColor: "rgba(245, 158, 11, 0.12)", 
    accentText: "text-amber-600", 
    icon: <Building2 size={24} />, 
    stats: [{ label: "Cargo", val: "450M", icon: <Ship size={16}/> }, { label: "Units", val: "18.2k", icon: <Layers size={16}/> }, { label: "Growth", val: "+18%", icon: <BarChart3 size={16}/> }], 
    tags: ["Infrastructure", "Net-Zero", "Cargo"], 
    started: "1988",
    vision: "Nation Building",
    longDesc: "Developing the critical physical frameworks of a modern nation. Adani Group combines maritime mastery with renewable vertical forests, ensuring national logistics and energy security remain autonomous." 
  }
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
      const cards = containerRef.current?.querySelectorAll('[class*="glow-card"]');
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
    <main ref={containerRef} className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-32 pb-20 overflow-x-hidden relative selection:bg-blue-100">
      <div className={`absolute top-0 right-0 w-full h-full ${data.accentBg}/5 blur-[150px] rounded-full pointer-events-none z-0`} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* TIER 1: HERO */}
        <section className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center space-x-3 mb-6">
              <div className={`${data.accentText} p-2 bg-white shadow-sm rounded-lg border border-slate-200`}>{data.icon}</div>
              <span className="text-slate-500 font-bold tracking-[0.4em] uppercase text-[9px]">Cyber-Registry Protocol</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight uppercase italic leading-[0.9] mb-6">
              {groupKey.replace('-', ' ')} <br/><span className={data.accentText}>{data.title.split(' ')[0]}</span>
            </h1>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-lg mb-10 border-l border-slate-200 pl-6 italic">
              "Starting our journey in {data.started}, we operate with the vision of {data.vision}."
            </p>
            <Link href="/auth/register">
              <motion.button whileHover={{ scale: 1.05 }} className={`bg-slate-900 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl`}>
                Register subsidiary <ArrowUpRight size={14} />
              </motion.button>
            </Link>
          </motion.div>

          <div className="relative group h-[450px] rounded-[3rem] overflow-hidden border border-slate-200 bg-white shadow-xl">
            <div className="absolute inset-0 z-50 pointer-events-none">
              <motion.div 
                className="absolute inset-0 rounded-[3rem] border-[2px] border-transparent"
                style={{
                  maskImage: `conic-gradient(from 0deg, black 0%, black 15%, transparent 30%, transparent 100%)`,
                  WebkitMaskImage: `conic-gradient(from 0deg, black 0%, black 15%, transparent 30%, transparent 100%)`,
                  borderImage: `conic-gradient(from 0deg, transparent, #94a3b8, #3b82f6, transparent) 1`,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt="Group Hero" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
          </div>
        </section>

        {/* TIER 1.5: FAMILIAR EXPLANATION */}
        <section className="mb-32" data-aos="fade-up">
           <div className="relative p-10 md:p-16 bg-white border border-slate-200 rounded-[3.5rem] overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              <div className="grid md:grid-cols-4 gap-12 items-start relative z-10">
                 <div className="md:col-span-3">
                    <div className="flex items-center gap-3 mb-8">
                       <Quote size={20} className={data.accentText} />
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Institutional Dossier // Active Archive</span>
                    </div>
                    <p className="text-xl md:text-3xl font-bold italic leading-tight text-slate-800 mb-8">
                       {data.longDesc}
                    </p>
                    <div className="flex gap-4">
                       <span className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500">Legacy: Since {data.started}</span>
                       <span className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500">Philosophy: {data.vision}</span>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] text-center">
                       <History size={24} className={data.accentText + " mx-auto mb-4"} />
                       <h5 className="text-[9px] font-black uppercase tracking-widest text-slate-400">Established Foundation</h5>
                       <p className="text-2xl font-black italic text-slate-900 mt-1">{data.started}</p>
                    </div>
                 </div>
              </div>
              <motion.div animate={{ top: ['-10%', '110%'] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="absolute left-0 w-full h-[15%] bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />
           </div>
        </section>

        {/* TIER 2: GROUP HOLDINGS */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-slate-200 pb-8" data-aos="fade-up">
            <div>
              <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
                Sub-Sector <span className={data.accentText}>Companies</span>
              </h2>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.5em] mt-4 ml-1 italic">Exploring the decentralized arms of {groupKey.replace('-', ' ')}</p>
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
                onClick={() => window.open(sub.url, '_blank')}
                className="glow-card group relative bg-white border border-slate-200 rounded-[2rem] p-6 flex flex-col justify-between min-h-[420px] overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl"
              >
                <div className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <motion.div 
                    className="absolute inset-0 rounded-[2rem] border-[2px] border-transparent"
                    style={{
                      maskImage: `conic-gradient(from 0deg, black 0%, black 15%, transparent 30%)`,
                      WebkitMaskImage: `conic-gradient(from 0deg, black 0%, black 15%, transparent 30%)`,
                      borderImage: `conic-gradient(from 0deg, transparent, #94a3b8, #3b82f6, transparent) 1`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
                    style={{ background: `radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), ${data.glowColor}, transparent 80%)` }} 
                />

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                       <div className={`${data.accentText} p-3 bg-slate-50 shadow-sm rounded-xl border border-slate-100 group-hover:scale-110 transition-transform`}>{sub.icon}</div>
                       <div className="text-right">
                          <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest block">{sub.group}</span>
                          <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest block">{sub.industry}</span>
                       </div>
                    </div>
                    <h4 className="text-lg font-black italic uppercase leading-tight tracking-tighter text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{sub.name}</h4>
                    <p className="text-[10px] text-slate-500 italic leading-relaxed mb-6 border-l border-slate-100 pl-3">
                       {sub.desc}
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-6 mt-2">
                        <div className="flex flex-col gap-1">
                            <span className="text-[7px] text-slate-400 uppercase font-black tracking-widest">Net Worth</span>
                            <span className="text-xs font-black italic text-slate-900 leading-none">{sub.val}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[7px] text-slate-400 uppercase font-black tracking-widest">Global Rank</span>
                            <div className="flex items-center gap-1">
                               <Star size={8} className="text-amber-500 fill-amber-500" />
                               <span className="text-xs font-black italic text-slate-900 leading-none">{sub.pop}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                       <div className="flex items-center gap-1.5">
                          <MapPin size={10} className={data.accentText} />
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{sub.loc}</span>
                       </div>
                       <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                          <ArrowRight size={12} />
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
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="glow-card-tier3 bg-white border border-slate-200 p-10 rounded-[3rem] text-center relative overflow-hidden group shadow-sm transition-all duration-500 hover:shadow-2xl"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{ background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${data.glowColor}, transparent 80%)` }}
                />
                <div className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <motion.div 
                    className="absolute inset-0 rounded-[3rem] border-[2px] border-transparent"
                    style={{
                      maskImage: `conic-gradient(from 0deg, black 0%, black 15%, transparent 30%)`,
                      WebkitMaskImage: `conic-gradient(from 0deg, black 0%, black 15%, transparent 30%)`,
                      borderImage: `conic-gradient(from 0deg, transparent, #94a3b8, #3b82f6, transparent) 1`,
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div className="absolute inset-0 w-full h-[2px] bg-blue-500/5 top-[-100%] group-hover:animate-scanline pointer-events-none z-10" />
                <div className="relative z-20">
                  <motion.div whileHover={{ scale: 1.2, rotate: 5 }} className={`${data.accentText} mb-6 flex justify-center drop-shadow-sm`}>
                    {stat.icon}
                  </motion.div>
                  <motion.h4 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">
                    {stat.val}
                  </motion.h4>
                  <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.4em] group-hover:tracking-[0.5em] transition-all duration-500">
                    {stat.label}
                  </p>
                </div>
                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-slate-200 rounded-tr-sm group-hover:border-blue-300 transition-colors" />
                <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-slate-200 rounded-bl-sm group-hover:border-blue-300 transition-colors" />
              </motion.div>
            </div>
          ))}
        </section>
        
        {/* TIER 4: INDUSTRIAL GOVERNANCE */}
        <section className="mt-20 border-t border-slate-200 pt-20" data-aos="fade-up">
           <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                 <div className="inline-flex items-center px-4 py-2 bg-slate-50 border border-slate-200 rounded-full mb-6">
                    <ShieldCheck size={14} className={data.accentText + " animate-pulse mr-2"} />
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Level 9 Security Protocol Active</span>
                 </div>
                 <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-6 text-slate-900">Autonomous <br/> <span className="text-slate-400">Governance Core.</span></h3>
                 <p className="text-slate-500 text-sm leading-relaxed max-w-md font-medium">
                    Each subsidiary operates within the MyCorp decentralized legal framework, ensuring regulatory compliance across multiple jurisdictions via real-time biometric auditing.
                 </p>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                 {[1,2,3,4].map((item) => (
                    <div key={item} className="h-24 bg-white border border-slate-100 rounded-2xl flex items-center justify-center group hover:bg-slate-50 transition-all shadow-sm">
                       <div className="w-12 h-1 bg-slate-100 relative overflow-hidden rounded-full">
                          <motion.div animate={{ left: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity, delay: item * 0.5 }} className={`absolute top-0 h-full w-1/2 ${data.accentBg}`} />
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