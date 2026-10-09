import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioAmbience = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const intervalRef = useRef(null);

  const startOceanWaves = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.04, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Pink noise generator for gentle ocean swell
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Low pass filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      // Swell LFO gain
      const swellGain = ctx.createGain();
      swellGain.gain.setValueAtTime(0.2, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(swellGain);
      swellGain.connect(masterGain);
      whiteNoise.start();

      // Oscillate gentle wave swell
      let cycle = 0;
      intervalRef.current = setInterval(() => {
        if (!ctx || ctx.state === 'closed') return;
        cycle += 0.05;
        const swell = 0.15 + 0.15 * Math.sin(cycle);
        swellGain.gain.setTargetAtTime(swell, ctx.currentTime, 0.4);
        filter.frequency.setTargetAtTime(260 + 160 * Math.sin(cycle), ctx.currentTime, 0.4);
      }, 200);

      setIsPlaying(true);
    } catch (e) {
      console.warn('Web Audio error:', e);
    }
  };

  const stopOceanWaves = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopOceanWaves();
    } else {
      startOceanWaves();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      data-cursor={isPlaying ? 'MUTE' : 'SOUND'}
      style={{
        background: 'rgba(8, 22, 17, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${isPlaying ? 'var(--gold-500)' : 'rgba(212, 175, 55, 0.3)'}`,
        borderRadius: '999px',
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: isPlaying ? 'var(--gold-300)' : 'rgba(255, 255, 255, 0.7)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: isPlaying ? '0 0 15px rgba(212, 175, 55, 0.3)' : '0 8px 24px rgba(0, 0, 0, 0.3)',
      }}
      title={isPlaying ? 'Mute Island Ambient Waves' : 'Play Gentle Ocean Waves Ambience'}
    >
      {isPlaying ? <Volume2 size={16} color="#D4AF37" /> : <VolumeX size={16} />}
      <span style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {isPlaying ? 'Ambience Active' : 'Soundscape'}
      </span>
    </button>
  );
};
