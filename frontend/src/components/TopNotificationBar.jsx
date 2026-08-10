import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, ExternalLink, Volume2, ShieldAlert } from 'lucide-react';
import { playAlertSound, unlockAudio } from '../utils/soundNotification';

let triggerNotificationBarCallback = null;

// Global helper to show top notification bar from anywhere in code
export const showInAppNotificationBar = (title, message, leadData = null) => {
  unlockAudio();
  playAlertSound('chime', title, message);
  if (triggerNotificationBarCallback) {
    triggerNotificationBarCallback({
      id: Date.now(),
      title,
      message,
      leadData,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    });
  }
};

const TopNotificationBar = () => {
  const [currentNotification, setCurrentNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    triggerNotificationBarCallback = (notif) => {
      setCurrentNotification(notif);
      setIsVisible(true);

      // Auto dismiss after 8 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 8000);

      return () => clearTimeout(timer);
    };

    return () => {
      triggerNotificationBarCallback = null;
    };
  }, []);

  if (!isVisible || !currentNotification) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99999,
        width: '92%',
        maxWidth: '680px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        border: '1.5px solid rgba(59, 130, 246, 0.4)',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(59, 130, 246, 0.25)',
        color: '#ffffff',
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '14px',
        animation: 'slideDownIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        backdropFilter: 'blur(16px)'
      }}
      className="top-notification-bar"
    >
      {/* Icon & Details */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
        <div style={{ 
          width: '44px', 
          height: '44px', 
          borderRadius: '12px', 
          background: 'linear-gradient(135deg, #ef4444, #dc2626)', 
          color: '#ffffff', 
          display: 'grid', 
          placeItems: 'center',
          flexShrink: 0,
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
          animation: 'pulse 2s infinite'
        }}>
          <Bell size={22} className="bell-shake" />
        </div>

        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <span style={{ fontWeight: '800', fontSize: '15px', color: '#ffffff', letterSpacing: '-0.3px' }}>
              {currentNotification.title || '🚨 NEW MBBS LEAD ALERT'}
            </span>
            <span style={{ background: '#22c55e', color: '#ffffff', fontSize: '10px', fontWeight: '800', padding: '2px 8px', borderRadius: '12px', textTransform: 'uppercase' }}>
              LIVE
            </span>
            <span style={{ fontSize: '11px', color: '#94a3b8', marginLeft: 'auto' }}>
              {currentNotification.timestamp}
            </span>
          </div>

          <div style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {currentNotification.message}
          </div>

          {currentNotification.leadData && (
            <div style={{ display: 'flex', gap: '12px', marginTop: '6px', fontSize: '11px', color: '#93c5fd', fontWeight: '600' }}>
              <span>👤 {currentNotification.leadData.name}</span>
              <span>📱 {currentNotification.leadData.phone}</span>
              <span>🌍 {currentNotification.leadData.country}</span>
            </div>
          )}
        </div>
      </div>

      {/* Dismiss Button */}
      <button 
        onClick={() => setIsVisible(false)}
        style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          border: 'none', 
          color: '#94a3b8', 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          display: 'grid', 
          placeItems: 'center', 
          cursor: 'pointer',
          flexShrink: 0
        }}
        title="Dismiss Notification Bar"
      >
        <X size={16} />
      </button>

      <style>{`
        @keyframes slideDownIn {
          from { opacity: 0; transform: translate(-50%, -30px) scale(0.96); }
          to { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        @keyframes bell-shake {
          0%, 100% { transform: rotate(0); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-15deg); }
          60% { transform: rotate(10deg); }
          80% { transform: rotate(-10deg); }
        }
        .bell-shake { animation: bell-shake 1.2s ease infinite; }
      `}</style>
    </div>
  );
};

export default TopNotificationBar;
