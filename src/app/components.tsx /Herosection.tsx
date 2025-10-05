'use client';

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Orbitron } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] });

// Smoke particles
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

// Ferrari model
const Ferrari = ({
  carRef,
  onReachedFront,
}: {
  carRef: React.RefObject<THREE.Group | null>;
  onReachedFront: () => void;
}) => {
  const { scene } = useGLTF("/models/ferrari/scene.gltf");
  const startTime = useRef(performance.now());

  useFrame(() => {
    if (carRef.current) {
      const elapsed = (performance.now() - startTime.current) / 1000;
      const progress = Math.min(elapsed / 2, 1);
      carRef.current.position.z = THREE.MathUtils.lerp(5, 0, progress);
      if (progress >= 1) onReachedFront();
    }
  });

  return (
    <primitive
      ref={carRef}
      object={scene}
      scale={window.innerWidth < 768 ? 1 : 1.5} // scale smaller on mobile
      position={[0, -0.5, 5]}
      rotation={[0, Math.PI, 0]}
    />
  );
};

// Headlights
const Headlights = ({ active }: { active: boolean }) =>
  active ? (
    <>
      <pointLight position={[-1.075, 0.337, -2.7]} intensity={5} distance={5} color="white" />
      <mesh position={[-1.075, 0.337, -2.7]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial emissive="white" emissiveIntensity={2} color="white" />
      </mesh>
      <pointLight position={[0.975, 0.189, -2.928]} intensity={5} distance={5} color="white" />
      <mesh position={[0.975, 0.189, -2.928]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial emissive="white" emissiveIntensity={2} color="white" />
      </mesh>
    </>
  ) : null;

// Static camera
const StaticCamera = () => {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0.14, 1.06, -7.08);
    camera.rotation.set(-2.99, 0.02, 3.14);
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
};

// HeroSection
const HeroSection = () => {
  const carRef = useRef<THREE.Group | null>(null);
  const [lightsOn, setLightsOn] = useState(false);

  const handleScrollToCars = () => {
    const section = document.querySelector("#featured");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

      {/* Text overlay */}
      <div className="absolute top-24 text-center z-10 px-4 md:px-0">
        <h1 className={`text-4xl sm:text-5xl md:text-7xl font-extrabold text-white uppercase tracking-wide ${orbitron.className}`}>
          The Future of <span className="text-red-600">Speed</span>
        </h1>
        <p className={`mt-4 text-gray-400 text-xs sm:text-sm md:text-lg max-w-xs sm:max-w-md md:max-w-xl mx-auto ${orbitron.className}`}>
          A revolutionary electric supercar built for performance, elegance, and innovation.
        </p>

        <AnimatePresence>
          {lightsOn && (
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={handleScrollToCars}
              className="mt-8 px-6 sm:px-8 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold tracking-wide transition text-sm sm:text-base"
            >
              Explore Cars
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 3D Scene */}
      <Canvas camera={{ fov: window.innerWidth < 768 ? 45 : 35 }} className="w-full h-full">
        <StaticCamera />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />

        <Suspense fallback={null}>
          <Ferrari carRef={carRef} onReachedFront={() => setLightsOn(true)} />
          {lightsOn && (
            <spotLight position={[0, 10, 10]} angle={0.25} penumbra={0.7} intensity={8} distance={40} castShadow />
          )}
          <Headlights active={lightsOn} />
          <SmokeParticles active={lightsOn} />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default HeroSection;
