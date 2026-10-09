import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { INITIAL_REVIEWS } from '../services/mockData';
import { Sparkles, Star, Quote, PlusCircle, CheckCircle } from 'lucide-react';

export const ReviewsSection = () => {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    apiService.getReviews().then((data) => {
      if (data && data.length) setReviews(data);
    });
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const newRev = await apiService.createReview({
      userName: name || (user ? user.name : 'Guest'),
      userLocation: location || 'Global Traveler',
      rating,
      comment,
    });
    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowModal(false);
      setComment('');
    }, 2000);
  };

  return (
    <section className="section-padding" style={{ position: 'relative', background: '#05110d' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="tagline-badge">
              <Sparkles size={13} color="#D4AF37" />
              GUEST CHRONICLES
            </span>
            <h2
              style={{
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                color: '#ffffff',
                letterSpacing: '0.08em',
              }}
            >
              Stories from the Sanctuary
            </h2>
          </div>

          <button
            onClick={() => setShowModal(true)}
            data-cursor="WRITE"
            className="btn-outline-gold"
            style={{ padding: '12px 28px', fontSize: '0.8rem' }}
          >
            <PlusCircle size={16} />
            <span>SHARE YOUR EXPERIENCE</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px',
          }}
        >
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel"
              style={{
                padding: '32px',
                borderRadius: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Quote size={28} color="#D4AF37" style={{ opacity: 0.6, marginBottom: '14px' }} />
                <p
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.15rem',
                    fontStyle: 'italic',
                    color: '#fff',
                    lineHeight: '1.7',
                    marginBottom: '20px',
                  }}
                >
                  "{rev.comment}"
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} color="#D4AF37" fill="#D4AF37" />
                  ))}
                </div>
                <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.95rem', color: 'var(--gold-300)' }}>
                  {rev.userName}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                  {rev.userLocation} • {rev.date || 'Verified Resident'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Submitting Review */}
        {showModal && (
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
            onClick={() => setShowModal(false)}
          >
            <div
              className="glass-panel"
              style={{
                width: '100%',
                maxWidth: '540px',
                padding: '36px',
                background: 'rgba(7, 20, 16, 0.96)',
                border: '1px solid var(--gold-500)',
                borderRadius: '20px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <CheckCircle size={44} color="#D4AF37" style={{ margin: '0 auto 16px auto' }} />
                  <h3 style={{ fontFamily: 'Cinzel, serif', color: '#fff' }}>Thank You</h3>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                    Your testimonial has been added to the Aurelia Chronicles.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview}>
                  <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
                    Share Your Experience
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
                    Reflect on your stay at Aurelia Luxury Resort &amp; Nature Retreat.
                  </p>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Harish Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="luxury-input"
                    />
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                      ORIGIN / RESIDENCE
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru, India"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="luxury-input"
                    />
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                      RATING
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={24}
                          color="#D4AF37"
                          fill={star <= rating ? '#D4AF37' : 'none'}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                      TESTIMONIAL
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your moments at Aurelia..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="luxury-input"
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="btn-outline-gold"
                      style={{ flex: 1 }}
                    >
                      CANCEL
                    </button>
                    <button type="submit" className="btn-gold" style={{ flex: 2 }}>
                      SUBMIT TESTIMONIAL
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
