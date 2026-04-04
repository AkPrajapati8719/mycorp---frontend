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
  const [isAuthorized, setIsAuthorized] = useState(false); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 
  const [formData, setFormData] = useState({
    companyName: '', registrationId: '', jurisdiction: '', incorporationDate: '',
    sector: '', hqAddress: '', employeeCount: '', revenueTier: '',
    ownerName: '', officerName: '', email: '', phone: '', website: '',
  });

  useEffect(() => {
    const session = localStorage.getItem('mycorp_user');
    if (!session) {
      router.push('/auth/signup?error=IdentityRequired');
    } else {
      const userData = JSON.parse(session);
      setIsAuthorized(true);
      setFormData(prev => ({ ...prev, email: userData.email }));
    }
  }, [router]);

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage(null); 
  };

  const canProceed = () => {
    if (step === 1) return formData.companyName && formData.registrationId && formData.jurisdiction && formData.incorporationDate;
    if (step === 2) return formData.sector && formData.hqAddress && formData.employeeCount && formData.revenueTier;
    if (step === 3) return formData.ownerName && formData.officerName && formData.email && formData.phone && formData.website;
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
        if (response) setStep(4);
      } catch (error: any) {
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
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { x: -40, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }
  
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-40 pb-20 overflow-x-hidden relative selection:bg-blue-100 selection:text-blue-900">
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-blue-400/5 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-indigo-400/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        
        <Link href="/" className="inline-flex items-center space-x-2 text-slate-400 hover:text-slate-900 transition-colors mb-8 group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Abort & Return</span>
        </Link>

        <div className={`bg-white border ${errorMessage ? 'border-red-200' : 'border-slate-200'} rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-14 shadow-[0_40px_80px_rgba(0,0,0,0.04)] relative overflow-hidden transition-all duration-300`}>
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
            <motion.div 
              className={`h-full bg-gradient-to-r ${errorMessage ? 'from-red-500 to-red-400' : 'from-blue-600 via-indigo-500 to-blue-500'}`}
              initial={{ width: '25%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="relative z-10">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-blue-600"><Building2 size={24} /></div>
                  <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-[10px]">Phase 01</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-slate-900">Corporate <br/>Identity.</h2>
                <p className="text-slate-500 text-sm mb-10 leading-relaxed max-w-lg font-medium">Establish your subsidiary's legal footprint within the global MyCorp database.</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-4">Registered Company Name</label>
                    <input type="text" value={formData.companyName} onChange={(e) => updateForm('companyName', e.target.value)} placeholder="e.g. Nexus Dynamics LLC" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-medium" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-4 flex items-center gap-2"><ShieldCheck size={12}/> Gov Registration ID</label>
                      <input type="text" value={formData.registrationId} onChange={(e) => updateForm('registrationId', e.target.value)} placeholder="Tax / EIN Number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-medium" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-4 flex items-center gap-2"><Globe2 size={12}/> Jurisdiction</label>
                      <input type="text" value={formData.jurisdiction} onChange={(e) => updateForm('jurisdiction', e.target.value)} placeholder="Country of Origin" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-medium" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-4 flex items-center gap-2"><Calendar size={12}/> Date of Incorporation</label>
                    <input type="date" value={formData.incorporationDate} onChange={(e) => updateForm('incorporationDate', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all [color-scheme:light] font-medium" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="relative z-10">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-600"><Globe2 size={24} /></div>
                  <span className="text-amber-600 font-black tracking-[0.3em] uppercase text-[10px]">Phase 02</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-slate-900">Operational <br/>Scope.</h2>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed max-w-lg font-medium">Define your subsidiary's primary sector and logistical scale.</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-4">Primary Sector Allocation</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[240px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-track]:bg-transparent">
                      {SECTORS.map((sector) => (
                        <div 
                          key={sector}
                          onClick={() => updateForm('sector', sector)}
                          className={`cursor-pointer border rounded-xl px-4 py-4 transition-all duration-300 flex items-center justify-between relative overflow-hidden ${
                            formData.sector === sector 
                              ? 'bg-amber-50 border-amber-300 shadow-sm' 
                              : 'bg-slate-50 border-slate-200 hover:border-amber-200'
                          }`}
                        >
                          <span className={`relative z-10 font-black uppercase tracking-widest text-[10px] ${formData.sector === sector ? 'text-amber-700' : 'text-slate-500 transition-colors'}`}>
                            {sector}
                          </span>
                          <div className={`relative z-10 w-3.5 h-3.5 rounded-full border-2 transition-all ${formData.sector === sector ? 'border-amber-500 bg-amber-500 scale-110' : 'border-slate-300 bg-white'}`} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-4 flex items-center gap-2"><Users size={12}/> Employee Count</label>
                      <select value={formData.employeeCount} onChange={(e) => updateForm('employeeCount', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all appearance-none font-medium">
                        <option value="" disabled>Select Scale</option>
                        <option value="1-50">1 - 50</option>
                        <option value="51-200">51 - 200</option>
                        <option value="201-1000">201 - 1,000</option>
                        <option value="1000+">1,000+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-4 flex items-center gap-2"><DollarSign size={12}/> Annual Revenue (USD)</label>
                      <select value={formData.revenueTier} onChange={(e) => updateForm('revenueTier', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all appearance-none font-medium">
                        <option value="" disabled>Select Tier</option>
                        <option value="<1M">&lt; $1M</option>
                        <option value="1M-10M">$1M - $10M</option>
                        <option value="10M-50M">$10M - $50M</option>
                        <option value="50M+">$50M+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-4 flex items-center gap-2"><MapPin size={12}/> Global Headquarters</label>
                    <input type="text" value={formData.hqAddress} onChange={(e) => updateForm('hqAddress', e.target.value)} placeholder="Full Corporate Address" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-medium" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="relative z-10">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-600"><ShieldCheck size={24} /></div>
                  <span className="text-indigo-600 font-black tracking-[0.3em] uppercase text-[10px]">Phase 03</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-slate-900">Executive <br/>Leadership.</h2>
                <p className="text-slate-500 text-sm mb-10 leading-relaxed max-w-lg font-medium">Assign command personnel for cross-network integration.</p>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-4 flex items-center gap-2"><UserCircle size={12}/> Owner / CEO</label>
                      <input type="text" value={formData.ownerName} onChange={(e) => updateForm('ownerName', e.target.value)} placeholder="Legal Name" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-medium" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-4 flex items-center gap-2"><ShieldCheck size={12}/> Compliance Officer</label>
                      <input type="text" value={formData.officerName} onChange={(e) => updateForm('officerName', e.target.value)} placeholder="Legal Name" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-medium" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-4">Linked Profile Email</label>
                      <input type="email" value={formData.email} disabled className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-6 py-4 text-slate-400 cursor-not-allowed italic font-mono shadow-inner" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-4 flex items-center gap-2"><Phone size={12}/> Direct Phone</label>
                      <input type="tel" value={formData.phone} onChange={(e) => updateForm('phone', e.target.value)} placeholder="+1 (555) 000-0000" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-medium" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-4 flex items-center gap-2"><LinkIcon size={12}/> Corporate Website</label>
                    <input type="url" value={formData.website} onChange={(e) => updateForm('website', e.target.value)} placeholder="https://" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-medium" />
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex items-start space-x-4 mt-8 shadow-inner">
                    <input type="checkbox" className="mt-1.5 w-4 h-4 accent-blue-600 bg-white border-slate-300 rounded cursor-pointer" id="compliance" />
                    <label htmlFor="compliance" className="text-xs text-slate-500 leading-relaxed cursor-pointer font-medium">
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
                  className="w-24 h-24 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
                >
                  <CheckCircle2 size={48} className="text-green-600" />
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-slate-900">Integration <br/>Initiated.</h2>
                <p className="text-slate-500 text-sm mb-10 leading-relaxed max-w-sm mx-auto font-medium">
                  Your registration data for <span className="text-slate-900 font-black">{formData.companyName || 'your subsidiary'}</span> has been securely transmitted. Awaiting Central Command audit.
                </p>
                <Link href="/dashboard">
                  <button className="bg-slate-900 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-blue-600 transition-all shadow-xl">
                    Access Command Center
                  </button>
                </Link>
              </motion.div>
            )}

          </AnimatePresence>

          <div className="flex flex-col gap-4 mt-12">
             {errorMessage && (
               <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3 text-red-600 text-[10px] font-black uppercase tracking-widest">
                 <AlertCircle size={14} /> {errorMessage}
               </div>
             )}

             {step < 4 && (
               <div className="flex justify-between items-center pt-8 border-t border-slate-100 relative z-10">
                 <button 
                   onClick={prevStep}
                   disabled={isSubmitting}
                   className={`text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-slate-900 disabled:opacity-50'}`}
                 >
                   <ArrowLeft size={14} /> <span>Previous</span>
                 </button>
                 
                 <button 
                   onClick={handleNextAction}
                   disabled={isSubmitting}
                   className="bg-slate-900 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all shadow-xl flex items-center space-x-3 disabled:opacity-70"
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