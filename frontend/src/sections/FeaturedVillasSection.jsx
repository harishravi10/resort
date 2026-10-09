import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VillaExplorer3D } from '../3d/VillaExplorer3D';
import { useBooking } from '../context/BookingContext';
import { apiService } from '../services/api';
import { Sparkles, Calendar, ArrowRight, Eye, Users, Maximize2, Star } from 'lucide-react';
import { INITIAL_ROOMS } from '../services/mockData';

export const FeaturedVillasSection = () => {
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [activeFilter, setActiveFilter] = useState('All');
  const { openBookingModal } = useBooking();

  useEffect(() => {
    apiService.getRooms().then((data) => {
      if (data && data.length) setRooms(data);
    });
  }, []);

  const filters = ['All', 'Villa', 'Suite', 'Pavilion', 'Presidential'];

  const filteredRooms =
    activeFilter === 'All'
      ? rooms.slice(0, 4)
      : rooms.filter((r) => r.roomType.toLowerCase() === activeFilter.toLowerCase()).slice(0, 4);

  return (
    <section className="section-padding" style={{ position: 'relative', background: '#05110d' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 50px auto' }}>
          <span className="tagline-badge">
            <Sparkles size={13} color="#D4AF37" />
            BESPOKE SANCTUARIES
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
            The Private Residences
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7' }}>
            Where architectural majesty embraces wild nature. Each villa offers uninterrupted ocean vistas, private heated plunge pools, and anticipatory concierge service.
          </p>
        </div>

        {/* Interactive 3D Villa Explorer */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.3rem', color: '#fff' }}>
                Interactive 3D Architectural Model
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Inspect the Ocean Villa architecture, plunge pool, and overwater sundeck
              </p>
            </div>
          </div>
          <VillaExplorer3D />
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              data-cursor="FILTER"
              style={{
                background: activeFilter === filter ? 'var(--gold-gradient)' : 'rgba(212, 175, 55, 0.06)',
                color: activeFilter === filter ? '#06110d' : 'var(--gold-300)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '999px',
                padding: '8px 22px',
                fontSize: '0.8rem',
                fontWeight: activeFilter === filter ? 600 : 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Luxury Villa Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            marginBottom: '50px',
          }}
        >
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="glass-panel"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
              data-cursor="EXPLORE"
            >
              {/* Image Frame with Badges */}
              <div style={{ position: 'relative', height: '270px', overflow: 'hidden' }}>
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'rgba(7, 20, 16, 0.82)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '999px',
                    padding: '5px 12px',
                    fontSize: '0.72rem',
                    color: 'var(--gold-300)',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {room.roomType}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(7, 20, 16, 0.82)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '999px',
                    padding: '5px 10px',
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

              {/* Card Body */}
              <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '12px' }}>
                  <h3
                    style={{
                      fontFamily: 'Cinzel, serif',
                      fontSize: '1.4rem',
                      color: '#ffffff',
                      marginBottom: '4px',
                    }}
                  >
                    {room.name}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {room.viewType} • {room.sizeSqft || 1400} SQ FT
                  </p>
                </div>

                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.86rem',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    flex: 1,
                  }}
                >
                  {room.description.slice(0, 130)}...
                </p>

                {/* Specs Pill row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
                    marginBottom: '20px',
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={14} color="#D4AF37" />
                    <span>Up to {room.capacity} Guests</span>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Maximize2 size={14} color="#D4AF37" />
                    <span>{room.sizeSqft || 1400} sq ft</span>
                  </span>
                </div>

                {/* Price & Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Investment From
                    </span>
                    <p style={{ fontSize: '1.35rem', fontFamily: 'Cinzel, serif', color: 'var(--gold-400)', fontWeight: 600 }}>
                      ₹{Number(room.pricePerNight).toLocaleString('en-IN')}{' '}
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'sans-serif' }}>
                        / night
                      </span>
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link
                      to={`/rooms/${room.id}`}
                      data-cursor="VIEW"
                      style={{
                        padding: '10px 14px',
                        background: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '999px',
                        color: 'var(--gold-300)',
                        fontSize: '0.75rem',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      title="Inspect Villa"
                    >
                      <Eye size={15} />
                    </Link>

                    <button
                      onClick={() => openBookingModal(room)}
                      data-cursor="BOOK"
                      className="btn-gold"
                      style={{ padding: '10px 20px', fontSize: '0.75rem' }}
                    >
                      <span>BOOK</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            to="/rooms"
            data-cursor="VIEW ALL"
            className="btn-outline-gold"
            style={{ padding: '14px 40px' }}
          >
            <span>DISCOVER ALL 10 SANCTUARIES</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};
