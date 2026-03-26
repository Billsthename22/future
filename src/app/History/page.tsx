"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Orbitron } from "next/font/google";
import { History, Activity, Calendar, Shield } from "lucide-react";
import brandsData from "@/app/data/car_brands_history.json";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] });

export default function HistoryPage() {
  return (
    <section className="bg-[#020202] text-white py-32 relative overflow-hidden min-h-screen">
      {/* Background HUD Decor - Unchanged */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(220,38,38,0.08)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header - Unchanged */}
        {/* ... */}

        {/* Brand Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 shadow-2xl">
          {brandsData.map((brand: any, index: number) => {
            const slug = brand.brandName.toLowerCase().replace(/\s+/g, "-");

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/History/${slug}`}
                  className="group relative flex flex-col items-center bg-[#080808] h-80 justify-center overflow-hidden transition-all duration-700 hover:bg-black"
                >
                  {/* BACKGROUND IMAGE LAYER (The "Ghost") */}
                  {brand.heroImage && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 scale-125 group-hover:scale-100">
                      <Image
                        src={brand.heroImage} // Ensure your JSON has this field
                        alt={`${brand.brandName} heritage`}
                        fill
                        className="object-cover grayscale"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                    </div>
                  )}

                  {/* UI DECOR: Top Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-[1px] bg-red-600/30 group-hover:bg-red-600 group-hover:w-full transition-all duration-700" />
                  <div className="absolute top-0 left-0 w-[1px] h-8 bg-red-600/30 group-hover:h-full transition-all duration-700" />

                  {/* INFO TAGS */}
                  <div className="absolute top-6 left-6 flex flex-col gap-1 opacity-40 group-hover:opacity-100 transition-all transform group-hover:translate-x-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-red-600 rounded-full animate-pulse" />
                      <span className="text-[8px] font-bold tracking-[0.3em] text-gray-400 uppercase">
                        ENTRY_{index.toString().padStart(3, '0')}
                      </span>
                    </div>
                    <span className="text-[10px] font-black tracking-tighter text-white">
                      EST.{brand.foundingYear}
                    </span>
                  </div>

                  {/* BRAND LOGO - Floating effect */}
                  <div className="relative z-10 w-28 h-28 mb-4 transition-all duration-700 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_20px_rgba(220,38,38,0.4)] group-hover:-translate-y-2">
                    {brand.logo ? (
                      <Image
                        src={brand.logo}
                        alt={brand.brandName}
                        fill
                        className="object-contain p-4 opacity-50 group-hover:opacity-100 transition-all grayscale group-hover:grayscale-0"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center text-5xl font-black text-white/10 group-hover:text-red-600 ${orbitron.className}`}>
                        {brand.brandName.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* BRAND NAME & CTA */}
                  <div className="relative z-10 text-center px-4">
                    <h2 className={`text-sm font-black tracking-[0.3em] uppercase group-hover:text-white transition-colors ${orbitron.className}`}>
                      {brand.brandName}
                    </h2>
                    <div className="overflow-hidden h-0 group-hover:h-4 transition-all duration-500">
                        <span className="text-[8px] text-red-600 font-bold tracking-[0.4em] uppercase">Initialize Deep Dive</span>
                    </div>
                  </div>

                  {/* SCANLINE EFFECT */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-red-600/[0.03] to-transparent h-1/2 w-full -translate-y-full group-hover:animate-scanline" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Footer CTA - Unchanged */}
        {/* ... */}
      </div>
    </section>
  );
}