// components/SmokeParticles.tsx
"use client";
import React, { useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

const SmokeParticles = ({ active }: { active: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const texture = useLoader(THREE.TextureLoader, "/smoke.png");

  // Increase particle count
  const particleCount = 200;
  const positions: [number, number, number][] = Array.from(
    { length: particleCount },
    () => [
      (Math.random() - 0.5) * viewport.width * 3,
      (Math.random() - 0.5) * viewport.height * 3,
      -Math.random() * 8,
    ]
  );

  // Store individual speeds for variation
  const speeds = Array.from({ length: particleCount }, () => ({
    z: 0.005 + Math.random() * 0.01,
    rot: Math.random() * 0.004,
    fade: 0.0005 + Math.random() * 0.0015,
  }));

  useFrame(() => {
    if (!active || !groupRef.current) return;

    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const material = mesh.material as THREE.MeshStandardMaterial;
      const s = speeds[i];

      // Animate smoke with variation
      mesh.position.z += s.z;
      mesh.rotation.z += s.rot;
      material.opacity -= s.fade;

      // Reset particle when faded
      if (material.opacity <= 0) {
        const [x, y, z] = positions[i];
        mesh.position.set(
          (Math.random() - 0.5) * viewport.width * 3,
          (Math.random() - 0.5) * viewport.height * 3,
          -Math.random() * 8
        );
        material.opacity = 0.25;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {positions.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshStandardMaterial
            map={texture}
            transparent
            opacity={0.25}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

export default SmokeParticles;
