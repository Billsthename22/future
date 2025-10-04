'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'] });

const gallery = [
  '/cars/culture1.jpg',
  '/cars/culture2.jpg',
  '/cars/culture3.jpg',
  '/cars/culture4.jpg',
];

export default function LifestyleCulture() {
  return (
    <section className="relative bg-black text-white py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-6xl font-extrabold mb-6 uppercase tracking-widest ${orbitron.className}`}
        >
          Lifestyle <span className="text-red-600">& Culture</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className={`text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed ${orbitron.className}`}
        >
          It’s more than machines — it’s a movement.  
          Explore the world of power, style, and adrenaline that defines automotive culture.
        </motion.p>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {gallery.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255,0,0,0.4)' }}
              transition={{ type: 'spring', stiffness: 250 }}
              className="relative rounded-2xl overflow-hidden border border-red-900/20 group"
            >
              <Image
                src={img}
                alt={`culture-${i}`}
                width={400}
                height={400}
                className="object-cover w-full h-72 transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <p className={`text-sm md:text-lg tracking-widest text-red-500 ${orbitron.className}`}>
                  #CARCULTURE
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
