import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Bell, Search, LogOut, User, Key, Volume2, 
  ExternalLink, Download, Mail, Trash2, Camera, Edit3, Sun, Moon
} from 'lucide-react';
import { requestNotificationPermission, triggerSystemNotification, playAlertSound, unlockAudio } from '../utils/soundNotification';

const CmsHeader = ({ 
  profileData, 
  notifications = [], 
  searchQuery, 
  setSearchQuery, 
  onLogout,
  onExportCsv,
  onClearNotifications,
  onOpenProfile,
  isDarkMode = true,
  onToggleTheme
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      setPushEnabled(true);
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header style={{ 
      background: isDarkMode ? '#0b0f19' : '#ffffff', 
      borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0', 
      padding: '0 24px', 
      height: '70px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      position: 'sticky', 
      top: 0, 
      zIndex: 100,
      transition: 'all 0.3s ease'
    }}>
      
      {/* 1. LEFT SIDE: BRAND LOGO & TITLE */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, #e15b3f 0%, #2563eb 100%)', 
            border: '1px solid rgba(255,255,255,0.2)', 
            display: 'grid', 
            placeItems: 'center', 
            color: '#ffffff', 
            fontWeight: '900', 
            fontSize: '20px', 
            boxShadow: '0 4px 16px rgba(37,99,235,0.4)' 
          }}>
            🩺
          </div>
          <div>
            <div style={{ color: isDarkMode ? '#ffffff' : '#0f172a', fontWeight: '900', fontSize: '18px', letterSpacing: '-0.4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Medico Overseas <span style={{ background: '#3b82f6', color: '#ffffff', fontSize: '10px', padding: '2px 8px', borderRadius: '20px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px' }}>ADMIN CRM</span>
            </div>
            <div style={{ color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: '11px', fontWeight: '600' }}>Executive Lead & Admission Portal</div>
          </div>
        </Link>
      </div>

      {/* 2. RIGHT SIDE: SEARCH, THEME TOGGLE, ACTIONS, NOTIFICATIONS & PROFILE PHOTO */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        
        {/* Light / Dark Mode Toggle Button */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            style={{
              background: isDarkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9',
              border: isDarkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid #cbd5e1',
              color: isDarkMode ? '#f59e0b' : '#0f172a',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            {isDarkMode ? <Sun size={15} color="#f59e0b" /> : <Moon size={15} color="#3b82f6" />}
            <span style={{ color: isDarkMode ? '#f59e0b' : '#0f172a' }}>{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>
        )}
        
        {/* Search Input */}
        <div style={{ position: 'relative', width: '200px' }}>
          <Search size={14} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads..."
            style={{ width: '100%', background: isDarkMode ? 'rgba(255,255,255,0.06)' : '#f8fafc', border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #cbd5e1', borderRadius: '10px', padding: '8px 12px 8px 34px', color: isDarkMode ? '#ffffff' : '#0f172a', fontSize: '12px', outline: 'none' }}
          />
        </div>

        {/* Export CSV */}
        {onExportCsv && (
          <button
            onClick={onExportCsv}
            title="Download leads as CSV"
            style={{ background: isDarkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9', border: isDarkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid #cbd5e1', color: isDarkMode ? '#cbd5e1' : '#334155', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Download size={14} /> CSV
          </button>
        )}

        {/* View Main Website */}
        <Link
          to="/"
          target="_blank"
          title="View Student Website"
          style={{ background: isDarkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9', border: isDarkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid #cbd5e1', color: isDarkMode ? '#cbd5e1' : '#334155', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <ExternalLink size={14} /> Site
        </Link>

        {/* Notifications Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            style={{ position: 'relative', background: showNotifications ? (isDarkMode ? 'rgba(59, 130, 246, 0.25)' : '#dbeafe') : (isDarkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9'), border: isDarkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid #cbd5e1', color: isDarkMode ? '#ffffff' : '#0f172a', padding: '9px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#ef4444', color: '#ffffff', borderRadius: '50%', width: '17px', height: '17px', fontSize: '10px', fontWeight: '800', display: 'grid', placeItems: 'center', boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)' }}>
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div style={{ position: 'absolute', top: '50px', right: 0, width: '340px', background: isDarkMode ? '#111827' : '#ffffff', border: isDarkMode ? '1px solid rgba(255,255,255,0.14)' : '1px solid #e2e8f0', borderRadius: '16px', boxShadow: isDarkMode ? '0 20px 40px rgba(0,0,0,0.6)' : '0 10px 30px rgba(0,0,0,0.15)', zIndex: 200, padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '10px', borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0' }}>
                <span style={{ fontWeight: '800', color: isDarkMode ? '#ffffff' : '#0f172a', fontSize: '14px' }}>Lead Notifications</span>
                {notifications.length > 0 && (
                  <button 
                    onClick={() => {
                      if (onClearNotifications) onClearNotifications();
                    }}
                    style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Trash2 size={12} /> Clear All
                  </button>
                )}
              </div>

              <div style={{ maxHeight: '260px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ color: isDarkMode ? '#64748b' : '#94a3b8', fontSize: '12px', textAlign: 'center', padding: '20px 0' }}>No new notifications</div>
                ) : (
                  notifications.map((n, idx) => (
                    <div key={idx} style={{ background: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc', border: isDarkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 12px', marginBottom: '8px' }}>
                      <div style={{ fontWeight: '700', color: isDarkMode ? '#ffffff' : '#0f172a', fontSize: '13px', marginBottom: '3px' }}>{n.title}</div>
                      <div style={{ color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: '12px', lineHeight: '1.4' }}>{n.message}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Photo Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: 0 }}
          >
            {profileData?.photo ? (
              <img 
                src={profileData.photo} 
                alt={profileData.name || 'Admin'} 
                style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #3b82f6', boxShadow: '0 2px 10px rgba(59, 130, 246, 0.4)' }}
              />
            ) : (
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#ffffff', fontWeight: '800', fontSize: '15px', display: 'grid', placeItems: 'center', border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 2px 10px rgba(37,99,235,0.4)' }}>
                {(profileData?.name || 'A').charAt(0)}
              </div>
            )}
          </button>

          {showProfileMenu && (
            <div style={{ position: 'absolute', top: '50px', right: 0, width: '240px', background: isDarkMode ? '#111827' : '#ffffff', border: isDarkMode ? '1px solid rgba(255,255,255,0.14)' : '1px solid #e2e8f0', borderRadius: '16px', boxShadow: isDarkMode ? '0 20px 40px rgba(0,0,0,0.6)' : '0 10px 30px rgba(0,0,0,0.15)', zIndex: 200, padding: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '12px', marginBottom: '10px', borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0' }}>
                {profileData?.photo ? (
                  <img src={profileData.photo} alt="" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #3b82f6' }} />
                ) : (
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: '800', fontSize: '16px' }}>
                    {(profileData?.name || 'A').charAt(0)}
                  </div>
                )}
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ color: isDarkMode ? '#ffffff' : '#0f172a', fontWeight: '700', fontSize: '13.5px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {profileData?.name || 'Super Admin'}
                  </div>
                  <div style={{ color: isDarkMode ? '#64748b' : '#94a3b8', fontSize: '11px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {profileData?.email || 'admin@medico.com'}
                  </div>
                </div>
              </div>

              {/* Update Profile Button */}
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  if (onOpenProfile) onOpenProfile();
                }}
                style={{ width: '100%', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: '10px', padding: '10px 12px', color: '#2563eb', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', transition: 'all 0.2s ease' }}
              >
                <Edit3 size={14} /> Update Admin Details
              </button>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                style={{ width: '100%', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '10px', padding: '10px 12px', color: '#ef4444', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s ease' }}
              >
                <LogOut size={14} /> Logout Session
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default CmsHeader;
