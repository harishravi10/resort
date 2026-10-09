import React, { useState } from 'react';
import { Sun, CloudRain, Wind, Droplets, Compass, Sunrise, Sunset, Waves } from 'lucide-react';

export const WeatherWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [unit, setUnit] = useState('C'); // 'C' or 'F'

  const tempC = 28;
  const tempF = Math.round((tempC * 9) / 5 + 32);
  const displayTemp = unit === 'C' ? `${tempC}°C` : `${tempF}°F`;

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 50,
      }}
    >
      {/* Collapsed Pill Badge */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        data-cursor="WEATHER"
        style={{
          background: 'rgba(8, 22, 17, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '999px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#fff',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--gold-400)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)')}
      >
        <Sun size={16} color="#E2C875" className="animate-spin-slow" />
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold-300)' }}>
          {displayTemp}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>
          Tropical Horizon • 7° S
        </span>
      </button>

      {/* Expanded Elegant Weather Dialog */}
      {isExpanded && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            left: 0,
            width: '290px',
            background: 'rgba(7, 20, 16, 0.94)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            borderRadius: '18px',
            padding: '20px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.65)',
            zIndex: 100,
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.9rem', color: 'var(--gold-300)', letterSpacing: '0.1em' }}>
                AURELIA ATOLL
              </h4>
              <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Private Archipelago Island</p>
            </div>
            <button
              onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
              style={{
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '6px',
                color: 'var(--gold-300)',
                fontSize: '0.7rem',
                padding: '3px 8px',
                cursor: 'pointer',
              }}
            >
              °{unit === 'C' ? 'F' : 'C'}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '2.2rem', fontFamily: 'Cinzel, serif', fontWeight: 600, color: '#fff' }}>
              {displayTemp}
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--gold-400)' }}>Gentle Ocean Breeze</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              borderTop: '1px solid rgba(212, 175, 55, 0.15)',
              paddingTop: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <Droplets size={14} color="#38b2ac" />
              <span>Humidity: 68%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <Wind size={14} color="#e2c875" />
              <span>Breeze: 11 km/h</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <Sunrise size={14} color="#f6ad55" />
              <span>Dawn: 06:08 AM</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <Sunset size={14} color="#ed8936" />
              <span>Dusk: 18:42 PM</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)', gridColumn: 'span 2' }}>
              <Waves size={14} color="#4fd1c5" />
              <span>Water Temp: 27.5°C • Coral Clear</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
