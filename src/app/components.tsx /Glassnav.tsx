'use client';

import Link from 'next/link';

export default function GlassNav() {
  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl 
      rounded-2xl backdrop-blur-lg bg-white/10 border border-cyan-500/30 
      shadow-[0_0_25px_rgba(0,255,255,0.4)] px-6 py-3 flex justify-between items-center"
    >
      {/* Logo */}
      <div className="text-cyan-400 font-bold text-xl tracking-widest">
        FUTURE
      </div>

      {/* Links */}
      <div className="flex gap-8 text-white font-medium">
        <Link href="/" className="hover:text-cyan-300 transition">
          Home
        </Link>
        <Link href="/about" className="hover:text-cyan-300 transition">
          About
        </Link>
        <Link href="/inventory" className="hover:text-cyan-300 transition">
          Inventory
        </Link>
        <Link href="/contact" className="hover:text-cyan-300 transition">
          Contact
        </Link>
      </div>
    </nav>
  );
}
