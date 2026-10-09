import React from 'react';
import { ResortHeroCanvas } from '../3d/ResortHeroCanvas';
import { WeatherWidget } from '../components/WeatherWidget';
import { AudioAmbience } from '../components/AudioAmbience';
import { useBooking } from '../context/BookingContext';
import { Sparkles, Calendar, ChevronDown, Compass } from 'lucide-react';

export const HeroCinematic = ({ onExploreClick }) => {
  const { openBookingModal } = useBooking();

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '750px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 3D WebGL Canvas Layer */}
      <ResortHeroCanvas />

      {/* Atmospheric Vignette Gradients */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 50%, rgba(6, 17, 13, 0.15) 0%, rgba(6, 17, 13, 0.75) 85%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '240px',
          background: 'linear-gradient(to top, #06110d 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Top Floating Environmental Widgets */}
      <div
        style={{
          position: 'absolute',
          top: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '1360px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <WeatherWidget />
        <AudioAmbience />
      </div>

      {/* Hero Central Typography & Brand Elements */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          textAlign: 'center',
          maxWidth: '920px',
          padding: '0 20px',
          marginTop: '40px',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span className="tagline-badge">
            <Sparkles size={13} color="#D4AF37" />
            AN UNTOUCHED SANCTUARY
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'Cinzel, Georgia, serif',
            fontSize: 'clamp(3.2rem, 8vw, 6.5rem)',
            letterSpacing: '0.28em',
            lineHeight: 1.05,
            fontWeight: 500,
            color: '#ffffff',
            textShadow: '0 10px 40px rgba(0, 0, 0, 0.8)',
            marginBottom: '18px',
          }}
          data-cursor="AURELIA"
        >
          AURELIA
        </h1>

        <p
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(1.3rem, 3vw, 2.2rem)',
            fontStyle: 'italic',
            letterSpacing: '0.08em',
            color: 'var(--gold-300)',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.7)',
            marginBottom: '42px',
          }}
        >
          "Where Luxury Meets the Wild."
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <button
            onClick={onExploreClick}
            data-cursor="EXPLORE"
            className="btn-outline-gold"
            style={{ padding: '16px 36px', fontSize: '0.85rem' }}
          >
            <Compass size={16} />
            <span>EXPLORE RESORT</span>
          </button>

          <button
            onClick={() => openBookingModal(null)}
            data-cursor="BOOK"
            className="btn-gold"
            style={{ padding: '16px 38px', fontSize: '0.85rem' }}
          >
            <Calendar size={16} />
            <span>BOOK YOUR STAY</span>
          </button>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div
        onClick={onExploreClick}
        data-cursor="SCROLL"
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--gold-300)',
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          opacity: 0.85,
          transition: 'opacity 0.3s',
        }}
      >
        <span>DISCOVER THE STORY</span>
        <ChevronDown size={18} className="animate-bounce" />
      </div>
    </section>
  );
};
