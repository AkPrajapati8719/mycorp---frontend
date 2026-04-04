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
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 flex overflow-hidden selection:bg-blue-100 pt-28 md:pt-36 relative font-sans">
      
      {/* GLOBAL DYNAMIC BACKGROUND */}
      <div className="fixed top-0 right-0 w-[1000px] h-[1000px] bg-blue-500/5 blur-[200px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[800px] h-[800px] bg-indigo-500/5 blur-[200px] rounded-full pointer-events-none z-0" />

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-20 lg:w-72 border-r border-slate-200 bg-white/80 backdrop-blur-3xl hidden md:flex flex-col justify-between relative z-20 shadow-[10px_0_40px_rgba(0,0,0,0.02)] rounded-tr-3xl">
        <div>
          <div className="h-24 flex items-center px-8 border-b border-slate-100 bg-slate-50/50">
            <span className="text-slate-900 font-black tracking-[0.3em] uppercase text-[10px] flex items-center gap-2">
              <Fingerprint size={16} className="text-blue-600"/> Master Override
            </span>
          </div>

          <nav className="p-4 space-y-2 mt-4">
            {menuItems.map((item) => (
              <div 
                key={item.name} 
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center space-x-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 group ${
                  activeTab === item.name 
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                    : 'border border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className={`${activeTab === item.name ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-900'} transition-all`}>
                  {item.icon}
                </div>
                <span className="hidden lg:block text-[11px] font-black uppercase tracking-widest">{item.name}</span>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <section className="flex-1 h-full overflow-y-auto relative z-10 pb-20">
        
        <header className="px-6 md:px-12 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 bg-white/40 backdrop-blur-md sticky top-0 z-30 pt-4">
          <div>
            <div className="inline-flex items-center space-x-2 mb-4 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
              <span className="text-blue-600 font-black tracking-[0.2em] uppercase text-[9px]">Global Overseer Active</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase text-slate-900 leading-none">
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
              className="w-full md:w-72 bg-white border border-slate-200 rounded-full pl-11 pr-6 py-3.5 text-[10px] text-slate-900 font-bold uppercase tracking-widest placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
        </header>

        <div className="p-6 md:p-12">
          
          {/* KPI TIER */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible" 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12"
          >
            {[
              { label: 'Total Subsidiaries', value: subsidiaries.length, icon: <Database size={18} />, tab: 'Network Registry', color: 'blue' },
              { label: 'Authorized Users', value: userGrid.length, icon: <Users size={18} />, tab: 'User Intelligence', color: 'indigo' },
              { label: 'Network Valuation', value: '$14.2B', icon: <DollarSign size={18} />, tab: 'Global Command', color: 'slate' },
              { label: 'Unread Inquiries', value: messages.length, icon: <Mail size={18} />, tab: 'Inquiry Inbox', color: 'blue' }
            ].map((kpi, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                onClick={() => setActiveTab(kpi.tab)}
                className={`relative overflow-hidden cursor-pointer bg-white border border-slate-200 p-8 rounded-[2.5rem] group transition-all duration-500 hover:shadow-2xl hover:border-blue-200 shadow-sm`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <div className={`mb-6 transition-transform duration-500 group-hover:scale-110 text-slate-900`}>
                    {kpi.icon}
                  </div>
                  <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                    {kpi.label}
                  </h4>
                  <p className="text-3xl md:text-4xl font-black italic text-slate-900 tracking-tighter">
                    {isLoading ? '...' : kpi.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* TAB CONTENT */}
          <AnimatePresence mode="wait">
            
            {/* 1. GLOBAL COMMAND / NETWORK REGISTRY */}
            {(activeTab === 'Global Command' || activeTab === 'Network Registry') && (
              <motion.div key="registry" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3 text-slate-900">
                    <AlertTriangle size={20} className="text-amber-500" /> Live Registry Audit
                  </h3>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{subsidiaries.length} Records Loaded</span>
                </div>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-24 text-blue-600">
                    <Loader2 className="animate-spin mb-4" size={48} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Handshaking with PostgreSQL...</span>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {subsidiaries.map((sub) => (
                      <div key={sub.id} className="bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:shadow-xl transition-all group flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden">
                        <div className="relative z-10 flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Entity ID: {sub.registrationId}</span>
                            <h4 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase italic">{sub.companyName}</h4>
                            <p className="text-[10px] text-blue-600 font-bold mt-1 flex items-center gap-1 uppercase tracking-widest"><Globe2 size={12}/> {sub.sector}</p>
                          </div>
                          <div className="border-l border-slate-100 pl-8">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Financial Tier</span>
                            <p className="text-lg font-black text-slate-900 flex items-center gap-2 italic"><DollarSign size={16} className="text-slate-300"/> {sub.revenueTier}</p>
                          </div>
                          <div className="border-l border-slate-100 pl-8">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Security Status</span>
                            <p className="text-sm font-black text-green-600 flex items-center gap-2 uppercase tracking-widest">
                               <CheckCircle2 size={14} /> {sub.status}
                            </p>
                          </div>
                        </div>
                        <button onClick={() => setSelectedDossier(sub)} className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-3 shadow-lg whitespace-nowrap">
                          <Eye size={16} /> Open Dossier
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* 2. USER INTELLIGENCE */}
            {activeTab === 'User Intelligence' && (
              <motion.div key="intel" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 border-b border-slate-100">
                    <tr>
                      <th className="p-8">Identity</th>
                      <th className="p-8">Entity Affinity</th>
                      <th className="p-8">Inc. Year</th>
                      <th className="p-8">Registry ID</th>
                      <th className="p-8 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {userGrid.map((row, i) => (
                      <tr key={i} className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <td className="p-8 font-mono text-blue-600 font-bold">{row.email}</td>
                        <td className="p-8 font-black uppercase text-slate-900 italic tracking-tight">{row.companyName}</td>
                        <td className="p-8 text-slate-500 font-bold">{row.incorporationYear}</td>
                        <td className="p-8 text-slate-400 font-mono">{row.registrationId}</td>
                        <td className="p-8 text-right">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${row.status === 'INTEGRATED' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
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
              <motion.div key="inbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 gap-8">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-white border border-slate-200 p-10 rounded-[3rem] relative group hover:border-blue-400 hover:shadow-2xl transition-all duration-500">
                    <div className="flex justify-between items-start mb-8">
                      <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl shadow-sm"><Mail size={24}/></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h4 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 mb-2">{msg.name}</h4>
                    <p className="text-blue-600 text-xs font-black uppercase tracking-widest mb-6">{msg.email}</p>
                    <div className="border-t border-slate-100 pt-6">
                       <p className="text-slate-500 text-sm leading-relaxed font-medium italic">"{msg.message}"</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      {/* DOSSIER MODAL (Premium Light Overlay) */}
      <AnimatePresence>
        {selectedDossier && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedDossier(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md cursor-pointer" />
            <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" className="w-full max-w-2xl bg-white border border-slate-200 rounded-[3.5rem] relative z-10 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)]">
              <div className="bg-slate-50 border-b border-slate-100 px-10 py-8 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Fingerprint size={24} className="text-blue-600" />
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Registry Record</h2>
                </div>
                <button onClick={() => setSelectedDossier(null)} className="text-slate-400 hover:text-slate-900 transition-colors p-2"><X size={28} /></button>
              </div>

              <div className="p-10 space-y-10 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subsidiary Entity</span>
                    <p className="text-xl font-black text-slate-900 italic uppercase">{selectedDossier.companyName}</p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">HQ Location</span>
                    <p className="text-blue-600 font-black text-sm uppercase tracking-tight">{selectedDossier.hqAddress}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-10 border-y border-slate-100 py-8">
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">CEO / Director</span>
                    <p className="text-slate-900 font-bold text-sm uppercase">{selectedDossier.ownerName}</p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Compliance Officer</span>
                    <p className="text-slate-900 font-bold text-sm uppercase">{selectedDossier.officerName}</p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Status</span>
                    <p className="text-green-600 font-black text-sm uppercase tracking-widest flex items-center gap-2"><CheckCircle2 size={14}/> {selectedDossier.status}</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 shadow-inner">
                  <h4 className="text-blue-700 text-[11px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <Activity size={14} /> Primary Communication Channels
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <span className="block text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Corporate Gateway</span>
                      <p className="text-blue-900 font-bold text-sm underline decoration-blue-200 underline-offset-4">{selectedDossier.email}</p>
                    </div>
                    <div>
                      <span className="block text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Authorized Voice</span>
                      <p className="text-blue-900 font-bold text-sm">{selectedDossier.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border-t border-slate-100 px-10 py-8 flex justify-end">
                <button onClick={() => setSelectedDossier(null)} className="px-12 py-4 rounded-full bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">Close Audit</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}