import React, { useState } from 'react';
import { INITIAL_RESTAURANTS } from '../services/mockData';
import { Sparkles, UtensilsCrossed, Clock, Shirt, Calendar, CheckCircle } from 'lucide-react';

export const Dining = () => {
  const [selectedRest, setSelectedRest] = useState(INITIAL_RESTAURANTS[0]);
  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('19:30');
  const [reserved, setReserved] = useState(false);

  const handleReserve = (e) => {
    e.preventDefault();
    setReserved(true);
    setTimeout(() => setReserved(false), 4000);
  };

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh', background: '#05110d' }}>
      <div className="container" style={{ paddingBottom: '90px' }}>
        {/* Banner */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px auto' }}>
          <span className="tagline-badge">
            <Sparkles size={13} color="#D4AF37" />
            MICHELIN-STARRED GASTRONOMY
          </span>
          <h1
            style={{
              fontFamily: 'Cinzel, Georgia, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: '#ffffff',
              letterSpacing: '0.08em',
              marginBottom: '18px',
            }}
          >
            Sanctuary Dining &amp; Cellars
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
            Four visionary culinary worlds honoring sustainable sea treasures, heirloom orchard harvests, and aromatic open charcoal.
          </p>
        </div>

        {/* Restaurant Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', marginBottom: '80px' }}>
          {INITIAL_RESTAURANTS.map((rest, idx) => (
            <div
              key={rest.name}
              className="glass-panel"
              style={{
                display: 'grid',
                gridTemplateColumns: idx % 2 === 0 ? '1.2fr 1fr' : '1fr 1.2fr',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(212, 175, 55, 0.3)',
              }}
              className="dining-page-card"
            >
              <div
                style={{
                  order: idx % 2 === 0 ? 1 : 2,
                  minHeight: '380px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={rest.imageUrl}
                  alt={rest.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div
                style={{
                  order: idx % 2 === 0 ? 2 : 1,
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '0.75rem', color: 'var(--gold-400)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  {rest.cuisine}
                </span>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.2rem', color: '#fff', margin: '8px 0 12px 0' }}>
                  {rest.name}
                </h2>
                <p style={{ color: 'var(--gold-300)', fontStyle: 'italic', fontSize: '0.95rem', marginBottom: '14px' }}>
                  "{rest.tagline}"
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '20px' }}>
                  {rest.description}
                </p>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '24px' }}>
                  <p>Lead: {rest.chef}</p>
                  <p>Timings: {rest.timings} • Dress: {rest.dressCode}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedRest(rest);
                    document.getElementById('table-reservation').scrollIntoView({ behavior: 'smooth' });
                  }}
                  data-cursor="RESERVE"
                  className="btn-gold"
                  style={{ width: 'fit-content' }}
                >
                  RESERVE A TABLE AT {rest.name.toUpperCase()}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Table Reservation Box */}
        <div
          id="table-reservation"
          className="glass-panel"
          style={{
            maxWidth: '750px',
            margin: '0 auto',
            padding: '48px',
            borderRadius: '24px',
            border: '1px solid var(--gold-500)',
            background: 'rgba(7, 20, 16, 0.95)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="tagline-badge">
              <Sparkles size={12} color="#D4AF37" />
              TABLE CONCIERGE
            </span>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.8rem', color: '#fff' }}>
              Reserve Your Culinary Table
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Currently reserving: <strong style={{ color: 'var(--gold-300)' }}>{selectedRest.name}</strong>
            </p>
          </div>

          <form onSubmit={handleReserve}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                  RESTAURANT VENUE
                </label>
                <select
                  value={selectedRest.name}
                  onChange={(e) => setSelectedRest(INITIAL_RESTAURANTS.find((r) => r.name === e.target.value))}
                  className="luxury-input"
                >
                  {INITIAL_RESTAURANTS.map((r) => (
                    <option key={r.name} value={r.name} style={{ background: '#0a1c16' }}>
                      {r.name} ({r.cuisine})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                  GUEST COUNT
                </label>
                <select
                  value={partySize}
                  onChange={(e) => setPartySize(Number(e.target.value))}
                  className="luxury-input"
                >
                  <option value={2} style={{ background: '#0a1c16' }}>2 Guests (Intimate Table)</option>
                  <option value={4} style={{ background: '#0a1c16' }}>4 Guests</option>
                  <option value={6} style={{ background: '#0a1c16' }}>6 Guests (Private Alcove)</option>
                  <option value={8} style={{ background: '#0a1c16' }}>8+ Guests (Sommelier Table)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '28px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                  DATE
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="luxury-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                  PREFERRED TIME
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="luxury-input"
                >
                  <option value="18:30" style={{ background: '#0a1c16' }}>18:30 (Sunset Seating)</option>
                  <option value="19:30" style={{ background: '#0a1c16' }}>19:30 (Prime Seating)</option>
                  <option value="20:30" style={{ background: '#0a1c16' }}>20:30 (Late Starlight)</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-gold" style={{ width: '100%', padding: '16px' }}>
              <span>CONFIRM TABLE RESERVATION</span>
            </button>
          </form>

          {reserved && (
            <div
              style={{
                marginTop: '20px',
                padding: '16px',
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid var(--gold-500)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <CheckCircle size={20} color="#D4AF37" />
              <p style={{ color: '#fff', fontSize: '0.88rem' }}>
                Your table at <strong>{selectedRest.name}</strong> for {partySize} guests is confirmed for {date} at {time}.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dining-page-card { grid-templateColumns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
