import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export const LoadingScreen = ({ onFinish }) => {
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setFading(true), 300);
          setTimeout(() => onFinish && onFinish(), 900);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#040c09',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'auto',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Animated 3D Ring Symbol */}
      <div
        style={{
          position: 'relative',
          width: '100px',
          height: '100px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            border: '2px solid rgba(212, 175, 55, 0.25)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '-6px',
            border: '1.5px solid transparent',
            borderTopColor: '#D4AF37',
            borderRightColor: '#F4E8C1',
            borderRadius: '50%',
            animation: 'spin 2s linear infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '8px',
            border: '1px dashed rgba(212, 175, 55, 0.4)',
            borderRadius: '50%',
            animation: 'spinReverse 4s linear infinite',
          }}
        />
        <Sparkles size={32} color="#D4AF37" className="animate-pulse" />
      </div>

      <h1
        style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '2.4rem',
          letterSpacing: '0.35em',
          color: '#ffffff',
          fontWeight: 500,
          marginBottom: '10px',
        }}
      >
        AURELIA
      </h1>

      <p
        style={{
          fontSize: '0.8rem',
          letterSpacing: '0.28em',
          color: 'var(--gold-400)',
          textTransform: 'uppercase',
          marginBottom: '36px',
        }}
      >
        Where Luxury Meets the Wild
      </p>

      {/* Progress Bar */}
      <div
        style={{
          width: '200px',
          height: '2px',
          background: 'rgba(212, 175, 55, 0.15)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '2px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'var(--gold-gradient)',
            transition: 'width 0.1s ease',
          }}
        />
      </div>

      <span
        style={{
          fontSize: '0.72rem',
          letterSpacing: '0.15em',
          color: 'var(--text-muted)',
          fontStyle: 'italic',
        }}
      >
        Preparing your escape...
      </span>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
};
