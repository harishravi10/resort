import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Bed, Tv, Bath, Compass, Wine, Sparkles, Check } from 'lucide-react';

const ROOM_HOTSPOTS = [
  {
    id: 'bed',
    title: 'Sanctuary Master King Bed',
    pos: [0, 0.4, 0],
    icon: Bed,
    desc: 'Custom teak platform with handmade organic mattress, Egyptian 1000-thread sheets, and pillow aromatherapy selection.',
  },
  {
    id: 'tv',
    title: 'Concealed Mirror Cinema TV',
    pos: [0, 1.4, -2.4],
    icon: Tv,
    desc: '65-inch 4K OLED screen discreetly hidden behind smoked antique bronze mirror glass.',
  },
  {
    id: 'balcony',
    title: 'Lagoon Oceanfront Terrace',
    pos: [0, 0.2, 2.5],
    icon: Compass,
    desc: 'Direct sliding acoustic glass doors opening onto private sundeck, daybed, and lagoon ladder.',
  },
  {
    id: 'bathroom',
    title: 'Open Marble Rainfall Bath',
    pos: [-2.2, 0.8, -0.8],
    icon: Bath,
    desc: 'Free-standing granite tub carved from a single volcanic boulder with open-air views of private flora.',
  },
  {
    id: 'minibar',
    title: 'Bespoke Sommelier Bar',
    pos: [2.2, 0.7, -1.2],
    icon: Wine,
    desc: 'Curated organic vintages, single-estate spirits, locally roasted pour-over espresso, and artisan snacks.',
  },
];

const RoomInteriorMesh = ({ activeSpot, onSelectSpot }) => {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Floor - Teak Parquet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#3b2b1d" roughness={0.7} />
      </mesh>

      {/* Back Wall with Dark Wooden Slatting */}
      <mesh position={[0, 1.5, -3]}>
        <planeGeometry args={[6, 3]} />
        <meshStandardMaterial color="#112920" roughness={0.6} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[6, 3]} />
        <meshStandardMaterial color="#0e231b" roughness={0.6} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[3, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[6, 3]} />
        <meshStandardMaterial color="#0e231b" roughness={0.6} />
      </mesh>

      {/* Luxury Bed Structure */}
      <group position={[0, 0.2, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.4, 0.35, 2.6]} />
          <meshStandardMaterial color="#422f20" />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[2.2, 0.25, 2.4]} />
          <meshStandardMaterial color="#f0ece1" roughness={0.9} />
        </mesh>
        {/* Headboard */}
        <mesh position={[0, 0.7, -1.25]}>
          <boxGeometry args={[2.4, 0.9, 0.15]} />
          <meshStandardMaterial color="#22170f" />
        </mesh>
        {/* Pillows */}
        <mesh position={[-0.6, 0.45, -0.8]}>
          <boxGeometry args={[0.7, 0.15, 0.45]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.6, 0.45, -0.8]}>
          <boxGeometry args={[0.7, 0.15, 0.45]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Concealed TV on Wall */}
      <mesh position={[0, 1.4, -2.9]}>
        <boxGeometry args={[1.8, 1.0, 0.05]} />
        <meshStandardMaterial color="#050a08" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Mini Bar Credenza */}
      <mesh position={[2.4, 0.45, -1.2]}>
        <boxGeometry args={[0.8, 0.9, 1.4]} />
        <meshStandardMaterial color="#2d2015" />
      </mesh>

      {/* Stone Bath Tub */}
      <mesh position={[-2.2, 0.35, -0.8]}>
        <cylinderGeometry args={[0.6, 0.5, 0.7, 24]} />
        <meshStandardMaterial color="#383838" roughness={0.4} />
      </mesh>

      {/* Glass Balcony Opening in Front */}
      <mesh position={[0, 0.4, 2.9]}>
        <boxGeometry args={[5.8, 0.8, 0.08]} />
        <meshStandardMaterial color="#a0c4b7" transparent opacity={0.3} roughness={0.1} />
      </mesh>

      {/* Interactive Hotspots */}
      {ROOM_HOTSPOTS.map((spot) => {
        const isSelected = activeSpot?.id === spot.id;
        return (
          <group key={spot.id} position={spot.pos}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelectSpot(spot);
              }}
              scale={isSelected ? [1.4, 1.4, 1.4] : [1, 1, 1]}
            >
              <sphereGeometry args={[0.14, 16, 16]} />
              <meshBasicMaterial color={isSelected ? '#F6E05E' : '#D4AF37'} />
            </mesh>

            <Html distanceFactor={6} position={[0, 0.25, 0]}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectSpot(spot);
                }}
                style={{
                  background: isSelected ? 'var(--gold-500)' : 'rgba(7, 20, 16, 0.9)',
                  color: isSelected ? '#000' : '#fff',
                  border: '1px solid var(--gold-400)',
                  borderRadius: '999px',
                  padding: '3px 8px',
                  fontSize: '0.62rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6)',
                  transform: 'translate3d(-50%, -100%, 0)',
                }}
              >
                {spot.title.split(' ')[0]}
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

export const RoomViewer3D = () => {
  const [activeSpot, setActiveSpot] = useState(ROOM_HOTSPOTS[0]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        gap: '24px',
        alignItems: 'center',
      }}
      className="room-viewer-grid"
    >
      <div
        style={{
          width: '100%',
          height: '460px',
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          background: 'radial-gradient(circle at 50% 50%, #0d2820 0%, #05110d 80%)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
        }}
        data-cursor="LOOK"
      >
        <Canvas camera={{ position: [0, 2.2, 4.5], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[0, 2.5, 0]} intensity={1.5} color="#ffeaa7" />
          <directionalLight position={[0, 2, 4]} intensity={0.6} color="#ffffff" />
          <RoomInteriorMesh
            activeSpot={activeSpot}
            onSelectSpot={(s) => setActiveSpot(s)}
          />
          <OrbitControls maxPolarAngle={Math.PI / 2} minDistance={2} maxDistance={7} />
        </Canvas>

        <div
          style={{
            position: 'absolute',
            bottom: '14px',
            left: '18px',
            background: 'rgba(6, 17, 13, 0.85)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: '999px',
            padding: '5px 12px',
            fontSize: '0.7rem',
            color: 'var(--gold-300)',
            pointerEvents: 'none',
          }}
        >
          <span>3D Room Inspection • Click markers to reveal amenities</span>
        </div>
      </div>

      {/* Info Card */}
      <div
        className="glass-panel"
        style={{
          padding: '28px',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          background: 'rgba(7, 20, 16, 0.9)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sparkles size={16} color="#D4AF37" />
          <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', color: 'var(--gold-400)', textTransform: 'uppercase' }}>
            IN-ROOM APPOINTMENT
          </span>
        </div>

        <h3
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '1.4rem',
            color: '#fff',
            marginBottom: '14px',
          }}
        >
          {activeSpot.title}
        </h3>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.7', marginBottom: '24px' }}>
          {activeSpot.desc}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {ROOM_HOTSPOTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSpot(s)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 16px',
                background: activeSpot.id === s.id ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${activeSpot.id === s.id ? 'var(--gold-500)' : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: '10px',
                color: activeSpot.id === s.id ? 'var(--gold-300)' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <span>{s.title}</span>
              {activeSpot.id === s.id && <Check size={14} color="#D4AF37" />}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .room-viewer-grid { grid-templateColumns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
