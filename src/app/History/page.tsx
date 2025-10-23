"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Orbitron } from "next/font/google";
import brandsData from "@/app/data/car_brands_history.json";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] });

export default function HistoryPage() {
  return (
    <section className="bg-black text-white py-24 relative overflow-hidden">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e1525] via-[#121a2e] to-black opacity-90 z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1
            className={`text-5xl md:text-7xl font-extrabold mb-6 uppercase tracking-widest ${orbitron.className}`}
          >
            Brand <span className="text-red-600">Histories</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Explore the evolution of the world’s most iconic car manufacturers.
            From humble beginnings to automotive legends — every brand has a story.
          </p>
        </motion.div>

        {/* Brand Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8"
        >
          {brandsData.map((brand: any, index: number) => {
            const slug = brand.brandName.toLowerCase().replace(/\s+/g, "-");

            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  href={`/History/${slug}`}
                  className="group relative flex flex-col items-center bg-[#101728]/80 border border-white/10 rounded-2xl overflow-hidden hover:border-red-600/40 transition-all duration-300"
                >
                  {/* Brand Image */}
                  <div className="relative w-full h-40 md:h-48 overflow-hidden">
                    {brand.logo ? (
                      <Image
                        src={brand.logo}
                        alt={brand.brandName}
                        fill
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#1c253d] text-4xl font-bold text-red-600">
                        {brand.brandName.charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Brand Info */}
                  <div className="p-4 text-center">
                    <h2
                      className={`text-lg md:text-xl font-bold mb-1 ${orbitron.className} group-hover:text-red-500 transition`}
                    >
                      {brand.brandName}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Founded {brand.foundingYear}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-24"
        >
          <h3
            className={`text-3xl md:text-4xl font-extrabold mb-4 text-red-600 ${orbitron.className}`}
          >
            Every Brand Has a Legacy
          </h3>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Discover their milestones, innovations, and defining moments that
            shaped the automotive world — one story at a time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
