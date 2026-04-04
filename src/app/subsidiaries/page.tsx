'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Globe2, ShieldCheck, Zap, 
  Search, Loader2, ArrowUpRight, MapPin, Network, Cpu, X, Fingerprint, Calendar, Phone, Mail
} from 'lucide-react';
import { myCorpApi } from '@/src/lib/api';

export default function SubsidiaryRegistry() {
  const [subsidiaries, setSubsidiaries] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSub, setSelectedSub] = useState<any | null>(null); // 🆕 Track clicked subsidiary

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
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-48 pb-20 relative selection:bg-blue-100 overflow-x-hidden">
      
      {/* 🔮 TIER 1: CENTERED HERO SECTION */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_50%_20%,rgba(37,99,235,0.05),transparent)] pointer-events-none" />
      
      <section className="max-w-7xl mx-auto px-6 mb-24 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center space-x-2 mb-8 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm backdrop-blur-md hover:bg-slate-50 transition-colors cursor-default">
            <Network size={14} className="text-blue-600 animate-pulse" />
            <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-[9px] md:text-[10px]">Ecosystem Intelligence Active</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase leading-[0.9] mb-8 text-slate-900">
            Global <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">Registry.</span>
          </h1>
          
          <p className="max-w-2xl text-slate-500 text-sm md:text-lg leading-relaxed mb-12 px-4 font-medium">
            Real-time synchronization with the MyCorp Mainframe. Explore our verified subsidiaries across multiple high-growth industrial sectors.
          </p>
          
          <div className="relative w-full max-w-xl group px-2">
            <div className="absolute inset-0 bg-blue-500/10 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors z-20" size={20} />
            <input 
              type="text" 
              placeholder="Query System Registry..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-5 pl-14 pr-8 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all shadow-sm relative z-10 text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </motion.div>
      </section>

      {/* 🏛️ TIER 2: REGISTERED SUBSIDIARIES GRID */}
      <section className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-12 border-b border-slate-200 pb-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-blue-600" size={24} />
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Verified Entities</h2>
          </div>
          <span className="md:ml-auto text-[10px] font-mono text-slate-400 tracking-[0.2em] uppercase font-bold">
            {filteredSubs.length} Active Nodes Discovered
          </span>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="animate-spin text-blue-600" size={44} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 animate-pulse">Establishing Secure Uplink...</span>
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
                  onClick={() => setSelectedSub(sub)} // 🆕 Card is now clickable
                  className="bg-white border border-slate-200 rounded-[2.5rem] p-8 group relative overflow-hidden transition-all duration-500 hover:border-blue-200 hover:shadow-2xl hover:-translate-y-2 shadow-sm cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shadow-sm">
                        <Building2 size={28} />
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 bg-green-50 text-green-600 text-[9px] font-black rounded-full border border-green-100">
                          ACTIVE
                        </span>
                      </div>
                    </div>

                    <h3 className="text-[20px] font-black uppercase italic tracking-tighter text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {sub.companyName}
                    </h3>
                    <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8">{sub.sector}</p>
                    
                    <div className="space-y-5 pt-6 border-t border-slate-100">
                      <div className="flex items-center gap-3 text-xs text-slate-500 group-hover:text-slate-700 transition-colors font-medium">
                        <MapPin size={14} className="text-slate-400 group-hover:text-blue-600" />
                        <span className="truncate">{sub.hqAddress}</span>
                      </div>
                      <div className="flex items-center justify-between group/link py-2">
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">Open Record Dossier</span>
                         <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-slate-900 transition-all">
                            <ArrowUpRight size={16} className="text-slate-900 group-hover:text-white transition-transform" />
                         </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* 🆕 SUBSIDIARY DOSSIER MODAL */}
      <AnimatePresence>
        {selectedSub && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center p-4 md:p-6 pt-32 md:pt-32 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedSub(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md cursor-zoom-out"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl bg-white border border-slate-200 rounded-[3rem] relative z-10 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)]"
            >
              {/* Modal Header */}
              <div className="bg-slate-50 border-b border-slate-100 px-10 py-8 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Fingerprint size={24} className="text-blue-600" />
                  <h2 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">Entity Record</h2>
                </div>
                <button onClick={() => setSelectedSub(null)} className="text-slate-400 hover:text-slate-900 transition-colors p-2"><X size={28} /></button>
              </div>

              {/* Modal Body */}
              <div className="p-10 space-y-10 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Corporate Identity</span>
                    <p className="text-2xl font-black text-slate-900 italic uppercase leading-none">{selectedSub.companyName}</p>
                    <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest mt-2">{selectedSub.sector}</p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Registration ID</span>
                    <p className="text-lg font-black text-slate-900 font-mono tracking-tight">{selectedSub.registrationId}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-y border-slate-100 py-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-2"><MapPin size={12}/> Presence</span>
                    <p className="text-xs font-bold text-slate-700">{selectedSub.hqAddress}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-2"><Calendar size={12}/> Integration</span>
                    <p className="text-xs font-bold text-slate-700">{selectedSub.incorporationDate || 'Verified Node'}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-2"><ShieldCheck size={12}/> Security</span>
                    <p className="text-xs font-black text-green-600 uppercase tracking-widest">Authorized</p>
                  </div>
                </div>

                {/* Contact Uplink Box */}
                <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8">
                  <h4 className="text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Contact Protocols</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600"><Mail size={18}/></div>
                       <p className="text-xs font-bold text-blue-900 truncate">{selectedSub.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600"><Phone size={18}/></div>
                       <p className="text-xs font-bold text-blue-900">{selectedSub.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 border-t border-slate-100 px-10 py-6 flex justify-end gap-4">
                <button onClick={() => window.open(`http://${selectedSub.website}`, '_blank')} className="px-10 py-4 rounded-full bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all flex items-center gap-2 shadow-xl shadow-slate-200">
                  Visit Mainframe <ArrowUpRight size={14}/>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🚀 TIER 3: SYSTEM CAPABILITIES CARDS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Quantum Routing", desc: "AI-driven subsidiary resource allocation.", icon: <Cpu size={22}/>, color: "blue" },
            { title: "Verified Identity", desc: "PostgreSQL backed security for every node.", icon: <ShieldCheck size={22}/>, color: "indigo" },
            { title: "Rapid Handshake", desc: "Instant sync with the Group Mainframe.", icon: <Zap size={22}/>, color: "blue" },
          ].map((card, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="bg-white border border-slate-200 p-10 rounded-[3rem] group hover:shadow-xl transition-all relative overflow-hidden shadow-sm"
            >
              <div className={`mb-6 text-${card.color}-600 group-hover:scale-125 transition-transform duration-500`}>
                {card.icon}
              </div>
              <h4 className="text-[20px] font-black uppercase italic tracking-tighter text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                {card.title}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-700 transition-colors font-medium">
                {card.desc}
              </p>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}