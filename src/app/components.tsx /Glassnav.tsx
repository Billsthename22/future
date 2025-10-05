'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function GlassNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl rounded-2xl backdrop-blur-lg bg-white/10 border border-cyan-500/30 shadow-[0_0_25px_rgba(0,255,255,0.4)] px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="text-cyan-400 font-bold text-xl tracking-widest">FUTURE</div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 text-white font-medium items-center">
        <Link href="/" className="hover:text-cyan-300 transition">Home</Link>
        <Link href="/about" className="hover:text-cyan-300 transition">About</Link>
        <Link href="/inventory" className="hover:text-cyan-300 transition">Inventory</Link>
        <Link href="/Brands" className="hover:text-cyan-300 transition">Brands</Link>
        <Link href="/contact" className="hover:text-cyan-300 transition">Contact</Link>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg flex flex-col items-center gap-6 py-6 md:hidden rounded-b-2xl mt-2 border border-cyan-500/30">
          <Link href="/" className="text-white text-lg font-medium hover:text-cyan-300" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" className="text-white text-lg font-medium hover:text-cyan-300" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/inventory" className="text-white text-lg font-medium hover:text-cyan-300" onClick={() => setIsOpen(false)}>Inventory</Link>
          <Link href="/Brands" className="text-white text-lg font-medium hover:text-cyan-300" onClick={() => setIsOpen(false)}>Brands</Link>
          <Link href="/contact" className="text-white text-lg font-medium hover:text-cyan-300" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}
