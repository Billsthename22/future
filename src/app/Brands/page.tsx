'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import GlassNav from '@/app/components/Glassnav'; 
import Link from 'next/link';
import { Orbitron } from 'next/font/google';
import { Search, ChevronLeft, ChevronRight, Hash, Activity } from 'lucide-react';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'] });

const carBrands = [
  { name: 'Acura', logo: '/acuralogo.png' },
  { name: 'Abarth', logo: '/abarthlogo.png' },
  { name: 'Alfa Romeo', logo: '/alfaromeologo.png' },
  { name: 'Alpine', logo: '/alpineelogo.png' },
  { name: 'Ariel', logo: '/Brands/ariel.png' },
  { name: 'Arrinera', logo: '/Brands/arrinera.png' },
  { name: 'Ascari', logo: '/Brands/ascari.png' },
  { name: 'Aston Martin', logo: '/Brands/astonmartin.png' },
  { name: 'Audi', logo: '/Brands/audi.png' },
  { name: 'BAC', logo: '/Brands/bac.png' },
  { name: 'Bentley', logo: '/Brands/bentley.png' },
  { name: 'BMW', logo: '/Brands/bmw.png' },
  { name: 'Borgward', logo: '/Brands/borgward.png' },
  { name: 'Brabus', logo: '/Brands/brabus.png' },
  { name: 'Bugatti', logo: '/Brands/bugatti.png' },
  { name: 'Buick', logo: '/Brands/buick.png' },
  { name: 'BYD', logo: '/Brands/byd.png' },
  { name: 'BYTON', logo: '/Brands/byton.png' },
  { name: 'Cadillac', logo: '/Brands/cadillac.png' },
  { name: 'Caterham', logo: '/Brands/caterham.png' },
  { name: 'Changan', logo: '/Brands/changan.png' },
  { name: 'Chery', logo: '/Brands/chery.png' },
  { name: 'Chevrolet', logo: '/Brands/chevrolet.png' },
  { name: 'Chrysler', logo: '/Brands/chrysler.png' },
  { name: 'Citroën', logo: '/Brands/citroen.png' },
  { name: 'Dacia', logo: '/Brands/dacia.png' },
  { name: 'Daihatsu', logo: '/Brands/daihatsu.png' },
  { name: 'Datsun', logo: '/Brands/datsun.png' },
  { name: 'DeLorean', logo: '/Brands/delorean.png' },
  { name: 'Dodge', logo: '/Brands/dodge.png' },
  { name: 'Donkervoort', logo: '/Brands/donkervoort.png' },
  { name: 'DS Automobiles', logo: '/Brands/ds.png' },
  { name: 'Faraday Future', logo: '/Brands/faraday.png' },
  { name: 'Ferrari', logo: '/Brands/ferrari.png' },
  { name: 'Fiat', logo: '/Brands/fiat.png' },
  { name: 'Fisker', logo: '/Brands/fisker.png' },
  { name: 'Ford', logo: '/Brands/ford.png' },
  { name: 'GAC Motor', logo: '/Brands/gac.png' },
  { name: 'Geely', logo: '/Brands/geely.png' },
  { name: 'Genesis', logo: '/Brands/genesis.png' },
  { name: 'Ginetta', logo: '/Brands/ginetta.png' },
  { name: 'GMC', logo: '/Brands/gmc.png' },
  { name: 'Great Wall', logo: '/Brands/greatwall.png' },
  { name: 'Haval', logo: '/Brands/haval.png' },
  { name: 'Hennessey', logo: '/Brands/hennessey.png' },
  { name: 'Holden', logo: '/Brands/holden.png' },
  { name: 'Honda', logo: '/Brands/honda.png' },
  { name: 'Hummer', logo: '/Brands/hummer.png' },
  { name: 'Hyundai', logo: '/Brands/hyundai.png' },
  { name: 'Infiniti', logo: '/Brands/infiniti.png' },
  { name: 'Isuzu', logo: '/Brands/isuzu.png' },
  { name: 'Italdesign', logo: '/Brands/italdesign.png' },
  { name: 'Jaguar', logo: '/Brands/jaguar.png' },
  { name: 'Jeep', logo: '/Brands/jeep.png' },
  { name: 'Karma', logo: 'brands/karma.png' },
  { name: 'Kia', logo: '/Brands/kia.png' },
  { name: 'Koenigsegg', logo: '/Brands/koenigsegg.png' },
  { name: 'Lada', logo: '/Brands/lada.png' },
  { name: 'Lamborghini', logo: '/Brands/lamborghini.png' },
  { name: 'Lancia', logo: '/Brands/lancia.png' },
  { name: 'Land Rover', logo: '/Brands/landrover.png' },
  { name: 'Lexus', logo: '/Brands/lexus.png' },
  { name: 'Li Auto', logo: '/Brands/liauto.png' },
  { name: 'Lightyear', logo: '/Brands/lightyear.png' },
  { name: 'Lincoln', logo: 'Brands/lincoln.png' },
  { name: 'Local Motors', logo: '/Brands/localmotors.png' },
  { name: 'Lotus', logo: '/Brands/lotus.png' },
  { name: 'Lucid', logo: '/Brands/lucid.png' },
  { name: 'Mahindra', logo: '/Brands/mahindra.png' },
  { name: 'Maserati', logo: '/Brands/maserati.png' },
  { name: 'Maybach', logo: '/Brands/maybach.png' },
  { name: 'Mazda', logo: '/Brands/mazda.png' },
  { name: 'McLaren', logo: '/Brands/mclaren.png' },
  { name: 'Mercedes-Benz', logo: '/Brands/mercedes.png' },
  { name: 'Mercury', logo: '/Brands/mercury.png' },
  { name: 'MG', logo: '/Brands/mg.png' },
  { name: 'Mini', logo: '/Brands/mini.png' },
  { name: 'Mitsubishi', logo: '/Brands/mitsubishi.png' },
  { name: 'Morgan', logo: '/Brands/morgan.png' },
  { name: 'Nikola', logo: '/Brands/nikola.png' },
  { name: 'NIO', logo: '/Brands/nio.png' },
  { name: 'Nissan', logo: '/Brands/nissan.png' },
  { name: 'Opel', logo: '/Brands/opel.png' },
  { name: 'Pagani', logo: '/Brands/pagani.png' },
  { name: 'Peugeot', logo: '/Brands/peugeot.png' },
  { name: 'Pininfarina', logo: '/Brands/pininfarina.png' },
  { name: 'Polestar', logo: '/Brands/polestar.png' },
  { name: 'Pontiac', logo: '/Brands/pontiac.png' },
  { name: 'Porsche', logo: '/Brands/porsche.png' },
  { name: 'Proton', logo: '/Brands/proton.png' },
  { name: 'Ram', logo: '/Brands/ram.png' },
  { name: 'Ravon', logo: '/Brands/ravon.png' },
  { name: 'Renault', logo: '/Brands/renault.png' },
  { name: 'Rezvani', logo: '/Brands/rezvani.png' },
  { name: 'Rimac', logo: '/Brands/rimac.png' },
  { name: 'Rivian', logo: '/Brands/rivian.png' },
  { name: 'Rolls-Royce', logo: '/Brands/rollsroyce.png' },
  { name: 'Roewe', logo: '/Brands/roewe.png' },
  { name: 'Saab', logo: '/Brands/saab.png' },
  { name: 'Saleen', logo: '/Brands/saleen.png' },
  { name: 'Scion', logo: '/Brands/scion.png' },
  { name: 'SEAT', logo: '/Brands/seat.png' },
  { name: 'Shelby', logo: '/Brands/shelby.png' },
  { name: 'Škoda', logo: '/Brands/skoda.png' },
  { name: 'Smart', logo: '/Brands/smart.png' },
  { name: 'Spyker', logo: '/Brands/spyker.png' },
  { name: 'SSC North America', logo: '/Brands/ssc.png' },
  { name: 'Subaru', logo: '/Brands/subaru.png' },
  { name: 'Suzuki', logo: '/Brands/suzuki.png' },
  { name: 'Tata', logo: '/Brands/tata.png' },
  { name: 'Tesla', logo: '/Brands/tesla.png' },
  { name: 'Toyota', logo: '/Brands/toyota.png' },
  { name: 'Vauxhall', logo: '/Brands/vauxhall.png' },
  { name: 'VinFast', logo: '/Brands/vinfast.png' },
  { name: 'Volkswagen', logo: '/Brands/volkswagen.png' },
  { name: 'Volvo', logo: '/Brands/volvo.png' },
  { name: 'W Motors', logo: '/Brands/wmotors.png' },
  { name: 'Wey', logo: '/Brands/wey.png' },
  { name: 'XPeng', logo: 'Brands/xpeng.png' },
  { name: 'Yugo', logo: '/Brands/yugo.png' },
  { name: 'Zenvo', logo: 'Brands/zenvo.png' },
];

