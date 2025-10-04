"use client";

import React, { Suspense, useRef, useState, useEffect, forwardRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { Orbitron } from "next/font/google";
import { motion } from "framer-motion";
import * as THREE from "three";
import { OrbitControls as ThreeOrbitControls } from "three-stdlib";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] });

// ✅ McLaren Model with forwardRef and dynamic scaling
interface McLarenModelProps {
  targetSize: number;
}

const McLarenModel = forwardRef<THREE.Group, McLarenModelProps>(({ targetSize }, ref) => {
  const { scene } = useGLTF("/models/Mclaren/scene.gltf");

  useEffect(() => {
    if (!ref || !("current" in ref) || !ref.current) return;

    const bbox = new THREE.Box3().setFromObject(ref.current);
    const size = new THREE.Vector3();
    bbox.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = targetSize / maxDim;
    ref.current.scale.setScalar(scaleFactor);

    const newBbox = new THREE.Box3().setFromObject(ref.current);
    const newSize = new THREE.Vector3();
    newBbox.getSize(newSize);
    console.log(`🔧 Adjusted model size to target ${targetSize}:`, newSize);
  }, [targetSize, ref]);

  return <primitive ref={ref} object={scene} position={[0, -1, 0]} rotation={[0, Math.PI, 0]} />;
});
McLarenModel.displayName = "McLarenModel";

useGLTF.preload("/models/Mclaren/scene.gltf");

function FitCameraToObject({ objectRef }: { objectRef: React.RefObject<THREE.Group | null> }) {
    const { camera } = useThree();
  
    useEffect(() => {
      if (!objectRef.current) return;
  
      const bbox = new THREE.Box3().setFromObject(objectRef.current);
      const size = new THREE.Vector3();
      bbox.getSize(size);
      const center = new THREE.Vector3();
      bbox.getCenter(center);
  
      const maxDim = Math.max(size.x, size.y, size.z);
  
      // ✅ Ensure camera is PerspectiveCamera
      const perspectiveCamera = camera as THREE.PerspectiveCamera;
  
      const fov = perspectiveCamera.fov * (Math.PI / 180);
      let distance = maxDim / (2 * Math.tan(fov / 2));
      distance *= 1.5; // padding
  
      perspectiveCamera.position.set(center.x, center.y + size.y / 2, center.z + distance);
      perspectiveCamera.lookAt(center);
      perspectiveCamera.updateProjectionMatrix();
    }, [camera, objectRef]);
  
    return null;
  }
  

// ✅ Main CarExperience Component
export default function CarExperience() {
  const [carSize, setCarSize] = useState(20);
  const carRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<ThreeOrbitControls>(null);

  // Log model size on zoom/rotate/pan
  useEffect(() => {
    if (!controlsRef.current || !carRef.current) return;

    const controls = controlsRef.current;

    const logSize = () => {
      if (!carRef.current) return;
      const bbox = new THREE.Box3().setFromObject(carRef.current);
      const size = new THREE.Vector3();
      bbox.getSize(size);
      console.log("🔧 Current model size:", size);
    };

    controls.addEventListener("change", logSize);
    return () => controls.removeEventListener("change", logSize);
  }, []);

  return (
    <section className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.2),transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />

      {/* Header text */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-6xl font-extrabold mb-6 tracking-wider uppercase ${orbitron.className}`}
        >
          The <span className="text-red-600">The Car Experience</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className={`text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed ${orbitron.className}`}
        >
        Interact with lifelike 3D models of our next-generation supercars. Rotate, explore, and feel the adrenaline — all from your screen.
        </motion.p>

        {/* Slider */}
        <input
  type="range"
  min="1"
  max="50"
  step="0.1"
  value={carSize}
  onChange={(e) => setCarSize(parseFloat(e.target.value))}
  className="hidden"
/>
<p className="hidden">Target Car Size: {carSize}</p>

      </div>

      {/* 3D Model Canvas with aesthetic border */}
      <div className="relative w-full max-w-5xl h-96 md:h-[28rem] bg-gradient-to-b from-gray-900 to-black rounded-3xl border border-red-800/30 flex items-center justify-center shadow-[0_0_30px_rgba(255,0,0,0.3)]">
        <Canvas shadows className="w-full h-full rounded-3xl">
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Suspense fallback={null}>
            <McLarenModel ref={carRef} targetSize={carSize} />
            <FitCameraToObject objectRef={carRef} />
            <Environment preset="night" />
            <OrbitControls
              ref={controlsRef}
              enableZoom
              maxDistance={100}
              minDistance={5}
              autoRotate
              autoRotateSpeed={1}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}
