"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });

export default function Welcome3D() {
  const selectedCar = "porsche"; 

  return (
    <section className="relative w-full h-screen bg-[#020202] flex flex-col items-center justify-center overflow-hidden">
      
      {/* 1. VISUAL DEPTH: The HUD Grid & Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle, black, transparent 80%)'
          }} 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full" />
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        {/* Entry Code / Tag */}
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`${orbitron.className} text-red-600 text-[10px] tracking-[0.5em] mb-4 uppercase`}
        >
          // system_init_3d_render
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`${orbitron.className} text-5xl md:text-8xl font-black text-white tracking-tighter leading-none`}
        >
          SELECT <span className="text-red-600">ORIGIN</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-gray-500 mt-6 text-sm md:text-base max-w-lg leading-relaxed tracking-wide font-light"
        >
          Synchronizing interface with high-fidelity automotive assets. 
          Interact with legacy performance in a fully immersive spatial environment.
        </motion.p>
        
        {/* 3. THE RE-DESIGNED BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 group relative"
        >
          {/* Decorative Corner Brackets */}
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-red-600 transition-all group-hover:-top-4 group-hover:-left-4" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-red-600 transition-all group-hover:-bottom-4 group-hover:-right-4" />

          // In Welcome3D.tsx
<Link 
  href="/3D/Select" // This points to your new selection gallery
  className={`${orbitron.className} relative block px-12 py-5 bg-white/5 border border-white/10 ...`}
>
  Launch Interface
</Link>
        </motion.div>

        {/* 4. FOOTER SCANNER (Optional flair) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-20">
          <div className="w-12 h-[1px] bg-white" />
          <span className={`${orbitron.className} text-[8px] text-white`}>v2.06_3D_ENGINE</span>
          <div className="w-12 h-[1px] bg-white" />
        </div>
      </div>
    </section>
  );
}