import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, AlertCircle, ShieldCheck, Plane, GraduationCap, ArrowRight } from 'lucide-react';
import { useLanguage } from '../utils/languageContext';

const AdmissionTracker = ({ isCompact = false }) => {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/track-admission/${encodeURIComponent(searchQuery.trim())}`);
      const data = await res.json();
      if (data.success && data.data) {
        setTrackingData(data.data);
      } else {
        setError(lang === 'hi' ? 'कोई रिकॉर्ड नहीं मिला। कृपया पंजीकृत मोबाइल नंबर जांचें।' : 'No admission record found. Please verify registered mobile number or App ID.');
      }
    } catch (err) {
      setError(lang === 'hi' ? 'सर्वर से कनेक्ट नहीं हो सका।' : 'Could not fetch tracking data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: isCompact ? 'transparent' : 'linear-gradient(135deg, #0b132b 0%, #0f172a 100%)',
      color: '#ffffff',
      borderRadius: isCompact ? '0px' : '24px',
      padding: isCompact ? '12px 6px' : '36px 28px',
      boxShadow: isCompact ? 'none' : '0 20px 50px rgba(11, 19, 43, 0.5)',
      border: isCompact ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '22px' }}>
        <span style={{
          background: 'rgba(59, 130, 246, 0.18)',
          color: '#60a5fa',
          border: '1px solid rgba(59, 130, 246, 0.35)',
          padding: '5px 14px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: '800',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {lang === 'hi' ? '📍 लाइव छात्र प्रवेश स्थिति' : '📍 Live Student Admission Tracker'}
        </span>
        <h3 style={{ fontSize: isCompact ? '22px' : '28px', color: '#ffffff', fontWeight: '800', margin: '10px 0 6px 0', lineHeight: '1.3' }}>
          {lang === 'hi' ? 'अपने एमबीबीएस प्रवेश की स्थिति लाइव ट्रैक करें' : 'Track Your MBBS Abroad Admission Live'}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, lineHeight: '1.5' }}>
          {lang === 'hi'
            ? 'अपनी आवेदन स्थिति व वीजा स्टाम्पिंग तुरंत देखने के लिए अपना नंबर दर्ज करें।'
            : 'Enter your registered Mobile Number or Application ID to view live milestones.'}
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleTrack} style={{ maxWidth: '480px', width: '100%', margin: '0 auto 20px auto', display: 'flex', flexDirection: isCompact ? 'column' : 'row', gap: '10px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            required
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'hi' ? 'पंजीकृत फोन (e.g. 9876543210)' : 'Registered Phone / App ID (e.g. 9876543210)'}
            style={{ width: '100%', padding: '13px 16px 13px 44px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255, 255, 255, 0.18)', borderRadius: '14px', color: '#ffffff', fontSize: '13.5px', outline: 'none' }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '13px 22px', background: 'linear-gradient(135deg, #e15b3f 0%, #c84327 100%)', color: '#ffffff', border: 'none', borderRadius: '14px', fontWeight: '800', fontSize: '13.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(225, 91, 63, 0.4)', whitespace: 'nowrap' }}
        >
          {loading ? 'Tracking...' : (lang === 'hi' ? 'ट्रैक करें' : 'Track Status')} <ArrowRight size={16} />
        </button>
      </form>

      {error && (
        <div style={{ maxWidth: '480px', margin: '0 auto 16px auto', background: 'rgba(239, 68, 68, 0.18)', border: '1px solid rgba(239, 68, 68, 0.35)', color: '#fca5a5', padding: '10px 14px', borderRadius: '12px', fontSize: '12.5px', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {/* Dynamic Demo Quick Track Helper */}
      {!trackingData && (
        <div style={{ textAlign: 'center', marginTop: '6px', fontSize: '11px', color: '#64748b' }}>
          🔒 Real-time synchronization with NMC & Embassy portals
        </div>
      )}

      {/* Tracking Result View */}
      {trackingData && (
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '20px', marginTop: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>App ID</div>
              <div style={{ fontSize: '16px', fontWeight: '900', color: '#38bdf8' }}>{trackingData.appId}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Student</div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#ffffff' }}>{trackingData.studentName}</div>
            </div>
            <div style={{ background: 'rgba(34, 197, 94, 0.18)', border: '1px solid rgba(34, 197, 94, 0.35)', color: '#4ade80', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '800' }}>
              {trackingData.statusMessage}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px' }}>
            {trackingData.milestones.map((m, idx) => {
              const isDone = m.status === 'Completed';
              const isCurrent = m.status === 'In Progress';

              return (
                <div key={idx} style={{ background: isCurrent ? 'rgba(59, 130, 246, 0.15)' : isDone ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 255, 255, 0.03)', border: `1px solid ${isCurrent ? '#3b82f6' : isDone ? '#22c55e' : 'rgba(255, 255, 255, 0.08)'}`, borderRadius: '12px', padding: '12px 10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '10px', fontWeight: '900', color: isDone ? '#4ade80' : isCurrent ? '#60a5fa' : '#64748b' }}>
                      STEP {m.step}
                    </span>
                    {isDone ? (
                      <CheckCircle2 size={15} color="#4ade80" />
                    ) : isCurrent ? (
                      <Clock size={15} color="#60a5fa" />
                    ) : (
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#475569' }} />
                    )}
                  </div>

                  <h5 style={{ fontSize: '12px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0', lineHeight: '1.2' }}>
                    {m.label}
                  </h5>

                  <div style={{ fontSize: '10px', color: isDone ? '#86efac' : isCurrent ? '#93c5fd' : '#64748b', fontWeight: '600' }}>
                    {m.status}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

export default AdmissionTracker;
