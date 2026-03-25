'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Globe2, ShieldCheck, Zap, 
  Search, Loader2, ArrowUpRight, MapPin, Network, Cpu 
} from 'lucide-react';
import { myCorpApi } from '@/src/lib/api';

export default function SubsidiaryRegistry() {
  const [subsidiaries, setSubsidiaries] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRegistry = async () => {
      try {
        const data = await myCorpApi.getAllSubsidiaries();
        setSubsidiaries(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Uplink to Registry Failed");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRegistry();
  }, []);

  const filteredSubs = subsidiaries.filter(sub => 
    sub.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#020b1a] text-white pt-32 pb-20 relative selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* 🔮 TIER 1: CENTERED HERO SECTION */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_50%_20%,rgba(37,99,235,0.15),transparent)] pointer-events-none" />
      
      <section className="max-w-7xl mx-auto px-6 mb-24 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center space-x-2 mb-8 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full backdrop-blur-md hover:bg-blue-500/20 transition-colors cursor-default">
            <Network size={14} className="text-blue-400 animate-pulse" />
            <span className="text-blue-400 font-bold tracking-[0.3em] uppercase text-[9px] md:text-[10px]">Ecosystem Intelligence Active</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase leading-[0.9] mb-8">
            Global <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">Registry.</span>
          </h1>
          
          <p className="max-w-2xl text-slate-400 text-sm md:text-lg leading-relaxed mb-12 px-4">
            Real-time synchronization with the MyCorp Mainframe. Explore our verified subsidiaries across multiple high-growth industrial sectors.
          </p>
          
          <div className="relative w-full max-w-xl group px-2">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors z-20" size={20} />
            <input 
              type="text" 
              placeholder="Query System Registry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-8 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/10 transition-all backdrop-blur-xl relative z-10"
            />
          </div>
        </motion.div>
      </section>

      {/* 🏛️ TIER 2: REGISTERED SUBSIDIARIES GRID */}
      <section className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-12 border-b border-white/5 pb-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-green-400" size={24} />
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Verified Entities</h2>
          </div>
          <span className="md:ml-auto text-[10px] font-mono text-slate-500 tracking-[0.2em] uppercase">
            {filteredSubs.length} Active Nodes Discovered
          </span>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="animate-spin text-blue-500" size={44} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 animate-pulse">Establishing Secure Uplink...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence>
              {filteredSubs.map((sub, i) => (
                <motion.div 
                  key={sub.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 group relative overflow-hidden transition-all duration-500 hover:border-blue-500/40 hover:-translate-y-2"
                >
                  {/* Background Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Shimmer Scan Line */}
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-lg shadow-blue-500/10">
                        <Building2 size={28} />
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 bg-green-500/10 text-green-400 text-[9px] font-bold rounded-full border border-green-500/20 group-hover:bg-green-500 group-hover:text-black transition-all">
                          ACTIVE
                        </span>
                      </div>
                    </div>

                    <h3 className="text-[20px] font-black uppercase italic tracking-tighter text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">
                      {sub.companyName}
                    </h3>
                    <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">{sub.sector}</p>
                    
                    <div className="space-y-5 pt-6 border-t border-white/5">
                      <div className="flex items-center gap-3 text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
                        <MapPin size={14} className="text-slate-600 group-hover:text-blue-400" />
                        <span className="truncate">{sub.hqAddress}</span>
                      </div>
                      <a 
                        href={`http://${sub.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between group/link py-2"
                      >
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover/link:text-white transition-colors">Visit Node Portal</span>
                         <div className="p-2 bg-white/5 rounded-lg group-hover/link:bg-blue-500 transition-all">
                            <ArrowUpRight size={16} className="text-blue-500 group-hover/link:text-white transition-transform" />
                         </div>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* 🚀 TIER 3: SYSTEM CAPABILITIES CARDS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Quantum Routing", desc: "AI-driven subsidiary resource allocation.", icon: <Cpu size={22}/>, col: "blue" },
            { title: "Verified Identity", desc: "PostgreSQL backed security for every node.", icon: <ShieldCheck size={22}/>, col: "green" },
            { title: "Rapid Handshake", desc: "Instant sync with the Group Mainframe.", icon: <Zap size={22}/>, col: "amber" },
          ].map((card, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="bg-white/[0.02] border border-white/10 p-10 rounded-[3rem] group hover:bg-white/[0.04] transition-all relative overflow-hidden"
            >
              <div className={`mb-6 text-${card.col}-400 group-hover:scale-125 transition-transform duration-500`}>
                {card.icon}
              </div>
              <h4 className="text-[20px] font-black uppercase italic tracking-tighter text-white mb-4 group-hover:text-blue-400 transition-colors">
                {card.title}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">
                {card.desc}
              </p>
              
              {/* Dynamic light accent */}
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-${card.col}-500/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}