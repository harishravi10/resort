import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { apiService } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  Compass,
  Award,
  User,
  XCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  LogOut,
  BedDouble,
  Heart
} from 'lucide-react';

export const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { openBookingModal } = useBooking();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings'); // bookings, saved, rewards, profile
  const [cancellingId, setCancellingId] = useState(null);
  const [cancelModalBooking, setCancelModalBooking] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    apiService.getMyBookings().then((data) => {
      if (data) setBookings(data);
    });
  }, []);

  const handleCancelBooking = async (id) => {
    setCancellingId(id);
    await apiService.cancelBooking(id);
    const updated = await apiService.getMyBookings();
    setBookings(updated);
    setCancellingId(null);
    setCancelModalBooking(null);
  };

  const upcomingBookings = bookings.filter((b) => b.status === 'CONFIRMED');
  const pastBookings = bookings.filter((b) => b.status === 'COMPLETED');
  const cancelledBookings = bookings.filter((b) => b.status === 'CANCELLED');

  const displayName = user ? user.name : 'Harish Kumar';

  // Security Guard: Guest must be logged in to view their stay portfolio
  if (!user) {
    return (
      <div
        style={{
          paddingTop: '160px',
          paddingBottom: '100px',
          minHeight: '100vh',
          background: 'radial-gradient(circle at 50% 20%, #0d2820 0%, #05110d 80%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="glass-panel"
          style={{
            maxWidth: '500px',
            width: '90%',
            padding: '44px 32px',
            textAlign: 'center',
            borderRadius: '24px',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            background: 'rgba(7, 20, 16, 0.96)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <User size={26} color="#D4AF37" />
          </div>

          <span className="tagline-badge" style={{ marginBottom: '12px' }}>
            <Sparkles size={12} color="#D4AF37" />
            RESIDENT SIGN-IN REQUIRED
          </span>

          <h2
            style={{
              fontFamily: 'Cinzel, Georgia, serif',
              fontSize: '1.7rem',
              color: '#fff',
              marginBottom: '10px',
            }}
          >
            Access Your Stay Portfolio
          </h2>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.88rem',
              lineHeight: 1.6,
              marginBottom: '26px',
            }}
          >
            Please sign in to view your confirmed villa reservations, upcoming seaplane arrival schedules, and sovereign resident privileges.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => navigate('/login')}
              className="btn-gold"
              data-cursor="LOGIN"
              style={{ width: '100%', padding: '14px', fontSize: '0.82rem' }}
            >
              Sign In to Portfolio
            </button>
            <button
              onClick={() => navigate('/register')}
              className="btn-outline-gold"
              data-cursor="REGISTER"
              style={{ width: '100%', padding: '12px', fontSize: '0.8rem' }}
            >
              Enroll as New Sovereign Member
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh', background: '#05110d' }}>
      <div className="container" style={{ paddingBottom: '90px' }}>
        {/* Welcome Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="tagline-badge">
                <Sparkles size={12} color="#D4AF37" />
                PRIVATE RESIDENT CONCIERGE
              </span>
            </div>
            <h1
              style={{
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                color: '#fff',
                marginBottom: '6px',
              }}
            >
              Welcome back, {displayName}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Aurelia Sovereign Member • Preferred Guest ID: {user?.id?.slice(0, 8) || 'AUR-007'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => openBookingModal(null)}
              className="btn-gold"
              data-cursor="BOOK"
              style={{ padding: '12px 26px', fontSize: '0.8rem' }}
            >
              <Calendar size={15} />
              <span>BOOK NEW ESCAPE</span>
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="btn-outline-gold"
              style={{ padding: '12px 20px', fontSize: '0.8rem' }}
            >
              <LogOut size={15} />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>

        {/* Dashboard Overview Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            className="glass-panel"
            onClick={() => setActiveTab('bookings')}
            style={{ padding: '24px', cursor: 'pointer', border: activeTab === 'bookings' ? '1px solid var(--gold-500)' : '1px solid var(--border-subtle)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold-400)', letterSpacing: '0.1em' }}>UPCOMING STAY</span>
              <Calendar size={18} color="#D4AF37" />
            </div>
            <p style={{ fontSize: '1.8rem', fontFamily: 'Cinzel, serif', color: '#fff', fontWeight: 600 }}>
              {upcomingBookings.length}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>Confirmed Sanctuary Stays</p>
          </div>

          <div
            className="glass-panel"
            onClick={() => setActiveTab('bookings')}
            style={{ padding: '24px', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold-400)', letterSpacing: '0.1em' }}>PREVIOUS STAYS</span>
              <Clock size={18} color="#D4AF37" />
            </div>
            <p style={{ fontSize: '1.8rem', fontFamily: 'Cinzel, serif', color: '#fff', fontWeight: 600 }}>
              {pastBookings.length || 1}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>Completed Island Visits</p>
          </div>

          <div
            className="glass-panel"
            onClick={() => setActiveTab('saved')}
            style={{ padding: '24px', cursor: 'pointer', border: activeTab === 'saved' ? '1px solid var(--gold-500)' : '1px solid var(--border-subtle)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold-400)', letterSpacing: '0.1em' }}>SAVED VILLAS</span>
              <Heart size={18} color="#D4AF37" />
            </div>
            <p style={{ fontSize: '1.8rem', fontFamily: 'Cinzel, serif', color: '#fff', fontWeight: 600 }}>3</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>Curated Wishlist</p>
          </div>

          <div
            className="glass-panel"
            onClick={() => setActiveTab('rewards')}
            style={{ padding: '24px', cursor: 'pointer', border: activeTab === 'rewards' ? '1px solid var(--gold-500)' : '1px solid var(--border-subtle)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold-400)', letterSpacing: '0.1em' }}>AURELIA REWARDS</span>
              <Award size={18} color="#D4AF37" />
            </div>
            <p style={{ fontSize: '1.8rem', fontFamily: 'Cinzel, serif', color: 'var(--gold-400)', fontWeight: 600 }}>
              Tier: Sovereign
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>Complimentary Seaplane Upgrades</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '16px' }}>
          {[
            { id: 'bookings', label: 'My Sanctuary Bookings' },
            { id: 'saved', label: 'Saved Villas & Suites' },
            { id: 'rewards', label: 'Resident Privileges' },
            { id: 'profile', label: 'Concierge Profile' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: activeTab === tab.id ? 'var(--gold-300)' : 'var(--text-muted)',
                fontFamily: 'Cinzel, serif',
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
                padding: '6px 16px',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid var(--gold-500)' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENT 1: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', color: '#fff', marginBottom: '20px' }}>
              Reservation Portfolio
            </h3>

            {bookings.length === 0 ? (
              <div className="glass-panel" style={{ padding: '48px', textAlign: 'center' }}>
                <Calendar size={48} color="#D4AF37" style={{ margin: '0 auto 16px auto', opacity: 0.6 }} />
                <h4 style={{ color: '#fff', fontFamily: 'Cinzel, serif' }}>No active bookings found</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px', marginBottom: '24px' }}>
                  Explore our private residences and immerse in pure barefoot luxury.
                </p>
                <button onClick={() => openBookingModal(null)} className="btn-gold">
                  RESERVE YOUR STAY
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {bookings.map((b) => {
                  const isConfirmed = b.status === 'CONFIRMED';
                  const isCancelled = b.status === 'CANCELLED';

                  return (
                    <div
                      key={b.id}
                      className="glass-panel booking-row-grid"
                      style={{
                        padding: '28px',
                        display: 'grid',
                        gridTemplateColumns: '120px 2fr 1.5fr 1fr',
                        alignItems: 'center',
                        gap: '24px',
                        borderRadius: '16px',
                        border: isCancelled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(212, 175, 55, 0.3)',
                        opacity: isCancelled ? 0.65 : 1,
                      }}
                    >
                      {/* Image Preview */}
                      <div style={{ height: '90px', borderRadius: '12px', overflow: 'hidden' }}>
                        <img
                          src={b.roomImage || 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80'}
                          alt={b.roomName}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>

                      {/* Room & Booking Code */}
                      <div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--gold-400)', letterSpacing: '0.15em' }}>
                          ID: {b.id}
                        </span>
                        <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.25rem', color: '#fff', marginTop: '2px' }}>
                          {b.roomName}
                        </h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                          {b.guests} Guests • {b.roomType || 'Villa'}
                        </p>
                        {b.specialRequests && (
                          <p style={{ color: 'var(--gold-300)', fontSize: '0.72rem', marginTop: '4px', fontStyle: 'italic' }}>
                            Req: {b.specialRequests.slice(0, 60)}...
                          </p>
                        )}
                      </div>

                      {/* Dates & Financials */}
                      <div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                          <strong>Check-in:</strong> {b.checkIn}
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                          <strong>Check-out:</strong> {b.checkOut}
                        </p>
                        <p style={{ color: 'var(--gold-400)', fontFamily: 'Cinzel, serif', fontWeight: 600, fontSize: '1.1rem', marginTop: '6px' }}>
                          ₹{Number(b.totalPrice).toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Status & Cancel Action */}
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                        <span
                          style={{
                            padding: '4px 12px',
                            borderRadius: '999px',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            background: isConfirmed ? 'rgba(72, 187, 120, 0.15)' : isCancelled ? 'rgba(239, 68, 68, 0.15)' : 'rgba(212, 175, 55, 0.15)',
                            color: isConfirmed ? '#48bb78' : isCancelled ? '#ef4444' : 'var(--gold-400)',
                            border: `1px solid ${isConfirmed ? '#48bb78' : isCancelled ? '#ef4444' : 'var(--gold-400)'}`,
                          }}
                        >
                          {b.status}
                        </span>

                        {isConfirmed && (
                          <button
                            onClick={() => setCancelModalBooking(b)}
                            className="btn-outline-gold"
                            style={{
                              padding: '6px 14px',
                              fontSize: '0.72rem',
                              borderColor: 'rgba(239, 68, 68, 0.4)',
                              color: '#fc8181',
                            }}
                          >
                            CANCEL STAY
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SAVED VILLAS */}
        {activeTab === 'saved' && (
          <div className="glass-panel" style={{ padding: '36px' }}>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', color: '#fff', marginBottom: '20px' }}>
              Your Saved Sanctuaries
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div style={{ background: 'rgba(10, 28, 22, 0.6)', borderRadius: '14px', padding: '18px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <h4 style={{ color: '#fff', fontFamily: 'Cinzel, serif' }}>Presidential Ocean Pavilion</h4>
                <p style={{ color: 'var(--gold-400)', fontSize: '0.88rem' }}>₹75,000 / night</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '4px' }}>Saved for New Year celebration</p>
              </div>
              <div style={{ background: 'rgba(10, 28, 22, 0.6)', borderRadius: '14px', padding: '18px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <h4 style={{ color: '#fff', fontFamily: 'Cinzel, serif' }}>Emerald Ridge Penthouse</h4>
                <p style={{ color: 'var(--gold-400)', fontSize: '0.88rem' }}>₹68,000 / night</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '4px' }}>Saved for Anniversary</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REWARDS */}
        {activeTab === 'rewards' && (
          <div className="glass-panel" style={{ padding: '36px' }}>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', color: '#fff', marginBottom: '16px' }}>
              Aurelia Sovereign Privileges
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
              As a recognized sovereign resident, you enjoy discrete luxury amenities on every stay.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '16px', background: 'rgba(212, 175, 55, 0.08)', borderRadius: '12px' }}>
                <p style={{ color: '#fff', fontWeight: 600 }}>✓ Guaranteed 12:00 Early Check-In</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Direct ocean villa readiness upon arrival</p>
              </div>
              <div style={{ padding: '16px', background: 'rgba(212, 175, 55, 0.08)', borderRadius: '12px' }}>
                <p style={{ color: '#fff', fontWeight: 600 }}>✓ Seaplane Terminal VIP Lounge</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Private champagne bar transit greeting</p>
              </div>
              <div style={{ padding: '16px', background: 'rgba(212, 175, 55, 0.08)', borderRadius: '12px' }}>
                <p style={{ color: '#fff', fontWeight: 600 }}>✓ Complimentary Spa Hydrotherapy</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Unlimited thalasso pool access</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === 'profile' && (
          <div className="glass-panel" style={{ padding: '36px', maxWidth: '600px' }}>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', color: '#fff', marginBottom: '20px' }}>
              Resident Concierge Profile
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--gold-400)' }}>LEGAL FULL NAME</span>
                <p style={{ color: '#fff', fontSize: '1rem', fontWeight: 500 }}>{displayName}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--gold-400)' }}>EMAIL ADDRESS</span>
                <p style={{ color: '#fff', fontSize: '1rem', fontWeight: 500 }}>{user?.email || 'harish@example.com'}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--gold-400)' }}>PHONE CONTACT</span>
                <p style={{ color: '#fff', fontSize: '1rem', fontWeight: 500 }}>{user?.phone || '+91 98123 45678'}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--gold-400)' }}>SANCTUARY ROLE</span>
                <p style={{ color: 'var(--gold-300)', fontSize: '0.9rem', fontWeight: 600 }}>{user?.role || 'RESIDENT'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Cancellation Confirmation Modal */}
        {cancelModalBooking && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(3, 10, 7, 0.85)',
              backdropFilter: 'blur(16px)',
              zIndex: 100000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <div
              className="glass-panel"
              style={{
                width: '100%',
                maxWidth: '480px',
                padding: '36px',
                background: 'rgba(7, 20, 16, 0.96)',
                border: '1px solid #ef4444',
                borderRadius: '20px',
                textAlign: 'center',
              }}
            >
              <XCircle size={44} color="#ef4444" style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', color: '#fff' }}>
                Cancel Reservation?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '12px 0 24px 0' }}>
                Are you sure you wish to cancel stay for <strong>{cancelModalBooking.roomName}</strong> ({cancelModalBooking.id})? This will release the villa back to inventory.
              </p>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setCancelModalBooking(null)}
                  className="btn-outline-gold"
                  style={{ flex: 1 }}
                >
                  KEEP STAY
                </button>
                <button
                  onClick={() => handleCancelBooking(cancelModalBooking.id)}
                  style={{
                    flex: 1,
                    background: '#e53e3e',
                    border: 'none',
                    borderRadius: '999px',
                    color: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '12px',
                  }}
                >
                  {cancellingId ? 'CANCELLING...' : 'CONFIRM CANCEL'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 850px) {
          .booking-row-grid { grid-templateColumns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
