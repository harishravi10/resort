import React, { useState } from 'react';
import { INITIAL_RESTAURANTS } from '../services/mockData';
import { Sparkles, UtensilsCrossed, Clock, Shirt, Award, ChevronRight } from 'lucide-react';

export const DiningSection = () => {
  const [selectedRestIndex, setSelectedRestIndex] = useState(0);
  const currentRest = INITIAL_RESTAURANTS[selectedRestIndex];

  return (
    <section className="section-padding" style={{ position: 'relative', background: '#040c09' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px auto' }}>
          <span className="tagline-badge">
            <Sparkles size={13} color="#D4AF37" />
            MICHELIN-CALIBRE GASTRONOMY
          </span>
          <h2
            style={{
              fontFamily: 'Cinzel, Georgia, serif',
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              color: '#ffffff',
              letterSpacing: '0.08em',
              marginBottom: '16px',
            }}
          >
            Culinary Odyssey
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7' }}>
            Four visionary dining destinations celebrating biodynamic permaculture harvests, deep-sea sustainable catches, and ancient firecraft.
          </p>
        </div>

        {/* Restaurant Selection Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '48px',
            flexWrap: 'wrap',
          }}
        >
          {INITIAL_RESTAURANTS.map((rest, idx) => (
            <button
              key={rest.name}
              onClick={() => setSelectedRestIndex(idx)}
              data-cursor="DINE"
              style={{
                background: selectedRestIndex === idx ? 'var(--gold-gradient)' : 'rgba(212, 175, 55, 0.08)',
                color: selectedRestIndex === idx ? '#06110d' : 'var(--gold-300)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '999px',
                padding: '12px 28px',
                fontFamily: 'Cinzel, serif',
                fontSize: '0.9rem',
                letterSpacing: '0.15em',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: selectedRestIndex === idx ? '0 4px 20px rgba(212, 175, 55, 0.35)' : 'none',
              }}
            >
              {rest.name}
            </button>
          ))}
        </div>

        {/* Featured Restaurant Showcase Card */}
        <div
          className="glass-panel"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            background: 'rgba(7, 20, 16, 0.92)',
          }}
          className="dining-showcase-grid"
        >
          {/* Left: Atmospheric Image with Badges */}
          <div style={{ position: 'relative', minHeight: '440px', overflow: 'hidden' }}>
            <img
              src={currentRest.imageUrl}
              alt={currentRest.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.8s ease',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(4, 12, 9, 0.9) 0%, transparent 60%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
              }}
            >
              <span
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.2em',
                  color: 'var(--gold-400)',
                  textTransform: 'uppercase',
                }}
              >
                SIGNATURE CREATION
              </span>
              <p
                style={{
                  color: '#fff',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.35rem',
                  fontStyle: 'italic',
                }}
              >
                "{currentRest.featuredDish}"
              </p>
            </div>
          </div>

          {/* Right: Info & Menu Preview */}
          <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--gold-400)', textTransform: 'uppercase' }}>
                {currentRest.cuisine}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '2.4rem',
                color: '#ffffff',
                marginBottom: '8px',
              }}
            >
              {currentRest.name}
            </h3>

            <p style={{ color: 'var(--gold-300)', fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '16px' }}>
              {currentRest.tagline}
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '24px' }}>
              {currentRest.description}
            </p>

            {/* Timings & Dress Code Pills */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                padding: '14px 18px',
                background: 'rgba(212, 175, 55, 0.06)',
                borderRadius: '12px',
                border: '1px solid rgba(212, 175, 55, 0.18)',
                marginBottom: '28px',
                fontSize: '0.78rem',
                color: 'var(--text-secondary)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} color="#D4AF37" />
                <span>{currentRest.timings}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shirt size={14} color="#D4AF37" />
                <span>Dress Code: {currentRest.dressCode}</span>
              </div>
            </div>

            {/* Menu Highlights List */}
            <h4
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.95rem',
                color: 'var(--gold-300)',
                letterSpacing: '0.12em',
                marginBottom: '14px',
              }}
            >
              SELECTED DEGUSTATION HIGHLIGHTS
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentRest.menuHighlights?.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    borderBottom: '1px dashed rgba(212, 175, 55, 0.15)',
                    paddingBottom: '8px',
                  }}
                >
                  <div>
                    <p style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 500 }}>{item.name}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{item.desc}</p>
                  </div>
                  <span style={{ color: 'var(--gold-400)', fontFamily: 'Cinzel, serif', fontSize: '0.9rem', fontWeight: 600 }}>
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dining-showcase-grid { grid-templateColumns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
