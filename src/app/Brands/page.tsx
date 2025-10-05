'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import GlassNav from '../components.tsx /Glassnav'; // ✅ fixed import path

const carBrands = [
  { name: 'Acura', logo: '/brands/acura.png' },
  { name: 'Abarth', logo: '/brands/abarth.png' },
  { name: 'Alfa Romeo', logo: '/brands/alfaromeo.png' },
  { name: 'Alpine', logo: '/brands/alpine.png' },
  { name: 'Ariel', logo: '/brands/ariel.png' },
  { name: 'Arrinera', logo: '/brands/arrinera.png' },
  { name: 'Ascari', logo: '/brands/ascari.png' },
  { name: 'Aston Martin', logo: '/brands/astonmartin.png' },
  { name: 'Audi', logo: '/brands/audi.png' },
  { name: 'BAC', logo: '/brands/bac.png' },
  { name: 'Bentley', logo: '/brands/bentley.png' },
  { name: 'BMW', logo: '/brands/bmw.png' },
  { name: 'Borgward', logo: '/brands/borgward.png' },
  { name: 'Brabus', logo: '/brands/brabus.png' },
  { name: 'Bugatti', logo: '/brands/bugatti.png' },
  { name: 'Buick', logo: '/brands/buick.png' },
  { name: 'BYD', logo: '/brands/byd.png' },
  { name: 'BYTON', logo: '/brands/byton.png' },
  { name: 'Cadillac', logo: '/brands/cadillac.png' },
  { name: 'Caterham', logo: '/brands/caterham.png' },
  { name: 'Changan', logo: '/brands/changan.png' },
  { name: 'Chery', logo: '/brands/chery.png' },
  { name: 'Chevrolet', logo: '/brands/chevrolet.png' },
  { name: 'Chrysler', logo: '/brands/chrysler.png' },
  { name: 'Citroën', logo: '/brands/citroen.png' },
  { name: 'Dacia', logo: '/brands/dacia.png' },
  { name: 'Daihatsu', logo: '/brands/daihatsu.png' },
  { name: 'Datsun', logo: '/brands/datsun.png' },
  { name: 'DeLorean', logo: '/brands/delorean.png' },
  { name: 'Dodge', logo: '/brands/dodge.png' },
  { name: 'Donkervoort', logo: '/brands/donkervoort.png' },
  { name: 'DS Automobiles', logo: '/brands/ds.png' },
  { name: 'Faraday Future', logo: '/brands/faraday.png' },
  { name: 'Ferrari', logo: '/brands/ferrari.png' },
  { name: 'Fiat', logo: '/brands/fiat.png' },
  { name: 'Fisker', logo: '/brands/fisker.png' },
  { name: 'Ford', logo: '/brands/ford.png' },
  { name: 'GAC Motor', logo: '/brands/gac.png' },
  { name: 'Geely', logo: '/brands/geely.png' },
  { name: 'Genesis', logo: '/brands/genesis.png' },
  { name: 'Ginetta', logo: '/brands/ginetta.png' },
  { name: 'GMC', logo: '/brands/gmc.png' },
  { name: 'Great Wall', logo: '/brands/greatwall.png' },
  { name: 'Haval', logo: '/brands/haval.png' },
  { name: 'Hennessey', logo: '/brands/hennessey.png' },
  { name: 'Holden', logo: '/brands/holden.png' },
  { name: 'Honda', logo: '/brands/honda.png' },
  { name: 'Hummer', logo: '/brands/hummer.png' },
  { name: 'Hyundai', logo: '/brands/hyundai.png' },
  { name: 'Infiniti', logo: '/brands/infiniti.png' },
  { name: 'Isuzu', logo: '/brands/isuzu.png' },
  { name: 'Italdesign', logo: '/brands/italdesign.png' },
  { name: 'Jaguar', logo: '/brands/jaguar.png' },
  { name: 'Jeep', logo: '/brands/jeep.png' },
  { name: 'Karma', logo: '/brands/karma.png' },
  { name: 'Kia', logo: '/brands/kia.png' },
  { name: 'Koenigsegg', logo: '/brands/koenigsegg.png' },
  { name: 'Lada', logo: '/brands/lada.png' },
  { name: 'Lamborghini', logo: '/brands/lamborghini.png' },
  { name: 'Lancia', logo: '/brands/lancia.png' },
  { name: 'Land Rover', logo: '/brands/landrover.png' },
  { name: 'Lexus', logo: '/brands/lexus.png' },
  { name: 'Li Auto', logo: '/brands/liauto.png' },
  { name: 'Lightyear', logo: '/brands/lightyear.png' },
  { name: 'Lincoln', logo: '/brands/lincoln.png' },
  { name: 'Local Motors', logo: '/brands/localmotors.png' },
  { name: 'Lotus', logo: '/brands/lotus.png' },
  { name: 'Lucid', logo: '/brands/lucid.png' },
  { name: 'Mahindra', logo: '/brands/mahindra.png' },
  { name: 'Maserati', logo: '/brands/maserati.png' },
  { name: 'Maybach', logo: '/brands/maybach.png' },
  { name: 'Mazda', logo: '/brands/mazda.png' },
  { name: 'McLaren', logo: '/brands/mclaren.png' },
  { name: 'Mercedes-Benz', logo: '/brands/mercedes.png' },
  { name: 'Mercury', logo: '/brands/mercury.png' },
  { name: 'MG', logo: '/brands/mg.png' },
  { name: 'Mini', logo: '/brands/mini.png' },
  { name: 'Mitsubishi', logo: '/brands/mitsubishi.png' },
  { name: 'Morgan', logo: '/brands/morgan.png' },
  { name: 'Nikola', logo: '/brands/nikola.png' },
  { name: 'NIO', logo: '/brands/nio.png' },
  { name: 'Nissan', logo: '/brands/nissan.png' },
  { name: 'Opel', logo: '/brands/opel.png' },
  { name: 'Pagani', logo: '/brands/pagani.png' },
  { name: 'Peugeot', logo: '/brands/peugeot.png' },
  { name: 'Pininfarina', logo: '/brands/pininfarina.png' },
  { name: 'Polestar', logo: '/brands/polestar.png' },
  { name: 'Pontiac', logo: '/brands/pontiac.png' },
  { name: 'Porsche', logo: '/brands/porsche.png' },
  { name: 'Proton', logo: '/brands/proton.png' },
  { name: 'Ram', logo: '/brands/ram.png' },
  { name: 'Ravon', logo: '/brands/ravon.png' },
  { name: 'Renault', logo: '/brands/renault.png' },
  { name: 'Rezvani', logo: '/brands/rezvani.png' },
  { name: 'Rimac', logo: '/brands/rimac.png' },
  { name: 'Rivian', logo: '/brands/rivian.png' },
  { name: 'Rolls-Royce', logo: '/brands/rollsroyce.png' },
  { name: 'Roewe', logo: '/brands/roewe.png' },
  { name: 'Saab', logo: '/brands/saab.png' },
  { name: 'Saleen', logo: '/brands/saleen.png' },
  { name: 'Scion', logo: '/brands/scion.png' },
  { name: 'SEAT', logo: '/brands/seat.png' },
  { name: 'Shelby', logo: '/brands/shelby.png' },
  { name: 'Škoda', logo: '/brands/skoda.png' },
  { name: 'Smart', logo: '/brands/smart.png' },
  { name: 'Spyker', logo: '/brands/spyker.png' },
  { name: 'SSC North America', logo: '/brands/ssc.png' },
  { name: 'Subaru', logo: '/brands/subaru.png' },
  { name: 'Suzuki', logo: '/brands/suzuki.png' },
  { name: 'Tata', logo: '/brands/tata.png' },
  { name: 'Tesla', logo: '/brands/tesla.png' },
  { name: 'Toyota', logo: '/brands/toyota.png' },
  { name: 'Vauxhall', logo: '/brands/vauxhall.png' },
  { name: 'VinFast', logo: '/brands/vinfast.png' },
  { name: 'Volkswagen', logo: '/brands/volkswagen.png' },
  { name: 'Volvo', logo: '/brands/volvo.png' },
  { name: 'W Motors', logo: '/brands/wmotors.png' },
  { name: 'Wey', logo: '/brands/wey.png' },
  { name: 'XPeng', logo: '/brands/xpeng.png' },
  { name: 'Yugo', logo: '/brands/yugo.png' },
  { name: 'Zenvo', logo: '/brands/zenvo.png' },
];

export default function BrandCollection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const gradientRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 15;

  const filteredBrands = carBrands.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBrands = filteredBrands.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Background animation
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
      <br />
      <section className="relative overflow-hidden min-h-screen text-white py-20 px-6 flex flex-col items-center justify-center">
        {/* Background */}
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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="relative w-full px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-md text-gray-200 border border-gray-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all duration-300 placeholder-gray-500 shadow-xl"
          />
        </motion.div>

        {/* Alphabet Filter */}
        <div className="relative z-10 flex flex-wrap justify-center gap-2 mb-10">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => {
                setSearchTerm(letter);
                setCurrentPage(1);
              }}
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
          {currentBrands.map((brand, index) => (
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

        {/* Pagination Controls */}
        <div className="relative z-10 mt-12 flex items-center gap-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-black/40 border border-gray-700 rounded-lg text-gray-300 hover:text-yellow-400 hover:border-yellow-400 transition disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-gray-400">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-black/40 border border-gray-700 rounded-lg text-gray-300 hover:text-yellow-400 hover:border-yellow-400 transition disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
}
