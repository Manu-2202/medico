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
        bottom: '84px', 
        right: '24px', 
        zIndex: 9998, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-end'
      }}
    >
      {/* WhatsApp Direct Chat Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          color: '#ffffff',
          border: '1.5px solid #ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(37, 211, 102, 0.45)',
          transition: 'all 0.25s ease',
          textDecoration: 'none',
          position: 'relative'
        }}
        className="floating-action-btn"
      >
        <MessageCircle size={24} color="#ffffff" fill="#ffffff" />
        <span className="tooltip-label">Chat on WhatsApp</span>
      </a>

      {/* Floating Tooltips & Mobile Styling */}
      <style>{`
        .floating-action-btn:hover {
          transform: scale(1.08);
        }
        .tooltip-label {
          position: absolute;
          right: 60px;
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
        .floating-action-btn:hover .tooltip-label {
          opacity: 1;
        }
        @media (max-width: 480px) {
          .floating-whatsapp-container {
            bottom: 70px !important;
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
