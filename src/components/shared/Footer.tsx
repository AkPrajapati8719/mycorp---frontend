'use client';
import Link from 'next/link';
import { Twitter, Linkedin, Github, ArrowUpRight, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-32 pb-12 px-10 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50/50 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-3xl font-black italic tracking-tighter mb-8 block text-slate-900">
              MyCorp<span className="text-blue-600">.</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
              A global conglomerate driving innovation across Technology, Real Estate, and Global Logistics. 
              Built on transparency and fluid intelligence.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-8">Navigation</h4>
            <ul className="space-y-4 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
              <li><Link href="/about" className="hover:text-blue-600 transition-colors">About Group</Link></li>
              <li><Link href="/sectors" className="hover:text-blue-600 transition-colors">All Sectors</Link></li>
              <li><Link href="/careers" className="hover:text-blue-600 transition-colors">Career Hub</Link></li>
              <li><Link href="/subsidiaries" className="hover:text-blue-600 transition-colors">Subsidiary Registry</Link></li>
              <li><Link href="/auth/register" className="text-slate-900 hover:text-blue-600 transition-colors">Partner With Us</Link></li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-8">Industries</h4>
            <ul className="space-y-4 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
              <li className="flex items-center group cursor-pointer hover:text-blue-600 transition-colors">
                <span>Technology</span> <ArrowUpRight size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
              </li>
              <li className="flex items-center group cursor-pointer hover:text-blue-600 transition-colors">
                <span>Real Estate</span> <ArrowUpRight size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
              </li>
              <li className="flex items-center group cursor-pointer hover:text-blue-600 transition-colors">
                <span>Logistics</span> <ArrowUpRight size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
              </li>
            </ul>
          </div>

          {/* HQ Location */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-8">Global HQ</h4>
            <address className="not-italic text-slate-500 text-sm leading-loose font-medium">
              1224 Corporate Plaza<br />
              Bhopal, MP 462001<br />
              India<br />
              <Link href="mailto:contact@mycorp.com" className="text-slate-900 font-black block mt-4 hover:text-blue-600 transition-colors underline decoration-blue-200 underline-offset-4">
                contact@mycorp.com
              </Link>
            </address>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-[9px] font-bold tracking-[0.3em] text-slate-400">
          <p className="uppercase">© 2026 MYCORP GROUP HOLDINGS. DEVELOPED BY ABHISHEK PRAJAPATI.</p>
          <div className="flex space-x-10 mt-6 md:mt-0 uppercase">
            <span className="cursor-pointer hover:text-slate-900 transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-slate-900 transition-colors">Terms</span>
            <span className="cursor-pointer hover:text-slate-900 transition-colors">Governance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
