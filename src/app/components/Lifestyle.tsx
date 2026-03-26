'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'] });

const gallery = [
  { src: '/cars/culture1.jpg', tag: 'AESTHETIC', span: 'col-span-12 md:col-span-7' },
  { src: '/cars/culture2.jpg', tag: 'COMMUNITY', span: 'col-span-12 md:col-span-5' },
  { src: '/cars/culture3.jpg', tag: 'DESIGN', span: 'col-span-12 md:col-span-5' },
  { src: '/cars/culture4.jpg', tag: 'ADRENALINE', span: 'col-span-12 md:col-span-7' },
];

export default function LifestyleCulture() {
  return (
    <section className="relative bg-[#050505] text-white py-32 overflow-hidden border-t border-white/5">
      {/* Background HUD Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className={`text-red-600 text-[10px] tracking-[0.5em] font-bold uppercase ${orbitron.className}`}
            >
              Social Manifest // 004
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`text-4xl md:text-6xl font-black mt-2 uppercase tracking-tighter ${orbitron.className}`}
            >
              Culture <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>& Pulse</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`text-gray-500 text-xs md:text-sm max-w-xs md:text-right leading-relaxed ${orbitron.className}`}
          >
            It’s more than machines — it’s a movement. Explore the world of power, style, and adrenaline.
          </motion.p>
        </div>

        {/* Dynamic Gallery Grid */}
        <div className="grid grid-cols-12 gap-6">
          {gallery.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative group rounded-sm overflow-hidden border border-white/10 bg-white/5 p-2 ${item.span}`}
            >
              {/* Image Container */}
              <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={`culture-${i}`}
                  fill
                  className="object-cover transition-transform duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110"
                />
                
                {/* Visualizer Overlay (Top) */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-black/20 opacity-60 group-hover:opacity-20 transition-opacity" />

                {/* Tag Label */}
                <div className="absolute bottom-4 left-4 z-20">
                   <p className={`text-[10px] font-bold tracking-[0.4em] text-white/50 group-hover:text-red-500 transition-colors ${orbitron.className}`}>
                    ARCHIVE_ID // {item.tag}
                   </p>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/40 group-hover:border-red-600 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 flex justify-center"
        >
          <button className={`group flex items-center gap-6 text-[10px] font-bold tracking-[0.5em] uppercase text-gray-500 hover:text-white transition-all ${orbitron.className}`}>
            <span className="h-[1px] w-12 bg-gray-800 group-hover:bg-red-600 transition-all" />
            View Full Gallery
            <span className="h-[1px] w-12 bg-gray-800 group-hover:bg-red-600 transition-all" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}