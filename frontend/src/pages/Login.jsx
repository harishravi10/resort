import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Shield, User, KeyRound, Lock, ArrowRight } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid email or password credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    login(demoEmail, demoPass).then((res) => {
      if (res.role === 'ADMIN') navigate('/admin');
      else navigate('/dashboard');
    });
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
          maxWidth: '480px',
          padding: '44px',
          margin: '0 20px',
          background: 'rgba(7, 20, 16, 0.94)',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span className="tagline-badge">
            <Sparkles size={12} color="#D4AF37" />
            RESIDENT ACCESS
          </span>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', color: '#fff' }}>
            Enter Sanctuary
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '6px' }}>
            Access your private reservation itinerary &amp; member privileges
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

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
              PASSWORD
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="luxury-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold"
            data-cursor="LOGIN"
            style={{ width: '100%', padding: '15px' }}
          >
            {loading ? 'AUTHENTICATING...' : 'ACCESS PORTFOLIO'}
          </button>
        </form>

        {/* Quick Demo Login Helpers */}
        <div style={{ marginTop: '28px', borderTop: '1px dashed rgba(212, 175, 55, 0.2)', paddingTop: '20px' }}>
          <span style={{ display: 'block', textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            INSTANT DEMO PREVIEWS
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => handleQuickLogin('harish@example.com', 'Password123!')}
              style={{
                flex: 1,
                background: 'rgba(212, 175, 55, 0.08)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '8px',
                padding: '8px',
                color: 'var(--gold-300)',
                fontSize: '0.72rem',
                cursor: 'pointer',
              }}
            >
              Demo Resident (Harish)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('harishravi1006@gmain.com', 'chandru@2007')}
              style={{
                flex: 1,
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: '8px',
                padding: '8px',
                color: 'var(--gold-300)',
                fontSize: '0.72rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Imperial Admin (Harish)
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Not yet registered?{' '}
            <Link to="/register" style={{ color: 'var(--gold-300)', textDecoration: 'none', fontWeight: 600 }}>
              Apply for Membership
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
