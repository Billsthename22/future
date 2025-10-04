'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'] });

export default function HistoryLegacy() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  const milestones = [
    { year: '1980s', text: 'The Era of Raw Power', img: '/history/80s.jpg' },
    { year: '1990s', text: 'Turbocharged Dreams', img: '/history/90s.jpg' },
    { year: '2000s', text: 'Precision Engineering', img: '/history/2000s.jpg' },
    { year: '2020s', text: 'Electric Innovation', img: '/history/2020s.jpg' },
  ];

  return (
    <section ref={ref} className="relative bg-black text-white py-24 overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-[url('/history/bg.jpg')] bg-cover bg-center opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-6xl font-extrabold mb-16 uppercase tracking-widest ${orbitron.className}`}
        >
          Our <span className="text-red-600">Legacy</span>
        </motion.h2>

        <div className="space-y-24">
          {milestones.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-full md:w-3/4 rounded-2xl overflow-hidden border border-red-800/30 shadow-[0_0_30px_rgba(255,0,0,0.2)]"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"
                />
                <img
                  src={item.img}
                  alt={item.year}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-6 left-0 right-0 z-20">
                  <p className={`text-3xl md:text-4xl font-bold text-red-600 mb-2 ${orbitron.className}`}>
                    {item.year}
                  </p>
                  <p className={`text-gray-300 text-lg ${orbitron.className}`}>
                    {item.text}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
