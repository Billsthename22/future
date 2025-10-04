'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import GlassNav from '../components.tsx /Glassnav'; // ✅ fixed import path

const carBrands = [
  { name: 'Abarth', logo: '/brands/abarth.png' },
  { name: 'Alfa Romeo', logo: '/brands/alfaromeo.png' },
  { name: 'Aston Martin', logo: '/brands/astonmartin.png' },
  { name: 'Audi', logo: '/brands/audi.png' },
  { name: 'Bentley', logo: '/brands/bentley.png' },
  { name: 'BMW', logo: '/brands/bmw.png' },
  { name: 'Bugatti', logo: '/brands/bugatti.png' },
  { name: 'Cadillac', logo: '/brands/cadillac.png' },
  { name: 'Chevrolet', logo: '/brands/chevrolet.png' },
  { name: 'Ferrari', logo: '/brands/ferrari.png' },
  { name: 'Ford', logo: '/brands/ford.png' },
  { name: 'Honda', logo: '/brands/honda.png' },
  { name: 'Hyundai', logo: '/brands/hyundai.png' },
  { name: 'Jaguar', logo: '/brands/jaguar.png' },
  { name: 'Jeep', logo: '/brands/jeep.png' },
  { name: 'Kia', logo: '/brands/kia.png' },
  { name: 'Koenigsegg', logo: '/brands/koenigsegg.png' },
  { name: 'Lamborghini', logo: '/brands/lamborghini.png' },
  { name: 'Land Rover', logo: '/brands/landrover.png' },
  { name: 'Lexus', logo: '/brands/lexus.png' },
  { name: 'Lucid', logo: '/brands/lucid.png' },
  { name: 'Maserati', logo: '/brands/maserati.png' },
  { name: 'Mazda', logo: '/brands/mazda.png' },
  { name: 'McLaren', logo: '/brands/mclaren.png' },
  { name: 'Mercedes-Benz', logo: '/brands/mercedes.png' },
  { name: 'Nissan', logo: '/brands/nissan.png' },
  { name: 'Pagani', logo: '/brands/pagani.png' },
  { name: 'Porsche', logo: '/brands/porsche.png' },
  { name: 'Rolls-Royce', logo: '/brands/rollsroyce.png' },
  { name: 'Tesla', logo: '/brands/tesla.png' },
  { name: 'Toyota', logo: '/brands/toyota.png' },
  { name: 'Volkswagen', logo: '/brands/volkswagen.png' },
  { name: 'Volvo', logo: '/brands/volvo.png' },
  { name: 'Zenvo', logo: '/brands/zenvo.png' },
];

export default function BrandCollection() {
  const [searchTerm, setSearchTerm] = useState('');
  const gradientRef = useRef<HTMLDivElement>(null);

  const filteredBrands = carBrands.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animated background effect
  useEffect(() => {
    let x = 0;
    const animate = () => {
      x += 0.3;
      if (gradientRef.current) {
        gradientRef.current.style.backgroundPosition = `${x}px ${x}px`;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <>
      <GlassNav />
<br/>
      <section className="relative overflow-hidden min-h-screen text-white py-20 px-6 flex flex-col items-center justify-center">
        {/* Animated Cinematic Background */}
        <div
          ref={gradientRef}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0a0a0a_0%,_#000_100%)] bg-[length:400%_400%] opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

        {/* Heading */}
        <div className="relative z-10 max-w-7xl w-full text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-widest text-yellow-500 drop-shadow-[0_0_25px_rgba(255,215,0,0.5)]">
            THE LEGENDS
          </h1>
          <p className="text-gray-400 mt-4 text-lg tracking-wide">
            Explore iconic brands that shaped automotive history.
          </p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-lg mb-8"
        >
          <div className="absolute -inset-[2px] bg-gradient-to-r from-yellow-500/40 to-transparent rounded-2xl blur-md"></div>
          <input
            type="text"
            placeholder="Search for a brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="relative w-full px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-md text-gray-200 border border-gray-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all duration-300 placeholder-gray-500 shadow-xl"
          />
        </motion.div>

        {/* Alphabet Filter */}
        <div className="relative z-10 flex flex-wrap justify-center gap-2 mb-10">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => setSearchTerm(letter)}
              className="px-3 py-1 text-sm font-medium text-gray-400 hover:text-yellow-400 transition border border-gray-700 hover:border-yellow-500 rounded-lg bg-black/40 backdrop-blur-sm"
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Brand Grid */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-7xl"
        >
          {filteredBrands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.02 }}
              className="group relative bg-gradient-to-b from-gray-900/90 to-black/90 rounded-xl p-6 flex flex-col items-center justify-center hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.05)] hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] border border-gray-800"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-yellow-500/10 to-transparent rounded-xl"></div>
              <div className="relative w-24 h-24 mb-3">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain opacity-80 group-hover:opacity-100 transition"
                />
              </div>
              <p className="font-semibold text-gray-300 group-hover:text-yellow-400 tracking-wide">
                {brand.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
