'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'] });

const milestones = [
  { year: '1980s', text: 'The Era of Raw Power', detail: 'Pure mechanical force, dominated by the F40 and Group B monsters.', img: '/1990s.jpg', code: 'REF: 80-MECH' },
  { year: '1990s', text: 'Turbocharged Dreams', detail: 'The rise of electronic fuel injection and sequential twin-turbos.', img: '/supercar.jpg', code: 'REF: 90-AERO' },
  { year: '2000s', text: 'Precision Engineering', detail: 'Carbon fiber monocoques and high-revving naturally aspirated V10s.', img: '/engineering.jpg', code: 'REF: 00-CARB' },
  { year: '2020s', text: 'Electric Innovation', detail: 'Instant torque and hybrid systems redefining the supercar ceiling.', img: '/electronicvehicle.jpg', code: 'REF: 20-ELEC' },
];

export default function HistoryLegacy() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative bg-[#050505] text-white py-32 overflow-hidden border-t border-white/5">
      {/* Background HUD Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <header className="text-center mb-32">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`text-red-600 text-xs tracking-[0.5em] font-bold uppercase ${orbitron.className}`}
          >
            Temporal Archive
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-5xl md:text-7xl font-black mt-4 uppercase tracking-tighter ${orbitron.className}`}
          >
            Evolutionary <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Path</span>
          </motion.h2>
        </header>

        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-full bg-white/10 hidden md:block">
            <motion.div 
              style={{ height: lineHeight }}
              className="w-full bg-red-600 shadow-[0_0_15px_#dc2626]"
            />
          </div>

          <div className="space-y-40">
            {milestones.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Image Section */}
                <div className="w-full md:w-1/2 group">
                  <div className="relative rounded-sm overflow-hidden border border-white/10 p-2 bg-white/5 transition-all hover:border-red-600/50">
                    <img
                      src={item.img}
                      alt={item.year}
                      className="w-full h-[300px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 text-[8px] tracking-widest text-red-500 border border-red-500/30">
                      {item.code}
                    </div>
                  </div>
                </div>

                {/* Timeline Node (Mobile Hidden) */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-red-600 z-30 hidden md:block">
                  <div className="w-full h-full animate-ping rounded-full bg-red-600 opacity-40" />
                </div>

                {/* Text Section */}
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'}`}>
                  <span className={`text-4xl md:text-6xl font-black text-white/10 block mb-2 ${orbitron.className}`}>
                    {item.year}
                  </span>
                  <h3 className={`text-2xl font-bold text-red-600 mb-4 tracking-wide ${orbitron.className}`}>
                    {item.text}
                  </h3>
                  <p className={`text-gray-400 text-sm md:text-base leading-relaxed max-w-md ${i % 2 !== 0 && 'ml-auto'} ${orbitron.className}`}>
                    {item.detail}
                  </p>
                  
                  <motion.div 
                    whileHover={{ x: i % 2 === 0 ? 10 : -10 }}
                    className={`mt-6 inline-flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] uppercase text-white/60 cursor-pointer hover:text-red-500 transition-colors ${i % 2 !== 0 && 'flex-row-reverse'}`}
                  >
                    <span>Decrypt Entry</span>
                    <div className="w-12 h-[1px] bg-red-600" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}