'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Shield, Activity } from 'lucide-react';
import { Orbitron } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] });

export default function TechNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/About' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Brands', href: '/Brands' },
    { name: 'History', href: '/History' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] p-4 md:p-8 pointer-events-none">
      <div className="max-w-[1800px] mx-auto flex justify-between items-start">
        
        {/* LEFT DOCK: Logo & Status */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="pointer-events-auto bg-black/80 backdrop-blur-xl border-l-2 border-red-600 p-4 md:p-6 shadow-2xl"
        >
          <Link href="/" className="group">
            <div className="flex items-center gap-3 mb-2">
              <Shield size={16} className="text-red-600" />
              <span className={`${orbitron.className} text-white font-black text-sm md:text-xl tracking-tighter uppercase leading-none`}>
                AUTO<span className="text-red-600 italic">ARCHIVE</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[8px] uppercase tracking-[0.3em] text-gray-500 font-bold">Terminal_Secure // v.3.0</span>
            </div>
          </Link>
        </motion.div>

        {/* RIGHT DOCK: Navigation links in a vertical or horizontal strip */}
        <div className="flex flex-col items-end gap-4">
          {/* Desktop Links Container */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="pointer-events-auto hidden lg:flex items-center bg-black/60 backdrop-blur-md border border-white/5 rounded-sm p-2"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`${orbitron.className} px-4 py-2 text-[9px] uppercase tracking-[0.3em] text-gray-500 hover:text-white hover:bg-white/5 transition-all duration-300 relative overflow-hidden`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>

          {/* System Stats Dock (Visual Eye Candy) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden md:flex gap-4 pointer-events-auto"
          >
            <div className="bg-black/40 backdrop-blur-sm border border-white/5 px-3 py-1 flex items-center gap-2">
              <Activity size={10} className="text-red-600" />
              <span className="text-[7px] text-gray-500 font-bold tracking-widest uppercase">Engine_Ready</span>
            </div>
            <div className="bg-black/40 backdrop-blur-sm border border-white/5 px-3 py-1 text-[7px] text-gray-500 font-bold tracking-widest uppercase">
              LAT: 44.53 / LONG: 10.86
            </div>
          </motion.div>

          {/* Mobile Toggle Dock */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="pointer-events-auto lg:hidden bg-red-600 text-white p-4 shadow-xl hover:bg-red-700 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-[110] pointer-events-auto flex flex-col items-center justify-center p-12"
          >
            <div className="absolute top-8 right-8">
               <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-600 transition-colors">
                 <X size={40} />
               </button>
            </div>
            
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className={`${orbitron.className} text-4xl md:text-6xl font-black uppercase tracking-tighter text-white hover:text-red-600 transition-colors`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-20 border-t border-white/10 pt-10 w-full max-w-md text-center">
               <p className="text-red-600 text-[10px] tracking-[1em] uppercase font-bold">Auto Archive 2026</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}