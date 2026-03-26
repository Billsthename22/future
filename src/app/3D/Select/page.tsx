"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Orbitron } from "next/font/google";
import { Search } from "lucide-react";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });

const brands = [
  { name: 'Acura', logo: '/Brands/acura.png' },
  { name: 'Abarth', logo: '/Brands/abarth.png' },
  { name: 'Alfa Romeo', logo: '/Brands/alfaromeo.png' },
  { name: 'Alpine', logo: '/Brands/alpine.png' },
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
  { name: 'Karma', logo: '/Brands/karma.png' },
  { name: 'Kia', logo: '/Brands/kia.png' },
  { name: 'Koenigsegg', logo: '/Brands/koenigsegg.png' },
  { name: 'Lada', logo: '/Brands/lada.png' },
  { name: 'Lamborghini', logo: '/Brands/lamborghini.png' },
  { name: 'Lancia', logo: '/Brands/lancia.png' },
  { name: 'Land Rover', logo: '/Brands/landrover.png' },
  { name: 'Lexus', logo: '/Brands/lexus.png' },
  { name: 'Li Auto', logo: '/Brands/liauto.png' },
  { name: 'Lightyear', logo: '/Brands/lightyear.png' },
  { name: 'Lincoln', logo: '/Brands/lincoln.png' },
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
  { name: 'XPeng', logo: '/Brands/xpeng.png' },
  { name: 'Yugo', logo: '/Brands/yugo.png' },
  { name: 'Zenvo', logo: '/Brands/zenvo.png' },
];

export default function BrandSelectPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="relative w-full min-h-screen bg-[#020202] flex flex-col items-center py-24 px-6 overflow-hidden">
      {/* HUD Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(220,38,38,0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      {/* Header */}
      <div className="relative z-10 text-center mb-12">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`${orbitron.className} text-red-600 text-[10px] tracking-[0.6em] mb-2 uppercase`}
        >
          // select_manufacturer
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${orbitron.className} text-4xl md:text-6xl font-black text-white`}
        >
          THE <span className="text-red-600">GARAGE</span>
        </motion.h1>
      </div>

      {/* Search Bar - Stylized as HUD input */}
      <motion.div 
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "100%" }}
        className="relative z-10 w-full max-w-md mb-20 group"
      >
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-red-600 group-focus-within:animate-pulse" />
        </div>
        <input
          type="text"
          placeholder="SEARCH_DATABASE..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`${orbitron.className} w-full bg-white/5 border-b border-white/10 py-4 pl-12 pr-4 text-xs text-white placeholder:text-gray-700 focus:outline-none focus:border-red-600 focus:bg-white/[0.07] transition-all`}
        />
      </motion.div>

      {/* Brand Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full max-w-7xl z-10 relative"
      >
        <AnimatePresence mode="popLayout">
          {filteredBrands.map((brand, index) => (
            <motion.div
              layout
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Link
              href={`/3D/Select/${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group relative flex flex-col items-center p-6 bg-[#080808] border border-white/5 hover:border-red-600/50 hover:bg-black transition-all duration-500 overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-2 h-[1px] bg-red-600 group-hover:w-full transition-all duration-500" />
                
                {/* Logo Container */}
                <div className="w-16 h-16 md:w-20 md:h-20 relative mb-4">
                  <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/10 blur-xl transition-all duration-500" />
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  />
                </div>

                <h2 className={`${orbitron.className} text-[10px] text-gray-500 group-hover:text-white text-center tracking-widest transition-colors`}>
                  {brand.name.toUpperCase()}
                </h2>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredBrands.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-20">
          <p className={`${orbitron.className} text-gray-600 text-xs tracking-widest uppercase`}>
            No results found in central database.
          </p>
        </motion.div>
      )}
    </section>
  );
}