'use client';

import Image from 'next/image';
import { motion, PanInfo, AnimatePresence } from 'framer-motion';
import { Orbitron } from 'next/font/google';
import { useRef, useEffect, useState } from 'react';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'] });

const cars = [
  { name: 'Ferrari F40', img: '/f40.jpeg', year: '1987', topSpeed: '324 km/h' },
  { name: 'Lamborghini Aventador', img: '/aventador.jpeg', year: '2011', topSpeed: '350 km/h' },
  { name: 'Porsche 911 GT3', img: '/911gt3.jpeg', year: '2023', topSpeed: '318 km/h' },
];

export default function FeaturedCars() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    const handleResize = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDragEnd = (_event: any, info: PanInfo) => {
    if (info.offset.x < -50 && currentIndex < cars.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (info.offset.x > 50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section id="featured" className="relative bg-[#050505] text-white py-24 overflow-hidden border-t border-white/5">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="text-left">
            <span className={`text-red-600 text-xs tracking-[0.4em] font-bold uppercase ${orbitron.className}`}>
              Collection // 2024
            </span>
            <h2 className={`text-4xl md:text-5xl font-black tracking-tighter uppercase ${orbitron.className}`}>
              Featured <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Specimens</span>
            </h2>
          </div>
          <div className={`text-[10px] text-gray-500 tracking-widest uppercase hidden md:block ${orbitron.className}`}>
            Verifying Chassis Data... [OK]
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {cars.map((car, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="group relative bg-white/5 border border-white/10 p-4 rounded-sm transition-all hover:border-red-600/50"
            >
              <div className="relative h-64 w-full overflow-hidden mb-6">
                 {/* Scanning Effect Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600/50 z-20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <Image 
                  src={car.img} 
                  alt={car.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className={`text-lg font-bold leading-tight max-w-[150px] ${orbitron.className}`}>
                    {car.name}
                  </h3>
                  <span className="text-red-600 text-xs font-bold">#{String(i + 1).padStart(3, '0')}</span>
                </div>
                
                <div className={`grid grid-cols-2 gap-4 text-[10px] uppercase tracking-widest text-gray-500 ${orbitron.className}`}>
                  <div>
                    <p className="text-gray-600">Year</p>
                    <p className="text-white">{car.year}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Top Speed</p>
                    <p className="text-white">{car.topSpeed}</p>
                  </div>
                </div>

                <button className="w-full py-3 mt-4 text-[10px] font-bold tracking-[0.2em] uppercase border border-white/10 hover:bg-red-600 hover:border-red-600 transition-all duration-300">
                  Access Data
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Swipe Carousel */}
        <div className="md:hidden relative w-full" ref={containerRef}>
          <motion.div
            className="flex"
            drag="x"
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            animate={{ x: -currentIndex * containerWidth }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            {cars.map((car, i) => (
              <div key={i} className="min-w-full px-2">
                <div className="bg-white/5 border border-white/10 p-4">
                  <div className="relative h-64 mb-6">
                    <Image src={car.img} alt={car.name} fill className="object-cover grayscale" />
                  </div>
                  <h3 className={`text-xl font-bold mb-4 ${orbitron.className}`}>{car.name}</h3>
                  <button className="w-full py-4 text-xs font-bold tracking-widest uppercase bg-red-600">
                    View Specs
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {cars.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 transition-all duration-300 ${currentIndex === i ? 'w-8 bg-red-600' : 'w-2 bg-white/20'}`} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}