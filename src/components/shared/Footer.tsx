'use client';
import Link from 'next/link';
import { Twitter, Linkedin, Github, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#010b1a] border-t border-white/5 pt-32 pb-12 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-3xl font-black italic tracking-tighter mb-8 block">
              MyCorp<span className="text-blue-500">.</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              A global conglomerate driving innovation across Technology, Real Estate, and Global Logistics. 
              Built on transparency and fluid intelligence.
            </p>
            <div className="flex space-x-5">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-8">Navigation</h4>
            <ul className="space-y-4 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              <li><Link href="/about" className="hover:text-white transition">About Group</Link></li>
              <li><Link href="/sectors" className="hover:text-white transition">All Sectors</Link></li>
              <li><Link href="/careers" className="hover:text-white transition">Career Hub</Link></li>
              <li><Link href="/subsidiaries" className="hover:text-white transition">Registered Subsidiaries</Link></li>
              <li><Link href="/auth/register" className="text-white hover:text-blue-400 transition">Partner With Us</Link></li>
            </ul>
          </div>

          {/* Sectors */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-8">Industries</h4>
            <ul className="space-y-4 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              <li className="flex items-center group cursor-pointer hover:text-white transition">
                <span>Technology</span> <ArrowUpRight size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
              <li className="flex items-center group cursor-pointer hover:text-white transition">
                <span>Real Estate</span> <ArrowUpRight size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
              <li className="flex items-center group cursor-pointer hover:text-white transition">
                <span>Logistics</span> <ArrowUpRight size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
            </ul>
          </div>

          {/* HQ Location */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-8">Global HQ</h4>
            <address className="not-italic text-slate-400 text-sm leading-loose">
              1224 Corporate Plaza<br />
              Bhopal, MP 462001<br />
              India<br />
              <span className="text-white font-black block mt-4">contact@mycorp.com</span>
            </address>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-black tracking-[0.4em] text-slate-600">
          <p>© 2026 MYCORP GROUP HOLDINGS. DEVELOPED BY TECH EVENDRI.</p>
          <div className="flex space-x-10 mt-6 md:mt-0">
            <span className="cursor-pointer hover:text-white transition">PRIVACY</span>
            <span className="cursor-pointer hover:text-white transition">TERMS</span>
            <span className="cursor-pointer hover:text-white transition">GOVERNANCE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}