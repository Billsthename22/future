'use client';

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Orbitron } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] });

// --- 3D HELPER COMPONENTS ---

const SmokeParticles = ({ active }: { active: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!active || !groupRef.current) return;
    groupRef.current.children.forEach((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;

        mesh.position.y += 0.01 + Math.random() * 0.005;
        mesh.position.x += (Math.random() - 0.5) * 0.002;
        mesh.position.z += (Math.random() - 0.5) * 0.002;

        material.opacity -= 0.001;
        if (material.opacity <= 0) {
          mesh.position.set((Math.random() - 0.5) * 10, -2, (Math.random() - 0.5) * 10);
          material.opacity = 0.3 + Math.random() * 0.2;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 100 }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 10, -2, (Math.random() - 0.5) * 10]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshStandardMaterial color="white" transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
};

const Ferrari = ({ carRef, onReachedFront }: { 
  carRef: React.RefObject<THREE.Group | null>; 
  onReachedFront: () => void; 
}) => {
  const { scene } = useGLTF("/models/ferrari/scene.gltf");
  const startTime = useRef(performance.now());
  const hasTriggered = useRef(false);

  useFrame(() => {
    if (carRef.current) {
      const elapsed = (performance.now() - startTime.current) / 1000;
      const progress = Math.min(elapsed / 2.5, 1); 
      // Lerp from background (8) to foreground (0)
      carRef.current.position.z = THREE.MathUtils.lerp(8, 0, progress);

      if (progress >= 1 && !hasTriggered.current) {
        hasTriggered.current = true;
        onReachedFront();
      }
    }
  });

  return (
    <primitive
      ref={carRef}
      object={scene}
      scale={1.5}
      position={[0, -0.5, 8]}
      rotation={[0, Math.PI, 0]}
    />
  );
};

const Headlights = ({ active }: { active: boolean }) =>
  active ? (
    <>
      <pointLight position={[-1.075, 0.337, -2.7]} intensity={5} distance={5} color="white" />
      <mesh position={[-1.075, 0.337, -2.7]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial emissive="white" emissiveIntensity={5} color="white" />
      </mesh>
      <pointLight position={[0.975, 0.189, -2.928]} intensity={5} distance={5} color="white" />
      <mesh position={[0.975, 0.189, -2.928]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial emissive="white" emissiveIntensity={5} color="white" />
      </mesh>
    </>
  ) : null;

const StaticCamera = () => {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0.14, 1.06, -7.08);
    camera.rotation.set(-2.99, 0.02, 3.14);
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
};

// --- MAIN HERO COMPONENT ---

const HeroSection = () => {
  const carRef = useRef<THREE.Group | null>(null);
  const [lightsOn, setLightsOn] = useState(false);

  const handleScrollToCars = () => {
    const section = document.querySelector("#featured");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full bg-[#050505] overflow-hidden">
      {/* Background Vignette Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_95%)] z-[5] pointer-events-none" />

      {/* --- UI OVERLAY --- */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 pointer-events-none">
        
        {/* TOP ROW: Clears the Navbar with mt-32/mt-44 */}
        <div className="flex justify-between items-start w-full mt-32 md:mt-44 pointer-events-auto">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-col"
          >
            <span className={`text-red-600 text-[10px] tracking-[0.4em] font-bold uppercase mb-2 ${orbitron.className}`}>
              Archive // Model 001
            </span>
            <h1 className={`text-4xl md:text-8xl font-black text-white uppercase leading-none tracking-tighter ${orbitron.className}`}>
              F8 <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>TRIBUTO</span>
            </h1>
          </motion.div>

          <div className={`hidden md:block text-right text-[10px] text-gray-500 tracking-[0.3em] uppercase pt-4 ${orbitron.className}`}>
            <p>LAT: 44.5323° N</p>
            <p>LONG: 10.8640° E</p>
            <p className="text-red-600 mt-2 font-bold opacity-90">Maranello, Italy</p>
            <div className="w-24 h-[1px] bg-red-600 ml-auto mt-4" />
          </div>
        </div>

        {/* CENTER-LEFT CONTENT: Showroom Trigger */}
        <div className="max-w-md pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className={`text-gray-400 text-xs md:text-sm leading-relaxed mb-8 border-l border-red-600 pl-6 ${orbitron.className}`}>
              Capturing the raw power and evolution of the world’s fastest rides. 
              The ultimate expression of the classic two-seater berlinetta.
            </p>

            <AnimatePresence>
              {lightsOn && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <button
                    onClick={handleScrollToCars}
                    className="group flex items-center gap-4 bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 px-8 py-4 transition-all duration-500"
                  >
                    <span className={`text-white text-[10px] font-bold uppercase tracking-[0.4em] ${orbitron.className}`}>
                      Enter Showroom
                    </span>
                    <div className="w-8 h-[1px] bg-white group-hover:w-16 transition-all duration-500" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* BOTTOM HUD: Status Bar */}
        <div className="flex justify-between items-end w-full pointer-events-auto">
          <div className={`text-[9px] text-gray-500 space-y-2 uppercase ${orbitron.className}`}>
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${lightsOn ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-yellow-500 animate-pulse shadow-[0_0_10px_#eab308]'}`} />
              <span className="font-bold tracking-widest text-gray-300">
                Status: {lightsOn ? 'System Ready' : 'Acquiring Target...'}
              </span>
            </div>
            <p className="opacity-60 pl-5">Engine: 3.9 L V8 Twin-Turbo // 710 HP</p>
          </div>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center gap-6">
             <div className="w-[1px] h-20 bg-gradient-to-t from-red-600 to-transparent" />
             <span className={`rotate-90 origin-left text-[9px] text-gray-500 tracking-[0.6em] uppercase pb-12 ${orbitron.className}`}>
               Scroll
             </span>
          </div>
        </div>
      </div>

      {/* --- 3D SCENE LAYER --- */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ fov: 35 }}>
          <StaticCamera />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />
          
          <Suspense fallback={null}>
            <Ferrari carRef={carRef} onReachedFront={() => setLightsOn(true)} />
            
            {/* Spotlight activation on arrival */}
            {lightsOn && (
              <spotLight
                position={[0, 10, -2]}
                angle={0.5}
                penumbra={1}
                intensity={15}
                color="white"
                castShadow
              />
            )}
            
            <Headlights active={lightsOn} />
            <SmokeParticles active={lightsOn} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default HeroSection;