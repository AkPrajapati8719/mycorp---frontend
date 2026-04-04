'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Globe2, Send, ShieldCheck, Loader2 } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { myCorpApi } from '@/src/lib/api'; 

const LOCATIONS = [
  {
    city: "New York",
    region: "North America HQ",
    address: "1 Neural Way, Manhattan, NY 10001",
    status: "Active",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200"
  },
  {
    city: "Geneva",
    region: "European Command",
    address: "Bâtiment 4, Route de l'Innovation, 1211",
    status: "Active",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200"
  },
  {
    city: "Tokyo",
    region: "Asia-Pacific Node",
    address: "Cyber Tower, Minato City, Tokyo 105-0011",
    status: "Active",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-200"
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, easing: 'ease-out-cubic' });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      await myCorpApi.sendPublicInquiry(formData);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert("Transmission successful. Secure uplink established.");
    } catch (error) {
      console.error("Uplink Error:", error);
      alert("Transmission failed. Retrying sync...");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-48 pb-20 overflow-hidden relative selection:bg-blue-100">
      
      {/* Background Ambience (Refined for Light theme) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-400/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HERO */}
        <section className="text-center mb-24 max-w-3xl mx-auto" data-aos="fade-down">
          <div className="inline-flex items-center space-x-2 bg-white border border-slate-200 px-5 py-2 rounded-full mb-8 shadow-sm backdrop-blur-md">
            <Globe2 size={12} className="text-blue-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Global Coordinates</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9] mb-6 text-slate-900">
            Establish <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Connection.</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            Direct access to the MyCorp Global Network. Select a regional command center or transmit a secure encrypted message to Central HQ.
          </p>
        </section>

        {/* LOCATIONS GRID */}
        <section className="grid lg:grid-cols-3 gap-8 mb-32">
          {LOCATIONS.map((loc, i) => (
            <motion.div 
              key={i} data-aos="fade-up" data-aos-delay={i * 150}
              whileHover={{ y: -10 }}
              className="bg-white border border-slate-200 p-10 rounded-[2.5rem] relative overflow-hidden group transition-all duration-500 shadow-sm hover:shadow-2xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${loc.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className={`p-4 rounded-2xl border ${loc.border} ${loc.bg} ${loc.color} shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all duration-500`}>
                    <MapPin size={24} />
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${loc.border} ${loc.color} flex items-center gap-2 bg-white`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    {loc.status}
                  </span>
                </div>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-2 text-slate-900">{loc.city}</h3>
                <p className={`text-[10px] font-black uppercase tracking-widest ${loc.color} mb-6`}>{loc.region}</p>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">{loc.address}</p>
                
                <div className="space-y-4 border-t border-slate-100 pt-8">
                  <p className="flex items-center gap-3 text-xs text-slate-600 font-bold tracking-tight"><Phone size={14} className="text-slate-400"/> +1 (000) 000-0000</p>
                  <p className="flex items-center gap-3 text-xs text-slate-600 font-bold tracking-tight"><Mail size={14} className="text-slate-400"/> routing@{loc.city.toLowerCase()}.mycorp.com</p>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* ENCRYPTED CONTACT FORM (Light Crystal Design) */}
        <section className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-[3.5rem] p-8 md:p-16 shadow-[0_40px_80px_rgba(0,0,0,0.04)] relative overflow-hidden" data-aos="fade-up">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600" />
          
          <div className="flex items-center gap-3 mb-12">
            <ShieldCheck size={28} className="text-blue-600" />
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">Secure Transmission</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-4">Authorized Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-medium" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-4">Return Address (Email)</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-medium" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-4">Routing Department / Subject</label>
              <div className="relative">
                <select required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all appearance-none font-medium cursor-pointer">
                  <option value="" disabled>Select Routing Protocol</option>
                  <option value="investor">Investor Relations</option>
                  <option value="media">Media & Press</option>
                  <option value="partnership">Enterprise Partnerships</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                   <Globe2 size={16} />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-4">Encrypted Payload (Message)</label>
              <textarea required rows={6} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all resize-none font-medium" />
            </div>
            
            <motion.button 
              disabled={isSending} 
              type="submit" 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-slate-900 hover:bg-blue-600 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-xl disabled:opacity-50 w-full md:w-auto"
            >
              {isSending ? (
                <><Loader2 size={18} className="animate-spin" /> Transmitting...</>
              ) : (
                <><Send size={18} /> Transmit Payload</>
              )}
            </motion.button>
          </form>
        </section>

      </div>
    </main>
  );
}