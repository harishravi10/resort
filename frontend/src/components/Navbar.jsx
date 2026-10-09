import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { Compass, Menu, X, User, Shield, Calendar, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();
  const { openBookingModal } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'STAY', path: '/rooms' },
    { name: 'DINE', path: '/dining' },
    { name: 'SPA', path: '/spa' },
    { name: 'EXPERIENCES', path: '/activities' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: scrolled ? '12px' : '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: scrolled ? '94%' : '90%',
          maxWidth: '1360px',
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          style={{
            background: scrolled ? 'rgba(6, 17, 13, 0.88)' : 'rgba(8, 22, 17, 0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(212, 175, 55, 0.22)',
            borderRadius: '999px',
            padding: '12px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Brand Monogram */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              color: '#fff',
            }}
            data-cursor="AURELIA"
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(212, 175, 55, 0.1)',
              }}
            >
              <Sparkles size={18} color="#D4AF37" />
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'Cinzel, Georgia, serif',
                  fontSize: '1.25rem',
                  letterSpacing: '0.22em',
                  fontWeight: 600,
                  color: '#fff',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                AURELIA
              </span>
              <span
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.3em',
                  color: 'var(--gold-400)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginTop: '2px',
                }}
              >
                Nature Retreat
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
            }}
            className="desktop-nav-menu"
          >
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  data-cursor="VIEW"
                  style={{
                    color: active ? 'var(--gold-300)' : 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    letterSpacing: '0.18em',
                    fontWeight: active ? '600' : '500',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    padding: '6px 2px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-400)')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = active ? 'var(--gold-300)' : 'rgba(255, 255, 255, 0.8)')
                  }
                >
                  {link.name}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '16px',
                        height: '2px',
                        background: 'var(--gold-500)',
                        borderRadius: '2px',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Book Now Button */}
            <button
              onClick={() => openBookingModal(null)}
              data-cursor="BOOK"
              className="btn-gold"
              style={{
                padding: '9px 22px',
                fontSize: '0.75rem',
                letterSpacing: '0.16em',
              }}
            >
              <Calendar size={14} />
              <span>BOOK STAY</span>
            </button>

            {/* User Profile / Dashboard Link */}
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Link
                  to={isAdmin ? '/admin' : '/dashboard'}
                  data-cursor={isAdmin ? 'ADMIN' : 'ACCOUNT'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '999px',
                    color: 'var(--gold-300)',
                    textDecoration: 'none',
                    fontSize: '0.78rem',
                  }}
                >
                  {isAdmin ? <Shield size={14} color="#D4AF37" /> : <User size={14} color="#D4AF37" />}
                  <span>{user.name.split(' ')[0]}</span>
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                data-cursor="SIGN IN"
                className="btn-outline-gold"
                style={{
                  padding: '8px 18px',
                  fontSize: '0.75rem',
                  letterSpacing: '0.14em',
                }}
              >
                LOGIN
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                display: 'none',
              }}
              className="mobile-nav-toggle"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 15, 11, 0.96)',
            backdropFilter: 'blur(24px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '28px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '2rem',
                letterSpacing: '0.25em',
                color: '#fff',
              }}
            >
              AURELIA
            </span>
            <p style={{ color: 'var(--gold-400)', fontSize: '0.75rem', letterSpacing: '0.3em' }}>
              WHERE LUXURY MEETS THE WILD
            </p>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              style={{
                color: location.pathname === link.path ? 'var(--gold-300)' : '#fff',
                fontSize: '1.25rem',
                fontFamily: 'Cinzel, serif',
                letterSpacing: '0.2em',
                textDecoration: 'none',
              }}
            >
              {link.name}
            </Link>
          ))}

          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '14px', width: '220px' }}>
            <button
              onClick={() => {
                setMobileOpen(false);
                openBookingModal(null);
              }}
              className="btn-gold"
              style={{ width: '100%' }}
            >
              BOOK YOUR STAY
            </button>
            {user ? (
              <Link
                to={isAdmin ? '/admin' : '/dashboard'}
                onClick={() => setMobileOpen(false)}
                className="btn-outline-gold"
                style={{ width: '100%', textAlign: 'center' }}
              >
                MY DASHBOARD
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="btn-outline-gold"
                style={{ width: '100%', textAlign: 'center' }}
              >
                LOGIN / REGISTER
              </Link>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 992px) {
          .desktop-nav-menu { display: none !important; }
          .mobile-nav-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
};
