'use client';

import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative bg-black text-gray-400 overflow-hidden py-20 border-t border-white/10">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-[#0b0b0b] to-transparent opacity-95" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,rgba(250,204,21,0.1),transparent_70%)]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center md:text-left"
      >
        {/* About Section */}
        <div>
          <h3 className="text-yellow-400 text-lg font-semibold mb-3">About</h3>
          <p className="text-gray-400 leading-relaxed">
            Where legends live — a tribute to the art of speed, precision, and timeless design.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-yellow-400 text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#featured" className="hover:text-yellow-300 transition-colors">
                Cars
              </a>
            </li>
            <li>
              <a href="#history" className="hover:text-yellow-300 transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#join" className="hover:text-yellow-300 transition-colors">
                Community
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-yellow-400 text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-6 text-2xl">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="hover:text-yellow-400 transition-colors"
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="hover:text-yellow-400 transition-colors"
            >
              <FaTwitter />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="hover:text-yellow-400 transition-colors"
            >
              <FaYoutube />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Divider line */}
      <div className="relative z-10 mt-14 border-t border-white/10" />

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="relative z-10 text-center text-gray-500 mt-8 text-sm tracking-wide"
      >
        © {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">Legends Garage</span>. All rights reserved.
      </motion.div>
    </footer>
  );
}
