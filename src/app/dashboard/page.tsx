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
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <Loader2 className="text-blue-600 animate-spin" size={40} />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 flex overflow-hidden selection:bg-blue-100 selection:text-blue-900 pt-32 md:pt-36 relative font-sans">
      
      {/* Background Ambience (Refined for Light Theme) */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none z-0 animate-pulse" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-20 lg:w-72 border-r border-slate-200 bg-white/80 backdrop-blur-3xl hidden md:flex flex-col justify-between relative z-20 shadow-[10px_0_40px_rgba(0,0,0,0.02)] rounded-tr-3xl">
        <div>
          <div className="h-24 flex items-center px-8 border-b border-slate-100 bg-slate-50/50">
            <span className="text-slate-900 font-black tracking-[0.3em] uppercase text-[10px] flex items-center gap-2">
               <Fingerprint size={16} className="text-blue-600"/> Node Access
            </span>
          </div>

          <nav className="p-4 space-y-2 mt-4">
            {menuItems.map((item) => (
              <button 
                key={item.name} 
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center space-x-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 group relative overflow-hidden ${
                  activeTab === item.name 
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                    : 'border border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className={`relative z-10 ${activeTab === item.name ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-900'} transition-all`}>
                  {item.icon}
                </div>
                <span className="relative z-10 hidden lg:block text-[11px] font-black uppercase tracking-widest">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-100">
          <button onClick={handleLogout} className="w-full flex items-center space-x-4 p-4 rounded-2xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all group border border-transparent hover:border-red-100">
            <LogOut size={18} />
            <span className="hidden lg:block text-[11px] font-black uppercase tracking-widest">Disconnect</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <section className="flex-1 h-full overflow-y-auto relative z-10 pb-20">
        
        <header className="px-6 md:px-12 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 bg-white/40 backdrop-blur-md sticky top-0 z-30 pt-4">
          <div>
            <div className="inline-flex items-center space-x-2 mb-4 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-600 font-black tracking-[0.2em] uppercase text-[9px]">Uplink Active</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter italic uppercase text-slate-900 leading-none">
              {activeTab === 'Overview' ? 'System Overview.' : `${activeTab}.`}
            </h1>
          </div>
          
          <button 
            onClick={() => isEditing ? handleUpdateProtocol() : setIsEditing(true)}
            className={`${isEditing ? 'bg-green-600 text-white' : 'bg-slate-900 text-white'} px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-xl hover:bg-blue-600 flex items-center gap-2`}
          >
            {isSaving ? <Loader2 className="animate-spin" size={14}/> : isEditing ? <><Save size={14}/> Sync Changes</> : <><Edit3 size={14}/> Edit Profile</>}
          </button>
        </header>

        <div className="p-6 md:p-12">
          
          {/* KPI TIER */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12">
            {[
              { label: 'Entity Status', value: company?.status || 'IDLE', icon: <Activity size={18}/>, color: 'blue', tab: 'Overview' },
              { label: 'Registry ID', value: company?.registrationId || '---', icon: <Server size={18}/>, color: 'indigo', tab: 'Entity Profile' },
              { label: 'Market Sector', value: company?.sector || '---', icon: <Globe2 size={18}/>, color: 'blue', tab: 'Entity Profile' },
              { label: 'Security Tier', value: 'Level 4', icon: <ShieldCheck size={18}/>, color: 'slate', tab: 'Compliance' }
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
                  <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2 group-hover:text-slate-600 transition-colors">
                    {kpi.label}
                  </h4>
                  <p className="text-xl md:text-2xl font-black italic text-slate-900 group-hover:tracking-tighter transition-all uppercase truncate">
                    {kpi.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === 'Overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* UPLINK LOG */}
                  <div className="lg:col-span-2 bg-white border border-slate-200 p-10 rounded-[3rem] shadow-sm relative overflow-hidden group">
                     <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms] bg-gradient-to-r from-transparent via-blue-50/50 to-transparent" />
                    
                    <h3 className="text-xl font-black italic uppercase tracking-tighter mb-10 flex items-center gap-3 text-slate-900">
                      <Zap size={20} className="text-blue-600" /> Mainframe Uplink Log
                    </h3>
                    <div className="space-y-4 relative z-10">
                      {!company ? (
                        <div className="p-12 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-center bg-slate-50">
                            <p className="text-slate-400 text-sm mb-6 font-medium italic">No subsidiary node detected for {userSession.email}</p>
                            <Link href="/auth/register" className="bg-slate-900 text-white px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg">Apply for Integration</Link>
                        </div>
                      ) : [
                        { title: "Subsidiary Handshake", time: "Protocol Established", status: "success" },
                        { title: "Registry Identity Map", time: "Verified Record", status: "success" },
                        { title: "System Audit Status", time: company.status, status: "success" },
                      ].map((log, i) => (
                        <div key={i} className="flex items-center justify-between p-5 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
                          <div className="flex items-center gap-5">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.5)]" />
                            <div>
                              <h5 className="text-sm font-black text-slate-900 uppercase italic tracking-tight">{log.title}</h5>
                              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">{log.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PORTAL INFO CARD */}
                  <div className="bg-slate-900 border border-slate-800 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-between group">
                    <Globe2 size={160} className="absolute -bottom-16 -right-16 text-white/5 group-hover:scale-110 transition-transform duration-1000 group-hover:text-blue-500/10" />
                    <div className="relative z-10">
                      <h4 className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">Security Context</h4>
                      <p className="text-3xl font-black italic uppercase text-white leading-none mb-6 tracking-tighter">Ecosystem <br />Portal</p>
                      <div className="h-1 w-12 bg-blue-600/40 mb-8 rounded-full" />
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">
                        Handshake active. Your subsidiary data is securely synchronized with the MyCorp PostgreSQL registry on Port 8081. All transmissions are encrypted.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Entity Profile' && (
              <motion.div key="profile" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 gap-8">
                {/* READ ONLY IDENTIFIERS */}
                <div className="bg-white border border-slate-200 p-10 rounded-[3rem] shadow-sm opacity-80">
                   <h3 className="text-slate-400 font-black uppercase tracking-widest text-[10px] mb-10 flex items-center gap-3 italic">
                     <ShieldCheck size={18} className="text-blue-600"/> Immutable Identity
                   </h3>
                   <div className="space-y-8">
                     <div className="border-l-2 border-slate-100 pl-6">
                        <label className="text-slate-400 text-[9px] font-black uppercase tracking-widest block mb-2">Registered Entity Name</label>
                        <p className="text-xl font-black uppercase italic text-slate-900 tracking-tight">{company?.companyName || '---'}</p>
                     </div>
                     <div className="border-l-2 border-slate-100 pl-6">
                        <label className="text-slate-400 text-[9px] font-black uppercase tracking-widest block mb-2">Global Registry Number</label>
                        <p className="text-xl font-black text-slate-900 font-mono">{company?.registrationId || '---'}</p>
                     </div>
                     <div className="border-l-2 border-slate-100 pl-6">
                        <label className="text-slate-400 text-[9px] font-black uppercase tracking-widest block mb-2">Industry Sector Allocation</label>
                        <p className="text-xl font-black text-slate-900 italic uppercase">{company?.sector || '---'}</p>
                     </div>
                   </div>
                </div>

                {/* EDITABLE FIELDS */}
                <div className={`bg-white border p-10 rounded-[3rem] shadow-sm transition-all duration-500 ${isEditing ? 'border-blue-400 shadow-xl' : 'border-slate-200'}`}>
                   <h3 className="text-blue-600 font-black uppercase tracking-widest text-[10px] mb-10 flex items-center gap-3 italic">
                     <Activity size={18}/> Operational Variables
                   </h3>
                   <div className="space-y-8">
                     <div>
                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-3 ml-2">Headquarters Address</label>
                        <textarea 
                          disabled={!isEditing}
                          value={editedCompany?.hqAddress || ''}
                          onChange={(e) => setEditedCompany({...editedCompany, hqAddress: e.target.value})}
                          className={`w-full bg-slate-50 border ${isEditing ? 'border-blue-500 ring-4 ring-blue-500/5 bg-white text-slate-900 shadow-sm' : 'border-slate-100 text-slate-500'} rounded-2xl p-6 text-sm focus:outline-none transition-all h-32 resize-none font-medium`}
                        />
                     </div>
                     <div>
                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-3 ml-2">Public Web Gateway</label>
                        <input 
                          disabled={!isEditing}
                          value={editedCompany?.website || ''}
                          onChange={(e) => setEditedCompany({...editedCompany, website: e.target.value})}
                          className={`w-full bg-slate-50 border ${isEditing ? 'border-blue-500 ring-4 ring-blue-500/5 bg-white text-slate-900 shadow-sm' : 'border-slate-100 text-slate-500'} rounded-2xl p-6 text-sm focus:outline-none transition-all font-medium`}
                        />
                     </div>
                   </div>
                </div>
              </motion.div>
            )}

            {/* DEFAULT FALLBACK FOR OTHER TABS */}
            {activeTab !== 'Overview' && activeTab !== 'Entity Profile' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 text-center border border-slate-200 bg-white rounded-[3.5rem] shadow-sm">
                <Settings size={48} className="text-blue-600 mb-8 animate-spin-slow opacity-20" />
                <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4 text-slate-900">{activeTab} Access.</h2>
                <p className="text-slate-400 max-w-md mx-auto text-[10px] font-black uppercase tracking-[0.3em]">Synchronizing secure node data from institutional registry...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}