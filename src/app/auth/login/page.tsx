'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ChevronLeft, Mail, Lock, ShieldCheck, Fingerprint, Loader2, AlertCircle, UserPlus } from 'lucide-react';
import { myCorpApi } from '@/src/lib/api'; // THE BRIDGE

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // UPDATED: Real Backend Authentication
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      // 🚀 INITIATING HANDSHAKE WITH PORT 8081
      const response = await myCorpApi.login({ email, password });

      // Verify the response matches our Spring Boot AuthService logic
      if (response.status === "AUTHORIZED") {
        // Save session context to localStorage
        localStorage.setItem('mycorp_user', JSON.stringify(response));
        
        // Redirect based on the Role returned from PostgreSQL
        if (response.role === "ROLE_ADMIN") {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        setErrorMessage("Identity Refused: Access credentials not found in registry.");
      }
    } catch (error: any) {
      console.error("Handshake Failed:", error);
      setErrorMessage("Mainframe Connection Error: Ensure backend is active on Port 8081.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#021533] text-white flex items-center justify-center p-6 overflow-hidden relative selection:bg-blue-500/30">
      
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Back Navigation */}
        <Link href="/" className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors mb-8 group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Return to Public Grid</span>
        </Link>

        {/* The Glassmorphism Login Terminal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`bg-white/[0.02] border ${errorMessage ? 'border-red-500/40' : 'border-white/10'} rounded-[2.5rem] p-8 md:p-12 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden transition-colors duration-300`}
        >
          {/* Decorative Top Glow */}
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${errorMessage ? 'from-red-600 to-red-400' : 'from-blue-500 via-cyan-400 to-blue-500'} opacity-50 transition-colors duration-300`} />

          {/* Header */}
          <div className="text-center mb-10">
            <div className={`inline-flex items-center justify-center p-4 ${errorMessage ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'} rounded-2xl border mb-6 shadow-xl transition-colors duration-300`}>
              <Fingerprint size={32} />
            </div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Secure <br/>Authentication.</h1>
            <p className="text-slate-400 text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2">
              <span className={`w-1.5 h-1.5 ${errorMessage ? 'bg-red-500' : 'bg-green-500'} rounded-full animate-pulse`} />
              {errorMessage ? 'Handshake Error' : 'Network Encrypted'}
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

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Input */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4">Corporate ID / Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-400 transition-colors">
                  <Mail size={16} />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mycorp.com" 
                  className="w-full bg-black/20 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2 px-4">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Access Key</label>
                <Link href="#" className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest">Reset Key?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-400 transition-colors">
                  <Lock size={16} />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  className="w-full bg-black/20 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all font-mono tracking-widest"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full ${errorMessage ? 'bg-red-600' : 'bg-blue-600 hover:bg-blue-500'} text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-3 transition-all duration-300 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed mt-4`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Decrypting Identity...</span>
                </>
              ) : (
                <>
                  <span>Initiate Handshake</span> <ArrowRight size={16} />
                </>
              )}
            </button>

          </form>

          {/* Updated Footer Routing */}
          <div className="mt-10 pt-8 border-t border-white/5 text-center flex flex-col gap-4">
            <p className="text-slate-400 text-xs">
              New to the Grid? <br />
              <Link href="/auth/signup" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors inline-flex items-center gap-1 mt-2 uppercase tracking-widest text-[10px]">
                <UserPlus size={12} /> Create MyCorp Account
              </Link>
            </p>
            
            <p className="text-slate-500 text-[10px] uppercase tracking-widest">
              Unregistered Subsidiary? <br />
              <Link href="/auth/register" className="text-white font-bold hover:text-blue-400 transition-colors inline-flex items-center gap-1 mt-2 uppercase tracking-widest text-[10px]">
                <ShieldCheck size={12} /> Apply for Integration
              </Link>
            </p>
          </div>

        </motion.div>
      </div>
    </main>
  );
}