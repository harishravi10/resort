import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import { Sparkles, Eye, X, Waves, Bed, Compass, Bath } from 'lucide-react';

const HOTSPOTS_DATA = [
  {
    id: 'pool',
    name: 'Private Infinity Plunge Pool',
    position: [2.2, 0.4, 0.5],
    desc: '10-meter temperature-controlled saltwater plunge pool visually merging with the open lagoon horizon.',
    icon: Waves,
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bedroom',
    name: 'Master Sanctuary Bedroom',
    position: [-0.8, 1.4, 0.2],
    desc: 'Bespoke teak canopy king bed with 1,000-thread Belgian linens and motorized panoramic sheer drapes.',
    icon: Bed,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'balcony',
    name: 'Cantilevered Teak Balcony',
    position: [0.8, 0.4, 1.8],
    desc: 'Expansive private sundeck with overwater woven net hammocks suspended directly above clear coral shoals.',
    icon: Compass,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bathroom',
    name: 'Volcanic Granite Open Bath',
    position: [-2.2, 1.0, -0.6],
    desc: 'Outdoor double rain shower and monolithic volcanic stone soaking tub surrounded by living orchids.',
    icon: Bath,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ocean',
    name: 'Unobstructed 270° Ocean View',
    position: [1.2, 1.8, -1.8],
    desc: 'Floor-to-ceiling acoustic glass walls capturing daily golden hour sunsets and marine life migrations.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80'
  }
];

const VillaMeshGroup = ({ activeHotspot, onSelectHotspot }) => {
  return (
    <group position={[0, -0.6, 0]}>
      {/* Stilts foundation in water */}
      {[-2.5, 2.5].map((x) =>
        [-1.8, 1.8].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, -1.2, z]}>
            <cylinderGeometry args={[0.09, 0.09, 2.2]} />
            <meshStandardMaterial color="#2d2218" />
          </mesh>
        ))
      )}

      {/* Main Teak Deck */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[6.8, 0.16, 4.6]} />
        <meshStandardMaterial color="#6a4c30" roughness={0.7} />
      </mesh>

      {/* Villa Bedroom/Living Pavilion Structure */}
      <mesh position={[-1.2, 1.1, 0]}>
        <boxGeometry args={[3.8, 2.1, 3.4]} />
        <meshStandardMaterial color="#0f2920" roughness={0.2} metalness={0.4} transparent opacity={0.9} />
      </mesh>

      {/* Floating Cantilever Roof */}
      <mesh position={[-1.2, 2.25, 0]}>
        <boxGeometry args={[4.4, 0.16, 4.0]} />
        <meshStandardMaterial color="#241911" roughness={0.5} />
      </mesh>

      {/* Ocean Plunge Pool on Deck */}
      <mesh position={[1.8, 0.02, 0.6]}>
        <boxGeometry args={[2.4, 0.08, 2.8]} />
        <meshStandardMaterial color="#22a699" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Glass Balustrade */}
      <mesh position={[0, 0.35, 2.25]}>
        <boxGeometry args={[6.6, 0.6, 0.05]} />
        <meshStandardMaterial color="#d8f3dc" transparent opacity={0.3} roughness={0.1} />
      </mesh>

      {/* Hotspot Markers */}
      {HOTSPOTS_DATA.map((h) => {
        const isSelected = activeHotspot?.id === h.id;
        return (
          <group key={h.id} position={h.position}>
            {/* Pulsing 3D Pin */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelectHotspot(h);
              }}
              scale={isSelected ? [1.3, 1.3, 1.3] : [1, 1, 1]}
            >
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshBasicMaterial color={isSelected ? '#F6E05E' : '#D4AF37'} />
            </mesh>

            {/* Html Label Pin */}
            <Html distanceFactor={7} position={[0, 0.28, 0]}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectHotspot(h);
                }}
                style={{
                  background: isSelected ? 'var(--gold-500)' : 'rgba(7, 20, 16, 0.9)',
                  color: isSelected ? '#000' : '#fff',
                  border: '1px solid var(--gold-400)',
                  borderRadius: '999px',
                  padding: '4px 10px',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                  transform: 'translate3d(-50%, -100%, 0)',
                  transition: 'all 0.2s',
                }}
              >
                {h.name.split(' ')[0]}
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

export const VillaExplorer3D = () => {
  const [activeHotspot, setActiveHotspot] = useState(HOTSPOTS_DATA[0]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: '30px',
        alignItems: 'center',
      }}
      className="villa-explorer-grid"
    >
      {/* 3D Canvas Container */}
      <div
        style={{
          width: '100%',
          height: '520px',
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          background: 'radial-gradient(circle at 50% 50%, #0d2c23 0%, #04100c 85%)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
        }}
        data-cursor="ORBIT"
      >
        <Canvas camera={{ position: [5, 4, 7], fov: 42 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 12, 8]} intensity={1.5} color="#fff4d6" />
          <directionalLight position={[-8, 6, -6]} intensity={0.5} color="#38b2ac" />

          {/* Calm reflective lagoon water plane under villa */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
            <planeGeometry args={[40, 40]} />
            <meshStandardMaterial color="#08383f" roughness={0.1} metalness={0.8} />
          </mesh>

          <VillaMeshGroup
            activeHotspot={activeHotspot}
            onSelectHotspot={(h) => setActiveHotspot(h)}
          />

          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2 - 0.05} />
        </Canvas>

        {/* Floating Instruction Tag */}
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
            fontSize: '0.72rem',
            color: 'var(--gold-300)',
            pointerEvents: 'none',
          }}
        >
          <span>Click glowing pins • Drag to rotate villa 360°</span>
        </div>
      </div>

      {/* Hotspot Detail Card Panel */}
      <div
        className="glass-panel"
        style={{
          padding: '32px',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          background: 'rgba(7, 20, 16, 0.85)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sparkles size={16} color="#D4AF37" />
          <span style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--gold-300)', textTransform: 'uppercase' }}>
            ARCHITECTURAL HIGHLIGHT
          </span>
        </div>

        <h3
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '1.6rem',
            color: '#fff',
            marginBottom: '16px',
          }}
        >
          {activeHotspot.name}
        </h3>

        {/* Hotspot Image Preview */}
        <div
          style={{
            width: '100%',
            height: '180px',
            borderRadius: '14px',
            overflow: 'hidden',
            marginBottom: '18px',
            border: '1px solid rgba(212, 175, 55, 0.2)',
          }}
        >
          <img
            src={activeHotspot.image}
            alt={activeHotspot.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '24px' }}>
          {activeHotspot.desc}
        </p>

        {/* Hotspot Selector Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {HOTSPOTS_DATA.map((h) => (
            <button
              key={h.id}
              onClick={() => setActiveHotspot(h)}
              data-cursor="VIEW"
              style={{
                background: activeHotspot.id === h.id ? 'var(--gold-gradient)' : 'rgba(212, 175, 55, 0.08)',
                color: activeHotspot.id === h.id ? '#06110d' : 'var(--gold-300)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '999px',
                padding: '6px 14px',
                fontSize: '0.75rem',
                fontWeight: activeHotspot.id === h.id ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {h.name}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .villa-explorer-grid { grid-templateColumns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
