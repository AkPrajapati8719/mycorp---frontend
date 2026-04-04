'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Cpu, Building2, Box, ArrowUpRight, MapPin, Zap, Loader2 } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { myCorpApi } from '@/src/lib/api'; // THE BRIDGE

export default function CareersPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, easing: 'ease-out-cubic' });

    // 🚀 FETCH LIVE ROSTER FROM POSTGRESQL
    const fetchRoster = async () => {
      try {
        const data = await myCorpApi.getJobs();
        setJobs(data);
      } catch (error) {
        console.error("Mainframe synchronization failed.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoster();
  }, []);

  // Helper to assign icons based on Department string from Backend
  const getDeptIcon = (dept: string) => {
    switch (dept?.toLowerCase()) {
      case 'technology': return <Cpu size={22} />;
      case 'real estate': return <Building2 size={22} />;
      case 'logistics': return <Box size={22} />;
      default: return <Briefcase size={22} />;
    }
  };

  const filteredJobs = filter === 'All' ? jobs : jobs.filter(job => job.department === filter);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-48 pb-20 overflow-hidden relative selection:bg-blue-100">
      
      {/* Background Ambience (Lightened for Alabaster theme) */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-400/5 blur-[200px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HERO */}
        <section className="text-center mb-24 max-w-4xl mx-auto" data-aos="fade-down">
          <div className="inline-flex items-center space-x-2 bg-white border border-slate-200 px-5 py-2 rounded-full mb-8 shadow-sm backdrop-blur-md">
            <Zap size={12} className="text-blue-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Join The Vanguard</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] mb-6 text-slate-900">
            Engineer The <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Impossible.</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            MyCorp is seeking elite talent to build the infrastructure of tomorrow. If you think in systems and dream in scale, your command terminal awaits.
          </p>
        </section>

        {/* PERKS GRID (Premium Light Cards) */}
        <section className="grid md:grid-cols-3 gap-8 mb-32" data-aos="fade-up">
          {[
            { title: 'Global Remote Fleet', color: 'from-blue-50', border: 'hover:border-blue-200' },
            { title: 'Infinite Equity Pool', color: 'from-amber-50', border: 'hover:border-amber-200' },
            { title: 'Institutional Growth', color: 'from-indigo-50', border: 'hover:border-indigo-200' }
          ].map((perk, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}
              className={`bg-white border border-slate-200 rounded-[2.5rem] p-10 text-center relative overflow-hidden group transition-all duration-500 shadow-sm ${perk.border}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${perk.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              <div className="relative z-10">
                <h4 className="text-xl font-black uppercase italic tracking-tighter mb-2 text-slate-900 group-hover:text-blue-700 transition-colors">{perk.title}</h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tier-1 Corporate Benefit</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* ACTIVE DIRECTORY (JOB BOARD) */}
        <section className="max-w-5xl mx-auto" data-aos="fade-up">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 border-b border-slate-200 pb-8">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter flex items-center gap-3 text-slate-900">
              <Briefcase className="text-blue-600" /> Active Roster
            </h3>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {['All', 'Technology', 'Real Estate', 'Logistics'].map(dept => (
                <button 
                  key={dept} 
                  onClick={() => setFilter(dept)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${
                    filter === dept 
                      ? 'bg-slate-900 text-white shadow-xl' 
                      : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job List */}
          <div className="space-y-6 min-h-[300px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-blue-600 gap-4">
                <Loader2 size={40} className="animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Establishing Secure Uplink...</span>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredJobs.map((job) => (
                  <motion.div 
                    key={job.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-blue-300 hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <div className="flex items-center gap-8 relative z-10">
                      <div className={`p-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shadow-sm`}>
                        {getDeptIcon(job.department)}
                      </div>
                      <div>
                        <h4 className="text-2xl font-black uppercase tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h4>
                        <div className="flex flex-wrap items-center gap-5 mt-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5"><MapPin size={14} className="text-blue-400"/> {job.location}</span>
                          <span className="w-1.5 h-1.5 bg-slate-200 rounded-full hidden md:block" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{job.type}</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full md:w-auto bg-slate-900 text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-3 relative z-10 shadow-lg">
                      Initialize Application <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            
            {!isLoading && filteredJobs.length === 0 && (
              <p className="text-center text-slate-400 py-20 text-sm font-black uppercase tracking-[0.3em]">Operational Equilibrium Reached. No current requisitions.</p>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}