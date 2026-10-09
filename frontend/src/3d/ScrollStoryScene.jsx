import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const StoryCameraRig = ({ progress }) => {
  const camRef = useRef();

  useFrame(() => {
    if (!camRef.current) return;

    // Camera waypoint transitions for the 5 scroll scenes
    // Scene 1 (progress 0.0 - 0.2): Arrival — high fly-in
    // Scene 2 (progress 0.2 - 0.4): The Resort — descending towards lagoon
    // Scene 3 (progress 0.4 - 0.6): Villas — close focus on architecture
    // Scene 4 (progress 0.6 - 0.8): Experiences — side sweep across reef
    // Scene 5 (progress 0.8 - 1.0): Sunset Booking — warm golden angle

    const p = Math.min(Math.max(progress, 0), 1);

    let targetX = 0;
    let targetY = 2;
    let targetZ = 10;
    let lookX = 0;
    let lookY = 0;
    let lookZ = 0;

    if (p < 0.25) {
      // Scene 1: Arrival
      const sub = p / 0.25;
      targetX = THREE.MathUtils.lerp(0, -2, sub);
      targetY = THREE.MathUtils.lerp(6, 3, sub);
      targetZ = THREE.MathUtils.lerp(14, 8, sub);
      lookX = 0;
      lookY = 0.5;
      lookZ = 0;
    } else if (p < 0.5) {
      // Scene 2: The Resort
      const sub = (p - 0.25) / 0.25;
      targetX = THREE.MathUtils.lerp(-2, 3.5, sub);
      targetY = THREE.MathUtils.lerp(3, 1.8, sub);
      targetZ = THREE.MathUtils.lerp(8, 5, sub);
      lookX = THREE.MathUtils.lerp(0, 1.5, sub);
      lookY = 0.5;
      lookZ = 0;
    } else if (p < 0.75) {
      // Scene 3 & 4: Villas & Experiences
      const sub = (p - 0.5) / 0.25;
      targetX = THREE.MathUtils.lerp(3.5, -3, sub);
      targetY = THREE.MathUtils.lerp(1.8, 1.2, sub);
      targetZ = THREE.MathUtils.lerp(5, 4.2, sub);
      lookX = THREE.MathUtils.lerp(1.5, -0.5, sub);
      lookY = 0.8;
      lookZ = -1;
    } else {
      // Scene 5: Sunset Booking
      const sub = (p - 0.75) / 0.25;
      targetX = THREE.MathUtils.lerp(-3, 0, sub);
      targetY = THREE.MathUtils.lerp(1.2, 2.5, sub);
      targetZ = THREE.MathUtils.lerp(4.2, 7.5, sub);
      lookX = 0;
      lookY = 0.2;
      lookZ = -4;
    }

    camRef.current.position.x = THREE.MathUtils.lerp(camRef.current.position.x, targetX, 0.08);
    camRef.current.position.y = THREE.MathUtils.lerp(camRef.current.position.y, targetY, 0.08);
    camRef.current.position.z = THREE.MathUtils.lerp(camRef.current.position.z, targetZ, 0.08);
    camRef.current.lookAt(lookX, lookY, lookZ);
  });

  return <PerspectiveCamera ref={camRef} makeDefault position={[0, 6, 14]} fov={45} />;
};

export const ScrollStoryScene = ({ scrollProgress = 0 }) => {
  return (
    <div style={{ position: 'sticky', top: 0, width: '100vw', height: '100vh', zIndex: 1 }}>
      <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <StoryCameraRig progress={scrollProgress} />

        <ambientLight intensity={0.5} color="#e3f0e8" />
        <directionalLight
          position={[8, 12, 6]}
          intensity={1.6 + scrollProgress * 0.4}
          color={scrollProgress > 0.7 ? '#f9b165' : '#fff4d6'}
        />

        {/* Ocean Plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
          <planeGeometry args={[80, 80]} />
          <meshStandardMaterial
            color={scrollProgress > 0.7 ? '#0b2e38' : '#08333e'}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Central Coral Atoll & Villa Complex */}
        <group position={[0, -1.4, -1]}>
          <mesh position={[0, -0.2, 0]}>
            <cylinderGeometry args={[10, 14, 1.0, 32]} />
            <meshStandardMaterial color="#c2b280" roughness={0.9} />
          </mesh>

          {/* Villa Main Structure */}
          <mesh position={[0, 1.2, 0]}>
            <boxGeometry args={[4.2, 1.8, 3.2]} />
            <meshStandardMaterial color="#1a3d31" roughness={0.3} metalness={0.2} />
          </mesh>
          <mesh position={[0, 2.2, 0]}>
            <boxGeometry args={[4.8, 0.15, 3.8]} />
            <meshStandardMaterial color="#2d2015" />
          </mesh>

          {/* Infinity Plunge Pool */}
          <mesh position={[2.6, 0.2, 0]}>
            <boxGeometry args={[2.0, 0.1, 2.8]} />
            <meshStandardMaterial color="#38b2ac" roughness={0.1} metalness={0.9} />
          </mesh>
        </group>

        {/* Ambient Nature */}
        <Sparkles
          count={40}
          scale={16}
          size={3}
          speed={0.5}
          color={scrollProgress > 0.7 ? '#F6AD55' : '#D4AF37'}
        />
      </Canvas>
    </div>
  );
};
