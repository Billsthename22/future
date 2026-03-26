'use client';

import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment, 
  useGLTF, 
  Center, 
  ContactShadows, 
  Grid 
} from "@react-three/drei";
import { Orbitron } from "next/font/google";
import { motion } from "framer-motion";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

// 1. ADDED: Proper disposal logic to prevent memory leaks on your Mac
function Model() {
  // Use the path to your gltf/glb file
  const { scene } = useGLTF("/models/Mclaren/scene.gltf");

  useEffect(() => {
    return () => {
      // Manually dispose of geometries and materials when component unmounts
      scene.traverse((object: any) => {
        if (object.isMesh) {
          object.geometry.dispose();
          if (object.material.isMaterial) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach((mat: any) => mat.dispose());
          }
        }
      });
    };
  }, [scene]);

  return (
    <Center top>
      <primitive 
        object={scene} 
        scale={1.2} // Adjusted scale - 5.5 is often too large for Stage/Center
        rotation={[0, Math.PI / 4, 0]} 
      />
    </Center>
  );
}

// 2. ADDED: A simple Loading component to prevent white-screens
function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#222" wireframe />
    </mesh>
  );
}

export default function CarExperience() {
  return (
    <section className="relative w-full min-h-screen bg-[#030303] flex flex-col lg:flex-row overflow-hidden">
      
      {/* --- LEFT SIDE: Technical Sidebar --- */}
      <div className="relative w-full lg:w-[35%] p-8 md:p-16 flex flex-col justify-center z-20 border-r border-white/5 bg-[#030303]">
        <div className="mt-24 lg:mt-0" />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-[2px] bg-red-600" />
            <span className={`${orbitron.className} text-red-600 text-[10px] tracking-[0.6em] font-bold uppercase`}>
              Module // 07
            </span>
          </div>

          <h2 className={`${orbitron.className} text-5xl md:text-7xl font-black text-white leading-[0.9] uppercase`}>
            The <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Experience</span>
          </h2>

          <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent my-8" />

          <p className="text-gray-500 text-xs md:text-sm leading-relaxed tracking-widest uppercase font-medium max-w-sm">
            Accessing neural blueprints of the McLaren 720S. Real-time rendering enabled. 
            Drag the viewport to analyze aerodynamic surfaces.
          </p>

          <div className="pt-10">
            <button className={`${orbitron.className} group relative flex items-center gap-6 text-white text-[10px] tracking-[0.4em] uppercase`}>
               <span className="z-10">Initialize Drive</span>
               <div className="w-12 h-[1px] bg-red-600 group-hover:w-24 transition-all duration-500" />
               <div className="absolute -inset-x-4 -inset-y-2 bg-red-600/0 group-hover:bg-red-600/5 transition-colors" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* --- RIGHT SIDE: Large 3D Viewport --- */}
      <div className="relative w-full lg:w-[65%] h-[60vh] lg:h-screen bg-black">
        {/* Subtle Scanline Grid */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

        <Canvas 
          shadows 
          dpr={[1, 1.5]} // Limit pixel ratio to 1.5 for performance on MacBook Air
          gl={{ antialias: true, powerPreference: "high-performance" }}
          camera={{ position: [8, 4, 8], fov: 25 }}
          className="cursor-grab active:cursor-grabbing"
        >
          <Suspense fallback={<Loader />}>
            <Model />
            
            {/* Lighting & Env */}
            <Environment preset="night" />
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} intensity={1.5} castShadow />
            
            <ContactShadows 
              position={[0, -0.01, 0]} 
              opacity={0.75} 
              scale={10} 
              blur={2} 
              far={4} 
            />

            <Grid 
              infiniteGrid 
              fadeDistance={50} 
              fadeStrength={5} 
              cellSize={0.6} 
              sectionSize={3} 
              sectionColor="#333" 
              cellColor="#111" 
            />

            <OrbitControls
              enableZoom={true}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2.1} 
              minDistance={5}
              maxDistance={15}
            />
          </Suspense>
        </Canvas>

        {/* HUD UI Elements */}
        <div className="absolute top-10 right-10 z-20 flex flex-col items-end gap-1">
            <div className="w-2 h-2 bg-red-600 animate-ping rounded-full" />
            <span className={`${orbitron.className} text-[8px] text-red-600 font-bold uppercase tracking-widest`}>Live_Feed</span>
        </div>
      </div>
    </section>
  );
}

// 3. Preload the model to speed up navigation
useGLTF.preload("/models/Mclaren/scene.gltf");
