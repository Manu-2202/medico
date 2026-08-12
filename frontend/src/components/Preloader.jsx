import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Ultra-fast preloader (~0.3s quick splash)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 100);
          return 100;
        }
        return prev + 25; // Completes in ~0.3 seconds
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div 
      className="preloader-overlay" 
      style={{ 
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)',
        zIndex: 99999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: progress === 100 ? 0 : 1, 
        pointerEvents: progress === 100 ? 'none' : 'auto',
        transition: 'opacity 0.3s ease-out',
        padding: '20px'
      }}
    >
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '600px', width: '100%', position: 'relative' }}>
        
        {/* Massive Glowing Transparent Brand Logo + Integrated Heart Rate Line */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '440px', height: '440px', background: 'radial-gradient(circle, rgba(225, 91, 63, 0.25) 0%, transparent 70%)', filter: 'blur(35px)', pointerEvents: 'none' }}></div>
          <img 
            src="/logo.png" 
            alt="Medico Overseas Logo" 
            style={{ 
              maxHeight: '320px', 
              width: 'auto',
              maxWidth: '90vw',
              objectFit: 'contain',
              filter: 'drop-shadow(0 14px 30px rgba(31, 56, 100, 0.22))'
            }} 
            className="heartbeat-anim"
          />

          {/* Dynamic ECG Heartbeat SVG & Heart Badge - Brought Down Directly Onto Logo */}
          <div style={{ position: 'relative', width: '100%', height: '80px', marginTop: '-45px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
            <svg className="ecg-line-svg" viewBox="0 0 500 120" style={{ width: '100%', height: '80px', overflow: 'visible' }}>
              <defs>
                <linearGradient id="ecgGradLight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1F3864" />
                  <stop offset="40%" stopColor="#E15B3F" />
                  <stop offset="60%" stopColor="#E15B3F" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              {/* ECG Waveform peaking exactly at X=250, Y=15 */}
              <path
                className="ecg-path"
                fill="none"
                stroke="url(#ecgGradLight)"
                strokeWidth="5"
                d="M 10,60 L 150,60 L 175,45 L 195,60 L 215,85 L 250,15 L 285,100 L 305,45 L 325,60 L 490,60"
              />
            </svg>

            {/* Red Heart Symbol Positioned Exactly in the Center of BPM Pulse */}
            <div 
              style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                background: '#ffffff', 
                borderRadius: '50%', 
                width: '46px',
                height: '46px',
                boxShadow: '0 4px 22px rgba(225, 91, 63, 0.55)', 
                border: '3px solid #E15B3F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 15
              }}
              className="heartbeat-anim"
            >
              <Heart size={24} color="#E15B3F" fill="#E15B3F" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Preloader;
