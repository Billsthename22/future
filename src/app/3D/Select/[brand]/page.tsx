"use client";

import { useRef, Suspense, use, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Orbitron } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

interface ActiveCar {
  id: string;
  brandId: string;
  name: string;
  year: string;
  hp: number;
  topSpeed?: number; 
  torque?: number;
  weight?: number;
}

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });

const displayCars: ActiveCar[] = [ 
  {id: "1991acuransxtwinturbo", brandId: "acura", name: "Acura NSX Twin Turbo", year: "1991", hp: 471 }, 
  {id: "1997acuransx", brandId: "acura", name: "Acura NSX", year: "1997", hp: 290 }, 
  {id: "acuraarx", brandId: "acura", name: "Acura ARX-06", year: "2023", hp: 670 },
  {id: "2017acuransx", brandId: "acura", name: "Acura NSX (NC1)", year: "2017", hp: 573 }, 
  {id: "2020acuransx", brandId: "acura", name: "Acura NSX (Gen 2)", year: "2020", hp: 573 }, 
  {id: "2022acuransxtypes", brandId: "acura", name: "Acura NSX Type S", year: "2022", hp: 600 },
  {id: "2019aimgaingtnc1acuransxcarbon", brandId: "acura", name: "AIMGAIN GT Acura NSX", year: "2019", hp: 573},
  {id: "2018acuransxgt3", brandId: "acura", name: "Acura NSX GT3", year: "2018", hp: 500},
  {id: "2008acura15lowesfernandezarx01b", brandId: "acura", name: "Acura ARX-01b", year: "2008", hp: 600},
];

