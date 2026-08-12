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
        bottom: '90px', 
        right: '24px', 
        zIndex: 9998, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-end',
        perspective: '1000px'
      }}
    >
      {/* 3D Walking Character Avatar above WhatsApp button */}
      <div className="walking-avatar-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
        <span className="walking-character 3d-walk">👨‍⚕️</span>
      </div>

      {/* WhatsApp Direct Chat Button with 3D pulse wave */}
      <div style={{ position: 'relative' }}>
        <div className="pulse-ring-3d"></div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #4ade80, #25D366 50%, #128C7E 100%)',
            color: '#ffffff',
            border: '2px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(37, 211, 102, 0.55), inset 0 2px 4px rgba(255,255,255,0.6)',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            textDecoration: 'none',
            position: 'relative',
            transformStyle: 'preserve-3d'
          }}
          className="floating-whatsapp-btn-3d"
        >
          <MessageCircle size={26} color="#ffffff" fill="#ffffff" />
          <span className="tooltip-label">Chat on WhatsApp</span>
        </a>
      </div>

      {/* Floating 3D Styles */}
      <style>{`
        .floating-whatsapp-btn-3d {
          animation: floatBounce3D 3s ease-in-out infinite;
        }
        .floating-whatsapp-btn-3d:hover {
          transform: translateY(-6px) rotateY(15deg) scale(1.1);
          box-shadow: 0 16px 32px rgba(37, 211, 102, 0.7), inset 0 2px 6px rgba(255,255,255,0.8) !important;
        }
        .pulse-ring-3d {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid rgba(37, 211, 102, 0.6);
          animation: pulseRing3D 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
          pointer-events: none;
        }
        .walking-character {
          font-size: 22px;
          display: inline-block;
          animation: doctorWalk 1.4s ease-in-out infinite alternate;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
        }
        @keyframes doctorWalk {
          0% { transform: translateY(0) rotate(-6deg) scale(1); }
          50% { transform: translateY(-5px) rotate(0deg) scale(1.08); }
          100% { transform: translateY(0) rotate(6deg) scale(1); }
        }
        @keyframes floatBounce3D {
          0%, 100% { transform: translateY(0) rotateX(0deg); }
          50% { transform: translateY(-8px) rotateX(8deg); }
        }
        @keyframes pulseRing3D {
          0% { transform: scale(0.95); opacity: 0.9; }
          100% { transform: scale(1.45); opacity: 0; }
        }
        .tooltip-label {
          position: absolute;
          right: 64px;
          top: 50%;
          transform: translateY(-50%);
          background: #0e233a;
          color: #ffffff;
          padding: 7px 14px;
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
