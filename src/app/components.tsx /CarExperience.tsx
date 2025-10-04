'use client';

import { Orbitron } from "next/font/google";
import { motion } from "framer-motion";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] });

export default function CarExperience() {
  return (
    <section className="relative bg-black text-white py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.2),transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-6xl font-extrabold mb-6 tracking-wider uppercase ${orbitron.className}`}
        >
          The <span className="text-red-600">Car Experience</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className={`text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed ${orbitron.className}`}
        >
          Interact with lifelike 3D models of our next-generation supercars. Rotate, explore, and feel the adrenaline — all from your screen.
        </motion.p>

        {/* Placeholder for 3D viewer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative w-full h-96 bg-gradient-to-b from-gray-900 to-black rounded-3xl border border-red-800/30 flex items-center justify-center shadow-[0_0_30px_rgba(255,0,0,0.3)]"
        >
          <p className="text-gray-500 text-sm md:text-base tracking-widest uppercase">
            [ 3D / 360° Car Model Viewer Coming Soon ]
          </p>
        </motion.div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,0,0,0.5)" }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`mt-10 bg-red-600 text-white px-10 py-3 rounded-full font-semibold tracking-wider uppercase ${orbitron.className}`}
        >
          Step Inside
        </motion.button>
      </div>
    </section>
  );
}
