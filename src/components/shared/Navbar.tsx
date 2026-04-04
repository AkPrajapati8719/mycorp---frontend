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
  }, [pathname]);

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
      {/* Main Bar: Shifted to light-glass with soft shadow */}
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/70 backdrop-blur-2xl border border-white/40 px-8 py-5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
        
        {/* Logo Section: Deep Slate for contrast */}
        <Link href="/" className="group flex items-center space-x-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg rotate-12 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center font-black italic text-white text-xs shadow-lg shadow-slate-200">M</div>
          <span className="text-2xl font-black tracking-tighter italic text-slate-900">
            MyCorp<span className="text-blue-600">.</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-10">
          <div className="flex bg-slate-100/50 rounded-full px-2 py-1 border border-slate-200/50">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-full hover:text-blue-600 ${pathname === link.href ? 'text-slate-900 bg-white shadow-sm' : 'text-slate-500'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* DESKTOP ACTION CENTER */}
          <div className="flex items-center space-x-4 border-l border-slate-200 pl-10">
            {!user ? (
              <>
                <Link href="/auth/login" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors mr-2">
                  Sign In
                </Link>
                <Link href="/auth/register" className="px-6 py-3 bg-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest text-white hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                  Join Ecosystem
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                {user.role === 'ROLE_ADMIN' ? (
                  <Link href="/admin" className="p-3 bg-blue-50 rounded-full border border-blue-100 hover:bg-blue-600 transition-all text-blue-600 hover:text-white group relative">
                    <ShieldCheck size={18} />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">Admin Command</span>
                  </Link>
                ) : (
                  <Link href="/dashboard" className="p-3 bg-blue-50 rounded-full border border-blue-100 hover:bg-blue-600 transition-all text-blue-600 hover:text-white group relative">
                    <User size={18} />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">Subsidiary Portal</span>
                  </Link>
                )}
                <button onClick={handleLogout} className="p-3 bg-slate-50 rounded-full border border-slate-200 hover:bg-red-50 transition-all text-slate-400 hover:text-red-500">
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle: Slate for better visibility */}
        <button className="lg:hidden text-slate-900 p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay: Frost White */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            className="absolute top-24 left-6 right-6 bg-white/95 backdrop-blur-3xl border border-slate-200 p-8 rounded-[2.5rem] lg:hidden flex flex-col space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-black italic uppercase tracking-tighter transition-colors flex justify-between items-center group ${
                  pathname === link.href ? 'text-blue-600' : 'text-slate-900 hover:text-blue-500'
                }`}
              >
                {link.name}
                <ChevronRight size={18} className={`${pathname === link.href ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity`} />
              </Link>
            ))}
            
            <div className="mt-4 pt-6 border-t border-slate-100 flex flex-col space-y-3">
              {!user ? (
                <>
                  <Link href="/auth/login" onClick={() => setIsOpen(false)} className="w-full bg-slate-50 border border-slate-200 text-slate-900 flex items-center justify-center gap-2 py-4 rounded-full font-black uppercase tracking-widest text-[9px]">
                    <LogIn size={14} /> Corporate Sign In
                  </Link>
                  <Link href="/auth/register" onClick={() => setIsOpen(false)} className="w-full bg-slate-900 text-white text-center py-4 rounded-full font-black uppercase tracking-widest text-[9px] shadow-lg shadow-slate-200">
                    Register Company
                  </Link>
                </>
              ) : (
                <>
                  <Link href={user.role === 'ROLE_ADMIN' ? '/admin' : '/dashboard'} onClick={() => setIsOpen(false)} className="w-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center gap-2 py-4 rounded-full font-black uppercase tracking-widest text-[9px]">
                    <ShieldCheck size={14} /> Command Center
                  </Link>
                  <button onClick={handleLogout} className="w-full bg-red-50 border border-red-100 text-red-500 py-4 rounded-full font-black uppercase tracking-widest text-[9px]">
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