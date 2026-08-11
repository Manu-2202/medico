import React from 'react';
import { ShieldCheck, Lock, Globe, HardDrive } from 'lucide-react';

const CmsFooter = () => {
  return (
    <footer style={{
      background: '#0b0f19',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '20px 32px',
      color: '#94a3b8',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '16px',
      marginTop: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontWeight: '700' }}>
          <ShieldCheck size={16} /> Medico Overseas Admin Portal
        </div>
        <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
        <span>© 2026 Medico Overseas Educational Consultancy. All rights reserved.</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#4ade80' }}>
          <HardDrive size={13} /> Encrypted SSL Admin Session
        </span>
        <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#93c5fd' }}>
          <Lock size={13} /> Strict Access Control
        </span>
      </div>
    </footer>
  );
};

export default CmsFooter;
