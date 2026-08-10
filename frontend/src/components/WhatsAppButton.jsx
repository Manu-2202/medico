import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const phone = '919876543210';
  const defaultText = encodeURIComponent('Hello Medico Overseas! I am interested in MBBS Abroad admission. Please provide fee details.');
  const whatsappUrl = `https://wa.me/${phone}?text=${defaultText}`;

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1500, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      
      {/* Interactive Tooltip Callout */}
      {showTooltip && (
        <div style={{ background: '#ffffff', color: 'var(--navy-primary)', padding: '10px 14px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(31, 56, 100, 0.2)', marginBottom: '10px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #25D366', maxWidth: '240px' }}>
          <span>👋 Chat with MBBS Expert on WhatsApp!</span>
          <button 
            onClick={() => setShowTooltip(false)}
            style={{ background: 'none', border: 'none', padding: 0, color: '#94a3b8', cursor: 'pointer' }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Floating WhatsApp Action Button */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noreferrer"
        style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#25D366', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 25px rgba(37, 211, 102, 0.45)', cursor: 'pointer', transition: 'all 0.3s' }}
        className="heartbeat-anim"
        title="Chat with Medico Overseas Counselor"
      >
        <MessageSquare size={30} fill="#ffffff" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
