import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { INITIAL_ACTIVITIES } from '../services/mockData';
import { Sparkles, Clock, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export const ExperiencesSection = () => {
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  useEffect(() => {
    apiService.getActivities().then((data) => {
      if (data && data.length) setActivities(data);
    });
  }, []);

  const handleBookExp = (act) => {
    setBookingSuccess(act.name);
    setTimeout(() => setBookingSuccess(null), 4000);
  };

  return (
    <section className="section-padding" style={{ position: 'relative', background: '#05110d' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px auto' }}>
          <span className="tagline-badge">
            <Sparkles size={13} color="#D4AF37" />
            EXPEDITIONS &amp; DISCOVERY
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
            Curated Resort Experiences
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7' }}>
            From diving pristine deep trenches with marine biologists to sunset catamaran charters with vintage champagne.
          </p>
        </div>

        {/* Activities Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
          }}
        >
          {activities.map((act) => (
            <div
              key={act.id}
              className="glass-panel"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
              data-cursor="EXPEDITION"
            >
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={act.imageUrl}
                  alt={act.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'rgba(6, 17, 13, 0.85)',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    fontSize: '0.72rem',
                    color: 'var(--gold-300)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {act.category || 'Adventure'}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    right: '16px',
                    background: 'rgba(6, 17, 13, 0.85)',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '0.72rem',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Clock size={12} color="#D4AF37" />
                  <span>{act.duration}</span>
                </div>
              </div>

              <div style={{ padding: '26px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '1.25rem',
                    color: '#fff',
                    marginBottom: '8px',
                  }}
                >
                  {act.name}
                </h3>

                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.86rem',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    flex: 1,
                  }}
                >
                  {act.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Experience Fee
                    </span>
                    <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1.25rem', color: 'var(--gold-400)', fontWeight: 600 }}>
                      ₹{Number(act.price).toLocaleString('en-IN')}{' '}
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>/ guest</span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleBookExp(act)}
                    data-cursor="BOOK"
                    className="btn-gold"
                    style={{ padding: '10px 22px', fontSize: '0.75rem' }}
                  >
                    <span>BOOK</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Toast Alert */}
        {bookingSuccess && (
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
            <CheckCircle2 size={22} color="#D4AF37" />
            <div>
              <p style={{ color: '#fff', fontSize: '0.88rem', fontWeight: 600 }}>Expedition Confirmed</p>
              <p style={{ color: 'var(--gold-300)', fontSize: '0.75rem' }}>
                {bookingSuccess} added to your personal sanctuary itinerary.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
