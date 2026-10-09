import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { MapPin, Compass, Sparkles } from 'lucide-react';

const EarthGlobe = () => {
  const globeRef = useRef();
  const markerRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Rotate globe slowly
  useFrame(({ clock }) => {
    if (globeRef.current && !hovered) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  // Calculate resort position on sphere (Radius = 2.5)
  // Latitude: ~-7 deg, Longitude: ~72 deg
  const phi = (90 - -7) * (Math.PI / 180);
  const theta = (72 + 180) * (Math.PI / 180);
  const radius = 2.5;
  const markerX = -(radius * Math.sin(phi) * Math.cos(theta));
  const markerZ = radius * Math.sin(phi) * Math.sin(theta);
  const markerY = radius * Math.cos(phi);

  return (
    <group
      ref={globeRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Deep Ocean Sphere */}
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          color="#061c24"
          roughness={0.4}
          metalness={0.3}
          emissive="#020d12"
        />
      </mesh>

      {/* Atmospheric Glowing Rim */}
      <mesh scale={[1.04, 1.04, 1.04]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#38b2ac"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Lat/Long Grid Ring lines */}
      <mesh>
        <sphereGeometry args={[2.51, 24, 18]} />
        <meshBasicMaterial
          color="#d4af37"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Resort Golden Beacon Marker */}
      <group position={[markerX, markerY, markerZ]}>
        <mesh ref={markerRef}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#FFD700" />
        </mesh>
        {/* Pulsing ring around marker */}
        <mesh scale={[1.8, 1.8, 1.8]}>
          <ringGeometry args={[0.08, 0.12, 16]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>

        {/* 3D HTML Hotspot Tooltip */}
        <Html distanceFactor={8} position={[0, 0.25, 0]}>
          <div
            style={{
              background: 'rgba(7, 20, 16, 0.95)',
              border: '1px solid #D4AF37',
              borderRadius: '8px',
              padding: '6px 12px',
              color: '#fff',
              fontSize: '0.72rem',
              whiteSpace: 'nowrap',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transform: 'translate3d(-50%, -100%, 0)',
              pointerEvents: 'none',
            }}
          >
            <Sparkles size={12} color="#D4AF37" />
            <span style={{ fontFamily: 'Cinzel, serif', fontWeight: 600, color: 'var(--gold-300)' }}>
              AURELIA SANCTUARY
            </span>
            <span style={{ color: 'var(--text-muted)' }}>07°S, 72°E</span>
          </div>
        </Html>
      </group>
    </group>
  );
};

export const InteractiveGlobe = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '420px',
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 50%, #0c2720 0%, #040e0a 80%)',
        border: '1px solid rgba(212, 175, 55, 0.2)',
      }}
      data-cursor="ROTATE"
    >
      <Canvas camera={{ position: [0, 0, 5.8], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#fff" />
        <directionalLight position={[-10, -5, -5]} intensity={0.5} color="#38b2ac" />
        <EarthGlobe />
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>

      {/* Floating Coordinates Tag */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '20px',
          background: 'rgba(6, 17, 13, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          borderRadius: '999px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.72rem',
          color: 'var(--gold-300)',
          pointerEvents: 'none',
        }}
      >
        <Compass size={14} color="#D4AF37" />
        <span>Drag to rotate globe • Private Sanctuary Location</span>
      </div>
    </div>
  );
};
