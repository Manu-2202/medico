import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Bell, Search, LogOut, User, Key, RefreshCw, Volume2, 
  ExternalLink, Download, LayoutDashboard, Globe, Mail, CheckCircle2, AlertCircle, Database
} from 'lucide-react';
import { requestNotificationPermission, triggerSystemNotification, playAlertSound, unlockAudio } from '../utils/soundNotification';

const CmsHeader = ({ 
  profileData, 
  inquiriesCount = 0, 
  notifications = [], 
  searchQuery, 
  setSearchQuery, 
  activeTab, 
  setActiveTab, 
  onLogout,
  onExportCsv
}) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      setPushEnabled(true);
    }
  }, []);

  const handleEnablePush = async () => {
    unlockAudio();
    const granted = await requestNotificationPermission();
    if (granted) {
      setPushEnabled(true);
      triggerSystemNotification('🔔 CMS Push Notifications Active!', 'You will receive instant lockscreen & sound alerts for all incoming student leads.');
      alert('✅ System push notifications activated! New lead alerts will ring and display on your lockscreen.');
    } else {
      alert('Notification permission was blocked by your browser. Please click the settings icon near your browser address bar and set Notifications to ALLOW.');
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header style={{ background: '#111827', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 24px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', sticky: 'top', top: 0, zIndex: 100 }}>
      {/* Brand & CMS Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link to="/cms" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #e15b3f 0%, #0f172a 100%)', border: '1px solid rgba(255,255,255,0.15)', display: 'grid', placeItems: 'center', color: '#ffffff', fontWeight: '800', fontSize: '18px', boxShadow: '0 4px 14px rgba(225,91,63,0.35)' }}>
            🩺
          </div>
          <div>
            <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '18px', letterSpacing: '-0.4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Medico Overseas <span style={{ background: '#3b82f6', color: '#ffffff', fontSize: '10px', padding: '2px 8px', borderRadius: '20px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px' }}>CMS PORTAL</span>
            </div>
            <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '600' }}>Executive Content & Lead Management System</div>
          </div>
        </Link>

        {/* Live System Status Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '16px' }} className="cms-status-badges">
          <span style={{ background: 'rgba(34,197,94,0.12)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.25)', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} /> MongoDB Connected
          </span>
          <span style={{ background: 'rgba(59,130,246,0.12)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.25)', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Mail size={12} /> Gmail Dispatcher Active
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        
        {/* Search Bar */}
        <div style={{ position: 'relative', width: '220px' }}>
          <Search size={14} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search CMS leads, names..."
            style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '8px 12px 8px 34px', color: '#ffffff', fontSize: '12px', outline: 'none' }}
          />
        </div>

        {/* Export CSV Button */}
        {onExportCsv && (
          <button
            onClick={onExportCsv}
            title="Download leads as CSV"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#cbd5e1', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Download size={14} /> CSV
          </button>
        )}

        {/* View Main Website Button */}
        <Link
          to="/"
          target="_blank"
          title="View Student Website"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#cbd5e1', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <ExternalLink size={14} /> Site
        </Link>

        {/* Notifications Popover */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{ position: 'relative', background: showNotifications ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#ffffff', padding: '9px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span style={{ position: 'absolute', top: '-3px', right: '-3px', background: '#ef4444', color: '#ffffff', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', fontWeight: '800', display: 'grid', placeItems: 'center' }}>
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div style={{ position: 'absolute', top: '48px', right: 0, width: '340px', background: '#111827', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', zIndex: 200, padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontWeight: '800', color: '#ffffff', fontSize: '14px' }}>CMS Lead Alerts</span>
                <button onClick={() => playAlertSound('chime', 'Test Lead Chime', 'Sound engine active!')} style={{ background: 'rgba(59,130,246,0.15)', border: 'none', color: '#60a5fa', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Volume2 size={12} /> Test Sound
                </button>
              </div>

              <div style={{ maxHeight: '260px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ color: '#64748b', fontSize: '12px', textAlign: 'center', padding: '16px 0' }}>No unread notifications</div>
                ) : (
                  notifications.map((n, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '10px 12px', marginBottom: '8px' }}>
                      <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '13px', marginBottom: '3px' }}>{n.title}</div>
                      <div style={{ color: '#94a3b8', fontSize: '12px', lineHeight: '1.4' }}>{n.message}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile & Logout */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: 0 }}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: '#ffffff', fontWeight: '800', fontSize: '14px', display: 'grid', placeItems: 'center' }}>
              {(profileData?.name || 'A').charAt(0)}
            </div>
          </button>

          {showProfileMenu && (
            <div style={{ position: 'absolute', top: '48px', right: 0, width: '220px', background: '#111827', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '14px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', zIndex: 200, padding: '8px 0' }}>
              <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '13px' }}>{profileData?.name || 'Super Admin'}</div>
                <div style={{ color: '#64748b', fontSize: '11px' }}>{profileData?.email || 'admin@medico.com'}</div>
              </div>
              <button
                onClick={onLogout}
                style={{ width: '100%', background: 'transparent', border: 'none', padding: '10px 16px', color: '#ef4444', fontSize: '13px', fontWeight: '700', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <LogOut size={14} /> Log Out of CMS
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default CmsHeader;
