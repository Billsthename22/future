'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'] });

const cars = [
  { name: 'Ferrari F40', img: '/cars/f40.jpg' },
  { name: 'Lamborghini Aventador', img: '/cars/aventador.jpg' },
  { name: 'Porsche 911 GT3', img: '/cars/911.jpg' },
];

export default function FeaturedCars() {
  return (
    <section className="relative bg-black text-white py-24 overflow-hidden">
      {/* Glowing backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-6xl font-extrabold text-center mb-12 tracking-wider uppercase ${orbitron.className}`}
        >
          Featured <span className="text-red-600">Cars</span>
        </motion.h2>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {cars.map((car, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 35px rgba(255,0,0,0.4)',
              }}
              transition={{ type: 'spring', stiffness: 250 }}
              className="relative rounded-3xl overflow-hidden group cursor-pointer border border-red-900/20 bg-gradient-to-b from-gray-900 to-black"
            >
              {/* Car Image */}
              <Image
                src={car.img}
                alt={car.name}
                width={500}
                height={300}
                className="object-cover w-full h-64 transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`text-xl md:text-2xl font-semibold ${orbitron.className}`}
                >
                  {car.name}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-3 w-10 h-[2px] bg-red-600 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
