import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { useBooking } from '../context/BookingContext';
import { INITIAL_ROOMS } from '../services/mockData';
import { Sparkles, Eye, Calendar, Users, Maximize2, Star, Check } from 'lucide-react';

export const Rooms = () => {
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [activeType, setActiveType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { openBookingModal } = useBooking();

  useEffect(() => {
    window.scrollTo(0, 0);
    apiService.getRooms().then((data) => {
      if (data && data.length) setRooms(data);
    });
  }, []);

  const types = ['All', 'Villa', 'Suite', 'Pavilion', 'Presidential'];

  const filtered = rooms.filter((r) => {
    const matchesType = activeType === 'All' || r.roomType.toLowerCase() === activeType.toLowerCase();
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.viewType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh', background: '#05110d' }}>
      <div className="container" style={{ paddingBottom: '90px' }}>
        {/* Page Header Banner */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px auto' }}>
          <span className="tagline-badge">
            <Sparkles size={13} color="#D4AF37" />
            EXCLUSIVE HABITATS
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
            The Residences &amp; Villas
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
            Ten architectural sanctuaries suspended between emerald rainforest and the Indian Ocean. Designed with natural raw materials, private infinity plunge pools, and uninterrupted horizons.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px',
            background: 'rgba(7, 20, 16, 0.75)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: '999px',
            padding: '10px 20px',
          }}
        >
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                data-cursor="FILTER"
                style={{
                  background: activeType === t ? 'var(--gold-gradient)' : 'transparent',
                  color: activeType === t ? '#06110d' : 'var(--gold-300)',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '8px 20px',
                  fontSize: '0.78rem',
                  fontWeight: activeType === t ? 700 : 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div style={{ minWidth: '240px', flex: 1, maxWidth: '350px' }}>
            <input
              type="text"
              placeholder="Search by view, feature or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="luxury-input"
              style={{ padding: '8px 16px', fontSize: '0.82rem', borderRadius: '999px' }}
            />
          </div>
        </div>

        {/* Grid of Room Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '36px',
          }}
        >
          {filtered.map((room) => (
            <div
              key={room.id}
              className="glass-panel"
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Cinematic Image Frame */}
              <div style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '18px',
                    left: '18px',
                    background: 'rgba(6, 17, 13, 0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '999px',
                    padding: '5px 14px',
                    fontSize: '0.72rem',
                    color: 'var(--gold-300)',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {room.roomType}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: '18px',
                    right: '18px',
                    background: 'rgba(6, 17, 13, 0.85)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '999px',
                    padding: '5px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#fff',
                    fontSize: '0.75rem',
                  }}
                >
                  <Star size={13} color="#D4AF37" fill="#D4AF37" />
                  <span>{room.rating || 4.95}</span>
                </div>
              </div>

              {/* Content Details */}
              <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '14px' }}>
                  <h3
                    style={{
                      fontFamily: 'Cinzel, serif',
                      fontSize: '1.5rem',
                      color: '#ffffff',
                      marginBottom: '4px',
                    }}
                  >
                    {room.name}
                  </h3>
                  <p style={{ color: 'var(--gold-300)', fontSize: '0.82rem' }}>
                    {room.viewType} • {room.sizeSqft || 1400} SQ FT
                  </p>
                </div>

                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.88rem',
                    lineHeight: '1.7',
                    marginBottom: '20px',
                    flex: 1,
                  }}
                >
                  {room.description}
                </p>

                {/* Key Amenities pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {room.amenities?.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      style={{
                        padding: '4px 10px',
                        background: 'rgba(212, 175, 55, 0.08)',
                        border: '1px solid rgba(212, 175, 55, 0.2)',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      ✓ {amenity}
                    </span>
                  ))}
                </div>

                {/* Price and Buttons */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '20px',
                    borderTop: '1px solid rgba(212, 175, 55, 0.15)',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Investment / Night
                    </span>
                    <p style={{ fontSize: '1.45rem', fontFamily: 'Cinzel, serif', color: 'var(--gold-400)', fontWeight: 600 }}>
                      ₹{Number(room.pricePerNight).toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link
                      to={`/rooms/${room.id}`}
                      data-cursor="EXPLORE"
                      className="btn-outline-gold"
                      style={{ padding: '10px 18px', fontSize: '0.75rem' }}
                    >
                      EXPLORE VILLA
                    </Link>

                    <button
                      onClick={() => openBookingModal(room)}
                      data-cursor="BOOK"
                      className="btn-gold"
                      style={{ padding: '10px 22px', fontSize: '0.75rem' }}
                    >
                      BOOK NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
