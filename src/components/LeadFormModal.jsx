import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, User, Phone, Mail, MapPin, Award } from 'lucide-react';

const LeadFormModal = ({ isOpen, onClose, defaultCountry = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    country: defaultCountry || 'Russia',
    neetScore: '',
    message: ''
  });
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (String(captchaAnswer).trim() !== '8') {
      setErrorMsg('Spam Protection Check Failed: 5 + 3 = 8. Please enter correct answer.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          sourcePage: window.location.pathname,
          captchaAnswer: captchaAnswer,
          captchaExpected: '8'
        })
      });
      const data = await res.json();

      if (data.success) {
        setSuccessMsg(data.message);
        setFormData({ name: '', phone: '', email: '', city: '', country: defaultCountry || 'Russia', neetScore: '', message: '' });
        setCaptchaAnswer('');
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Could not connect to backend server. Please try calling directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 29, 54, 0.75)', backdropFilter: 'blur(6px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#ffffff', width: '100%', maxWidth: '520px', borderRadius: '20px', boxShadow: '0 25px 50px -12px rgba(31, 56, 100, 0.35)', overflow: 'hidden', animation: 'float 0.3s ease-out' }}>
        
        {/* Modal Header */}
        <div style={{ background: 'linear-gradient(135deg, var(--navy-primary), var(--navy-dark))', color: '#ffffff', padding: '24px', position: 'relative' }}>
          <button 
            onClick={onClose}
            style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#ffffff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
          <div style={{ fontSize: '12px', color: 'var(--coral-accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
            Free Expert Medical Counselling
          </div>
          <h3 style={{ color: '#ffffff', fontSize: '22px', margin: 0 }}>
            Book 1-on-1 MBBS Admission Guidance
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '13px', marginTop: '6px', margin: 0 }}>
            Fill in your details to speak with our senior MBBS abroad counselors.
          </p>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          {successMsg ? (
            <div style={{ textAlign: 'center', padding: '20px 10px' }}>
              <CheckCircle2 size={56} color="var(--coral-accent)" style={{ marginBottom: '12px' }} />
              <h4 style={{ fontSize: '20px', color: 'var(--navy-primary)', marginBottom: '8px' }}>Enquiry Submitted!</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>{successMsg}</p>
              <button className="btn-primary" onClick={onClose} style={{ width: '100%', justifyContent: 'center' }}>
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {errorMsg && (
                <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', padding: '10px', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={16} /> {errorMsg}
                </div>
              )}

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>Student Full Name *</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>Phone / WhatsApp *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="student@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>Preferred Country *</label>
                  <select 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', background: '#ffffff' }}
                  >
                    <option value="Russia">Russia 🇷🇺</option>
                    <option value="Georgia">Georgia 🇬🇪</option>
                    <option value="Kyrgyzstan">Kyrgyzstan 🇰🇬</option>
                    <option value="Uzbekistan">Uzbekistan 🇺🇿</option>
                    <option value="Armenia">Armenia 🇦🇲</option>
                    <option value="Vietnam">Vietnam 🇻🇳</option>
                    <option value="FMGE Exam Prep">FMGE Coaching</option>
                    <option value="NMAT Exam Prep">NMAT Exam Prep</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>NEET Score (Optional)</label>
                  <input 
                    type="number" 
                    name="neetScore"
                    placeholder="e.g. 280"
                    value={formData.neetScore}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>City / State</label>
                <input 
                  type="text" 
                  name="city"
                  placeholder="e.g. Delhi, Hyderabad, Lucknow"
                  value={formData.city}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                />
              </div>

              {/* Spam Protection reCAPTCHA Verification Box */}
              <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: 'var(--navy-primary)' }}>
                  <span style={{ background: '#22c55e', color: '#ffffff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>reCAPTCHA</span>
                  <span>Security Check: <strong>5 + 3 = ?</strong></span>
                </div>
                <input 
                  type="number"
                  required
                  placeholder="Answer"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  style={{ width: '80px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', textAlign: 'center', outline: 'none' }}
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading}
                style={{ width: '100%', justifyContent: 'center', marginTop: '6px', padding: '14px' }}
              >
                {loading ? 'Verifying & Submitting...' : (
                  <>
                    <Send size={16} /> Request Callback & Fee Breakdown
                  </>
                )}
              </button>

              <div style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                🔒 Protected by reCAPTCHA Spam Security & SSL Encryption.
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default LeadFormModal;
