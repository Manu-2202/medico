import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Database, Lock, Server, Heart } from 'lucide-react';

const CmsFooter = ({ onLogout }) => {
  return (
    <footer style={{ background: '#0b0f19', borderTop: '1px solid rgba(255, 255, 255, 0.08)', padding: '18px 32px', color: '#64748b', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', zIndex: 10 }}>
      {/* Left Copyright */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ShieldCheck size={14} color="#22c55e" />
        <span>
          © 2026 <strong>Medico Overseas CMS Portal</strong> &nbsp;|&nbsp; Executive Admissions & Content Management Engine
        </span>
      </div>

      {/* Middle Status Chips */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }} className="cms-footer-chips">
        <span style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '2px 10px', borderRadius: '12px', color: '#94a3b8', fontSize: '11px', fontWeight: '600' }}>
          ⚡ MERN Stack Core
        </span>
        <span style={{ background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.2)', padding: '2px 10px', borderRadius: '12px', color: '#4ade80', fontSize: '11px', fontWeight: '600' }}>
          ✉️ Gmail SMTP Active
        </span>
        <span style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '2px 10px', borderRadius: '12px', color: '#60a5fa', fontSize: '11px', fontWeight: '600' }}>
          🔒 AES-256 JWT Auth
        </span>
      </div>

      {/* Right Quick Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link to="/" target="_blank" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600' }}>
          Student Website ↗
        </Link>
        <button onClick={onLogout} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Lock size={12} /> Lock Session
        </button>
      </div>
    </footer>
  );
};

export default CmsFooter;
