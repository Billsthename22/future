"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import brandsData from "@/app/data/car_brands_history.json";
import { Orbitron } from "next/font/google";

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold text-red-600">Brand Not Found</h1>
        <Link href="/history" className="mt-6 text-gray-300 hover:text-white underline">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-[#0e1525] text-white min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <Image
          src={brand.heroImage || "/default-brand.jpg"}
          alt={brand.brandName}
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-[#0e1525]/90"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-6xl md:text-7xl font-extrabold mb-4 uppercase tracking-widest ${orbitron.className}`}
          >
            {brand.brandName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300"
          >
            Founded in {brand.foundingYear}
          </motion.p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative max-w-6xl mx-auto px-6 py-24">
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-600/70 via-red-500/30 to-transparent transform -translate-x-1/2"></div>

        <div className="space-y-24">
          {brand.historyTimeline.map((period, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
              >
                <div
                  className={`md:w-1/2 ${
                    isLeft ? "md:pr-12 text-right" : "md:pl-12 text-left"
                  }`}
                >
                  <div
                    className={`inline-block mb-3 text-red-500 font-bold ${orbitron.className}`}
                  >
                    {period.period}
                  </div>
                  <div className="bg-[#141b2e]/70 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-xl hover:border-red-600/50 transition-all">
                    <ul className="space-y-3 text-gray-300">
                      {period.majorEvents.map((event, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-500 mt-1.5">•</span>
                          <p>{event}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-600 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.6)]"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-32"
        >
          <Link
            href="/history"
            className="inline-block text-red-500 hover:text-white border border-red-600 px-8 py-3 rounded-xl transition-all duration-300 hover:bg-red-600"
          >
            ← Back to All Brands
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
