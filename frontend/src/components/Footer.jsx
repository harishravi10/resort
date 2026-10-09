import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Phone, Mail, Award, ArrowRight, Compass } from 'lucide-react';

export const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer
      style={{
        background: '#040d0a',
        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
        paddingTop: '80px',
        paddingBottom: '40px',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      {/* Background radial glow */}
      <div
        className="ambient-glow ambient-gold"
        style={{ top: '-150px', left: '50%', transform: 'translateX(-50%)' }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '48px',
            marginBottom: '60px',
          }}
        >
          {/* Column 1: Monogram & Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '1px solid var(--gold-500)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(212, 175, 55, 0.1)',
                }}
              >
                <Sparkles size={20} color="#D4AF37" />
              </div>
              <span
                style={{
                  fontFamily: 'Cinzel, Georgia, serif',
                  fontSize: '1.4rem',
                  letterSpacing: '0.25em',
                  color: '#fff',
                }}
              >
                AURELIA
              </span>
            </div>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.7',
                marginBottom: '20px',
              }}
            >
              Where untouched ancient rainforest seamlessly merges with crystal ocean atolls. An enclave of bespoke luxury, architectural tranquility, and wild wonder.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-400)', fontSize: '0.78rem' }}>
              <MapPin size={15} />
              <span>Aurelia Sanctuary Atoll • 07°14'22"S 72°28'15"E</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '1rem',
                color: 'var(--gold-300)',
                letterSpacing: '0.15em',
                marginBottom: '20px',
              }}
            >
              DISCOVER SANCTUARY
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Private Villas & Suites', path: '/rooms' },
                { name: 'Gastronomy & Cellars', path: '/dining' },
                { name: 'Ayurvedic & Thalasso Spa', path: '/spa' },
                { name: 'Island Expeditions', path: '/activities' },
                { name: 'Private Jet & Seaplane Charter', path: '/rooms' },
                { name: 'Sustainability & Conservation', path: '/' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    data-cursor="VIEW"
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-400)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Accolades */}
          <div>
            <h4
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '1rem',
                color: 'var(--gold-300)',
                letterSpacing: '0.15em',
                marginBottom: '20px',
              }}
            >
              RECOGNITIONS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Award size={20} color="#D4AF37" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>Condé Nast Traveler 2026</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Top 10 Ultra-Luxury Ocean Resorts</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Award size={20} color="#D4AF37" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>World Luxury Hotel Awards</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Best Eco-Architectural Design</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Award size={20} color="#D4AF37" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>Michelin Guide 2026</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Azure Fine Dining Recognition</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter Gazette */}
          <div>
            <h4
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '1rem',
                color: 'var(--gold-300)',
                letterSpacing: '0.15em',
                marginBottom: '16px',
              }}
            >
              THE AURELIA CHRONICLES
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>
              Receive seasonal private escapes, sommelier harvest invitations, and secluded villa offers.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', position: 'relative' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="luxury-input"
                  style={{ paddingRight: '48px', fontSize: '0.85rem' }}
                />
                <button
                  type="submit"
                  style={{
                    position: 'absolute',
                    right: '6px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'var(--gold-gradient)',
                    border: 'none',
                    borderRadius: '8px',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#06110d',
                    cursor: 'pointer',
                  }}
                >
                  <ArrowRight size={16} />
                </button>
              </div>
              {subscribed && (
                <p style={{ color: 'var(--gold-300)', fontSize: '0.78rem' }}>
                  ✓ Welcome to the private chronicles.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(212, 175, 55, 0.12)',
            paddingTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
          }}
        >
          <p>© 2026 AURELIA RESORT &amp; NATURE RETREAT. ALL RIGHTS RESERVED.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>PRIVACY DISCRETION</span>
            <span>TERMS OF RESIDENCE</span>
            <span>MARITIME SANCTUARY CHARTER</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
