'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Orbitron } from 'next/font/google';
import { ChevronLeft, Cpu, Gauge, Zap, Wind } from 'lucide-react';
import carsDataRaw from '@/app/data/groupedcars_extended.json';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'] });

type Car = {
  name: string;
  year: number;
  topSpeed: string;
  engine: string;
  horsepower?: number;
  transmission?: string;
  acceleration: string;
  image: string;
};

const carsData = carsDataRaw as Record<string, Car[]>;

export default function BrandModels() {
  const params = useParams() as { brand?: string };
  const brandParam = params.brand;

  if (!brandParam) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const normalize = (str: string) => str.toLowerCase().replace(/[-\s]/g, '');
  const brandKey = Object.keys(carsData).find((key) => normalize(key) === normalize(brandParam)) || '';
  const models = brandKey ? carsData[brandKey] : [];

  return (
    <section className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6 overflow-hidden">
      {/* Background HUD */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(220,38,38,0.05)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Navigation & Header */}
        <div className="mb-12">
          <Link href="/Brands" className="group flex items-center gap-2 text-[10px] text-gray-500 hover:text-red-600 transition-colors uppercase tracking-[0.3em] mb-8">
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Registry
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-10">
            <div>
              <p className={`text-red-600 text-[10px] tracking-[0.5em] font-bold uppercase mb-2 ${orbitron.className}`}>
                Classification // {brandKey || 'Unknown'}
              </p>
              <h1 className={`text-5xl md:text-7xl font-black uppercase tracking-tighter ${orbitron.className}`}>
                {brandKey ? brandKey : 'Not Found'}<span className="text-red-600">.</span>
              </h1>
            </div>
            <div className={`text-right ${orbitron.className}`}>
               <p className="text-white text-2xl font-black leading-none">{models.length}</p>
               <p className="text-[10px] text-gray-600 tracking-widest uppercase mt-1">Variants Detected</p>
            </div>
          </div>
        </div>

        {models.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {models.map((model, idx) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={`/Brands/${brandKey.toLowerCase().replace(/\s+/g, '-')}/${model.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group relative block bg-[#0a0a0a] border border-white/5 overflow-hidden hover:border-red-600/50 transition-all duration-500"
                >
                  {/* Top Bar ID */}
                  <div className="flex justify-between items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Model_Ref: {idx + 101}</span>
                    <span className="text-[10px] font-bold text-red-600">{model.year}</span>
                  </div>

                  {/* Image Container */}
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={model.image}
                      alt={model.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  </div>

                  {/* Info Content */}
                  <div className="p-6">
                    <h2 className={`text-xl font-bold uppercase tracking-tight mb-6 group-hover:text-red-600 transition-colors ${orbitron.className}`}>
                      {model.name}
                    </h2>

                    {/* Spec HUD */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 border-t border-white/5 pt-6">
                      <div className="flex items-center gap-2">
                        <Cpu size={12} className="text-gray-600" />
                        <span className="text-[9px] text-gray-400 uppercase tracking-tighter truncate">{model.engine}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap size={12} className="text-gray-600" />
                        <span className="text-[9px] text-gray-400 uppercase tracking-tighter">{model.horsepower || '---'} HP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wind size={12} className="text-gray-600" />
                        <span className="text-[9px] text-gray-400 uppercase tracking-tighter">{model.acceleration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge size={12} className="text-gray-600" />
                        <span className="text-[9px] text-gray-400 uppercase tracking-tighter">{model.topSpeed}</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Detail: Bottom Corner Notch */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-red-600 translate-x-4 translate-y-4 rotate-45 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-white/10">
            <p className="text-gray-500 uppercase tracking-[0.4em] text-xs">Zero results found in this sector</p>
          </div>
        )}
      </div>
    </section>
  );
}