const CornerAccent = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 border-red-600/80 ${className}`} />
);

function HologramLoader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#dc2626" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

function Car({ brand, modelId }: { brand: string; modelId: string }) {
  const { scene } = useGLTF(`/models/${brand}/${modelId}/scene.gltf`);
  return <primitive object={scene} scale={1.5} />;
}

export default function ShowroomPage({ params }: { params: Promise<{ brand: string }> }) {
  const resolvedParams = use(params);
  const brand = resolvedParams.brand;
  
  const cars = useMemo(() => 
    displayCars.filter((car) => car.brandId.toLowerCase() === brand.toLowerCase()),
    [brand]
  );
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const safeCars = cars.length > 0 ? cars : displayCars;
  const activeCar = safeCars[Math.abs(currentIndex) % safeCars.length];

  const nextCar = () => setCurrentIndex((prev) => prev + 1);
  const prevCar = () => setCurrentIndex((prev) => prev - 1);

  const maxHp = Math.max(...safeCars.map(c => c.hp), 700);

  return (
    <div className="relative h-screen w-full bg-[#020202] text-white overflow-hidden font-mono selection:bg-red-600/30">
      
      {/* 1. TEXTURE & OVERLAYS */}
      <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,#ff0000_0%,transparent_75%)]" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* 2. SCAN LINE */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-20">
        <motion.div 
          initial={{ translateY: "-100%" }}
          animate={{ translateY: "100%" }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-full h-[1px] bg-red-500 shadow-[0_0_15px_#ff0000]"
        />
      </div>

      {/* 3. 3D SHOWROOM */}
      <div className="absolute inset-0 z-10">
        <Canvas shadows camera={{ position: [0, 2, 12], fov: 35 }}>
          <Suspense fallback={<HologramLoader />} key={activeCar.id}>
            {/* Removed environment="night" from Stage to prevent remote CDN dependency crash */}
            <Stage intensity={0.5} contactShadow={{ opacity: 0.8, blur: 3 }}>
              <Car brand={brand} modelId={activeCar.id} />
            </Stage>
            {/* Explicitly declaring Environment via preset relies on safer fetch logic */}
            <Environment preset="night" />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2.1} 
          />
        </Canvas>
      </div>

      {/* 4. THE HUD */}
      <div className="relative z-30 p-8 md:p-12 h-full flex flex-col justify-between pointer-events-none">
        
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-12 h-[1px] bg-red-600 shadow-[0_0_8px_#ff0000]" />
              <p className="text-red-500 text-[10px] font-black tracking-[0.4em] drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">
                TERMINAL_LINK: ACTIVE
              </p>
            </div>
            <h1 className={`${orbitron.className} text-6xl md:text-[10rem] font-black uppercase italic tracking-tighter leading-[0.8] text-transparent stroke-text drop-shadow-2xl`}>
              {brand}
            </h1>
            <style jsx>{`
              .stroke-text {
                -webkit-text-stroke: 1.5px rgba(255,255,255,0.15);
                background: linear-gradient(to bottom, #fff 0%, #444 100%);
                -webkit-background-clip: text;
                text-shadow: 2px 2px 0px rgba(255,0,0,0.1), -2px -2px 0px rgba(0,0,255,0.1);
              }
            `}</style>
          </motion.div>

          <div className="text-right flex flex-col items-end gap-2">
            <div className="px-4 py-2 border border-white/5 backdrop-blur-xl bg-white/[0.02] shadow-2xl relative group">
               <div className="absolute top-0 right-0 w-1 h-1 bg-red-600" />
               <p className="text-[9px] text-white/40 uppercase tracking-tighter font-bold">Node_Status</p>
               <p className="text-xs font-black uppercase tracking-widest text-white italic">LEKKI_HQ // {activeCar.id.slice(0,6)}</p>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-between px-8 pointer-events-none">
          <button 
            onClick={prevCar} 
            className="pointer-events-auto group p-7 border border-white/5 bg-white/[0.01] backdrop-blur-sm hover:border-red-600/50 hover:bg-red-600/5 transition-all duration-500 relative"
          >
            <div className="w-6 h-6 flex items-center justify-center text-white/40 group-hover:text-red-500 transition-colors group-hover:-translate-x-1 transition-transform font-bold italic">PREV</div>
            <div className="absolute top-0 left-0 w-[1px] h-0 group-hover:h-full bg-red-600 transition-all duration-500" />
          </button>
          <button 
            onClick={nextCar} 
            className="pointer-events-auto group p-7 border border-white/5 bg-white/[0.01] backdrop-blur-sm hover:border-red-600/50 hover:bg-red-600/5 transition-all duration-500 relative"
          >
            <div className="w-6 h-6 flex items-center justify-center text-white/40 group-hover:text-red-500 transition-colors group-hover:translate-x-1 transition-transform font-bold italic">NEXT</div>
            <div className="absolute top-0 right-0 w-[1px] h-0 group-hover:h-full bg-red-600 transition-all duration-500" />
          </button>
        </div>

        {/* SPEC CARD */}
        <div className="pointer-events-auto w-full max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCar.id}
              initial={{ opacity: 0, x: -20, skewX: -2 }}
              animate={{ opacity: 1, x: 0, skewX: 0 }}
              exit={{ opacity: 0, x: 20, skewX: 2 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative p-10 backdrop-blur-[30px] bg-black/40 border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <CornerAccent className="top-0 left-0 border-t border-l" />
              <CornerAccent className="bottom-0 right-0 border-b border-r" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
                <div className="space-y-1">
                  <p className="text-[10px] text-red-500 font-black tracking-widest uppercase italic mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600" /> 01 // IDENTITY
                  </p>
                  <p className={`${orbitron.className} text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-none`}>{activeCar.name}</p>
                </div>

                <div className="md:px-12 md:border-x border-white/10 space-y-1">
                  <p className="text-[10px] text-red-500 font-black tracking-widest uppercase italic mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600 opacity-50" /> 02 // PERFORMANCE
                  </p>
                  <div className="flex items-baseline gap-3">
                    <p className="text-5xl font-black italic tracking-tighter leading-none">{activeCar.hp}</p>
                    <span className="text-[11px] text-white/30 font-black tracking-widest">BHP</span>
                  </div>
                  <div className="w-full h-[3px] bg-white/5 mt-4 overflow-hidden rounded-full">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${(activeCar.hp / maxHp) * 100}%` }} 
                      transition={{ duration: 1, ease: "circOut" }}
                      className="h-full bg-gradient-to-r from-red-900 to-red-600 shadow-[0_0_10px_#ff0000]" 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] text-red-500 font-black tracking-widest uppercase italic mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600" /> 03 // VINTAGE
                  </p>
                  <p className="text-5xl font-black italic tracking-tighter leading-none">{activeCar.year}</p>
                </div>
              </div>

              <div className="absolute bottom-0 right-4 text-[120px] font-black text-white/[0.02] pointer-events-none select-none italic tracking-tighter leading-none h-24 overflow-hidden">
                {activeCar.year}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}