import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingActionButtons = () => {
  const whatsappNumber = '919876543210';
  const whatsappMsg = encodeURIComponent('Hello Medico Overseas! I am interested in MBBS Abroad admission. Please provide fee details.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  return (
    <div 
      className="floating-whatsapp-container"
      style={{ 
        position: 'fixed', 
        bottom: '110px', 
        right: '24px', 
        zIndex: 9998, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-end',
        perspective: '1000px'
      }}
    >
      {/* WhatsApp Direct Chat Button with 3D pulse wave */}
      <div style={{ position: 'relative' }}>
        <div className="pulse-ring-3d"></div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #4ade80, #25D366 50%, #128C7E 100%)',
            color: '#ffffff',
            border: '2px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(37, 211, 102, 0.55), inset 0 2px 4px rgba(255,255,255,0.6)',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            textDecoration: 'none',
            position: 'relative',
            transformStyle: 'preserve-3d'
          }}
          className="floating-whatsapp-btn-3d"
        >
          <MessageCircle size={24} color="#ffffff" fill="#ffffff" />
          <span className="tooltip-label">Chat on WhatsApp</span>
        </a>
      </div>

      {/* Floating 3D Styles */}
      <style>{`
        .floating-whatsapp-btn-3d {
          animation: floatBounce3D 3s ease-in-out infinite;
        }
        .floating-whatsapp-btn-3d:hover {
          transform: translateY(-4px) rotateY(15deg) scale(1.08);
          box-shadow: 0 14px 28px rgba(37, 211, 102, 0.7), inset 0 2px 6px rgba(255,255,255,0.8) !important;
        }
        .pulse-ring-3d {
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 2px solid rgba(37, 211, 102, 0.6);
          animation: pulseRing3D 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
          pointer-events: none;
        }
        @keyframes floatBounce3D {
          0%, 100% { transform: translateY(0) rotateX(0deg); }
          50% { transform: translateY(-6px) rotateX(6deg); }
        }
        @keyframes pulseRing3D {
          0% { transform: scale(0.95); opacity: 0.9; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .tooltip-label {
          position: absolute;
          right: 60px;
          top: 50%;
          transform: translateY(-50%);
          background: #0e233a;
          color: #ffffff;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
          box-shadow: 0 4px 14px rgba(0,0,0,0.22);
        }
        .floating-whatsapp-btn-3d:hover .tooltip-label {
          opacity: 1;
        }
        @media (max-width: 480px) {
          .floating-whatsapp-container {
            bottom: 74px !important;
            right: 16px !important;
          }
          .tooltip-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingActionButtons;
