'use client';

import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'] });

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] text-gray-500 overflow-hidden py-20 border-t border-white/5">
      {/* Background HUD Detail */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Identity */}
          <div className="col-span-1 md:col-span-1">
            <h3 className={`${orbitron.className} text-white text-sm font-black tracking-[0.3em] mb-6 uppercase`}>
              Auto <span className="text-red-600">Archive</span>
            </h3>
            <p className={`${orbitron.className} text-[10px] leading-relaxed uppercase tracking-widest opacity-60`}>
              The digital repository for automotive excellence. Engineering. Design. Legacy. 
              <br /><br />
              Established // 2024
            </p>
          </div>

          {/* Directory */}
          <div>
            <h4 className={`${orbitron.className} text-[10px] text-red-600 font-bold mb-6 uppercase tracking-[0.2em]`}>
              Directory
            </h4>
            <ul className={`${orbitron.className} space-y-3 text-[10px] uppercase tracking-[0.15em]`}>
              <li><a href="/" className="hover:text-white transition-colors">Navigation / Home</a></li>
              <li><a href="/inventory" className="hover:text-white transition-colors">Asset / Inventory</a></li>
              <li><a href="/history" className="hover:text-white transition-colors">Data / History</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Terminal / Contact</a></li>
            </ul>
          </div>

          {/* Legal / Security */}
          <div>
            <h4 className={`${orbitron.className} text-[10px] text-red-600 font-bold mb-6 uppercase tracking-[0.2em]`}>
              Security
            </h4>
            <ul className={`${orbitron.className} space-y-3 text-[10px] uppercase tracking-[0.15em]`}>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Protocol</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Usage Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Social Connectivity */}
          <div>
            <h4 className={`${orbitron.className} text-[10px] text-red-600 font-bold mb-6 uppercase tracking-[0.2em]`}>
              Connectivity
            </h4>
            <div className="flex gap-6 text-lg">
              <motion.a whileHover={{ y: -3, color: '#dc2626' }} href="#" className="transition-colors"><FaInstagram /></motion.a>
              <motion.a whileHover={{ y: -3, color: '#dc2626' }} href="#" className="transition-colors"><FaTwitter /></motion.a>
              <motion.a whileHover={{ y: -3, color: '#dc2626' }} href="#" className="transition-colors"><FaYoutube /></motion.a>
            </div>
          </div>
        </div>

        {/* System Status Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className={`${orbitron.className} text-[9px] tracking-[0.3em] uppercase flex items-center gap-3`}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Archive Status: Online // Port 8080
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`${orbitron.className} text-[9px] text-gray-700 tracking-[0.3em] uppercase`}
          >
            © {new Date().getFullYear()} Auto Archive Terminal. All rights reserved.
          </motion.div>

          <div className={`${orbitron.className} text-[9px] tracking-[0.3em] uppercase text-gray-600`}>
            Lat: 44.5323° N // Long: 10.8640° E
          </div>
        </div>
      </div>
    </footer>
  );
}