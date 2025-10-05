'use client';

import Image from 'next/image';
import { motion, PanInfo } from 'framer-motion';
import { Orbitron } from 'next/font/google';
import { useRef, useEffect, useState } from 'react';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'] });

const cars = [
  { name: 'Ferrari F40', img: '/f40.jpeg' },
  { name: 'Lamborghini Aventador', img: '/aventador.jpeg' },
  { name: 'Porsche 911 GT3', img: '/911gt3.jpeg' },
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

  // Properly type the first parameter as PointerEvent | TouchEvent | MouseEvent
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50 && currentIndex < cars.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (info.offset.x > 50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="relative bg-black text-white py-24 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h2 className={`text-4xl md:text-6xl font-extrabold text-center mb-12 tracking-wider uppercase ${orbitron.className}`}>
          Featured <span className="text-red-600">Cars</span>
        </h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-10">
          {cars.map((car, i) => (
            <div key={i} className="relative rounded-3xl overflow-hidden border border-red-900/20 bg-gradient-to-b from-gray-900 to-black">
              <Image src={car.img} alt={car.name} width={500} height={300} className="object-cover w-full h-64" />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <p className={`text-xl font-semibold text-red-600 ${orbitron.className}`}>{car.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Carousel */}
        <div className="md:hidden relative w-full overflow-hidden" ref={containerRef}>
          <motion.div
            className="flex"
            drag="x"
            dragElastic={0.2}
            dragConstraints={{ left: -containerWidth * (cars.length - 1), right: 0 }}
            onDragEnd={handleDragEnd}
            animate={{ x: -currentIndex * containerWidth }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {cars.map((car, i) => (
              <div
                key={i}
                className="min-w-full relative rounded-3xl overflow-hidden border border-red-900/20 bg-gradient-to-b from-gray-900 to-black"
              >
                <Image src={car.img} alt={car.name} width={500} height={300} className="object-cover w-full h-64" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <p className={`text-xl font-semibold text-red-600 ${orbitron.className}`}>{car.name}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
