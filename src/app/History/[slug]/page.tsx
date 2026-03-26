"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import brandsData from "@/app/data/car_brands_history.json";
import { Orbitron } from "next/font/google";
import { ChevronLeft, Landmark, Milestone, ShieldAlert } from "lucide-react";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] });

type Brand = {
  brandName: string;
  foundingYear: number;
  heroImage?: string;
  historyTimeline: {
    period: string;
    majorEvents: string[];
  }[];
};

export default function BrandHistoryPage() {
  const { slug } = useParams();
  const brandSlug = Array.isArray(slug) ? slug[0] : slug;

  const brand = (brandsData as Brand[]).find(
    (b) => b.brandName.toLowerCase().replace(/\s+/g, "-") === brandSlug
  );

  if (!brand) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020202] text-white p-6">
        <ShieldAlert size={48} className="text-red-600 mb-6 animate-pulse" />
        <h1 className={`text-4xl font-black mb-4 ${orbitron.className}`}>ENTRY_NOT_FOUND</h1>
        <Link href="/History" className="text-xs tracking-[0.4em] text-gray-500 hover:text-red-600 border border-white/10 px-6 py-2 transition-all">
          RETURN_TO_DATABASE
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-[#020202] text-white min-h-screen relative overflow-hidden pb-32">
      {/* Background Grid HUD */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0" 
             style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '100px 100px' }} />
      </div>

      {/* Hero Header Area */}
      <div className="relative w-full h-[70vh] flex items-end">
        <Image
          src={brand.heroImage || "/default-brand.jpg"}
          alt={brand.brandName}
          fill
          priority
          className="object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-[2000ms]"
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-transparent to-transparent" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Landmark size={18} className="text-red-600" />
              <span className={`text-red-600 text-sm font-bold tracking-[0.5em] uppercase ${orbitron.className}`}>
                Legacy_Archive
              </span>
            </div>
            <h1 className={`text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-4 ${orbitron.className}`}>
              {brand.brandName}<span className="text-red-600">.</span>
            </h1>
            <div className="flex items-center gap-4 text-gray-500 text-xs tracking-[0.4em] uppercase font-bold">
              <span>Established</span>
              <span className="w-12 h-[1px] bg-red-600" />
              <span className="text-white">{brand.foundingYear}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Chronological Data Link (Timeline) */}
      <div className="relative max-w-6xl mx-auto px-6 pt-10">
        {/* The "Data-Link" Center Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 transform -translate-x-1/2">
           <div className="sticky top-0 h-20 w-full bg-gradient-to-b from-red-600 to-transparent shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
        </div>

        <div className="space-y-32">
          {brand.historyTimeline.map((period, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Content Box */}
                <div className={`w-full md:w-[45%] ${isLeft ? "md:text-right" : "md:text-left"}`}>
                  <div className={`mb-4 flex items-center gap-4 ${isLeft ? "flex-row-reverse" : "flex-row"}`}>
                    <Milestone size={16} className="text-red-600" />
                    <span className={`text-lg font-black tracking-widest text-white ${orbitron.className}`}>
                      {period.period}
                    </span>
                  </div>
                  
                  <div className="group relative bg-white/[0.02] border border-white/5 p-8 hover:border-red-600/30 transition-all duration-500">
                    {/* Corner Accent */}
                    <div className={`absolute top-0 ${isLeft ? "right-0" : "left-0"} w-1 h-0 bg-red-600 group-hover:h-full transition-all duration-500`} />
                    
                    <ul className="space-y-4">
                      {period.majorEvents.map((event, i) => (
                        <li key={i} className={`flex items-start gap-4 text-sm leading-relaxed text-gray-400 group-hover:text-gray-200 transition-colors ${isLeft ? "flex-row-reverse" : "flex-row"}`}>
                          <div className="w-1.5 h-1.5 rounded-full bg-red-600/40 mt-1.5 shrink-0" />
                          <p>{event}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Central HUD Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                   <div className="w-4 h-4 bg-black border-2 border-red-600 rotate-45 z-10 shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                   <div className={`hidden md:block absolute top-1/2 w-8 h-[1px] bg-red-600/30 ${isLeft ? "right-4" : "left-4"}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Termination Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-col items-center mt-40 border-t border-white/5 pt-20"
        >
          <Link
            href="/History"
            className={`group flex items-center gap-4 text-[10px] font-bold tracking-[0.5em] uppercase text-gray-500 hover:text-red-600 transition-all ${orbitron.className}`}
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
            End_Chronology // Return to History Registry
          </Link>
        </motion.div>
      </div>
    </section>
  );
}