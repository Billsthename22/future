"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Gauge, DollarSign, Weight, Zap } from "lucide-react";
import groupedCarsExtended from "@/app/data/groupedcars_extended.json";

const MARKET_DATA = Object.entries(groupedCarsExtended).flatMap(([brand, cars]: [string, any]) => 
  cars.map((car: any) => {
    // 1. Clean the Price: "$26,528" -> 26528
    const numericPrice = parseInt(car.price?.replace(/[$,]/g, "")) || 0;
    
    // 2. Clean Top Speed: "215 km/h" -> 215
    const numericSpeed = parseInt(car.topSpeed?.split(" ")[0]) || 0;
    
    // 3. Clean Weight: "1026 kg" -> 1026
    const numericWeight = parseInt(car.weight?.split(" ")[0]) || 0;

    return {
      ...car,
      brand,
      numericPrice,
      numericSpeed,
      numericWeight,
    };
  })
);

export default function MarketArchive() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"price" | "speed" | "weight">("price");

  const sortedCars = useMemo(() => {
    let filtered = MARKET_DATA.filter(car => 
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === "price") return filtered.sort((a, b) => b.numericPrice - a.numericPrice);
    if (sortBy === "speed") return filtered.sort((a, b) => b.numericSpeed - a.numericSpeed);
    if (sortBy === "weight") return filtered.sort((a, b) => a.numericWeight - b.numericWeight);
    return filtered;
  }, [searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-sans selection:bg-red-600">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="border-b border-white/10 pb-10 mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-red-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter">Verified</span>
              <span className="text-[10px] font-mono tracking-[0.4em] text-gray-500 uppercase italic">Digital Registry // 2026</span>
            </div>
            <h1 className="text-7xl font-black uppercase italic tracking-tighter leading-none">
              THE <span className="text-red-600">LEDGER</span>
            </h1>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <p className="text-[10px] text-gray-500 uppercase font-black mb-1 tracking-widest">Inventory</p>
              <p className="text-2xl font-mono font-bold tracking-tighter">{MARKET_DATA.length} UNITS</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <p className="text-[10px] text-gray-500 uppercase font-black mb-1 tracking-widest">Global Reach</p>
              <p className="text-2xl font-mono font-bold tracking-tighter">INTL</p>
            </div>
          </div>
        </div>

        {/* --- CONTROLS --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-red-600 transition-colors" size={20} />
            <input 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:border-red-600 transition-all font-medium"
              placeholder="Filter by Manufacturer, Model, or Country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
            {['price', 'speed', 'weight'].map((type) => (
              <button
                key={`sort-${type}`}
                onClick={() => setSortBy(type as any)}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  sortBy === type ? 'bg-red-600 text-white shadow-lg' : 'hover:text-white text-gray-500'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* --- DATA BOARD --- */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 p-8 border-b border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 bg-white/[0.01]">
            <div className="col-span-6 lg:col-span-5">Model Specification</div>
            <div className="col-span-3 lg:col-span-2 text-right">Acquisition</div>
            <div className="col-span-3 lg:col-span-2 text-right">V-Max</div>
            <div className="hidden lg:block col-span-3 text-right">Chassis Mass</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/[0.03] max-h-[65vh] overflow-y-auto custom-scrollbar">
            {sortedCars.map((car, index) => (
              <motion.div 
                layout
                key={`ledger-${car.brand}-${car.name}-${index}`}
                className="grid grid-cols-12 p-8 items-center hover:bg-white/[0.02] transition-all group border-l-4 border-transparent hover:border-red-600"
              >
                <div className="col-span-6 lg:col-span-5 flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden flex-shrink-0 border border-white/5">
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg group-hover:text-red-500 transition-colors uppercase italic tracking-tighter leading-none mb-1">{car.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">{car.brand}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-800" />
                      <span className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">{car.country}</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-3 lg:col-span-2 text-right">
                  <p className="font-mono font-bold text-xl tracking-tighter text-white group-hover:text-red-500 transition-colors">
                    {car.price}
                  </p>
                </div>

                <div className="col-span-3 lg:col-span-2 text-right">
                  <div className="inline-flex items-center gap-2 text-gray-400 font-mono font-bold">
                    <Gauge size={14} className="opacity-20" />
                    {car.numericSpeed} <span className="text-[10px] opacity-40">KM/H</span>
                  </div>
                </div>

                <div className="hidden lg:flex col-span-3 justify-end items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs font-bold font-mono text-gray-300">{car.weight}</p>
                    <p className="text-[9px] text-gray-600 font-black uppercase tracking-tighter">{car.driveType} • {car.bodyType}</p>
                  </div>
                  <Weight size={18} className="text-gray-800" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}