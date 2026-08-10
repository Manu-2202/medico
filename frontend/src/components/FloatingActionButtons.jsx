import React from 'react';
import { Bot, MessageCircle } from 'lucide-react';

const FloatingActionButtons = ({ onToggleChatbot, isChatbotOpen }) => {
  const whatsappNumber = '919876543210';
  const whatsappMsg = encodeURIComponent('Hello Medico Overseas! I am interested in MBBS Abroad admission. Please provide fee details.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  return (
    <div 
      style={{ 
        position: 'fixed', 
        bottom: '24px', 
        right: '24px', 
        zIndex: 9999, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-end', 
        gap: '12px' 
      }}
    >
      {/* 1. WhatsApp Direct Chat Button (Replaced Phone Button) */}
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

      {/* 2. Primary AI Admissions Chatbot Button (with Notification Badge) */}
      <button
        onClick={onToggleChatbot}
        aria-label="Open AI Admissions Assistant"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f97316, #ea580c)',
          color: '#ffffff',
          border: '2px solid #ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(249, 115, 22, 0.5)',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          position: 'relative'
        }}
        className="floating-action-btn heartbeat-anim"
      >
        <Bot size={28} color="#ffffff" />
        
        {/* Pulsing Red Notification Badge */}
        {!isChatbotOpen && (
          <span
            style={{
              position: 'absolute',
              top: '-3px',
              right: '-3px',
              background: '#ef4444',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: '900',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #ffffff',
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.6)'
            }}
          >
            1
          </span>
        )}

        <span className="tooltip-label">AI Admissions Assistant (1 Message)</span>
      </button>

      {/* Floating Tooltips Styling */}
      <style>{`
        .floating-action-btn:hover {
          transform: scale(1.08);
        }
        .tooltip-label {
          position: absolute;
          right: 68px;
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
        @media (max-width: 768px) {
          .tooltip-label {
            display: none;
          }
        }
      `}</style>

    </div>
  );
};

export default FloatingActionButtons;
