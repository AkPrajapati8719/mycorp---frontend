'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ChevronLeft, Mail, Lock, Phone, UserPlus, Loader2, AlertCircle, Fingerprint } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', mobile: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('http://localhost:8081/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // 🚀 SUCCESS: Move to login
        router.push('/auth/login?message=Account Created! Please Login.');
      } else {
        const data = await res.json();
        setErrorMessage(data.message || 'Identity initialization failed.');
      }
    } catch (err) {
      setErrorMessage('Mainframe Connection Error: Ensure backend is active on Port 8081.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#021533] text-white flex items-center justify-center p-6 overflow-hidden relative selection:bg-cyan-500/30">
      
      {/* Background Ambience - Cyan focused for Signup */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Back Navigation */}
        <Link href="/auth/login" className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors mb-8 group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Return to Login</span>
        </Link>

        {/* The Glassmorphism Signup Terminal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`bg-white/[0.02] border ${errorMessage ? 'border-red-500/40' : 'border-white/10'} rounded-[2.5rem] p-8 md:p-12 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden transition-colors duration-300`}
        >
          {/* Decorative Top Glow */}
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${errorMessage ? 'from-red-600 to-red-400' : 'from-cyan-500 via-blue-400 to-cyan-500'} opacity-50 transition-colors duration-300`} />

          {/* Header */}
          <div className="text-center mb-10">
            <div className={`inline-flex items-center justify-center p-4 ${errorMessage ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'} rounded-2xl border mb-6 shadow-xl transition-colors duration-300`}>
              <UserPlus size={32} />
            </div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Initialize <br/>Identity.</h1>
            <p className="text-slate-400 text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2">
              <span className={`w-1.5 h-1.5 ${errorMessage ? 'bg-red-500' : 'bg-cyan-500'} rounded-full animate-pulse`} />
              Join the Global Registry
            </p>
          </div>

          {/* Error Feedback Message */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 flex items-center gap-3 text-red-400 text-[10px] font-bold uppercase tracking-widest"
              >
                <AlertCircle size={14} /> {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4">Corporate Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                  <Mail size={16} />
                </div>
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com" 
                  className="w-full bg-black/20 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500 focus:bg-cyan-500/5 transition-all"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Mobile Input */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4">Mobile Access Code</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                  <Phone size={16} />
                </div>
                <input 
                  type="tel" 
                  required
                  placeholder="+1 (555) 000-0000" 
                  className="w-full bg-black/20 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500 focus:bg-cyan-500/5 transition-all"
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4">Security Cipher</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                  <Lock size={16} />
                </div>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••••••" 
                  className="w-full bg-black/20 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500 focus:bg-cyan-500/5 transition-all font-mono tracking-widest"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full ${errorMessage ? 'bg-red-600' : 'bg-cyan-600 hover:bg-cyan-500'} text-black py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-3 transition-all duration-300 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed mt-4`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Seeding Identity...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span> <ArrowRight size={16} />
                </>
              )}
            </button>

          </form>

          {/* Footer Routing */}
          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-slate-400 text-xs">
              Already have an Identity? <br />
              <Link href="/auth/login" className="text-white font-bold hover:text-cyan-400 transition-colors inline-flex items-center gap-1 mt-2 uppercase tracking-widest text-[10px]">
                <Fingerprint size={12} /> Access Terminal
              </Link>
            </p>
          </div>

        </motion.div>
      </div>
    </main>
  );
}