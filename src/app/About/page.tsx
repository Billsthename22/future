'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { Orbitron } from "next/font/google";
import { 
  Gauge, Zap, Globe, Users, Database, Shield, 
  Cpu, Activity, Target, Fingerprint, Radio, ArrowRight 
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] });

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} className="bg-[#020202] text-white overflow-hidden min-h-screen">
      
      {/* ===== HERO: TACTICAL HUD ===== */}
      <div className="relative h-[90vh] flex flex-col justify-center items-center text-center px-6 border-b border-white/5">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale"
          src="/cars/showreel.mp4"
          autoPlay loop muted playsInline
        />
        
        {/* SCANNER LINE ANIMATION */}
        <motion.div 
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[2px] bg-red-600/30 z-10 shadow-[0_0_15px_rgba(220,38,38,0.5)] pointer-events-none"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#020202]" />

        {/* HUD OVERLAY DATA */}
        <div className="absolute inset-0 p-10 flex flex-col justify-between pointer-events-none opacity-40 hidden md:flex">
          <div className="flex justify-between items-start">
            <div className={`${orbitron.className} text-[8px] tracking-[0.4em] space-y-1`}>
              <p>SYS_STABLE: 100%</p>
              <p>LATENCY: 12ms</p>
              <p>IP: 192.168.1.001</p>
            </div>
            <div className="text-right">
              <Fingerprint size={24} className="text-red-600 mb-2 ml-auto" />
              <p className={`${orbitron.className} text-[8px] tracking-[0.4em]`}>BIOMETRIC_MATCH_OK</p>
            </div>
          </div>
          <div className="flex justify-between items-end">
             <div className="w-32 h-32 border-l border-b border-white/10" />
             <div className="w-32 h-32 border-r border-b border-white/10" />
          </div>
        </div>

        <div className="relative z-20">
          <motion.div
            initial={{ opacity: 0, letterSpacing: "1em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1.5 }}
            className={`text-red-600 text-[10px] md:text-xs font-bold uppercase mb-6 ${orbitron.className}`}
          >
            Terminal // Initialize_Archive
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-6xl md:text-[9rem] font-black uppercase tracking-tighter leading-none ${orbitron.className}`}
          >
            AUTO <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>PROTOCOL</span>
          </motion.h1>
        </div>
      </div>

      {/* ===== STORY: THE CORE LOGIC ===== */}
      <div className="relative max-w-7xl mx-auto py-40 px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute -left-10 top-0 w-1 h-full bg-red-600/20" />
            <span className={`${orbitron.className} text-red-600 text-[10px] tracking-[0.5em] mb-4 block`}>01 // MISSION_STATEMENT</span>
            <h2 className={`text-5xl font-black mb-10 leading-tight uppercase ${orbitron.className}`}>
              Engineered <br /> <span className="text-gray-600">to Endure</span>
            </h2>
            <p className={`text-gray-400 text-base md:text-lg leading-relaxed font-light tracking-wide max-w-xl`}>
              Auto Archive represents the apex of automotive documentation. We capture 
              the mechanical heartbeat of the world's most significant machines, 
              preserving technical blueprints and acoustic signatures for the next 
              generation of enthusiasts.
            </p>
            <div className="mt-12 flex gap-10">
               <div>
                  <p className={`${orbitron.className} text-xl font-bold`}>10K+</p>
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest">Data Assets</p>
               </div>
               <div>
                  <p className={`${orbitron.className} text-xl font-bold`}>250+</p>
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest">Verified Specs</p>
               </div>
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute inset-0 bg-red-600/10 blur-[100px] rounded-full" />
            <motion.div 
              style={{ y }}
              className="relative aspect-square border border-white/10 bg-black/40 backdrop-blur-3xl p-4"
            >
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
               <img 
                 src="/cars/engine-schematic.jpg" 
                 alt="Technical Schematic" 
                 className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 transition-opacity"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu size={80} className="text-red-600/20" />
               </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== GRID: THE ARCHIVE MODULES ===== */}
      <div className="bg-[#050505] border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-6 gap-px bg-white/5 border border-white/5">
          {[
            { icon: <Target />, title: "Precision Tuning", desc: "Detailed analysis of weight distribution and chassis rigidity.", id: "01" },
            { icon: <Radio />, title: "Acoustic Files", desc: "Raw audio captures of exhaust notes at peak RPM.", id: "02" },
            { icon: <Shield />, title: "Provenance", desc: "Verifying ownership history and race-win pedigrees.", id: "03" },
            { icon: <Activity />, title: "Live Telemetry", desc: "Real-time performance comparison tools for all classes.", id: "04" },
          ].map((item, i) => (
            <div key={i} className="bg-[#020202] p-10 hover:bg-white/[0.02] transition-all group relative">
              <span className="absolute top-6 right-6 text-white/5 font-black text-4xl">{item.id}</span>
              <div className="w-12 h-12 bg-red-600/10 rounded-sm flex items-center justify-center text-red-600 mb-8 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>
              <h4 className={`${orbitron.className} text-sm font-bold mb-4 tracking-widest uppercase`}>{item.title}</h4>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== FINAL CALL: THE SYSTEM OVERRIDE ===== */}
      <div className="py-40 text-center relative">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className={`${orbitron.className} text-5xl md:text-8xl font-black mb-10 tracking-tighter`}>
            READY TO <span className="text-red-600">DRIVE?</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base uppercase tracking-[0.3em] mb-12">
            The archive is open. Unauthorized access is strictly encouraged.
          </p>
          
          <Link href="/Brands" className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden font-bold transition-all bg-red-600 rounded-sm hover:bg-white">
            <span className="absolute inset-0 w-full h-full bg-red-600 group-hover:bg-white transition-all duration-300"></span>
            <span className="relative flex items-center gap-3 text-white group-hover:text-red-600 transition-colors uppercase text-xs tracking-[0.4em]">
              Access Brands <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}