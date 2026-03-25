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
      case 'technology': return <Cpu />;
      case 'real estate': return <Building2 />;
      case 'logistics': return <Box />;
      default: return <Briefcase />;
    }
  };

  const filteredJobs = filter === 'All' ? jobs : jobs.filter(job => job.department === filter);

  return (
    <main className="min-h-screen bg-[#021533] text-white pt-32 pb-20 overflow-hidden relative selection:bg-cyan-500/30">
      
      <div className="absolute top-[20%] right-[-10%] w-[800px] h-[800px] bg-cyan-600/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HERO */}
        <section className="text-center mb-24 max-w-4xl mx-auto" data-aos="fade-down">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-8 backdrop-blur-md">
            <Zap size={12} className="text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Join The Vanguard</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] mb-6">
            Engineer The <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Impossible.</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-xl leading-relaxed max-w-2xl mx-auto">
            MyCorp is seeking elite talent to build the infrastructure of tomorrow. If you think in systems and dream in scale, your terminal awaits.
          </p>
        </section>

        {/* PERKS GRID */}
        <section className="grid md:grid-cols-3 gap-6 mb-32" data-aos="fade-up">
          {[
            { title: 'Global Remote Fleet', color: 'from-cyan-500/20', border: 'hover:border-cyan-500/40' },
            { title: 'Infinite Equity Pool', color: 'from-amber-500/20', border: 'hover:border-amber-500/40' },
            { title: 'Cybernetic Healthcare', color: 'from-blue-500/20', border: 'hover:border-blue-500/40' }
          ].map((perk, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className={`bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 text-center backdrop-blur-sm relative overflow-hidden group transition-all duration-500 ${perk.border}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${perk.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              <div className="relative z-10">
                <h4 className="text-lg md:text-xl font-black uppercase italic tracking-tighter mb-2 group-hover:text-white transition-colors">{perk.title}</h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Tier-1 Corporate Benefit</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* ACTIVE DIRECTORY (JOB BOARD) */}
        <section className="max-w-5xl mx-auto" data-aos="fade-up">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter flex items-center gap-3">
              <Briefcase className="text-cyan-400" /> Active Roster
            </h3>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {['All', 'Technology', 'Real Estate', 'Logistics'].map(dept => (
                <button 
                  key={dept} 
                  onClick={() => setFilter(dept)}
                  className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    filter === dept 
                      ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                      : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job List */}
          <div className="space-y-4 min-h-[300px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-cyan-400 gap-4">
                <Loader2 size={40} className="animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Accessing Mainframe...</span>
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
                    className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:bg-white/[0.05] hover:border-white/20 transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <div className="flex items-center gap-6 relative z-10">
                      <div className={`p-4 rounded-2xl bg-black/40 border border-white/5 ${job.color || 'text-cyan-400'}`}>
                        {getDeptIcon(job.department)}
                      </div>
                      <div>
                        <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">{job.title}</h4>
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1"><MapPin size={12}/> {job.location}</span>
                          <span className="w-1 h-1 bg-white/20 rounded-full hidden md:block" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{job.type}</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full md:w-auto bg-white/5 border border-white/10 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-500 transition-all flex items-center justify-center gap-2 relative z-10">
                      Apply Now <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            
            {!isLoading && filteredJobs.length === 0 && (
              <p className="text-center text-slate-500 py-10 text-sm font-bold uppercase tracking-widest">No active requisitions for this sector.</p>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}