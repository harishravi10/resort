import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(name, email, phone, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration error. Please check details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        paddingTop: '130px',
        paddingBottom: '80px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 20%, #0d2820 0%, #05110d 80%)',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '44px',
          margin: '0 20px',
          background: 'rgba(7, 20, 16, 0.94)',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          borderRadius: '24px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span className="tagline-badge">
            <Sparkles size={12} color="#D4AF37" />
            SOVEREIGN ENROLLMENT
          </span>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', color: '#fff' }}>
            Aurelia Membership
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '6px' }}>
            Enroll for private villa bookings and bespoke experiences
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: '12px',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #ef4444',
              color: '#fca5a5',
              fontSize: '0.8rem',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
              FULL LEGAL NAME
            </label>
            <input
              type="text"
              required
              placeholder="Harish Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="luxury-input"
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              required
              placeholder="harish@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="luxury-input"
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
              PHONE NUMBER
            </label>
            <input
              type="tel"
              required
              placeholder="+91 98123 45678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="luxury-input"
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
              SECURE PASSWORD
            </label>
            <input
              type="password"
              required
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="luxury-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold"
            data-cursor="JOIN"
            style={{ width: '100%', padding: '15px' }}
          >
            {loading ? 'ENROLLING MEMBER...' : 'CREATE ACCOUNT & ENTER'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Already a resident member?{' '}
            <Link to="/login" style={{ color: 'var(--gold-300)', textDecoration: 'none', fontWeight: 600 }}>
              Access Sanctuary
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
