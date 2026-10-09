import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { useBooking } from '../context/BookingContext';
import { RoomViewer3D } from '../3d/RoomViewer3D';
import { Sparkles, Calendar, Users, Maximize2, Star, CheckCircle, ArrowLeft, ShieldCheck, Waves } from 'lucide-react';
import { INITIAL_ROOMS } from '../services/mockData';

export const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openBookingModal } = useBooking();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  // In-page booking panel dates
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Initialize dates
    const d1 = new Date(Date.now() + 86400000 * 3);
    const d2 = new Date(Date.now() + 86400000 * 6);
    setCheckIn(d1.toISOString().split('T')[0]);
    setCheckOut(d2.toISOString().split('T')[0]);

    apiService.getRoomById(id).then((data) => {
      setRoom(data || INITIAL_ROOMS[0]);
      setLoading(false);
    });
  }, [id]);

  if (loading || !room) {
    return (
      <div style={{ paddingTop: '150px', textAlign: 'center', minHeight: '80vh', color: 'var(--gold-300)' }}>
        <p>Loading villa sanctuary...</p>
      </div>
    );
  }

  // Calculate dynamic pricing
  const nights = Math.max(
    1,
    Math.ceil(
      Math.abs(new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    ) || 1
  );
  const pricePerNight = room.pricePerNight || 35000;
  const staySubtotal = nights * pricePerNight;
  const luxuryTax = Math.round(staySubtotal * 0.12);
  const totalStayCost = staySubtotal + luxuryTax;

  const galleryImages = room.gallery && room.gallery.length > 0 ? room.gallery : [room.imageUrl];

  const handleStartBooking = () => {
    openBookingModal(room);
  };

  return (
    <div style={{ paddingTop: '110px', minHeight: '100vh', background: '#05110d' }}>
      <div className="container" style={{ paddingBottom: '90px' }}>
        {/* Back navigation */}
        <div style={{ marginBottom: '24px' }}>
          <Link
            to="/rooms"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--gold-300)',
              textDecoration: 'none',
              fontSize: '0.85rem',
            }}
          >
            <ArrowLeft size={16} />
            <span>RETURN TO RESIDENCES</span>
          </Link>
        </div>

        {/* Title & Specs Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="tagline-badge">
                <Sparkles size={12} color="#D4AF37" />
                {room.roomType}
              </span>
              <span style={{ color: 'var(--gold-400)', fontSize: '0.82rem' }}>
                ★ {room.rating || 4.98} (42 Verified Reviews)
              </span>
            </div>
            <h1
              style={{
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                color: '#fff',
                marginBottom: '6px',
              }}
            >
              {room.name}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontStyle: 'italic' }}>
              {room.subtitle || `${room.viewType} • Cantilevered Lagoon Haven`}
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Sanctuary Investment
            </span>
            <p style={{ fontSize: '2.2rem', fontFamily: 'Cinzel, serif', color: 'var(--gold-400)', fontWeight: 600 }}>
              ₹{Number(pricePerNight).toLocaleString('en-IN')}{' '}
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>/ night</span>
            </p>
          </div>
        </div>

        {/* Large Cinematic Image Showcase & Gallery Thumbnails */}
        <div style={{ marginBottom: '40px' }}>
          <div
            style={{
              height: '520px',
              width: '100%',
              borderRadius: '24px',
              overflow: 'hidden',
              marginBottom: '16px',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              position: 'relative',
            }}
          >
            <img
              src={galleryImages[activeImageIndex] || room.imageUrl}
              alt={room.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {galleryImages.length > 1 && (
            <div style={{ display: 'flex', gap: '14px' }}>
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  style={{
                    width: '120px',
                    height: '80px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: activeImageIndex === i ? '2px solid var(--gold-500)' : '1px solid rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                    opacity: activeImageIndex === i ? 1 : 0.6,
                    transition: 'all 0.2s',
                  }}
                >
                  <img src={img} alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3D Interactive Room Inspection Section */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', color: '#fff' }}>
              Interactive 3D Room Suite Explorer
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Inspect bed craftsmanship, concealed cinema displays, marble hydrotherapy bath, and oceanfront terrace
            </p>
          </div>
          <RoomViewer3D />
        </div>

        {/* Details & Dynamic Booking Panel Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr',
            gap: '40px',
            alignItems: 'flex-start',
          }}
          className="room-detail-grid"
        >
          {/* Left Column: Description & Amenities */}
          <div>
            <div className="glass-panel" style={{ padding: '36px', marginBottom: '32px' }}>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', color: '#fff', marginBottom: '16px' }}>
                Sanctuary Overview
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '28px' }}>
                {room.description}
              </p>

              {/* Specifications Matrix */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  padding: '20px',
                  background: 'rgba(212, 175, 55, 0.06)',
                  borderRadius: '14px',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    CAPACITY
                  </span>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>
                    Up to {room.capacity} Guests
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    INTERIOR LIVING
                  </span>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>
                    {room.sizeSqft || 1400} Sq Ft
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    VANTAGE VIEW
                  </span>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>
                    {room.viewType}
                  </p>
                </div>
              </div>
            </div>

            {/* In-Villa Amenities */}
            <div className="glass-panel" style={{ padding: '36px' }}>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', color: '#fff', marginBottom: '20px' }}>
                Curated Amenities &amp; Services
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px',
                }}
              >
                {room.amenities?.map((am) => (
                  <div key={am} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                    <CheckCircle size={16} color="#D4AF37" />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Booking Panel */}
          <div
            className="glass-panel"
            style={{
              padding: '36px',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              background: 'rgba(7, 20, 16, 0.94)',
              position: 'sticky',
              top: '100px',
            }}
          >
            <div style={{ marginBottom: '20px', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '16px' }}>
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--gold-400)', textTransform: 'uppercase' }}>
                DIRECT RESERVATION
              </span>
              <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem', color: '#fff', marginTop: '4px' }}>
                Book This Villa
              </h4>
            </div>

            {/* Dates Inputs */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                CHECK-IN DATE
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="luxury-input"
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                CHECK-OUT DATE
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="luxury-input"
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                GUESTS
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="luxury-input"
              >
                <option value={1} style={{ background: '#0a1c16' }}>1 Guest</option>
                <option value={2} style={{ background: '#0a1c16' }}>2 Guests</option>
                <option value={3} style={{ background: '#0a1c16' }}>3 Guests</option>
                <option value={4} style={{ background: '#0a1c16' }}>4 Guests</option>
                <option value={6} style={{ background: '#0a1c16' }}>6 Guests (Family)</option>
              </select>
            </div>

            {/* Dynamic Calculation Block */}
            <div
              style={{
                background: 'rgba(212, 175, 55, 0.06)',
                borderRadius: '12px',
                padding: '18px',
                marginBottom: '26px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                <span>{nights} {nights === 1 ? 'Night' : 'Nights'} × ₹{pricePerNight.toLocaleString('en-IN')}</span>
                <span>₹{staySubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                <span>Hospitality GST (12%)</span>
                <span>₹{luxuryTax.toLocaleString('en-IN')}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                  paddingTop: '12px',
                  fontWeight: 600,
                  fontSize: '1.25rem',
                  color: '#fff',
                }}
              >
                <span>Total Investment</span>
                <span style={{ color: 'var(--gold-400)', fontFamily: 'Cinzel, serif' }}>
                  ₹{totalStayCost.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={handleStartBooking}
              data-cursor="BOOK"
              className="btn-gold"
              style={{ width: '100%', padding: '16px' }}
            >
              <Calendar size={16} />
              <span>CONFIRM BOOKING</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .room-detail-grid { grid-templateColumns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
