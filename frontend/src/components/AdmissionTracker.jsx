import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, AlertCircle, ShieldCheck, Plane, GraduationCap, ArrowRight } from 'lucide-react';
import { useLanguage } from '../utils/languageContext';

const AdmissionTracker = () => {
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
        setError(lang === 'hi' ? 'कोई प्रवेश ट्रैक रिकॉर्ड नहीं मिला। कृपया अपना पंजीकृत मोबाइल नंबर जांचें।' : 'No admission record found. Please verify your registered mobile number or Application ID.');
      }
    } catch (err) {
      setError(lang === 'hi' ? 'सर्वर से कनेक्ट नहीं हो सका। कृपया पुनः प्रयास करें।' : 'Could not fetch tracking data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#0f172a', color: '#ffffff', borderRadius: '24px', padding: '36px 28px', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)', margin: '30px 0' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 28px auto' }}>
        <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '4px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {lang === 'hi' ? '📍 लाइव छात्र प्रवेश स्थिति' : '📍 Live Student Admission Tracker'}
        </span>
        <h2 style={{ fontSize: '28px', color: '#ffffff', fontWeight: '800', margin: '10px 0' }}>
          {lang === 'hi' ? 'अपने एमबीबीएस प्रवेश की स्थिति लाइव ट्रैक करें' : 'Track Your MBBS Abroad Admission Live'}
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
          {lang === 'hi'
            ? 'अपनी आवेदन स्थिति, वीजा स्टाम्पिंग और प्रस्थान उड़ान का विवरण तुरंत देखने के लिए अपना मोबाइल नंबर या एप्लीकेशन आईडी दर्ज करें।'
            : 'Enter your registered Mobile Number or Application ID to view your real-time admission milestones.'}
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleTrack} style={{ maxWidth: '520px', margin: '0 auto 28px auto', display: 'flex', gap: '10px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            required
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'hi' ? 'पंजीकृत फोन / ईमेल (e.g. 9876543210)' : 'Registered Phone / App ID (e.g. 9876543210)'}
            style={{ width: '100%', padding: '14px 16px 14px 44px', background: '#1e293b', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '14px', color: '#ffffff', fontSize: '14px', outline: 'none' }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '14px 24px', background: 'linear-gradient(135deg, #e15b3f 0%, #c84327 100%)', color: '#ffffff', border: 'none', borderRadius: '14px', fontWeight: '800', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(225, 91, 63, 0.4)' }}
        >
          {loading ? 'Tracking...' : (lang === 'hi' ? 'ट्रैक करें' : 'Track Status')}
        </button>
      </form>

      {error && (
        <div style={{ maxWidth: '520px', margin: '0 auto 20px auto', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', padding: '12px 16px', borderRadius: '12px', fontSize: '13px', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {/* Tracking Result View */}
      {trackingData && (
        <div style={{ background: '#1e293b', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '28px', maxWidth: '850px', margin: '0 auto' }}>
          
          {/* Summary Banner */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '20px', marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Application Reference ID</div>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#38bdf8' }}>{trackingData.appId}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Student Candidate</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff' }}>{trackingData.studentName}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Target Destination</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#f97316' }}>{trackingData.targetCountry}</div>
            </div>
            <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#4ade80', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '800' }}>
              {trackingData.statusMessage}
            </div>
          </div>

          {/* Stepper Timeline */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', position: 'relative' }}>
            {trackingData.milestones.map((m, idx) => {
              const isDone = m.status === 'Completed';
              const isCurrent = m.status === 'In Progress';

              return (
                <div key={idx} style={{ background: isCurrent ? 'rgba(59, 130, 246, 0.12)' : isDone ? 'rgba(34, 197, 94, 0.08)' : 'rgba(255, 255, 255, 0.03)', border: `1px solid ${isCurrent ? '#3b82f6' : isDone ? '#22c55e' : 'rgba(255, 255, 255, 0.08)'}`, borderRadius: '16px', padding: '16px 14px', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '900', color: isDone ? '#4ade80' : isCurrent ? '#60a5fa' : '#64748b' }}>
                      STEP {m.step}
                    </span>
                    {isDone ? (
                      <CheckCircle2 size={18} color="#4ade80" />
                    ) : isCurrent ? (
                      <Clock size={18} color="#60a5fa" className="spin" style={{ animation: 'spin 2s linear infinite' }} />
                    ) : (
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#475569' }} />
                    )}
                  </div>

                  <h5 style={{ fontSize: '13px', fontWeight: '800', color: '#ffffff', margin: '0 0 6px 0', lineHeight: '1.3' }}>
                    {m.label}
                  </h5>

                  <div style={{ fontSize: '11px', color: isDone ? '#86efac' : isCurrent ? '#93c5fd' : '#64748b', fontWeight: '600' }}>
                    {m.status} • {m.date}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>
            {lang === 'hi' 
              ? '💡 नोट: वीजा व दस्तावेज अपडेट सीधे दूतावास से सिंक होते हैं। किसी भी प्रश्न के लिए हमारे टोल-फ्री नंबर पर कॉल करें।' 
              : '💡 Note: Visa and documentation updates are synced live with university portals. For urgent help, call +91 98765 43210.'}
          </div>

        </div>
      )}

    </div>
  );
};

export default AdmissionTracker;
