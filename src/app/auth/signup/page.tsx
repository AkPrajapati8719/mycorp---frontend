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

      // 🌐 Dynamic API Bridge
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mycorp-backend-67ut.onrender.com/api'; 

      try {
        const res = await fetch(`${API_BASE_URL}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          router.push('/auth/login?message=Account Created! Please Login.');
        } else {
          const data = await res.json().catch(() => ({}));
          setErrorMessage(data.message || 'Identity initialization failed. User might already exist.');
        }
      } catch (err) {
        setErrorMessage('Mainframe Connection Error: The security server is currently unreachable.');
        console.error("Signup Error:", err);
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 flex items-center justify-center p-6 overflow-hidden relative selection:bg-blue-100 selection:text-blue-900">
      
      {/* Background Ambience - Refined for Light Theme */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-400/5 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-indigo-400/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Back Navigation */}
        <Link href="/auth/login" className="inline-flex items-center space-x-2 text-slate-400 hover:text-slate-900 transition-colors mb-8 group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Return to Login</span>
        </Link>

        {/* The Glassmorphism Signup Terminal (Premium Light Edition) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`bg-white border ${errorMessage ? 'border-red-200' : 'border-slate-200'} rounded-[2.5rem] p-8 md:p-12 shadow-[0_40px_80px_rgba(0,0,0,0.04)] relative overflow-hidden transition-all duration-300`}
        >
          {/* Decorative Top Glow */}
          <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${errorMessage ? 'from-red-500 to-red-400' : 'from-blue-600 via-indigo-500 to-blue-600'} opacity-80`} />

          {/* Header */}
          <div className="text-center mb-10">
            <div className={`inline-flex items-center justify-center p-5 ${errorMessage ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'} rounded-2xl border mb-6 shadow-sm transition-colors duration-300`}>
              <UserPlus size={32} />
            </div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-slate-900">Initialize <br/>Identity.</h1>
            <p className="text-slate-400 text-[10px] tracking-[0.2em] uppercase font-black flex items-center justify-center gap-2">
              <span className={`w-1.5 h-1.5 ${errorMessage ? 'bg-red-500' : 'bg-green-500'} rounded-full animate-pulse`} />
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
                className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 flex items-center gap-3 text-red-600 text-[10px] font-black uppercase tracking-widest"
              >
                <AlertCircle size={14} /> {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-4">Corporate Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail size={16} />
                </div>
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-medium"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Mobile Input */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-4">Mobile Access Code</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Phone size={16} />
                </div>
                <input 
                  type="tel" 
                  required
                  placeholder="+1 (555) 000-0000" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-medium"
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-4">Security Cipher</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock size={16} />
                </div>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••••••" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-mono tracking-widest"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button 
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full ${errorMessage ? 'bg-red-600' : 'bg-slate-900 hover:bg-blue-600'} text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all duration-300 shadow-xl disabled:opacity-70 mt-4`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Seeding Identity...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span> <ArrowRight size={18} />
                </>
              )}
            </motion.button>

          </form>

          {/* Footer Routing */}
          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-xs font-medium">
              Already have an Identity? <br />
              <Link href="/auth/login" className="text-blue-600 font-black hover:text-indigo-600 transition-colors inline-flex items-center gap-1.5 mt-2 uppercase tracking-[0.15em] text-[10px]">
                <Fingerprint size={14} /> Access Terminal
              </Link>
            </p>
          </div>

        </motion.div>
      </div>
    </main>
  );
}