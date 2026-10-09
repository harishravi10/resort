import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import confetti from 'canvas-confetti';
import { X, Calendar, Users, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, BedDouble } from 'lucide-react';
import { INITIAL_ROOMS } from '../services/mockData';

export const BookingModal = () => {
  const { isBookingModalOpen, closeBookingModal, selectedRoom, setSelectedRoom } = useBooking();
  const { user } = useAuth();

  const [allRooms, setAllRooms] = useState(INITIAL_ROOMS);
  const [roomId, setRoomId] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  const [step, setStep] = useState(1); // 1: Select & Dates, 2: Guest Details & Review, 3: Confirmed
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Fetch available rooms
    apiService.getRooms().then((data) => {
      if (data && data.length) setAllRooms(data);
    });

    // Default dates: tomorrow + 4 days
    const t1 = new Date(Date.now() + 86400000 * 2);
    const t2 = new Date(Date.now() + 86400000 * 6);
    setCheckIn(t1.toISOString().split('T')[0]);
    setCheckOut(t2.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      setRoomId(selectedRoom.id);
    } else if (allRooms.length > 0) {
      setRoomId(allRooms[0].id);
    }

    if (user) {
      setGuestName(user.name || '');
      setGuestEmail(user.email || '');
      setGuestPhone(user.phone || '+91 98765 43210');
    }
  }, [selectedRoom, allRooms, user, isBookingModalOpen]);

  if (!isBookingModalOpen) return null;

  const currentRoom = allRooms.find((r) => r.id === roomId) || allRooms[0];

  // Dynamic pricing
  const nights = Math.max(
    1,
    Math.ceil(
      Math.abs(new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    ) || 1
  );
  const baseRate = currentRoom?.pricePerNight || 35000;
  const staySubtotal = nights * baseRate;
  const luxuryTax = Math.round(staySubtotal * 0.12);
  const resortServiceCharge = Math.round(staySubtotal * 0.05);
  const totalPrice = staySubtotal + luxuryTax + resortServiceCharge;

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const bookingPayload = {
        roomId: currentRoom.id,
        roomName: currentRoom.name,
        roomType: currentRoom.roomType,
        roomImage: currentRoom.imageUrl,
        checkIn,
        checkOut,
        guests,
        totalPrice,
        specialRequests,
        userName: guestName || (user ? user.name : 'Harish Kumar'),
        userEmail: guestEmail || (user ? user.email : 'guest@example.com'),
      };

      const result = await apiService.createBooking(bookingPayload);
      setConfirmedBooking(result);
      setStep(3);

      // Trigger Luxury Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F4E8C1', '#143B2F', '#38B2AC'],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(3, 10, 7, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={closeBookingModal}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'rgba(7, 20, 16, 0.95)',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          borderRadius: '24px',
          padding: '36px',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeBookingModal}
          data-cursor="CLOSE"
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
        >
          <X size={18} />
        </button>

        {step < 3 && (
          <div style={{ marginBottom: '24px' }}>
            <span className="tagline-badge">
              <Sparkles size={12} color="#D4AF37" />
              SANCTUARY RESERVATION
            </span>
            <h2
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '1.9rem',
                color: '#fff',
                letterSpacing: '0.08em',
              }}
            >
              Reserve Your Escape
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>
              Experience transcendent serenity nestled between rainforest cliffs and the turquoise lagoon.
            </p>
          </div>
        )}

        {/* STEP 1: Villa & Dates */}
        {step === 1 && (
          <div>
            {/* Select Villa */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  color: 'var(--gold-400)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                }}
              >
                Select Villa / Suite
              </label>
              <select
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="luxury-input"
                style={{ cursor: 'pointer' }}
              >
                {allRooms.map((r) => (
                  <option key={r.id} value={r.id} style={{ background: '#0a1c16', color: '#fff' }}>
                    {r.name} — ₹{Number(r.pricePerNight).toLocaleString('en-IN')}/night ({r.viewType})
                  </option>
                ))}
              </select>
            </div>

            {/* Villa Preview Card */}
            {currentRoom && (
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  background: 'rgba(10, 28, 22, 0.6)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '14px',
                  padding: '14px',
                  marginBottom: '22px',
                  alignItems: 'center',
                }}
              >
                <img
                  src={currentRoom.imageUrl}
                  alt={currentRoom.name}
                  style={{
                    width: '110px',
                    height: '80px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#fff', fontSize: '1.05rem', fontFamily: 'Cinzel, serif' }}>
                    {currentRoom.name}
                  </h4>
                  <p style={{ color: 'var(--gold-300)', fontSize: '0.85rem', fontWeight: 600 }}>
                    ₹{Number(currentRoom.pricePerNight).toLocaleString('en-IN')}{' '}
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>/ night</span>
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>
                    Max {currentRoom.capacity} Guests • {currentRoom.sizeSqft || 1400} sq ft • {currentRoom.viewType}
                  </p>
                </div>
              </div>
            )}

            {/* Dates & Guests Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '16px',
                marginBottom: '24px',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    color: 'var(--gold-400)',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                  }}
                >
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="luxury-input"
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    color: 'var(--gold-400)',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                  }}
                >
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="luxury-input"
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    color: 'var(--gold-400)',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                  }}
                >
                  Number of Guests
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
            </div>

            {/* Live Pricing Breakdown Preview */}
            <div
              style={{
                background: 'rgba(212, 175, 55, 0.05)',
                border: '1px dashed rgba(212, 175, 55, 0.3)',
                borderRadius: '12px',
                padding: '16px 20px',
                marginBottom: '28px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {nights} {nights === 1 ? 'Night' : 'Nights'} × ₹{baseRate.toLocaleString('en-IN')}
                </p>
                <p style={{ color: 'var(--gold-300)', fontSize: '0.75rem' }}>
                  Includes Seaplane Meet &amp; Greet &amp; Daily Organic Breakfast
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated Total:</span>
                <p style={{ fontSize: '1.4rem', fontFamily: 'Cinzel, serif', color: 'var(--gold-400)', fontWeight: 600 }}>
                  ₹{totalPrice.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="btn-gold"
              style={{ width: '100%', padding: '16px' }}
              data-cursor="NEXT"
            >
              <span>PROCEED TO GUEST DETAILS</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: Guest Details & Final Review */}
        {step === 2 && (
          <form onSubmit={handleConfirmBooking}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '16px',
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Harish Kumar"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="luxury-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  placeholder="harish@example.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="luxury-input"
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                PHONE NUMBER (WITH COUNTRY CODE)
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="luxury-input"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                SPECIAL REQUESTS / ARRIVAL PREFERENCES
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Seaplane transfer timing, anniversary surprise, dietary preferences, extra feather pillows..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="luxury-input"
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* Itemized Price Summary */}
            <div
              style={{
                background: 'rgba(10, 28, 22, 0.7)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '12px',
                padding: '18px',
                marginBottom: '24px',
              }}
            >
              <h5 style={{ color: 'var(--gold-300)', fontFamily: 'Cinzel, serif', marginBottom: '10px' }}>
                RESERVATION SUMMARY
              </h5>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <span>{currentRoom?.name} ({nights} nights)</span>
                <span>₹{staySubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                <span>Luxury GST &amp; Hospitality Levy (12%)</span>
                <span>₹{luxuryTax.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                <span>Resort Environmental Sanctuary Conservation (5%)</span>
                <span>₹{resortServiceCharge.toLocaleString('en-IN')}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                  paddingTop: '10px',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  color: '#fff',
                }}
              >
                <span>Total Amount</span>
                <span style={{ color: 'var(--gold-400)', fontFamily: 'Cinzel, serif' }}>
                  ₹{totalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px' }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-outline-gold"
                style={{ flex: 1 }}
              >
                BACK
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn-gold"
                style={{ flex: 2 }}
                data-cursor="CONFIRM"
              >
                {submitting ? 'CONFIRMING SANCTUARY...' : 'CONFIRM RESERVATION'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Booking Success Screen */}
        {step === 3 && confirmedBooking && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(212, 175, 55, 0.15)',
                border: '2px solid var(--gold-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
              }}
            >
              <CheckCircle2 size={40} color="#D4AF37" />
            </div>

            <h3
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '1.9rem',
                color: '#fff',
                letterSpacing: '0.1em',
                marginBottom: '8px',
              }}
            >
              Your Escape is Confirmed
            </h3>
            <p style={{ color: 'var(--gold-300)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Welcome to the sanctuary of Aurelia. A personal concierge has been assigned to your stay.
            </p>

            {/* Luxury Digital Boarding Voucher */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(14, 38, 30, 0.95), rgba(7, 20, 16, 0.95))',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'left',
                marginBottom: '28px',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px dashed rgba(212, 175, 55, 0.3)',
                  paddingBottom: '14px',
                  marginBottom: '16px',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--text-muted)' }}>
                    RESERVATION NUMBER
                  </span>
                  <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1.25rem', color: 'var(--gold-400)', fontWeight: 700 }}>
                    {confirmedBooking.id}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--text-muted)' }}>
                    SANCTUARY STATUS
                  </span>
                  <p style={{ color: '#48bb78', fontWeight: 600, fontSize: '0.85rem' }}>CONFIRMED</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>VILLA SANCTUARY</span>
                  <p style={{ color: '#fff', fontWeight: 500 }}>{confirmedBooking.roomName}</p>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>GUEST NAME</span>
                  <p style={{ color: '#fff', fontWeight: 500 }}>{confirmedBooking.userName}</p>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>DATES OF STAY</span>
                  <p style={{ color: '#fff', fontWeight: 500 }}>{checkIn} → {checkOut} ({nights} Nights)</p>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>TOTAL INVESTMENT</span>
                  <p style={{ color: 'var(--gold-400)', fontWeight: 600 }}>₹{totalPrice.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
              <button
                onClick={closeBookingModal}
                className="btn-gold"
                style={{ padding: '12px 36px' }}
              >
                COMPLETE &amp; CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
