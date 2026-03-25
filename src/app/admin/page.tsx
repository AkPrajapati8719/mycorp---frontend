'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Globe2, ShieldAlert, Database, Users, DollarSign, 
  Activity, CheckCircle2, XCircle, Search, Eye, AlertTriangle, Fingerprint, MapPin, X, Loader2, Mail
} from 'lucide-react';
import { myCorpApi } from '@/src/lib/api'; 
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Global Command');
  const [selectedDossier, setSelectedDossier] = useState<any | null>(null);
  const [subsidiaries, setSubsidiaries] = useState<any[]>([]);
  const [userGrid, setUserGrid] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🚀 FETCH LIVE REGISTRY & INTELLIGENCE FROM SPRING BOOT
  useEffect(() => {
    const session = localStorage.getItem('mycorp_user');
    const userData = session ? JSON.parse(session) : null;

    if (!userData || userData.role !== 'ROLE_ADMIN') {
      router.push('/auth/login');
      return;
    }

    fetchAllSystemData();
  }, [router]);

  const fetchAllSystemData = async () => {
    try {
      setIsLoading(true);
      // 🛰️ Multi-Stream Handshake
      const [subsData, intelData, msgData] = await Promise.all([
        myCorpApi.getAllSubsidiaries(),
        myCorpApi.getAdminUserGrid(),
        myCorpApi.getAdminMessages()
      ]);
      
      setSubsidiaries(Array.isArray(subsData) ? subsData : [subsData]);
      setUserGrid(intelData);
      setMessages(msgData);
    } catch (error) {
      console.error("Mainframe Sync Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  const menuItems = [
    { name: 'Global Command', icon: <Globe2 size={18}/> },
    { name: 'User Intelligence', icon: <Users size={18}/> },
    { name: 'Inquiry Inbox', icon: <Mail size={18}/> },
    { name: 'Network Registry', icon: <Database size={18}/> },
  ];

  return (
    <main className="min-h-screen bg-[#021533] text-white flex overflow-hidden selection:bg-cyan-500/30 pt-28 md:pt-36 relative">
      
      <div className="fixed top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-blue-600/5 blur-[200px] rounded-full pointer-events-none z-0 animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-red-600/5 blur-[200px] rounded-full pointer-events-none z-0" />

      <aside className="w-20 lg:w-72 border-r border-white/10 bg-[#021024]/80 backdrop-blur-3xl hidden md:flex flex-col justify-between relative z-20 shadow-[20px_0_50px_rgba(0,0,0,0.5)] rounded-tr-3xl">
        <div>
          <div className="h-20 flex items-center px-8 border-b border-white/5 bg-red-500/5">
            <span className="text-red-400 font-bold tracking-[0.3em] uppercase text-[10px] flex items-center gap-2">
              <Fingerprint size={14}/> Master Override
            </span>
          </div>

          <nav className="p-4 space-y-2 mt-2">
            {menuItems.map((item) => (
              <div 
                key={item.name} 
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center space-x-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 group ${
                  activeTab === item.name 
                    ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                    : 'border border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className={`${activeTab === item.name ? 'text-cyan-400' : 'text-slate-500 group-hover:text-white'} transition-all`}>
                  {item.icon}
                </div>
                <span className="hidden lg:block text-xs font-bold uppercase tracking-widest">{item.name}</span>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <section className="flex-1 h-full overflow-y-auto relative z-10 pb-20">
        
        <header className="px-6 md:px-12 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 bg-transparent sticky top-0 z-30">
          <div>
            <div className="inline-flex items-center space-x-2 mb-4 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-full backdrop-blur-md">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-[9px]">Global Overseer Active</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase text-white leading-none">
              Group <br className="md:hidden" />Admin.
            </h1>
          </div>
          
          <div className="relative group w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search size={14} />
            </div>
            <input 
              type="text" 
              placeholder="Search Global Registry..." 
              className="w-full md:w-64 bg-black/40 border border-white/10 rounded-full pl-10 pr-6 py-3 text-[10px] text-white font-bold uppercase tracking-widest placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
            />
          </div>
        </header>

        <div className="p-6 md:p-12">
          
         {/* KPI TIER */}
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible" 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10"
        >
          {[
            { 
              label: 'Total Subsidiaries', 
              value: subsidiaries.length, 
              icon: <Database size={18} />, 
              tab: 'Network Registry',
              color: 'cyan'
            },
            { 
              label: 'Authorized Users', 
              value: userGrid.length, 
              icon: <Users size={18} />, 
              tab: 'User Intelligence',
              color: 'amber'
            },
            { 
              label: 'Network Valuation', 
              value: '$14.2B', 
              icon: <DollarSign size={18} />, 
              tab: 'Global Command',
              color: 'green'
            },
            { 
              label: 'Unread Inquiries', 
              value: messages.length, 
              icon: <Mail size={18} />, 
              tab: 'Inquiry Inbox',
              color: 'blue'
            }
          ].map((kpi, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              onClick={() => setActiveTab(kpi.tab)}
              className={`relative overflow-hidden cursor-pointer bg-white/[0.02] border border-white/10 p-6 rounded-[2rem] group transition-all duration-500 
                ${kpi.color === 'cyan' ? 'hover:border-cyan-500/50' : ''}
                ${kpi.color === 'amber' ? 'hover:border-amber-500/50' : ''}
                ${kpi.color === 'green' ? 'hover:border-green-500/50' : ''}
                ${kpi.color === 'blue' ? 'hover:border-blue-500/50' : ''}
              `}
            >
              {/* 💡 THE GLOW: Background light effect on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                ${kpi.color === 'cyan' ? 'bg-cyan-500/5' : ''}
                ${kpi.color === 'amber' ? 'bg-amber-500/5' : ''}
                ${kpi.color === 'green' ? 'bg-green-500/5' : ''}
                ${kpi.color === 'blue' ? 'bg-blue-500/5' : ''}
              `} />

              {/* ⚡ THE SHIMMER: Moving light streak */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none" />

              <div className="relative z-10">
                <div className={`mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]
                  ${kpi.color === 'cyan' ? 'text-cyan-400' : ''}
                  ${kpi.color === 'amber' ? 'text-amber-400' : ''}
                  ${kpi.color === 'green' ? 'text-green-400' : ''}
                  ${kpi.color === 'blue' ? 'text-blue-400' : ''}
                `}>
                  {kpi.icon}
                </div>
                
                <h4 className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-1 group-hover:text-slate-300 transition-colors">
                  {kpi.label}
                </h4>
                
                <p className="text-2xl md:text-3xl font-black italic text-white transition-all group-hover:tracking-tighter">
                  {isLoading ? '...' : kpi.value}
                </p>
              </div>

              {/* Decorative corner light */}
              <div className={`absolute -top-4 -right-4 w-12 h-12 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                ${kpi.color === 'cyan' ? 'bg-cyan-500' : ''}
                ${kpi.color === 'amber' ? 'bg-amber-500' : ''}
                ${kpi.color === 'green' ? 'bg-green-500' : ''}
                ${kpi.color === 'blue' ? 'bg-blue-500' : ''}
              `} />
            </motion.div>
          ))}
        </motion.div>

          {/* TAB CONTENT */}
          <AnimatePresence mode="wait">
            
            {/* 1. GLOBAL COMMAND (Network Registry Table) */}
            {(activeTab === 'Global Command' || activeTab === 'Network Registry') && (
              <motion.div key="registry" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3 mb-6">
                  <AlertTriangle size={20} className="text-amber-400" /> Live Registry Audit
                </h3>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 text-cyan-400">
                    <Loader2 className="animate-spin mb-4" size={40} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Handshaking with PostgreSQL...</span>
                  </div>
                ) : (
                  subsidiaries.map((sub) => (
                    <div key={sub.id} className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 hover:bg-white/[0.04] transition-all group flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden">
                      <div className="relative z-10 flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">ID: {sub.registrationId}</span>
                          <h4 className="text-lg font-black text-white">{sub.companyName}</h4>
                          <p className="text-xs text-amber-400 mt-1 flex items-center gap-1"><Globe2 size={12}/> {sub.sector}</p>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Financial Tier</span>
                          <p className="text-sm font-bold text-white mt-1 flex items-center gap-2"><DollarSign size={14} className="text-slate-400"/> {sub.revenueTier}</p>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Uplink Status</span>
                          <p className="text-sm font-bold text-green-400 mt-1 uppercase">{sub.status}</p>
                        </div>
                      </div>
                      <button onClick={() => setSelectedDossier(sub)} className="bg-blue-500/10 border border-blue-500/30 text-blue-400 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2">
                        <Eye size={14} /> Dossier
                      </button>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {/* 2. USER INTELLIGENCE (Joined Table) */}
            {activeTab === 'User Intelligence' && (
              <motion.div key="intel" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[9px] uppercase tracking-[0.3em] text-slate-500">
                    <tr>
                      <th className="p-6">User Identity</th>
                      <th className="p-6">Company Link</th>
                      <th className="p-6">Year</th>
                      <th className="p-6">Reg No</th>
                      <th className="p-6 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {userGrid.map((row, i) => (
                      <tr key={i} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-6 font-mono text-cyan-400">{row.email}</td>
                        <td className="p-6 font-bold uppercase">{row.companyName}</td>
                        <td className="p-6 text-slate-400">{row.incorporationYear}</td>
                        <td className="p-6 text-slate-500 font-mono">{row.registrationId}</td>
                        <td className="p-6 text-right">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase ${row.status === 'INTEGRATED' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}

            {/* 3. INQUIRY INBOX */}
            {activeTab === 'Inquiry Inbox' && (
              <motion.div key="inbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 gap-6">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-white/[0.02] border border-white/10 p-8 rounded-[2.5rem] relative group hover:border-blue-500/30 transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl"><Mail size={20}/></div>
                      <span className="text-[10px] font-mono text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h4 className="text-xl font-black italic uppercase tracking-tighter mb-1">{msg.name}</h4>
                    <p className="text-blue-400 text-xs font-bold mb-4">{msg.email}</p>
                    <p className="text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">"{msg.message}"</p>
                  </div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      {/* DOSSIER MODAL */}
      <AnimatePresence>
        {selectedDossier && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedDossier(null)} className="absolute inset-0 bg-[#021024]/90 backdrop-blur-md cursor-pointer" />
            <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" className="w-full max-w-2xl bg-[#021533] border border-white/10 rounded-[2.5rem] relative z-10 overflow-hidden shadow-2xl">
              <div className="bg-white/5 border-b border-white/10 px-8 py-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Fingerprint size={20} className="text-cyan-400" />
                  <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">Registry Record</h2>
                </div>
                <button onClick={() => setSelectedDossier(null)} className="text-slate-500 hover:text-white"><X size={24} /></button>
              </div>

              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Company Entity</span>
                    <p className="text-white font-bold">{selectedDossier.companyName}</p>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">HQ Location</span>
                    <p className="text-cyan-400 font-bold text-sm">{selectedDossier.hqAddress}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 border-y border-white/5 py-6">
                  <div>
                    <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">CEO / Owner</span>
                    <p className="text-white text-sm">{selectedDossier.ownerName}</p>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Compliance Officer</span>
                    <p className="text-white text-sm">{selectedDossier.officerName}</p>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Status</span>
                    <p className="text-green-400 text-sm font-bold uppercase">{selectedDossier.status}</p>
                  </div>
                </div>
                <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl p-6">
                  <h4 className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-4">Master Communication Link</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Corporate Email</span>
                      <p className="text-white text-sm">{selectedDossier.email}</p>
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Verified Phone</span>
                      <p className="text-white text-sm">{selectedDossier.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 border-t border-white/10 px-8 py-6 flex justify-end">
                <button onClick={() => setSelectedDossier(null)} className="px-8 py-3 rounded-full bg-cyan-500 text-black font-black uppercase tracking-widest text-[10px] hover:bg-cyan-400 transition-all">Close Dossier</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}