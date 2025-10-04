'use client';

import { motion } from 'framer-motion';

export default function NewsletterJoin() {
  return (
    <section className="relative py-28 bg-black text-white overflow-hidden">
      {/* Cinematic gradient + glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0b0b0b] to-black opacity-95" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.08),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-2xl mx-auto text-center px-6"
      >
        <h2 className="text-5xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
          Join the Garage
        </h2>

        <p className="text-gray-400 mb-10 text-lg">
          Get exclusive invites, early access, and behind-the-scenes stories from the world of automotive legends.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-4 rounded-full w-full sm:w-2/3 text-gray-100 bg-white/10 border border-white/20 
              focus:outline-none focus:ring-2 focus:ring-yellow-400/60 placeholder-gray-400 transition"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-yellow-400 text-black font-semibold px-8 py-4 rounded-full 
              hover:bg-yellow-300 transition-all duration-300 shadow-[0_0_15px_rgba(250,204,21,0.3)]"
          >
            Join Now
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8"
        >
          <p className="text-sm text-gray-500 italic">Your Garage Pass Awaits 🔑</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
