import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Ocean Water with gentle wave displacement
const OceanMesh = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.position.y = -2 + Math.sin(t * 0.8) * 0.08;
      meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[120, 120, 32, 32]} />
      <meshStandardMaterial
        color="#08383f"
        roughness={0.15}
        metalness={0.8}
        transparent
        opacity={0.88}
        wireframe={false}
      />
    </mesh>
  );
};

// Lush Tropical Island Terrain & Beach Sand
const IslandTerrain = () => {
  return (
    <group position={[0, -1.9, -4]}>
      {/* Sandy Atoll Base */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[14, 18, 1.2, 32]} />
        <meshStandardMaterial color="#c2b280" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Tropical Green Mound */}
      <mesh position={[0, 0.4, -2]}>
        <sphereGeometry args={[9, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.35]} />
        <meshStandardMaterial color="#133d28" roughness={0.8} />
      </mesh>

      {/* Distant Misty Mountain Peaks */}
      <mesh position={[-16, 4, -28]}>
        <coneGeometry args={[12, 18, 5]} />
        <meshStandardMaterial color="#0b241d" roughness={0.9} />
      </mesh>
      <mesh position={[12, 3, -32]}>
        <coneGeometry args={[14, 16, 5]} />
        <meshStandardMaterial color="#0e2921" roughness={0.9} />
      </mesh>
    </group>
  );
};

// Procedural Palm Tree Component
const PalmTree = ({ position, scale = 1, rotationY = 0 }) => {
  const trunkRef = useRef();

  useFrame(({ clock }) => {
    if (trunkRef.current) {
      const t = clock.getElapsedTime();
      trunkRef.current.rotation.z = Math.sin(t * 1.2 + position[0]) * 0.03;
    }
  });

  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      {/* Curved Trunk */}
      <group ref={trunkRef}>
        <mesh position={[0, 1.8, 0]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.15, 0.28, 3.8, 8]} />
          <meshStandardMaterial color="#5c4033" roughness={0.9} />
        </mesh>

        {/* Crown of Palm Fronds */}
        <group position={[0.3, 3.7, 0]}>
          {[0, 60, 120, 180, 240, 300].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <mesh
                key={i}
                position={[Math.cos(rad) * 0.9, -0.2, Math.sin(rad) * 0.9]}
                rotation={[0.3, rad, -0.4]}
              >
                <boxGeometry args={[1.8, 0.05, 0.4]} />
                <meshStandardMaterial color="#1c5737" roughness={0.6} />
              </mesh>
            );
          })}
        </group>
      </group>
    </group>
  );
};

// Architectural 3D Overwater Luxury Villa
const LuxuryVillaModel = () => {
  return (
    <group position={[2.5, -0.8, 2]} rotation={[0, -0.3, 0]}>
      {/* Villa Foundation Stilts */}
      <mesh position={[-2, -0.8, -1]}>
        <cylinderGeometry args={[0.08, 0.08, 1.8]} />
        <meshStandardMaterial color="#302217" />
      </mesh>
      <mesh position={[2, -0.8, -1]}>
        <cylinderGeometry args={[0.08, 0.08, 1.8]} />
        <meshStandardMaterial color="#302217" />
      </mesh>
      <mesh position={[-2, -0.8, 1.5]}>
        <cylinderGeometry args={[0.08, 0.08, 1.8]} />
        <meshStandardMaterial color="#302217" />
      </mesh>
      <mesh position={[2, -0.8, 1.5]}>
        <cylinderGeometry args={[0.08, 0.08, 1.8]} />
        <meshStandardMaterial color="#302217" />
      </mesh>

      {/* Teak Wood Deck */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[5.2, 0.16, 3.8]} />
        <meshStandardMaterial color="#6a4a2b" roughness={0.7} />
      </mesh>

      {/* Main Glass Pavilion Pavilion Body */}
      <mesh position={[-0.8, 0.9, 0]}>
        <boxGeometry args={[3.2, 1.6, 2.6]} />
        <meshStandardMaterial
          color="#10251d"
          roughness={0.2}
          metalness={0.3}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Elegant Overhanging Cantilever Roof */}
      <mesh position={[-0.8, 1.85, 0]}>
        <boxGeometry args={[3.8, 0.12, 3.2]} />
        <meshStandardMaterial color="#2d2015" roughness={0.6} />
      </mesh>

      {/* Warm Golden Interior Ambient Glow */}
      <pointLight position={[-0.8, 0.9, 0]} intensity={1.5} color="#e5c365" distance={6} />

      {/* Private Infinity Plunge Pool on Deck */}
      <mesh position={[1.4, 0.04, 0.4]}>
        <boxGeometry args={[1.8, 0.08, 2.4]} />
        <meshStandardMaterial color="#289b9d" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Minimalist Sun Loungers */}
      <mesh position={[1.4, 0.15, -0.9]} rotation={[0, 0, 0.05]}>
        <boxGeometry args={[1.2, 0.08, 0.5]} />
        <meshStandardMaterial color="#e5dfd5" />
      </mesh>
    </group>
  );
};

