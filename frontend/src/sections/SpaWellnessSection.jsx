import React, { useState } from 'react';
import { INITIAL_SPA_TREATMENTS } from '../services/mockData';
import { Sparkles, Flower2, Waves, Flame, Clock, HeartHandshake, CheckCircle } from 'lucide-react';

export const SpaWellnessSection = () => {
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [bookedStatus, setBookedStatus] = useState(false);

  const spaFacilities = [
    { title: 'Volcanic Thalasso Pool', desc: 'Deep-ocean mineral hydrotherapy pools at 34°C overlooking the sea barrier.', icon: Waves },
    { title: 'Nordic Cedar & Eucalyptus Sauna', desc: 'Infrared organic cedar cabins with crushed eucalyptus aromatherapy.', icon: Flame },
    { title: 'Ayurvedic Botanical Steam', desc: 'Herbal vapor chambers infused with camphor, clove, and wild frankincense.', icon: Flower2 },
    { title: 'Cliffside Sound Bath Pavilions', desc: 'Open-air granite platforms for sunrise pranayama, sound therapy & hatha.', icon: Sparkles },
  ];

  const handleBookTreatment = (t) => {
    setSelectedTreatment(t);
    setBookedStatus(true);
    setTimeout(() => {
      setBookedStatus(false);
      setSelectedTreatment(null);
    }, 4000);
  };

  return (
    <section className="section-padding" style={{ position: 'relative', background: '#05120e' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px auto' }}>
          <span className="tagline-badge">
            <Sparkles size={13} color="#D4AF37" />
            HOLISTIC HEALING SANCTUARY
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
            Ananda Ayurvedic &amp; Thalasso Spa
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7' }}>
            Where ancient Vedic wisdom harmonizes with modern oceanic thalassotherapy. Immerse in tranquil soundscapes, heated saltwater circuits, and rare botanical elixirs.
          </p>
        </div>

        {/* Facilities Highlight Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            marginBottom: '60px',
          }}
        >
          {spaFacilities.map((fac) => {
            const Icon = fac.icon;
            return (
              <div
                key={fac.title}
                className="glass-panel"
                style={{
                  padding: '28px',
                  borderRadius: '16px',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  background: 'rgba(9, 25, 19, 0.7)',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'rgba(212, 175, 55, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px',
                  }}
                >
                  <Icon size={22} color="#D4AF37" />
                </div>
                <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.05rem', color: '#fff', marginBottom: '8px' }}>
                  {fac.title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                  {fac.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Signature Rituals Grid */}
        <h3
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '1.6rem',
            color: 'var(--gold-300)',
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          Signature Healing Rituals
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
          }}
        >
          {INITIAL_SPA_TREATMENTS.map((treatment) => (
            <div
              key={treatment.id}
              className="glass-panel"
              style={{
                borderRadius: '18px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    background: 'rgba(6, 17, 13, 0.85)',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '0.72rem',
                    color: 'var(--gold-300)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Clock size={12} />
                  <span>{treatment.duration}</span>
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h4
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '1.15rem',
                    color: '#fff',
                    marginBottom: '8px',
                  }}
                >
                  {treatment.name}
                </h4>
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.84rem',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    flex: 1,
                  }}
                >
                  {treatment.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: '1.25rem', color: 'var(--gold-400)', fontWeight: 600 }}>
                    ₹{treatment.price.toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => handleBookTreatment(treatment)}
                    data-cursor="RESERVE"
                    className="btn-outline-gold"
                    style={{ padding: '8px 18px', fontSize: '0.75rem' }}
                  >
                    RESERVE RITUAL
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Alert */}
        {bookedStatus && (
          <div
            style={{
              position: 'fixed',
              bottom: '30px',
              right: '30px',
              background: 'rgba(7, 20, 16, 0.95)',
              border: '1px solid var(--gold-500)',
              borderRadius: '12px',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              zIndex: 99999,
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
            }}
          >
            <CheckCircle size={22} color="#D4AF37" />
            <div>
              <p style={{ color: '#fff', fontSize: '0.88rem', fontWeight: 600 }}>Spa Ritual Reserved</p>
              <p style={{ color: 'var(--gold-300)', fontSize: '0.75rem' }}>
                {selectedTreatment?.name} scheduled with your concierge.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