export default function BrandCollection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const filteredBrands = carBrands.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBrands = filteredBrands.slice(startIndex, startIndex + itemsPerPage);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <>
      <GlassNav />
      <section className="relative bg-[#020202] min-h-screen text-white pt-32 pb-20 px-6 overflow-hidden">
        {/* TECH OVERLAY */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(220,38,38,0.1)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 opacity-[0.02]" 
               style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* HEADER AREA */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-white/10 pb-12">
            <div>
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-2 mb-4">
                <Activity size={14} className="text-red-600 animate-pulse" />
                <span className={`text-red-600 text-[10px] tracking-[0.5em] font-bold uppercase ${orbitron.className}`}>
                  Status: System_Online
                </span>
              </motion.div>
              <h1 className={`text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none ${orbitron.className}`}>
                THE <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>REGISTRY</span>
              </h1>
            </div>
            <div className={`hidden md:block text-right ${orbitron.className}`}>
               <p className="text-red-600 text-4xl font-black leading-none">{carBrands.length}</p>
               <p className="text-[10px] text-gray-500 tracking-widest uppercase mt-2">Indexed Assets</p>
            </div>
          </div>

          {/* HUD CONTROLS */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="text"
                placeholder="QUERY_DATABASE..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className={`w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 text-white placeholder-gray-700 focus:outline-none focus:border-red-600/50 transition-all text-[10px] tracking-widest ${orbitron.className}`}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-1">
              <button 
                onClick={() => {setSearchTerm(''); setCurrentPage(1);}}
                className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 hover:border-red-600 transition-colors text-gray-500"
              >
                <Hash size={14} />
              </button>
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => { setSearchTerm(letter); setCurrentPage(1); }}
                  className={`w-9 h-9 flex items-center justify-center text-[10px] font-bold border transition-all ${orbitron.className} 
                    ${searchTerm.toUpperCase() === letter 
                      ? 'bg-red-600 border-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]' 
                      : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/40 hover:text-white'}`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* ASSET GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-white/10 border border-white/10">
            <AnimatePresence mode="popLayout">
              {currentBrands.map((brand, index) => (
                <motion.div
                  key={brand.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={`/Brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group relative h-52 bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
                  >
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                       <div className="w-1 h-1 bg-red-600 group-hover:animate-ping" />
                       <span className="text-[8px] text-white/20 font-bold group-hover:text-red-600/60 transition-colors">
                        LOG_{index + startIndex + 100}
                       </span>
                    </div>

                    <div className="relative w-20 h-20 mb-4 transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className="object-contain opacity-30 group-hover:opacity-100 transition-opacity"
                      />
                    </div>

                    <p className={`text-[10px] tracking-[0.3em] font-bold text-gray-600 group-hover:text-red-600 uppercase transition-colors ${orbitron.className}`}>
                      {brand.name}
                    </p>
                    
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-red-600 group-hover:w-full transition-all duration-500 shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* PAGER TERMINAL */}
          <div className="mt-20 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-4 bg-white/5 border border-white/10 text-gray-500 hover:text-red-600 hover:border-red-600 disabled:opacity-10 transition-all shadow-inner"
              >
                <ChevronLeft size={20} />
              </button>

              <div className={`px-10 py-3 border border-white/5 bg-white/[0.02] text-[10px] tracking-[0.5em] font-black uppercase text-gray-500 ${orbitron.className}`}>
                SEC_PAGE <span className="text-red-600">{currentPage}</span> / {totalPages}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-4 bg-white/5 border border-white/10 text-gray-500 hover:text-red-600 hover:border-red-600 disabled:opacity-10 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}