// Subtle Golden Atmosphere Particles and Floating Birds
const AtmosphericNature = () => {
  const birdsRef = useRef();

  useFrame(({ clock }) => {
    if (birdsRef.current) {
      const t = clock.getElapsedTime() * 0.4;
      birdsRef.current.position.x = Math.sin(t) * 12;
      birdsRef.current.position.z = -12 + Math.cos(t) * 8;
      birdsRef.current.position.y = 5 + Math.sin(t * 1.5) * 0.8;
    }
  });

  return (
    <>
      {/* Floating Golden Motes */}
      <Sparkles count={55} scale={20} size={2.5} speed={0.4} color="#D4AF37" opacity={0.6} />

      {/* Distant Sea Mist / Cloud Formations */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh position={[-8, 6, -18]}>
          <sphereGeometry args={[4, 16, 16]} />
          <meshStandardMaterial color="#e8f4f8" transparent opacity={0.15} roughness={1} />
        </mesh>
        <mesh position={[14, 8, -24]}>
          <sphereGeometry args={[5, 16, 16]} />
          <meshStandardMaterial color="#f0eae1" transparent opacity={0.18} roughness={1} />
        </mesh>
      </Float>

      {/* Flying Seabird Silhouette Group */}
      <group ref={birdsRef}>
        <mesh position={[0, 0, 0]} rotation={[0.1, 0.8, 0]}>
          <coneGeometry args={[0.15, 0.6, 3]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[1.2, 0.3, 0.4]} rotation={[0.1, 0.8, 0]}>
          <coneGeometry args={[0.12, 0.5, 3]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </>
  );
};

// Dynamic Camera with Subtle Mouse Parallax
const CinematicCamera = () => {
  const camRef = useRef();

  useFrame(({ mouse, clock }) => {
    if (camRef.current) {
      const t = clock.getElapsedTime();
      // Gentle cinematic breathing sway
      const targetX = mouse.x * 1.5 + Math.sin(t * 0.2) * 0.3;
      const targetY = 1.2 + mouse.y * 0.8 + Math.cos(t * 0.3) * 0.2;
      camRef.current.position.x = THREE.MathUtils.lerp(camRef.current.position.x, targetX, 0.04);
      camRef.current.position.y = THREE.MathUtils.lerp(camRef.current.position.y, targetY, 0.04);
      camRef.current.lookAt(0, 0.2, 0);
    }
  });

  return <PerspectiveCamera ref={camRef} makeDefault position={[0, 1.2, 9]} fov={45} />;
};

export const ResortHeroCanvas = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <CinematicCamera />

        {/* Cinematic Lighting System */}
        <ambientLight intensity={0.45} color="#e6f5ea" />
        <directionalLight
          position={[12, 14, 8]}
          intensity={1.8}
          color="#ffebbe"
          castShadow
        />
        <directionalLight position={[-10, 6, -5]} intensity={0.6} color="#458994" />

        {/* 3D Elements */}
        <OceanMesh />
        <IslandTerrain />
        <PalmTree position={[-4, -1.8, -1]} scale={1.2} rotationY={0.4} />
        <PalmTree position={[-5.8, -1.8, -3]} scale={1.4} rotationY={1.2} />
        <PalmTree position={[-2.2, -1.8, -3.5]} scale={1.0} rotationY={2.1} />
        <PalmTree position={[5.2, -1.8, -2]} scale={1.1} rotationY={-0.6} />
        <LuxuryVillaModel />
        <AtmosphericNature />
      </Canvas>
    </div>
  );
};
