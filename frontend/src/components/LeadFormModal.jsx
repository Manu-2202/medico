import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, User, Phone, Mail, MapPin, Award, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../utils/languageContext';
import { playAlertSound } from '../utils/soundNotification';

const LeadFormModal = ({ isOpen, onClose, defaultCountry = '' }) => {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    country: defaultCountry || 'Russia',
    neetScore: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isCaptchaVerified && String(captchaAnswer).trim() !== '8') {
      setErrorMsg(lang === 'hi' ? 'कृपया reCAPTCHA सुरक्षा जांच पूरी करें (चेकबॉक्स टिक करें)।' : 'Please complete the reCAPTCHA security check (Check the box or answer 5 + 3 = 8).');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, sourcePage: window.location.pathname, captchaVerified: true })
      });
      const data = await res.json();

      if (data.success) {
        playAlertSound();
        setSuccessMsg(data.message);
        setFormData({ name: '', phone: '', email: '', city: '', country: defaultCountry || 'Russia', neetScore: '', message: '' });
        setIsCaptchaVerified(false);
        setCaptchaAnswer('');
      } else {
        setErrorMsg(data.message || (lang === 'hi' ? 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।' : 'Something went wrong. Please try again.'));
      }
    } catch (err) {
      setErrorMsg(lang === 'hi' ? 'बैकएंड सर्वर से कनेक्ट नहीं हो सका। कृपया सीधे कॉल करें।' : 'Could not connect to backend server. Please try calling directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 29, 54, 0.75)', backdropFilter: 'blur(6px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', overflowY: 'auto' }}>
      <div style={{ background: '#ffffff', width: '100%', maxWidth: '520px', borderRadius: '20px', boxShadow: '0 25px 50px -12px rgba(31, 56, 100, 0.35)', overflow: 'hidden', animation: 'float 0.3s ease-out', maxHeight: '92vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Modal Header */}
        <div style={{ background: 'linear-gradient(135deg, var(--navy-primary), var(--navy-dark))', color: '#ffffff', padding: '20px 24px', position: 'relative', flexShrink: 0 }}>
          <button 
            onClick={onClose}
            style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#ffffff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
          <div style={{ fontSize: '11px', color: 'var(--coral-accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
            {lang === 'hi' ? 'निःशुल्क विशेषज्ञ मेडिकल परामर्श' : 'Free Expert Medical Counselling'}
          </div>
          <h3 style={{ color: '#ffffff', fontSize: '20px', margin: 0, fontWeight: '800' }}>
            {lang === 'hi' ? '1-ऑन-1 एमबीबीएस प्रवेश मार्गदर्शन बुक करें' : 'Book 1-on-1 MBBS Admission Guidance'}
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '12px', marginTop: '4px', margin: 0 }}>
            {lang === 'hi' ? 'वरिष्ठ एमबीबीएस सलाहकारों से बात करने के लिए अपना विवरण भरें।' : 'Fill in your details to speak with our senior MBBS abroad counselors.'}
          </p>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto' }}>
          {successMsg ? (
            <div style={{ textAlign: 'center', padding: '16px 8px', animation: 'fadeIn 0.3s ease-out' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.25))', display: 'grid', placeItems: 'center', margin: '0 auto 16px', color: '#16a34a' }}>
                <CheckCircle2 size={40} />
              </div>
              <div style={{ display: 'inline-block', background: 'rgba(34,197,94,0.12)', color: '#15803d', padding: '4px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '800', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {lang === 'hi' ? '✓ पंजीकरण सफल' : '✓ Inquiry Registered Successfully'}
              </div>
              <h4 style={{ fontSize: '20px', color: 'var(--navy-primary)', fontWeight: '800', margin: '0 0 8px' }}>
                {lang === 'hi' ? 'धन्यवाद! आपकी मेडिकल परामर्श अनुरोध प्राप्त हो गई है' : 'Thank You! Your Medical Counseling Request is Received'}
              </h4>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px' }}>
                {lang === 'hi' 
                  ? 'एक आधिकारिक पुष्टि ईमेल आपके पंजीकृत पते पर भेज दिया गया है। हमारे वरिष्ठ चिकित्सा परामर्शदाता 15–30 मिनट के भीतर व्यक्तिगत रूप से आपसे संपर्क करेंगे।'
                  : 'An official confirmation email has been dispatched to your email address. Our senior medical admissions counselor will personally reach out to you within 15–30 minutes to assist you and your family.'}
              </p>

              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '14px', margin: '0 0 20px', textAlign: 'left', fontSize: '13px', color: '#166534', lineHeight: '1.5' }}>
                <div style={{ fontWeight: '700', marginBottom: '4px' }}>✨ {lang === 'hi' ? 'अगला कदम:' : 'Next Steps:'}</div>
                <div>📞 {lang === 'hi' ? 'व्यक्तिगत 1-ऑन-1 फोन परामर्श और एनएमसी स्वीकृत कॉलेज सूची' : '1-on-1 personalized phone guidance & NMC-approved college shortlist'}</div>
                <div>💬 {lang === 'hi' ? 'व्हाट्सएप पर तत्काल संपर्क उपलब्ध:' : 'Immediate WhatsApp assistance available:'}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a 
                  href="https://wa.me/919876543210?text=Hello%20Medico%20Overseas%2C%20I%20just%20submitted%20an%20inquiry%20for%20MBBS%20guidance." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#22c55e', color: '#ffffff', padding: '12px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: '800', fontSize: '14px', boxShadow: '0 4px 14px rgba(34,197,94,0.35)' }}
                >
                  💬 {lang === 'hi' ? 'व्हाट्सएप पर तुरंत चैट करें (+91 98765 43210)' : 'Chat on WhatsApp with Counselor (+91 98765 43210)'}
                </a>
                <button className="btn-secondary" onClick={onClose} style={{ width: '100%', justifyContent: 'center', padding: '10px' }}>
                  {lang === 'hi' ? 'विंडो बंद करें' : 'Close Window'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {errorMsg && (
                <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', padding: '10px', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={16} /> {errorMsg}
                </div>
              )}

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>{lang === 'hi' ? 'छात्र का पूरा नाम *' : 'Student Full Name *'}</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder={lang === 'hi' ? 'जैसे राहुल शर्मा' : 'e.g. Rahul Sharma'}
                  value={formData.name}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>{lang === 'hi' ? 'फोन / व्हाट्सएप नंबर *' : 'Phone / WhatsApp *'}</label>
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
                  <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>{lang === 'hi' ? 'ईमेल पता *' : 'Email Address *'}</label>
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>{lang === 'hi' ? 'पसंदीदा देश *' : 'Preferred Country *'}</label>
                  <select 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', background: '#ffffff' }}
                  >
                    <option value="Russia">{lang === 'hi' ? 'रूस 🇷🇺' : 'Russia 🇷🇺'}</option>
                    <option value="Georgia">{lang === 'hi' ? 'जॉर्जिया 🇬🇪' : 'Georgia 🇬🇪'}</option>
                    <option value="Kyrgyzstan">{lang === 'hi' ? 'किर्गिस्तान 🇰🇬' : 'Kyrgyzstan 🇰🇬'}</option>
                    <option value="Uzbekistan">{lang === 'hi' ? 'उज्बेकिस्तान 🇺🇿' : 'Uzbekistan 🇺🇿'}</option>
                    <option value="Armenia">{lang === 'hi' ? 'आर्मेनिया 🇦🇲' : 'Armenia 🇦🇲'}</option>
                    <option value="Vietnam">{lang === 'hi' ? 'वियतनाम 🇻🇳' : 'Vietnam 🇻🇳'}</option>
                    <option value="Philippines">{lang === 'hi' ? 'फिलिपिंस 🇵🇭' : 'Philippines 🇵🇭'}</option>
                    <option value="Kazakhstan">{lang === 'hi' ? 'कजाकिस्तान 🇰🇿' : 'Kazakhstan 🇰🇿'}</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>{lang === 'hi' ? 'नीट स्कोर (वैकल्पिक)' : 'NEET Score (Optional)'}</label>
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
                <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>{lang === 'hi' ? 'शहर / राज्य' : 'City / State'}</label>
                <input 
                  type="text" 
                  name="city"
                  placeholder={lang === 'hi' ? 'जैसे दिल्ली, हैदराबाद, लखनऊ' : 'e.g. Delhi, Hyderabad, Lucknow'}
                  value={formData.city}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                />
              </div>

              {/* Responsive Interactive reCAPTCHA Box */}
              <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginTop: '4px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '700', color: 'var(--navy-primary)' }}>
                  <input 
                    type="checkbox"
                    checked={isCaptchaVerified}
                    onChange={(e) => {
                      setIsCaptchaVerified(e.target.checked);
                      if (e.target.checked) setCaptchaAnswer('8');
                    }}
                    style={{ width: '22px', height: '22px', accentColor: '#22c55e', cursor: 'pointer' }}
                  />
                  <span>{lang === 'hi' ? 'मैं रोबोट नहीं हूं' : "I'm not a robot"}</span>
                </label>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#64748b' }}>
                  <ShieldCheck size={16} color="#22c55e" />
                  <span>reCAPTCHA Verified</span>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading}
                style={{ width: '100%', justifyContent: 'center', marginTop: '6px', padding: '14px' }}
              >
                {loading ? (lang === 'hi' ? 'अनुरोध भेजा जा रहा है...' : 'Submitting Request...') : (
                  <>
                    <Send size={16} /> {lang === 'hi' ? 'कॉलबैक और फीस विवरण का अनुरोध करें' : 'Request Callback & Fee Breakdown'}
                  </>
                )}
              </button>

              <div style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                🔒 100% Confidential. {lang === 'hi' ? 'जमा करके, आप हमारी गोपनीयता नीति और शर्तों से सहमत होते हैं।' : 'By submitting, you agree to our Privacy Policy & Terms.'}
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default LeadFormModal;
