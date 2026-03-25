'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, ArrowLeft, Building2, Globe2, ShieldCheck, 
  CheckCircle2, ChevronLeft, Calendar, MapPin, Users, 
  DollarSign, Phone, Link as LinkIcon, UserCircle, Loader2, AlertCircle
} from 'lucide-react';
import { myCorpApi } from '@/src/lib/api'; 

const SECTORS = [
  'Technology & AI',
  'Real Estate & Infra',
  'Global Logistics',
  'Financial Services',
  'Healthcare & BioTech',
  'Renewable Energy',
  'Aerospace & Defense',
  'Advanced Manufacturing',
  'Retail & E-Commerce',
  'Telecommunications'
];

export default function RegisterSubsidiaryPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false); // Security Guard
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 
  const [formData, setFormData] = useState({
    // Phase 1: Identity
    companyName: '', registrationId: '', jurisdiction: '', incorporationDate: '',
    // Phase 2: Operations
    sector: '', hqAddress: '', employeeCount: '', revenueTier: '',
    // Phase 3: Leadership
    ownerName: '', officerName: '', email: '', phone: '', website: '',
  });

  // 🛡️ SECURITY HANDSHAKE & AUTO-TRACKING
  useEffect(() => {
    const session = localStorage.getItem('mycorp_user');
    if (!session) {
      // 🚫 NOT LOGGED IN: Redirect to signup
      router.push('/auth/signup?error=IdentityRequired');
    } else {
      const userData = JSON.parse(session);
      setIsAuthorized(true);
      // 🛰️ BIND EMAIL: Automatically pull the email from the login session
      setFormData(prev => ({ ...prev, email: userData.email }));
    }
  }, [router]);

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage(null); 
  };

  const canProceed = () => {
    if (step === 1) {
      return formData.companyName && formData.registrationId && formData.jurisdiction && formData.incorporationDate;
    }
    if (step === 2) {
      return formData.sector && formData.hqAddress && formData.employeeCount && formData.revenueTier;
    }
    if (step === 3) {
      return formData.ownerName && formData.officerName && formData.email && formData.phone && formData.website;
    }
    return true;
  };

  const handleNextAction = async () => {
    if (!canProceed()) {
      setErrorMessage("Mandatory protocols incomplete. All fields required.");
      return;
    }

    if (step === 3) {
      setIsSubmitting(true);
      setErrorMessage(null);
      try {
        const response = await myCorpApi.registerSubsidiary(formData);
        if (response) {
          setStep(4);
        }
      } catch (error: any) {
        console.error("Registry error:", error);
        setErrorMessage("Mainframe Connection Failed. Verify backend is active on 8081.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setStep(prev => Math.min(prev + 1, 4));
      setErrorMessage(null);
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
    setErrorMessage(null);
  };

  const slideVariants: Variants = {
    hidden: { x: 40, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
    exit: { 
      x: -40, 
      opacity: 0, 
      transition: { duration: 0.3, ease: "easeIn" } 
    }
  };

  // Prevent UI flicker while checking session
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#021533] flex items-center justify-center">
        <Loader2 className="animate-spin text-cyan-400" size={48} />
      </div>
    );
  }
  
  return (
    <main className="min-h-screen bg-[#021533] text-white pt-40 md:pt-48 lg:pt-40 pb-20 overflow-x-hidden relative selection:bg-blue-500/30">
      
      <div className="fixed top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        
        <Link href="/" className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors mb-8 group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Abort & Return</span>
        </Link>

        <div className={`bg-white/[0.02] border ${errorMessage ? 'border-red-500/40' : 'border-white/10'} rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-14 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group transition-colors duration-300`}>
          
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <motion.div 
              className={`h-full bg-gradient-to-r ${errorMessage ? 'from-red-600 to-red-400' : 'from-blue-500 via-amber-400 to-cyan-400'}`}
              initial={{ width: '25%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400"><Building2 size={24} /></div>
                  <span className="text-blue-400 font-bold tracking-[0.3em] uppercase text-[10px]">Phase 01</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">Corporate <br/>Identity.</h2>
                <p className="text-slate-400 text-sm mb-10 leading-relaxed max-w-lg">Establish your subsidiary's legal footprint within the global MyCorp database.</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4">Registered Company Name</label>
                    <input type="text" value={formData.companyName} onChange={(e) => updateForm('companyName', e.target.value)} placeholder="e.g. Nexus Dynamics LLC" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4 flex items-center gap-2"><ShieldCheck size={12}/> Gov Registration ID</label>
                      <input type="text" value={formData.registrationId} onChange={(e) => updateForm('registrationId', e.target.value)} placeholder="Tax / EIN Number" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4 flex items-center gap-2"><Globe2 size={12}/> Jurisdiction</label>
                      <input type="text" value={formData.jurisdiction} onChange={(e) => updateForm('jurisdiction', e.target.value)} placeholder="Country of Origin" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4 flex items-center gap-2"><Calendar size={12}/> Date of Incorporation</label>
                    <input type="date" value={formData.incorporationDate} onChange={(e) => updateForm('incorporationDate', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all [color-scheme:dark]" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400"><Globe2 size={24} /></div>
                  <span className="text-amber-400 font-bold tracking-[0.3em] uppercase text-[10px]">Phase 02</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">Operational <br/>Scope.</h2>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-lg">Define your subsidiary's primary sector and logistical scale.</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 ml-4">Primary Sector Allocation</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[240px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-track]:bg-transparent">
                      {SECTORS.map((sector) => (
                        <div 
                          key={sector}
                          onClick={() => updateForm('sector', sector)}
                          className={`cursor-pointer border rounded-xl px-4 py-4 transition-all duration-300 flex items-center justify-between group/sector relative overflow-hidden ${
                            formData.sector === sector 
                              ? 'bg-amber-500/10 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                              : 'bg-black/40 border-white/5 hover:border-amber-500/30'
                          }`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover/sector:opacity-100 transition-opacity duration-300 pointer-events-none ${formData.sector === sector ? 'opacity-100' : ''}`} />
                          <span className={`relative z-10 font-bold uppercase tracking-widest text-[9px] md:text-[10px] ${formData.sector === sector ? 'text-amber-400' : 'text-slate-400 group-hover/sector:text-white transition-colors'}`}>
                            {sector}
                          </span>
                          <div className={`relative z-10 w-3 h-3 rounded-full border-2 transition-all ${formData.sector === sector ? 'border-amber-400 bg-amber-400' : 'border-white/20 group-hover/sector:border-amber-500/50'}`} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4 flex items-center gap-2"><Users size={12}/> Employee Count</label>
                      <select value={formData.employeeCount} onChange={(e) => updateForm('employeeCount', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500 focus:bg-amber-500/5 transition-all appearance-none">
                        <option value="" disabled className="bg-[#021533]">Select Scale</option>
                        <option value="1-50" className="bg-[#021533]">1 - 50</option>
                        <option value="51-200" className="bg-[#021533]">51 - 200</option>
                        <option value="201-1000" className="bg-[#021533]">201 - 1,000</option>
                        <option value="1000+" className="bg-[#021533]">1,000+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4 flex items-center gap-2"><DollarSign size={12}/> Annual Revenue (USD)</label>
                      <select value={formData.revenueTier} onChange={(e) => updateForm('revenueTier', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500 focus:bg-amber-500/5 transition-all appearance-none">
                        <option value="" disabled className="bg-[#021533]">Select Tier</option>
                        <option value="<1M" className="bg-[#021533]">&lt; $1M</option>
                        <option value="1M-10M" className="bg-[#021533]">$1M - $10M</option>
                        <option value="10M-50M" className="bg-[#021533]">$10M - $50M</option>
                        <option value="50M+" className="bg-[#021533]">$50M+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4 flex items-center gap-2"><MapPin size={12}/> Global Headquarters</label>
                    <input type="text" value={formData.hqAddress} onChange={(e) => updateForm('hqAddress', e.target.value)} placeholder="Full Corporate Address" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-amber-500 focus:bg-amber-500/5 transition-all" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400"><ShieldCheck size={24} /></div>
                  <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-[10px]">Phase 03</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">Executive <br/>Leadership.</h2>
                <p className="text-slate-400 text-sm mb-10 leading-relaxed max-w-lg">Assign command personnel for cross-network integration.</p>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4 flex items-center gap-2"><UserCircle size={12}/> Owner / CEO</label>
                      <input type="text" value={formData.ownerName} onChange={(e) => updateForm('ownerName', e.target.value)} placeholder="Legal Name" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500 focus:bg-cyan-500/5 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4 flex items-center gap-2"><ShieldCheck size={12}/> Compliance Officer (CCO)</label>
                      <input type="text" value={formData.officerName} onChange={(e) => updateForm('officerName', e.target.value)} placeholder="Legal Name" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500 focus:bg-cyan-500/5 transition-all" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4">Linked Profile Email</label>
                      <input type="email" value={formData.email} disabled className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-slate-500 cursor-not-allowed italic font-mono" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4 flex items-center gap-2"><Phone size={12}/> Direct Phone</label>
                      <input type="tel" value={formData.phone} onChange={(e) => updateForm('phone', e.target.value)} placeholder="+1 (555) 000-0000" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500 focus:bg-cyan-500/5 transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4 flex items-center gap-2"><LinkIcon size={12}/> Corporate Website</label>
                    <input type="url" value={formData.website} onChange={(e) => updateForm('website', e.target.value)} placeholder="https://" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500 focus:bg-cyan-500/5 transition-all" />
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-start space-x-4 mt-8">
                    <input type="checkbox" className="mt-1 w-4 h-4 accent-cyan-500 bg-black/50 border-white/20 rounded" id="compliance" />
                    <label htmlFor="compliance" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
                      I confirm that this subsidiary agrees to be governed by the MyCorp Integrity Protocols and submits to quarterly financial audits.
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="text-center py-12 md:py-20">
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-24 h-24 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.3)]"
                >
                  <CheckCircle2 size={48} className="text-green-400" />
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">Integration <br/>Initiated.</h2>
                <p className="text-slate-400 text-sm mb-10 leading-relaxed max-w-sm mx-auto">
                  Your registration data for <span className="text-white font-bold">{formData.companyName || 'your subsidiary'}</span> has been securely transmitted. Awaiting Central Command audit.
                </p>
                <Link href="/dashboard">
                  <button className="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-slate-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    Access Dashboard
                  </button>
                </Link>
              </motion.div>
            )}

          </AnimatePresence>

          <div className="flex flex-col gap-4 mt-8">
             {errorMessage && (
               <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                 <AlertCircle size={14} /> {errorMessage}
               </div>
             )}

             {step < 4 && (
               <div className="flex justify-between items-center pt-4 border-t border-white/10 relative z-10">
                 <button 
                   onClick={prevStep}
                   disabled={isSubmitting}
                   className={`text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2 transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-white disabled:opacity-50'}`}
                 >
                   <ArrowLeft size={14} /> <span>Previous</span>
                 </button>
                 
                 <button 
                   onClick={handleNextAction}
                   disabled={isSubmitting}
                   className="bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center space-x-2 disabled:opacity-70"
                 >
                   {isSubmitting ? (
                     <><Loader2 size={14} className="animate-spin" /> Transmitting...</>
                   ) : (
                     <><span>{step === 3 ? 'Submit to Registry' : 'Next Phase'}</span> <ArrowRight size={14} /></>
                   )}
                 </button>
               </div>
             )}
          </div>
        </div>
      </div>
    </main>
  );
}