'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Globe2, Send, ShieldCheck, Loader2 } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { myCorpApi } from '@/src/lib/api'; // 🛰️ Import the API bridge

const LOCATIONS = [
  {
    city: "New York",
    region: "North America HQ",
    address: "1 Neural Way, Manhattan, NY 10001",
    status: "Active",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30"
  },
  {
    city: "Geneva",
    region: "European Command",
    address: "Bâtiment 4, Route de l'Innovation, 1211",
    status: "Active",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30"
  },
  {
    city: "Tokyo",
    region: "Asia-Pacific Node",
    address: "Cyber Tower, Minato City, Tokyo 105-0011",
    status: "Active",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30"
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
      // 🚀 TRANSMIT: Send payload to Spring Boot on Port 8081
      await myCorpApi.sendPublicInquiry(formData);
      
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert("message sended successfully...");
    } catch (error) {
      console.error("Uplink Error:", error);
      alert("message sending failed...");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#021533] text-white pt-32 pb-20 overflow-hidden relative selection:bg-blue-500/30">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HERO */}
        <section className="text-center mb-24 max-w-3xl mx-auto" data-aos="fade-down">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-8 backdrop-blur-md">
            <Globe2 size={12} className="text-slate-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Global Coordinates</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9] mb-6">
            Establish <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Connection.</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
            Direct access to the MyCorp Global Network. Select a regional command center or transmit a secure encrypted message to Central HQ.
          </p>
        </section>

        {/* LOCATIONS GRID */}
        <section className="grid lg:grid-cols-3 gap-6 mb-32">
          {LOCATIONS.map((loc, i) => (
            <motion.div 
              key={i} data-aos="fade-up" data-aos-delay={i * 150}
              whileHover={{ y: -10 }}
              className={`bg-white/[0.02] border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-md relative overflow-hidden group hover:${loc.border} transition-all duration-500`}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${loc.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 rounded-2xl border ${loc.border} ${loc.bg} ${loc.color}`}>
                    <MapPin size={24} />
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${loc.border} ${loc.color} flex items-center gap-2`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${loc.bg.replace('/10', '')} animate-pulse`} />
                    {loc.status}
                  </span>
                </div>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-2">{loc.city}</h3>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${loc.color} mb-6`}>{loc.region}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{loc.address}</p>
                
                <div className="space-y-3 border-t border-white/10 pt-6">
                  <p className="flex items-center gap-3 text-xs text-slate-300 font-mono"><Phone size={14} className="text-slate-500"/> +1 (000) 000-0000</p>
                  <p className="flex items-center gap-3 text-xs text-slate-300 font-mono"><Mail size={14} className="text-slate-500"/> routing@{loc.city.toLowerCase()}.mycorp.com</p>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* ENCRYPTED CONTACT FORM */}
        <section className="max-w-4xl mx-auto bg-white/[0.02] border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-xl shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden" data-aos="fade-up">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />
          
          <div className="flex items-center gap-3 mb-10">
            <ShieldCheck size={24} className="text-blue-400" />
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">Secure Transmission</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4">Authorized Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4">Return Address (Email)</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4">Routing Department / Subject</label>
              <select required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all appearance-none">
                <option value="" disabled className="bg-[#021533]">Select Routing Protocol</option>
                <option value="investor" className="bg-[#021533]">Investor Relations</option>
                <option value="media" className="bg-[#021533]">Media & Press</option>
                <option value="partnership" className="bg-[#021533]">Enterprise Partnerships</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-4">Encrypted Payload (Message)</label>
              <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all resize-none" />
            </div>
            
            <button disabled={isSending} type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] w-full md:w-auto disabled:opacity-50">
              {isSending ? <><Loader2 size={16} className="animate-spin" /> Transmitting...</> : <><Send size={16} /> Transmit Payload</>}
            </button>
          </form>
        </section>

      </div>
    </main>
  );
}