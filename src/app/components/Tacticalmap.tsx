"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] });
const jbMono = JetBrains_Mono({ subsets: ["latin"] });

const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

// ... (Keep your carLocations array exactly as it is)
const carLocations: CarLocation[] = [
  // Original ones (kept exactly as you had)
  { name: 'Acura', logo: '/acuralogo.png', country: 'Japan', flag: '🇯🇵', city: 'Minato', coordinates: [139.75, 35.66] },
  { name: 'Abarth', logo: '/abarthlogo.png', country: 'Italy', flag: '🇮🇹', city: 'Turin', coordinates: [7.68, 45.07] },
  { name: 'Alfa Romeo', logo: '/alfaromeologo.png', country: 'Italy', flag: '🇮🇹', city: 'Milan', coordinates: [9.19, 45.46] },
  { name: 'Alpine', logo: '/alpineelogo.png', country: 'France', flag: '🇫🇷', city: 'Dieppe', coordinates: [1.08, 49.92] },
  { name: 'Ariel', logo: '/Brands/ariel.png', country: 'United Kingdom', flag: '🇬🇧', city: 'Crewkerne', coordinates: [-2.79, 50.88] },
  { name: 'Aston Martin', logo: '/Brands/astonmartin.png', country: 'United Kingdom', flag: '🇬🇧', city: 'Gaydon', coordinates: [-1.48, 52.18] },
  { name: 'Audi', logo: '/Brands/audi.png', country: 'Germany', flag: '🇩🇪', city: 'Ingolstadt', coordinates: [11.42, 48.76] },
  { name: 'Bentley', logo: '/Brands/bentley.png', country: 'United Kingdom', flag: '🇬🇧', city: 'Crewe', coordinates: [-2.44, 53.10] },
  { name: 'BMW', logo: '/Brands/bmw.png', country: 'Germany', flag: '🇩🇪', city: 'Munich', coordinates: [11.58, 48.13] },
  { name: 'Bugatti', logo: '/Brands/bugatti.png', country: 'France', flag: '🇫🇷', city: 'Molsheim', coordinates: [7.50, 48.52] },
  { name: 'Ferrari', logo: '/Brands/ferrari.png', country: 'Italy', flag: '🇮🇹', city: 'Maranello', coordinates: [10.86, 44.53] },
  { name: 'Koenigsegg', logo: '/Brands/koenigsegg.png', country: 'Sweden', flag: '🇸🇪', city: 'Ängelholm', coordinates: [12.86, 56.24] },
  { name: 'Lamborghini', logo: '/Brands/lamborghini.png', country: 'Italy', flag: '🇮🇹', city: 'Sant\'Agata Bolognese', coordinates: [11.12, 44.66] },
  { name: 'Maserati', logo: '/Brands/maserati.png', country: 'Italy', flag: '🇮🇹', city: 'Modena', coordinates: [10.92, 44.64] },
  { name: 'McLaren', logo: '/Brands/mclaren.png', country: 'United Kingdom', flag: '🇬🇧', city: 'Woking', coordinates: [-0.55, 51.31] },
  { name: 'Mercedes-Benz', logo: '/Brands/mercedes.png', country: 'Germany', flag: '🇩🇪', city: 'Stuttgart', coordinates: [9.18, 48.77] },
  { name: 'Pagani', logo: '/Brands/pagani.png', country: 'Italy', flag: '🇮🇹', city: 'San Cesario sul Panaro', coordinates: [10.95, 44.61] },
  { name: 'Porsche', logo: '/Brands/porsche.png', country: 'Germany', flag: '🇩🇪', city: 'Zuffenhausen', coordinates: [9.17, 48.83] },
  { name: 'Rimac', logo: '/Brands/rimac.png', country: 'Croatia', flag: '🇭🇷', city: 'Sveta Nedelja', coordinates: [15.82, 45.81] },
  { name: 'Rolls-Royce', logo: '/Brands/rollsroyce.png', country: 'United Kingdom', flag: '🇬🇧', city: 'Goodwood', coordinates: [-0.75, 50.85] },
  { name: 'Tesla', logo: '/Brands/tesla.png', country: 'United States', flag: '🇺🇸', city: 'Austin', coordinates: [-97.74, 30.26] },
  { name: 'Toyota', logo: '/Brands/toyota.png', country: 'Japan', flag: '🇯🇵', city: 'Toyota City', coordinates: [137.06, 35.08] },

  // === NEW ADDITIONS ===
  { name: 'Lotus', logo: '/Brands/lotus.png', country: 'United Kingdom', flag: '🇬🇧', city: 'Hethel', coordinates: [1.18, 52.56] },
  { name: 'Jaguar', logo: '/Brands/jaguar.png', country: 'United Kingdom', flag: '🇬🇧', city: 'Coventry', coordinates: [-1.52, 52.41] },
  { name: 'Land Rover', logo: '/Brands/landrover.png', country: 'United Kingdom', flag: '🇬🇧', city: 'Gaydon', coordinates: [-1.48, 52.18] },
  { name: 'Lexus', logo: '/Brands/lexus.png', country: 'Japan', flag: '🇯🇵', city: 'Nagoya', coordinates: [136.91, 35.18] },
  { name: 'Genesis', logo: '/Brands/genesis.png', country: 'South Korea', flag: '🇰🇷', city: 'Seoul', coordinates: [126.98, 37.57] },
  { name: 'Dodge', logo: '/Brands/dodge.png', country: 'United States', flag: '🇺🇸', city: 'Auburn Hills', coordinates: [-83.25, 42.69] },
  { name: 'Ford', logo: '/Brands/ford.png', country: 'United States', flag: '🇺🇸', city: 'Dearborn', coordinates: [-83.18, 42.32] },
  { name: 'Chevrolet', logo: '/Brands/chevrolet.png', country: 'United States', flag: '🇺🇸', city: 'Detroit', coordinates: [-83.05, 42.33] },
  { name: 'Nissan', logo: '/Brands/nissan.png', country: 'Japan', flag: '🇯🇵', city: 'Yokohama', coordinates: [139.64, 35.44] },
  { name: 'Honda', logo: '/Brands/honda.png', country: 'Japan', flag: '🇯🇵', city: 'Tokyo', coordinates: [139.77, 35.68] },
  { name: 'Mitsubishi', logo: '/Brands/mitsubishi.png', country: 'Japan', flag: '🇯🇵', city: 'Tokyo', coordinates: [139.77, 35.68] },
  { name: 'Subaru', logo: '/Brands/subaru.png', country: 'Japan', flag: '🇯🇵', city: 'Tokyo', coordinates: [139.77, 35.68] },
  { name: 'Mazda', logo: '/Brands/mazda.png', country: 'Japan', flag: '🇯🇵', city: 'Hiroshima', coordinates: [132.46, 34.39] },

  // Hypercar / Niche brands
  { name: 'SSC North America', logo: '/Brands/ssc.png', country: 'United States', flag: '🇺🇸', city: 'West Richland', coordinates: [-119.12, 46.30] },
  { name: 'Hennessey', logo: '/Brands/hennessey.png', country: 'United States', flag: '🇺🇸', city: 'Sealy', coordinates: [-96.16, 29.78] },
  { name: 'W Motors', logo: '/Brands/wmotors.png', country: 'United Arab Emirates', flag: '🇦🇪', city: 'Dubai', coordinates: [55.27, 25.20] },
  { name: 'Apollo', logo: '/Brands/apollo.png', country: 'Germany', flag: '🇩🇪', city: 'Munich', coordinates: [11.58, 48.13] },
  { name: 'Zenvo', logo: '/Brands/zenvo.png', country: 'Denmark', flag: '🇩🇰', city: 'Præstø', coordinates: [12.05, 55.12] },
  { name: 'Pininfarina', logo: '/Brands/pininfarina.png', country: 'Italy', flag: '🇮🇹', city: 'Cambiano', coordinates: [7.78, 44.97] },
  { name: 'Czinger', logo: '/Brands/czinger.png', country: 'United States', flag: '🇺🇸', city: 'Los Angeles', coordinates: [-118.24, 34.05] },
  { name: 'Glickenhaus', logo: '/Brands/glickenhaus.png', country: 'United States', flag: '🇺🇸', city: 'New York', coordinates: [-74.01, 40.71] },

  // More performance-oriented
  { name: 'Plymouth', logo: '/Brands/plymouth.png', country: 'United States', flag: '🇺🇸', city: 'Detroit', coordinates: [-83.05, 42.33] }, // historical but fun
  { name: 'Shelby', logo: '/Brands/shelby.png', country: 'United States', flag: '🇺🇸', city: 'Las Vegas', coordinates: [-115.14, 36.17] },
];
export default function TacticalMap() {
  const [position, setPosition] = useState({ coordinates: [20, 10], zoom: 1.2 });
  const [activeCar, setActiveCar] = useState<CarLocation | null>(null);
  const [hoveredCar, setHoveredCar] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleMove = (car: CarLocation) => {
    if (car.coordinates) {
      setIsScanning(true);
      setPosition({ coordinates: car.coordinates, zoom: 6 });
      setActiveCar(car);
      setTimeout(() => setIsScanning(false), 800);
    }
  };

  const handleReset = () => {
    setPosition({ coordinates: [20, 10], zoom: 1.2 });
    setActiveCar(null);
  };

  return (
    <div className={`relative h-screen w-full bg-[#05070a] text-slate-200 overflow-hidden ${jbMono.className} select-none`}>
      
      {/* 1. ATMOSPHERIC LAYERS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a2333_0%,transparent_70%)] opacity-30" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] pointer-events-none z-10" />

      {/* 2. TOP NAVIGATION HUD */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-red-600 blur opacity-20 animate-pulse" />
            <h1 className={`${orbitron.className} relative text-4xl font-black tracking-tighter text-white`}>
              AXIS<span className="text-red-600">.</span>OS
            </h1>
          </div>
          <div className="h-10 w-[1px] bg-white/10 hidden md:block" />
          <div className="hidden md:flex flex-col text-[9px] uppercase tracking-[0.3em] text-white/40">
            <span>Terminal Status: Online</span>
            <span className="text-emerald-500/70">Encrypted Satellite Link</span>
          </div>
        </div>

        <button 
          onClick={handleReset}
          className="group flex items-center gap-3 px-6 py-2 border border-white/10 hover:border-red-500/50 transition-all bg-white/5 hover:bg-red-500/10"
        >
          <span className="text-[10px] tracking-widest uppercase group-hover:text-red-400 transition-colors">Global View</span>
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
        </button>
      </header>

      {/* 3. ASSET DIRECTORY (Right Side) */}
      <aside className="absolute right-6 top-32 bottom-20 z-40 w-64 flex flex-col gap-4">
        <div className="flex items-center justify-between px-2 text-[10px] text-white/30 tracking-widest uppercase font-bold">
          <span>Active Nodes</span>
          <span className="text-red-500">{carLocations.length}</span>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-1 mask-linear-b">
          {carLocations.map((car) => (
            <button
              key={car.name}
              onClick={() => handleMove(car)}
              onMouseEnter={() => setHoveredCar(car.name)}
              onMouseLeave={() => setHoveredCar(null)}
              className={`w-full group relative flex items-center gap-3 p-3 transition-all rounded-sm border ${
                activeCar?.name === car.name 
                ? 'bg-red-500/10 border-red-500/50' 
                : 'bg-white/5 border-transparent hover:border-white/20'
              }`}
            >
              <img src={car.logo} alt="" className={`h-4 w-auto grayscale group-hover:grayscale-0 transition-all ${activeCar?.name === car.name ? 'grayscale-0' : ''}`} />
              <span className="text-xs font-medium truncate">{car.name}</span>
              {activeCar?.name === car.name && (
                <motion.div layoutId="active-pill" className="absolute left-0 w-1 h-2/3 bg-red-600" />
              )}
            </button>
          ))}
        </div>
      </aside>

      {/* 4. MAIN MAP ENGINE */}
      <main className="absolute inset-0 cursor-grab active:cursor-grabbing">
        <ComposableMap projectionConfig={{ scale: 190 }} className="w-full h-full outline-none">
          <ZoomableGroup zoom={position.zoom} center={position.coordinates as [number, number]} onMoveEnd={setPosition}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    className="transition-colors duration-500 outline-none"
                    fill={activeCar ? "#0c121d" : "#0d1117"}
                    stroke="#1e293b"
                    strokeWidth={0.4}
                    style={{
                      hover: { fill: "#161b22", outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {carLocations.map((car) => (
              <Marker key={car.name} coordinates={car.coordinates!} onClick={() => handleMove(car)}>
                <g className="cursor-pointer group">
                  <circle
                    r={activeCar?.name === car.name ? 12 : 4}
                    className={`transition-all duration-500 ${
                      activeCar?.name === car.name ? "fill-red-600/20 stroke-red-500 animate-pulse" : "fill-cyan-500/40"
                    }`}
                  />
                  <circle
                    r={activeCar?.name === car.name ? 4 : 2}
                    className={`${activeCar?.name === car.name ? "fill-red-500" : "fill-cyan-400 opacity-50"}`}
                  />
                </g>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </main>

      {/* 5. TACTICAL DATA CARD (Left Side) */}
      <AnimatePresence>
        {activeCar && (
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="absolute left-10 bottom-16 z-50 w-96"
          >
            <div className="relative bg-[#0a0f18]/90 backdrop-blur-2xl border border-white/10 p-8 rounded-tr-[40px] shadow-2xl overflow-hidden">
              {/* Technical Accents */}
              <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/20">
                0x8F-77 / SATELLITE_LOCK
              </div>
              <div className="absolute top-0 left-0 w-20 h-[2px] bg-red-600" />
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-white flex items-center justify-center rounded-xl p-3">
                  <img src={activeCar.logo} alt="" className="max-h-full object-contain" />
                </div>
                <div>
                  <h2 className={`${orbitron.className} text-3xl font-black text-white leading-none mb-1 uppercase`}>
                    {activeCar.name}
                  </h2>
                  <p className="text-red-500 text-[10px] tracking-[4px] font-bold">IDENTIFIED ASSET</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-lg overflow-hidden">
                <div className="p-4 bg-[#0a0f18]">
                  <p className="text-[9px] text-white/30 uppercase mb-1">Region</p>
                  <p className="text-xs font-semibold">{activeCar.country} {activeCar.flag}</p>
                </div>
                <div className="p-4 bg-[#0a0f18]">
                  <p className="text-[9px] text-white/30 uppercase mb-1">Hq Location</p>
                  <p className="text-xs font-semibold">{activeCar.city}</p>
                </div>
                <div className="p-4 bg-[#0a0f18]">
                  <p className="text-[9px] text-white/30 uppercase mb-1">Latitude</p>
                  <p className="text-xs font-mono text-emerald-400">{activeCar.coordinates?.[1].toFixed(4)}° N</p>
                </div>
                <div className="p-4 bg-[#0a0f18]">
                  <p className="text-[9px] text-white/30 uppercase mb-1">Longitude</p>
                  <p className="text-xs font-mono text-emerald-400">{activeCar.coordinates?.[0].toFixed(4)}° E</p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                  <span className="text-white/40">Signal Integrity</span>
                  <span className="text-emerald-500">Secure</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "94%" }}
                    className="h-full bg-gradient-to-r from-red-600 to-red-400"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. BOTTOM SYSTEM TICKER */}
      <footer className="absolute bottom-0 left-0 right-0 z-50 h-10 bg-black/90 backdrop-blur-md border-t border-white/10 flex items-center">
        <div className="px-6 h-full flex items-center bg-red-600 text-black font-black text-[10px] tracking-widest uppercase">
          System.Feed
        </div>
        <div className="flex-1 px-6 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] flex gap-20">
            <span>Primary Node: {activeCar ? activeCar.name : 'Awaiting Selection'}</span>
            <span>Uptime: 99.99%</span>
            <span>Connection: Stable</span>
            <span>Network: Global_Grid_Alpha</span>
          </div>
        </div>
      </footer>

      {/* Scanning Overlay */}
      {isScanning && (
        <div className="absolute inset-0 z-[100] pointer-events-none border-[20px] border-red-600/10 transition-all duration-300">
          <div className="w-full h-[2px] bg-red-600/30 absolute top-0 shadow-[0_0_15px_red] animate-scanline" />
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .animate-marquee { animation: marquee 30s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        @keyframes scanline { 0% { top: 0; } 100% { top: 100%; } }
        .mask-linear-b { mask-image: linear-gradient(to bottom, black 80%, transparent 100%); }
      `}</style>
    </div>
  );
}