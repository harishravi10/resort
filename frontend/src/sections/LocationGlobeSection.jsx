import React from 'react';
import { InteractiveGlobe } from '../3d/InteractiveGlobe';
import { Sparkles, Plane, Anchor, Compass, ShieldCheck } from 'lucide-react';

export const LocationGlobeSection = () => {
  return (
    <section className="section-padding" style={{ position: 'relative', background: '#040d0a' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '50px',
            alignItems: 'center',
          }}
          className="location-globe-grid"
        >
          {/* Left: 3D Interactive Globe */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <span className="tagline-badge">
                <Compass size={13} color="#D4AF37" />
                GLOBAL ARCHIPELAGO COORDINATES
              </span>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', color: '#fff' }}>
                Secluded in the Azure Expanse
              </h3>
            </div>
            <InteractiveGlobe />
          </div>

          {/* Right: Secluded Arrival Details */}
          <div>
            <h2
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                color: '#fff',
                marginBottom: '16px',
              }}
            >
              Arrival by Air &amp; Sea
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '32px' }}>
              Aurelia is positioned within an uninhabited marine conservatory at 07°14'22"S 72°28'15"E. Protected from mainstream tourism routes, arrival is an exclusive cinematic journey in itself.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  background: 'rgba(212, 175, 55, 0.05)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '14px',
                  padding: '18px',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(212, 175, 55, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Plane size={20} color="#D4AF37" />
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1rem', fontFamily: 'Cinzel, serif' }}>
                    Private Seaplane Flight
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '4px' }}>
                    45-minute scenic seaplane aerial transfer directly from international aviation lounges to the Aurelia water jetty.
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  background: 'rgba(212, 175, 55, 0.05)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '14px',
                  padding: '18px',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(212, 175, 55, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Anchor size={20} color="#D4AF37" />
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1rem', fontFamily: 'Cinzel, serif' }}>
                    Private Superyacht Marina
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '4px' }}>
                    Deep-water moorings accommodating vessels up to 80 meters with discrete private security and bunkering support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .location-globe-grid { grid-templateColumns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
