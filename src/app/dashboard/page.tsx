'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  LayoutDashboard, Settings, Building2,
  Activity, ShieldCheck, Zap, Globe2, ChevronRight, Server, LogOut, Loader2, Edit3, Save, DollarSign, Fingerprint
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { myCorpApi } from '@/src/lib/api'; 

export default function UserDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [userSession, setUserSession] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [editedCompany, setEditedCompany] = useState<any>(null);

  useEffect(() => {
    const session = localStorage.getItem('mycorp_user');
    if (!session) {
      router.push('/auth/login');
    } else {
      const userData = JSON.parse(session);
      setUserSession(userData);
      fetchSubsidiaryHandshake(userData.email);
    }
  }, [router]);

  const fetchSubsidiaryHandshake = async (email: string) => {
    try {
      const data = await myCorpApi.getCompanyByEmail(email);
      if (data) {
        setCompany(data);
        setEditedCompany(data);
      }
    } catch (err) {
      console.error("Mainframe tracking failed", err);
    }
  };

  const handleUpdateProtocol = async () => {
    setIsSaving(true);
    try {
      const updated = await myCorpApi.updateSubsidiary(company.id, editedCompany);
      setCompany(updated);
      setIsEditing(false);
      alert("Registry Updated Successfully.");
    } catch (err) {
      alert("Protocol Update Failed: Connection Interrupted.");
    } finally {
      setIsSaving(false);
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

  const menuItems = [
    { name: 'Overview', icon: <LayoutDashboard size={18}/> },
    { name: 'Entity Profile', icon: <Building2 size={18}/> },
    { name: 'Compliance', icon: <ShieldCheck size={18}/> },
    { name: 'Network Nodes', icon: <Server size={18}/> },
    { name: 'Settings', icon: <Settings size={18}/> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('mycorp_user');
    router.push('/');
  };

  if (!userSession) return (
    <div className="min-h-screen bg-[#021533] flex items-center justify-center">
      <Loader2 className="text-blue-500 animate-spin" size={40} />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#021533] text-white flex overflow-hidden selection:bg-blue-500/30 pt-32 md:pt-36 relative">
      
      {/* Background Ambience */}
      <div className="fixed top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none z-0 animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/5 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* SIDEBAR */}
      <aside className="w-20 lg:w-72 border-r border-white/10 bg-[#021024]/80 backdrop-blur-3xl hidden md:flex flex-col justify-between relative z-20 shadow-[20px_0_50px_rgba(0,0,0,0.5)] rounded-tr-3xl">
        <div>
          <div className="h-20 flex items-center px-8 border-b border-white/5">
            <span className="text-blue-400 font-bold tracking-[0.3em] uppercase text-[9px] flex items-center gap-2">
               <Fingerprint size={14}/> Node Access
            </span>
          </div>

          <nav className="p-4 space-y-2 mt-2">
            {menuItems.map((item) => (
              <button 
                key={item.name} 
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center space-x-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 group relative overflow-hidden ${
                  activeTab === item.name 
                    ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
                    : 'border border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className={`relative z-10 ${activeTab === item.name ? 'text-blue-400' : 'text-slate-500 group-hover:text-white'} transition-all`}>
                  {item.icon}
                </div>
                <span className="relative z-10 hidden lg:block text-xs font-bold uppercase tracking-widest">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center space-x-4 p-4 rounded-2xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all group border border-transparent hover:border-red-500/20">
            <LogOut size={18} />
            <span className="hidden lg:block text-xs font-bold uppercase tracking-widest">Disconnect</span>
          </button>
        </div>
      </aside>

      {/* CONTENT */}
      <section className="flex-1 h-full overflow-y-auto relative z-10 pb-20">
        
        <header className="px-6 md:px-12 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 bg-transparent sticky top-0 z-30">
          <div>
            <div className="inline-flex items-center space-x-2 mb-4 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full backdrop-blur-md">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 font-bold tracking-[0.2em] uppercase text-[9px]">Uplink Active</span>
            </div>
            {/* Reduced Heading Font */}
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter italic uppercase text-white leading-none">
              {activeTab === 'Overview' ? 'System Overview.' : `${activeTab}.`}
            </h1>
          </div>
          
          <button 
            onClick={() => isEditing ? handleUpdateProtocol() : setIsEditing(true)}
            className={`${isEditing ? 'bg-green-500 text-black' : 'bg-white/5 border border-white/10 text-white'} px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg flex items-center gap-2`}
          >
            {isSaving ? <Loader2 className="animate-spin" size={14}/> : isEditing ? <><Save size={14}/> Sync Changes</> : <><Edit3 size={14}/> Edit Profile</>}
          </button>
        </header>

        <div className="p-6 md:p-12">
          
          {/* ⚡ KPI TIER WITH HOVER GLOW & CLICKABLE LINKS */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            {[
              { label: 'Entity Status', value: company?.status || 'IDLE', icon: <Activity size={18}/>, color: 'blue', tab: 'Overview' },
              { label: 'Registry ID', value: company?.registrationId || '---', icon: <Server size={18}/>, color: 'amber', tab: 'Entity Profile' },
              { label: 'Market Sector', value: company?.sector || '---', icon: <Globe2 size={18}/>, color: 'cyan', tab: 'Entity Profile' },
              { label: 'Security Tier', value: 'Level 4', icon: <ShieldCheck size={18}/>, color: 'green', tab: 'Compliance' }
            ].map((kpi, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                onClick={() => setActiveTab(kpi.tab)}
                className={`relative overflow-hidden cursor-pointer bg-white/[0.02] border border-white/10 p-6 rounded-[2rem] group transition-all duration-500 
                  ${kpi.color === 'blue' ? 'hover:border-blue-500/50' : ''}
                  ${kpi.color === 'amber' ? 'hover:border-amber-500/50' : ''}
                  ${kpi.color === 'cyan' ? 'hover:border-cyan-500/50' : ''}
                  ${kpi.color === 'green' ? 'hover:border-green-500/50' : ''}
                `}
              >
                {/* 💡 Hover Glow Background */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                  ${kpi.color === 'blue' ? 'bg-blue-500/5' : ''}
                  ${kpi.color === 'amber' ? 'bg-amber-500/5' : ''}
                  ${kpi.color === 'cyan' ? 'bg-cyan-500/5' : ''}
                  ${kpi.color === 'green' ? 'bg-green-500/5' : ''}
                `} />

                {/* ⚡ Shimmer Effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <div className={`mb-4 transition-transform duration-500 group-hover:scale-110
                    ${kpi.color === 'blue' ? 'text-blue-400' : ''}
                    ${kpi.color === 'amber' ? 'text-amber-400' : ''}
                    ${kpi.color === 'cyan' ? 'text-cyan-400' : ''}
                    ${kpi.color === 'green' ? 'text-green-400' : ''}
                  `}>
                    {kpi.icon}
                  </div>
                  <h4 className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-1 group-hover:text-slate-300 transition-colors">
                    {kpi.label}
                  </h4>
                  <p className="text-xl md:text-2xl font-black italic text-white group-hover:tracking-tighter transition-all uppercase truncate">
                    {kpi.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === 'Overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* UPLINK LOG */}
                  <div className="lg:col-span-2 bg-white/[0.02] border border-white/10 p-8 rounded-[3rem] backdrop-blur-xl relative overflow-hidden group">
                     {/* Card shimmer */}
                     <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms] bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />
                    
                    <h3 className="text-xl font-black italic uppercase tracking-tighter mb-8 flex items-center gap-3">
                      <Zap size={20} className="text-blue-400" /> Mainframe Uplink Log
                    </h3>
                    <div className="space-y-4 relative z-10">
                      {!company ? (
                        <div className="p-8 border-2 border-dashed border-white/10 rounded-3xl text-center">
                            <p className="text-slate-500 text-sm mb-4 italic">No subsidiary detected for {userSession.email}</p>
                            <Link href="/auth/register" className="text-blue-400 uppercase font-black tracking-widest text-[10px] hover:underline">Apply for Integration</Link>
                        </div>
                      ) : [
                        { title: "Subsidiary Handshake", time: "Connected", status: "success" },
                        { title: "PostgreSQL Identity Map", time: "Verified", status: "success" },
                        { title: "System Audit Status", time: company.status, status: "success" },
                      ].map((log, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-white/5 rounded-2xl bg-black/20 hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                            <div>
                              <h5 className="text-sm font-bold text-slate-200">{log.title}</h5>
                              <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">{log.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PORTAL INFO CARD */}
                  <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/10 border border-blue-500/20 p-8 rounded-[3rem] relative overflow-hidden flex flex-col justify-between group">
                    <Globe2 size={120} className="absolute -bottom-10 -right-10 text-blue-500/10 group-hover:scale-110 transition-transform duration-700" />
                    <div className="relative z-10">
                      <h4 className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Registry Access</h4>
                      <p className="text-3xl font-black italic uppercase text-white leading-none mb-4">Ecosystem <br />Portal</p>
                      <div className="h-px w-12 bg-blue-500/30 mb-6" />
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Handshake active. Your subsidiary data is synchronized with the PostgreSQL registry on Port 8081.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Entity Profile' && (
              <motion.div key="profile" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 gap-8">
                {/* READ ONLY */}
                <div className="bg-white/[0.02] border border-white/10 p-10 rounded-[3rem] opacity-60">
                   <h3 className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-8 flex items-center gap-2 italic">
                     <ShieldCheck size={16}/> Immutable Identity
                   </h3>
                   <div className="space-y-6">
                      <div>
                        <label className="text-slate-500 text-[9px] uppercase tracking-widest block mb-1">Company Name</label>
                        <p className="text-lg font-bold uppercase italic text-white">{company?.companyName || '---'}</p>
                      </div>
                      <div>
                        <label className="text-slate-500 text-[9px] uppercase tracking-widest block mb-1">Registration ID</label>
                        <p className="text-lg font-bold text-white">{company?.registrationId || '---'}</p>
                      </div>
                      <div>
                        <label className="text-slate-500 text-[9px] uppercase tracking-widest block mb-1">Sector Allocation</label>
                        <p className="text-lg font-bold text-white">{company?.sector || '---'}</p>
                      </div>
                   </div>
                </div>

                {/* EDITABLE */}
                <div className={`bg-white/[0.02] border p-10 rounded-[3rem] shadow-2xl transition-all duration-500 ${isEditing ? 'border-cyan-500/50 shadow-cyan-500/5' : 'border-white/10'}`}>
                   <h3 className="text-cyan-400 font-bold uppercase tracking-widest text-[10px] mb-8 flex items-center gap-2 italic">
                     <Activity size={16}/> Operational Variables
                   </h3>
                   <div className="space-y-6">
                      <div>
                        <label className="text-slate-500 text-[9px] uppercase tracking-widest block mb-2">HQ Address</label>
                        <textarea 
                          disabled={!isEditing}
                          value={editedCompany?.hqAddress || ''}
                          onChange={(e) => setEditedCompany({...editedCompany, hqAddress: e.target.value})}
                          className={`w-full bg-black/40 border ${isEditing ? 'border-cyan-500 ring-1 ring-cyan-500/20 text-white' : 'border-white/5 text-slate-400'} rounded-2xl px-5 py-4 text-sm focus:outline-none transition-all h-24 resize-none`}
                        />
                      </div>
                      <div>
                        <label className="text-slate-500 text-[9px] uppercase tracking-widest block mb-2">Public Website</label>
                        <input 
                          disabled={!isEditing}
                          value={editedCompany?.website || ''}
                          onChange={(e) => setEditedCompany({...editedCompany, website: e.target.value})}
                          className={`w-full bg-black/40 border ${isEditing ? 'border-cyan-500 ring-1 ring-cyan-500/20 text-white' : 'border-white/5 text-slate-400'} rounded-2xl px-5 py-4 text-sm focus:outline-none transition-all`}
                        />
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {/* DEFAULT FALLBACK FOR OTHER TABS */}
            {activeTab !== 'Overview' && activeTab !== 'Entity Profile' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center border border-white/10 bg-white/[0.02] rounded-[3rem]">
                <Settings size={32} className="text-blue-400 mb-6 animate-spin-slow" />
                <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-4">{activeTab}</h2>
                <p className="text-slate-400 max-w-md mx-auto text-xs uppercase tracking-widest">Synchronizing node data from Port 8081...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}