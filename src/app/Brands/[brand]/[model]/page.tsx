'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Orbitron } from 'next/font/google';
import carsDataRaw from '@/app/data/groupedcars_extended.json';
import {
  Gauge,
  CarFront,
  Fuel,
  Cog,
  Zap,
  Timer,
  MapPin,
  Users,
  DollarSign,
  Weight,
  ChevronLeft,
  ShieldCheck,
  Globe
} from "lucide-react";

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
  fuelType?: string;
  driveType?: string;
  bodyType?: string;
  country?: string;
  seats?: number;
  price?: string;
  weight?: string;
};

const carsData = carsDataRaw as Record<string, Car[]>;

export default function ModelDetails() {
  const params = useParams() as { brand?: string; model?: string };
  const brandParam = params?.brand;
  const modelParam = params?.model;

  if (!brandParam || !modelParam) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-red-600">Initializing Core...</div>;
  }

  const normalize = (str: string) => str.toLowerCase().replace(/[\s-]/g, '');
  const brandKey = Object.keys(carsData).find((key) => normalize(key) === normalize(brandParam)) || '';
  const model = brandKey ? carsData[brandKey].find((m) => normalize(m.name) === normalize(modelParam)) : null;

  if (!brandKey || !model) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className={`text-4xl font-black text-red-600 mb-4 ${orbitron.className}`}>DATA_LOSS_ERROR</h2>
        <p className="text-gray-500 uppercase tracking-widest text-xs mb-8">The requested asset could not be retrieved from the archive.</p>
        <Link href="/Brands" className="px-6 py-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all text-xs font-bold uppercase">Return to Registry</Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#020202] text-white pt-24 pb-20 px-4 sm:px-10 overflow-hidden">
      {/* Background HUD Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_100%_0%,_#dc2626_0%,_transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Navigation Breadcrumbs */}
        <div className={`flex gap-6 mb-12 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500 ${orbitron.className}`}>
          <Link href="/Brands" className="hover:text-red-600 transition-colors">Registry</Link>
          <span className="text-gray-800">/</span>
          <Link href={`/Brands/${brandKey.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-red-600 transition-colors">{brandKey}</Link>
          <span className="text-gray-800">/</span>
          <span className="text-white">{model.name}</span>
        </div>

        {/* Hero Header */}
        <div className="mb-12 border-l-4 border-red-600 pl-6 md:pl-10">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-red-600 text-sm font-bold tracking-[0.4em] uppercase mb-2 ${orbitron.className}`}
          >
            {model.year} // Performance Model
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl sm:text-7xl font-black uppercase tracking-tighter leading-none ${orbitron.className}`}
          >
            {model.name}
          </motion.h1>
        </div>

        {/* Cinematic Asset Display */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group w-full aspect-video md:h-[500px] mb-16 rounded-sm overflow-hidden border border-white/10 shadow-2xl"
        >
          <Image
            src={model.image}
            alt={model.name}
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            priority
          />
          {/* Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
             <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Top Speed</span>
                  <span className={`text-2xl font-black ${orbitron.className}`}>{model.topSpeed}</span>
                </div>
                <div className="w-[1px] h-10 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">0-100 KM/H</span>
                  <span className={`text-2xl font-black ${orbitron.className}`}>{model.acceleration}</span>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Technical Data Sheets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Primary Specs */}
          <div className="lg:col-span-2">
            <h3 className={`text-xs font-bold text-red-600 tracking-[0.5em] uppercase mb-8 flex items-center gap-3 ${orbitron.className}`}>
              <ShieldCheck size={16} /> Engineering_Report
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
              <SpecItem icon={<Cog />} label="Engine Configuration" value={model.engine} />
              <SpecItem icon={<Zap />} label="Output Power" value={`${model.horsepower} HP`} hide={!model.horsepower} />
              <SpecItem icon={<Timer />} label="Transmission" value={model.transmission} hide={!model.transmission} />
              <SpecItem icon={<Fuel />} label="Fuel System" value={model.fuelType} hide={!model.fuelType} />
              <SpecItem icon={<CarFront />} label="Drivetrain" value={model.driveType} hide={!model.driveType} />
              <SpecItem icon={<Weight />} label="Curb Weight" value={model.weight} hide={!model.weight} />
            </div>
          </div>

          {/* Logistics / Info */}
          <div className="bg-white/[0.02] border border-white/5 p-8">
            <h3 className={`text-xs font-bold text-red-600 tracking-[0.5em] uppercase mb-8 ${orbitron.className}`}>
              Logistics
            </h3>
            <div className="space-y-6">
              <LogItem icon={<Globe />} label="Country of Origin" value={model.country} />
              <LogItem icon={<Users />} label="Seat Capacity" value={model.seats} />
              <LogItem icon={<CarFront />} label="Body Classification" value={model.bodyType} />
              <div className="pt-6 mt-6 border-t border-white/5">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Market Valuation</p>
                <p className={`text-3xl font-black text-white ${orbitron.className}`}>{model.price || "P.O.R."}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Back Actions */}
        <div className="mt-20 flex justify-center border-t border-white/10 pt-10">
          <Link
            href={`/Brands/${brandKey.toLowerCase().replace(/\s+/g, '-')}`}
            className={`group flex items-center gap-4 text-[10px] font-bold tracking-[0.4em] uppercase text-gray-500 hover:text-red-600 transition-all ${orbitron.className}`}
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
            Terminate Session // Return to {brandKey} Registry
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Sub-components for clean architecture */
function SpecItem({ icon, label, value, hide }: { icon: any, label: string, value?: string | number, hide?: boolean }) {
  if (hide || !value) return null;
  return (
    <div className="bg-[#080808] p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3 text-red-600">
        {icon}
        <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">{label}</span>
      </div>
      <span className="text-sm font-bold text-white uppercase tracking-wider">{value}</span>
    </div>
  );
}

function LogItem({ icon, label, value }: { icon: any, label: string, value?: string | number }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-3">
        <span className="text-gray-600 group-hover:text-red-600 transition-colors">{icon}</span>
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{label}</span>
      </div>
      <span className="text-[11px] font-bold text-white uppercase">{value}</span>
    </div>
  );
}