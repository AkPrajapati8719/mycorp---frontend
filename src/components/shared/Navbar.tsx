'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, ShieldCheck, ChevronRight, LogIn, LogOut } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  // 🚀 SYNC SESSION WITH BACKEND STATE
  useEffect(() => {
    const session = localStorage.getItem('mycorp_user');
    if (session) {
      setUser(JSON.parse(session));
    } else {
      setUser(null);
    }
  }, [pathname]); // Re-check session on every route change

  const handleLogout = () => {
    localStorage.removeItem('mycorp_user');
    setUser(null);
    window.location.href = '/';
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Sectors', href: '/sectors' },
    { name: 'Subsidiaries', href: '/subsidiaries' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed w-full top-8 z-[100] px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/5 backdrop-blur-2xl border border-white/10 px-8 py-5 rounded-full shadow-2xl">
        
        {/* Logo Section */}
        <Link href="/" className="group flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg rotate-12 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center font-black italic text-white text-xs">M</div>
          <span className="text-2xl font-black tracking-tighter italic text-white">
            MyCorp<span className="text-blue-500">.</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-10">
          <div className="flex bg-black/20 rounded-full px-2 py-1 border border-white/5">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-full hover:bg-white/5 ${pathname === link.href ? 'text-white bg-white/5' : 'text-slate-400'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* DESKTOP ACTION CENTER (Dynamic) */}
          <div className="flex items-center space-x-4 border-l border-white/10 pl-10">
            {!user ? (
              <>
                <Link href="/auth/login" className="text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors mr-2">
                  Sign In
                </Link>
                <Link href="/auth/register" className="px-6 py-3 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
                  Join Ecosystem
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                {/* Role-Based Redirects */}
                {user.role === 'ROLE_ADMIN' ? (
                  <Link href="/admin" className="p-3 bg-cyan-500/10 rounded-full border border-cyan-500/30 hover:bg-cyan-500 transition-all text-cyan-400 hover:text-black group relative">
                    <ShieldCheck size={18} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Admin Command</span>
                  </Link>
                ) : (
                  <Link href="/dashboard" className="p-3 bg-blue-500/10 rounded-full border border-blue-500/30 hover:bg-blue-500 transition-all text-blue-400 hover:text-white group relative">
                    <User size={18} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Subsidiary Portal</span>
                  </Link>
                )}
                <button onClick={handleLogout} className="p-3 bg-white/5 rounded-full border border-white/10 hover:bg-red-500/20 transition-all text-slate-400 hover:text-red-400">
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            className="absolute top-24 left-6 right-6 bg-[#020b1a]/95 backdrop-blur-3xl border border-white/10 p-8 rounded-[2rem] lg:hidden flex flex-col space-y-5 shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
          >
            {/* Reduced link sizes and spacing */}
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-black italic uppercase tracking-tighter transition-colors flex justify-between items-center group ${
                  pathname === link.href ? 'text-blue-500' : 'text-white hover:text-blue-400'
                }`}
              >
                {link.name}
                <ChevronRight size={18} className={`${pathname === link.href ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity`} />
              </Link>
            ))}
            
            {/* Refined Action Buttons */}
            <div className="mt-4 pt-6 border-t border-white/10 flex flex-col space-y-3">
              {!user ? (
                <>
                  <Link href="/auth/login" onClick={() => setIsOpen(false)} className="w-full bg-white/5 border border-white/10 text-white flex items-center justify-center gap-2 py-4 rounded-full font-black uppercase tracking-widest text-[9px]">
                    <LogIn size={14} /> Corporate Sign In
                  </Link>
                  <Link href="/auth/register" onClick={() => setIsOpen(false)} className="w-full bg-blue-600 text-white text-center py-4 rounded-full font-black uppercase tracking-widest text-[9px] shadow-lg">
                    Register Company
                  </Link>
                </>
              ) : (
                <>
                  <Link href={user.role === 'ROLE_ADMIN' ? '/admin' : '/dashboard'} onClick={() => setIsOpen(false)} className="w-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center gap-2 py-4 rounded-full font-black uppercase tracking-widest text-[9px]">
                    <ShieldCheck size={14} /> Command Center
                  </Link>
                  <button onClick={handleLogout} className="w-full bg-red-500/10 border border-red-500/30 text-red-400 py-4 rounded-full font-black uppercase tracking-widest text-[9px]">
                    Disconnect
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}