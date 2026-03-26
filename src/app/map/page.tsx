"use client";

import dynamic from 'next/dynamic';

// Force client-side only to prevent math mismatches between server and browser
// Remove the space and the .tsx
const TacticalMap = dynamic(() => import('@/app/components/Tacticalmap'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505]">
      <div className="w-16 h-[1px] bg-red-600 animate-pulse mb-4" />
      <p className="font-mono text-[10px] text-red-600 uppercase tracking-[0.5em] animate-pulse">
        Establishing_Satellite_Link...
      </p>
    </div>
  )
});

export default function MapPage() {
  return <TacticalMap />;
}