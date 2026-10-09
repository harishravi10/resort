import React, { useState, useEffect, useRef } from 'react';
import { ScrollStoryScene } from '../3d/ScrollStoryScene';
import { useBooking } from '../context/BookingContext';
import { Sparkles, Calendar, ArrowRight, Compass, Shield, Wind } from 'lucide-react';

const STORY_STEPS = [
  {
    scene: '01',
    title: 'THE ARRIVAL',
    heading: 'Your escape begins here.',
    body: 'Touch down via private seaplane or twin-engine yacht into crystal azure atolls untouched by time. The chaos of civilization dissolves into the ocean breeze.',
    highlight: 'Private Seaplane Arrival • Direct Reef Greeting',
  },
  {
    scene: '02',
    title: 'THE SANCTUARY',
    heading: 'Designed for unforgettable moments.',
    body: 'Architecture carved organically from local volcanic granite and sustainable reclaimed ironwood. Where every villa disappears harmoniously into the ancient canopy.',
    highlight: 'Eco-Architectural Harmony • 100% Carbon Neutral',
  },
  {
    scene: '03',
    title: 'THE RESIDENCES',
    heading: 'Wake up somewhere extraordinary.',
    body: 'Private cantilevered infinity plunge pools hovering above coral heads. Floor-to-ceiling glass that frames the morning sunrise and playful dolphin migrations.',
    highlight: 'Overwater Balconies • Private Heated Plunges',
  },
  {
    scene: '04',
    title: 'THE ODYSSEY',
    heading: 'Every moment becomes a memory.',
    body: 'Descend into untouched marine sanctuaries with marine biologists, savor 3-Michelin star gastronomy on torchlit sandbanks, and harmonize in Ayurvedic thalassotherapy.',
    highlight: 'Michelin Dining • Coral Conservation Diving',
  },
  {
    scene: '05',
    title: 'THE HORIZON',
    heading: 'Your escape is waiting.',
    body: 'As the golden sun descends behind the volcanic silhouette, your sanctuary stands ready to welcome you home.',
    highlight: 'Bespoke Concierge Awaits Your Arrival',
    showBookingCta: true,
  },
];

export const ScrollStory = () => {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { openBookingModal } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height - windowHeight;

      if (totalDist > 0) {
        const currentDist = -rect.top;
        const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);
        setScrollProgress(progress);

        const stepIndex = Math.min(
          Math.floor(progress * STORY_STEPS.length),
          STORY_STEPS.length - 1
        );
        setActiveStep(stepIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: '450vh', // Extended scroll track for smooth 3D storytelling
        background: '#040d0a',
      }}
      id="resort-story"
    >
      {/* 3D WebGL Camera Experience pinned to viewport */}
      <ScrollStoryScene scrollProgress={scrollProgress} />

      {/* Floating Story Card Overlay */}
      <div
        style={{
          position: 'sticky',
          top: '0',
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        <div className="container" style={{ width: '100%' }}>
          <div
            style={{
              maxWidth: '540px',
              pointerEvents: 'auto',
            }}
          >
            {STORY_STEPS.map((step, idx) => {
              if (idx !== activeStep) return null;
              return (
                <div
                  key={step.scene}
                  className="glass-panel"
                  style={{
                    padding: '36px 40px',
                    background: 'rgba(7, 20, 16, 0.88)',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75)',
                    animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'Cinzel, serif', color: 'var(--gold-400)', letterSpacing: '0.2em' }}>
                      SCENE {step.scene}
                    </span>
                    <span style={{ width: '24px', height: '1px', background: 'rgba(212, 175, 55, 0.4)' }} />
                    <span style={{ fontSize: '0.68rem', letterSpacing: '0.2em', color: 'var(--text-muted)' }}>
                      {step.title}
                    </span>
                  </div>

                  <h2
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                      color: '#ffffff',
                      lineHeight: 1.15,
                      marginBottom: '16px',
                      fontWeight: 500,
                    }}
                  >
                    "{step.heading}"
                  </h2>

                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.92rem',
                      lineHeight: 1.7,
                      marginBottom: '22px',
                    }}
                  >
                    {step.body}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 14px',
                      background: 'rgba(212, 175, 55, 0.08)',
                      borderRadius: '8px',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                      color: 'var(--gold-300)',
                      fontSize: '0.76rem',
                      marginBottom: step.showBookingCta ? '24px' : '0',
                    }}
                  >
                    <Sparkles size={14} color="#D4AF37" />
                    <span>{step.highlight}</span>
                  </div>

                  {step.showBookingCta && (
                    <button
                      onClick={() => openBookingModal(null)}
                      className="btn-gold"
                      data-cursor="BOOK"
                      style={{ width: '100%', padding: '15px' }}
                    >
                      <Calendar size={16} />
                      <span>BOOK YOUR SANCTUARY STAY</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Story Progress Timeline Indicators (Right Side) */}
      <div
        style={{
          position: 'fixed',
          right: '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        {STORY_STEPS.map((s, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              justifyContent: 'flex-end',
            }}
          >
            <span
              style={{
                fontSize: '0.62rem',
                color: activeStep === i ? 'var(--gold-300)' : 'transparent',
                fontFamily: 'Cinzel, serif',
                letterSpacing: '0.15em',
                transition: 'color 0.3s',
              }}
            >
              SCENE {s.scene}
            </span>
            <div
              style={{
                width: activeStep === i ? '24px' : '8px',
                height: '8px',
                borderRadius: '999px',
                background: activeStep === i ? 'var(--gold-500)' : 'rgba(255, 255, 255, 0.2)',
                boxShadow: activeStep === i ? '0 0 10px rgba(212, 175, 55, 0.6)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
